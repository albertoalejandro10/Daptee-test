<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <client-only>
      <flower-spinner :animation-duration="2500" :size="120" color="#3BCDBD" />
    </client-only>
  </div>
  <div v-else class="flex flex-col">
    <div class="rounded-lg border border-gray-200">
      <div class="overflow-x-auto rounded-t-lg">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th class="w-4 whitespace-nowrap px-4 py-3 font-medium text-gray-800">&nbsp;</th>
              <th class="w-4/5 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">Nombre</th>
              <th class="w-6 whitespace-nowrap px-4 py-3">&nbsp;</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="(item, index) in filteredZeldaData"
              :key="index"
              class="transition duration-300 ease-in-out hover:bg-green-50"
            >
              <td class="whitespace-nowrap text-center px-2 py-2">
                <!-- <img :src="returnImage(item.symbol)" :alt="item.name!" class="w-6 h-6" /> -->
                {{ index + 1 }}
              </td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                {{ item.name }}
              </td>
              <!-- <td class="whitespace-nowrap px-4 py-2 text-gray-600">{{ item.name }}</td> -->
              <td class="whitespace-nowrap px-4 py-2 text-right">
                <button @click="toggleMenu(index)">
                  <ThreeDotsIcon class="h-4 w-4" />
                </button>
                <div
                  v-if="visibleMenu === index"
                  class="absolute right-10 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  <ul>
                    <li @click="viewItem(item)" class="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer">
                      Ver Juego
                    </li>
                    <li @click="deleteItem(index)" class="px-4 py-2 text-gray-700 hover:bg-red-100 cursor-pointer">
                      Eliminar
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr v-if="filteredZeldaData.length === 0" class="border-b border-gray-200">
              <td colspan="7" class="py-2 px-4 text-center">No se encontraron resultados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ZeldaModal v-if="selectedItem" :isVisible="isModalVisible" @close="closeModal" :title="selectedItem.name!">
    <div class="flex flex-col gap-2">
      <p class="text-pretty leading-6"><strong>Descripción:</strong> {{ selectedItem.description }}</p>
      <p><strong>Desarrollado por:</strong> {{ selectedItem.developer }}</p>
      <p><strong>Publicado por:</strong> {{ selectedItem.publisher }}</p> 
      <p><strong>Fecha de lanzamiento:</strong> {{ selectedItem.released_date }}</p>
    </div>
  </ZeldaModal>
</template>

<script setup lang="ts">
import { FlowerSpinner } from 'epic-spinners'

import ThreeDotsIcon from './icons/ThreeDotsIcon.vue'

import ZeldaModal from '~/components/ModalComponent.vue'
import { useZelda } from '~/composables/useZelda'
import type { Zelda } from '~/interfaces/zelda-interface'

const { zeldaData, isLoading } = useZelda()

const querySearch = inject('querySearch') as Ref<string>
const filteredZeldaData = computed(() => {
  if (querySearch.value === '') {
    return zeldaData.value
  }
  return zeldaData.value.filter((item) => {
    return item.name!.toLowerCase().includes(querySearch.value.toLowerCase())
  })
})

const visibleMenu = ref(-1)
const toggleMenu = (index: number) => {
  if (visibleMenu.value === index) {
    visibleMenu.value = -1
  } else {
    visibleMenu.value = index
  }
}

const viewItem = (item: Zelda) => {
  selectedItem.value = item
  isModalVisible.value = true
  visibleMenu.value = -1
}

// Eliminar un elemento de la lista
const deleteItem = (index: number) => {
  zeldaData.value.splice(index, 1)
  visibleMenu.value = -1
}

const isModalVisible = ref(false)
const selectedItem = ref<Zelda | null>(null)
const closeModal = () => {
  isModalVisible.value = false
  selectedItem.value = null
}
</script>