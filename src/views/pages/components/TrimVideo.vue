<template>
  <div>
    <div class="flex justify-between">
      <p>Start Time : {{ prettyTime(videoRuntime[0]) }}</p>
      <p>End Time : {{ prettyTime(videoRuntime[1]) }}</p>
    </div>
    <vs-slider v-model="videoRuntime" :max="duration"></vs-slider>
    <div class="flex justify-end">
      <vs-button
        type="border"
        class="mr-2"
        size="small"
        @click="$emit('hideTrimbar')"
        >Cancel</vs-button
      >
      <vs-button type="filled" size="small" @click="trimVideoHandler"
        >Trim</vs-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'TrimVideo',
  props: {
    sceneNum: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      duration: 0,
      videoRuntime: [0, 0],
      checkVideo: Function
    };
  },
  mounted() {
    const video = document.getElementById(`library_video_${this.sceneNum}`);
    video.addEventListener('durationchange', this.setDuration);
  },
  methods: {
    prettyTime(val) {
      const minutes = parseInt(val / 60);
      const seconds = parseInt(val);
      return (
        (minutes < 10 ? `0${minutes}` : minutes) +
        ':' +
        (seconds < 10 ? `0${seconds}` : seconds)
      );
    },
    setDuration(event) {
      this.duration = parseInt(event.target.duration);
      this.videoRuntime.splice(1, 1, this.duration);
      this.videoRuntime.splice(0, 1, 0);
    },
    trimVideoHandler() {
      this.$vs.loading({
        container: `#scene_card_${this.sceneNum}`,
        text: 'Trimming video',
        background: '#fff'
      });
      const payload = {
        video_url: document.getElementById(`library_video_${this.sceneNum}`)
          .src,
        start: `00:${this.prettyTime(this.videoRuntime[0])}`,
        end: `00:${this.prettyTime(this.videoRuntime[1])}`
      };
      this.$store
        .dispatch('studio/trimVideo', payload)
        .then(res => {
          this.$store.commit('studio/selectMedia', {
            sceneNum: this.sceneNum,
            value: {
              id: null,
              url: res.video_url
            }
          });
          this.$emit('hideTrimbar');
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error',
            text: 'Video Trim Failed',
            color: 'danger'
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#scene_card_${this.sceneNum} > .con-vs-loading`
          );
        });
    }
  }
  /* beforeDestroy() {
    const video = document.getElementById(`library_video_${this.sceneNum}`);
    video.removeEventListener('durationchange', this.setDuration);
  } */
};
</script>
