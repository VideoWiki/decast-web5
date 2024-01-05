<!-- =========================================================================================
    File Name: CreateEvent.vue
    Description: fetch all background image and details using api
    ----------------------------------------------------------------------------------------
    Item Name: 
    Author: Rana Vivek Singh
========================================================================================== -->

<template>
  <div>
    <div class=" backgroundimg  bccolor w-full lg:block flex flex-wrap"></div>
    <div class="form-container">
      <form-wizard
        class="form-wizard"
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finishButtonText="Submit"
        @on-complete="formSubmitted"
      >
        <tab-content title="Step 1" class="mb-5">
          <!-- tab 1 content -->
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Meeting Name" v-model="name" class="w-full" />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input
                label="Moderator Password"
                v-model="moderator_password"
                class="w-full"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input
                label="Attendee Password"
                v-model="attendee_password"
                class="w-full"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-input
                label="Duration"
                v-model="duration"
                class="w-full mt-4"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-input
                label="Banner Text"
                v-model="banner_text"
                class="w-full mt-4"
              />
              <ul>
                <li>
                  <label>Record</label>
                  <vs-switch v-model="record" />
                </li>
                <li>
                  <label>Mute on start</label>
                  <vs-switch v-model="mute_on_start" />
                </li>

                <li>
                  <label>End when no moderator</label>
                  <vs-switch v-model="end_when_no_moderator" />
                </li>
                <li>
                  <label>allow start stop recording</label>
                  <vs-switch v-model="allow_start_stop_recording" />
                </li>

                <li>
                  <label>Breakout room</label>
                  <vs-switch v-model="breakout_room" />
                </li>

                <li>
                  <label>Free join</label>
                  <vs-switch v-model="free_join" />
                </li>

                <li>
                  <label>Breakout room enabled</label>
                  <vs-switch v-model="breakout_room_enabled" />
                </li>
                <li>
                  <label>Logout url</label>
                  <vs-switch v-model="logout_url" />
                </li>
              </ul>
            </div>

            <div class="vx-col md:w-1/2 w-full">
              <vs-input
                label="copyright"
                v-model="copyright"
                class="w-full mt-4"
              />
              <ul>
                <li>
                  <label>Allow morderator to unmute user</label>
                  <vs-switch v-model="allow_moderator_to_unmute_user" />
                </li>

                <li>
                  <label>Webcam only for moderator</label>
                  <vs-switch v-model="webcam_only_for_moderator" />
                </li>

                <li>
                  <label>auto start recording</label>
                  <vs-switch v-model="auto_start_recording" />
                </li>
                <li>
                  <label>Breakout room record</label>
                  <vs-switch v-model="breakout_room_record" />
                </li>

                <li>
                  <label>Breakout room private chat enabled</label>
                  <vs-switch v-model="breakout_room_private_chat_enabled" />
                </li>

                <li>
                  <label>Disable cam</label>
                  <vs-switch v-model="disable_cam" />
                </li>

                <li>
                  <label>Disable mic</label>
                  <vs-switch v-model="disable_mic" />
                </li>
                <li>
                  <label>Duplicate</label>
                  <vs-switch v-model="duplicate_user" />
                </li>
              </ul>
            </div>

           
               </div> -->
           

            <ul class="switch-container">
              <datepicker
                format="d MMMM yyyy"
                placeholder="Select Date"
                v-model="schedule_time"
              ></datepicker>
            </ul>
          </div>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Step 2" class="mb-5">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <vs-input
                label="Mximum Participant"
                v-model="max_participant"
                class="w-full mt-4"
              />

              <vs-input
                label="Moderator Emails"
                v-model="moderator_emails"
                class="w-full"
              />

             
              <vs-input
                label="moderator only message"
                v-model="moderator_only_message"
                class="w-full mt-4"
              />
              <vs-textarea
                v-model="short_description"
                label="Short Description"
                class="mb-0 md:mt-10 mt-6"
                rows="3"
              />
            </div>

            <div class="vx-col md:w-1/2 w-full">
              <vs-input label="logo" v-model="logo" class="w-full mt-4" />
              <vs-input
                label="logout_url"
                v-model="logout_url"
                class="w-full mt-4"
              />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <ul>
                <li>
                  <label>Disable Private chat</label>
                  <vs-switch v-model="disable_private_chat" />
                </li>

                <li>
                  <label>Disable public chat</label>
                  <vs-switch v-model="disable_public_chat" />
                </li>

                <li>
                  <label>Disable note</label>
                  <vs-switch v-model="disable_note" />
                </li>
              </ul>
            </div>

           
          </div>
          <div class="vx-col md:w-1/2 w-full"></div>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="Step 3" class="mb-5">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full ">
              <ul class="switch-container">
                <li>
                  <label>Record the Session</label>
                  <vs-switch v-model="record" />
                </li>
                <li>
                  <label>Lock layout</label>
                  <vs-switch v-model="lock_layout" />
                </li>
              </ul>
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <ul class="switch-container">
                <li>
                  <label>Lock on join</label>
                  <vs-switch v-model="lock_on_join" />
                </li>
                <li>
                  <label>Hide user</label>
                  <vs-switch v-model="hide_users" />
                </li>
              </ul>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select
                v-model="guest_policy"
                class="w-full select-large"
                label="Guest Policy"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in statusOptions"
                  class="w-full"
                />
              </vs-select>

              
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-select
                v-model="meeting_type"
                class="w-full select-large mt-5"
                label="Meeting type"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in meetingOptions"
                  class="w-full"
                />
              </vs-select>
            </div>

            
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Datepicker from 'vuejs-datepicker';
import axios from '../axios';
import constants from '../../constant';

export default {
  data() {
    return {
      moderator_emails: '',
      format: 'd MMMM yyyy',
      name: '',
      moderator_password: '',
      attendee_password: '',
      email: '',
      welcome_text: '',
      max_participant: '',
      short_description: '',

      record: false,
      mute_on_start: false,
      end_when_no_moderator: false,
      allow_moderator_to_unmute_user: false,
      duration: '',
      webcam_only_for_moderator: false,

      copyright: '',
      moderator_only_message: '',
      logo: '',
      guest_policy: '',
      logout_url: false,
      meeting_type: '',

      auto_start_recording: false,
      allow_start_stop_recording: false,
      breakout_room: false,
      free_join: false,
      breakout_room_enabled: false,
      breakout_room_private_chat_enabled: false,
      breakout_room_record: false,
      disable_cam: false,
      disable_mic: false,
      disable_private_chat: false,
      disable_public_chat: false,
      disable_note: false,
      lock_layout: false,
      lock_on_join: false,
      hide_users: false,
      duplicate_user: false,
      responsedata: {},
      message: '',

      banner_text: '',
      city: 'new-york',
      proposalTitle: '',
      schedule_time: '2021-08-22 19:25',
      jobTitle: '',
      textarea: '',
      eventName: '',
      eventLocation: 'san-francisco',
      status: 'plannning',
      response: '',
      meetingOptions: [
        { text: 'Public', value: 'public' },
        { text: 'Private', value: 'private' },
      ],
      statusOptions: [
        { text: 'Ask Moderator', value: 'ask_moderator' },
        { text: 'Allow Without Asking', value: 'without_asking' },
      ],
      LocationOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' },
      ],
    };
  },
  methods: {
    formSubmitted() {
      this.$vs.notify({
        title: 'Checking details...',
        color: 'orange',
      });
      axios
        .post(constants.apiCastUrl+'/api/event/meeting/create/', {
          event_name: this.name,
          event_tag: 'science',
          description: 'hi how are you this is vw',
          short_description: this.short_description,
          primary_color: '#F36677',
          secondary_color: '#F36677',
          back_image:
            'http://s3.us-east-2.amazonaws.com/video.wiki/media/custom_background/2806067.jpg',
          invitee_details: 'hyyy',
          moderator_password: this.moderator_password,
          attendee_password: this.attendee_password,
          moderator_emails: this.moderator_emails,

          welcome_text: this.welcome_text,
          max_participant: this.max_participant,
          banner_text: this.banner_text,
          duration: this.duration,
          mute_on_start: this.mute_on_start,
          end_when_no_moderator: this.end_when_no_moderator,
          record: this.record,
          allow_moderator_to_unmute_user: this.allow_moderator_to_unmute_user,
          webcam_only_for_moderator: this.webcam_only_for_moderator,
          schedule_time: this.schedule_time,

          copyright: this.copyright,
          moderator_only_message: this.moderator_only_message,
          logo: this.logo,
          guest_policy: this.guest_policy,
          logout_url: this.logout_url,
          meeting_type: this.meeting_type,

          auto_start_recording: this.auto_start_recording,
          allow_start_stop_recording: this.allow_start_stop_recording,
          breakout_room: this.breakout_room,
          free_join: this.free_join,
          breakout_room_enabled: this.breakout_room_enabled,
          breakout_room_private_chat_enabled:
            this.breakout_room_private_chat_enabled,
          breakout_room_record: this.breakout_room_record,
          disable_cam: this.disable_cam,
          disable_mic: this.disable_mic,
          disable_private_chat: this.disable_private_chat,
          disable_public_chat: this.disable_public_chat,
          disable_note: this.disable_note,
          lock_layout: this.lock_layout,
          lock_on_join: this.lock_on_join,
          hide_users: this.hide_users,
          duplicate_user: this.duplicate_user,
        })
        .then((response) => {
          this.responsedata = response.data.message;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          this.$router.push('/mycasts');
        })
        .catch((error) => {
          this.$vs.notify({
            title: 'Oops!',
            text: 'Some Fields are Missing',
            color: 'danger',
          });
          this.response = 'Error: ' + error.response.status;
        });
    },
  },

  components: {
    FormWizard,
    TabContent,
    Datepicker,
  },
  computed: {
    usersData() {
      return this.$store.state.AppActiveUser;
    },
  },
};
</script>

<style scoped>
.bccolor {
  background: rgb(115, 103, 240);
  background-image: './assets/images/landing-page/Frame1.png';
}
.backgroundimg {
  background-image: url(../assets/images/landing-page/Framenew.svg);
  position: absolute;
  width: 1440px;
  height: 444px;
  left: 0px;
  top: 0px;
}
.form-container {
  background-image: url(../assets/images/create-event/form-container.svg);
  position: absolute;
  width: 1028px;
  height: 955px;
  left: 206px;
  top: 246px;
}
.form-wizard {
  margin-top: -20px;
}
</style>
