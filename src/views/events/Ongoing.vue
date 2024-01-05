<!-- =========================================================================================
    File Name: Ongoing.vue
    Description: Live Streaming of Event
    ----------------------------------------------------------------------------------------
    Item Name: Live Event Page
    Author: Ashwani Bhardwaj
========================================================================================== -->

<template>
  <div>
    <div class="w-full lg:block">
      <TheHeader />
    </div>
    <div class="container py-10">
      <div class="text-center mb-20 form-group">
        <div style="margin-top: 5%">
          <h1 class="font-extrabold text-4xl mb-4">
            <p>
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
            </p>
          </h1>
        </div>
      </div>
      <div class="theoplayer-container">
        <video
          id="my-video"
          class="video-js vjs-big-play-centered"
          controls
          preload="auto"
          style="width: 100%; height: 70vh"
          :poster="e_cover_image"
          data-setup="{}"
        >
          <label class="title-label">{{ e_title }}</label>
          <source :src="this.stream_url" type="application/x-mpegURL" />
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
            >
          </p>
        </video>
      </div>
      <div class="eventDetails w-full border p-10 con-vs-card shadow-none">
        <div class="vx-row flex flex-wrap">
          <div class="vx-col lg:w-1/2">
            <h2>{{ e_title }}</h2>
            <span class="text-grey mt-1"><b>Started-</b>{{ end_time }}</span>
          </div>
          <div
            class="vx-col lg:w-1/2 flex flex-wrap justify-end"
            v-if="pub_nft_flow && public_nft_status"
          >
            <vs-button @click="claimNFT()">Claim NFT</vs-button>
          </div>
        </div>

        <hr class="my-3" />
        <div class="flex items-start">
          <img
            :src="e_cover_image"
            name="eventCoverPic"
            alt="Event Cover"
            class="rounded"
            width="50"
          />
          <div class="description pl-3 flex-1">
            <h4>{{ e_creator_name }}</h4>
            <p class="text-grey mt-5">{{ e_short_description }}</p>
            <p class="text-grey mt-5">{{ e_description }} your full details</p>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-alignment">
      <!-- /pop -->
      <vs-popup
        classContent="popup-example"
        title="Welcome to Live Cast"
        :active.sync="popupActive2"
        :v-click-outside="(popupActive2 = popupActive3)"
        button-close-hidden
      >
        <div v-if="emailVerify">
          <div class="row">
            Email<vs-input
              class="inputx mb-5 w-full"
              placeholder="Enter email to Join live cast"
              v-on:change="valueCheck()"
              v-model="email"
            />
            <span class="text-danger text-sm mt-1" v-show="email_error"
              >Email field is required</span
            >
          </div>
          <vs-button
            class="btncentre"
            @click="sendOtp"
            color="primary"
            type="filled"
            >Join</vs-button
          >
        </div>
        <div v-else>
          <div class="row">
            OTP<vs-input
              class="inputx mb-5 w-full"
              placeholder="Enter OTP"
              v-on:change="valueCheck()"
              v-model="otp"
            />
            <span class="text-danger text-sm mt-1" v-show="otp_error"
              >OTP field is required</span
            >
          </div>
          <vs-button
            class="btncentre"
            @click="verifyOtp"
            color="primary"
            type="filled"
            >Verify Otp</vs-button
          >
        </div>
      </vs-popup>
    </div>
    <footer>
      <div class="blackcolor">
        <TheFooter />
      </div>
    </footer>
  </div>
</template>
<script>
var moment = require('moment');
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import TheFooter from '@/layouts/components/footer/TheFooter.vue';
import Player from '../../components/stream-player/player.vue';
import Constants from '../../../constant';
import MetaMaskBtn from '../login/components/PrivateLoginButtons/Metamaskbtn.vue';
export default {
  name: 'LiveEvent',
  components: {
    TheHeader,
    TheFooter,
    Player,
    MetaMaskBtn,
  },
  data() {
    return {
      source: [
        {
          type: 'application/x-mpegurl',
          src: Constants.streamUrl + this.$route.params.eventId + '.m3u8',
          image: this.e_cover_image,
          contentProtection: {
            fairplay: {
              licenseAcquisitionURL: 'dev.stream.videowiki.pt',
            },
          },
        },
      ],
      e_title: null,
      e_cover_image: null,
      e_date: null,
      e_description: null,
      e_creator_name: null,
      e_short_description: null,
      e_date: null,
      e_time: null,
      stream_url: null,
      start_time: '',
      end_time: '',
      popupActive2: false,
      popupActive3: false,
      email: '',
      otp: '',
      email_error: false,
      emailVerify: true,
      otpVerify: false,
      otp_error: false,
      pub_nft_flow: false,
      public_nft_status: false,
    };
  },
  created() {
    this.stream_url =
      Constants.streamUrl + this.$route.params.eventId + '.m3u8';
    this.fetchEventDetails(this.$route.params.eventId);
  },
  methods: {
    fetchEventDetails(eventId) {
      fetch(Constants.eventDetailsUrl + eventId)
        .then((res) => res.json())
        .then((res) => {
          let details = res.meeting_info;
          this.e_title = details.event_name;
          this.e_cover_image = details.cover_image;
          this.e_description = details.description;
          this.e_creator_name = details.event_creator_name;
          this.e_short_description = details.short_description;
          this.e_date = details.date;
          this.e_time = details.time;
          this.pub_nft_flow = details.pub_nft_flow;
          this.public_nft_status = details.public_nft_status;
          this.stream_url =
            Constants.streamUrl + this.$route.params.eventId + '.m3u8';
          const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
          //const event_dtae ='2021-09-13'+' '+ '10:32:59';
          const event_dtae = this.e_date + ' ' + this.e_time;
          const expiration = moment(event_dtae, 'yyyy-MM-DD HH:mm:ss');
          //var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

          var localTime = moment.utc(event_dtae).toDate();

          localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
          this.start_time = now;
          this.end_time = localTime;

          // display
          const diff = expiration.diff(now);
          const diffDuration = moment.duration(diff);
        })
        .catch((error) => console.log('hii error', error));
    },
    claimNFT() {
      window.open(
        '/public/nftdrop/?cast_id=' + this.$route.params.eventId,
        '_blank'
      );
    },
    sendOtp() {
      if (this.email.length > 0) {
        const data = {
          email: this.email,
          eventId: this.$route.params.eventId,
        };
        this.$store
          .dispatch('cast/sendingOtp', data)
          .then((res) => {
            console.log('Otp Sending');
            this.emailVerify = false;
            this.otpVerify = true;
            this.$vs.notify({
              title: 'Success',
              text: res.data.detail,
              color: 'success',
            });
          })
          .catch((error) => {
            this.$vs.notify({
              title: 'Oops!',
              text: error.response.data.detail,
              color: 'danger',
            });
          });
      } else {
        this.email_error = true;
      }
    },
    verifyOtp() {
      if (this.email.length > 0) {
        const data = {
          email: this.email,
          otp: this.otp,
          eventId: this.$route.params.eventId,
        };
        this.$store
          .dispatch('cast/verifyingOtp', data)
          .then((res) => {
            console.log('otp verifyinh');
            this.$vs.loading();
            setTimeout(() => {
              this.$vs.loading.close();
            }, 10000);
            this.popupActive2 = false;
            this.popupActive3 = false;
            this.$vs.notify({
              title: 'Success',
              text: 'OTP Verify Successfully',
              color: 'success',
            });
          })
          .catch((error) => {
            this.emailVerify = false;
            this.otpVerify = true;
            this.$vs.notify({
              title: 'Oops!',
              text: 'Incorrect OTP',
              color: 'danger',
            });
          });
      } else {
        this.otp_error = true;
      }
    },
    async valueCheck() {
      if (this.email.length > 0) {
        this.email_error = false;
      } else {
        this.email_error = true;
      }
      if (this.otp.length > 0) {
        this.otp_error = false;
      } else {
        this.otp_error = true;
      }
    },
  },
};
</script>
<style scoped>
.btncentre {
  margin-left: 250px;
}
.theoplayer-container {
  position: relative;
}

.title-label {
  position: absolute;
  z-index: 9;
  color: whitesmoke;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
