<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStoryStore } from '../../stores/story'
import { usePanelsStore } from '../../stores/panels'

import BaseEmpty from '../base/BaseEmpty.vue'
import BaseSplitPane from '../base/BaseSplitPane.vue'
import PaneTabs from './PaneTabs.vue'
import StoryControls from './StoryControls.vue'
import StoryDocs from './StoryDocs.vue'
import StoryEvents from './StoryEvents.vue'
import StorySourceCode from './StorySourceCode.vue'

const storyStore = useStoryStore()
const panelsStore = usePanelsStore()

const route = useRoute()

const endpoints = computed(() => ['docs', 'events', ...panelsStore.customPanels.map(p => p.slug)])
const componentMapping = computed(() => ({
  docs: StoryDocs,
  events: StoryEvents,
  ...panelsStore.customPanels.reduce((acc, panel) => {
    acc[panel.slug] = panel.component
    return acc
  }, {}),
}))

const panelContentComponent = computed(() => {
  switch (route.query.tab) {
    case 'docs':
      return StoryDocs
    case 'events':
      return StoryEvents
    default:
      return StoryControls
  }
})

</script>

<template>

  <BaseEmpty
    v-if="!storyStore.currentVariant"
    class="histoire-story-side-panel histoire-selection"
  >
    <span>Select a variant</span>
  </BaseEmpty>

  <BaseEmpty
    v-else-if="!storyStore.currentVariant.configReady || !storyStore.currentVariant.previewReady"
    class="histoire-story-side-panel histoire-loading"
  >
    <span>Loading...</span>
  </BaseEmpty>

  <BaseSplitPane
    v-else
    save-id="story-sidepane"
    orientation="portrait"
    class="histoire-story-side-panel histoire-loaded htw-h-full"
    data-test-id="story-side-panel"
  >
    <template #first>
      <div class="htw-flex htw-flex-col htw-h-full">
        <PaneTabs
          :story="storyStore.currentStory"
          :variant="storyStore.currentVariant"
        />

        <component
          :is="componentMapping[route.query.tab as string]"
          :story="storyStore.currentStory"
          :variant="storyStore.currentVariant"
          class="htw-h-full htw-overflow-auto"
        />
      </div>
    </template>

    <template #last>
      <StorySourceCode
        :story="storyStore.currentStory"
        :variant="storyStore.currentVariant"
        class="htw-h-full"
      />
    </template>
  </BaseSplitPane>
</template>
