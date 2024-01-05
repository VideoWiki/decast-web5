<template>
  <vx-card title="Create Video From URL">
    <div class="url-wrapper">
      <div>
        <h4 class="mb-2 font-bold" style="color: #6A6874;">
          Enter your URL Here
        </h4>
        <p style="color: #6a6874; white-space: normal" class="mb-base">
          You can submit medium Link & blog Link etc.
        </p>
        <vx-input-group class="mb-4 text-left">
          <vs-input
            v-model="contentUrl"
            class="text-primary"
            placeholder="Paste URL here"
            :disabled="extractionInProgress"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button
                color="primary"
                class="vs-con-loading__container"
                id="url-with-loading"
                :disabled="extractionInProgress"
                @click="fetchText"
                >Go</vs-button
              >
            </div>
          </template>
        </vx-input-group>
      </div>
    </div>
  </vx-card>
</template>
<script>
export default {
  name: 'ExternalUrl',
  data() {
    return {
      extractionInProgress: false,
      contentUrl: ''
    };
  },
  computed: {
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.isPPT;
    }
  },
  methods: {
    fetchText() {
      this.extractionInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#url-with-loading',
        scale: 0.4
      });
      this.$store
        .dispatch('studio/extractInfoFromUrl', {
          url: this.contentUrl,
          ext: null
        })
        .then(data => {
          this.handleApiResponse(data);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Invalid URL',
            text: 'No text found',
            color: 'danger'
          });
        })
        .finally(() => {
          this.extractionInProgress = false;
          this.$vs.loading.close('#url-with-loading > .con-vs-loading');
        });
    },
    handleApiResponse(data) {
      this.$store.commit('studio/setInitialState');
      if (data.slides) {
        const scenes = {};
        /* const videos = {};
        const images = {}; */
        const kw = {};
        this.$store.commit('studio/SET_IS_PPT', true);
        Object.values(data.slides).forEach(({ img_path, keywords }, index) => {
          scenes[index] = '*No notes found*';
          /* videos[index] = '';
          images[index] = [{ id: null, url: img_path, current_tag: 'slide' }];
          kw[index] = keywords; */
          this.$store.commit('studio/setInitialVideo', {
            indexs: index,
            value: { id: null, url: img_path }
          });
        });
        this.$store.commit('studio/setSentences', scenes);
        // this.$store.commit('studio/setVideos', videos);
        this.$store.commit('studio/setKeywords', kw);
        // this.$store.commit('studio/setImages', images);
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'script',
          value: data.script
        });
      }
      if (data.title) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'title',
          value: data.title
        });
      }
      if (data.text) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'script',
          value: data.text
        });
      }
      if (this.uploadedDocumentIsPPT) {
        this.$store
          .dispatch('studio/videoSuggestions')
          .then(() => {
            Object.values(data.slides).forEach(
              ({ img_path, keywords }, index) => {
                this.$store.commit('studio/setSearchedImages', {
                  sceneNum: index,
                  value: [{ id: null, url: img_path, current_tag: 'slide' }]
                });
              }
            );
          })
          .catch(() => {})
          .finally(() => {
            this.$store.commit('studio/toggleLibrary');
          });
      } else {
        this.$store.commit('studio/SET_TAB_INDEX', 0);
      }
    }
  }
};
</script>
<style scoped>
.url-wrapper {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid rgba(114, 71, 196, 0.16);
  border-radius: 6px;
}
</style>
