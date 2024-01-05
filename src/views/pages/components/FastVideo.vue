<template>
  <div>
    <div class="flex justify-between">
      <p>Start Time : {{ prettyTime(videoRuntime[0]) }}</p>
      <p>End Time : {{ prettyTime(videoRuntime[1]) }}</p>
    </div>

    <vs-slider v-model="videoRuntime" :max="duration"></vs-slider>

    <div class="box">
      <vs-dropdown vs-custom-content vs-trigger-click flex justify-end>
        <vs-button size="small" class="font-bold">
          Speed : {{ selectedSpeedPosition() }}
        </vs-button>

        <vs-dropdown-menu>
          <template v-for="(speedOption,index) in speedOptions">
            <vs-dropdown-item
              :key="speedOption.value"
              class="font-bold"
              @click="updateSpeedPosition(index)"
            >
              {{ speedOption.text }}
            </vs-dropdown-item>
          </template>
        </vs-dropdown-menu>
      </vs-dropdown>

      <vs-button
        type="border"
        class="mr-2 font-bold"
        size="small"
        @click="$emit('hideFastbar')"
        >Cancel</vs-button
      >
      <vs-button
        type="filled"
        class="font-bold"
        size="small"
        @click="fastVideoHandler"
        >SpeedUp</vs-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'FastVideo',
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
      selectedSpeed: 0,
      speedOptions: [
        { text: '1.25 X', value: 1.25 },
        { text: '1.5 X', value: 1.5 },
        { text: '1.75 X', value: 1.75 },
        { text: '2 X', value: 2 },
        { text: '3 X', value: 3 },
        { text: '4 X', value: 4 }
      ],
      checkVideo: Function
    };
  },
  mounted() {
    const video = document.getElementById(`library_video_${this.sceneNum}`);
    video.addEventListener('durationchange', this.setDuration);
  },
  computed: {},
  methods: {
    selectedSpeedPosition() {
      return this.speedOptions[this.selectedSpeed].text;
    },
    updateSpeedPosition(pos) {
      this.selectedSpeed = pos;
      this.$emit('input', pos);
    },
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
    fastVideoHandler() {
      this.$vs.loading({
        container: `#scene_card_${this.sceneNum}`,
        text: 'Fast Forwading video',
        background: '#fff'
      });

      const payload = {
        video_url: document.getElementById(`library_video_${this.sceneNum}`)
          .src,
        speed_factor: this.speedOptions[this.selectedSpeed].value,
        start: `00:${this.prettyTime(this.videoRuntime[0])}`,
        end: `00:${this.prettyTime(this.videoRuntime[1])}`
      };
      this.$store
        .dispatch('studio/fastVideo', payload)
        .then(res => {
          this.$store.commit('studio/selectMedia', {
            sceneNum: this.sceneNum,
            value: {
              id: null,
              url: res.video_url
            }
          });
          this.$emit('hideFastbar');
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error',
            text: 'Fast Forwading Failed',
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

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.box-item {
  align-items: flex-start;
}
.fond-bold {
  font-weight: bold;
}
</style>
