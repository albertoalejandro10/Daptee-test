import { computed, onMounted, ref } from 'vue'

import { getZeldaData } from '~/API/ZeldaAPI'

import type { Zelda } from '~/interfaces/zelda-interface'
import type { ZeldaResponse } from '~/interfaces/zelda-list.response'

export const useZelda = () => {
  const zeldaData = ref<Zelda[]>([])

  const isLoading = computed(() => zeldaData.value.length === 0)

  const getData = async (): Promise<Zelda[]> => {
    const response = await getZeldaData.get<ZeldaResponse>('/games')
    if (response.status !== 200) {
      throw new Error('Failed to fetch Zelda Data')
    }
    const { data } = response.data
    const zeldaArray = data.map(
      ({ id, name, description, developer, publisher, released_date }) => {
        return {
          id, name, description, developer, publisher, released_date
        }
      }
    )

    return zeldaArray
  }

  onMounted(async () => {
    zeldaData.value = await getData()
  })

  return {
    zeldaData,
    isLoading
  }
}