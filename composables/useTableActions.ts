import type { UnwrapRef } from "vue"

export const useTableActions = <T>() => {
  const visibleMenu: Ref<number> = ref(-1)
  const selectedItemRef = ref<T | null>(null) 
  const isModalVisible: Ref<boolean> = ref(false)

  // Quiero devolver un valor no reactive
  const selectedItem = computed(() => selectedItemRef.value)

  const toggleMenu = (index: number) => {
    visibleMenu.value = visibleMenu.value === index ? -1 : index
  }

  // UnwrapRef<T> es necesario porque selectedItemRef es de tipo Ref<T | null>
  const viewItem = (item: T) => {
    selectedItemRef.value = item as UnwrapRef<T>
    isModalVisible.value = true
    visibleMenu.value = -1
  }

  const deleteItem = (items: T[], index: number) => {
    items.splice(index, 1)
    visibleMenu.value = -1
  }

  const closeModal = () => {
    isModalVisible.value = false
    selectedItemRef.value = null
  }

  // Manejar click fuera del visibleMenu
  const handleClickOutsideMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target?.closest('button') && !target?.closest('div[role="menu"]')) {
      visibleMenu.value = -1
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutsideMenu)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutsideMenu)
  })

  return {
    visibleMenu,
    selectedItem,
    isModalVisible,
    toggleMenu,
    viewItem,
    deleteItem,
    closeModal,
    handleClickOutsideMenu
  }
}
