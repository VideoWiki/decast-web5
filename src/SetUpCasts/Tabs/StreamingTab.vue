<template>
  <div class="wrapper" v-bind:class="{ style: castId !== '' }">
    <div v-if="this.castId !== ''" class="head-container">
      <h3>Share setting</h3>
      <button @click="closeCreate">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="uppar-wrap">
      <div class="wiki-stream flex">
        <div class="left flex">
          <img src="@/assets/images/editor/Vector22.svg" />
          <div class="info-text">
            <p class="main-info">VideoWiki Streaming</p>
            <p class="extra-info">
              For streaming the event on VideoWiki, choose this option and you
              will receive the stream page address in your email.
            </p>
          </div>
        </div>
        <div class="toggle-switch" @click="toggleSwitch1">
          <input type="checkbox" v-model="VWStream" class="checkbox" />
          <label class="slider"></label>
        </div>
      </div>
      <!-- <div class="private-stream flex">
        <div class="side-left flex">
          <img src="@/assets/images/editor/Vector23.svg" />
          <p class="main-info">Stream privately</p>
        </div>
        <div class="toggle-switch" @click="toggleSwitch5">
          <input
            type="checkbox"
            v-model="toggleValueStreamPrivate"
            class="checkbox"
          />
          <label class="slider"></label>
        </div>
      </div> -->
    </div>
    <div class="lower-wrap">
      <div class="horizontal-line"></div>
      <div class="third-party flex" @click="ChangeStream">
        <p class="main-info">Third Party Streaming</p>
        <img
          v-if="this.ThirdPartyStreaming"
          src="@/assets/images/editor/Vector24.svg"
        />
        <img
          v-if="!this.ThirdPartyStreaming"
          src="@/assets/images/editor/Vector25.svg"
        />
      </div>
      <div class="horizontal-line"></div>
    </div>
    <div v-if="!this.ThirdPartyStreaming" class="if-third-streaming">
      <div class="youtube flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector26.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">YouTube</p>
            <p class="extra-info">
              You can stream your event on YouTube. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <div class="toggle-switch" @click="toggleSwitch2">
          <input type="checkbox" v-model="showYoutube" class="checkbox" />
          <label class="slider"></label>
        </div>
      </div>
      <div v-if="showYoutube" class="dropDown-for-youtube">
        <div class="box-input">
          <p class="input-text">Youtube RTMP Url</p>
          <input type="text" v-model="youtube" />
        </div>
        <div class="box-input">
          <p class="input-text">Youtube Secret Key</p>
          <input type="text" v-model="youtubeSecret" />
        </div>
      </div>

      <div class="facebook flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector27.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">Facebook</p>
            <p class="extra-info">
              You can stream your event on Facebook. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <div class="toggle-switch" @click="toggleSwitch3">
          <input type="checkbox" v-model="showFacebook" class="checkbox" />
          <label class="slider"></label>
        </div>
      </div>
      <div v-if="showFacebook" class="dropDown-for-youtube">
        <div class="box-input">
          <p class="input-text">Facebook RTMP Url</p>
          <input type="text" v-model="facebook" />
        </div>
        <div class="box-input">
          <p class="input-text">Facebook Secret Key</p>
          <input type="text" v-model="facebookSecret" />
        </div>
      </div>

      <div class="twitch flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector28.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">Twitch</p>
            <p class="extra-info">
              You can stream your event on Twitch. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <div class="toggle-switch" @click="toggleSwitch4">
          <input type="checkbox" v-model="showTwitch" class="checkbox" />
          <label class="slider"></label>
        </div>
      </div>
      <div v-if="showTwitch" class="dropDown-for-youtube">
        <div class="box-input">
          <p class="input-text">Twich RTMP Url</p>
          <input type="text" v-model="twitch" />
        </div>
        <div class="box-input">
          <p class="input-text">Twich Secret Key</p>
          <input type="text" v-model="twitchSecret" />
        </div>
      </div>
    </div>
    <div class="buttonn cursor-pointer">
      <button
        v-if="this.castId !== ''"
        class="cursor-pointer"
        @click="AddStream"
      >
        Add streaming
      </button>
      <button v-else class="cursor-pointer" @click="createCastWithStream">
        Create Cast
      </button>
    </div>
    <!-- <div class="button cursor-pointer">
      <button class="cursor-pointer" @click="handleSubmit">Create Cast</button>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'Streaming',
  props: [
    'createCast',
    'stepFourProps',
    'stepOneProps',
    'stepThreeProps',
    'stepTwoProps',
    'castId',
    'closeCreate',
  ],
  data() {
    return {
      toggleValueStream: false,
      toggleValueStreamPrivate: false,
      ThirdPartyStreaming: true,
      VWStream: false,
      showYoutube: false,
      showFacebook: false,
      showTwitch: false,
      youtube: '',
      youtubeSecret: '',
      facebook: '',
      facebookSecret: '',
      twitch: '',
      twitchSecret: '',
    };
  },
  components: {},
  mounted() {
    // console.log(this.castId, 'cast--');
  },
  methods: {
    ChangeStream() {
      this.ThirdPartyStreaming = !this.ThirdPartyStreaming;
    },
    toggleSwitch1() {
      this.VWStream = !this.VWStream;
    },
    toggleSwitch2() {
      this.showYoutube = !this.showYoutube;
      this.showFacebook = false;
      this.showTwitch = false;
    },
    toggleSwitch3() {
      this.showYoutube = false;
      this.showFacebook = !this.showFacebook;
      this.showTwitch = false;
    },
    toggleSwitch4() {
      this.showYoutube = false;
      this.showFacebook = false;
      this.showTwitch = !this.showTwitch;
    },
    toggleSwitch5() {
      this.toggleValueStreamPrivate = !this.toggleValueStreamPrivate;
      if (
        !this.VWStream &&
        !this.showYoutube &&
        !this.showFacebook &&
        !this.showTwitch
      ) {
        this.toggleValueStreamPrivate = false;
      }
    },
    createCastWithStream() {
      const streamUrls = [{ vw_stream: true }, { urls: [] }];

      if (this.VWStream === true) {
        streamUrls[0].vw_stream = 'True';
      }

      if (this.youtube !== '' && this.youtubeSecret !== '') {
        streamUrls[1].urls.push(`${this.youtube}/${this.youtubeSecret}`);
      }

      if (this.facebook !== '' && this.facebookSecret !== '') {
        streamUrls[1].urls.push(`${this.facebook}/${this.facebookSecret}`);
      }

      if (this.twitch !== '' && this.twitchSecret !== '') {
        streamUrls[1].urls.push(`${this.twitch}/${this.twitchSecret}`);
      }
      if (this.toggleValueStreamPrivate === true) {
        this.stepThreeProps.public_stream = false;
      } else {
        this.stepThreeProps.public_stream = true;
      }
      const isStreaming = this.VWStream || streamUrls[1].urls.length > 0;

      this.stepThreeProps.is_streaming = isStreaming;
      this.stepThreeProps.vw_stream = streamUrls[0].vw_stream;
      this.stepThreeProps.vw_stream_url = JSON.stringify(streamUrls);

      // console.log(this.stepThreeProps.vw_stream, 'stream...');
      // console.log(this.stepThreeProps.vw_stream_url, 'urls....');
      // console.log(this.stepThreeProps.is_streaming, 'isStream');

      this.createCast();
    },
    AddStream() {
      const streamUrls = [{ vw_stream: true }, { urls: [] }];
      streamUrls[0].vw_stream = this.VWStream ? 'True' : 'False';
      if (this.youtube !== '' && this.youtubeSecret !== '') {
        streamUrls[1].urls.push(`${this.youtube}/${this.youtubeSecret}`);
      }
      if (this.facebook !== '' && this.facebookSecret !== '') {
        streamUrls[1].urls.push(`${this.facebook}/${this.facebookSecret}`);
      }
      if (this.twitch !== '' && this.twitchSecret !== '') {
        streamUrls[1].urls.push(`${this.twitch}/${this.twitchSecret}`);
      }
      if (this.toggleValueStreamPrivate === true) {
        this.stepThreeProps.public_stream = false;
      } else {
        this.stepThreeProps.public_stream = true;
      }
      const isStreaming = this.VWStream || streamUrls[1].urls.length > 0;
      const data = new FormData();
      data.append('cast_id', this.castId);
      data.append('cast_name', this.stepOneProps.event_name);
      data.append('logo', this.stepTwoProps.logo);
      data.append('cover_image', this.stepTwoProps.cover_image);
      data.append('back_image', this.stepTwoProps.back_image);
      data.append('description', this.stepOneProps.description);
      data.append('cast_type', this.stepOneProps.auth_type);
      data.append(
        'collect_attendee_email',
        this.stepOneProps.public_otp ? 'True' : 'False'
      );
      data.append('schedule_time', this.stepOneProps.schedule_time);
      data.append('timezone', this.stepOneProps.timezone);
      data.append('primary_color', this.stepTwoProps.primary_color);
      data.append('welcome_text', this.stepTwoProps.welcome_text);
      data.append('banner_text', this.stepTwoProps.banner_text);
      data.append('guest_policy', this.stepTwoProps.guest_policy);
      data.append('moderator_only_text', this.stepTwoProps.moderator_only_text);
      data.append('duration', this.stepTwoProps.duration);
      data.append('logout_url', this.stepTwoProps.logout_url);
      data.append('is_streaming', isStreaming ? 'True' : 'False');
      data.append(
        'public_stream',
        this.stepThreeProps.public_stream ? 'True' : 'False'
      );
      data.append('bbb_stream_url', JSON.stringify(streamUrls));
      data.append('record', this.stepFourProps.record ? 'True' : 'False');
      data.append(
        'end_when_no_moderator',
        this.stepFourProps.end_when_no_moderator ? 'True' : 'False'
      );
      data.append(
        'allow_moderator_to_unmute_user',
        this.stepFourProps.allow_moderator_to_unmute_user ? 'True' : 'False'
      );
      data.append(
        'auto_start_recording',
        this.stepFourProps.auto_start_recording ? 'True' : 'False'
      );
      data.append(
        'mute_on_start',
        this.stepFourProps.mute_on_start ? 'True' : 'False'
      );
      data.append(
        'webcam_only_for_moderator',
        this.stepFourProps.webcam_only_for_moderator ? 'True' : 'False'
      );
      data.append(
        'disable_cam',
        this.stepFourProps.disable_cam ? 'True' : 'False'
      );
      data.append(
        'disable_mic',
        this.stepFourProps.disable_mic ? 'True' : 'False'
      );
      data.append(
        'lock_layout',
        this.stepFourProps.lock_layout ? 'True' : 'False'
      );
      data.append(
        'viewer_mode',
        this.stepFourProps.viewer_mode ? 'True' : 'False'
      );
      data.append('private_otp', this.stepOneProps.send_otp ? 'True' : 'False');
      data.append(
        'password_auth',
        this.stepOneProps.password_auth ? 'True' : 'False'
      );
      this.$store
        .dispatch('cast/formSubmit', data)
        .then((response) => {
          // console.log(response);
          this.closeCreate();
        })
        .catch((e) => {
          if (e.response.status == 400) {
            if (e.response.data.message === 'invalid schedule time') {
              this.$vs.notify({
                color: 'danger',
                title: 'Error',
                text: 'cannot update a cast of past',
              });
            }
          }
        });
    },
    handleSubmit() {
      if (this.createCast) {
        this.createCast();
      } else {
        // console.log(this.castId);
      }
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.style {
  border-radius: 10px !important;
  padding: 20px !important;
  background-color: #1f272f !important;
  border: 1px solid #31394e !important;
}
.wrapper {
  display: flex;
  flex-direction: column;
  background-color: #1f272f;
}
.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}
.wiki-stream {
  margin-top: 29px;
  justify-content: space-between;
  align-items: center;
}
.left {
  align-items: center;
  width: 375px;
}
.left img {
  height: 10px;
  width: 14px;
  align-self: self-start;
  margin-top: 5px;
}
.info-text,
.full-info {
  margin-left: 16px;
}
.main-info {
  font-size: 13px;
  font-weight: 600;
  color: #a6a6a8;
}
.extra-info {
  font-size: 12px;
  font-weight: 400;
  color: #637181;
  margin-top: 6px;
}
.private-stream {
  width: 515px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 0px 17px;
  align-items: center;
  justify-content: space-between;
  margin: 8px auto;
}
.side-left {
  align-items: center;
}
.side-left img {
  width: 10px;
  height: 13px;
  margin-right: 16px;
}
.lower-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 514px;
  margin: 20px auto;
}
.third-party {
  width: 192px;
  height: 40px;
  border: Mixed solid #31394e;
  border-radius: 6px;
  background-color: #31394e;
  align-items: center;
  padding: 0px 16px;
  cursor: pointer;
}
.third-party img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}
.horizontal-line {
  width: 151px;
  height: 1px !important;
  background-color: #31394e;
}
.if-third-streaming {
  margin-top: -10px;
}
.box {
  justify-content: space-between;
  margin-top: 21px;
}
.stream-img {
  width: 15px;
  height: 15px;
  margin-top: 5px;
}
.dropDown-for-youtube {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.input-text {
  font-size: 12px;
  font-weight: 600px;
  color: #637181;
}
.box-input input {
  width: 265px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  padding: 0px 12px;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
}
.buttonn {
  align-self: flex-end;
  margin-top: 25px;
}
.buttonn button {
  width: 141px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #1f272f;
}
.toggle-switch {
  display: inline-block;
  position: relative;
  width: 33px;
  height: 16px;
  margin-top: 6px;
}

.checkbox {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353d4e;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 2px;
  /* bottom: 2px; */
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.checkbox:checked + .slider {
  background-color: #2196f3;
}

.checkbox:checked + .slider:before {
  transform: translateX(16px);
}
@media (max-width: 499px) {
  .wrapper .style {
    border-radius: 10px !important;
    padding: 20px !important;
    background-color: #1f272f !important;
    border: 1px solid #31394e !important;
  }
  .wrapper {
    width: 360px;
  }
  .horizontal-line {
    width: 80px;
  }
  .lower-wrap {
    width: 360px;
  }
  .left {
    width: 270px;
  }
  .full-info {
    width: 270px;
  }
  .buttonn button {
    width: 100px;
  }
  .box-input {
    width: 360px;
  }
  .box-input input {
    width: 170px;
    height: 40px;
    padding: 0px 8px;
  }
}
</style>
