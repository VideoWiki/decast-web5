<template>
  <div class="vx-card cursor-default" style="height: 100%">
    <div class="vx-card__collapsible-content">
      <div class="vx-card__body">
        <div class="-mr-4">
          <div class="w-full items-center mb-base">
            <h6 class="font-semibold mb-base" style="white-space: normal">
              {{$t('ScenesPanel.can')}}
            </h6>
            <vs-button @click="prepareAllScenes">{{
              $t('studio.sidebarPanel.course.c3')
            }}</vs-button>
          </div>
          <component
            :is="scrollbarTag"
            ref="verticalNavMenuPs"
            class="scroll-area pr-3"
            :settings="settings"
            :key="$vs.rtl"
          >
            <div
              v-for="(media, indexv) in selectedMedia"
              :key="indexv"
              class="w-full mb-base"
            >
              <div class="flex justify-between items-center">
                <h5 class="mb-3">Scene {{ indexv + 1 }}</h5>
                <div class="flex justify-end w-1/2">
                  <vx-tooltip text="Add Scene" class="w-1/3">
                    <vs-icon
                      icon="add"
                      size="20px"
                      class="cursor-pointer"
                      @click="addScene(indexv)"
                    />
                  </vx-tooltip>
                  <vx-tooltip text="Delete Scene">
                    <vs-icon
                      icon="delete"
                      size="20px"
                      class="cursor-pointer"
                      @click="deleteScene(indexv)"
                    />
                  </vx-tooltip>
                </div>
              </div>
              <template v-if="media">
                <MediaPreview
                  v-if="isImageUrl(media.url)"
                  image
                  @click.native="scrollToScene(indexv)"
                  :src="media.url"
                />
                <MediaPreview
                  :src="media.url"
                  v-else
                  @click.native="scrollToScene(indexv)"
                />
              </template>
              <div
                v-else
                class="add-scene-container relative vs-con-loading__container"
                :id="`upload_scene_${indexv}`"
              >
                <VideoNotFound
                  :sceneNum="indexv"
                  @click.native="scrollToScene(indexv)"
                  @search="loadSearchModal($event)"
                />
              </div>
            </div>
            <div class="w-full items-center">
              <vs-button icon="add" @click="addScene(selectedMedia.length)"
                > {{$t('ScenesPanel.add')}}</vs-button
              >
            </div>
          </component>
        </div>
      </div>
    </div>
    <SearchModal
      :showModal.sync="showSearchModal"
      :sceneNum="currentScene"
      @close="showSearchModal = false"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import SearchModal from '@/components/search/SearchModal';
import VideoNotFound from '@/components/VideoNotFound';
import MediaPreview from './components/MediaPreview';
// import CustomDropdown from './components/CustomDropdown';
import { utils } from '@/mixins/index.js';
export default {
  name: 'ScenesPanel',
  mixins: [utils],
  components: {
    VideoNotFound,
    SearchModal,
    MediaPreview,
    VuePerfectScrollbar
    // CustomDropdown
  },
  data() {
    return {
      showSearchModal: false,
      currentScene: null,
      pptImage: false,
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 1,
        swipeEasing: true,
        scrollXMarginOffset: 100
      },
      transitionList: [
        { value: 'no_motion', label: 'No Motion' },
        { value: 'slide_in_right', label: 'Slide in Right' },
        { value: 'slide_in_left', label: 'Slide in Left' },
        { value: 'slide_in_bottom', label: 'Slide in Bottom' },
        { value: 'slide_in_top', label: 'Slide in top' },
        { value: 'fade_in', label: 'Fade In' },
        { value: 'fade_out', label: 'Fade Out' }
      ]
    };
  },
  computed: {
    selectedMedia() {
      return this.$store.state.studio.selectedFromLibraryMedia;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    sceneLength() {
      return Object.keys(this.$store.state.studio.scenes).length;
    }
  },
  methods: {
    loadSearchModal(index) {
      this.showSearchModal = true;
      this.currentScene = index;
    },
    prepareAllScenes() {
      /* this.$store.commit(
        'studio/setPrepareAllScenes',
        this.$store.state.studio.selectedFromLibraryVideos
      ); */
      this.$store.commit('studio/skipSubtitles');
      this.$store.commit('studio/toggleMusic');
    },
    addScene(index) {
      this.$store.commit('studio/addScene', index);
    },
    deleteScene(index) {
      if (this.selectedMedia.length > 1) {
        this.$store.commit('studio/deleteScene', index);
      } else {
        this.$vs.notify({
          title: 'Alert',
          text: 'Cannot delete last scene',
          color: 'primary'
        });
      }
    }
  }
};
</script>

<style scoped>
.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
.add-scene-container {
  width: 100%;
  height: 133px;
  display: flex;
  justify-content: center;
  background: #b9b9b9;
}
.image-frame {
  width: 100%;
  height: auto;
}
.scroll-area {
  position: relative;
  width: 100%;
  height: 60vh;
}
</style>
