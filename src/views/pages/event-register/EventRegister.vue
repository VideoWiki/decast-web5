<template>
  <div class="reg-main">
    <div class="reg-main-wrapper">
      <div class="reg-left">
        <h1>{{ eventName }}</h1>
        <h3>By: {{ eventCreator }}</h3>
        <p>{{ eventDescription }}</p>
      </div>
      <div class="reg-right">
        <div class="right-blur">
          <span v-if="this.meeting_running">
            <h2>Your cast is</h2>
            <h2>Live</h2>
          </span>
          <span v-else-if="this.event_not_started">
            <h2>Your cast has</h2>
            <h2>Not started yet</h2>
          </span>
          <span v-else>
            <h2>Your cast will</h2>
            <h2>Be Live in</h2>
          </span>
          <div>
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
                  style="align-self: flex-end; line-height: 0.4"
                  class="mr-2"
                ></vs-icon>
                Event is Live
              </p>
              <p v-else-if="this.isExpired" style="color: #fa3f3f">
                Event Ended
                {{ moment(eventDate).fromNow() }}
              </p>
              <p v-else-if="this.event_not_started" style="color: #6ce733">
                Event will start soon!
              </p>
              <vue-countdown-timer
                :start-time="`${startDate}`"
                :end-time="`${eventDate}`"
                @start_callback="timeStart()"
                @end_callback="timeUp()"
                :interval="1000"
                label-position="begin"
                :end-text="''"
                :day-txt="'days'"
                :hour-txt="'hours'"
                :minutes-txt="'minutes'"
                :seconds-txt="'seconds'"
                class="timerWrapper"
              >
                <template slot="countdown" slot-scope="scope">
                  <span class="dtm">
                    <p class="p">{{ scope.props.days }}</p>
                    <div class="cnt">Days</div>
                  </span>
                  <span class="dtm">
                    <p class="p">{{ scope.props.hours }}</p>
                    <div class="cnt">HRS</div>
                  </span>
                  <span class="dtm">
                    <p class="p">{{ scope.props.minutes }}</p>
                    <div class="cnt">MIN</div>
                  </span>
                  <span class="dtm">
                    <p class="p">{{ scope.props.seconds }}</p>
                    <div class="cnt">SEC</div>
                  </span>
                </template>
              </vue-countdown-timer>
            </div>
          </div>
          <p>
            You can close this page and come back later or refresh when the time
            runs out
          </p>
          <button class="regButton" @click="onCloseClick">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#7448FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#7448FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#7448FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Register
          </button>
        </div>
      </div>
    </div>
    <div v-if="this.isFrameOpen" class="regFrame">
      <button @click="onCloseClick">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6.00098L6 18.001"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6.00098L18 18.001"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <iframe :src="url" title="Registration"></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import constants from '../../../../constant';
var moment = require('moment');

export default {
  name: 'EventRegister',
  data() {
    return {
      eventName: '',
      eventCreator: '',
      eventDescription: '',
      eventDate: new Date().getTime() + 5000,
      startDate: '',
      eventCreatorEmail: '',
      isFrameOpen: false,
      meeting_running: false,
      isExpired: false,
      moment: moment,
      event_not_started: false,
      url: '',
    };
  },
  methods: {
    onCloseClick() {
      this.isFrameOpen = !this.isFrameOpen;
    },
    timeUp() {
      this.event_not_started = true;
    },
    timeStart() {
      this.event_not_started = false;
    },
  },
  mounted() {
    if (this.$route.params.cast_Id === 'vw.svg') {
      return;
    }
    this.$vs.loading();
    axios({
      method: 'GET',
      url: `${constants.apiCastUrl}/api/event/meeting/info/?public_meeting_id=${this.$route.params.cast_Id}`,
    }).then((res) => {
      this.eventName = 'By ' + res.data.meeting_info.event_name;
      this.eventDescription = res.data.meeting_info.description;
      this.eventCreatorEmail = res.data.meeting_info.event_creator_email;
      this.eventCreator = res.data.meeting_info.event_creator_name;
      this.meeting_running = res.data.meeting_info.running;
      this.isExpired = res.data.meeting_info.expired;
      this.url = `https://gtbrdd.typeform.com/to/xQ5sUFNz#event_name=${encodeURI(
        this.eventName
      )}&creater_email=${this.eventCreatorEmail}`;
      var timeRemaining = moment
        .utc(this.event_date + ' ' + this.event_time, moment.defaultFormat)
        .fromNow();
      if (timeRemaining.endsWith('ago') && this.isExpired !== true) {
        this.event_not_started = true;
      }

      this.eventDate = moment
        .utc(
          res.data.meeting_info.date + ', ' + res.data.meeting_info.time,
          'YYYY-MM-DD, HH:mm:ss'
        )
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
      this.startDate = moment.utc().format('yyyy-MM-DD HH:mm:ss');
      this.$vs.loading.close();
    });
  },
};
</script>

<style scoped>
.reg-main {
  background: url('./images/event-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reg-main-wrapper {
  width: 80%;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reg-left {
  flex: 1;
  padding: 30px;
  margin: 0px 40px;
  color: #ffffff;
  font-family: 'Poppins';
  font-style: normal;
}
.reg-left h1 {
  font-weight: 700;
  font-size: 75px;
  line-height: 81px;
  text-transform: capitalize;
  color: #ffffff;
  margin-bottom: 10px;
}
.reg-left h3 {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #ffffff;
  margin-bottom: 30px;
}
.reg-left p {
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.005em;
}

.reg-right {
  flex: 1;
  font-family: 'Poppins';
  font-style: normal;
}
.right-blur {
  padding: 30px 30px 80px 30px;
  position: relative;
  margin: 0px 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 12px;
}
.right-blur h2 {
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  text-transform: capitalize;
  color: #ffffff;
}
.right-blur p {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 140%;
  letter-spacing: -0.005em;
  color: rgba(255, 255, 255, 0.8);
}
.timerWrapper {
  margin: 30px 0px;
  display: flex;
  justify-content: space-around;
  color: rgba(255, 255, 255, 0.8);
}
.timerWrapper p {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 54px;
}
.timerWrapper span {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px;
  background: #4f26bf;
  border-radius: 6px;
}
.regButton {
  outline: none;
  border: none;
  background: #ffffff;
  border-radius: 1000px;
  padding: 20px 60px;
  position: absolute;
  bottom: -30px;
  left: 70px;
  right: 80px;
  display: flex;
  cursor: pointer;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #7448ff;
  display: flex;
  justify-content: center;
}
.regButton svg {
  margin-right: 16px;
}

.regFrame {
  position: absolute;
  width: 80%;
  height: 80%;
}
.regFrame iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
}
.regFrame button {
  position: absolute;
  right: -20px;
  top: -20px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .reg-main {
    height: 100vh;
    overflow-y: scroll;
    padding: 30px 0px;
  }
  .reg-main-wrapper {
    width: 90%;
    flex-direction: column;
  }
  .reg-left {
    flex: none;
    margin: 0px;
    padding: 30px 0px;
  }
  .reg-left,
  .reg-Right {
    width: 100%;
  }
  .reg-left h1 {
    font-size: 45px;
    line-height: 61px;
  }
  .reg-left h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 36px;
    color: #ffffff;
    margin-bottom: 10px;
  }
  .reg-left p {
    font-weight: 400;
    font-size: 17px;
    line-height: 30px;
    letter-spacing: -0.005em;
  }

  .right-blur {
    padding: 20px 20px 60px 20px;
    position: relative;
    margin: 0px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border-radius: 12px;
  }
  .right-blur h2 {
    font-size: 24px;
    line-height: none;
  }
  .timerWrapper span {
    width: 70px;
    padding: 6px 20px;
  }
  .right-blur p {
    font-size: 18px;
  }
  .regButton {
    padding: 15px 55px;
  }
  .timerWrapper p {
    font-size: 20px;
    line-height: 44px;
  }
  .regFrame {
    width: 95%;
    height: 90%;
  }
  .regFrame button {
    right: 0px;
    top: -25px;
  }
}
</style>
