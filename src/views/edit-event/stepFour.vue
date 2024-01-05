<template>
  <div class="vx-row">
    <div
      class="vx-col ml-2"
      content="You can skip this step"
      vs-tippy="{ placement: 'top', arrow: true }"
    >
      <span></span>
      <vs-icon
        icon-pack="feather"
        icon="icon-help-circle"
        size="28px"
        rounded="true"
        style="align-self: flex-end"
      >
      </vs-icon>
    </div>
    <div class="vx-col w-full mt-5 flex flex-wrap">
      <div class="flex flex-wrap w-full form-group">
        <label>Meeting Settings</label>
        <vs-switch v-model="stepFourProps.meeting_settings" />
        <div class="w-full ml-2 mt-2">
          Set custom settings for your meeting.
        </div>
        <div class="vx-row w-full ml-2" v-if="stepFourProps.meeting_settings">
          <div class="flex flex-wrap w-full form-group">
            <label class="float-left">Recording</label>
            <vs-switch
              class="float-right"
              @change="offAutoRecordingSwitch"
              v-model="stepFourProps.record"
            />
            <div class="w-full ml-2 mt-2">
              Allow the recording of the session. Recording can be paused and
              restarted multiple times.
            </div>
          </div>

          <div class="flex flex-wrap w-full form-group">
            <label>End when no moderator</label>
            <vs-switch v-model="stepFourProps.end_when_no_moderator" />
            <div class="w-full ml-2 mt-2">
              Cast will end when all moderators leave.
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Allow moderator to unmute user</label>
            <vs-switch v-model="stepFourProps.allow_moderator_to_unmute_user" />
            <div class="w-full ml-2 mt-2">
              Moderators will be able to unmute users.
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Auto start recording</label>
            <vs-switch
              @change="onRecordingSwitch"
              v-model="stepFourProps.auto_start_recording"
            />
            <div class="w-full ml-2 mt-2">
              The event will automatically be recorded when it starts.
            </div>
          </div>
        </div>
      </div>
      <!-- Comments starts from here  -->
      <!-- <div
            v-if="this.stepOneProps.auth_type === 'private'"
            class="flex flex-wrap w-full form-group items-center"
          >
            <label class="m-0">Password Protected</label>
            <vs-switch
              @change="turnOnOffSwitch"
              v-model="stepOneProps.password_auth"
            />
            <div class="w-full ml-2 mt-2">
              Only thr users with Password can enter the cast
            </div>
          </div>
          <div
            v-if="stepOneProps.password_auth"
            class="vx-row mt-5 w-full no-gutter"
          >
            <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap p-1">
              <vs-input
                id="moderatorPass"
                type="password"
                label="Co-Host/Moderator Password"
                v-model="stepOneProps.moderator_password"
                class="w-full form-group"
                placeholder="You can keep a co-host/moderator password empty"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap p-1">
              <vs-input
                id="attendeePass"
                type="password"
                label="Participant Password"
                v-model="stepOneProps.attendee_password"
                class="w-full form-group"
                placeholder="You can skip a Participant password as an empty"
              />
            </div>
          </div>
        </div>
      </div> -->
      <div class="flex flex-wrap w-full form-group">
        <label>Participant Restrictions</label>
        <vs-switch v-model="stepFourProps.restrict_participants" />
        <div class="w-full ml-2 mt-2">
          Configure these settings to restrict participant actions.
        </div>
        <div
          class="vx-row w-full ml-2"
          v-if="stepFourProps.restrict_participants"
        >
          <div class="flex flex-wrap w-full form-group">
            <label>Mute on start</label>
            <vs-switch v-model="stepFourProps.mute_on_start" />
            <div class="w-full ml-2 mt-2">
              Attendees will be muted when they join the event.
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Webcam moderator only</label>
            <vs-switch v-model="stepFourProps.disable_cam" />
            <div class="w-full ml-2 mt-2">
              Attendees will not be allowed to enable their webcams.
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Disable mic</label>
            <vs-switch v-model="stepFourProps.disable_mic" />
            <div class="w-full ml-2 mt-2">
              Attendees will not be allowed to use their microphones.
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Lock layout</label>
            <vs-switch v-model="stepFourProps.lock_layout" />
            <div class="w-full ml-2 mt-2">
              Layout of the meeting is locked and cannot be changed.
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-full form-group items-center">
        <label
          class="flex flex-wrap items-center space-between"
          content="This mode only allows user to listen and open webcam according to your choice."
          v-tippy="{ placement: 'top', arrow: true }"
        >
          View Only Mode &nbsp;
          <span class="flex flex-wrap">
            <span></span>
            <vs-icon
              icon-pack="feather"
              icon="icon-info"
              size="12px"
              rounded="true"
              style="align-self: flex-end"
            >
            </vs-icon>
          </span>
        </label>

        <vs-switch v-model="stepFourProps.viewer_mode" />
        <div class="w-full ml-2 mt-2">
          Switch this on to enable viewer mode.
        </div>
        <!-- <div class="vx-row w-full form-group" v-if="stepFourProps.viewer_mode">
          <div
            class="vx-row w-full mt-2 ml-2 form-group"
            v-if="
              stepFourProps.viewer_mode &&
              stepOneProps.meeting_type === 'private'
            "
          >
            <div class="vx-col md:w-1/2 w-full mt-2 flex flex-wrap p-1">
              <vs-input
                id="ViewerPass"
                type="password"
                label="Viewer Password"
                v-model="stepFourProps.viewer_password"
                class="w-full"
                placeholder="You can skip this step and leave the viewer password empty"
              />
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Listen Only Mode</label>
            <vs-switch
              v-model="stepFourProps.viewer_mode"
              @change="
                stepFourProps.listen_only_mode = stepFourProps.viewer_mode
              "
            />
            <div class="w-full ml-2 mt-2">
              Switch this off to disable listen only mode
            </div>
          </div>
          <div class="flex flex-wrap w-full form-group">
            <label>Webcam Enable</label>
            <vs-switch v-model="stepFourProps.webcam_enable" />
            <div class="w-full ml-2 mt-2">Switch this on to enable webcam</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);
export default {
  name: '',
  props: ['stepFourProps', 'stepOneProps'],
  mounted() {
    console.log('Type', this.stepOneProps.auth_type);
  },

  methods: {
    onRecordingSwitch(e) {
      console.log(e.target.value);
      if (this.stepFourProps.auto_start_recording) {
        this.stepFourProps.record = true;
      }
    },
    offAutoRecordingSwitch(e) {
      console.log(typeof e.target.value);
      if (!this.stepFourProps.record) {
        this.stepFourProps.auto_start_recording = false;
      }
    },
    turnOnOffSwitch() {
      if (this.stepOneProps.password_auth) {
        this.stepOneProps.send_otp = false;
        this.stepOneProps.public_otp = false;
        this.stepOneProps.auth_type = 'private';
        console.log(this.stepOneProps.send_otp, this.stepOneProps.public_otp);
      } else {
        this.stepOneProps.send_otp = true;
      }
    },
  },
};
</script>
<style scoped>
.form-group {
  background: #fbfbfc;
  border: 1px solid #ebedf0;
  padding: 20px;
}

.form-group:first-child {
  border-radius: 12px 12px 0px 0px;
}

.form-group:last-child {
  border-radius: 0px 0px 12px 12px;
}

.form-group > label {
  margin-bottom: 0px;
}

.border {
  border: 1px solid black;
}
</style>
