<template>
  <div v-if="infoGathered">
    <div class="eventBanner w-full pt-5 lg:block flex flex-wrap">
      <TheHeader class="headerwidth" />
    </div>
    <div class="container mb-8">
      <div class="form-container">
        <form-wizard
          validate-on-back
          class="createEventForm"
          ref="wizard"
          color="rgba(var(--vs-primary), 1)"
          :title="null"
          finishButtonText="Submit"
          @on-complete="formSubmitted"
        >
          <!-- tab 1 content -->
          <tab-content
            title=""
            class="mb-5"
            :before-change="() => validateFormOne()"
          >
            <step-1 ref="stepone" :stepOneProps="stepOneProps" />
          </tab-content>
          <tab-content
            title=""
            class="mb-5"
            :before-change="() => validateFormTwo()"
          >
            <step-2 :stepTwoProps="stepTwoProps" />
          </tab-content>
          <!-- tab 2 content -->
          <!-- tab 3 content -->
          <tab-content
            title=""
            class="mb-5"
            :before-change="() => validateFormThree()"
          >
            <step-3 :stepThreeProps="stepThreeProps" />
          </tab-content>
          <!-- tab 4 content -->
          <tab-content title="" class="mb-5">
            <step-4
              :stepFourProps="stepFourProps"
              :stepOneProps="stepOneProps"
            />
          </tab-content>
        </form-wizard>
      </div>
    </div>
    <div id="loading-bg" v-if="loading">
      <div class="loading">
        <div class="effect-1 effects"></div>
        <div class="effect-2 effects"></div>
        <div class="effect-3 effects"></div>
      </div>
    </div>
    <div class="blackcolor">
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import constants from '../../../constant';
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Step1 from './stepOne.vue';
import moment from 'moment';
import Step2 from './stepTwo.vue';
import Step3 from './stepThree.vue';
import Step4 from './stepFour.vue';
import TheFooter from '@/layouts/components/footer/TheFooter.vue';
export default {
  data() {
    return {
      infoGathered: false,
      stepOneProps: {
        event_name: '',
        invalidTimeError: false,
        moderator_password: '',
        attendee_password: '',
        meeting_type: '',
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
        start_now: '',
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
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
      },

      stepTwoProps: {
        primary_color: '#753FB5',
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
        duration: 0,
        logout_url: 'https://cast.video.wiki/postCast',
      },
      stepThreeProps: {
        record_facebook: false,
        record_youtube: false,
        record_twich: false,
        facebook_rtmp_url: '',
        facebook_secret_key: '',
        twich__rtmp_url: '',
        twicth_secret_key: '',
        facebook_stream_url: '',
        facebook_url2: '',
        youtube_rtmp_url: '',
        youtube_secret_key: '',
        youtube_stream_url: '',
        twitch_stream_url: '',
        vw_stream: false,
        vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
        is_streaming: false,
        public_stream: false,
        stream_type_error: false,
      },
      stepFourProps: {
        record: '',
        mute_on_start: '',
        end_when_no_moderator: '',
        allow_moderator_to_unmute_user: '',
        webcam_only_for_moderator: '',
        auto_start_recording: '',
        allow_start_stop_recording: '',
        disable_cam: '',
        disable_mic: '',
        lock_layout: '',
        lock_on_join: '',
        viewer_mode: '',
        viewer_password: '',
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
      },
      stepFiveProps: {
        name: '',
        email: '',
        invitee_details_error: false,
        invitee_details: [],
      },

      statusOptions: [
        { text: 'Ask Moderator', value: 'ask_moderator' },
        { text: 'Allow Without Asking', value: 'without_asking' },
      ],
      onPageExtraProps: {
        copyright: '',
        breakout_room: '',
        free_join: '',
        breakout_room_enabled: '',
        breakout_room_record: '',
        breakout_room_private_chat_enabled: '',
        duplicate_user: '',
        message: '',
        city: 'new-york',
        proposalTitle: '',
        jobTitle: '',
        textarea: '',
        eventName: '',
        eventLocation: 'san-francisco',
        status: 'plannning',
        response: '',
        LocationOptions: [
          { text: 'New York', value: 'new-york' },
          { text: 'Chicago', value: 'chicago' },
          { text: 'San Francisco', value: 'san-francisco' },
          { text: 'Boston', value: 'boston' },
        ],
      },
      onFileExtraProps: {
        hide_users: true,
        short_description: '',
        max_participant: '',
      },
      format: 'd MMMM yyyy',
      responsedata: {},
      formData: new FormData(),
      loading: false,
      startNow: false,
    };
  },
  mounted() {
    if (moment().isAfter(this.stepOneProps.schedule_time)) {
      const fiveMin = moment().add(5, 'minutes');
      this.stepOneProps.schedule_time =
        `${fiveMin._d.getFullYear()}-${String(
          fiveMin._d.getMonth() + 1
        ).padStart(2, '0')}-${String(fiveMin._d.getDate()).padStart(2, '0')}` +
        ' ' +
        fiveMin._d.getHours() +
        ':' +
        fiveMin._d.getMinutes() +
        ':00';
      console.log(this.stepOneProps.schedule_time);
    }
    if (this.$route.params.cast_Id === 'vw.svg') {
      return;
    }
    this.$store
      .dispatch('cast/editEvent', this.$route.params.cast_Id)
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
        //this.stepThreeProps.vw_stream_url = info.bbbstream_url;
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
        // wizard.activateAll();
      })
      .catch((e) => {
        console.log('Error editing', e);
      });
  },
  methods: {
    /* *********Function: to preprocess the data and append it to a single object : formData ************* */
    /* ***********Function: Submits the data after preprocessing it  ************************************ */
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
      data.append('cast_id', this.$route.params.cast_Id);
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
          } else this.$router.push('/mycasts');
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
    },
    /* ****** Function: validateForm{FormNo}: Validates the tab data, if true: move forward else display errors ******************* */
    validateFormOne() {
      if (moment().isAfter(this.stepOneProps.schedule_time)) {
        console.log('CERO');
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
        console.log(this.stepOneProps.schedule_time);
      }
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
          !this.stepOneProps.send_otp &&
          !this.stepOneProps.password_auth)
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
          !this.stepOneProps.send_otp &&
          !this.stepOneProps.password_auth
        ) {
          this.stepOneProps.meeting_auth_error = true;
        }

        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        console.log(this.stepOneProps.schedule_time);
        console.log(
          this.stepOneProps.schedule_time_error,
          this.stepOneProps.invalidTimeError
        );
        this.$vs.notify({
          time: 3000,
          title: 'Fields Missing!',
          text: 'Please fill the fields which are required.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });

        return false;
      } else {
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        window.scroll(0, 0);
        return true;
      }
    },
    validateFormTwo() {
      if (this.stepTwoProps.cover_image === '') {
        this.stepTwoProps.cover_image_error = true;
        this.$vs.notify({
          time: 3000,
          title: 'Fields Missing!',
          text: 'Please select a cover image for the cast',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        return false;
      } else {
        window.scroll(0, 0);
        return true;
      }
    },
    validateFormThree() {
      if (
        this.stepThreeProps.vw_stream === true &&
        this.stepThreeProps.public_stream === ''
      ) {
        this.stepThreeProps.stream_type_error = true;
        this.$vs.notify({
          time: 3000,
          title: 'Fields Missing!',
          text: 'Please fill the fields which are required.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        return false;
      } else {
        this.stepThreeProps.vw_stream_url =
          typeof this.stepThreeProps.vw_stream_url === 'string'
            ? // eslint-disable-next-line no-eval
              eval(this.stepThreeProps.vw_stream_url)
            : this.stepThreeProps.vw_stream_url;
        console.log(this.stepThreeProps.vw_stream_url);
        this.stepThreeProps.vw_stream_url[0].vw_stream = this.stepThreeProps
          .vw_stream
          ? 'True'
          : 'False';
        this.stepThreeProps.vw_stream_url[1].urls = [];
        if (this.stepThreeProps.youtube_stream_url !== '') {
          this.stepThreeProps.vw_stream_url[1].urls.push(
            this.stepThreeProps.youtube_stream_url
          );
        }
        if (this.stepThreeProps.facebook_stream_url !== '') {
          this.stepThreeProps.vw_stream_url[1].urls.push(
            this.stepThreeProps.facebook_stream_url
          );
        }
        if (this.stepThreeProps.twitch_stream_url !== '') {
          this.stepThreeProps.vw_stream_url[1].urls.push(
            this.stepThreeProps.twitch_stream_url
          );
        }
        this.stepThreeProps.vw_stream_url = JSON.stringify(
          this.stepThreeProps.vw_stream_url
        );
        window.scroll(0, 0);
        return true;
      }
    },
    validateFormFour() {},
    validateFormFive() {
      if (this.stepFiveProps.invitee_details.length < 1) {
        this.stepFiveProps.invitee_details_error = true;
        this.$vs.notify({
          time: 3000,
          title: 'Fields Missing!',
          text: 'Please fill the fields which are required.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        return false;
      } else {
        window.scroll(0, 0);
        return true;
      }
    },
  },
  components: {
    TheHeader,
    TheFooter,
    FormWizard,
    TabContent,
    Step1,
    Step2,
    Step3,
    Step4,
  },
  computed: {
    usersData() {
      return this.$store.state.AppActiveUser;
    },
  },
  created() {
    if (this.$store.state.AppActiveUser.username.length > 0) {
    } else {
      this.$vs.notify({
        title: 'Login Error',
        text: 'Login with a Email to create a cast',
        color: 'warning',
        time: 4000,
      });
      this.$router.push('/login');
    }
  },
};
</script>

<style>
.eventBanner {
  background: rgb(115, 103, 240);
  background-image: url('../../assets/images/landing-page/Frame1.png');
  height: 350px;
  position: relative;
  top: 0px;
}

.form-container {
  position: relative;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -106px;
  background: rgba(255, 255, 255, 1);
}

.createEventForm .wizard-progress-with-circle {
  position: absolute !important;
  top: 50px !important;
  height: 4px;
  left: 0px;
  right: 0px;
}
.createEventForm > .wizard-header {
  position: relative;
  visibility: hidden;
  display: none;
}
.vue-form-wizard .wizard-nav-pills {
  margin-top: 0px;
  text-align: center;
  padding: 21px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50%;
}
.form-group {
  justify-content: space-between;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 13px;
  font-size: 16px;
  display: inline-block;
  padding-left: 5px;
  text-transform: capitalize;
}
.form-group input {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  font-weight: 500;
}
.form-group > h4 {
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
}
.headerwidth {
  width: 100%;
}
.dual-toggle {
  cursor: pointer;
  font-size: 16px;
}
.dual-toggle-active {
  background-color: rgb(115, 103, 240);
  color: #ebedf0;
  border-radius: 20px;
}
</style>
