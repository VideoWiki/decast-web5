<template>
  <div>
    <vx-card
      v-for="(s, indexs) in $store.state.studio.scenes"
      :key="indexs"
      :id="'scene_card_' + indexs"
      class="scene-card vs-con-loading__container"
      :class="{
        activeScene:
          $store.state.studio.currentActiveScene === parseInt(indexs) + 1
      }"
    >
      <template v-if="selectedFromLibraryMedia[parseInt(indexs)]">
        <p class="font-semibold items-left mb-base" style="white-space: normal">
          {{ s }}
        </p>
        <div v-if="!!addedAudioVideos[parseInt(indexs)]" class="mb-base">
          <video
            width="100%"
            height="auto"
            controls
            muted
            :id="'video_' + indexs"
            :src="addedAudioVideos[parseInt(indexs)]"
          >
            {{ $t('studio.errors.e1') }}
          </video>
        </div>
        <div
          v-else-if="!!preparedScenesVideos[parseInt(indexs)]"
          class="mb-base"
        >
          <video
            width="100%"
            height="auto"
            controls
            :id="'video_' + indexs"
            muted
            :src="preparedScenesVideos[parseInt(indexs)]"
            type="video/mp4"
          ></video>
        </div>
        <div v-else class="mb-base">
          <template
            v-if="isImageUrl(selectedFromLibraryMedia[parseInt(indexs)].url)"
          >
            <video
              v-if="selectedFromLibraryMedia[parseInt(indexs)].animationUrl"
              width="100%"
              height="auto"
              controls
              preload="auto"
              :src="selectedFromLibraryMedia[parseInt(indexs)].animationUrl"
            />
            <img
              v-else
              width="100%"
              height="auto"
              :src="selectedFromLibraryMedia[parseInt(indexs)].url"
            />
          </template>
          <video
            v-else
            width="100%"
            height="auto"
            :id="'video_' + indexs"
            controls
            :src="selectedFromLibraryMedia[parseInt(indexs)].url"
          >
            {{ $t('studio.errors.e1') }}
          </video>
        </div>
        <audio-recorder :sceneNum="indexs"></audio-recorder>
      </template>
      <template v-else>
        <div class="h-72 flex justify-center items-center">
          <img
            src="../../assets/images/logo/logo.svg"
            width="80px"
            height="80px"
          />
        </div>
      </template>
    </vx-card>
    <div style="margin-bottom: 150px"></div>
  </div>
</template>

<script>
import constants from '../../../constant';
import AudioRecorder from '../components/audioRecorder';
import { utils } from '@/mixins/index.js';
export default {
  name: 'AddMusic',
  mixins: [utils],
  components: { AudioRecorder },
  data() {
    return {
      constants
    };
  },
  computed: {
    selectedFromLibraryMedia() {
      return this.$store.state.studio.selectedFromLibraryMedia;
    },
    addedAudioVideos() {
      return this.$store.state.studio.addedAudioVideos;
    },
    preparedScenesVideos() {
      return this.$store.state.studio.preparedScenesVideos;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    const el = document.getElementById(
      `scene_card_${this.$store.state.studio.currentActiveScene - 1}`
    );
    el.scrollIntoView({ block: 'center' });
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll);
  }
};
</script>

<style scoped>
.vs-con-loading__container {
  z-index: 10 !important;
}
.scene-card {
  min-height: 30rem;
  /*background: #7367F0;
    color: white;*/
  opacity: 0.2;
  box-shadow: none;
  margin-bottom: 10rem;
}
.activeScene {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  opacity: 1 !important;
}
.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
</style>
