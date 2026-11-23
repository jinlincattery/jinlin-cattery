// Decap CMS GitHub OAuth · 第二步：用 code 换 access_token，回传给 Decap
// 部署到 Cloudflare Pages Functions：/api/auth/callback
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  let status = "error";
  let content = { message: url.searchParams.get("error") || "missing code" };

  if (code && !url.searchParams.get("error")) {
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

  // Decap 握手协议：先发 authorizing:github，等 opener 回传后再发结果
  // 同时用 setInterval 兜底：即使握手没收到回传，也定时尝试发送结果
  const html = `<!DOCTYPE html><html><body><script>
    (function() {
      var allowed = window.location.origin;
      var message = ${JSON.stringify(message)};
      var sent = false;
      function send() {
        if (sent) return;
        sent = true;
        window.opener.postMessage(message, allowed);
      }
      window.addEventListener("message", function(e) {
        if (e.origin !== allowed) return;
        if (e.data !== "authorizing:github") return;
        send();
      });
      window.opener.postMessage("authorizing:github", allowed);
      // 兜底：500ms 后若还没通过握手发送，也直接尝试发送结果
      setTimeout(send, 500);
      // 再兜底：1.5s 后关闭弹窗
      setTimeout(function() { window.close(); }, 1500);
    })();
  </script></body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
