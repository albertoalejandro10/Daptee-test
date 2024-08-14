<template>
  <MainTableComponent :data="cryptoData" :isLoading="isLoading">
    <template #header>
      <th class="w-12 whitespace-nowrap px-4 py-3 font-medium text-gray-800">&nbsp;</th>
      <th class="w-12 whitespace-nowrap px-4 py-3 font-medium text-gray-800">Rank</th>
      <th class="w-10/12 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">Nombre</th>
      <th class="w-8 whitespace-nowrap px-4 py-3">&nbsp;</th>
    </template>
    <template #row="{ item, index }">
      <td class="whitespace-nowrap text-center px-2 py-2">
        <img :src="returnIcon(item.symbol)" :alt="item.name!" class="w-6 h-6 ml-4" />
      </td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-600 text-center">{{ item.rank }}</td>
      <td class="whitespace-nowrap px-4 py-2 text-gray-600">{{ item.name }}</td>
      <td class="whitespace-nowrap px-4 py-2 text-right">
        <button @click="toggleMenu(index)">
          <ThreeDotsIcon class="h-4 w-4" />
        </button>
        <div v-if="visibleMenu === index" @click="handleClickOutsideMenu($event)" class="absolute right-10 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul>
            <li @click="viewItem(item)" class="px-4 py-2 text-gray-700 hover:bg-neutral-50 cursor-pointer">
              Ver Crypto
            </li>
            <li @click="handleDeleteItem(index)" class="px-4 py-2 text-gray-700 hover:bg-red-50 cursor-pointer">
              Eliminar
            </li>
          </ul>
        </div>
      </td>
    </template>
  </MainTableComponent>
  <CryptoModal v-if="selectedItem" :isVisible="isModalVisible" @close="closeModal" :title="selectedItem.name!">
    <div class="flex flex-row items-center justify-evenly">
      <div>
        <img :src="returnImage(selectedItem.symbol)" :alt="selectedItem.name!" class="w-28 h-28" />
      </div>
      <div class="flex flex-col gap-2">
        <p>Rank: {{ selectedItem.rank }}</p>
        <p>Price: {{ dollar(selectedItem.priceUsd) }}</p>
        <p>Market Cap: <span :class="selectedItem.changePercent24Hr?.includes('-') ? 'text-red-800' : 'text-green-800'"
          >{{ dollar(selectedItem.marketCapUsd) }}</span></p>
        <p>24h Volume: {{ percent(selectedItem.changePercent24Hr) }}</p>
      </div>
    </div>
  </CryptoModal>
</template>

<script setup lang="ts">
import MainTableComponent from '~/components/MainTableComponent.vue'
import CryptoModal from '~/components/ModalComponent.vue'
import ThreeDotsIcon from '~/components/icons/ThreeDotsIcon.vue'

import { dollar, percent } from '~/filters/dollar'

import type { Crypto } from '~/interfaces/crypto.interface'

import { useCrypto } from '~/composables/useCrypto'

const returnImage = (symbol: string | null) => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/${symbol!.toLowerCase()}.png`
}

const returnIcon = (symbol: string | null) => {
  return `https://static.coincap.io/assets/icons/${symbol!.toLowerCase()}@2x.png`
}

const { cryptoData, isLoading } = useCrypto()
const {
  visibleMenu,
  selectedItem,
  isModalVisible,
  toggleMenu,
  viewItem,
  deleteItem,
  closeModal,
  handleClickOutsideMenu
} = useTableActions<Crypto>()

// Modificamos deleteItem para que elimine de cryptoData
const handleDeleteItem = (index: number) => {
  deleteItem(cryptoData.value, index)
}
</script>
