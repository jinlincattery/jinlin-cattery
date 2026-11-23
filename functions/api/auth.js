// Decap CMS GitHub OAuth · 第一步：发起授权，跳转到 GitHub
// 部署到 Cloudflare Pages Functions：/api/auth
export async function onRequest({ request, env }) {
  const state = crypto.randomUUID();
  const url = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&state=${state}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
