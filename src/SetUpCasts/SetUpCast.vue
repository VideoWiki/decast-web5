<template>
  <div>
    <!-- <div v-if="castCreated"></div> -->
    <div class="main-containr">
      <popup
        v-if="status === 'success'"
        :changeStatus="changeStatus"
        :closeCreate="closeCreate"
        :castId="castId"
      />
      <NftWallet
        v-else-if="status == 'drops'"
        :closeDrops="closeCreate"
        :stepOneProps="stepOneProps"
        :nft_details_submitted="nft_details_submitted"
        :valueCheck="valueCheck"
        :castInfo="castInfo"
        :castId="castId"
      />

      <div v-else-if="status === 'create'" class="center-container">
        <div class="heading-part flex">
          <div class="heading">Set up your cast</div>
          <img
            @click="closeCreate"
            src="@/assets/images/create-event/Vector30.svg"
            alt=""
          />
        </div>
        <div class="buttons flex">
          <button
            class="button-1"
            :style="{
              backgroundColor: activeTab === 'Set up' ? '#464775' : '#1F272F',
              color:
                activeTab === 'Set up'
                  ? 'rgba(255, 255, 255, 0.8) '
                  : 'rgba(166, 166, 168, 0.8)',
            }"
            ref="stepone"
            :stepOneProps="stepOneProps"
            @click="activeTab = 'Set up'"
          >
            Set up
          </button>
          <button
            class="button-2"
            :style="{
              backgroundColor: activeTab === 'Branding' ? '#464775' : '#1F272F',
              color:
                activeTab === 'Branding'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(166, 166, 168, 0.8)',
            }"
            :before-change="() => validateFormOne()"
            :stepOneProps="stepOneProps"
            @click="activeTab = 'Branding'"
          >
            Branding
          </button>
          <button
            class="button-3"
            :style="{
              backgroundColor: activeTab === 'Settings' ? '#464775' : '#1F272F',
              color:
                activeTab === 'Settings'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(166, 166, 168, 0.8)',
            }"
            @click="activeTab = 'Settings'"
          >
            Settings
          </button>
          <button
            class="button-4"
            :style="{
              backgroundColor:
                activeTab === 'Streaming' ? '#464775' : '#1F272F',
              color:
                activeTab === 'Streaming'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(166, 166, 168, 0.8)',
            }"
            @click="activeTab = 'Streaming'"
          >
            Streaming
          </button>
        </div>
        <div class="tab-content">
          <SetUpTab
            v-if="activeTab === 'Set up'"
            :changeActiveTab="changeActiveTab"
            :stepOneProps="stepOneProps"
          />
          <BrandingTab
            v-else-if="activeTab === 'Branding'"
            :stepTwoProps="stepTwoProps"
            :changeActiveTab="changeActiveTab"
          />
          <SettingsTab
            v-else-if="activeTab === 'Settings'"
            :createCast="createCast"
            :stepFourProps="stepFourProps"
            :changeActiveTab="changeActiveTab"
          />
          <StreamingTab
            v-else
            :createCast="createCast"
            :changeActiveTab="changeActiveTab"
            :stepFourProps="stepFourProps"
            :stepThreeProps="stepThreeProps"
            :stepTwoProps="stepTwoProps"
            :stepOneProps="stepOneProps"
            :closeCreate="closeCreate"
            :castId="castId"
          />
        </div>
      </div>
      <div v-else-if="status === 'invite'">
        <InviteCard
          :isStream="stepThreeProps.is_streaming"
          :viewer="stepFourProps.viewer_mode"
          :closeInvite="closeCreate"
          :castId="castId"
          :invites="[]"
        />
      </div>
      <div v-else>
        <stream-card
          :stepFourProps="stepFourProps"
          :stepThreeProps="stepThreeProps"
          :stepTwoProps="stepTwoProps"
          :stepOneProps="stepOneProps"
          :closeCreate="closeCreate"
          :castId="castId"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BrandingTab from './Tabs/BrandingTab.vue';
import SettingsTab from './Tabs/SettingsTab.vue';
import SetUpTab from './Tabs/SetUpTab.vue';
import StreamingTab from './Tabs/StreamingTab.vue';
import moment from 'moment';
import Popup from '../views/dashboard/Popup.vue';
import StreamCard from '../views/dashboard/StreamCard.vue';
import InviteCard from '../views/dashboard/InviteCard.vue';
import NftWallet from '../views/dashboard/NFT/NftWallet.vue';
export default {
  name: 'SetUpCast',
  components: {
    BrandingTab,
    SettingsTab,
    SetUpTab,
    StreamingTab,
    Popup,
    StreamCard,
    InviteCard,
    NftWallet,
  },
  props: ['closeCreate', 'getList'],
  data() {
    return {
      activeTab: 'Set up',
      formData: new FormData(),
      status: 'create',
      nft_details_submitted: false,
      castId: '',
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '',
        audienceAirdrop: true,
        give_vc: false,
        airdropType: 'NFTs',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        data_token: false,
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: false, // Changed from the first object's 'true' to the second object's 'false'
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
        nft_t_ype: 'NFTs', // Appears only in the first object, I'll keep it here
        nft_type: 'NFTs', // Appears only in the first object, I'll keep it here
        generated_event_title: '',
        event_name: '',
        invalidTimeError: false,
        moderator_password: '',
        attendee_password: '',
        meeting_type: 'public',
        schedule_time: '',
        description: '',
        max_participant: 100,
        short_description: '',
        hide_users: false,
        event_name_error: false,
        moderator_password_error: false,
        attendee_password_error: false,
        viewer_password_error: false,
        description_error: false,
        description_length_error: false,
        schedule_time_error: false,
        meeting_type_error: false,
        event_name_length_error: false,
        start_now: false,
        startTime: '0:00:00',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZoneList: [],
        event_tag: ['videowiki'],
        startD: moment().format('YYYY-MM-DD'),
      },

      stepTwoProps: {
        BackImageURL: '',
        imageURL: '',
        primary_color: '#D7DF23',
        secondary_color: '',
        logo: '',
        back_image: '',
        cover_image: '',
        cover_image_error: false,
        back_image_error: false,
        banner_text: '',
        moderator_only_text:
          'You are a Moderator, you can control who presents and participates in the live cast',
        guest_policy: '',
        welcome_text: '',
        showText: true,
        duration: '480',
        logout_url: 'https://decast.live/dashboard',
      },
      stepThreeProps: {
        vw_stream: false,
        vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
        is_streaming: false,
        public_stream: true,
      },
      stepFourProps: {
        start_stop_recording: true,
        record: true,
        mute_on_start: true,
        end_when_no_moderator: true,
        allow_moderator_to_unmute_user: false,
        webcam_only_for_moderator: false,
        auto_start_recording: false,
        allow_start_stop_recording: false,
        disable_cam: false,
        disable_mic: false,
        lock_layout: true,
        lock_on_join: false,
        viewer_mode: false,
        viewer_password: false,
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
        checkBox: '',
      },
    };
  },
  mounted() {},
  computed: {
    castInfoList() {
      return this.$store.state.cast.casts;
    },
  },
  methods: {
    validateFormOne() {
      if (
        this.stepOneProps.event_name === '' ||
        this.stepOneProps.description === '' ||
        (this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs' &&
          (this.stepOneProps.mint_function_name === '' ||
            this.stepOneProps.contract_address === '' ||
            this.stepOneProps.aib === '' ||
            this.stepOneProps.nft_description === '' ||
            this.stepOneProps.nft_image === '')) ||
        (this.stepOneProps.auth_type === 'private' &&
          this.stepOneProps.send_otp === false &&
          this.stepOneProps.password_auth === false) ||
        (!this.stepOneProps.start_now &&
          this.stepOneProps.schedule_time_error) ||
        this.stepOneProps.invalidTimeError
      ) {
        this.stepOneProps.event_name_error =
          this.stepOneProps.event_name === '';
        this.stepOneProps.description_error =
          this.stepOneProps.description === '';

        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs'
        ) {
          this.stepOneProps.mintfnc_name_error =
            this.stepOneProps.mint_function_name === '';
          this.stepOneProps.contract_address_error =
            this.stepOneProps.contract_address === '';
          this.stepOneProps.aib_error = this.stepOneProps.aib === '';
          this.stepOneProps.nft_image_error =
            this.stepOneProps.nft_image === '';
          this.stepOneProps.nft_description_error =
            this.stepOneProps.nft_description === '';
        }

        if (
          this.stepOneProps.auth_type === 'private' &&
          this.stepOneProps.send_otp === false &&
          this.stepOneProps.password_auth === false
        ) {
          this.stepOneProps.meeting_auth_error = true;
          // Here, adjust stepOneProps based on the 'private' auth_type
          this.stepOneProps.moderator_password = '';
          // Add more properties to reset as necessary
        }

        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        return false;
      } else {
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        window.scroll(0, 0);
        localStorage.setItem('Step1', JSON.stringify(this.stepOneProps));
        return true;
      }
    },

    changeActiveTab(tab) {
      this.activeTab = tab;
    },
    changeStatus(newStatus) {
      this.status = newStatus;
    },
    createCast() {
      if (this.validateFormOne) {
        // console.log('success validated');
        this.formSubmitted();
      }
    },
    setCreateEventData() {
      // console.log('12');
      this.startNow = this.stepOneProps.start_now;
      for (let [key, value] of Object.entries(this.stepOneProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      // console.log('123');
      this.stepTwoProps.imageURL = '';
      this.stepTwoProps.BackImageURL = '';
      for (let [key, value] of Object.entries(this.stepTwoProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      // console.log('1234');
      for (let [key, value] of Object.entries(this.stepThreeProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      for (let [key, value] of Object.entries(this.stepFourProps)) {
        // console.log(value);

        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
    },
    formSubmitted() {
      // console.log(
      //   this.stepFourProps.record,
      //   this.stepFourProps.start_stop_recording,
      //   this.stepOneProps
      // );
      this.stepFourProps.start_stop_recording = this.stepFourProps.record;
      this.stepFourProps.allow_start_stop_recording = this.stepFourProps.record;
      this.stepOneProps.schedule_time =
        this.stepOneProps.startD + ' ' + this.stepOneProps.startTime;
      if (moment().isAfter(this.stepOneProps.schedule_time)) {
        const fiveMin = moment().add(5, 'minutes');
        this.stepOneProps.schedule_time =
          `${fiveMin._d.getFullYear()}-${String(
            fiveMin._d.getMonth() + 1
          ).padStart(2, '0')}-${String(fiveMin._d.getDate()).padStart(
            2,
            '0'
          )}` +
          ' ' +
          fiveMin._d.getHours() +
          ':' +
          fiveMin._d.getMinutes() +
          ':00';
      }
      this.setCreateEventData();
      this.$vs.loading();
      this.$store
        .dispatch('cast/submitForm', this.formData)
        .then((response) => {
          this.getList();
          this.status = 'success';
          this.$vs.loading.close();
          this.responsedata = response.data.message;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          this.status = 'success';
          this.castId = response.data.meeting_id;
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.formData = new FormData();

          if (error) {
            this.$vs.notify({
              title: 'Error!',
              text: error.response.data.message,
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Fields Missing!',
              text: 'Some Fields are Missing',
              color: 'danger',
            });
          }
        });
    },
    // updateGiveNft(e) {
    //   if (
    //     this.stepOneProps.audienceAirdrop &&
    //     this.stepOneProps.airdropType === 'NFTs' &&
    //     this.stepOneProps.public_stream_nfts === 'false'
    //   ) {
    //     this.stepOneProps.give_nft = true;
    //   } else {
    //     this.stepOneProps.give_nft = false;
    //   }
    // },
    getCertificateInfo() {
      this.$store
        .dispatch('cast/getCertificateInfo', {
          session_key: this.session_key,
        })
        .then((res) => {
          console.log('certificate info getting');
          this.abi = res.data.aib;
        })
        .catch((e) => {
          console.log('certificate info not getting');
          if (e.response.data.message === 'invalid cast_id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/error/404');
          }
          console.log(e);
        });
    },
    castInfo(setRunning) {
      const castInfoList = this.castInfoList;
      if (castInfoList && castInfoList.length > 0) {
        const firstCast = castInfoList[castInfoList.length - 1];
        const payload = firstCast.public_meeting_id;

        this.$store
          .dispatch('auth/eventDetail', payload)
          .then(async (response) => {
            const response_val = await response.data;
            this.expired = response_val.meeting_info.expired;
            this.public_meeting_id =
              response_val.meeting_info.public_meeting_id;
            this.vc_details_submitted =
              response_val.meeting_info.vc_details_submitted;
            this.coverImage = response_val.meeting_info.cover_image;
            this.event_nft_enabled =
              !response_val.meeting_info.pub_nft_flow &&
              response_val.meeting_info.nft_details_submitted;
            this.certificate_enabled =
              response_val.meeting_info.vc_details_submitted;
            this.public_nft_status =
              response_val.meeting_info.public_nft_status;
            this.pub_nft_flow = response_val.meeting_info.pub_nft_flow;
            this.public_stream = response_val.meeting_info.public_stream;
            this.viewer_mode = response_val.meeting_info.viewer_mode;
            this.stream_urls = response_val.meeting_info.stream_urls;
            this.isAirdrop = response_val.meeting_info.airdrop;
            this.stream_live_status = response_val.meeting_info.stream_status;
            this.stepOneProps.public_otp = response_val.meeting_info.public_otp;
            this.stepOneProps.send_otp = response_val.meeting_info.send_otp;
            this.stepOneProps.password_auth =
              response_val.meeting_info.password_auth;
            this.nft_details_submitted =
              response_val.meeting_info.nft_details_submitted;
            this.eventName = response_val.meeting_info.event_name;
            this.eventDescription = response_val.meeting_info.description;
            this.running = response_val.meeting_info.running;
            if (this.certificate_enabled) {
              this.getCertificateInfo();
            }
            if (!setRunning) {
              setTimeout(() => {
                this.castInfo(true);
              }, 5000);
            }
            this.isPublic = !response_val.meeting_info.send_otp;
          })
          .catch((err) => {
            // this.$router.push('/error/404');
            if (err.response.data.message === 'invalid cast id') {
              this.$vs.notify({
                title: 'Invalid Cast ID',
                color: 'danger',
              });
              this.$router.push('/mycasts');
            }
          });
      }
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.center-container {
  margin: 18px;
}

.main-containr {
  max-height: 650px;
  min-width: fit-content;
  overflow: auto;
  /* width: 583px; */
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  transition: max-height 0.5s ease-in-out;
  /* padding: 18px; */
}
.heading-part {
  justify-content: space-between;
}
.heading-part img {
  width: 12px;
  height: 12px;
  color: #647181;
  cursor: pointer;
}
.heading {
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 600;
}
.buttons {
  margin-top: 23px;
}
.buttons button {
  width: 33%;
  height: 40px;
  border: 1px solid #31394e;
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
  background-color: #1f272f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button-1 {
  border-radius: 6px 0px 0px 6px;
}
.button-4 {
  border-radius: 0px 6px 6px 0px;
}
@media (max-width: 500px) {
  .main-containr {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 380px !important;
    overflow-y: scroll;
    max-height: 480px;
  }
  .buttons button {
    width: 90px;
  }
}
</style>
