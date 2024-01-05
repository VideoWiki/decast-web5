<template>
  <div class="stream-container">
    <div class="margin">
      <div class="head-container">
        <h3>Share setting</h3>
        <button @click="closeCreate">
          <img src="@/assets/images/cross.svg" />
        </button>
      </div>

      <div class="main-cont">
        <div class="child-div-1">
          <div class="inner-div-1">
            <img src="@/assets/images/meeting.svg" />
          </div>
          <div class="inner-div-2">
            <h3>VideoWiki Streaming</h3>
            <p>
              For streaming the event on VideoWiki, choose this option, and you
              will receive the stream page address in your email.
            </p>
          </div>
        </div>

        <div class="toggle-switch" @click="toggleSwitch1">
          <input type="checkbox" v-model="VWStream" class="checkbox" />
          <label class="slider"></label>
        </div>
      </div>

      <div class="mid-stroke">
        <div>
          <h3>Third Party Streaming</h3>
        </div>

        <div></div>
      </div>

      <div class="main-cont">
        <div class="child-div-1">
          <div class="inner-div-1">
            <img src="@/assets/images/youtube.svg" />
          </div>
          <div class="inner-div-2">
            <h3>YouTube</h3>
            <p class="desc">
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

      <div class="isVisible" v-if="showYoutube">
        <div>
          <label>Youtube RTMP Url</label>
          <input v-model="youtube" />
        </div>
        <div>
          <label>Youtube Secret Key</label>
          <input v-model="youtubeSecret" />
        </div>
      </div>

      <div class="main-cont">
        <div class="child-div-1">
          <div class="inner-div-1">
            <img src="@/assets/images/facebook.svg" />
          </div>
          <div class="inner-div-2">
            <h3>Facebook</h3>
            <p class="desc">
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
      <div class="isVisible" v-if="showFacebook">
        <div>
          <label>Facebook RTMP Url</label>
          <input v-model="facebook" />
        </div>
        <div>
          <label>Facebook Secret Key</label>
          <input v-model="facebookSecret" />
        </div>
      </div>

      <div class="main-cont">
        <div class="child-div-1">
          <div class="inner-div-1">
            <img src="@/assets/images/twitch.svg" />
          </div>
          <div class="inner-div-2">
            <h3>Twitch</h3>
            <p class="desc">
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
      <div class="isVisible" v-if="showTwitch">
        <div>
          <label>Twitch RTMP Url</label>
          <input v-model="twitch" />
        </div>
        <div>
          <label>Twitch Secret Key</label>
          <input v-model="twitchSecret" />
        </div>
      </div>
      <div class="button cursor-pointer">
        <button @click="AddStream" class="cursor-pointer">Add streaming</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StreamCard',
  props: [
    'closeCreate',
    'stepOneProps',
    'stepFourProps',
    'stepThreeProps',
    'stepTwoProps',
    'castId',
  ],
  data() {
    return {
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
  mounted() {},
  methods: {
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
      try {
        this.$store.dispatch('cast/formSubmit', data).then((response) => {
          console.log(response);
          this.$vs.notify({
            title: 'Success',
            text: 'Changes Saved',
            color: 'success',
          });
          this.closeCreate();
        });
      } catch (e) {
        console.log(e);
        this.$vs.notify({
          title: 'Error',
          text: 'Changes Not Saved',
          color: 'danger',
        });
      }
    },
  },
};
</script>

<style scoped>
.margin {
  padding: 18px;
}

.stream-container {
  background: #1f272f;
  border-radius: 10px;
  width: 583px;
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

.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
}
.button button {
  width: 141px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #1f272f;
}
</style>

<style scoped>
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

.main-cont {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
}

.child-div-1 {
  display: flex;
  width: 360px;
  gap: 10px;
}

.inner-div-1 {
  width: fit-content;
}

.inner-div-1 img {
  width: 18px;
  height: auto;
  max-height: 19.5px;
}

.inner-div-2 {
  width: fit-content;
}

.inner-div-2 h3 {
  font-size: 13px;
  font-weight: 600;
  line-height: 15.2px;
  color: #a6a6a8;
}

.inner-div-2 p {
  font-size: 11px;
  font-weight: 400;
  line-height: 14.03px;
  color: #637181;
  width: 355px;
  /* border: 1px solid red; */
  margin-top: 6px;
}

.mid-stroke {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.mid-stroke div h3 {
  font-size: 13px;
  font-weight: 600;
  line-height: 15.2px;
  color: #a6a6a8;
}

.mid-stroke div:nth-child(2) {
  width: 395px;
  border: 1px solid #31394e;
  margin: auto;
}

.desc {
  width: max-content !important;
  /* border: 1px solid red; */
}

.isVisible {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  gap: 15px;
}

.isVisible label {
  color: #637181;
  font-size: 12px;
  font-weight: 600;
}

.isVisible input {
  background-color: #1d232b;
  width: 271px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  padding: 6px;
  color: #a6a6a8;
}
</style>
