<template>
  <div>
    <TheHeader />
    <div
      class="vs-con-loading__container"
      id="div-with-loading"
      :class="{ 'h-72': isLoading }"
    ></div>
    <div v-if="!isLoading" style="padding-top: 7em">
      <template v-if="videoList.length > 0">
        <vs-row>
          <template v-for="video in videoList">
            <vs-col
              :key="video.id"
              class="p-3 lg:w-1/5 md:w-1/3 sm:w-1/2 w-full"
            >
              <VideoCard
                :prop="video"
                type="published"
                :isUser="false"
                @click.native="detailView(video)"
              />
            </vs-col>
          </template>
        </vs-row>
      </template>
      <template v-else>
        <div class="flex h-72 justify-center items-center flex-wrap">
          <h4 class="text-danger">No videos published yet</h4>
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
              <div v-else>
                <vs-button
                  type="filled"
                  class="font-semibold"
                  :class="{ padding: myVideo, '': !myVideo }"
                  @click="downloadAsset"
                  >Download</vs-button
                >
                <vs-button
                  v-if="myVideo"
                  type="filled"
                  class="font-semibold mt-3"
                  @click="showDataToken"
                  >Data Token</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--vs-divider /-->
    </vs-popup>
    <!-- DataToken PopUp -->
    <vs-popup
      ref="custom_datatoken_modal"
      :active.sync="showDataTokenModal"
      title="Data Token"
    >
      <div class="datatoken-modal">
        <div>
          <h3 class="videoTitle">{{ videoTitle }}</h3>
          <p><b>Description: </b> {{ videoDescription }}</p>
        </div>
        <div>
          <span id="datatoken">{{
            dataToken.slice(0, dataToken.length - 20) + '...'
          }}</span>
          <span></span>
          <feather-icon
            icon="CopyIcon"
            svgClasses="h-8 w-8 stroke-current"
            id="copyBtn"
            class="copy"
            @click="copy"
            ref="copy"
          />
          <p class="helpText">
            <feather-icon
              icon="InfoIcon"
              svgClasses="h-3 w-3 stroke-current"
              id="infoBtn"
              class="info"
              @click="copy"
              ref="copy"
            />
            Copy the data token and past it on your cast user management page to
            transfer it
          </p>
        </div>
      </div>
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
import TheHeader from '@/layouts/components/navbar/NavbarDashboard';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import VideoCard from './components/VideoCard';
import { ajaxCallMixin } from '../../http/HttpCommon';
export default {
  name: 'Dashboard',
  mixins: [ajaxCallMixin],
  components: {
    TheHeader,
    VideoCard,
    Transaction,
  },
  data() {
    return {
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
      dataToken: '',
      showDataTokenModal: false,
      videoTitle: '',
      videoDescription: '',
      myVideo: false,
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
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.dataToken);
      document.getElementById('datatoken').style.color = 'green';
      document.getElementById('copyBtn').style.color = 'green';
    },
    showDataToken() {
      this.showDataTokenModal = true;
      this.showAssetModal = false;
      document.getElementById('datatoken').style.color = 'black';
      document.getElementById('copyBtn').style.color = 'black';
    },
    getVideoList() {
      const url = '/api/home_videos/';
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
      this.videoList = apiResponse.results;
    },
    detailView(selectedVideo) {
      if (selectedVideo.is_paid) {
        this.showAssetModal = true;
        this.selectedVideo = selectedVideo;
        if (this.isWalletConnected) {
          this.getVideoTxData();
        }
      } else {
        const route = this.$router.resolve({
          name: 'Video View',
          params: { slug: selectedVideo.id },
          query: { url: selectedVideo.video.url },
        });
        window.open(route.href, '_blank');
      }
    },
    async buyContent() {
      this.showAssetModal = false;
      this.txType = 'Buy';
      this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
      this.showTransactionModal = true;
      this.currentTxPhase = 'Processing';
      try {
        await this.$store.dispatch(
          'initiateBuy',
          this.videoTxData.exchange_key
        );
        this.isDownloadable = await this.$store.dispatch('getDownloadStatus', {
          dataTokenAddress: this.videoTxData.dataToken,
          accountAddress: this.accountAddress,
        });
        this.showTransactionModal = false;
        // this.detailView(this.selectedVideo);
      } catch (error) {
        if (error.code === 4001) this.currentTxPhase = 'Rejected';
        else this.currentTxPhase = 'Failed';
      }
    },
    async downloadAsset() {
      this.showAssetModal = false;
      this.txType = 'Download';
      this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
      this.showTransactionModal = true;
      this.currentTxPhase = 'Processing';
      try {
        await this.$store.dispatch('startDownload', {
          did: this.videoTxData.dod,
          dta: this.videoTxData.dataToken,
        });
        setTimeout(() => (this.showTransactionModal = false), 2000);
      } catch (error) {
        if (error.code === 4001) this.currentTxPhase = 'Rejected';
        else this.currentTxPhase = 'Failed';
      }
    },
    getVideoTxData() {
      const url = `/transaction/oceanbuy?video_id=${this.selectedVideo.published_id}`;
      this.$vs.loading({
        container: `#buy-download`,
        background: '#fff',
        color: 'primary',
        scale: 0.8,
      });
      this.getRequest(url, this.callBackVideoTxData);
    },
    async callBackVideoTxData(apiResponse) {
      this.videoTxData = apiResponse.data;
      this.dataToken = apiResponse.data.dataToken;
      const price = await this.$store.dispatch(
        'getAssetPrice',
        this.videoTxData.exchange_key
      );
      this.isDownloadable = await this.$store.dispatch('getDownloadStatus', {
        dataTokenAddress: this.videoTxData.dataToken,
        accountAddress: this.accountAddress,
      });
      if (this.isDownloadable) {
        var URL = `/api/video_details?published_id=${this.selectedVideo.published_id}`;
        this.getRequest(URL, this.callBackInfo);
        return;
      }
      this.$vs.loading.close(`#buy-download > .con-vs-loading`);
      this.oceanRequired = price;
    },
    callBackInfo(apiResponse) {
      var myId = JSON.parse(localStorage.getItem('userInfo')).id;
      this.myVideo = myId === apiResponse.data.user;
      this.videoTitle =
        apiResponse.data.title.length > 70
          ? apiResponse.data.title.slice(0, 279) + '...'
          : apiResponse.data.title;
      this.videoDescription =
        apiResponse.data.description.length > 300
          ? apiResponse.data.description.slice(0, 279) + '...'
          : apiResponse.data.description;
      this.$vs.loading.close(`#buy-download > .con-vs-loading`);
    },
  },
};
</script>
<style scoped>
.padding {
  width: 68%;
}

.datatoken-modal {
  display: grid;
  color: black !important;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  text-align: justify;
}

#datatoken {
  font-size: 15px;
  font-weight: 500;
}

.videoTitle {
  margin: 10px 0;
}

.copy {
  cursor: pointer;
}

.helpText {
  font-size: 13px;
  color: grey;
  line-height: 14px;
  padding: 10px;
}
</style>
