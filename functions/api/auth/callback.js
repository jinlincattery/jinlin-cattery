// Decap CMS GitHub OAuth · 第二步：用 code 换 access_token，回传给 Decap
// 部署到 Cloudflare Pages Functions：/api/auth/callback
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieHeader = request.headers.get("Cookie") || "";
  const storedState = (cookieHeader.match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];

  let status = "error";
  let content = { message: url.searchParams.get("error") || "missing code" };

  // state 校验：仅在两者都存在且不匹配时才拒绝，避免因 cookie 丢失误伤正常登录
  const stateMismatch = state && storedState && state !== storedState;

  if (stateMismatch) {
    content = { message: "Invalid state parameter" };
  } else if (code && !url.searchParams.get("error")) {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && !data.error && typeof data.access_token === "string" && data.access_token) {
      status = "success";
      content = { token: data.access_token, provider: "github" };
    } else {
      content = { message: data.error_description || data.error || `HTTP ${res.status}` };
    }
  }

  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  // Decap 的双向握手协议：
  // 1. 回调页先向 opener 发送 authorizing:github 握手请求
  // 2. 等 opener 回传 authorizing:github 后，再发送真正的结果
  const html = `<!DOCTYPE html><html><body><script>
    (function() {
      var allowed = window.location.origin;
      var message = ${JSON.stringify(message)};
      window.addEventListener("message", function(e) {
        if (e.origin !== allowed) return;
        if (e.data !== "authorizing:github") return;
        window.opener.postMessage(message, allowed);
        window.close();
      });
      window.opener.postMessage("authorizing:github", allowed);
    })();
  </script></body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
