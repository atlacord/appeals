// The appellant is identified server-side from their Discord login cookie
export interface Appeal {
  banReason: string
  appealReason: string
  behaviorChange: string
}

// The logged in Discord user, as returned by the bot's GET /appeals/me
export interface Me {
  id: string
  username: string
  globalName: string | null
  avatarURL: string
}

// Routes on the modmail bot's web server (bot/src/appeals.js).
// In dev, vite.config.ts proxies them to APPEALS_API.
export const APPEAL_ENDPOINT = '/appeals'
export const LOGIN_PATH = '/appeals/login'
export const LOGOUT_PATH = '/appeals/logout'

// Resolves to null when the user isn't logged in
export async function fetchMe (): Promise<Me | null> {
  const res = await fetch('/appeals/me', { credentials: 'include' })
  if (res.status === 401)
    return null
  if (!res.ok)
    throw new Error(`Request failed with status ${res.status}`)
  return res.json()
}

export async function submitAppeal (appeal: Appeal): Promise<void> {
  const res = await fetch(APPEAL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(appeal),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed with status ${res.status}`)
  }
}
