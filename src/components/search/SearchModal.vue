<template>
  <vs-popup title="Search Media" :active.sync="modalVisibility">
    <vx-input-group class="mb-4">
      <vs-input v-model="searchQuery" placeholder="Search..." />
      <template slot="append">
        <div class="append-text btn-addon">
          <vs-button
            color="primary"
            class="vs-con-loading__container"
            id="search-with-loading"
            icon-pack="feather"
            icon="icon-search"
            :disabled="searchInProgress"
            @click="searchMedia()"
          ></vs-button>
        </div>
      </template>
    </vx-input-group>
    <div class="flex justify-center -mx-2 mb-base">
      <vs-radio
        v-model="media"
        class="px-2"
        vs-name="mediaType"
        vs-value="video"
        >Videos</vs-radio
      >
      <vs-radio
        v-model="media"
        class="px-2"
        vs-name="mediaType"
        vs-value="image"
        >Images</vs-radio
      >
    </div>
    <div v-if="media === 'video'" class="flex flex-wrap -mr-2 -ml-2 -mb-2">
      <div
        v-for="(video, indexv) in videoList"
        :key="`sv_${sceneNum}_${indexv}`"
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
      >
        <MediaPreview
          :src="video.url"
          @click.native="selectMedia(video)"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div v-else class="flex flex-wrap -mr-2 -ml-2 -mb-2">
      <div
        v-for="(image, indexi) in imageList"
        :key="`si_${sceneNum}_${indexi}`"
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
      >
        <MediaPreview
          :src="image.url"
          image
          :imageId="`modal_img_${indexi}`"
          @click.native="selectMedia(image)"
        />
      </div>
    </div>
  </vs-popup>
</template>
<script>
import MediaPreview from '../../layouts/components/vertical-nav-menu/PanelItems/components/MediaPreview';
export default {
  name: 'SearchModal',
  props: ['sceneNum', 'showModal'],
  components: {
    MediaPreview
  },
  data() {
    return {
      searchQuery: '',
      searchInProgress: false,
      media: 'video'
    };
  },
  computed: {
    videoList() {
      return this.$store.state.studio.videos[this.sceneNum];
    },
    imageList() {
      return this.$store.state.studio.images[this.sceneNum];
    },
    keywords() {
      return this.$store.state.studio.keywords;
    },
    modalVisibility: {
      get() {
        return this.showModal;
      },
      set(val) {
        this.$emit('update:showModal', val);
      }
    }
  },
  methods: {
    selectMedia(mediaObj) {
      this.$emit('close');
      this.$store.commit('studio/selectMedia', {
        value: {
          id: mediaObj.id,
          url: mediaObj.url
        },
        sceneNum: this.sceneNum
      });
    },
    /* selectImage(img, zoomType) {
      this.$emit('close');
      const dataObj = {
        image_url: img,
        zoom: zoomType,
        sceneNum: this.sceneNum
      };
      this.$vs.loading({
        color: 'transparent',
        container: `#upload_scene_${this.sceneNum}`
      });
      this.$store.commit('TOGGLE_PROGRESS_BAR', false);
      this.$Progress.start();
      this.$store
        .dispatch('studio/addMotionToImage', dataObj)
        .then(() => {
          this.$Progress.finish();
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$Progress.fail();
          this.$vs.loading.close();
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.currentScene} > .con-vs-loading`
          );
          setTimeout(() => {
            this.$store.commit('TOGGLE_PROGRESS_BAR', true);
          }, 1000);
        });
    }, */
    searchMedia() {
      this.searchInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#search-with-loading',
        scale: 0.4
      });
      const mediaType = this.media;
      const dataObj = {
        searchQuery: this.searchQuery,
        srcLang: this.$store.state.studio.video.language,
        type: mediaType
      };
      this.$store
        .dispatch('studio/searchMedia', dataObj)
        .then(res => {
          if (Object.keys(res.data).length === 0) {
            this.$vs.notify({
              title: 'Not Found',
              text: `Cannot find ${mediaType}s related to this keyword`,
              color: 'danger'
            });
          } else {
            const dataObj = {
              sceneNum: this.sceneNum,
              value: res.data
            };
            mediaType === 'video'
              ? this.$store.commit('studio/setSearchedVideos', dataObj)
              : this.$store.commit('studio/setSearchedImages', dataObj);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.searchInProgress = false;
          this.$vs.loading.close(`#search-with-loading > .con-vs-loading`);
        });

      if (!this.keywords[this.sceneNum].includes(this.searchQuery)) {
        this.addKeyword();
      }
    },
    addKeyword() {
      const payload = {
        keyword: this.searchQuery,
        sceneNum: this.sceneNum
      };
      this.$store.commit('studio/addKeyword', payload);
    }
  }
};
</script>
