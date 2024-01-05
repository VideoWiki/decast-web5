<template>
  <div class="margin">
    <div
      @mouseenter="show = true"
      @mouseleave="show = false"
      class="flex justify-center relative"
    >
      <video @click.prevent="click" ref="video" controls class="video">
        <source
          size="720"
          :src="`https://qa.room.video.wiki/presentation/${this.msg}/video.mp4`"
          type="video/mp4"
        />
        <track default kind="captions" label="English captions" srclang="en" />
      </video>
      <div v-if="show">
        <button v-if="play" @click="stop" class="play">
          <vs-icon
            icon-pack="feather"
            icon="icon-pause"
            size="17px"
            rounded="true"
            style="align-self: center"
          >
          </vs-icon>
        </button>
        <button v-else @click="start" class="play">
          <vs-icon
            icon-pack="feather"
            icon="icon-play"
            size="17px"
            rounded="true"
            style="align-self: center"
          >
          </vs-icon>
        </button>
      </div>
    </div>
    <div class="flex mx-2">
      <div
        class="other"
        v-for="(recording, index) in recordingList"
        :key="index"
      >
        <video @click.prevent="transfer(recording)" class="view">
          <source
            size="720"
            :src="`https://qa.room.video.wiki/presentation/${recording.url['Record ID']}/video.mp4`"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      show: false,
      play: false,
    };
  },
  computed: {
    roomsList() {
      return this.$store.state.room.rooms;
    },
    recordingList() {
      return this.$store.state.room.recordings;
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.msg = this.$route.params.id;
    console.log(this.$route.params.id);
    console.log(this.recordingList);
    this.getRecordings();
  },
  methods: {
    click() {},
    start() {
      console.log(this.$refs.video);
      this.$refs.video.play();
      this.play = true;
    },
    transfer(room) {
      console.log(room);
      window.location.href = `/recording/${room.url['Record ID']}`;
    },
    stop() {
      this.$refs.video.pause();
      this.play = false;
    },
    async getRecordings() {
      try {
        const res = await this.$store.dispatch('room/getRecordings');
        document.getElementById('loading-bg').style.display = 'none';
        console.log(res);
      } catch (e) {
        console.error('Error getting recordings', e);
      }
    },
    closePopup() {
      this.showPopup = false; // Close the popup when the SVG is clicked
      console.log('Popup closed');
    },
  },
};
</script>
<style scoped>
.margin {
  height: 100vh;
  width: 100%;
  background: #181a20;
}

.video {
  margin: 20px;
  width: 80%;
  height: 70vh;
}

.view {
  width: 100%;
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  cursor: pointer;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #a6a6a8;
  color: #a6a6a8;
  background: transparent;
}

.other {
  width: 15%;
  margin: 0 10px;
  cursor: pointer;
}
</style>
