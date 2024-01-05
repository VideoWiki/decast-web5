<template>
  <div>
    <template v-if="sourceUrlExists">
      <video width="100%" height="auto" controls :id="`video_${sceneIndex}`">
        <source
          v-show="$options.PRIORITY[currentPanel] >= $options.PRIORITY.SOUND"
          :src="selectedMedia[sceneIndex].versions[SCENE_VERSION.AUDIO]"
          type="video/mp4"
        />
        <source
          v-show="$options.PRIORITY[currentPanel] >= $options.PRIORITY.COURSE"
          :src="selectedMedia[sceneIndex].versions[SCENE_VERSION.SUBTITLE]"
          type="video/mp4"
        />
        <source
          v-show="$options.PRIORITY[currentPanel] >= $options.PRIORITY.LIBRARY"
          :src="selectedMedia[sceneIndex].versions[SCENE_VERSION.ANIMATION]"
          type="video/mp4"
        />
      </video>
    </template>
    <template v-else>
      <video
        v-if="selectedMedia[sceneIndex].type === $options.MEDIA_TYPES.VIDEO"
        width="100%"
        height="auto"
        controls
        :src="selectedMedia[sceneIndex].versions[SCENE_VERSION.RAW]"
        type="video/mp4"
      ></video>
      <img
        v-else-if="
          selectedMedia[sceneIndex].type === $options.MEDIA_TYPES.IMAGE
        "
        width="100%"
        height="auto"
        :src="selectedMedia[sceneIndex][SCENE_VERSION.RAW]"
      />
      <div v-else></div>
    </template>
  </div>
</template>
<script>
import { SCENE_VERSION, MEDIA_TYPES, PRIORITY } from '@/assets/data';
export default {
  name: 'ScenePreview',
  SCENE_VERSION,
  MEDIA_TYPES,
  PRIORITY,
  props: {
    currentPanel: {
      type: String
    },
    sceneIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    selectedMedia() {
      return this.store.state.studio.selectedMedia;
    },
    sourceUrlExists() {
      return (
        this.selectedMedia[this.sceneIndex].versions[SCENE_VERSION.AUDIO] ||
        this.selectedMedia[this.sceneIndex].versions[SCENE_VERSION.SUBTITLE] ||
        this.selectedMedia[this.sceneIndex].versions[SCENE_VERSION.ANIMATION]
      );
    }
  }
};
</script>
