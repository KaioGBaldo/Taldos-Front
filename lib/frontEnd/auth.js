const AUTH_KEY = 'taldo_front_auth_user'

const getDefaultUser = () => ({
  email: '',
  foto: null,
  nome: '',
  new: false,
  notificationToken: '',
  som: false,
  token: null,
  assinatura: false
})

export const getAuthUser = () => {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    return { ...getDefaultUser(), ...JSON.parse(raw) }
  } catch {
    return null
  }
}

export const isAuthenticated = () => {
  const user = getAuthUser()
  return !!(user && user.email && user.token)
}

export const loginWithProvider = (provider = 'discord') => {
  if (typeof window === 'undefined') return null

  const normalizedProvider = provider === 'google' ? 'google' : 'discord'
  const user = {
    ...getDefaultUser(),
    email: `aventureiro.${normalizedProvider}@taldosbar.com`,
    nome: normalizedProvider === 'google' ? 'Aventureiro Google' : 'Aventureiro Discord',
    foto: '/favicon.png',
    token: `${normalizedProvider}_token_${Date.now()}`,
    assinatura: false
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  return user
}

export const logoutUser = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_KEY)
}

export default {
  getAuthUser,
  isAuthenticated,
  loginWithProvider,
  logoutUser
}
