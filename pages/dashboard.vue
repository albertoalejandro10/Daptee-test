<template>
  <div class="flex bg-gray-100 min-h-screen">
    <aside class="flex flex-col">
      <NuxtLink to="/dashboard/users" class="inline-flex items-center justify-center h-20 w-full bg-gray-800">
        <img src="~/assets/images/daptee-logo.svg" alt="daptee-logo">
      </NuxtLink>
      <div class="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
        <nav class="flex flex-col mx-4 my-6 space-y-4">
          <NuxtLink
            to="/dashboard/users"
            class="inline-flex items-center py-3 rounded-lg px-2"
            :class="{ 'text-blue-600 bg-white': $route.path === '/dashboard/users', 'hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400': true }"
          >
            <UsersIcon class="h-6 w-6" />
            <span class="ml-2">Usuarios</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/products"
            class="inline-flex items-center py-3 rounded-lg px-2"
            :class="{ 'text-blue-600 bg-white': $route.path === '/dashboard/products', 'hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400': true }"
          >
            <ProductsIcon class="h-6 w-6" />
            <span class="ml-2">Productos</span>
          </NuxtLink>
        </nav>
      </div>
    </aside>
    <div class="flex-grow text-gray-800">
      <header class="flex justify-end items-center h-20 px-6 sm:px-10 bg-white">
        <div class="relative max-w-md mr-4">
          <SearchIcon />
          <input v-model="querySearch" type="text" role="search" placeholder="Buscar..." class="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
        </div>
        <div class="flex flex-shrink-0 items-center">
          <button class="relative inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" @click="togglePanel">
            <span class="sr-only">User Menu</span>
            <div class="hidden md:flex md:flex-col md:items-end md:leading-tight" >
              <span class="font-semibold">Sinan AYDOĞAN</span>
            </div>
            <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="user profile photo" class="h-full w-full object-cover">
            </span>
            <ArrowDownIcon class="hidden sm:block h-6 w-6 text-gray-300" />
          </button>
          <div v-if="panel" class="absolute top-20 bg-white border rounded-md p-2 w-56">
            <div class="flex justify-between p-2 hover:bg-red-50 transition duration-200 ease-in-out cursor-pointer" @click="handleLogout">
              Cerrar sesión
              <LogoutIcon class="ml-1 h-6 w-6 text-gray-500 hover:text-white" />
            </div>
          </div>
        </div>
      </header>
      <main class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <BreadcrumbComponents />
        </div>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'

import UsersIcon from '~/components/icons/UsersIcon.vue'
import ProductsIcon from '~/components/icons/ProductsIcon.vue'
import ArrowDownIcon from '~/components/icons/ArrowDownIcon.vue'
import LogoutIcon from '~/components/icons/LogoutIcon.vue'
import SearchIcon from '~/components/icons/SearchIcon.vue'

import BreadcrumbComponents from '~/components/BreadcrumbComponents.vue'

definePageMeta({
  middleware: 'auth'
})

const panel = ref(false)
const togglePanel = () => {
  panel.value = !panel.value
}

const handleClickOutside = (event) => {
  if (!event.target.closest('button') && !event.target.closest('div[role="menu"]')) {
    panel.value = false
  }
}

onMounted(() => {
  // Redirect to users if dashboard is accessed directly
  if (router.currentRoute.value.path === '/dashboard') {
    router.push('/dashboard/users')
  }
  // Outside click from panel
  document.addEventListener('click', handleClickOutside)
})

// Desmontar evento click fuera del panel
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const router = useRouter()
const authenticated = useState('authenticated')
const authToken = useCookie('authToken')

const handleLogout = () => {
  authToken.value = ''
  authenticated.value = false
  router.push('/')
}

const querySearch = ref('')
provide('querySearch', querySearch)

</script>