<template>
  <div class="items-center">
    <MsTeams />
    <div class="w-full lg:w-2/3 md:w-4/5">
      <EditScript v-if="$store.state.studio.panel.text" />
      <SelectVideos v-else-if="$store.state.studio.panel.library" />
      <EditScenes v-else-if="$store.state.studio.panel.scenes" />
      <AddMusic v-else-if="$store.state.studio.panel.music" />
      <PublishVideo v-else-if="$store.state.studio.panel.publish" />
    </div>
  </div>
</template>

<script>
import EditScript from './pages/EditScript';
import SelectVideos from './pages/SelectMedia';
import PublishVideo from './pages/PublishVideo';
import EditScenes from './pages/EditScenes';
import AddMusic from './pages/AddMusic';
import MsTeams from './Integrations/MsTeams/Main';

export default {
  data() {
    return {};
  },
  components: {
    // FormatVideo,
    AddMusic,
    EditScenes,
    PublishVideo,
    SelectVideos,
    EditScript,
    MsTeams,
  },
  created() {
    if (this.$route.params.videoId) {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.getVideoData();
    } else this.clearState();
    if (window.location !== window.parent.location) {
      document.body.style.zoom = '0.8';
    }
  },
  mounted() {
    if (this.$route.query.meetingId) {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.getVideoChunks(this.$route.query.meetingId);
    }
    // Clear all query params
    if (Object.keys(this.$route.query).length !== 0) {
      this.$router.replace({ query: null });
    }
  },
  methods: {
    getVideoData() {
      this.$store
        .dispatch('studio/getVideoData', this.$route.params.videoId)
        .then(() => {
          this.$store
            .dispatch('studio/videoSuggestions')
            .then(() => {
              this.$Progress.finish();
            })
            .catch(() => {
              this.$Progress.fail();
              this.$router.push('/mycasts');
              this.$vs.notify({
                title: 'Error',
                text: 'Cannot fetch video data',
                color: 'danger',
              });
            })
            .finally(() => {
              this.$vs.loading.close();
            });
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$router.push('/mycasts');
          this.$vs.notify({
            title: 'Error',
            text: 'Cannot fetch video data',
            color: 'danger',
          });
        });
    },
    getVideoChunks(meetingId) {
      this.$store
        .dispatch('studio/fetchVideoChunks', meetingId)
        .then((apiResponse) => {
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
                url: chunkUrl,
              },
            });
          });
          this.$store.commit('studio/setSentences', scenes);
          this.$store.commit('studio/setVideos', videos);
          this.$store.commit('studio/setKeywords', keywords);
          this.$store.commit('studio/setImages', images);
          this.$Progress.finish();
          this.$vs.loading.close();
          setTimeout(() => this.$store.commit('studio/toggleLibrary'), 1000);
        })
        .catch((err) => {
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: err.response.data.message,
            color: 'danger',
          });
        });
    },
    clearState() {
      this.$store.dispatch('studio/resetState');
    },
  },
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

.items-right {
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
}
</style>
