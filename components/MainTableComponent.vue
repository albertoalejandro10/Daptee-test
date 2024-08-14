<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <client-only>
      <flower-spinner :animation-duration="3000" :size="140" color="#3BCDBD" />
    </client-only>
  </div>
  <div v-else class="flex flex-col">
    <div class="rounded-lg border border-gray-200">
      <div class="overflow-x-auto rounded-t-lg">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <slot name="header"></slot>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="(item, index) in filteredData"
              :key="index"
              class="transition duration-300 ease-in-out hover:bg-purple-50"
            >
              <slot name="row" :item="item" :index="index"></slot>
            </tr>
            <tr v-if="filteredData.length === 0" class="border-b border-gray-200">
              <td colspan="7" class="py-2 px-4 text-center">No se encontraron resultados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlowerSpinner } from 'epic-spinners'

const querySearch = inject('querySearch') as Ref<string>
const props = defineProps<{
  data: Array<any>
  isLoading: boolean
}>()

const filteredData = computed(() => {
  if (querySearch.value === '') {
    return props.data
  }
  return props.data.filter((item) => {
    return item.name!.toLowerCase().includes(querySearch.value.toLowerCase())
  })
})
</script>
