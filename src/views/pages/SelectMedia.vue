<template>
  <div class="select-media">
    <template v-for="(s, indexs) in $store.state.studio.scenes">
      <vx-card
        :key="indexs"
        :id="'scene_card_' + indexs"
        class="scene-card vs-con-loading__container"
        :class="{
          activeScene:
            $store.state.studio.currentActiveScene === parseInt(indexs) + 1
        }"
      >
        <p class="font-semibold items-left mb-base" style="white-space: normal">
          {{ s }}
        </p>
        <div>
          <template v-if="isValidUrl(indexs)">
            <div
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
                class="image-frame"
                :src="selectedFromLibraryMedia[parseInt(indexs)].url"
              />
              <div
                class="add-animation-btn bg-primary"
                title="Add Animation"
                @click="OpenAnimationModal(indexs)"
              >
                <vs-icon icon="layers" size="24px" color="#fff" />
              </div>
            </div>
            <template v-else>
              <video
                width="100%"
                height="auto"
                controls
                preload="auto"
                :id="`library_video_${indexs}`"
                :src="selectedFromLibraryMedia[parseInt(indexs)].url"
                @canplay="[showTrimBtn(indexs), showFastBtn(indexs)]"
              >
                {{ $t('studio.errors.e1') }}
              </video>
              <TrimVideo
                :id="`trim_video_${indexs}`"
                class="video-trim-bar"
                :sceneNum="indexs"
                @hideTrimbar="closeTrimBar(indexs)"
              />
              <div
                :id="`trim_btn_${indexs}`"
                class="trim-btn bg-primary"
                title="Trim Video"
                @click="[showTrimBar(indexs), closeFastBar(indexs)]"
              >
                <vs-icon icon="content_cut" size="24px" color="#fff" />
              </div>

              <FastVideo
                :id="`fast_video_${indexs}`"
                class="video-fast-bar"
                :sceneNum="indexs"
                @hideFastbar="closeFastBar(indexs)"
              />
              <div
                :id="`fast_btn_${indexs}`"
                class="fast-btn bg-primary"
                title="Fast Video"
                @click="[showFastBar(indexs), closeTrimBar(indexs)]"
              >
                <vs-icon icon="speed" size="24px" color="#fff" />
              </div>
            </template>
          </template>
          <div
            v-else
            class="bg-box relative vs-con-loading__container"
            :id="`upload_scene_${indexs}`"
          >
            <VideoNotFound
              :sceneNum="parseInt(indexs)"
              @search="loadSearchModal($event)"
            />
          </div>
        </div>
      </vx-card>
    </template>
    <OptionsModal
      :active.sync="showAnimationModal"
      :options="$options.animationList"
      title="Select Animation"
      :value="selectedAnimation"
      @selected="transformImage($event)"
      @close="showAnimationModal = false"
    />
    <SearchModal
      :showModal.sync="showSearchModal"
      :sceneNum="currentScene"
      @close="showSearchModal = false"
    />
  </div>
</template>

<script>
import SearchModal from '@/components/search/SearchModal';
import VideoNotFound from '@/components/VideoNotFound';
import TrimVideo from './components/TrimVideo';
import FastVideo from './components/FastVideo';
import OptionsModal from './components/OptionsModal';
import { animationList } from '@/assets/data';
import { utils } from '@/mixins/index.js';
export default {
  name: 'SelectVideos',
  mixins: [utils],
  components: {
    VideoNotFound,
    SearchModal,
    TrimVideo,
    FastVideo,
    OptionsModal
  },
  animationList,
  data() {
    return {
      selectedFile: null,
      showSearchModal: false,
      showAnimationModal: false,
      selectedAnimation: 'none',
      currentScene: null,
      mediaType: 'video'
    };
  },
  computed: {
    selectedFromLibraryMedia() {
      return this.$store.state.studio.selectedFromLibraryMedia;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    },
    currentActiveScene() {
      return this.$store.state.studio.currentActiveScene;
    }
  },
  methods: {
    isValidUrl(indexs) {
      const mediaObj = this.selectedFromLibraryMedia[parseInt(indexs)];
      if (!mediaObj) {
        const payload = this.initialVideo(indexs);
        this.$store.commit('studio/setInitialVideo', payload);
        return !!payload.value;
      }
      return true;
    },
    loadSearchModal(index) {
      this.showSearchModal = true;
      this.currentScene = index;
    },
    initialVideo(indexs) {
      const dataObj = {
        indexs: parseInt(indexs),
        value: null
      };
      if (
        Object.keys(this.$store.state.studio.videos[parseInt(indexs)]).length >
        0
      ) {
        const videoObj = this.$store.state.studio.videos[parseInt(indexs)][0];
        const url = videoObj.url.split('.');
        if (url[url.length - 1] !== 'gif') {
          dataObj.value = {
            id: videoObj.id,
            url: videoObj.url
          };
        }
      }
      return dataObj;
    },
    OpenAnimationModal(idx) {
      if (
        this.$store.state.studio.styles[idx] &&
        this.$store.state.studio.styles[idx].animation
      ) {
        this.selectedAnimation = this.$store.state.studio.styles[idx].animation;
      } else {
        this.$store.commit('studio/setStyles', {
          prop: 'animation',
          sceneNum: parseInt(idx),
          value: this.selectedAnimation
        });
      }
      this.showAnimationModal = true;
      this.currentScene = idx;
    },
    showTrimBtn(index) {
      const trimBtn = document.getElementById(`trim_btn_${index}`);
      trimBtn.style.display = 'flex';
    },
    showTrimBar(index) {
      const trimBar = document.getElementById(`trim_video_${index}`);
      trimBar.style.display = 'block';
    },
    closeTrimBar(index) {
      const trimBar = document.getElementById(`trim_video_${index}`);
      trimBar.style.display = 'none';
    },

    showFastBtn(index) {
      const fastBtn = document.getElementById(`fast_btn_${index}`);
      fastBtn.style.display = 'flex';
    },
    showFastBar(index) {
      const fastBar = document.getElementById(`fast_video_${index}`);
      fastBar.style.display = 'block';
    },
    closeFastBar(index) {
      const fastBar = document.getElementById(`fast_video_${index}`);
      fastBar.style.display = 'none';
    },

    transformImage(value) {
      this.showAnimationModal = false;
      this.$store.commit('studio/setStyles', {
        prop: 'animation',
        sceneNum: parseInt(this.currentScene),
        value: value
      });
      if (value === 'none') {
        this.$store.commit('studio/setAnimationURL', {
          sceneNum: parseInt(this.currentScene),
          value: null
        });
      } else {
        const dataObj = {
          image_url: this.selectedFromLibraryMedia[parseInt(this.currentScene)]
            .url,
          motion: value
        };
        this.$vs.loading({
          background: '#fff',
          container: `#scene_card_${this.currentScene}`,
          text: 'Adding Animation...'
        });
        this.$store
          .dispatch('studio/addMotionToImage', dataObj)
          .then(data => {
            this.$store.commit('studio/setAnimationURL', {
              value: data.data,
              sceneNum: parseInt(this.currentScene)
            });
          })
          .catch(() => {
            this.$vs.notify({
              title: 'Error',
              text: 'Failed to add Animation',
              color: 'danger'
            });
          })
          .finally(() => {
            this.$vs.loading.close(
              `#scene_card_${this.currentScene} > .con-vs-loading`
            );
          });
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll, { passive: true });
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
.select-media {
  margin-bottom: 12rem;
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
.group-card {
  position: relative;
}
.scene-edit-card {
  position: absolute;
  opacity: 0.2;
  box-shadow: none;
  height: 45px;
  width: 100px;
  bottom: -60px;
  right: 43%;
}
.vs-con-loading__container {
  z-index: 20 !important;
}
.bg-box {
  height: 336px;
  display: flex;
  justify-content: center;
  background: #b9b9b9;
}

.add-animation-btn {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  right: 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.trim-btn {
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  padding: 2px;
  top: 45%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  cursor: pointer;
  display: none;
}
.fast-btn {
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  padding: 2px;
  top: 55%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  cursor: pointer;
  display: none;
}
.video-trim-bar,
.video-fast-bar {
  position: absolute;
  right: 16px;
  left: 16px;
  background: #ffff;
  padding: 12px;
  bottom: 5px;
  display: none;
}
</style>
