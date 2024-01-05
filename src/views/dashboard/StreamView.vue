<template>
  <div v-if="dataLoaded">
    <StreamingVerification
      v-if="!verified"
      :public_stream="publicStream"
      :give_nft="give_nft"
    />
    <div class="stream-view" v-else>
      <div class="par-cont">
        <div class="log-cont">
          <img src="@/assets/images/vid.svg" />
        </div>
        <div class="flex video-container">
          <div v-if="running" class="container md:py-10 py-2">
            <HlsPlayer :videoSrc="stream_url" :poster="e_cover_image" />
          </div>
          <div v-else class="container md:py-8 py-2">
            <img
              src="@/assets/images/not-start.svg"
              alt="Event will start soon"
              class="w-full"
            />
          </div>
          <div class="md:py-10 pb-0 stream_detail">
            <!-- <h4 class="live">Live Streaming at {{ start_time_new }}</h4> -->
            <h3 class="my-3 text-3xl font-semibold">
              {{ e_title }}
            </h3>
            <h4 class="host text-slate-500 text-xl font-medium">
              Hosted by "{{ e_creator_name }}"
            </h4>
            <p class="my-2">
              {{ e_description }}
            </p>
            <div
              class="mb-2"
              v-if="airdrop && pub_nft_flow && public_nft_status"
            >
              <vs-button @click="claimNFT()">Claim NFT</vs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StreamingVerification from '../events/StreamingVerification';
import HlsPlayer from '@/components/Hls-Player/HlsPlayer';

import Constants from '../../../constant';
var moment = require('moment');

export default {
  name: 'StreamingPage',
  components: {
    HlsPlayer,
    StreamingVerification,
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
      dataLoaded: false,
      running: false,
      e_title: null,
      e_cover_image: null,
      e_date: null,
      e_description: null,
      e_creator_name: null,
      e_short_description: null,
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
      verified: false,
      name: '',
      publicStream: false,
      pub_nft_flow: false,
      public_nft_status: false,
      start_time_new: '',
      give_nft: false,
      airdrop: false,
      interval: '',
    };
  },

  created() {
    this.checkingUser();
    this.stream_url =
      Constants.streamUrl + this.$route.params.eventId + '.m3u8';
    this.fetchEventDetails(this.$route.params.eventId);
  },
  methods: {
    checkingUser() {
      if (sessionStorage.getItem('username')) {
        this.name = sessionStorage.getItem('username');
        this.verified = true;
      }
    },
    claimNFT() {
      window.open(
        '/public/nftdrop/?cast_id=' + this.$route.params.eventId,
        '_blank'
      );
    },
    fetchEventDetails(eventId) {
      fetch(
        Constants.apiCastUrl +
          '/api/event/meeting/info/?public_meeting_id=' +
          eventId
      )
        .then((res) => res.json())
        .then((res) => {
          const details = res.meeting_info;
          this.e_title = details.event_name;
          this.e_cover_image = details.cover_image;
          this.e_description = details.description;
          this.e_creator_name = details.event_creator_name;
          this.e_short_description = details.short_description;
          this.e_date = details.date;
          this.e_time = details.time;
          this.publicStream = details.public_stream;
          this.pub_nft_flow = details.pub_nft_flow;
          this.public_nft_status = details.public_nft_status;
          this.airdrop = details.airdrop;
          this.give_nft = details.give_nft || details.vc_details_submitted;
          if (!details.running) {
            setTimeout(() => {
              this.fetchEventDetails(eventId);
            }, 5000);
          } else {
            setTimeout(() => {
              this.running = details.running;
            }, 5000);
          }

          this.stream_url =
            Constants.streamUrl + this.$route.params.eventId + '.m3u8';
          const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
          // const event_dtae ='2021-09-13'+' '+ '10:32:59';
          const eventDate = this.e_date + ' ' + this.e_time;
          // var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

          var localTime = moment.utc(eventDate).toDate();

          localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
          this.start_time = now;
          this.start_time_new = moment.utc().format('HH:mm:ss');
          this.end_time = localTime;

          // display
          this.dataLoaded = true;

          this.$vs.loading.close();
        })
        .catch((error) => {
          console.log(error);
          this.$vs.loading.close();
        });
    },
  },
};
</script>

<style scoped>
.stream-view {
  background: #000000;
  background-image: url('../../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
}

.par-cont {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  padding: 20px;
}

.join-box {
  margin-top: 5em;
  margin-left: 32em;
  padding: 5em;
}

.verification-input {
  height: 60px;
  border: none;
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

.verification-img {
  position: absolute;
  bottom: 0px;
  right: 3.5em;
  z-index: 1;
  padding: 0px;
  margin: 0px;
  width: 35%;
}

.container {
  border-radius: 6px;
}

.container img {
  margin-left: 2rem;
  margin-right: 2rem;
  width: 700px !important;
  max-width: 80%;
  border-radius: 6px;
  /* border: 1px solid yellow; */
}

.live {
  color: #d7df23;
  font-size: 14px;
  font-weight: 600;
}

.my-3 {
  font-size: 24px;
  color: #a6a6a8;
  font-style: italic;
  font-weight: 500;
}

.host {
  font-size: 16px;
  font-weight: 500;
  color: #647181;
}
.host {
  font-size: 16px;
  font-weight: 500;
  color: #647181;
}

.my-2 {
  font-size: 12px;
  color: #a6a6a8;
  margin-top: 30px;
  max-width: 380px;
  padding-top: 10px;
  text-overflow: ellipsis;
  word-wrap: normal;
}

.stream_detail {
  max-width: 400px;
}
.stream_detail {
  max-width: 400px;
}

@media screen and (max-device-width: 480px) {
  .join-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 20rem;
    width: 100% !important;
  }

  .verification-img {
    display: none !important;
  }
}

.container {
  margin: auto;
  width: 90%;
  max-width: 100%;
}

.container img{
  max-width: 95%;
  width: auto;
  margin: auto;
}

.stream_detail {
  width: 40%;
}

@media only screen and (max-width: 700px) {
  .video-container {
    flex-direction: column;
  }

  .container {
    padding: 0;
    width: 97%;
    margin: 0 0.5rem;
  }

  .stream_detail {
    padding: 1rem;
    width: 100%;
  }
}
</style>
