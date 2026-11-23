// Decap CMS GitHub OAuth · 第一步：发起授权，跳转到 GitHub
// 部署到 Cloudflare Pages Functions：/api/auth
export async function onRequest({ request, env }) {
  const state = crypto.randomUUID();
  const url = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&state=${state}`;

  // 提取当前请求的域名，用于设置 Cookie 的 Domain
  const hostname = new URL(request.url).hostname;

  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Domain=${hostname}`,
    },
  });
}
