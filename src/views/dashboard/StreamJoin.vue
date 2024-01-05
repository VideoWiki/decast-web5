<template>
  <div id="kk-cont">
    <div class="mm-cont">
      <!-- <h2> <span class="number">{{ hours }}</span>
                <span class="text">hrs</span>
                <span class="dots ml-5">{{ dot1 }}</span>
                <span class="number ml-5">{{ minutes }}</span>
                <span class="text">min</span>
                <span class="dots ml-5">{{ dot2 }}</span>
                <span class="number ml-5">{{ seconds }}</span>
                <span class="text">sec</span>
            </h2> -->
      <vue-countdown-timer
        @start_callback="startCallBack('')"
        @end_callback="endCallBack('')"
        :start-time="`${start_time}`"
        :end-time="`${start_time}`"
        :interval="1000"
        label-position="begin"
        :end-text="endText"
        :day-txt="'days'"
        :hour-txt="'hours'"
        :minutes-txt="'minutes'"
        :seconds-txt="'seconds'"
      >
        <template slot="countdown" slot-scope="scope">
          <div class="mm-cont">
            <h2>
              <span class="number">{{ scope.props.days }}</span>
              <span class="text">days</span>

              <span class="dots ml-5">{{ dot2 }}</span>
              <!-- <span>{{ start_time }}</span> -->
              <span class="number ml-5">{{ scope.props.hours }}</span>
              <span class="text">hrs</span>

              <span class="dots ml-5">{{ dot2 }}</span>

              <span class="number ml-5">{{ scope.props.minutes }}</span>
              <span class="text">min</span>

              <span class="dots ml-5">{{ dot2 }}</span>

              <span class="number ml-5">{{ scope.props.seconds }}</span>
              <span class="text">sec</span>
            </h2>
          </div>
        </template>
      </vue-countdown-timer>

      <!-- <h2>{{start_time }}</h2> -->
      <h3 v-if="running">
        Cast is live <img src="@/assets/images/dashboard/Live.svg" alt="" />
      </h3>
      <h3 v-else-if="expired">Cast has expired</h3>
      <h3 v-else>Cast is not live</h3>
      <h4>{{ e_title }}</h4>
      <h5>Hosted by "{{ e_creator_name }}"</h5>
      <p>{{ e_description }}</p>
    </div>
    <div class="ll-cont">
      <form
        :class="[this.public && !this.public_auth ? 'join-box' : 'lets-see']"
      >
        <div>
          <span v-if="!this.public_auth">
            <h2 class="join-head">You're joining the cast</h2>
            <h4 class="join-name">Joining name</h4>
          </span>
          <span v-if="this.public_auth">
            <h2 class="font-semibold text-2xl my-4">
              Click to join the stream
            </h2>
          </span>
          <div v-if="!public_auth">
            <input
              class="verification-input text-xl"
              v-validate="'required'"
              name="Name"
              placeholder="e.g John G. Miguel"
              autocomplete="off"
              v-model="name"
            />
          </div>

          <div class="flex flex-wrap my-3">
            <button
              class="acc-btn flex-1 h-16"
              :disabled="!validateForm || expired"
              @click.prevent="joinStreaming"
            >
              Access Cast
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Constants from '../../../constant';
var moment = require('moment');
export default {
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
      localtime: null,
      dataLoaded: false,
      running: false,
      e_title: null,
      endText: '',
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
      expired: false,
      verified: false,
      name: '',
      publicStream: false,
      pub_nft_flow: false,
      public_nft_status: false,
      start_time_new: '',
      give_nft: false,
      airdrop: false,
      interval: '',
      public_auth: '',
      public: '',
      moment: moment,
    };
  },
  computed: {
    validateForm() {
      return (!this.errors.any() && this.name !== '') || this.public_auth;
    },
    hours() {
      return this.start_time.slice(0, 2);
    },
    dot1() {
      return this.start_time.slice(2, 3);
    },
    minutes() {
      return this.start_time.slice(3, 5);
    },
    dot2() {
      return this.start_time.slice(13, 14);
    },
    seconds() {
      return this.start_time.slice(6, 8);
    },
  },
  created() {
    this.stream_url =
      Constants.streamUrl + this.$route.params.eventId + '.m3u8';
    this.fetchEventDetails(this.$route.params.eventId);
  },
  methods: {
    joinStreaming() {
      sessionStorage.setItem('username', this.name);
      this.$router.go();
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
          this.running = details.running;
          this.expired = details.expired;
          console.log(this.running, 'run');
          console.log(this.expired, 'rrr');
          document.getElementById('loading-bg').style.display = 'none';

          if (!details.running) {
            setTimeout(() => {
              this.fetchEventDetails(eventId);
            }, 5000);
          } else {
            setTimeout(() => {}, 5000);
          }

          this.stream_url =
            Constants.streamUrl + this.$route.params.eventId + '.m3u8';
          const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
          // const event_dtae ='2021-09-13'+' '+ '10:32:59';
          const eventDate = this.e_date + ', ' + this.e_time;
          const localTime = moment.utc(eventDate).toDate();
          this.start_time = moment
            .utc(eventDate, 'YYYY-MM-DD, HH:mm:ss')
            .local()
            .format('YYYY-MM-DD HH:mm:ss');
          this.start_time_new = moment(localTime).format('HH: mm: ss');

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
    startCallBack(eventMessage) {
      this.start_time;
    },
    endCallBack(eventMessage) {
      this.start_time;
    },
  },
};
</script>

<style scoped>
/* .tim-cont{
  display: flex;
}
.dtm {
  display: flex !important;
}
.p{
  text-align: center !important;
  color: #d7df23 !important;
  font-size: 20px !important;
}
.cnt {
  color: #647181;
  font-size: 13px;
  font-weight: 500;
} */
.ll-cont {
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 6px;
  max-height: 215px !important;
  padding: 18px;
  margin-bottom: 5px;
  width: 380px !important;
}

.mm-cont {
  width: auto !important;
  max-width: 400px !important;
}

.mm-cont h2 {
  word-spacing: 5px;
  /* letter-spacing: 5px; */
  /* 00:00:00 */
}

.number {
  color: #d7df23;
  font-size: 20px;
  font-weight: 600;
}

.dots {
  color: #647181;
}

.text {
  font-size: 13px;
  color: #647181;
  font-weight: 500;
}

.mm-cont h3 {
  display: flex;
  color: #d7df23;
  font-size: 12px;
  font-weight: 600;
  margin-top: 15px;
  justify-content: flex-start;
  gap: 5px;
}

.mm-cont h4 {
  font-size: 24px;
  color: #a6a6a8;
  font-style: italic;
  font-weight: 500;
  margin-top: 10px;
}

.mm-cont h5 {
  color: #647181;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

.mm-cont p {
  font-size: 12px;
  color: #a6a6a8;
  max-width: 380px;
  padding-top: 10px;
  text-overflow: ellipsis;
  word-wrap: normal;
  margin-top: 10px;
}

.join-head {
  font-size: 12px;
  color: #a6a6a8;
}

.join-name {
  font-size: 12px;
  color: #637181;
  font-weight: 600;
  margin-top: 20px;
}

.join-box {
  margin-top: 5em;
  margin-left: 32em;
  padding: 5em;
  width: 40% !important;
  background-color: #31394e;
}

.verification-input {
  height: 40px !important;
  border: none;
  background: #0f1214;
  font-family: Montserrat;
  border-radius: 6px;
  font-size: 12px !important;
  padding: 10px;
  width: 100%;
  margin-top: 6px;
  color: #a6a6a8;
}

.acc-btn {
  background-color: #d7df23;
  height: 40px !important;
  color: #181a20;
  border-radius: 6px !important;
  border: none;
  font-weight: 600 !important;
  cursor: pointer;
  margin-top: 20px;
}

.acc-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media screen and (max-device-width: 499px) {
  .join-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 20rem;
    width: 100% !important;
  }

  #kk-cont {
    flex-direction: column;
    margin-top: 0 !important;
  }

  .verification-img {
    display: none !important;
  }
}
</style>

<style>
#kk-cont {
  display: flex !important;
  justify-content: space-between !important;
  gap: 25px !important;
  max-width: 800px !important;
  min-width: 600px !important;
  width: auto;
  margin: auto !important;
  /* margin-left: -40% !important; */
  margin-top: -10rem !important;
}

@media screen and (max-device-width: 700px) {
  #kk-cont {
    display: flex !important;
    flex-direction: column;
    justify-content: center !important;
    align-items: center !important;
    max-width: 400px !important;
    min-width: 300px !important;
    width: auto;
    margin: auto !important;
    /* margin-left: -40% !important; */
    margin-top: -20rem !important;
  }

  .ll-cont {
    border: 1px solid #31394e;
    background-color: #1f272f;
    border-radius: 6px;
    max-height: 215px !important;
    padding: 18px;
    margin: auto !important;
    margin-bottom: 5px;
    max-width: 320px;
    width: auto;
    min-width: 200px;
  }
}
</style>
