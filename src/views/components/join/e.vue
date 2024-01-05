<!-- =========================================================================================
    File Name: e.vue
    Description: fetch all background image and details using api
    ----------------------------------------------------------------------------------------
    Item Name:
    Author: Rana Vivek Singh
========================================================================================== -->



<template>
  <div>
    &nbsp;&nbsp;&nbsp;
    <div class="text-center mb-20 form-group" style="height: 60vh">
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <h1 class="font-extrabold text-4xl mb-4"></h1>
      <div v-if="timerShow" style="margin-top: 10%">
        <h1 class="font-extrabold text-4xl mb-4">
          Your CAST will be live in
          <vue-countdown-timer
            :start-time="start_time"
            :end-time="end_time"
            :interval="1000"
            :start-label="''"
            label-position="begin"
            :end-text="'00:00:00:00'"
            :day-txt="':'"
            :hour-txt="':'"
            :minutes-txt="':'"
            :seconds-txt="''"
          >
          </vue-countdown-timer>
        </h1>
        <p class="font-medium mt-4">
          You can close this page and come back later or refresh when the timer
          runs out
        </p>
        <p class="font-medium mt-4">Welcome to VideoWiki</p>
      </div>
      <div v-else>
        <h1 class="font-extrabold text-4xl mb-4">
          Enter Your name and password to Join the session
        </h1>
        <p class="font-medium" mt-12>Welcome to VideoWiki</p>
      </div>
    </div>
    <div class="demo-alignment">
      <!-- /pop -->
      <vs-popup
        classContent="popup-example"
        title="Welcome to VideoWiki"
        :active.sync="popupActive2"
        v-click-outside="(popupActive2 = popupActive3)"
        button-close-hidden
      >
        <div class="row">
          Name<vs-input
            class="inputx mb-5 w-full"
            placeholder="Name"
            v-on:change="valueCheck()"
            v-model="name"
          />
          <span class="text-danger text-sm mt-1" v-show="name_error"
            >Name field is required</span
          >
        </div>
        <div class="row">
          Password<vs-input
            class="inputx mb-5 w-full"
            placeholder="Password"
            v-on:change="valueCheck()"
            v-model="password"
          />
          <span class="text-danger text-sm mt-1" v-show="password_error"
            >Password field is required</span
          >
        </div>
        <vs-button
          class="btncentre"
          @click="joinnow"
          color="primary"
          type="filled"
          >Join</vs-button
        >
      </vs-popup>
    </div>
    <!-- /pop -->
  </div>
</template>
<script>
import { ajaxCallMixin } from '@/http/HttpCommon';
var moment = require('moment');

export default {
  name: 'NewsLetter',
  mixins: [ajaxCallMixin],
  data() {
    return {
      userEmail: '',
      subscribeInProgress: false,
      session_key: '',
      name: '',
      password: '',
      popupActive2: false,
      popupActive3: false,
      timerShow: false,
      show: false,
      start_time: '',
      end_time: '',
      name_error: false,
      password_error: false,
    };
  },
  methods: {
    async joinnow() {
      if (this.name.length == 0 && this.password.length == 0) {
        this.popupActive2 = true;
        this.popupActive3 = true;
      } else {
        //   if(this.name.length==0  && this.password==0){
        //     // this.popupActive2=true;
        //     // this.popupActive3=true;
        //     // // this.name_error=true;
        //     // // this.password_error=true;
        //   }
        // else{
        this.popupActive2 = false;
        this.popupActive3 = false;
        const data = {
          name: this.name,
          password: this.password,
          public_meeting_id: this.session_key,
          room_type: 'private',
          avatar_url:
            'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png',
          guest: false,
          moderator_password: this.moderator_password,
          attendee_password: this.attendee_password,
        };
        this.$store
          .dispatch('cast/join', data)
          .then((response) => {
            this.responsedata = response.data.url;
            window.location.href = response.data.url;
            this.$vs.notify({
              title: 'Success',
              text: response.data.message,
              color: 'success',
            });
          })
          .catch(() => {
            this.$vs.notify({
              title: 'Error Occured',
              text: 'Please Check the Cast Timing or the Entered Password',
              color: 'danger',
            });
          });
      }
      // }
    },
    async joinPopup() {
      this.popupActive2 = true;
      this.popupActive3 = true;
    },
    async valueCheck() {
      if (this.name.length > 0) {
        this.name_error = false;
      } else if (this.password.length > 0) {
        this.password_error = false;
      }
    },
  },
  created() {
    this.$store
      .dispatch('cast/e', {
        session_key: this.$route.params.session_key,
      })
      .then((response) => {
        const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
        // const event_dtae ='2021-09-13'+' '+ '10:32:59';
        const event_dtae =
          response.data.meeting_info.date +
          ' ' +
          response.data.meeting_info.time;
        const expiration = moment(event_dtae, 'yyyy-MM-DD HH:mm:ss');
        //var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

        var localTime = moment.utc(event_dtae).toDate();

        localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
        this.start_time = now;
        this.end_time = localTime;
        // display
        const diff = expiration.diff(now);
        const diffDuration = moment.duration(diff);
        if (
          diffDuration.days() == 0 &&
          diffDuration.hours() == 0 &&
          diffDuration.seconds() > 0 &&
          diffDuration.minutes() < 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() < 0 &&
          diffDuration.seconds() > 0 &&
          diffDuration.minutes() < 0 &&
          diffDuration.minutes() > -30
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() < 0 &&
          diffDuration.hours() < 0 &&
          diffDuration.seconds() > 0 &&
          diffDuration.minutes() < 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() == 0 &&
          diffDuration.seconds() == 0 &&
          diffDuration.minutes() == 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() == 0 &&
          diffDuration.seconds() > 0 &&
          diffDuration.minutes() == 0
        ) {
          this.timerShow = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() == 0 &&
          diffDuration.seconds() < 0 &&
          diffDuration.minutes() == 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() == 0 &&
          diffDuration.seconds() < 0 &&
          diffDuration.minutes() < 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() == 0 &&
          diffDuration.hours() < 0 &&
          diffDuration.seconds() < 0 &&
          diffDuration.minutes() < 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else if (
          diffDuration.days() < 0 &&
          diffDuration.hours() <= 0 &&
          diffDuration.seconds() < 0 &&
          diffDuration.minutes() < 0
        ) {
          this.timerShow = false;
          this.popupActive2 = true;
          this.popupActive3 = true;
        } else {
          this.timerShow = true;
        }
      });
  },
};
</script>
<style scoped>
.btncentre {
  margin-left: 250px;
}
</style>
