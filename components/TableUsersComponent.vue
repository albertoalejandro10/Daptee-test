<template>
  <MainTableComponent :data="zeldaData" :isLoading="isLoading">
    <template #header>
      <th class="w-8 whitespace-nowrap px-4 py-3 font-medium text-gray-800">&nbsp;</th>
      <th class="w-10/12 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">Nombre</th>
      <th class="w-8 whitespace-nowrap px-4 py-3">&nbsp;</th>
    </template>
    <template #row="{ item, index }">
      <td class="whitespace-nowrap text-center px-2 py-2">{{ index + 1 }}</td>
      <td class="whitespace-nowrap px-4 py-2 font-medium">{{ item.name }}</td>
      <td class="whitespace-nowrap px-4 py-2 text-right">
        <button @click="toggleMenu(index)">
          <ThreeDotsIcon class="h-4 w-4" />
        </button>
        <div v-if="visibleMenu === index" @click="handleClickOutsideMenu($event)" class="absolute right-10 mt-2 w-28 bg-white border rounded border-gray-300 shadow">
          <ul>
            <li @click="viewItem(item)" class="px-4 py-2 text-gray-700 hover:bg-neutral-50 cursor-pointer">
              Ver Juego
            </li>
            <li @click="handleDeleteItem(index)" class="px-4 py-2 text-gray-700 hover:bg-red-50 cursor-pointer">
              Eliminar
            </li>
          </ul>
        </div>
      </td>
    </template>
  </MainTableComponent>
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
import MainTableComponent from '~/components/MainTableComponent.vue'
import ZeldaModal from '~/components/ModalComponent.vue'
import ThreeDotsIcon from '~/components/icons/ThreeDotsIcon.vue'

import type { Zelda } from '~/interfaces/zelda-interface';

import { useZelda } from '~/composables/useZelda'

const { zeldaData, isLoading } = useZelda()

const {
  visibleMenu,
  selectedItem,
  isModalVisible,
  toggleMenu,
  viewItem,
  deleteItem,
  closeModal,
  handleClickOutsideMenu
} = useTableActions<Zelda>()

const handleDeleteItem = (index: number) => {
  deleteItem(zeldaData.value, index)
}
</script>
