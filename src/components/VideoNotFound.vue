<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center justify-center">
      <vs-button
        type="filled"
        class="mr-2"
        :size="$store.state.windowWidth < 400 ? 'small' : 'default'"
        @click="$emit('search', sceneNum)"
        >Search</vs-button
      >
      <input
        type="file"
        :id="`add_scene_${sceneNum}`"
        @change="uploadFile($event)"
        class="hidden"
        accept="video/*,image/*"
      />
      <vs-button
        type="filled"
        @click="chooseFile"
        :size="$store.state.windowWidth < 400 ? 'small' : 'default'"
        >Upload</vs-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoNotFound',
  props: ['sceneNum'],
  data() {
    return {
      showEffectModal: false,
      currentUploadedImage: null,
    };
  },
  methods: {
    chooseFile() {
      document.getElementById(`add_scene_${this.sceneNum}`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.$vs.loading({
        container: `#upload_scene_${this.sceneNum}`,
      });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then((url) => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
          this.$store.commit('studio/selectMedia', {
            sceneNum: this.sceneNum,
            value: {
              id: null,
              url,
            },
          });
          this.currentUploadedImage = url;
          const dataObj = {
            fileName: selectedFile.name,
            url,
          };
          this.$store.commit('studio/setUploadedMedia', dataObj);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Media upload failed',
            color: 'danger',
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
        });
    },
  },
};
</script>
<style scoped>
.effect-card {
  display: flex;
  justify-content: center;
}
.effect-card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
}
</style>
