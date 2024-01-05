<template>
  <div>
    <!-- <div v-if="castCreated"></div> -->
    <div class="main-containr">
      <!-- <popup
        v-if="status === 'success'"
        :changeStatus="changeStatus"
        :closeCreate="closeCreate"
      /> -->
      <div class="center-container">
        <div class="heading-part flex">
          <div class="heading">Set up your cast</div>
          <img
            src="@/assets/images/create-event/Vector30.svg"
            alt=""
            @click="toggleEditCast"
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
            :castId="castId"
          />
          <!-- :closeCreate="closeCreate" -->
        </div>
      </div>
      <!-- <div v-else-if="status === 'invite'">
        <invite-card
          :isStream="stepThreeProps.is_streaming"
          :viewer="stepFourProps.viewer_mode"
          :closeInvite="closeCreate"
          :Id="castId"
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
      </div> -->
    </div>
  </div>
</template>
<script>
import BrandingTab from './Tabs/BrandingTab.vue';
import SettingsTab from './Tabs/SettingsTab.vue';
import SetUpTab from './Tabs/SetUpTab.vue';
import StreamingTab from './Tabs/StreamingTab.vue';
import moment from 'moment';
// import Popup from '../dashboard/Popup.vue';
// import StreamCard from '../dashboard/StreamCard.vue';
// import InviteCard from '../dashboard/InviteCard.vue';
export default {
  name: 'SetUpCast',
  components: {
    BrandingTab,
    SettingsTab,
    SetUpTab,
    StreamingTab,
  },
  props: {
    getCast: {
      type: Function, 
      required: true, 
    },
    cast_id: {
      type: String, // Replace String with the actual type of cast_id
      required: true, // Adjust this based on your requirements
    },
    showEditCast: {
      type: Boolean,
      required: true, // Adjust this based on your requirements
    },
  },
  data() {
    return {
      activeTab: 'Set up',
      formData: new FormData(),
      status: 'create',
      castId: '',
      stepOneProps: {
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
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '4',
        audienceAirdrop: false,
        airdropType: 'NFTs',
        price: '',
        startD: moment().format('YYYY-MM-DD'),
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: false,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
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
  mounted() {
    console.log(this.cast_id, 'iddd');
    this.$store
      .dispatch('cast/editEvent', this.cast_id)
      .then((res) => {
        console.log('Working edit');
        const info = res.data.details;
        console.log("url'", info.bbb_stream_url);
        this.stepOneProps.event_name = info.event_name;
        this.stepOneProps.description = info.description;
        this.stepOneProps.schedule_time = info.schedule_time;
        this.stepOneProps.auth_type = info.cast_type;
        this.stepOneProps.send_otp = info.otp_private;
        this.stepOneProps.password_auth = info.password_auth;
        this.stepTwoProps.logo = info.logo;
        this.stepTwoProps.cover_image = info.cover_image;
        this.stepOneProps.public_otp = info.collect_attendee_email;
        this.stepTwoProps.primary_color = info.primary_color;
        this.stepTwoProps.welcome_text = info.welcome_text;
        this.stepTwoProps.guest_policy = info.guest_policy;
        this.stepTwoProps.moderator_only_text = info.moderator_only_text;
        this.stepTwoProps.duration = info.duration;
        this.stepTwoProps.logout_url = info.logout_url;
        this.stepThreeProps.public_stream = info.public_stream;
        this.stepThreeProps.is_streaming = info.is_streaming;
        // this.stepThreeProps.vw_stream_url = info.bbbstream_url;
        this.stepFourProps.record = info.record;
        this.stepFourProps.end_when_no_moderator = info.end_when_no_moderator;
        this.stepFourProps.allow_moderator_to_unmute_user =
          info.allow_moderator_to_unmute_user;
        this.auto_start_recording = info.auto_start_recording;
        this.stepFourProps.mute_on_start = info.mute_on_start;
        this.stepFourProps.webcam_only_for_moderator =
          info.webcam_only_for_moderator;
        this.stepFourProps.disable_cam = info.disable_cam;
        this.stepFourProps.disable_mic = info.disable_mic;
        this.stepFourProps.lock_layout = info.lock_layout;
        this.stepFourProps.viewer_mode = info.viewer_mode;
        this.stepFourProps.meeting_settings =
          this.stepFourProps.record ||
          this.stepFourProps.end_when_no_moderator ||
          this.stepFourProps.allow_moderator_to_unmute_user ||
          this.auto_start_recording;
        this.stepFourProps.restrict_participants =
          this.stepFourProps.mute_on_start ||
          this.stepFourProps.webcam_only_for_moderator ||
          this.stepFourProps.disable_cam ||
          this.stepFourProps.disable_mic ||
          this.stepFourProps.lock_layout;
        if (info.bbb_stream_url !== null) {
          // eslint-disable-next-line no-eval
          console.log('dsd', eval(info.bbb_stream_url));
          // eslint-disable-next-line no-eval
          window.eval(info.bbb_stream_url).forEach((item) => {
            var x = item.split('/');
            if (item.match(/youtube/)) {
              console.log('dsafgsad', x[-1]);
              this.stepThreeProps.youtube_secret_key = x.pop();
              this.stepThreeProps.youtube_rtmp_url = x.join('/');
              this.stepThreeProps.youtube_stream_url = item;
              this.stepThreeProps.record_youtube = true;
            }
            if (item.match(/video.wiki/)) {
              this.stepThreeProps.vw_stream = true;
            }
            if (item.match(/facebook/)) {
              this.stepThreeProps.facebook_secret_key = x.pop();
              this.stepThreeProps.facebook_rtmp_url = x.join('/');
              this.stepThreeProps.facebook_stream_url = item;
              this.stepThreeProps.record_facebook = true;
            }
            if (item.match(/twitch/)) {
              this.stepThreeProps.twitch_secret_key = x.pop();
              this.stepThreeProps.twitch_rtmp_url = x.join('/');
              this.stepThreeProps.twitch_stream_url = item;
              this.stepThreeProps.record_twich = true;
            }
          });
        }
        if (info.timezone !== '') {
          this.stepOneProps.timezone = info.timezone;
        }
        this.infoGathered = true;
        setTimeout(() => {
          var wizard = this.$refs.wizard;
          wizard.activateAll();
        }, 0);
      })
      .catch((e) => {
        console.log('Error editing', e);
      });
  },
  methods: {
    toggleEditCast() {
      // Instead of mutating the prop directly, emit an event
      this.$emit('updateShowEditCast', false);
    },
    formSubmitted() {
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
      this.$vs.loading();
      var data = new FormData();
      data.append('cast_id', this.cast_id);
      data.append('cast_name', this.stepOneProps.event_name);
      data.append('logo', this.stepTwoProps.logo);
      data.append('cover_image', this.stepTwoProps.cover_image);
      data.append('back_image', this.stepTwoProps.back_image);
      data.append('description', this.stepOneProps.description);
      data.append('cast_type', this.stepOneProps.auth_type);
      data.append(
        'collect_attendee_email',
        this.stepOneProps.public_otp ? 'True' : 'False'
      );
      data.append('schedule_time', this.stepOneProps.schedule_time);
      data.append('timezone', this.stepOneProps.timezone);
      data.append('primary_color', this.stepTwoProps.primary_color);
      data.append('welcome_text', this.stepTwoProps.welcome_text);
      data.append('banner_text', this.stepTwoProps.banner_text);
      data.append('guest_policy', this.stepTwoProps.guest_policy);
      data.append('moderator_only_text', this.stepTwoProps.moderator_only_text);
      data.append('duration', this.stepTwoProps.duration);
      data.append('logout_url', this.stepTwoProps.logout_url);
      data.append(
        'is_streaming',
        this.stepThreeProps.is_streaming ? 'True' : 'False'
      );
      data.append(
        'public_stream',
        this.stepThreeProps.public_stream ? 'True' : 'False'
      );
      data.append('bbb_stream_url', this.stepThreeProps.vw_stream_url);
      data.append('record', this.stepFourProps.record ? 'True' : 'False');
      data.append(
        'end_when_no_moderator',
        this.stepFourProps.end_when_no_moderator ? 'True' : 'False'
      );
      data.append(
        'allow_moderator_to_unmute_user',
        this.stepFourProps.allow_moderator_to_unmute_user ? 'True' : 'False'
      );
      data.append(
        'auto_start_recording',
        this.stepFourProps.auto_start_recording ? 'True' : 'False'
      );
      data.append(
        'mute_on_start',
        this.stepFourProps.mute_on_start ? 'True' : 'False'
      );
      data.append(
        'webcam_only_for_moderator',
        this.stepFourProps.webcam_only_for_moderator ? 'True' : 'False'
      );
      data.append(
        'disable_cam',
        this.stepFourProps.disable_cam ? 'True' : 'False'
      );
      data.append(
        'disable_mic',
        this.stepFourProps.disable_mic ? 'True' : 'False'
      );
      data.append(
        'lock_layout',
        this.stepFourProps.lock_layout ? 'True' : 'False'
      );
      data.append(
        'viewer_mode',
        this.stepFourProps.viewer_mode ? 'True' : 'False'
      );
      data.append('private_otp', this.stepOneProps.send_otp ? 'True' : 'False');
      data.append(
        'password_auth',
        this.stepOneProps.password_auth ? 'True' : 'False'
      );
      this.$store
        .dispatch('cast/formSubmit', data)
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close();
          }, 5000);
          this.getCast();
          console.log('100');
          console.log(this.getCast(), 'this list');
          this.responsedata = response.data.message;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          if (
            this.startNow ||
            (this.startNow === 'True' &&
              response.data &&
              response.data.url !== '')
          ) {
            window.open(`/user_details/${response.data.meeting_id}`, '_blank');
            window.location.href = response.data.url;
          } else this.$router.push('/dashboard');
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.formData = new FormData();
          console.log(JSON.stringify(error));
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
      this.$emit('updateShowEditCast', false);
    },
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
    createCast() {
      if (this.validateFormOne) {
        this.getCast();
        console.log('100');
        console.log(this.getCast(), 'this list');
        console.log('success validated');
        this.formSubmitted();
      }
    },
    setCreateEventData() {
      console.log('12');
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
      console.log('123');
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
      console.log('1234');
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
        console.log(value);

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
