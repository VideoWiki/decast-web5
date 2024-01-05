<template>
  <vx-card title="Upload a PPT or PDF File">
    <div class="upload-box-wrapper">
      <div
        class="upload-box"
        @click="chooseFile"
        @dragover.prevent
        @drop.prevent="uploadDocument"
      >
        <input
          type="file"
          id="upload-doc"
          @change="uploadDocument"
          class="hidden"
          accept=".docx,.pdf,.ppt,.pptx,.doc"
        />
        <div class="upload-box-inner">
          <vs-icon
            color="primary"
            rounded
            icon="add_circle"
            :size="$store.state.windowWidth < 500 ? '52px' : '72px'"
            class="mb-4"
          ></vs-icon>
          <p
            class="font-semibold text-primary text-sm sm:text-xl"
            style="white-space: normal"
          >
            Choose a file or drag it here
          </p>
          <!--p class="text-primary text-sm" style="white-space: normal">
            Maximum file upload file size 500 MB
          </p-->
        </div>
      </div>
    </div>
  </vx-card>
</template>
<script>
export default {
  name: 'DocumentUpload',
  data() {
    return {
      selectedFile: ''
    };
  },
  computed: {
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.isPPT;
    }
  },
  methods: {
    chooseFile() {
      document.getElementById('upload-doc').click();
    },
    uploadDocument(event) {
      const Files = event.target.files || event.dataTransfer.files;
      const selectedFile = Files[0];
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/uploadDoc', selectedFile)
        .then(data => {
          document.getElementById('upload-doc').value = '';
          this.handleApiResponse(data);
          // this.$Progress.finish();
        })
        .catch(err => {
          document.getElementById('upload-doc').value = '';
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Fail to parse document',
            color: 'danger'
          });
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
          images[index] = [{ id: null, url: img_path, current_tag: 'slide' }]; */
          kw[index] = keywords;
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
            this.$Progress.finish();
            this.$vs.loading.close();
            this.$store.commit('studio/toggleLibrary');
          });
      } else {
        this.$Progress.finish();
        this.$vs.loading.close();
        this.$store.commit('studio/SET_TAB_INDEX', 0);
      }
    }
  }
};
</script>
<style scoped>
.upload-box-wrapper {
  border: 1.4px dashed #7247c4;
  border-radius: 6px;
  padding: 10px;
}
.upload-box {
  background: rgba(114, 71, 196, 0.06);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  cursor: pointer;
}
</style>
