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
          <span v-if="this.event_not_started" style="color: #6ce733">
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
                  style="align-self: flex-end; line-height: 0.5rem"
                  class="mr-2"
                ></vs-icon>
                Event is Live
              </p>
              <p v-else-if="this.isExpired" style="color: #fa3f3f">
                Event Ended
              </p>
              <p
                v-else-if="this.event_not_started"
                style="color: #6ce733; padding: 10px 0"
              >
                Event Will Start Soon!
              </p>
              <vue-countdown-timer
                @end_callback="timeUp"
                :start-time="`${eventDate}`"
                :end-time="`${eventDate}`"
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
            You will be redirected to the joining page once the Event is Live
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

var moment = require('moment');

export default {
  name: 'EventRegister',
  props: ['cast_Id', 'url', 'type'],
  data() {
    return {
      eventName: '',
      eventCreator: '',
      eventDescription: '',
      eventDate: '',
      startDate: '',
      eventCreatorEmail: '',
      isFrameOpen: false,
      meeting_running: false,
      isExpired: false,
      moment: moment,
      event_not_started: false,
      rejoinIterator: '',
    };
  },

  mounted() {
    this.rejoinIterator = setInterval(() => {
      this.castInfo();
    }, 6000);
    this.$store
      .dispatch('cast/meetingInfo', this.cast_Id)
      .then((res) => {
        console.log('Meeting Info Getting');
        console.log('result', res);
        this.eventName = res.data.meeting_info.event_name;
        this.eventDescription = res.data.meeting_info.description;
        this.eventCreatorEmail = res.data.meeting_info.event_creator_email;
        this.eventCreator = res.data.meeting_info.event_creator_name;
        this.meeting_running = res.data.meeting_info.running;
        this.isExpired = res.data.meeting_info.expired;
        if (this.eventCreator.includes('@')) {
          this.eventCreator = this.eventCreator.split('@')[0];
        }
        const eventDateTime = moment.utc(
          `${res.data.meeting_info.date} ${res.data.meeting_info.time}`,
          'YYYY-MM-DD HH:mm:ss'
        );
        this.eventDate = eventDateTime.local().format('YYYY-MM-DD HH:mm:ss');
        this.startDate = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        console.log(
          this.eventName,
          this.eventCreator,
          this.eventDescription,
          this.eventDate,
          this.startDate
        );
      })
      .catch((error) => {
        console.log('Meeting Info Error');
        console.log(error);
      });
  },

  beforeDestroy() {
    clearInterval(this.rejoinIterator);
  },
  methods: {
    timeUp() {
      this.event_not_started = true;
    },
    async castInfo() {
      const payload = this.cast_Id;
      await this.$store
        .dispatch('auth/eventDetail', payload)
        .then((response) => {
          this.meeting_running = response.data.meeting_info.running;
          if (this.meeting_running) {
            this.$vs.notify({
              title: 'Event Started',
              text: 'Enter Your Credentials To Enter The Event',
              color: 'success',
            });
            this.$router.push({
              name: 'Join Cast',
              params: { session_key: this.cast_Id },
              query: this.$route.query,
            });
            // location.href = `/e/${this.cast_Id}/${
            //   this.$route.query.pass === undefined
            //     ? ''
            //     : `?pass=${this.$route.query.pass}`
            // }`;
          }
          if (response.data.meeting_info.expired) {
            this.$vs.notify({
              title: 'Event Ended',
              text: "The Creator didn't start The Event",
              color: 'danger',
            });
            this.$router.push(`/`);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
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
  font-size: 50px;
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
