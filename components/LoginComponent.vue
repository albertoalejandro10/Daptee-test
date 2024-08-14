<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto lg:h-12" src="~/assets/images/daptee-logo.svg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input v-model="username" id="username" name="username" type="text" required class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-700 shadow-sm shadow-cyan-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" required class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-700 shadow-sm shadow-cyan-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-cyan_color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light_turquoise">Sign in</button>
        </div>
        
        <div v-if="error" class="text-red-500 text-sm mt-2">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import type { HardcodeValues } from '~/interfaces/hardcode-values.interface';

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const error: Ref<string> = ref('')
const router = useRouter()

const hardcodeValues: HardcodeValues = {
  username: 'daptee',
  password: 'daptee2024'
}

const { authenticated, login } = useAuth()
onMounted(() => {
  if (authenticated.value) {
    router.push('/dashboard/users')
  }
})

const handleSubmit = () => {
  if (username.value.toLowerCase() === hardcodeValues.username && password.value.toLowerCase() === hardcodeValues.password) {
    login(username.value)
    router.push('/dashboard/users')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>