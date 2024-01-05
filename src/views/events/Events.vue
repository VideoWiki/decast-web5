<template>
  <div id="knowledge-base-page">
    <div class="eventsBanner pt-5 w-full lg:block flex flex-wrap">
      <TheHeader />
      <div class="section flex flex-wrap w-full m-auto">
        <div class="w-full flex flex-col items-center">
          <h1
            class="mb-1 lg:text-7xl font-extrabold mb-8 mt-2 text-5xl text-white"
          >
            <b>Discover live casts</b>
          </h1>
          <h2 class="mb-1 lg:w-1/2 text-white text-center">
            Scale your voice! Broadcast your message on multiple channels
            streams
          </h2>
          <vs-input
            icon-no-border
            placeholder="Search Topic or Keyword"
            v-model="knowledgeBaseSearchQuery"
            icon-pack="feather"
            icon="icon-search"
            size="large"
            class="w-1/2 mt-6"
          />
        </div>
      </div>
    </div>
    <div
      class="vs-con-loading__container"
      id="div-with-loading"
      :class="{ 'h-72': isLoading }"
    ></div>
    <div v-if="!isLoading" class="section">
      <template v-if="checklive == true">
        <h3 class="lg:text-2xl text-xl my-10 flex justify-between items-center">
          <b>Ongoing Events</b>
          <span class="text-grey cursor-pointer">View all</span>
        </h3>
        <vs-row>
          <template v-for="video in videoList">
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.meeting_day + ' ' + video.meeting_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="minsdiff(`${video.meeting_day} ${video.meeting_time}`)"
              :key="video.id"
              class="lg:w-1/3 md:w-1/2 w-full"
            >
              <VideoCard
                :meeting_name="video.event_name"
                :meeting_day="video.meeting_day"
                :meeting_time="video.meeting_time"
                :session_key="video.session_key"
                :creator_name="video.creator_name"
                :live_in="live"
                :cover_image="video.cover_image"
                :logo="video.logo"
                type="published"
                :isUser="false"
              />
            </vs-col>
          </template>
        </vs-row>
        <!-- upcomming events -->
        <h3 class="lg:text-2xl text-xl my-10 flex justify-between items-center">
          <b>Upcoming Events</b>
          <span class="text-grey cursor-pointer">View all</span>
        </h3>

        <vs-row>
          <template v-for="video in videoList">
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.meeting_day + ' ' + video.meeting_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="checkpast(live)"
              :key="video.id"
              class="p-3 lg:w-1/3 md:w-1/3 sm:w-1/2 w-full"
            >
              <VideoCard
                :meeting_name="video.event_name"
                :meeting_day="video.meeting_day"
                :meeting_time="video.meeting_time"
                :session_key="video.session_key"
                :creator_name="video.creator_name"
                :live_in="live"
                :cover_image="video.cover_image"
                :logo="video.logo"
                type="published"
                :isUser="false"
              />
            </vs-col>
          </template>
        </vs-row>
        <!-- past events -->
        <h3 class="lg:text-2xl text-xl my-10 flex justify-between items-center">
          <b>Ended Recently</b>
          <span class="text-grey cursor-pointer">View all</span>
        </h3>

        <vs-row>
          <template v-for="video in videoList">
            <p class="hide" :key="video.id">
              {{
                (live = moment
                  .utc(
                    video.meeting_day + ' ' + video.meeting_time,
                    moment.defaultFormat
                  )
                  .fromNow())
              }}
            </p>
            <vs-col
              v-if="
                !checkpast(live) &&
                !minsdiff(`${video.meeting_day} ${video.meeting_time}`)
              "
              :key="video.id"
              class="p-2 lg:w-1/3 md:w-1/3 sm:w-1/2 w-full"
            >
              <VideoCard
                :meeting_name="video.event_name"
                :meeting_day="video.meeting_day"
                :meeting_time="video.meeting_time"
                :session_key="video.session_key"
                :creator_name="video.creator_name"
                :live_in="live"
                :cover_image="video.cover_image"
                :logo="video.logo"
                type="published"
                :isUser="false"
              />
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
          <img src="@/assets/images/pages/mp4.svg" />
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
import constants from '../../../constant';

var moment = require('moment');
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import VideoCard from '../components/VideoCard';
import { ajaxCallMixin } from '../../http/HttpCommon';

export default {
  mounted() {},
  name: 'Event',
  mixins: [ajaxCallMixin],
  components: {
    TheHeader,
    VideoCard,
    Transaction,
  },
  data() {
    return {
      moment: moment,
      knowledgeBaseSearchQuery: '',
      videoList: [],
      isLoading: false,
      selectedVideo: {},
      oceanRequired: 0,
      showAssetModal: false,
      videoTxData: {},
      isDownloadable: false,
      showTransactionModal: false,
      txType: 'Buy',
      currentTxPhase: 'Processing',
      checklive: true,
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
    filteredKB() {
      return this.videoList.filter(
        (scheduled_meetings) =>
          scheduled_meetings.event_name
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.getVideoList(); //getVideolist function is mounted and declared in method to render while loading
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '400px';
  },
  methods: {
    checkpast(live) {
      return live.includes('ago') ? false : true;
    },
    minsdiff(s) {
      const now = moment.utc().format('yyyy-MM-DD HH:mm:ss');
      const expiration = moment(s, 'yyyy-MM-DD HH:mm:ss');

      // get the difference between the moments
      const diff = expiration.diff(now);

      //express as a duration
      const diffDuration = moment.duration(diff);
      if (
        diffDuration.days() == 0 &&
        diffDuration.hours() == 0 &&
        diffDuration.minutes() < 0 &&
        diffDuration.minutes() > -30
      )
        return true;
      else return false;
    },
    getVideoList() {
      const url = constants.apiCastUrl + '/api/event/scheduled/events/';
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
      this.videoList = apiResponse.scheduled_meetings;
    },
  },
};
</script>
<style scoped>
.section {
  padding: 8%;
}
.eventsBanner {
  background: rgb(115, 103, 240);
  background-image: url(../../assets/images/landing-page/newmask.svg);
  background-size: contain;
}
.hide {
  display: none;
}
hr {
  width: 130px;
}

.upcoming {
  text-align: center;
  padding-top: 2rem;
  color: rgb(115, 103, 255);
}
</style>
<style lang="sass" scoped>
.grid-view-item
  .grid-view-img
    max-width: 100%
    max-height: 100%
    width: auto
    transition: .35s
</style>
