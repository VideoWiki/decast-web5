<template>
  <div class="margin">
    <div class="cross-img">
      <img
        @click="closeCreate"
        class="cursor-pointer"
        src="@/assets/images/create-event/Vector30.svg"
        alt=""
      />
    </div>

    <div class="popup-svg">
      <img src="@/assets/images/create-event/trophy.svg" />
    </div>
    <div class="popup-text2">Great your cast was created</div>
    <div class="extra-text">Next steps:</div>
    <div class="extra-text2">Add attendees, Share ...etc</div>
    <div class="my-5 flex justify-center bottom">
      <button class="success-btn button flex items-center" @click="changeStatus('drops')">
        <img src="@/assets/images/create-event/tabler.svg" /> Add drops
      </button>
      <button
        @click="changeStatus('invite')"
        class="success-btn button flex items-center"
      >
        <img src="@/assets/images/create-event/tabler-icon.svg" />Invite your
        audience
      </button>
      <button class="success-btn button flex items-center" @click="toggleShare">
        <img src="@/assets/images/stream.svg" />Share your cast
      </button>
    </div>
    <div class="skip cursor-pointer" @click="closeCreate">
      Skip for now
      <div class="underline"></div>
    </div>

    <div v-if="showShare" class="share-cont">
      <div class="close-btn-cont">
        <h3>Share your Cast</h3>
        <button @click="closeShare">
          <img src="@/assets/images/cross.svg" />
        </button>
      </div>

      <div class="link-cont">
        <div class="cursor-pointer" @click="copyCastLink">
          <img src="@/assets/images/link.png" />
        </div>
        <div>
          <a target="_blank" :href="getShareUrl('facebook')">
            <img src="@/assets/images/face.svg" />
          </a>
        </div>
        <div>
          <a target="_blank" :href="getShareUrl('twitter')">
            <img src="@/assets/images/twitter.svg" />
          </a>
        </div>
        <div>
          <a target="_blank" :href="getShareUrl('pinterest')">
            <img src="@/assets/images/pinterest.svg" />
          </a>
        </div>
        <div>
          <a target="_blank" :href="getShareUrl('linkedin')">
            <img src="@/assets/images/linked.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello, Vue!',
      showPopup: false, // Initially, the pop-up is hidden
      showShare: false,
      link: '',
      // castList: [],
    };
  },
  props: ['closeCreate', 'changeStatus'],
  mounted() {
    this.getCastList();
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  computed: {
    castList() {
      return this.$store.state.cast.castsInfo;
    },
    castInfoList() {
      return this.$store.state.cast.casts;
    },
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.showShare = false;
      console.log('Popup closed');
    },
    closeShare() {
      this.showShare = false;
      console.log('Share-closed');
    },
    toggleShare() {
      this.showShare = !this.showShare;
      // console.log('Cast List:', this.castList);
      // console.log('jjjlk:', this.castInfoList);
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.share-cont');
      const isNotTogglePopupButton = !event.target.closest('.success-btn');
      if (
        isOutsideRoomPopup &&
        isNotTogglePopupButton &&
        this.showShare !== false
      ) {
        this.showShare = false;
      }
    },
    getShareUrl(platform) {
      const castInfoList = this.castInfoList;
      if (castInfoList && castInfoList.length > 0) {
        const firstCast = castInfoList[0];
        const id = firstCast.public_meeting_id;
        const pass = firstCast.h_ap;
        const castLink = `https://decast.live/join-cast/${id}/?pass=${pass}`;
        const shareUrls = {
          // link: castLink,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            castLink
          )}`,
          twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            castLink
          )}&text=Check%20out%20this%20cast!`,
          pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            castLink
          )}`,
          linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
            castLink
          )}`,
        };
        return shareUrls[platform] || '';
      }
      return '';
    },
    copyCastLink() {
      console.log('click');
      this.copy();
    },
    copy() {
      const castInfoList = this.castInfoList;
      if (castInfoList && castInfoList.length > 0) {
        const firstCast = castInfoList[0];
        const id = firstCast.public_meeting_id;
        const pass = firstCast.h_ap;
        const link = `https://decast.live/join-cast/${id}/?pass=${pass}`;
        navigator.clipboard
          .writeText(link)
          .then(() => {
            console.log('Link copied:', link);
          })
          .catch((error) => {
            console.error('Copy failed:', error);
          });
        this.getCastList();
      }
    },
    getCastList() {
      this.$store
        .dispatch('cast/getCastList')
        .then((response) => {
          // console.log(response, 'll');
        })
        .catch((error) => {
          // Handle API request error here
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.margin {
  margin: 18px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.popup-text {
  font-family: Karla;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.37px;
  letter-spacing: 0em;
  text-align: left;
  color: #a6a6a8;
}

.popup-svg {
  width: 133px;
  height: 120px;
  left: 2543px;
  margin: 0 auto;
  margin-top: 35px;
}

.popup-text2 {
  font-family: Karla;
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #d7df23;
  padding-top: 22px;
}

.success-btn {
  display: flex;
  font-size: 12px;
  font-family: Karla;
  padding: 15px;
  font-weight: 600;
  border-radius: 6px;
  height: 40px;
  border: 1px;
  cursor: pointer;
}

.success-btn img {
  margin-right: 10px;
  margin-left: 80px;
}

.button {
  width: 297px;
  background-color: #31394e;
  color: #a6a6a8;
  margin-top: 15px;
}

.bottom {
  flex-direction: column;
  align-items: center;
}

.extra-text,
.extra-text2 {
  text-align: center;
  font-size: 500;
  font-weight: 16px;
  color: #647181;
}

.skip {
  margin-top: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #647181;
  align-self: flex-end;
}

.underline {
  width: 93px;
  height: 2px;
  background-color: #31394e;
  margin-top: 3px;
}

.cross-img {
  align-self: flex-end;
  width: 12px;
  height: 12px;
}

.share-cont {
  width: 350px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 8px;
  height: 150px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 18%;
}

.link-cont {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: auto;
  margin-top: 20px;
}

.close-btn-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.close-btn-cont h3 {
  font-size: 12px;
  color: #a6a6a8;
}

.close-btn-cont button {
  width: 14px;
  height: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.close-btn-cont button img {
  width: 12px;
  height: 12px;
}
</style>
