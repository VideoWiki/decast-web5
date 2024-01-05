<template>
  <div style="height: 100%">
    <vx-card
      v-if="Object.keys(getLibraryItems).length === 0"
      style="height: 100%"
      class="p-3"
    >
      <p style="white-space: normal" class="font-semibold">
        {{ $t('studio.sidebarPanel.library.l1') }}
      </p>
    </vx-card>
    <template v-else>
      <div v-for="(k, indexk) in getLibraryItems" :key="indexk">
        <LibraryItem
          v-if="$store.state.studio.currentActiveScene === parseInt(indexk) + 1"
          :keywords="k"
          :sceneNum="parseInt(indexk)"
          class="mb-base"
        />
      </div>
    </template>
  </div>
</template>

<script>
import LibraryItem from './components/LibraryItem';

export default {
  name: 'LibraryPanel',
  components: { LibraryItem },
  computed: {
    getLibraryItems() {
      return this.$store.state.studio.keywords;
    },
    currentActiveScene() {
      return this.$store.state.studio.currentActiveScene;
    },
    scenes() {
      return this.$store.state.studio.scenes;
    },
  },
};
</script>

<style scoped></style>
