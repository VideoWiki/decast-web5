<template>
  <span>
    <vs-button
      v-if="isAirdrop && pub_nft_flow"
      class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
      @click="showCopyModal"
      content="Copy link of NFT to share"
      v-tippy="{ placement: 'top', arrow: true }"
    >
      <vs-icon
        icon-pack="feather"
        icon="icon-share-2"
        size="20px"
        rounded="true"
        style="align-self: flex-end"
      >
      </vs-icon>
    </vs-button>

    <vs-popup
      :active.sync="showCopyPopup"
      ref="sharePopup"
      title="Public NFT Link"
    >
      <div class="copy Link">
        <p class="text-lg text-black my-2 font-medium">Share</p>
        <div>
          <div class="link-container">
            <span id="datatoken" class="link-text px-2">
              {{
                `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
              }}
            </span>
            <button class="copy-btn" @click="copy">Copy</button>
          </div>
        </div>
        <div>
          <!-- <p class="hr-lines">or</p> -->
          <div class="social-icons my-5 w-8/12 mx-auto justify-between">
            <button
              class="whatsapp p-5 cursor-pointer"
              @click="shareOnWhatsApp"
            >
              <i class="fa fa-whatsapp text-3xl"></i>
            </button>
            <button class="twitter p-5 cursor-pointer" @click="shareOnTwitter">
              <i class="fa fa-twitter text-3xl"></i>
            </button>
            <button
              class="facebook p-5 cursor-pointer"
              @click="shareOnFacebook"
            >
              <i class="fa fa-facebook text-3xl"></i>
            </button>
            <button class="reddit p-5 cursor-pointer" @click="shareOnReddit">
              <i class="fa fa-reddit text-3xl"></i>
            </button>
          </div>
        </div>
      </div>
    </vs-popup>
  </span>
</template>

<script>
export default {
  data() {
    return {
      showCopyPopup: false,
    };
  },
  props: ['isAirdrop', 'pub_nft_flow'],
  mounted() {
    this.$refs.sharePopup.$el.childNodes[1].childNodes[0].style.display =
      'none';
  },
  methods: {
    showCopyModal() {
      this.showCopyPopup = true;
      document.getElementById('datatoken').style.color = 'black';
    },
    shareOnFacebook() {
      const url = encodeURIComponent(
        `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
      );
      const text = encodeURIComponent(
        'Take a look at this unique digital artwork!\n'
      );
      const shareUrl = `https://www.facebook.com/sharer.php?u=${url}&quote=${text}`;

      window.open(shareUrl, '_blank', 'width=550,height=420');
    },
    shareOnTwitter() {
      const url = encodeURIComponent(
        `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
      );
      const text = encodeURIComponent(
        'Take a look at this unique digital artwork!'
      );
      const via = encodeURIComponent('yourTwitterHandle');
      const hashtags = encodeURIComponent('example,cool,nft,DigitalArtwork');

      const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}&hashtags=${hashtags}`;

      window.open(shareUrl, '_blank', 'width=550,height=420');
    },
    shareOnWhatsApp() {
      const url = encodeURIComponent(
        `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
      );
      const text = encodeURIComponent(
        'Take a look at this unique digital artwork!\n'
      );
      const shareUrl = `whatsapp://send?text=${text} ${url}`;

      window.open(shareUrl, '_blank', 'width=550,height=420');
    },

    shareOnReddit() {
      const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
        `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
      )}&title=${encodeURIComponent(
        'Take a look at this unique digital artwork!\n'
      )}`;
      window.open(url, '_blank', 'width=550,height=420');
    },
    copy() {
      navigator.clipboard.writeText(
        `https://cast.video.wiki/public/nftdrop?cast_id=${this.$route.params.session_key}`
      );
      document.getElementById('datatoken').style.color = 'green';
    },
  },
};
</script>

<style>
.social-icons {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.social-icons button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
}

.whatsapp {
  background-color: #25d366;
  color: #fff; /* White text */
  border: none; /* No border */
  font-size: 20px;
}

.twitter {
  background-color: #1da1f2;
  color: #fff;
  border: none;
  font-size: 20px;
}

.facebook {
  background-color: #3b5998; /* Facebook blue */
  color: #fff;
  border: none;
  font-size: 20px;
}
.link-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 12px;
}

.link-container span {
  flex-grow: 1;
}

.copy-btn {
  background-color: #8d56f8;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-left: 6px;
}
.link-text {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.reddit {
  background-color: #ff4500; /* Reddit orange */
  color: #ffffff; /* white */
  border: none;
  border-radius: 5px;
  padding: 8px;
  font-size: 20px;
  margin-right: 10px; /* add some space between the buttons */
}
</style>
