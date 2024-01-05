<template>
  <div>
    <TheHeader />
    <div class="vx-row contain padding w-full no-gutter">
      <div class="vx-col w-full mb-24">
        <div class="adoptive p-5 pl-20 w-full">
          <vs-col
            vs-type="flex"
            vs-justify="start"
            vs-align="center"
            vs-xs="12"
            vs-sm="12"
            vs-lg="1"
            class="datebox-container"
          >
            <div>
              <div class="datebox">
                <h1 class="monthbox">
                  {{ moment.utc(infos.date).format('MMM').toUpperCase() }}
                </h1>
                <h1 class="daybox">
                  {{ moment.utc(infos.date).format('DD') }}
                </h1>
                <h1 class="timebox">
                  {{ moment.utc(infos.time, 'HH:mm').format('hh:mm A') }}
                </h1>
              </div>
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="start"
            vs-align="center"
            vs-xs="12"
            vs-sm="12"
            vs-lg="11"
          >
            <vs-col vs-xs="12" class="w-full">
              <h1 class="tophead">{{ infos.event_name }}</h1>
              <h2 class="createdby w-full">
                By-
                {{
                  infos.event_creator_name == ''
                    ? 'anonymous'
                    : infos.event_creator_name
                }}
              </h2>
            </vs-col>
          </vs-col>
        </div>
      </div>
      <div class="vx-col w-full mb-5">
        <vs-col
          vs-type="flex"
          vs-justify="start"
          vs-align="center"
          vs-xs="0"
          vs-sm="0"
          vs-lg="5"
          style="float: right"
        >
          <div>
            <p class="hidden">
              {{
                (localtime = moment
                  .utc(infos.date + ', ' + infos.time, 'YYYY-MM-DD, HH:mm:ss')
                  .local()
                  .format('YYYY-MM-DD HH:mm:ss'))
              }}
            </p>
            <!-- countdown -->
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

              <template slot="end-text" slot-scope="">
                <span class="dtm strike"
                  ><p class="p">0</p>
                  <div class="cnt">Days</div></span
                >
                <span class="dtm strike"
                  ><p class="p">0</p>
                  <div class="cnt">HRS</div></span
                >
                <span class="dtm strike"
                  ><p class="p">0</p>
                  <div class="cnt">MIN</div></span
                >
                <span class="dtm strike"
                  ><p class="p">0</p>
                  <div class="cnt">SEC</div></span
                >
              </template>
            </vue-countdown-timer>
            <!-- /countdown -->
          </div>
        </vs-col>
      </div>
      <!-- JUMBOTRON -->
    </div>
    <div class="contain2 vx-row w-full p-5 no-gutter">
      <vs-col
        class="EventPic"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-xs="12"
        vs-sm="12"
        vs-lg="7"
        :style="{ 'background-image': 'url(' + bgurl + ')' }"
      >
      </vs-col>

      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-xs="12"
        vs-sm="12"
        vs-lg="5"
      >
        <div class="contain3">
          <div>
            <div
              v-if="
                !moment
                  .utc(
                    moment(infos.date + ' ' + infos.time, 'YYYY-MM-DD HH:mm:ss')
                      .add(30, 'minutes')
                      .format('YYYY-MM-DD HH:mm:ss'),
                    'YYYY-MM-DD, HH:mm:ss'
                  )
                  .fromNow()
                  .includes('ago')
              "
              class="btn"
              @click="goToJoinPage()"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-plus-circle"
                size="32px"
                stroke="none"
                rounded="true"
                class="vs-icon-join-event"
                style="align-self: flex-end"
                fill="#ffffff"
              ></vs-icon>
              Join This Event
            </div>
          </div>
          <div class="description">
            <p>
              {{ infos.event_name }}
            </p>
            <p style="font-weight: 400">
              Created by -
              <br />
              {{
                infos.event_creator_name == ''
                  ? 'anonymous'
                  : infos.event_creator_name
              }}
            </p>
          </div>
        </div>
      </vs-col>
    </div>

    <div class="dcontainer vx-row w-full p-20">
      <div class="vs-col w-full">
        <h5><b>Description</b></h5>
        <br />
      </div>
      <p class="details">{{ infos.description }}</p>
    </div>
    ]

    <div class="section bg-white">
      <NewsLetter />
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
import NewsLetter from './components/NewsLetter';
import TheFooter from '../layouts/components/footer/TheFooter.vue';
import axios from '../axios';
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import constants from '../../constant';

export default {
  data() {
    return {
      // detail:{},
      popupActive2: false,
      demoVideoUrl: '',
      localtime: '',
      name: '',
      password: '',
      public_meeting_id: '',
      responsedata: {},
      meeting_info: '',
      event_name: '',
      detail: '',
      infos: [],
      name: 'Timer',
      moment: moment,
      bgurl: '',
      myCast: false,
    };
  },
  components: {
    TheHeader,
    NewsLetter,
    TheFooter,
    // MemberCard
  },
  mounted() {
    this.getdatainfo();
  },

  methods: {
    startCallBack: function (x) {
      // console.log(x);
    },
    endCallBack: function (x) {
      // console.log(x);
    },
    goToJoinPage() {
      this.$router.push('/e/' + this.$route.params.eventId);
    },
    getdatainfo() {
      axios
        .get(
          constants.apiCastUrl +
            '/api/event/meeting/info/?public_meeting_id=' +
            this.$route.params.eventId,
          {}
        )
        .then((response) => {
          this.detail = response.meeting_info;
          this.infos = response.data.meeting_info;
          this.myCast =
            JSON.parse(localStorage.getItem('userInfo')).email ===
            this.infos.event_creator_email;
          this.bgurl = response.data.meeting_info.cover_image;
          return response.data.meeting_info;
        })
        .catch((error) => {
          this.$vs.notify({
            title: 'Oops!',
            text:
              error.response != null
                ? error.response.data.message
                : 'Check the Scheduled time and Password',
            color: 'danger',
          });
        });
    },
  },
};
</script>

<style scoped>
p {
  color: #544837 !important;
}

.aligncenter {
  text-align: center;
}
.no-border {
  border-bottom: none;
}
.section {
  padding: 8%;
  /* margin-top: 1000px; */
  margin-top: 20px;
}
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.timeline-icon {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
.goaltext {
  color: white;
}
.blackcolor {
  background: black;
}
.bccolor {
  background: rgb(115, 103, 240);
}
.contain {
  background: rgba(46, 0, 133, 0.8);
  backdrop-filter: blur(20px);
  background-image: url(../assets/images/eventdetails/Bannerimg.svg) !important;
  background-repeat: no-repeat;
  background-size: cover;
  background: fixed;
}

.padding {
  padding-top: 100px;
}

.tophead {
  position: relative;
  width: 100%;
  margin-left: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 50px;
  text-transform: capitalize;

  color: #ffffff;
}
.createdby {
  position: relative;
  width: 100%;
  height: 24px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}
.datebox {
  width: 90px;
  background: #8d56f8;
  border-radius: 4px;
}

.EventPic {
  position: relative;
  top: calc(-3rem - 97px);
  height: 394px;
  filter: drop-shadow(0px 4px 50px rgba(0, 0, 0, 0.1));
  background-size: contain;
  background-position: center;
  /* background-color: #8d56f81a; */
  border-radius: 6px;
  background-repeat: no-repeat;
}

.contain3 {
  height: 394px;
  width: 100%;
}
.dtm {
  /* position: absolute; */
  margin-left: 30px;
  width: 77px;
  height: 97px;
  /* left: 1227px;
  top: 396px; */
  display: inline-block;

  background: rgba(29, 194, 2, 0.1);
  border: 2px solid #8d56f8;
  box-sizing: border-box;
  border-radius: 6px;
}

.p {
  text-align: center !important;
  color: white !important;
  font-size: xx-large;
  margin-top: 10px;
}

.btn {
  width: 370px;
  height: 77px;
  margin-left: 28px;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-repeat: no-repeat;
  background-color: #1dc202;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 6px;
  padding: 5px;
  padding-left: 10px;
}
.vs-icon-join-event {
  align-self: center !important;
  margin-right: 28px;
}
.btn:hover {
  cursor: pointer;
}
.btn:active {
  box-shadow: 0 0 0 #00823f;
}
.btn2 {
  width: 370px;
  height: 77px;
  margin-left: 28px;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-repeat: no-repeat;
  background-color: #1dc202;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 6px;
  padding: 5px;
  padding-left: 10px;

  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  /* box-shadow: 7px 6px 7px #00823f; */
}
.btn2:hover {
  cursor: pointer;
}
.btn2:active {
  box-shadow: 0 0 0 #00823f;
}
.description {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  margin-left: 30px;
  margin-top: 25px;
  letter-spacing: 0.01em;

  color: #426666;
}

.dcontainer {
  position: relative;
  top: calc(-5.75rem - 97px);
}
.details {
  margin-top: 5px;
  text-align: justify;
}
.daybox {
  /* width: 30px; */
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 44px;
  line-height: 66px;
  /* identical to box height */

  color: #ffffff;
}
.monthbox {
  /* width: 37px; */
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */

  color: #ffffff;
}
.timebox {
  /* width: 62px; */
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */

  color: #ffffff;
}
.cnt {
  text-align: center !important;
  color: white !important;
}
/* .adoptive {
  position: absolute;
  top: 82px;
  left: 10.5vw;
} */
.strike {
  text-decoration: line-through;
  text-decoration-color: white;
}
@media screen and (max-width: 900px) {
  .EventPic {
    top: 0rem;
  }
  .datebox-container {
    justify-content: center;
  }

  .dcontainer {
    top: -5.75rem;
  }
  .contain3 {
    height: fit-content;
    margin: 5px 0px;
  }
  .datebox-container {
    justify-content: center !important;
  }
  .tophead,
  .createdby {
    text-align: center;
  }
  .adoptive {
    padding-left: 5px !important;
  }
}
@media screen and (max-width: 380px) {
  .btn,
  .btn2 {
    width: min(240px, 80vw);
    height: max(77px, fit-content);
    justify-content: center;
  }
}
</style>
