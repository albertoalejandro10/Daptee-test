<template>  
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-1 text-sm text-gray-600">
      <li>
        <span class="block transition hover:text-gray-700">
          <span class="sr-only"> Home </span>
  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
      </li>
  
      <li>
        <ArrowRightBreadIcon />
      </li>
  
      <li>
        <span class="block transition hover:text-gray-700">Dashboard</span> 
      </li>
  
      <li>
        <ArrowRightBreadIcon />
      </li>
  
      <li>
        <span class="block transition hover:text-gray-700 capitalize">{{ actualView }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import ArrowRightBreadIcon from './icons/ArrowRightBreadIcon.vue'

const route = useRoute()
const actualView = computed(() => route.path.split('/')[2])
</script>