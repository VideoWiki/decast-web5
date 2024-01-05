<!-- =========================================================================================
    File Name: VideoCard.vue
    Description: fetch all background image and details using api
    ----------------------------------------------------------------------------------------
    Item Name:
    Author: Rana Vivek Singh
========================================================================================== -->

<template>
  <div class="newalignvideo">
    <vs-card class="card card-dimension custom-border-box card-custom-style">
      <div slot="media" class="thumbnail">
        <img
          style="background-color: #7a35ff1a"
          class="object-cover"
          :src="cover_image"
          height="208"
          width="100%"
        />

        <vs-chip class="video-length">{{ newTime }} {{ timeAbbr }}</vs-chip>
      </div>
      <div class="content">
        <div class="vx-row flex flex-wrap items-center w-full no-gutter">
          <div class="vx-col lg:w-1/4 md:w-1/2 xs:w-1/4 flex flex-wrap">
            <vs-avatar :src="logo" color="#f6f6f6" size="55px" />
          </div>
          <div class="vx-col lg:w-3/4 md:w-1/2 xs:w-3/4 py-1">
            <h3
              data-v-1ab6bfc5=""
              class="truncate card-event-name hover:text-primary cursor-pointer"
              @click="joinnowEventDetail"
            >
              {{ meeting_name }}
            </h3>
            <p class="card-event-username">
              {{ creator_name !== '' ? creator_name : '   ' }}
            </p>
          </div>
        </div>
        <div class="vx-row flex flex-wrap items-center w-full">
          <div class="vx-col lg:w-1/2 mt-4">
            <h4 class="status">Live {{ live_in }}</h4>
          </div>
        </div>
        <div></div>
      </div>
    </vs-card>
  </div>
</template>
<script>
import moment from 'moment-timezone';
export default {
  mounted() {
    moment.tz.setDefault('UTC');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const a = moment(this.meeting_time + ' ' + this.meeting_day)
      .clone()
      .tz(timezone);
    this.timeAbbr = moment().tz(timezone).zoneAbbr();
    this.newTime = moment(a._d).tz(timezone).format('HH:mm:ss');
    if (this.meeting_name === 'dsaf') {
      console.log(this.meeting_name, a._d);
      console.log(this.newTime);
    }
  },
  props: [
    'meeting_name',
    'meeting_day',
    'meeting_time',
    'session_key',
    'live_in',
    'creator_name',
    'cover_image',
    'logo',
  ],
  data() {
    return {
      timeAbbr: '',
      newTime: 0,
      videoList: [],
      popupActive2: false,
      name: '',
      password: '',
      eventid: '',
    };
  },
  methods: {
    joinnowEventDetail() {
      var push = `/eventdetails/${this.session_key}`; // used /info/public api for event details page
      this.$router.push(push);
    },
  },
};
</script>
<style scoped>
.card-dimension {
  height: 90%;
  width: 90%;
  overflow: hidden;
  border-radius: 16px;
}
.custom-avatar {
  margin: 0;
  margin-left: -13px;
}
.custom-avatar :first-child {
  font-size: 16px;
}
.thumbnail {
  position: relative;
}
.video-length {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 10;
  bottom: 15px;
  right: 20px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}
.video-length :first-child {
  color: #fff;
  font-weight: 600;
}
.video-tag {
  width: 61px;
  height: 20px;
}

.version-chip :last-child {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e64980;
  cursor: pointer;
  color: #e64980;
  background: none;
}
.joinimage {
  background-image: url(../../assets/images/Frame264.svg);
  border-radius: 70px;
  height: 2.2em;
  width: 155px;
  background-position-y: center;
  background-position-x: center;
  background-color: white;
  border: none;
  cursor: pointer;
}
.joinimage:active {
  background-color: whitesmoke;
}
.containnew {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 1300px;
  height: 1630px;
  left: 120px;
  top: 646px;
}
.rowone {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: static;
  width: 1200px;
  height: 385px;
  left: 0px;
  top: 0px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 30px 0px;
}
/* .newalignvideo {
  position: static;
  width: 370px;
  height: 385px;
  left: 0px;
  top: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
} */
.card-custom-style {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.card-event-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}

.card-event-username {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #909090;
}
.videosection {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: static;
  width: 1170px;
  height: 385px;
  left: 0px;
  top: 0px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 30px 0px;
}
.content {
  padding-left: 1rem;
}
.status {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background: rgba(17, 181, 228, 0.1);
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #11b5e4;
}
.avatar-text {
  position: relative;
  top: -16px;
}
</style>
