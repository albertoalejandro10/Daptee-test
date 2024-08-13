export default defineNuxtPlugin(() => {
  const authenticated = useState('authenticated', () => false)
  const cookie = useCookie('authToken')

  // Una hora en milisegundos
  const sessionDuration: number = 60 * 60 * 1000

  if (cookie.value && Date.now() - Number(cookie.value) < sessionDuration) {
    authenticated.value = true
  } else {
    cookie.value = ''
    authenticated.value = false
  }
})
