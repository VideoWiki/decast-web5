<template>
  <div class="w-full">
    <div>
      <div
        class="flex flex-wrap justify-center -m-2"
        v-if="!recordedAudios[parseInt(sceneNum)] && !recordingInProcess"
      >
        <div class="p-2">
          <vs-button @click="startRecording">{{
            $t('studio.voice.v1')
          }}</vs-button>
        </div>
        <div class="p-2">
          <vs-button @click="openFile">Add Audio</vs-button>
          <input
            type="file"
            :id="`recorded_file_${sceneNum}`"
            @change="uploadRecordedFile"
            class="hidden"
            accept="audio/*"
          />
        </div>
      </div>
      <div v-show="recordingInProcess">
        <vs-button
          color="danger"
          icon="pause"
          radius
          class="mb-3 animation"
          @click="stopRecording"
        ></vs-button>
        <h6>
          {{ prettyTime | prettify }}
        </h6>
      </div>
      <div
        class="flex flex-wrap controls-wrapper"
        v-if="recordedAudios[parseInt(sceneNum)] && !recordingInProcess"
      >
        <div
          class="cursor-pointer delete-recording-btn w-full sm:w-1/10"
          @click="removeRecording"
        >
          <vs-icon icon="delete" size="20px" color="primary" />
        </div>
        <div
          class="flex flex-wrap items-center justify-center w-full sm:w-9/10"
        >
          <div class="p-2 flex sm:w-1/2 w-4/5">
            <audio controls :id="'audio_' + sceneNum" style="height: 42px">
              <source
                :src="recordedAudios[parseInt(sceneNum)]"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div class="p-2">
            <vs-button
              style="inline-text: center"
              @click="compareAudioVideoDuration"
              >Add Voice</vs-button
            >
          </div>
          <div class="p-1">
            <vx-tooltip text="Remove Voice">
              <vs-button
                icon="block"
                color="danger"
                :disabled="!addedAudioVideos[parseInt(sceneNum)]"
                @click="removeAddedAudio"
              ></vs-button>
            </vx-tooltip>
          </div>
        </div>
      </div>
    </div>
    <vs-popup title="Confirmation" :active.sync="showModal">
      <p v-if="trimVideo" class="mb-base">
        We will trim the video to match it with audio
      </p>
      <p v-else class="mb-base">
        We will loop the video to match it with audio
      </p>
      <div class="flex justify-around">
        <vs-button type="filled" color="danger" @click="showModal = false"
          >No, Record Again</vs-button
        >
        <vs-button type="filled" color="primary" @click="audioVideoMerge"
          >OK</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { utils } from '@/mixins';
const MicRecorder = require('mic-recorder-to-mp3');
export default {
  name: 'audio-recorder',
  mixins: [utils],
  props: ['sceneNum'],
  data() {
    return {
      button: null,
      recorder: null,
      recordingInProcess: false,
      recordingReady: false,
      audioBlob: null,
      audioFile: null,
      isRunning: true,
      trimVideo: false,
      showModal: false,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null,
    };
  },
  filters: {
    prettify: function (value) {
      const data = value.split(':');
      let minutes = data[0];
      let secondes = data[1];
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (secondes < 10) {
        secondes = '0' + secondes;
      }
      return minutes + ':' + secondes;
    },
  },
  computed: {
    prettyTime() {
      const time = this.time / 60;
      const minutes = parseInt(time);
      const secondes = Math.round((time - minutes) * 60);
      return minutes + ':' + secondes;
    },
    recordedAudios() {
      return this.$store.state.studio.recordedAudios;
    },
    addedAudioVideos() {
      return this.$store.state.studio.addedAudioVideos;
    },
    styles() {
      return this.$store.state.studio.styles;
    },
  },
  methods: {
    removeAddedAudio() {
      this.$store.commit('studio/setVideoWithAudio', {
        sceneNum: parseInt(this.sceneNum),
        value: null,
      });
    },
    removeRecording() {
      this.$store.commit('studio/setRecordedAudio', {
        sceneNum: parseInt(this.sceneNum),
        value: null,
      });
    },
    openFile() {
      document.getElementById(`recorded_file_${this.sceneNum}`).click();
    },
    uploadRecordedFile(event) {
      const audioFile = event.target.files[0];
      this.$vs.loading({
        background: '#fff',
        container: `#scene_card_${this.sceneNum}`,
        text: 'Uploading...',
      });
      this.$store
        .dispatch('studio/uploadMedia', audioFile)
        .then((url) => {
          this.$vs.loading.close();
          const audioObj = {
            value: url,
            sceneNum: parseInt(this.sceneNum),
          };
          this.$store.commit('studio/setRecordedAudio', audioObj);
        })
        .finally(() => {
          this.$vs.loading.close(
            `#scene_card_${this.sceneNum} > .con-vs-loading`
          );
        });
    },
    playVid() {
      const vid = document.getElementById('video_' + this.sceneNum);
      if (vid) {
        vid.currentTime = 0;
        vid.play();
      }
    },
    pauseVid() {
      const vid = document.getElementById('video_' + this.sceneNum);
      if (vid) {
        vid.pause();
      }
    },
    startRecording() {
      this.recorder
        .start()
        .then(() => {
          this.playVid();
          this.startTimer();
          this.recordingInProcess = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    toBase64(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      let base64data = null;
      return new Promise((resolve, reject) => {
        reader.onloadend = function () {
          base64data = reader.result;
          resolve(base64data);
        };
      });
    },
    stopRecording() {
      this.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          this.pauseVid();
          this.resetTimer();

          this.recordingInProcess = false;
          const audioFile = new File(
            buffer,
            'music_' + this.sceneNum + '.mp3',
            {
              type: blob.type,
              lastModified: Date.now(),
            }
          );
          this.$vs.loading({
            background: '#fff',
            container: `#scene_card_${this.sceneNum}`,
            text: 'Uploading...',
          });
          this.$store
            .dispatch('studio/uploadMedia', audioFile)
            .then((url) => {
              this.$vs.loading.close();
              const audioObj = {
                value: url,
                sceneNum: parseInt(this.sceneNum),
              };
              this.$store.commit('studio/setRecordedAudio', audioObj);
            })
            .finally(() => {
              this.$vs.loading.close(
                `#scene_card_${this.sceneNum} > .con-vs-loading`
              );
            });
          // this.$emit('updateComponent');
        });
    },
    compareAudioVideoDuration() {
      try {
        const videoDuration = document.getElementById(
          'video_' + this.sceneNum
        ).duration;
        const audioDuration = document.getElementById(
          'audio_' + this.sceneNum
        ).duration;
        if (Math.abs(audioDuration - videoDuration) > 1) {
          this.showModal = true;
          if (audioDuration < videoDuration) this.trimVideo = true;
        } else this.audioVideoMerge();
      } catch (err) {
        this.audioVideoMerge();
      }
    },
    async handleImageAudioMerge() {
      const dataObj = {
        image_url:
          this.$store.state.studio.selectedFromLibraryMedia[
            parseInt(this.sceneNum)
          ].url,
        motion: 'none',
      };
      try {
        const res = await this.$store.dispatch(
          'studio/addMotionToImage',
          dataObj
        );
        return res.data;
      } catch (err) {
        return false;
      }
    },
    async audioVideoMerge() {
      if (this.showModal) this.showModal = false;
      this.$vs.loading({
        background: '#fff',
        container: `#scene_card_${this.sceneNum}`,
        type: 'sound',
        text: 'Adding Voice...',
      });
      const fd = new FormData();
      const audioUrl = this.recordedAudios[parseInt(this.sceneNum)];
      fd.append('audio', audioUrl);
      let videoUrl = '';
      if (
        this.$store.state.studio.preparedScenesVideos[parseInt(this.sceneNum)]
      ) {
        videoUrl =
          this.$store.state.studio.preparedScenesVideos[
            parseInt(this.sceneNum)
          ];
      } else {
        videoUrl =
          this.$store.state.studio.selectedFromLibraryMedia[
            parseInt(this.sceneNum)
          ].url;
      }
      if (this.isImageUrl(videoUrl)) {
        videoUrl =
          this.getStyle('animation', this.sceneNum) === 'none'
            ? await this.handleImageAudioMerge()
            : this.selectedFromLibraryMedia[parseInt(this.sceneNum)]
                .animationUrl;
      }
      if (!videoUrl) {
        this.$vs.loading.close(
          `#scene_card_${this.sceneNum} > .con-vs-loading`
        );
        return;
      }
      // dataObj.video = videoUrl;
      fd.append('video', videoUrl);
      this.$store
        .dispatch('studio/audioVideoMerge', fd)
        .then((res) => {
          const response = {
            sceneNum: parseInt(this.sceneNum),
            value: res.data.video_url,
          };
          // this.$emit('updateComponent');
          this.$store.commit('studio/setVideoWithAudio', response);
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Cannot merge audio and video',
            color: 'danger',
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#scene_card_${this.sceneNum} > .con-vs-loading`
          );
        });
    },
    startTimer() {
      this.isRunning = true;
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.time++;
        }, 1000);
      }
    },
    stopTimer() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    resetTimer() {
      this.stopTimer();
      this.time = 0;
      this.secondes = 0;
      this.minutes = 0;
    },
  },
  mounted() {
    this.recorder = new MicRecorder({
      bitRate: 128,
    });
  },
};
</script>

<style scoped>
.mainblock {
  margin-bottom: -12%;
}

.controls-wrapper {
  border: 1px solid rgba(114, 71, 196, 0.16);
  border-radius: 4px;
}
.delete-recording-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(114, 71, 196, 0.1);
}
.animation {
  box-shadow: 0 0 0 0 rgb(116, 74, 74);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0px rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0px rgba(255, 82, 82, 0);
  }
}
</style>
