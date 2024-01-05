<template>
  <div class="cursor-pointer">
    <template v-if="image">
      <img width="100%" :src="src" class="image-view" />
    </template>
    <template v-else>
      <video
        width="100%"
        height="auto"
        :src="src"
        @mouseenter="playScene"
        @mouseleave="pauseScene"
      >
        {{ $t('studio.sidebarPanel.course.c2') }}
      </video>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MediaPreview',
  props: {
    src: {
      type: String,
      required: true,
    },
    image: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    playScene(event) {
      const videoElement = event.target;
      if (videoElement.error == null) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    },
    pauseScene(event) {
      const videoElement = event.target;
      if (videoElement.error == null) {
        videoElement.pause();
      }
    },
  },
};
</script>
<style scoped>
.image-view {
  max-height: 140px;
  transition: 0.5s ease;
  backface-visibility: hidden;
}
</style>
