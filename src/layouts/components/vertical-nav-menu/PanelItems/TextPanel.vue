<template>
  <div class="vx-card items-center" style="height: 100%">
    <div class="vx-card__collapsible-content">
      <div class="vx-card__body items-center">
        <vs-tabs v-model="tabIndex">
          <vs-tab label="Text">
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area"
              :settings="settings"
              :key="$vs.rtl"
            >
              <vx-card v-if="totalScenes === 0" no-shadow>
                <div class="info-wrapper">
                  <h5 class="font-semibold text-left mb-2">{{$t('TextPanel.work')}}</h5>
                  <p
                    style="white-space: normal;margin-bottom:3.2rem"
                    class="text-left text-sm"
                  >
                    {{$t('TextPanel.copy')}}
                  </p>
                  <img
                    src="../../../../assets/images/pages/text.svg"
                    width="80%"
                  />
                </div>
              </vx-card>
              <template v-for="(s, indexs) in $store.state.studio.scenes">
                <vx-card
                  v-if="s !== ''"
                  :key="indexs"
                  no-shadow
                  style="color: white"
                  class="mb-3 bg-primary"
                  :class="{
                    'bg-danger': invalidScenes[parseInt(indexs)]
                  }"
                >
                  <p
                    class="items-left"
                    style="white-space: normal; overflow-wrap: break-word"
                  >
                    {{ s }}
                  </p>
                </vx-card>
              </template>
            </component>
          </vs-tab>
          <vs-tab label="Upload">
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area"
              :settings="settings"
              :key="$vs.rtl"
            >
              <template v-if="uploadedDocumentIsPPT">
                <div
                  v-for="(media, indexv) in selectedMedia"
                  :key="indexv"
                  class="w-full mb-base"
                >
                  <img
                    width="100%"
                    height="auto"
                    class="cursor-pointer"
                    :src="media.url"
                  />
                </div>
              </template>
              <vx-card v-else no-shadow>
                <div class="info-wrapper">
                  <h5 class="font-semibold text-left mb-2">{{$t('TextPanel.work')}}</h5>
                  <p
                    style="white-space: normal;margin-bottom:3.2rem"
                    class="text-left text-sm"
                  >
                   {{$t('TextPanel.ppt')}}
                  </p>
                  <img
                    src="../../../../assets/images/pages/docUpload.svg"
                    width="80%"
                  />
                </div>
              </vx-card>
            </component>
          </vs-tab>
          <vs-tab label="URL">
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area"
              :settings="settings"
              :key="$vs.rtl"
            >
              <vx-card no-shadow>
                <div class="info-wrapper">
                  <h5 class="font-semibold text-left mb-2">{{$t('TextPanel.work')}}</h5>
                  <p
                    style="white-space: normal;margin-bottom:3.2rem"
                    class="text-left text-sm"
                  >
                    {{$t('TextPanel.url')}}
                  </p>
                  <img src="../../../../assets/images/pages/url.svg" />
                </div>
              </vx-card>
            </component>
          </vs-tab>
        </vs-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import VxCard from '../../../../components/vx-card/VxCard.vue';
export default {
  name: 'TextPanel',
  components: {
    VxCard,
    VuePerfectScrollbar
  },
  data() {
    return {
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 1,
        swipeEasing: true,
        scrollXMarginOffset: 100
      }
    };
  },
  computed: {
    invalidScenes() {
      return this.$store.state.studio.invalidScenes;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    selectedMedia() {
      return this.$store.state.studio.selectedFromLibraryMedia;
    },
    totalScenes() {
      return Object.keys(this.$store.state.studio.scenes).length;
    },
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.isPPT;
    },
    tabIndex: {
      get() {
        return this.$store.state.studio.tabIndex;
      },
      set(val) {
        this.$store.commit('studio/SET_TAB_INDEX', val);
      }
    }
  }
};
</script>

<style scoped>
.vx-card {
  cursor: default;
}

.vx-card__title h4 {
  color: white !important;
}

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
.upload-box {
  border: 2px dashed #7247c4;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  display: block;
}
.scroll-area {
  position: relative;
  width: 100%;
  height: 60vh;
}
.url_input {
  /*background: rgba(114, 71, 196, 0.06);*/
  border: 1px solid rgba(114, 71, 196, 0.4);
  box-sizing: border-box;
  border-radius: 6px;
  height: 42px;
  padding: 0 7px;
}
.info-wrapper {
  margin: -1.5rem;
  /* border: 1px solid; */
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  padding: 8px;
}
</style>
