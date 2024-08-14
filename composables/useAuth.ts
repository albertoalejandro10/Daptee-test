// ~/composables/useAuth.ts
import { useCookie, useState } from '#app'

export const useAuth = () => {
  const authenticated = useState<boolean>('authenticated', () => false)
  const user = useState<{ username: string } | null>('user', () => null)
  const authToken = useCookie('authToken', {
    maxAge: 60 * 60,
    path: '/'
  })
  const usernameCookie = useCookie('username')

  if (authToken.value && usernameCookie.value) {
    authenticated.value = true
    user.value = { username: usernameCookie.value }
  }

  const login = (username: string) => {
    authenticated.value = true
    user.value = { username }
    authToken.value = Date.now().toString()
    usernameCookie.value = username
  }

  const logout = () => {
    authenticated.value = false
    user.value = null
    authToken.value = null
    usernameCookie.value = null
  }

  return {
    authenticated,
    user,
    login,
    logout
  }
}
