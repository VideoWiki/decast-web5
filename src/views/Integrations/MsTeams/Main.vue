<template>
  <vs-popup ref="custom_teams_modal" :active.sync="choiceModal">
    <div class="p-2">
      
      <h2 class="font-extrabold mb-4">Select from following links</h2>
      <template v-for="(link, idx) in queryContent.links">
        <vx-card
          :key="idx"
          @click="onSelectLink(idx)"
          class="cursor-pointer mt-3"
          style="background: #f3f4f6"
          noShadow
        >
          <div class="flex items-center -m-2">
            <vs-icon icon="language" size="24px" class="mr-2"></vs-icon>
            <p :title="link" class="truncate ellipsis font-medium">
              {{ link }}
            </p>
          </div></vx-card
        >
      </template>
      <vs-divider>Or</vs-divider>
      <p class="font-semibold">
        Copy paste your script into the video script box alongwith a suitable
        title in the video title
      </p>
    </div>
  </vs-popup>
</template>
<script>
export default {
  name: 'Main',
  data() {
    return {
      contentUrl: '',
      choiceModal: false,
      task_id: null,
      
      queryContent: {
        links: []
      },
      requestInterval: Function
    };
  },
  computed: {
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.isPPT;
    }
  },
  mounted() {
    this.$refs.custom_teams_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    if (this.$route.query.contentUrl) {
      const { contentUrl, tempauth, Translate, ApiVersion } = this.$route.query;
      const downloadUrl = tempauth
        ? `${contentUrl}&Translate=${Translate}&tempauth=${tempauth}&ApiVersion=${ApiVersion}`
        : contentUrl;
      this.handleUrlSubmit(downloadUrl, this.$route.query.ext);
    }
    if (this.$route.query.attachments) {
      const attachmentList = this.$route.query.attachments.split(',');
      this.queryContent.links.splice(0, 0, ...attachmentList);
    }
    if (this.$route.query.html) {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(
        this.$route.query.html,
        'text/html'
      );
      const anchorTagArray = parsedHtml.querySelectorAll('a');
      if (anchorTagArray) {
        anchorTagArray.forEach(a => {
          this.queryContent.links.push(a.href);
        });
        if (this.queryContent.links.length > 1) {
          this.choiceModal = true;
        } else if (this.queryContent.links.length === 1) {
          this.onSelectLink(0);
        } else {
          this.$vs.dialog({
            type: 'alert',
            color: 'primary',
            title: `Text too Long!`,
            acceptText: 'Okay',
            text:
              'The length of text in the message was too long. Kindly copy the text and paste it in the video script box.'
          });
        }
      }
    } else if (this.$route.query.text) {
      this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'script',
        value: this.$route.query.text
      });
    }
  },
  methods: {
    handleUrlSubmit(contentUrl, ext) {
      if (ext === 'mp4') {
        this.contentUrl = contentUrl;
        this.$validator.reset();
        this.$Progress.start();
        this.$vs.loading({ color: 'transparent' });
        this.splitIntoChunks();
      } else {
        this.fetchContent(contentUrl, ext);
      }
    },
    async splitIntoChunks() {
      const requestBody = {
        video_url: this.contentUrl,
        option: 'small',
        task_id: this.task_id
      };
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/breakVideoIntoScenes',
          requestBody
        );
        if (!this.task_id) this.task_id = apiResponse.task_id;
        if (apiResponse.status) {
          const scenes = {};
          const videos = {};
          const images = {};
          const keywords = {};
          apiResponse.data.forEach((chunkUrl, index) => {
            scenes[index] = '*add scene script*';
            videos[index] = '';
            images[index] = '';
            keywords[index] = [];
            this.$store.commit('studio/setInitialVideo', {
              indexs: index,
              value: {
                id: null,
                url: chunkUrl
              }
            });
          });
          this.$store.commit('studio/setSentences', scenes);
          this.$store.commit('studio/setVideos', videos);
          this.$store.commit('studio/setKeywords', keywords);
          this.$store.commit('studio/setImages', images);
          this.$Progress.finish();
          this.$vs.loading.close();
          setTimeout(() => this.$store.commit('studio/toggleLibrary'), 1000);
        } else {
          this.requestInterval = setTimeout(
            () => this.splitIntoChunks(),
            10000
          );
        }
      } catch (err) {
        console.log({ chunksAPIError: err });
        this.$vs.notify({
          title: 'Error',
          text: 'Fail to split video',
          color: 'danger'
        });
        // this.$Progress.fail();
        this.$vs.loading.close();
      }
    },
    fetchContent(url, ext) {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/extractInfoFromUrl', { url, ext })
        .then(data => {
          if (data.slides) {
            const scenes = {};
            /* const videos = {};
            const images = {}; */
            const kw = {};
            this.$store.commit('studio/SET_IS_PPT', true);
            Object.values(data.slides).forEach(
              ({ img_path, keywords }, index) => {
                scenes[index] = '*No notes found*';
                /* videos[index] = '';
                images[index] = [
                  { id: null, url: img_path, current_tag: 'slide' }
                ]; */
                kw[index] = keywords;
                this.$store.commit('studio/setInitialVideo', {
                  indexs: index,
                  value: {
                    id: null,
                    url: img_path
                  }
                });
              }
            );
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
                this.$Progress.finish();
                this.$vs.loading.close();
                this.$store.commit('studio/toggleLibrary');
              });
          } else {
            this.$Progress.finish();
            this.$vs.loading.close();
            this.$store.commit('studio/SET_TAB_INDEX', 0);
          }
        })
        .catch(() => {
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Invalid URL',
            text: 'No text found',
            color: 'danger'
          });
        });
    },
    onSelectLink(idx) {
      this.choiceModal = false;
      this.fetchContent(this.queryContent.links[idx]);
    }
  }
};
</script>
