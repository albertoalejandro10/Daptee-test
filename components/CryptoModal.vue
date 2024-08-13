<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
      <header class="flex justify-between items-center p-4 border-b">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
          <CloseIcon class="h-6 w-6" />
        </button>
      </header>
      <main class="p-4">
        <slot></slot>
      </main>
      <footer class="p-4 border-t">
        <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cerrar</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from '~/components/icons/CloseIcon.vue'

// Props del modal
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  }
})

// Emitir evento para cerrar el modal
const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
</script>