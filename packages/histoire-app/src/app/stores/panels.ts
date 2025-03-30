import type { CustomPanel } from '../types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePanelsStore = defineStore('panels', () => {
  const customPanels = ref<CustomPanel[]>([])

  function addPanel(panel: CustomPanel) {
    customPanels.value.push(panel)
  }

  return {
    customPanels,
    addPanel,
  }
})
