// worker/index.ts
interface Env { BOT_ORIGIN: string; PROXY_SECRET: string; ASSETS: Fetcher }

export default {
  async fetch(req, env): Promise<Response> {
    const url = new URL(req.url)
    // Friendlier aliases for the bot's login/logout routes
    if (url.pathname === '/login' || url.pathname === '/logout')
      return Response.redirect(new URL(`/appeals${url.pathname}`, url).toString(), 302)

    if (!url.pathname.startsWith('/appeals'))
      return env.ASSETS.fetch(req)

    const target = new URL(url.pathname + url.search, env.BOT_ORIGIN)
    const headers = new Headers(req.headers)
    headers.set('X-Appeals-Secret', env.PROXY_SECRET)   // so only the Worker can reach these routes
    headers.set('X-Forwarded-Host', url.host)

    return fetch(target, {
      method: req.method,
      headers,
      body: req.body,
      redirect: 'manual',   // pass the OAuth 302s back to the browser
    })
  },
} satisfies ExportedHandler<Env>