<template>
  <div>
    <div class="eventBanner w-full pt-5 lg:block flex flex-wrap">
      <TheHeader class="headerwidth" />
    </div>
    <div class="container mb-8">
      <a href="" target="_blank" ref="Event" class="hide"></a>
      <div class="form-container">
        <form-wizard
          validate-on-back
          class="createEventForm"
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
          <!-- tab 2 content -->
          <tab-content
            title=""
            class="mb-5"
            :before-change="() => validateFormTwo()"
          >
            <step-2 :stepTwoProps="stepTwoProps" />
          </tab-content>
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
import moment from 'moment';
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import constants from '../../../constant';
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Step1 from '../create-event/stepOne.vue';
import Step2 from '../create-event/stepTwo.vue';
import Step3 from '../create-event/stepThree.vue';
import Step4 from '../create-event/stepFour.vue';
import TheFooter from '@/layouts/components/footer/TheFooter.vue';
export default {
  data() {
    return {
      stepOneProps: {
        generated_event_title: '',
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
        start_now: false,
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
        BackImageURL: '',
        imageURL: '',
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
        duration: '60',
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
  beforeDestroy() {
    document.querySelectorAll('body > div.vs-component').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('body > div.vs-content-sidebar').forEach((el) => {
      el.remove();
    });
  },
  mounted() {
    if (localStorage.getItem('Step1')) {
      this.openConfirm();
    }
    if (localStorage.getItem('Step4')) {
      this.stepFourProps = JSON.parse(localStorage.getItem('Step4'));
    }
  },
  methods: {
    /* *********Function: to preprocess the data and append it to a single object : formData ************* */
    openConfirm() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Continue Editing',
        acceptText: 'Continue',
        text: 'Would you like to Continue Editing the Previous Cast or Start a New One?',
        accept: this.acceptAlert,
        cancel: this.cancelBox,
      });
    },
    cancelBox() {
      this.localStorageRemover();
    },
    acceptAlert(color) {
      this.$vs.notify({
        color: 'success',
        title: 'your data will be filled automatically',
      });
      this.localStorageFiller();
    },
    localStorageRemover() {
      localStorage.removeItem('Step1');
      localStorage.removeItem('Step2');
      if (localStorage.getItem('Step3')) {
        localStorage.removeItem('Step3');
      }
    },
    async backImgFiller() {
      const response = await fetch(this.stepTwoProps.BackImageURL);
      const contentType = response.headers.get('content-type');
      const blob = await response.blob();
      const file = new File([blob], 'coverimage', { type: contentType });
      this.stepTwoProps.back_image = file;
    },
    async localStorageFiller() {
      // Data Is Syncing from here
      this.stepOneProps = JSON.parse(localStorage.getItem('Step1'));
      if (localStorage.getItem('Step2')) {
        this.stepTwoProps = JSON.parse(localStorage.getItem('Step2'));
        this.backImgFiller();
        this.stepTwoProps = JSON.parse(localStorage.getItem('Step2'));

        const response = await fetch(this.stepTwoProps.imageURL);

        const contentType = response.headers.get('content-type');
        const blob = await response.blob();

        const file = new File([blob], 'coverimage', { type: contentType });

        this.stepTwoProps.cover_image = file;
      }

      if (localStorage.getItem('Step3')) {
        this.stepThreeProps = JSON.parse(localStorage.getItem('Step3'));
      }
    },
    setCreateEventData() {
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
      for (let [key, value] of Object.entries(this.stepFiveProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          } else {
            value = JSON.stringify(value);
          }
        }
        this.formData.append(key, value);
      }
    },
    /* *********** Function: Submits the data after preprocessing it  ************************************ */
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
      this.setCreateEventData();
      localStorage.removeItem('Step1');
      localStorage.removeItem('Step2');
      localStorage.removeItem('Step3');
      this.$vs.loading();
      this.$store
        .dispatch('cast/submitForm', this.formData)
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
            this.$refs.Event.setAttribute(
              'href',
              `/user_details/${response.data.meeting_id}`
            );
            this.$refs.Event.click();
            window.location.href = response.data.url;
            // return (this.newWindow.location = `/user_details/${response.data.meeting_id}`);
          } else this.$router.push(`/user_details/${response.data.meeting_id}`);
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
    /* ****** Function: validateForm{FormNo}: Validates the tab data, if true: move forward else display errors ******************* */
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
        }

        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;

        if (this.stepOneProps.invalidTimeError) {
          this.$vs.notify({
            time: 3000,
            title: 'Time Error',
            text: 'Time Should Be In 24 Hours Format',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        } else if (this.stepOneProps.schedule_time_error) {
          this.$vs.notify({
            time: 3000,
            title: 'Time Error',
            text: "Can't create a cast for past",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        } else {
          if(this.stepOneProps.event_name === '' && this.stepOneProps.description !== ''){
           // console.log(this.stepOneProps.generated_event_title ,'its done ')
             this.stepOneProps.event_name = this.stepOneProps.generated_event_title ;
            // return;

          }
          this.$vs.notify({
            time: 3000,
            title: 'Fields Missing!',
            text: 'Please fill the fields which are required.',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        }
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
      }

      localStorage.setItem('Step2', JSON.stringify(this.stepTwoProps));
      window.scroll(0, 0);
      return true;
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
            ? JSON.parse(this.stepThreeProps.vw_stream_url)
            : this.stepThreeProps.vw_stream_url;
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
        localStorage.setItem('Step3', JSON.stringify(this.stepThreeProps));
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
    appendMin(event) {
      const value = event.target.value;
      if (value) {
        event.target.value = value;
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
      setTimeout(() => {
        this.$router.push('/login');
      }, 100);
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

.hide {
  display: none;
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
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
  margin: 0;
}
</style>
