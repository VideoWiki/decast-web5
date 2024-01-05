<template>
  <div class="vx-card" style="height: 100%">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4>{{ $t('studio.sidebarPanel.library.l2') }} {{ sceneNum + 1 }}</h4>
          <h6>{{$t('LibraryItem.select')}}</h6>
        </div>
      </div>
      <div class="vx-card__body">
        <vs-tabs v-model="activeTabIndex" class="-mr-3">
          <vs-tab :label="$t('LibraryItem.videos')">
            <vx-input-group class="mb-2">
              <vs-input
                v-model="searchQuery"
                :placeholder="$t('studio.sidebarPanel.library.l6')"
              />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button
                    color="primary"
                    class="vs-con-loading__container"
                    id="button-with-loading"
                    icon-pack="feather"
                    icon="icon-search"
                    :disabled="searchInProgress"
                    @click="searchMedia"
                  ></vs-button>
                </div>
              </template>
            </vx-input-group>
            <div>
              <vs-row v-if="keywords.length !== 0" class="mb-base">
                <p
                  v-for="(k, indexk) in keywords"
                  :key="`scene_${sceneNum}_${indexk}`"
                  class="font-semibold mr-3"
                  @click="addsearchVideo(k)"
                  style="
                    cursor: pointer;
                    white-space: normal;
                    overflow-wrap: break-word;
                    line-break: anywhere;
                  "
                >
                  <u>#{{ k }}</u>
                </p>
              </vs-row>
              <div v-else>
                <p
                  style="
                    cursor: pointer;
                    white-space: normal;
                    overflow-wrap: break-word;
                    line-break: anywhere;
                  "
                  class="mt-4"
                >
                  {{$t('LibraryItem.try')}}
                </p>
              </div>
              <component
                :is="scrollbarTag"
                ref="verticalNavMenuPs"
                class="scroll-area scroll-videos pr-3"
                :settings="settings"
                :key="$vs.rtl"
              >
                <div
                  v-for="(video, indexv) in videoList"
                  :key="`v_${sceneNum}_${indexv}`"
                  class="w-full mb-base"
                >
                  <MediaPreview
                    :src="video.url"
                    v-show="video.current_tag"
                    @click.native="selectMedia(video)"
                  />
                  <div
                    class="font-semibold items-left"
                    style="white-space: normal"
                    v-show="video.current_tag"
                  >
                    #{{ video.current_tag }}
                  </div>
                </div>
              </component>
            </div>
          </vs-tab>
          <vs-tab :label="$t('LibraryItem.images')">
            <vx-input-group class="mb-2">
              <vs-input
                v-model="searchQuery"
                :placeholder="$t('studio.sidebarPanel.library.l7')"
              />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button
                    color="primary"
                    class="vs-con-loading__container"
                    id="button-with-loading"
                    icon-pack="feather"
                    icon="icon-search"
                    :disabled="searchInProgress"
                    @click="searchMedia"
                  ></vs-button>
                </div>
              </template>
            </vx-input-group>
            <vs-row v-if="keywords.length !== 0" class="mb-base">
              <p
                v-for="(k, indexk) in keywords"
                :key="`scene_${sceneNum}_${indexk}`"
                class="font-semibold mr-3"
                @click="addsearchVideo(k)"
                style="
                    cursor: pointer;
                    white-space: normal;
                    overflow-wrap: break-word;
                    line-break: anywhere;
                  "
              >
                <u>#{{ k }}</u>
              </p>
            </vs-row>
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area scroll-default pr-3"
              :settings="settings"
              :key="$vs.rtl"
            >
              <div
                v-for="(image, indexi) in imageList"
                :key="`i_${sceneNum}_${indexi}`"
                class="w-full mb-base"
              >
                <MediaPreview
                  :src="image.url"
                  image
                  v-if="image.current_tag"
                  :imageId="`img_${indexi}`"
                  @click.native="selectMedia(image)"
                />
                <div
                  class="font-semibold items-left"
                  style="white-space: normal"
                >
                  #{{ image.current_tag }}
                </div>
              </div>
            </component>
          </vs-tab>
          <vs-tab :label="$t('LibraryItem.uploads')">
            <div class="text-center mb-base mt-3">
              <input
                type="file"
                :id="`realfile${sceneNum}`"
                @change="uploadFile"
                class="hidden"
                accept="video/*,image/*"
              />
              <vs-button
                size="medium"
                id="button-with-loading-library"
                class="vs-con-loading__container"
                :disabled="uploadInProgress"
                @click="chooseFile"
              >
                {{$t('LibraryItem.upload_media')}}
              </vs-button>
            </div>
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area scroll-default pr-3"
              :settings="settings"
              :key="$vs.rtl"
            >
              <div
                v-for="(media, indexu) in uploadedMedia"
                :key="`uv_${indexu}`"
                class="w-full mb-base"
              >
                <h6 class="mb-3 truncate .max-w-xxs">{{ media.fileName }}</h6>
                <MediaPreview
                  v-if="isImageUrl(media.url)"
                  :src="media.url"
                  image
                  :imageId="`u_img_${indexu}`"
                  @click.native="selectMedia({ id: null, url: media.url })"
                />
                <MediaPreview
                  v-else
                  :src="media.url"
                  @click.native="selectMedia({ id: null, url: media.url })"
                />
              </div>
            </component>
          </vs-tab>
        </vs-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import MediaPreview from './MediaPreview';
import { utils } from '@/mixins/index.js';
export default {
  name: 'LibraryItem',
  mixins: [utils],
  components: { MediaPreview, VuePerfectScrollbar },
  data() {
    return {
      searchQuery: '',
      playPromise: null,
      searchInProgress: false,
      tabIndex: 0,
      uploadInProgress: false,
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 80,
        wheelSpeed: 1,
        swipeEasing: true
      }
      /* defaultVideo: [
        '',
        'https://player.vimeo.com/external/183300007.hd.mp4?s=ca181ca041236fab57280de20de21b78a202bbf8&profile_id=174',
      ], */
    };
  },
  props: ['keywords', 'sceneNum'],
  computed: {
    uploadedMedia() {
      return this.$store.state.studio.uploadedMedia;
    },
    videoList() {
      return this.$store.state.studio.videos[this.sceneNum];
    },
    imageList() {
      return this.$store.state.studio.images[this.sceneNum];
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.isPPT;
    },
    activeTabIndex: {
      get() {
        if (this.uploadedDocumentIsPPT) {
          return 1;
        } else return this.tabIndex;
      },
      set(val) {
        this.tabIndex = val;
      }
    }
  },
  methods: {
    checkUrl(url) {
      const media = url.split('.');
      if (media[media.length - 1] !== 'mp4') return false;
      return true;
    },
    chooseFile() {
      document.getElementById(`realfile${this.sceneNum}`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.uploadInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading-library',
        scale: 0.45
      });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then(url => {
          const dataObj = {
            fileName: selectedFile.name,
            url
          };
          this.$store.commit('studio/setUploadedMedia', dataObj);
        })
        .catch(() => {
          this.$vs.notify({
            title: this.$t('LibraryItem.upload_notify.title'),
            text:  this.$t('LibraryItem.upload_notify.text'),
            color: 'danger'
          });
        })
        .finally(() => {
          document.getElementById(`realfile${this.sceneNum}`).value = '';
          this.uploadInProgress = false;
          this.$vs.loading.close(
            '#button-with-loading-library > .con-vs-loading'
          );
        });
    },
    selectMedia(mediaObj) {
      this.$store.commit('studio/selectMedia', {
        value: {
          id: mediaObj.id,
          url: mediaObj.url
        },
        sceneNum: this.sceneNum
      });
    },
    addsearchVideo(k) {
      this.searchQuery = k;
      this.searchMedia();
    },
    addKeyword() {
      const payload = {
        keyword: this.searchQuery,
        sceneNum: this.sceneNum
      };
      this.$store.commit('studio/addKeyword', payload);
    },
    searchMedia() {
      this.searchInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.4
      });
      const mediaType = this.tabIndex === 0 ? 'video' : 'image';
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
              title: this.$t('LibraryItem.search_notify.title'),
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
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });

      if (!this.keywords.includes(this.searchQuery)) {
        this.addKeyword();
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
.items-left {
  text-align: left;
  text-align: -moz-left;
  text-align: -webkit-left;
}
.scroll-area {
  position: relative;
  width: 100%;
}
.scroll-videos {
  height: 45vh;
}
.scroll-default {
  height: 60vh;
}
</style>
