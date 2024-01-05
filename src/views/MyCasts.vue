<template>
  <div id="knowledge-base-page">
    <div class="knowledge-base-jumbotron pt-5 backgroundimage">
      <span class="float">
        <TheHeader />
      </span>
      <div
        class="knowledge-base-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base"
      >
        <h1 class="mb-1 textdiscover"><b>Discover livecasts</b></h1>
        <p class="mb-1 textdiscover">
          Scale your voice! Broadcast your message on multiple channels streams
        </p>
        <vs-input
          icon-no-border
          placeholder="Search Topic or Keyword"
          v-model="knowledgeBaseSearchQuery"
          icon-pack="feather"
          icon="icon-search"
          size="large"
          class="w-1/2 mt-6 searchbardis"
        />
      </div>
    </div>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <div
      class="vs-con-loading__container"
      id="div-with-loading"
      :class="{ 'h-72': isLoading }"
    ></div>

    <div v-if="!isLoading">
      <template v-if="videoList.length > 0">
        <h3 class="text-2xl ml-10 md:mb-10 mb-6 upcoming">
          <b>Ongoing Events</b>
        </h3>

        <vs-row class="md:px-10">
          <template v-for="video in videoList">
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.event_date + ' ' + video.event_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="
                (!checkpast(live) && !video.event_expired) ||
                video.is_running === 'true'
              "
              :key="video.id"
              class="p-3 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full"
            >
              <vs-card class="card-dimension relative">
                <div slot="media" class="thumbnail" style="font-size: 15px">
                  <div class="flex justify-end">
                    <img
                      class="w-6 h-6 more"
                      src="@/assets/images/casts/more.png"
                      @click="showMoreDetails(video.event_id)"
                    />
                    <div
                      v-if="moreBox == 'morebox' + video.event_id"
                      class="more-box"
                    >
                      <router-link
                        :to="'/user_details/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">User Details</h4>
                      </router-link>
                      <hr />
                      <router-link
                        :to="'/editEvent/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">Edit Event</h4>
                      </router-link>
                    </div>
                  </div>
                  <div
                    class="flex flex-wrap justify-center items-center cardcolor-cont"
                  >
                    <img
                      class="cardcolor"
                      style=""
                      :src="video.cover_image"
                      width="auto"
                    />
                  </div>
                  <div class="event-is-live video-length mt-4 ml-4" style="">
                    Event is Live!
                  </div>
                </div>

                <div>
                  <div class="video-title text-dark mt-2 mx-4 text-2xl">
                    <b>{{ video.event_name }}</b>
                  </div>

                  <div class="creator-profile mt-3">
                    <button
                      @click="joinnow(video)"
                      class="custom-avatar container joinimage ml-4"
                    ></button>
                    <vs-row
                      vs-type="flex"
                      vs-justify="space-between"
                      vs-align="center"
                      class="mt-3"
                    >
                      <div style="flex: 1">
                        <h4 class="ml-4 custom-text-size">
                          <b v-if="video.is_running === 'true'"
                            >cast has been started
                          </b>
                          <b v-else>cast hasn't started yet </b>
                        </h4>
                      </div>
                      <div>
                        <div></div>
                        <span
                          @mouseover="showDelText(video.event_id)"
                          @mouseleave="delText = false"
                          @click="delmeet(video)"
                          class="btnhover"
                          ><vs-icon
                            icon-pack="feather"
                            icon="icon-trash-2"
                            class="cursor"
                            size="24px"
                            rounded="true"
                          >
                          </vs-icon
                        ></span>
                      </div>
                    </vs-row>
                  </div>
                </div>
              </vs-card>
            </vs-col>
          </template>
        </vs-row>
        <!-- Upcoming Events -->
        <h3 class="text-2xl ml-10 mb-6 md:mb-10 upcoming">
          <b>Upcoming Events</b>
        </h3>
        <vs-row class="md:px-10">
          <template v-for="video in videoList">
            <vs-popup
              classContent="popup-example "
              title="Add Invitee "
              :key="video.id"
              :active.sync="inviteePopup"
              fullscreen
              style="background-color: transparent"
            >
              <div class="vx-row">
                <div class="vx-col md:w-1/4 w-full mt-5 flex flex-wrap">
                  <vs-input
                    label="Name"
                    v-model="userName"
                    class="w-full form-group"
                    placeholder="Name"
                  />
                </div>
                <div class="vx-col md:w-1/4 w-full mt-5 flex flex-wrap">
                  <vs-select
                    autocomplete
                    class="selectType form-group w-full normal"
                    label="Role"
                    v-model="userRole"
                    id="userType"
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.value"
                      :text="item.text"
                      v-for="(item, index) in userType"
                    />
                  </vs-select>
                </div>
                <!--
                  ____ Bad Code __ this code is not in use anymore 
                  <div
                  class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap form-group items-end"
                >
                   <vs-input
                    type="mail"
                    label="Email Address"
                    v-model="userEmail"
                    class="flex-1 mr-5 form-group"
                    placeholder="Email"
                  /> -->

                <!-- <vs-button class="btn-wizard py-4" @click.stop="addUser()"
                    >+</vs-button 
                  >
                </div>
                <div
                  class="text-danger text-sm mt-4 ml-4"
                  v-show="userNameError"
                >
                  Email field is required
                </div>
                -->
                <!-- <div
                  v-if="invitee_details.length > 0"
                  class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap"
                >
                  <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
                    <div class="flex flex-wrap w-full form-group items-center">
                      <label class="m-0">Added User List</label>
                      <div
                        class="w-full p-5 flex flex-wrap items-center form-group vx-card mt-5 border-light"
                        v-for="(item, index) in invitee_details"
                        :key="index"
                      >
                        <span>{{ item.name }}</span
                        ><span class="ml-3">{{ item.type }}</span
                        ><span class="ml-3">{{ item.email }}</span
                        ><span class="ml-3" @click.stop="removeUser(index)"
                          ><i class="fas fa-trash" />Remove</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <vs-button
                  class="btn-wizard mt-4 ml-4 flex-wrap text-center"
                  @click.stop="inviteUser(video.public_meeting_id)"
                  >Invite User</vs-button
                > 
                
                ____ till here ___ further to be checked 
              --></div>
            </vs-popup>
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.event_date + ' ' + video.event_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="checkpast(live) && video.is_running === 'false'"
              :key="video.id"
              class="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full"
            >
              <vs-card class="card-dimension relative">
                <div slot="media" class="thumbnail">
                  <div class="flex justify-end">
                    <img
                      class="w-6 h-6 more"
                      src="@/assets/images/casts/more.png"
                      @click="showMoreDetails(video.event_id)"
                    />
                    <div
                      v-if="moreBox == 'morebox' + video.event_id"
                      class="more-box"
                    >
                      <router-link
                        :to="'/user_details/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">User Details</h4>
                      </router-link>
                      <hr />
                      <router-link
                        :to="'/editEvent/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">Edit Event</h4>
                      </router-link>
                    </div>
                  </div>
                  <div
                    class="flex flex-wrap justify-center items-center cardcolor-cont"
                  >
                    <img
                      class="cardcolor"
                      style=""
                      :src="video.cover_image"
                      width="auto"
                    />
                  </div>
                </div>

                <div>
                  <div class="video-title text-dark mt-2 mx-4 text-2xl">
                    <b>{{ video.event_name }}</b>
                  </div>
                  <vs-row vs-type="flex" vs-align="center"> </vs-row>
                  <div class="creator-profile mt-3">
                    <button
                      @click="joinnow(video)"
                      class="custom-avatar container joinimage ml-4"
                    ></button>
                    <vs-row
                      vs-type="flex"
                      vs-justify="space-between"
                      vs-align="center"
                      class="mt-3"
                    >
                      <div>
                        <h3 class="livetext ml-4">
                          Live
                          {{ liveAgo(video.event_date, video.event_time) }}
                        </h3>
                      </div>
                      <div>
                        <div></div>
                        <span
                          @mouseover="showDelText(video_event.id)"
                          @mouseleave="delText = false"
                          @click="delmeet(video)"
                          class="btnhover"
                          ><vs-icon
                            icon-pack="feather"
                            icon="icon-trash-2"
                            class="cursor"
                            size="24px"
                            rounded="true"
                          >
                          </vs-icon
                        ></span>
                      </div>
                    </vs-row>
                  </div>
                </div>
              </vs-card>
            </vs-col>
          </template>
        </vs-row>
        <!-- Ended Events -->
        <h3 class="text-2xl ml-10 mb-6 md:mb-10 upcoming">
          <b>Ended Events</b>
        </h3>

        <vs-row class="md:px-10">
          <template v-for="video in videoList">
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.event_date + ' ' + video.event_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="
                !checkpast(live) &&
                video.event_expired &&
                video.is_running === 'false'
              "
              :key="video.id"
              class="p-3 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full flex justify-center items-center"
            >
              <vs-card class="card-dimension relative">
                <div slot="media" class="thumbnail">
                  <div class="flex justify-end options">
                    <img
                      class="w-6 h-6 more"
                      src="@/assets/images/casts/more.png"
                      @click="showMoreDetails(video.event_id)"
                    />
                    <div
                      v-if="moreBox == 'morebox' + video.event_id"
                      class="more-box"
                    >
                      <router-link
                        :to="'/user_details/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">User Details</h4>
                      </router-link>
                      <hr />
                      <router-link
                        :to="'/editEvent/' + video.public_meeting_id"
                      >
                        <h4 class="text-white">Edit Event</h4>
                      </router-link>
                    </div>
                  </div>
                  <div
                    class="flex flex-wrap justify-center items-center cardcolor-cont"
                    :class="{ recording: video.recording_available }"
                  >
                    <div
                      class="recordingBtn"
                      v-tippy="{ placement: 'top', arrow: true }"
                      content="Watch Recording"
                    >
                      <span></span>
                      <vs-icon
                        icon-pack="feather"
                        icon="icon-play"
                        rounded="true"
                        size="45px"
                        class="cursor-pointer"
                        @click="watchRecording(video.public_meeting_id)"
                      ></vs-icon>
                    </div>
                    <img
                      class="cardcolor"
                      style="background-color: #f5f5f5"
                      :src="video.cover_image"
                      width="auto"
                    />
                  </div>
                  <div class="ended-event mt-4 ml-4">Event Ended</div>
                </div>
                <div>
                  <div class="mx-4 mt-3 text-2xl font-light text-slate-300">
                    <b>{{ video.event_name }}</b>
                  </div>

                  <div class="creator-profile mt-3">
                    <button
                      @click="joinnow(video)"
                      class="custom-avatar container joinimage ml-4"
                    ></button>

                    <vs-row
                      vs-type="flex"
                      vs-justify="space-between"
                      vs-align="center"
                    >
                      <div>
                        <div
                          class="ml-4 text-xl font-medium"
                          style="color: #ff0000ad"
                        >
                          Live
                          {{ liveAgo(video.event_date, video.event_time) }}
                        </div>
                      </div>
                      <div>
                        <div></div>
                        <span
                          @mouseover="showDelText(video.event_id)"
                          @mouseleave="delText = false"
                          @click="delmeet(video)"
                          class="btnhover"
                          ><vs-icon
                            icon-pack="feather"
                            icon="icon-trash-2"
                            class="cursor"
                            size="24px"
                            rounded="true"
                          >
                          </vs-icon>
                        </span>
                      </div>
                    </vs-row>
                  </div>
                </div>
              </vs-card>
            </vs-col>
          </template>
        </vs-row>
      </template>
      <template v-else>
        <div class="flex h-72 justify-center items-center flex-wrap">
          <h4 class="text-danger">No Event Created yet</h4>
        </div>
      </template>
    </div>
    <vs-popup ref="custom_modal" :active.sync="showAssetModal">
      <div class="flex items-start -m-5">
        <div class="p-5">
          <img src="@/assets/images/Frame264.svg" />
        </div>
        <div class="p-5">
          <div class="mb-2">
            <h4>{{ selectedVideo.video ? selectedVideo.video.title : '' }}</h4>
          </div>
          <div>
            <div class="text-2xl" v-if="!isWalletConnected">
              Connect Wallet !
            </div>
            <div v-else class="vs-con-loading__container" id="buy-download">
              <div v-if="!isDownloadable">
                <div class="mb-2">
                  <b>{{ oceanRequired }}</b> OCEAN
                </div>
                <vs-button
                  type="filled"
                  class="mb-2 font-semibold"
                  @click="buyContent"
                  >Buy</vs-button
                >
              </div>
              <vs-button
                v-else
                type="filled"
                class="font-semibold"
                @click="downloadAsset"
                >Download</vs-button
              >
            </div>
          </div>
        </div>
      </div>
      <!--vs-divider /-->
    </vs-popup>
    <Transaction
      :show="showTransactionModal"
      :transactionType="txType"
      :transactionPhase="currentTxPhase"
      @close="showTransactionModal = false"
      @retry="txType === 'Buy' ? buyContent() : downloadAsset()"
    />
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import { ajaxCallMixin } from '../http/HttpCommon';
import axios from '../axios';
import constants from '../../constant';
var moment = require('moment');

export default {
  name: 'Dashboard',
  mixins: [ajaxCallMixin],

  components: {
    TheHeader,
    Transaction,
  },

  data() {
    return {
      ongoing: true,
      upcoming: true,
      ended: true,
      videoList: [],
      knowledgeBaseSearchQuery: null,
      moment: moment,
      my_events: [
        {
          event_name: [],
        },
      ],
      isLoading: false,
      selectedVideo: {},
      oceanRequired: 0,
      showAssetModal: false,
      videoTxData: {},
      isDownloadable: false,
      showTransactionModal: false,
      txType: 'Buy',
      inviteePopup: false,
      currentTxPhase: 'Processing',
      userName: '',
      userNameError: false,
      userEmailError: false,
      userEmail: '',
      userRole: 'attendee',
      userType: [
        { text: 'Attendee', value: 'attendee' },
        { text: 'Viewer', value: 'viewer' },
        { text: 'Moderator', value: 'moderator' },
      ],
      invitee_details: [],
      meetingId: '',
      moreBox: false,
      delText: false,
      currentUserTime: moment.utc(Date.now()),
    };
  },
  computed: {
    reversedVideoList() {
      return this.videoList.slice().reverse();
    },
    isWalletConnected() {
      return this.$store.state.isWalletConnected;
    },
    accountAddress() {
      return this.$store.state.accountAddress;
    },
  },
  mounted() {
    this.getVideoList();
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '400px';
    setInterval(() => {
      this.liveAgo();
    }, 1000);
  },
  methods: {
    watchRecording(id) {
      this.$vs.loading();
      axios({
        method: 'GET',
        url: `${constants.apiCastUrl}/api/event/meeting/recording/?cast_id=${id}`,
      })
        .then((res) => {
          this.$vs.loading.close();
          window.open(res.data.recording_url, '_blank');
        })
        .catch((e) => {
          this.$vs.loading.close();
          console.log(e.response);
          if (e.response.data.recording_url === null) {
            this.$vs.notify({
              time: 3000,
              title: 'No Recording',
              text: "You don't have any recordings for this event",
              color: 'danger',
            });
          } else
            this.$vs.notify({
              time: 3000,
              title: 'UnAuthorized',
              text: 'You are not authorized to see recording',
              color: 'danger',
            });
        });
    },
    liveAgo(x, y) {
      return moment.utc(x + ' ' + y).fromNow();
    },
    getNow() {
      this.currentUserTime = moment.utc(Date.now());
    },
    checkpast(live) {
      return !live.includes('ago');
    },
    minsdiff(s) {
      const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
      const expiration = moment(s, 'yyyy-MM-DD HH:mm:ss');

      // get the difference between the moments
      const diff = expiration.diff(now);
      const diffDuration = moment.duration(diff);

      if (
        diffDuration.days() === 0 &&
        diffDuration.hours() === 0 &&
        diffDuration.seconds() < 0 &&
        diffDuration.minutes() < 0 &&
        diffDuration.minutes() > -30
      ) {
        return true;
      } else if (
        diffDuration.days() === 0 &&
        diffDuration.hours() === 0 &&
        diffDuration.seconds() < 0 &&
        diffDuration.minutes() === 0
      ) {
        return true;
      } else if (
        diffDuration.days() === 0 &&
        diffDuration.hours() === 0 &&
        diffDuration.seconds() === 0 &&
        diffDuration.minutes() === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    getVideoList() {
      const url = constants.apiCastUrl + '/api/event/user/events/';
      this.$vs.loading({
        background: 'transparent',
        container: '#div-with-loading',
      });
      this.isLoading = true;
      this.getRequest(url, this.handleResponse);
    },
    handleResponse(apiResponse) {
      this.$vs.loading.close('#div-with-loading > .con-vs-loading');
      this.isLoading = false;
      this.videoList = apiResponse.my_events;
      this.event_name = apiResponse.my_events.event_name;
      console.log(typeof this.videoList[2].is_running);
    },

    async joinnow(video) {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/join/', {
          name: this.name,
          email: '',
          name: video.event_name,
          password: '',
          public_meeting_id: video.public_meeting_id,
          redirect: true,
          room_type: 'private',
          avatar_url: '',
          guest: false,
          moderator_password: this.moderator_password,
          attendee_password: this.attendee_password,
        })
        .then((response) => {
          this.responsedata = response.data.url;
          window.open(`/user_details/${video.public_meeting_id}`, '_blank');
          window.location.href = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((error) => {
          this.$vs.notify({
            title: 'Oops!',
            text:
              error.response != null
                ? error.response.data.message
                : 'Check the Scheduled time',
            color: 'danger',
          });
        });
    },

    async delmeet(video) {
      this.$vs.loading();
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/delete/', {
          public_meeting_id: video.public_meeting_id,
        })
        .then((response) => {
          this.$vs.loading.close();
          this.responsedata = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          this.getVideoList();
          // this.response = JSON.stringify(response, null, 2)
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.response = 'Error: ' + error.response.status;
          this.$vs.notify({
            title: 'Meeting Does not Exist',
            text:
              error.response != null
                ? error.response.data.message
                : 'meeting already got deleted ',
            color: 'danger',
          });
        });
    },
    addInviteePupup() {
      this.inviteePopup = true;
    },
    addUser() {
      if (this.userName === '' || this.userEmail === '') {
        this.userNameError = true;
      } else {
        this.invitee_details = [
          ...this.invitee_details,
          { name: this.userName, email: this.userEmail, type: this.userRole },
        ];
        this.userName = '';
        this.userEmail = '';
        this.userNameError = false;
      }
    },
    removeUser(userIndex) {
      if (userIndex > -1) {
        this.invitee_details.splice(userIndex, 1);
      }
    },
    inviteUser(meetId) {
      console.log('meetId', meetId);
    },
    showMoreDetails(id) {
      if (this.moreBox) {
        this.moreBox = 0;
      } else {
        this.moreBox = 'morebox' + id;
      }
    },
    showDelText(id) {
      if (this.delText) {
        this.delText = 0;
      } else {
        this.delText = 'deltext' + id;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.custom-text-size {
  font-size: 18px;
}
.backgroundimage {
  background: rgb(115, 103, 240);
  background-image: url(../assets/images/landing-page/newmask.svg);
  height: 37rem;
}

.textdiscover {
  text-align: center;
  padding-top: 3rem;
  color: white;
  size: 20rem;
}

.searchbardis {
  align-content: right;
  padding-top: 7rem;
  margin-left: auto;
  margin-right: auto;
}

.cardcolor-cont {
  height: 150px;
  background: rgba(115, 103, 240, 0.5);
}

.cardcolor-cont img {
  height: 150px;
  width: auto !important;
}

.cardcolor {
  align-items: center;
}

.joinimage {
  align-items: center;
  background-image: url(../assets/images/Framestartclass.svg);
  border-radius: 70px;
  height: 2.2em;
  padding-left: 20px;
  width: 155px;
  background-position-y: center;
  background-position-x: center;
  background-color: white;
  border: none;
  cursor: pointer;
  margin-left: -13px;
}

.joinimage:active {
  background-color: whitesmoke;
}

.btnhover:hover {
  cursor: pointer;
  background-color: #f7187162 !important;
  filter: invert(19%) sepia(91%) saturate(6442%) hue-rotate(337deg)
    brightness(94%) contrast(100%);
}

.icon-scale {
  width: 20px;
  height: 20px;
  font-size: 25px;
  float: right;
}

.float {
  float: left;
  width: 100%;
}

li {
  list-style: none;
  margin-top: 30px;
}

li:hover {
  cursor: pointer;
}

.hide {
  display: none;
}

.upcoming {
  padding-top: 2rem;
  color: #000;
}

.livetext {
  color: royalblue;
}

.ended-event {
  padding: 0.5rem;
  background: linear-gradient(121.4deg, #f29300 -10.75%, #fecf54 125.11%);
  color: #fff !important;
  border-radius: 25px;
  width: 9rem;
  text-align: center;
  font-weight: 600;
}

.event-is-live {
  padding: 0.5rem;
  border-radius: 25px;
  text-align: center;
  font-weight: 600;
  width: fit-content;
  color: rgba(247, 11, 11, 0.89);
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #a5a1a1 74%);
}

.vs-popup--background {
  background-color: transparent;
}

.more {
  position: absolute;
  margin: 10px 5px 0;
  cursor: pointer;
  z-index: 1;
}

.more-box {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  box-sizing: border-box;
  top: 5px;
  right: 30px;
  z-index: 1;
}

.more-box > h4 {
  padding: 8px 5px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7) !important;
}

.more-box > h4:hover {
  background-color: #8d56f8 !important;
  color: #fff;
}

.thumbnail {
  position: relative;
}

.card-dimension {
  height: 90%;
  width: 90%;
  overflow: hidden;
  border-radius: 13px;
}

.ended-event > span {
  margin: 0 !important;
}

.del-text {
  position: absolute;
  border-radius: 15px;
  padding: 4px 5px;
  background-color: #f71871;
  color: #f8c3cff3 !important;
  margin: -2.5em -5em;
  font-size: 1.2em;
}

.recording {
  position: relative;
}

.recordingBtn {
  display: none;
  position: absolute;
  z-index: 1000000 !important;
  color: white;
}

.options {
  z-index: 1000000 !important;
}

.recording::after {
  content: '';
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.466);
  position: absolute;
  display: none;
  transition: all 0.3;
}

.recording:hover {
  .recordingBtn {
    display: block;
  }
}

.recording:hover::after {
  display: block;
}
</style>
