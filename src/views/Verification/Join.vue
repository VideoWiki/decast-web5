<template>
  <div class="join-page-container">
    <div
      class="vx-logo cursor-pointer flex p-5 w-1/6 items-center nav router-link-active"
      @click="$router.push('/')"
    >
      <img
        src="@/assets/images/logo/logo.svg"
        alt="videowiki"
        class="mr-2 h-12"
      /><span class="vx-logo-text text-black" style="font-size: 25px"
        >VideoWiki</span
      >
    </div>
    <div v-if="data_loaded" class="w-full">
      <div
        class="vx-row no-gutter flex flex-box justify-center items-center w-full join-page-row"
      >
        <div class="vx-col xl:w-1/4 lg:w-3/8 md:w-1/2 xs:w-1/1 small-before">
          <div class="join-page-details w-full">
            <p v-if="this.meeting_running" style="color: #6ce733">
              Event is Live
            </p>
            <p v-else-if="!this.meeting_running" style="color: #fa3f3f">
              Event Ended
              {{
                moment
                  .utc(event_date + ' ' + event_time, moment.defaultFormat)
                  .fromNow()
              }}
              or has not started yet.
            </p>
            <p v-else style="color: 7966fa">
              <b style="display: none">
                {{
                  (localtime = moment
                    .utc(event_date + ', ' + event_time, 'YYYY-MM-DD, HH:mm:ss')
                    .local()
                    .format('YYYY-MM-DD HH:mm:ss'))
                }}
                <!-- {{localtime=localtime.add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')}} -->
              </b>
              <vue-countdown-timer
                @start_callback="startCallBack('event started')"
                @end_callback="endCallBack('event ended')"
                :start-time="`${localtime}`"
                :end-time="`${localtime}`"
                :interval="1000"
                label-position="begin"
                :end-text="'Event ended!'"
                :day-txt="'days'"
                :hour-txt="'hours'"
                :minutes-txt="'minutes'"
                :seconds-txt="'seconds'"
              >
                <template slot="countdown" slot-scope="scope">
                  <span class="dtm"
                    ><p class="p">{{ scope.props.days }}</p>
                    <div class="cnt">Days</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.hours }}</p>
                    <div class="cnt">HRS</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.minutes }}</p>
                    <div class="cnt">MIN</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.seconds }}</p>
                    <div class="cnt">SEC</div></span
                  >
                </template>
              </vue-countdown-timer>
            </p>
            <h3 class="join-desc-title">{{ event_name }}</h3>
            <p class="join-desc-creator">
              by:
              {{ event_creator_name == '' ? 'Anonymous' : event_creator_name }}
            </p>
            <p class="join-desc-desc">{{ description }}</p>
          </div>
        </div>
        <div
          class="vx-col xl:w-1/3 lg:w-3/8 md:w-1/2 xs:w-1/1"
          v-if="!this.isExpired"
        >
          <div
            class="join-page-box w-full flex flex-box justify-center items-center"
          >
            <div class="join-box-inner">
              <Verification v-if="this.otpVerification" :nft="this.nft" />
              <Password v-else-if="this.password_auth" :nft="this.nft" />
              <PublicCollectEmail v-else-if="this.public_otp" :nft="this.nft" />
              <ThirdStep
                v-else
                :public="true"
                :password_auth="false"
                :public_auth="false"
                :nft="this.nft"
                :otp-auth="false"
              />
            </div>
          </div>
        </div>
        <div class="vx-col xl:w-1/4 lg:w-3/8 md:w-1/2 xs:w-1/1 large-after">
          <div class="join-page-details w-full">
            <p
              v-if="this.meeting_running"
              style="color: #6ce733"
              class="flex flex-wrap items-center"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-radio"
                size="18px"
                rounded="true"
                color="#6CE733 "
                style="align-self: flex-end"
                class="mr-2"
              ></vs-icon>
              Event is Live
            </p>
            <p v-else-if="this.isExpired" style="color: #fa3f3f">
              Event Ended
              {{
                moment
                  .utc(event_date + ' ' + event_time, moment.defaultFormat)
                  .fromNow()
              }}
            </p>
            <p v-else-if="this.event_not_started" style="color: #7966fa">
              Event has not started yet!
            </p>
            <p v-else style="color: #7966fa">
              <b style="display: none">
                {{
                  (localtime = moment
                    .utc(event_date + ', ' + event_time, 'YYYY-MM-DD, HH:mm:ss')
                    .local()
                    .format('YYYY-MM-DD HH:mm:ss'))
                }}
              </b>
              <vue-countdown-timer
                @start_callback="startCallBack('event started')"
                @end_callback="endCallBack('event ended')"
                :start-time="`${localtime}`"
                :end-time="`${localtime}`"
                :interval="1000"
                label-position="begin"
                :end-text="'Event ended!'"
                :day-txt="'days'"
                :hour-txt="'hours'"
                :minutes-txt="'minutes'"
                :seconds-txt="'seconds'"
              >
                <template slot="countdown" slot-scope="scope">
                  <span class="dtm"
                    ><p class="p">{{ scope.props.days }}</p>
                    <div class="cnt">Days</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.hours }}</p>
                    <div class="cnt">HRS</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.minutes }}</p>
                    <div class="cnt">MIN</div></span
                  >
                  <span class="dtm"
                    ><p class="p">{{ scope.props.seconds }}</p>
                    <div class="cnt">SEC</div></span
                  >
                </template>
              </vue-countdown-timer>
            </p>
            <h3 class="join-desc-title">{{ event_name }}</h3>
            <p class="join-desc-creator">
              by:
              {{ event_creator_name == '' ? 'Anonymous' : event_creator_name }}
            </p>
            <p class="join-desc-desc">{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verification from './Verification.vue';
import ThirdStep from './ThirdStep.vue';
import PublicCollectEmail from './publicCollectEmail.vue';
import Password from './Password.vue';
var moment = require('moment');
export default {
  components: { Verification, ThirdStep, PublicCollectEmail, Password },
  data() {
    return {
      data_loaded: false,
      nft: false,
      otpVerification: false,
      password_auth: false,
      public_otp: false,
      event_creator_name: '',
      event_name: '',
      description: '',
      event_date: '',
      event_time: '',
      event_not_started: false,
      meeting_running: false,
      viewer_mode: false,
      isExpired: false,
      is_public: false,
      has_magic: false,
      moment: moment,
      pass: '',
    };
  },
  methods: {
    joinAsCoHost() {
      this.password_auth = true;
    },
    joinAsParticipant() {
      this.password_auth = false;
    },
    async castInfo() {
      this.$vs.loading();
      const payload = this.$route.params.session_key;
      await this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          this.nft =
            response.data.meeting_info.give_nft ||
            response.data.meeting_info.vc_details_submitted;
          this.otpVerification = response.data.meeting_info.send_otp;
          this.password_auth = response.data.meeting_info.password_auth;
          this.public_otp = response.data.meeting_info.public_otp;
          this.is_public = !this.password_auth && !this.otpVerification;
          this.event_creator_name =
            response.data.meeting_info.event_creator_name;
          this.event_name = response.data.meeting_info.event_name;
          this.event_date = response.data.meeting_info.date;
          this.event_time = response.data.meeting_info.time;
          this.description = response.data.meeting_info.description;
          this.meeting_running = response.data.meeting_info.running;
          this.viewer_mode = response.data.meeting_info.viewer_mode;
          this.isExpired = response.data.meeting_info.expired;
          this.has_magic = this.$route.query.pass !== undefined;
          console.log(this.has_magic);
          var time_remaining = moment
            .utc(this.event_date + ' ' + this.event_time, moment.defaultFormat)
            .fromNow();
          if (time_remaining.endsWith('ago') && this.isExpired != true) {
            this.event_not_started = true;
          }
          if (!this.meeting_running) {
            if (this.isExpired) {
              this.$vs.notify({
                time: 3000,
                title: 'Event Ended',
                text: 'The event has ended',
                color: 'danger',
              });
            } else {
              this.$router.push({
                // uncomment to redirect to waiting room
                name: 'Waiting Room',
                params: {
                  cast_Id: this.$route.params.session_key,
                  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  pass: this.$route.query.pass,
                  payload: payload,
                  verified: true,
                },
                query: this.$route.query,
              });
            }
          }
          this.$vs.loading.close();
          this.data_loaded = true;
        })
        .catch((err) => {
          if (err.status === 404) this.$router.push('/error/404.vue');
        });
    },
    startCallBack() {
      this.localtime;
    },
  },
  mounted() {
    // this.$vs.loading();
    this.castInfo();
    // this.$vs.loading.close();
  },
};
</script>
<style scoped>
.join-page-container {
  min-height: 100vh;
  background-image: url('../../assets/images/join-background.png');
  background-color: #fefefe !important;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.join-page-box {
  height: fit-content;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.join-page-row {
  padding: 1rem;
  gap: 4rem;
}

.join-desc-title {
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  color: #fff;
}
.join-desc-creator {
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  color: #9185d9;
}
.join-desc-desc {
  max-height: 300px;
  overflow: auto;
  font-weight: 600;
  font-size: 16px;
  line-height: 170%;
  padding-bottom: 5px;
  scrollbar-width: thin; /* "auto" or "thin" */

  scrollbar-color: #8d56f8; /* scroll thumb and track */
  color: #eb9d28;
}
.join-desc-desc::-webkit-scrollbar {
  height: 3px;
  width: 2px;
}
.join-desc-desc::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 1px solid #8d56f8;
  background: #8d56f8;
}

.dtm {
  width: 80px;
  padding: 10px;
  display: inline-block;
  text-align: center;
  background: rgba(232, 208, 247, 0.1);
  border: 2px solid #8d56f8;
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 10px;
}
.p {
  text-align: center !important;
  color: #8d56f8 !important;
  font-size: xx-large;
}
.small-before {
  display: none;
}
.or {
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
}

.nav {
  width: 100% !important;
  background: white;
  padding-left: 20px;
}

.or:after,
.or:before {
  content: '';
  display: block;
  background: grey;
  width: 35%;
  height: 1px;
  margin: 0 10px;
}
/* .join-button{
  background: #6CE733 !important;
border-radius: 36px;
width: fit-content;
height: 36px;

font-weight: 500;
font-size: 14px;
line-height: 22px;
color: #5E6660;
} */

.loading-remove-scroll .join-desc-desc {
  overflow: hidden !important;
}
@media screen and (max-width: 1465px) {
  .dtm {
    width: 55px;
  }
  .p {
    font-size: medium;
  }
}
@media screen and (max-width: 1200px) {
  .small-before {
    display: flex;
  }
  .large-after {
    display: none;
  }
}
</style>
