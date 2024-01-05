<template>
  <div>
    <vx-card class="scene-card vs-con-loading__container" id="preview-loading">
      <div v-if="concatStatus">
        <h4 class="text-center mb-4">Preview</h4>
        <p class="font-semibold items-left mb-base" style="white-space: normal">
          Note: This is a low quality video for rendering purposes only, when
          your are ready, extract a high quality video by publishing it.
        </p>
        <video
          width="100%"
          height="auto"
          :src="videoData.url"
          id="preview_video"
          controls
        >
          {{ $t('studio.errors.e1') }}
        </video>
        <div class="mb-base"></div>
        <div class="flex justify-center align-center flex-wrap">
          <div v-if="!insideIframe" class="p-2">
            <span v-if="teamsInitialized === true"></span>
            <vs-button v-else @click="beforeSubmit('publish')">{{
              $t('studio.publish.p1')
            }}</vs-button>
          </div>
          <div class="p-2">
            <span v-if="teamsInitialized === true"></span>
            <vs-button v-else @click.prevent="beforeSubmit('save')"
              >Save Draft</vs-button
            >
          </div>

          <div class="p-2">
            <!-- <vs-button
              class=" px-4 vs-con-loading__container"
              id="download-with-loading"
              icon="get_app"
              :disabled="downloadInProgress"
              @click.prevent="handleDownloadHighQualityVideo"
              >Download</vs-button
            > -->
            <span v-if="teamsInitialized === true"></span>
            <vs-dropdown
              v-else
              vs-custom-content
              vs-trigger-click
              flex
              justify-end
            >
              <vs-button size="medium"> Download </vs-button>

              <vs-dropdown-menu>
                <template v-for="typeOfVideo in typeOfVideos">
                  <vs-dropdown-item
                    :key="typeOfVideo.text"
                    class="px-4 vs-con-loading__container"
                    id="download-with-loading"
                    icon="get_app"
                    :disabled="downloadInProgress"
                    @click.prevent="functionDownload(typeOfVideo.value)"
                  >
                    <!-- <span v-if="teamsInitialized === true">{{
                      typeOfVideo.index
                    }}</span> -->
                    <span>
                      {{ typeOfVideo.text }}
                    </span>
                  </vs-dropdown-item>
                </template>
              </vs-dropdown-menu>
            </vs-dropdown>
            <div
              v-if="teamsInitialized === true"
              class="centerx con-exemple-prompt"
            >
              <!-- <vs-button @click="openPrompt" color="primary" type="border">Run prompt</vs-button> -->
              <div class="modelx">
                {{ val == null ? 'null' : val }}
              </div>

              <div class="modelx">
                <!-- {{valMultipe.value1}}
       {{valMultipe.value2}} -->
              </div>
              <vs-button
                @click="activePrompt2 = true"
                color="primary"
                type="border"
                >Download</vs-button
              >

              <vs-prompt
                color="rgb(69,68,202)"
                @cancel="valMultipe.value1 = ''"
                @accept="handleDownloadTeams()"
                @close="close"
                :is-valid="validName"
                :active.sync="activePrompt2"
              >
                <div class="con-exemple-prompt">
                  Enter your <b>Email ID</b> ,So that we can send the video
                  link.
                  <vs-input placeholder="Email" v-model="valMultipe.value1" />

                  <vs-alert
                    :active="!validateEmail"
                    color="danger"
                    icon="new_releases"
                  >
                    Please Enter Valid Email Id to receive the video link
                  </vs-alert>
                </div>
              </vs-prompt>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex justify-center items-center"
        style="height: 430px"
      >
        <div class="p-4">
          <vs-icon icon="error" size="80px" color="danger" />
          <h4 class="mb-base">Your Video preview was not generated</h4>
          <vs-button type="filled" @click="collectScenes">Retry</vs-button>
        </div>
      </div>
    </vx-card>
    <Transaction
      :show="showTransactionModal"
      transactionType="Publish"
      :transactionPhase="currentTxPhase"
      @close="showTransactionModal = false"
      @retry="publishVideo"
    />
  </div>
</template>

<script>
import * as microsoftTeams from '@microsoft/teams-js';
import constants from '../../../constant';
import axios from 'axios';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import { mapState } from 'vuex';
import { utils } from '@/mixins/index.js';
export default {
  name: 'PublishVideo',
  mixins: [utils],
  components: {
    Transaction,
  },
  data() {
    return {
      typeOfVideos: [
        { text: 'Low Quality', value: 0 },
        { text: 'High Quality', value: 1 },
      ],

      activePrompt: false,
      activePrompt2: false,
      val: '',
      valMultipe: {
        value1: '',
        value2: '',
      },
      player: null,
      finalScenes: [],
      indexs: 0,
      constants,
      // showAlert: false,
      task_id: null,
      videoId: null,
      downloadInProgress: false,
      showTransactionModal: false,
      concatStatus: true,
      teamsInitialized: false,
      currentTxPhase: 'Processing',
      previewReq: Function,
    };
  },

  created() {
    var teamsInitialized = false;
    microsoftTeams.initialize(() => {
      teamsInitialized = true;
    });

    setTimeout(() => {
      if (teamsInitialized) {
        this.teamsInitialized = true;
      } else {
      }
    }, 0);
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    getFilename() {
      return `${this.$store.state.studio.video.title}_videowiki.mp4`;
    },
    validName() {
      return this.valMultipe.value1 && this.valMultipe.value2;
    },
    usersData() {
      return this.$store.state.AppActiveUser;
    },
    videoData() {
      return this.$store.state.studio.video;
    },
    videoTxData() {
      return this.$store.state.studio.videoTxData;
    },
    scenes() {
      return this.$store.state.studio.scenes;
    },
    sceneTransitionList() {
      return this.$store.state.studio.sceneTransition;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    },
  },
  mounted() {
    if (this.$route.params.videoId) {
      this.videoId = this.$route.params.videoId;
    }
    if (this.videoData.url) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: `Confirm`,
        acceptText: 'Yes',
        text: 'Do you want to generate the Preview again ?',
        accept: this.collectScenes,
      });
    } else {
      this.collectScenes();
    }
  },
  methods: {
    functionDownload(index) {
      if (index == 0) {
        this.handleDownloadLowQualityVideo();
      } else if (this.isUserLoggedIn()) {
        this.handleDownloadHighQualityVideo();
      } else {
        this.$store.commit('TOGGLE_LOGIN_POPUP', true);
      }
    },
    acceptAlert(color) {
      this.$vs.notify({
        color: 'success',
        title: 'Accept Selected',
        text: 'Lorem ipsum dolor sit amet, consectetur',
      });
    },

    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!',
      });
    },
    collectScenes() {
      this.concatStatus = true;
      this.finalScenes = [];
      this.$store.commit('studio/setPreviewVideo', null);
      this.$vs.loading({
        background: '#fff',
        container: '#preview-loading',
        text: 'Generating Preview...',
      });
      const libraryItems = this.$store.state.studio.selectedFromLibraryMedia;
      const preparedScene = this.$store.state.studio.preparedScenesVideos;
      const audioVideo = this.$store.state.studio.addedAudioVideos;
      // TODO: remove this for loop use forEach
      for (let i = 0; i <= Object.keys(this.scenes).length; i++) {
        if (audioVideo[i]) {
          this.finalScenes.push(audioVideo[i]);
        } else if (preparedScene[i]) {
          this.finalScenes.push(preparedScene[i]);
        } else if (libraryItems[i]) {
          const requiredUrl =
            libraryItems[i].animationUrl || libraryItems[i].url;
          this.finalScenes.push(requiredUrl);
        }
      }
      this.concatVideos();
    },
    async concatVideos() {
      const collectedScenes = {
        videos: this.finalScenes,
        task_id: this.task_id,
        isPreview: 1,
        width: '480',
        height: '360',
        motions: this.sceneTransitionList,
        bgm: this.videoData.bg_music.url || null,
        email: '',
      };
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/concatenateVideos',
          collectedScenes
        );
        if (!this.task_id) this.task_id = apiResponse.task_id;
        if (apiResponse.data && apiResponse.data.video_url) {
          this.$store.commit('studio/SET_VIDEO_ATTR', {
            key: 'url',
            value: apiResponse.data.video_url,
          });
          this.$vs.loading.close('#preview-loading > .con-vs-loading');
        } else {
          this.previewReq = setTimeout(() => this.concatVideos(), 15000);
        }
      } catch (err) {
        this.concatStatus = false;
        this.$vs.loading.close('#preview-loading > .con-vs-loading');
        this.$vs.notify({
          title: 'Error',
          text: err.response.data.message,
          color: 'danger',
        });
      }
    },
    async publishVideo() {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      const data = this.getPostData();
      /* Ajax call start */
      this.$store
        .dispatch('studio/publishVideo', data)
        .then((res) => {
          if (this.videoData.is_paid) {
            const payload = {
              dataToken: this.videoTxData.dataTokenAddress,
              dod: this.videoTxData.did,
              exchange_key: this.videoTxData.exchangeId,
              paid: this.videoData.is_paid,
              video_id: res.data.id,
            };
            this.$store
              .dispatch('studio/postTxData', payload)
              .then(() => {
                this.$Progress.finish();
                this.$vs.loading.close();
                this.$router.push('/dashboard');
                this.$vs.notify({
                  title: 'Success',
                  text: 'Video Published Successfully',
                  color: 'success',
                });
              })
              .catch((err) => {
                console.log(err);
                this.$Progress.fail();
                this.$vs.loading.close();
                this.$vs.notify({
                  title: 'Error',
                  text: 'Video Tx data was not saved',
                  color: 'danger',
                });
              });
            return;
          }
          this.$Progress.finish();
          this.$vs.loading.close();
          this.$router.push('/dashboard');
          this.$vs.notify({
            title: 'Success',
            text: 'Video Published Successfully',
            color: 'success',
          });
        })
        .catch((err) => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: 'Video was not published',
            color: 'danger',
          });
        });
    },
    async handlePaidVideo() {
      if (this.$store.state.isWalletConnected) {
        const payload = {
          author: this.usersData.firstName,
          metaData: {
            url: this.videoData.url,
            title: this.videoData.title,
          },
        };
        this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
        this.currentTxPhase = 'Processing';
        this.showTransactionModal = true;
        try {
          await this.$store.dispatch('publishToOcean', payload);
          setTimeout(() => {
            this.showTransactionModal = false;
            this.publishVideo();
          }, 2000);
        } catch (error) {
          if (error.code === 4001) this.currentTxPhase = 'Rejected';
          else this.currentTxPhase = 'Failed';
        }
      } else {
        this.$vs.notify({
          text: 'Connect your Wallet First',
          color: 'primary',
        });
      }
    },
    saveVideo() {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      const data = this.getPostData();
      this.$store
        .dispatch('studio/saveVideo', data)
        .then((res) => {
          this.$Progress.finish();
          this.$vs.loading.close();
          this.$router.push('/mycasts');
          this.$vs.notify({
            title: 'Success',
            text: 'Video Saved Successfully',
            color: 'success',
          });
        })
        .catch((err) => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: 'Video was not saved',
            color: 'danger',
          });
        });
    },
    beforeSubmit(actionType) {
      if (this.isUserLoggedIn()) {
        const title = this.videoData.title;
        const desc = this.videoData.description;
        if (title !== '' && desc !== '') {
          actionType === 'publish'
            ? this.videoData.is_paid
              ? this.handlePaidVideo()
              : this.publishVideo()
            : this.saveVideo();
        } else {
          this.$vs.notify({
            title: 'Input Missing',
            text: 'Title/Description cannot be empty',
            color: 'primary',
          });
        }
      } else {
        this.$store.commit('TOGGLE_LOGIN_POPUP', true);
      }
      return false;
    },

    getPostData() {
      const studioState = this.$store.state.studio;
      const data = {
        user_id: this.usersData.id,
        ...this.videoData,
        duration: document.getElementById('preview_video').duration,
        scenes: this.getSceneData(studioState),
        tags: studioState.tags,
      };
      return data;
    },
    getSceneData(studioState) {
      const scenes = {};
      Object.values(this.scenes)
        .filter((scene, index) => {
          return !!studioState.selectedFromLibraryMedia[index];
        })
        .forEach((value, index) => {
          const { font_color, text_position, background_color, animation } =
            studioState.styles[index];

          scenes[index] = {
            title: `sceneNo${index}`,
            transition: this.sceneTransitionList[index] || '',
            subtitle: {
              text: value,
              style: {
                alignment: 'left',
                font_style: 'roboto',
                font_size: '14',
                font_type: 'bold',
                text_position,
                font_color,
                background_color,
              },
            },
            media: {
              url: studioState.selectedFromLibraryMedia[index].url,
              source: 'library',
              type: 'image',
              source_site: 'pixaby',
              lib_media_id: studioState.selectedFromLibraryMedia[index].id,
              duration: null,
              animation: animation || 'none',
            },
            audio: {
              source: 'upload',
              url: studioState.recordedAudios[index] || null,
            },
            keywords: studioState.keywords[index],
          };
          // get media source and type
          if (scenes[index].media.url) {
            const videoUrl = new URL(scenes[index].media.url);
            const urlType = this.isImageUrl(scenes[index].media.url)
              ? 'image'
              : 'video';
            scenes[index].media.source =
              videoUrl.origin === constants.apiUrl ? 'upload' : 'library';
            scenes[index].media.type = urlType;
          }
        });
      return scenes;
    },

    handleDownloadLowQualityVideo() {
      this.downloadInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#download-with-loading',
        scale: 0.45,
      });
      axios
        .get(this.videoData.url, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'video/mp4' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = this.getFilename;
          link.click();
          URL.revokeObjectURL(link.href);
          this.$vs.notify({
            title: 'Success',
            text: 'Video Download Successfully',
            color: 'success',
            fixed: true,
            click: () => {},
          });
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Download Failed',
            color: 'danger',
          });
        })
        .finally(() => {
          this.downloadInProgress = false;
          this.$vs.loading.close('#download-with-loading > .con-vs-loading');
        });
    },
    async handleDownloadHighQualityVideo() {
      const collectedScenes = {
        videos: this.finalScenes,
        task_id: null,
        isPreview: 0,
        width: '1280',
        height: '720',
        motions: this.sceneTransitionList,
        bgm: this.videoData.bg_music.url || null,
        email: this.usersData.email,
      };
      this.$vs.notify({
        color: 'success',
        title: 'Processing...',
        text: 'We got your Email ID! ...Please wait',
      });
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/concatenateVideos',
          collectedScenes
        );
        this.$vs.notify({
          title: 'Success',
          text: 'You will receive download link shortly via email',
          color: 'success',
          fixed: true,
          click: () => {},
        });
      } catch (err) {
        this.$vs.notify({
          title: 'Error',
          text: err.response.data.message,
          color: 'danger',
        });
      }
    },
    beforeDestroy() {
      clearTimeout(this.previewReq);
    },
    async handleDownloadTeams() {
      const collectedScenes = {
        videos: this.finalScenes,
        task_id: null,
        isPreview: 1,
        width: '1280',
        height: '720',
        motions: this.sceneTransitionList,
        bgm: this.videoData.bg_music.url || null,
        email: this.valMultipe.value1,
      };
      this.$vs.notify({
        color: 'success',
        title: 'Processing...',
        text: 'We got your Email ID! ...Please wait',
      });
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/concatenateVideos',
          collectedScenes
        );
        this.$vs.notify({
          title: 'Success',
          text: 'You will receive download link shortly via email',
          color: 'success',
          fixed: true,
          click: () => {},
        });
      } catch (err) {
        this.$vs.notify({
          title: 'Error',
          text: err.response.data.message,
          color: 'danger',
        });
      }
    },
  },
};
</script>

<style scoped>
.vs-con-loading__container {
  z-index: 10 !important;
}
</style>