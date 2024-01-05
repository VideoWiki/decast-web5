<template>
  <div class="tab-container" v-if="show">
    <div class="general">
      <div class="setting flex cursor-pointer" @click="toggleDropdown">
        <div class="left-side flex">
          <label>General settings</label>
          <p>Set custom settings for your meeting.</p>
        </div>
        <img v-if="!isDropdownOpen" src="@/assets/images/editor/Group.svg" />
        <img v-else src="@/assets/images/editor/Group1.svg" />
      </div>
      <div class="dropdown first-drop" v-if="isDropdownOpen">
        <div class="for-recording flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector11.svg" />
            <div class="text-info">
              <label>Recording</label>
              <p>
                Allow the recording of the session. Recording can be paused and
                restarted multiple times.
              </p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle
              v-model="stepFourProps.start_stop_recording"
            ></buttonToggle>
          </div>
        </div>
        <div class="for-auto-record flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Group155.svg" />
            <div class="text-info">
              <label>Auto Start Recording</label>
              <p>The event will automatically be recorded when it starts.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle v-model="stepFourProps.record"></buttonToggle>
          </div>
        </div>
        <div class="for-mute flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector12.svg" />
            <div class="text-info">
              <label>Allow Moderator To Unmute User</label>
              <p>Moderators will be able to unmute users.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle
              v-model="stepFourProps.allow_moderator_to_unmute_user"
            ></buttonToggle>
          </div>
        </div>
        <div class="for-end flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector13.svg" />
            <div class="text-info">
              <label>End When No Moderator</label>
              <p>Cast will end when all moderators leave.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle
              v-model="stepFourProps.end_when_no_moderator"
            ></buttonToggle>
          </div>
        </div>
        <div class="for-lock flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector15.svg" />
            <div class="text-info">
              <label>Lock Layout</label>
              <p>Layout of the meeting is locked and cannot be changed.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle v-model="stepFourProps.lock_layout"></buttonToggle>
          </div>
        </div>
      </div>
    </div>
    <div class="participant">
      <div class="setting flex cursor-pointer" @click="toggleDropdown2">
        <div class="left-side flex">
          <label>Participant settings</label>
          <p>Configure these settings to restrict participant actions.</p>
        </div>
        <img v-if="!isDropdownOpen2" src="@/assets/images/editor/Group.svg" />
        <img v-else src="@/assets/images/editor/Group1.svg" />
      </div>
      <div class="dropdown second-drop" v-if="isDropdownOpen2">
        <div class="for-lock flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector16.svg" />
            <div class="text-info">
              <label>Mute On Start</label>
              <p>Attendees will be muted when they join the event.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle v-model="stepFourProps.mute_on_start"></buttonToggle>
          </div>
        </div>
        <div class="for-lock flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector17.svg" />
            <div class="text-info">
              <label>Webcam Moderator Only</label>
              <p>Attendees will not be allowed to enable their webcams.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle
              v-model="stepFourProps.webcam_only_for_moderator"
            ></buttonToggle>
          </div>
        </div>
        <div class="for-lock flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector18.svg" />
            <div class="text-info">
              <label>Disable Mic</label>
              <p>Attendees will not be allowed to use their microphones.</p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle v-model="stepFourProps.disable_mic"></buttonToggle>
          </div>
        </div>
        <div class="for-lock flex same-style">
          <div class="left-one">
            <img src="@/assets/images/editor/Vector19.svg" />
            <div class="text-info">
              <label>View Only Mode</label>
              <p>
                Switch this on to enable viewer mode. This mode only allows user
                to listen to the cast.
              </p>
            </div>
          </div>
          <div class="right-one">
            <buttonToggle v-model="stepFourProps.viewer_mode"></buttonToggle>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonToggle from '../../Tabs/buttonToggle.vue';
export default {
  data() {
    return {
      isDropdownOpen: true,
      isDropdownOpen2: false,
      toggleValue: false,
      show: false,
    };
  },
  props: ['stepFourProps', 'activeTab'],
  components: {
    buttonToggle,
  },
  mounted() {
    this.stepFourPropsBound();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = true;
      this.isDropdownOpen2 = false;
    },
    toggleDropdown2() {
      this.isDropdownOpen = false;
      this.isDropdownOpen2 = true;
    },
    stepFourPropsBound() {
      console.log(this.activeTab);
      if (this.activeTab === 'BigMeetingPopup') {
        this.stepFourProps.record = true;
        this.stepFourProps.auto_start_recording = false;
        this.stepFourProps.allow_moderator_to_unmute_user = true;
        this.stepFourProps.end_when_no_moderator = false;
        this.stepFourProps.lock_layout = false;
        this.stepFourProps.mute_on_start = true;
        this.stepFourProps.webcam_only_for_moderator = false;
        this.stepFourProps.disable_mic = false;
        this.stepFourProps.viewer_mode = false;
      } else if (this.activeTab === 'WebinarPopup') {
        this.stepFourProps.record = true;
        this.stepFourProps.auto_start_recording = false;
        this.stepFourProps.allow_moderator_to_unmute_user = true;
        this.stepFourProps.end_when_no_moderator = true;
        this.stepFourProps.mute_on_start = true;
        this.stepFourProps.lock_layout = true;
        this.stepFourProps.webcam_only_for_moderator = true;
        this.stepFourProps.disable_mic = false;
        this.stepFourProps.viewer_mode = true;
      } else if (this.activeTab === 'BroadcastPopup') {
        this.stepFourProps.record = true;
        this.stepFourProps.auto_start_recording = true;
        this.stepFourProps.allow_moderator_to_unmute_user = false;
        this.stepFourProps.end_when_no_moderator = true;
        this.stepFourProps.mute_on_start = true;
        this.stepFourProps.lock_layout = true;
        this.stepFourProps.webcam_only_for_moderator = true;
        this.stepFourProps.disable_mic = true;
        this.stepFourProps.viewer_mode = true;
      } else if (this.activeTab === 'CustomPopup') {
        this.stepFourProps.record = false;
        this.stepFourProps.auto_start_recording = false;
        this.stepFourProps.allow_moderator_to_unmute_user = false;
        this.stepFourProps.end_when_no_moderator = false;
        this.stepFourProps.mute_on_start = false;
        this.stepFourProps.lock_layout = false;
        this.stepFourProps.webcam_only_for_moderator = false;
        this.stepFourProps.disable_mic = false;
        this.stepFourProps.viewer_mode = false;
      }
      this.show = true;
    },
  },
};
</script>

<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.general {
  margin-top: 14px;
}
.setting {
  width: 541px;
  height: 42px;
  border: 1px solid #31394e;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background-color: RGBA(49, 57, 78, 0.7);
}

.left-side label {
  font-weight: 600;
  font-size: 14px;
  color: #a6a6a8;
}

label {
  margin: 0 !important;
}
.left-side p {
  font-size: 11px;
  font-weight: 600;
  color: #a6a6a8;
  align-self: self-end;
  margin-left: 12px;
}
.setting img {
  width: 12px;
  height: 20px;
}
.dropdown {
  width: 541px;
  border: 1px solid #31394e;
  border-radius: 0px 0px 6px 6px;
  padding: 0px 14px 14px 14px;
  background-color: rgba(49, 57, 78, 0.35);
}
.first-drop {
  height: 296px;
}
.second-drop {
  height: 253px;
}
.same-style {
  justify-content: space-between;
  margin-top: 14px;
}
.left-one {
  display: flex;
}
.right-one {
  display: flex;
  align-items: center;
}
.left-one img {
  width: 14px;
  height: 14px;
  margin-top: 4px;
}
.text-info {
  margin-left: 12px;
  width: 350px;
}
.text-info label {
  font-size: 13px;
  font-weight: 600;
  color: #a6a6a8;
}
.text-info p {
  font-weight: 400;
  font-size: 12px;
  color: #637181;
}
.participant {
  margin-top: 10px;
}
.open-dropdown {
  border-radius: 6px 6px 0px 0px;
}
@media (max-width: 499px) {
  .dropdown {
    width: 360px;
    height: fit-content;
  }
  .setting {
    width: 360px;
    height: fit-content;
    padding: 8px;
  }
  .left-side {
    display: flex;
    flex-direction: column;
  }
  .left-side p {
    margin-left: 0px;
  }
  .text-info {
    width: 265px;
  }
}
</style>
