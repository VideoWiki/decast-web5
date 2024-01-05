<template>
  <div class="wrapper">
    <div class="tab-content" v-if="activeTab === 'CustomPopup'">
      <div class="button-first">
        <button class="custom">
          <img src="@/assets/images/editor/Vector10.svg" @click="tabChange()" />
          <label>Custom</label>
        </button>
      </div>
      <big-meeting-popup
        :stepFourProps="stepFourProps"
        :activeTab="activeTab"
      />
    </div>
    <div v-if="activeTab === ''">
      <div class="heading-text">You can edit these settings at any time</div>
      <div class="first-row flex">
        <button @click="change('BigMeetingPopup')" class="box box1">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector4.svg"
              class="left-img box1-left"
            />
            <img
              class="rightImg"
              v-if="stepFourProps.checkBox === 'BigMeetingPopup'"
              src="@/assets/images/dashboard/Vector32.svg"
            />
          </div>
          <div class="define-text">Big Meeting</div>
          <div class="info-text">Collaborate with others and work together</div>
        </button>
        <button @click="change('WebinarPopup')" class="box box2">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector6.svg"
              class="left-img box2-left"
            />
            <img
              class="rightImg"
              v-if="stepFourProps.checkBox === 'WebinarPopup'"
              src="@/assets/images/dashboard/Vector32.svg"
            />
          </div>
          <div class="define-text">Webinar</div>
          <div class="info-text">Create an engaging experience</div>
        </button>
      </div>
      <div class="second-row flex">
        <button @click="change('BroadcastPopup')" class="box box3">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector7.svg"
              class="left-img box3-left"
            />
            <img
              class="rightImg"
              v-if="stepFourProps.checkBox === 'BroadcastPopup'"
              src="@/assets/images/dashboard/Vector32.svg"
            />
          </div>
          <div class="define-text">Broadcast</div>
          <div class="info-text">Broadcast your screen to others all over</div>
        </button>
        <button @click="change('CustomPopup')" class="box box4">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector8.svg"
              class="left-img box4-left"
            />
            <img
              class="rightImg"
              v-if="stepFourProps.checkBox === 'CustomPopup'"
              src="@/assets/images/dashboard/Vector32.svg"
            />
          </div>
          <div class="define-text">Custom</div>
          <div class="info-text">Share knowledge with others and engage</div>
        </button>
      </div>
    </div>
    <div class="buttonn cursor-pointer">
      <button @click="changeActiveTab('Streaming')" class="cursor-pointer">
        Next
      </button>
      <!---<button class="cursor-pointer" @click="createCast">Create Cast</button>-->
    </div>
  </div>
</template>
<script>
import BigMeetingPopup from './settingTabPopups/BigMeetingPopup.vue';

export default {
  name: 'SettingsTab',
  components: {
    BigMeetingPopup,
  },
  props: [
    'changeActiveTab',
    'stepFourProps',
    'stepOneProps',
    'stepThreeProps',
    'stepTwoProps',
    'castId',
    'closeCreate',
  ],
  data() {
    return {
      activeTab: '',
    };
  },
  methods: {
    tabChange() {
      this.activeTab = '';
    },
    handleSubmit() {
      if (this.createCast) {
        this.createCast();
      } else {
        // console.log(this.castId);
        this.changeSettings();
      }
    },
    changeSettings() {
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
      data.append(
        'is_streaming',
        this.stepThreeProps.is_streaming ? 'True' : 'False'
      );
      data.append(
        'public_stream',
        this.stepThreeProps.public_stream ? 'True' : 'False'
      );
      data.append(
        'bbb_stream_url',
        JSON.stringify(this.stepThreeProps.vw_stream_url)
      );
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
      this.$store.dispatch('cast/formSubmit', data).then((response) => {
        // console.log(response);
        this.closeCreate();
      });
    },
    change(tab) {
      // console.log(this.tab, 'tab');

      if (tab === 'BigMeetingPopup') {
        this.stepFourProps.checkBox = 'BigMeetingPopup';
        setTimeout(() => {
          this.changeActiveTab('Streaming');
          this.activeTab = 'BigMeetingPopup';
        }, 500);
      } else if (tab === 'WebinarPopup') {
        this.stepFourProps.checkBox = 'WebinarPopup';
        setTimeout(() => {
          this.changeActiveTab('Streaming');
          this.activeTab = 'WebinarPopup';
        }, 500);
      } else if (tab === 'BroadcastPopup') {
        this.stepFourProps.checkBox = 'BroadcastPopup';
        setTimeout(() => {
          this.activeTab = 'BroadcastPopup';
          this.changeActiveTab('Streaming');
        }, 500);
      } else {
        this.activeTab = 'CustomPopup';
        this.stepFourProps.checkBox = 'CustomPopup';
      }
      // console.log(this.activeTab, 'activeTab');
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.button-first {
  margin-top: 15px;
}
.button-first button {
  width: 541px;
  height: 42px;
  border-radius: 6px;
  display: flex;
  align-self: flex-start;
  align-items: center;
}
.bigMeeting {
  background-color: #1dd3c8;
  border: 1px solid #1dd3c8;
}
.custom {
  background-color: #33db79;
  border: 1px solid #33db79;
}
.broadcast {
  background-color: #adeb5a;
  border: 1px solid #adeb5a;
}
.webinar {
  background-color: #8cd0ff;
  border: 1px solid #8cd0ff;
}
.button-first button img {
  width: 12px;
  height: 10px;
  margin-left: 14px;
  cursor: pointer;
}
.button-first button label {
  font-weight: 600;
  font-size: 14px;
  color: #1f272f;
  margin-left: 12px;
}
.first-row,
.second-row {
  justify-content: space-between;
}
.heading-text {
  margin-top: 26px;
  font-weight: 600;
  font-size: 11px;
  color: #a6a6a8;
}
.box {
  margin-top: 12px;
  width: 261px;
  height: 128px;
  border-radius: 6px;
  padding: 5px;
  padding-left: 25px;
}
.box-imges {
  display: flex;
  justify-content: space-between;
}
.left-img {
  margin-top: 18px;
}
.box1-left {
  width: 21px;
  height: 15px;
}
.box1-right {
  width: 4px;
  height: 20px;
  margin-top: -3px;
  margin-right: 5px;
}
.define-text {
  margin-top: 35px;
  font-size: 14px;
  font-weight: 600;
  color: #1f272f;
  display: flex;
  align-self: flex-start;
}
.info-text {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #1f272f;
  display: flex;
  align-self: flex-start;
}
.box1 {
  background: #1dfbeccf;
  border: 1px solid #1dfbeccf;
}
.box2 {
  background: #8cd0ff;
  border: 1px solid #8cd0ff;
}
.box3 {
  background: #adeb5a;
  border: 1px solid #adeb5a;
}
.box4 {
  background: #33db79;
  border: 1px solid #33db79;
}
.box2-left {
  width: 16px;
  height: 16px;
}
.box3-left {
  width: 24px;
  height: 16px;
}
.box3-right {
  width: 20px;
  height: 20px;
  margin-top: -5px;
}
.box4-left {
  width: 16px;
  height: 16px;
}
.box4-right {
  width: 20px;
  height: 20px;
  margin-top: -5px;
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
.rightImg {
  margin-top: -15px;
}
@media (max-width: 500px) {
  .wrapper {
    width: 360px;
    margin: auto;
    justify-content: center;
  }
  .left-img {
    margin-top: 0px;
  }
  .rightImg {
    margin-top: -8px;
  }
  .define-text {
    margin-top: 20px;
  }
  .info-text {
    margin-left: 0px !important;
    display: flex;
    align-self: flex-start !important;
    padding-left: 0px !important;
  }
  .box {
    margin-top: 10px;
    width: 172px;
    height: 100px;
    padding: 5px;
    padding-left: 5px;
  }
  .first-row {
    display: flex;
    margin: auto;
    justify-content: space-between;
  }
  .second-row {
    display: flex;
    margin: auto;
    justify-content: space-between;
  }
  .buttonn button {
    width: 100px;
  }
  .button-first button {
    width: 360px;
  }
}
</style>
