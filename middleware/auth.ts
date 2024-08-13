export default defineNuxtRouteMiddleware((to, from) => {
  const authenticated = useState('authenticated')
  if (!authenticated.value && to.path !== '/') {
    return navigateTo('/')
  }
})