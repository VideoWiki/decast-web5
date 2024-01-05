<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
      <label>Event Name <span class="text-danger">*</span></label>
      <vs-input
        id="eventName"
        :maxlength="70"
        v-model.trim="stepOneProps.event_name"
        class="w-full form-group"
        placeholder="Pick a name that casts a spell"
        v-on:change="valueCheck()"
        @keyup="valueCheck()"
      />
      <span
        class="text-danger text-sm mt-1"
        v-show="stepOneProps.event_name_error"
        >Event Name field is required</span
      >
      <span
        class="text-danger text-sm mt-1"
        v-show="stepOneProps.event_name_length_error"
        >Event Name Should be less then 70 and greater than 1 Character
      </span>
    </div>
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
      <label>Description <span class="text-danger">*</span></label>
      <vs-textarea
        id="description"
        :maxlength="410"
        v-model.trim="stepOneProps.description"
        class="mb-0 form-group"
        rows="3"
        placeholder="Event Description"
       
      />
      <span
        class="text-danger text-sm mt-1"
        v-show="stepOneProps.description_error"
        >Description field is required</span
      >
      <span
        class="text-danger text-sm mt-1"
        v-show="stepOneProps.description_length_error"
        >Description should not exceed 410 Character
      </span>
   
      <div class=" flex items-center justify-between">
          <vs-button
            type=""
            @click="generateText(stepOneProps.description)"
            class="p-2 m-4 ml-10 justify-items-end hover:bg-primary hoverEffect"
            :style="{ color: hover ? 'white' : 'black' }"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
              <div class="justify-content text-center inline-flex">
                  <span class="flex">
                    <img src="../../../public/openai.svg" class="h-5" />
                  </span>
                  <span
                    class="flex self-center content-center justify-content-center ml-2"
                  >
                    <p
                      class="self-center align-center text-sm"
                      style="text-align: center"
                    >
                      Generate Text
                    </p>
                  </span>
                </div>
          </vs-button>
          <vs-button
              v-if="generating"
              type=""
              @click="stopGenerating"
              class="p-2 m-4 ml-10 justify-items-center hover:bg-grey hoverEffect"
              style="color: black;" 
              >
              <div class="justify-content text-center inline-flex">
                <span
                  class="flex self-center content-center justify-content-center ml-2"
                >
                  <p
                  class="self-center align-center text-sm"
                  style="text-align: end"
                  >
                    Stop Generating
                  </p>
                </span>
              </div>
          </vs-button>
       </div>
    </div>


    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">Access Restrictions</label>
        </div>
        <hr v-if="stepOneProps.public_auth" class="w-full mt-5 border-light" />
        <div v-if="stepOneProps.public_auth" class="vx-row w-full mt-5">
          <div
            class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap items-center justify-center"
          >
            <vs-chip class="p-1">
              <vs-radio
                v-model="stepOneProps.auth_type"
                :class="[
                  stepOneProps.auth_type == 'public'
                    ? 'dual-toggle-active'
                    : '',
                  'dual-toggle',
                  '-m-2',
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]"
                vs-value="public"
                v-on:change="publicAccess()"
              >
                <span class="flex flex-wrap">
                  Public &nbsp;

                  <span></span>
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-info"
                    size="12px"
                    rounded="true"
                    style="align-self: flex-end"
                    content="Anyone with the event invitation link can join the event, with or without authentication. Choose to collect attendee emails or leave the event accessible to any viewer."
                    v-tippy="{ placement: 'top', arrow: true }"
                  ></vs-icon>
                </span>
              </vs-radio>

              <vs-radio
                v-model="stepOneProps.auth_type"
                :class="[
                  stepOneProps.auth_type == 'private'
                    ? 'dual-toggle-active'
                    : '',
                  'dual-toggle',
                  'm-0',
                  'mr-1',
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]"
                v-on:change="publicAccess()"
                vs-value="private"
              >
                <span class="flex flex-wrap">
                  Private &nbsp;

                  <span></span>
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-info"
                    size="12px"
                    rounded="true"
                    style="align-self: flex-end"
                    content="Allow invited participants only to join the event, through verification. You will be able to manage the attendee list in the audience dashboard."
                    v-tippy="{ placement: 'top', arrow: true }"
                  ></vs-icon>
                </span>
              </vs-radio>
            </vs-chip>
          </div>
        </div>

        <div
          v-if="stepOneProps.public_auth && stepOneProps.auth_type == 'public'"
          class="vx-row w-full mt-5 p-2"
        >
          <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
            <div class="flex flex-wrap w-full form-group items-center">
              <label class="m-0">
                <span class="flex flex-wrap">
                  Collect Attendee Emails
                  <div>
                    &nbsp;

                    <span></span>
                    <vs-icon
                      content="Users can join by entering their email, which gets collected in audience management dashboard."
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-info"
                      size="12px"
                      rounded="true"
                      style="align-self: flex-end"
                    ></vs-icon>
                  </div>
                </span>
              </label>

              <div>
                <vs-switch
                  v-model="stepOneProps.public_otp"
                  v-on:change="switchingOffPublicOtp()"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="stepOneProps.public_auth && stepOneProps.auth_type == 'private'"
          class="vx-row w-full mt-5 p-2"
        >
         
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <label class="m-0">One Time Password(OTP)</label>
                <div>
                  <vs-switch
                    v-model="stepOneProps.send_otp"
                    :disabled="
                      stepOneProps.password_auth || stepOneProps.public_otp
                    "
                    v-on:change="switchOffPrivateOtp()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span
        class="text-danger text-sm mt-1"
        v-show="stepOneProps.meeting_auth_error"
        >If you are choosing private meeting type then please select either OTP
        or password verification.</span
      >
    </div>

    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">Start Now</label>
          <div>
            <vs-switch v-model="stepOneProps.start_now" />
          </div>
        </div>
        <hr v-if="!stepOneProps.start_now" class="w-full mt-5 border-light" />
        <div
          v-if="!stepOneProps.start_now"
          class="flex flex-wrap mt-5 w-full form-group items-center"
        >
          <label class="m-0">Schedule </label>
        </div>
        <div
          v-if="!stepOneProps.start_now"
          class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group"
        >
          <label>Start time</label>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full flex flex-wrap">
              <vs-input
                v-model.number="startH"
                type="number"
                color="warning"
                :min="0"
                :max="23"
                @change="setDate()"
                @keyup="setDate()"
                id="startHour"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full flex flex-wrap">
              <vs-input
                v-model.number="startM"
                type="number"
                color="warning"
                :maxlength="2"
                :min="-1"
                :max="59"
                @change="setDate()"
                @keyup="setDate()"
                id="startMinute"
              />
            </div>
          </div>
        </div>

        <div
          v-if="!stepOneProps.start_now"
          class="vx-col md:w-1/3 w-full mt-5 px-2 flex flex-wrap form-group"
        >

        <vs-select
            autocomplete
            class="selectType w-full dropdown timezone-select"
            label="Time Zone"
            v-model="stepOneProps.timezone"
            @change="setDate()"
          >
           <vs-optgroup label="Most Used Timezone">
              <label>Most Used Timezone</label>
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in mostUsedTimezone"
              ></vs-select-item>
            </vs-optgroup> 
            <vs-optgroup >
              <label>All Timezones</label>
              <vs-select-item
                :key="index"
                :value="allTimeZoneData.value"
                :text="allTimeZoneData.label"
                
                v-for="(allTimeZoneData, index) in allTimeZone"
              >
                {{ allTimeZoneData.value }}
              </vs-select-item>
            </vs-optgroup>
        </vs-select>

           
        </div>
        <div
          v-if="!stepOneProps.start_now"
          class="vx-col md:w-1/3 w-full mt-5 form-group"
        >
          <label>Date</label>
          <datepicker
            id="startDate"
            v-model="startD"
            format="yyyy-MM-dd"
            @closed="setDate()"
            :disabledDates="disabledDates"
            placeholder="Please Select Event Date"
            v-on:change="valueCheck()"
          ></datepicker>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import constants from '../../../constant';
import axios from '../../axios';
import moment from 'moment-timezone';
import allTimeZone from './allTimeZone';
import { required } from 'vuelidate/lib/validators';
import Vue from 'vue';
import VueTippy, { TippyComponent } from 'vue-tippy';
import { get } from 'http';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);
export default {
  name: '',
  props: ['stepOneProps'],
  components: {
    Datepicker,
    moment,
  },
  data() {
    return {
      
      generating: false,
      advanceOpts: false,
      meetingopt: 2,
      startH: 0,
      startM: 0,
      startD: 0,
      hover: false,
      selectedNetwork: {
        text: 'Rinkeby',
        value: '4',
        image: require('../../assets/images/create-event/rinkeby.png'),
      },
      network: [
        {
          text: 'Ethereum',
          value: '1',
          image: require('../../assets/images/create-event/ethereum.png'),
        },
        {
          text: 'Rinkeby',
          value: '4',
          image: require('../../assets/images/create-event/rinkeby.png'),
        },
        {
          text: 'Gnosis',
          value: '100',
          image: require('../../assets/images/create-event/gnosis.svg'),
        },
        {
          text: 'Polygon',
          value: '137',
          image: require('../../assets/images/create-event/polygon.png'),
        },
        {
          text: 'Telos',
          value: '64',
          image: require('../../assets/images/create-event/telos.png'),
        },
      ],
      mostUsedTimezone: [
        { text: 'Asia/Calcutta', value: 'Asia/Kolkata' },
        { text: 'Europe/Lisbon', value: 'Europe/Lisbon' },
        { text: 'GMT', value: 'GMT' },
      ],

      allTimeZone,
      disabledDates: {
        to: moment().subtract(1, 'days').toDate(),
      },
    };
  },
  validations: {
    event_name: { required },
    duration: { required },
  },
  mounted() {
    const FiveMinutesAfter = moment().add(10, 'minutes');
    moment.tz.setDefault('UTC');
    this.startD = `${FiveMinutesAfter._d.getFullYear()}-${String(
      FiveMinutesAfter._d.getMonth() + 1
    ).padStart(2, '0')}-${String(FiveMinutesAfter._d.getDate()).padStart(
      2,
      '0'
    )}`;
    this.startH = FiveMinutesAfter._d.getHours();

    this.startM = FiveMinutesAfter._d.getMinutes();

    this.setDate();
  },
  watch: {
    'stepOneProps.schedule_time'(val) {
      if (this.stepOneProps.schedule_time !== '') {
        const d = new Date(val);
        this.startH = d.getHours();
        this.startM = d.getMinutes();
        this.startD = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(d.getDate()).padStart(2, '0')}`;
      }
    },

  'stepOneProps.description'(val){
      if(val !== ''  && (this.stepOneProps.event_name === '')){
         this.generateTitle(this.stepOneProps.description);
      }
    }, 

    startH(cur) {
      if (cur > 23) {
        this.startH = 23;
      }
    },
    startM(cur) {
      if (cur > 59) {
        this.startM = 59;
      }
    },
  },
  methods: {
    stopGenerating() {
      this.generating = !this.generating;
    },
  
    printChar(data) {
     const script = '';
     const subString = data;
     let i = 0;
     let actualStr = `${script} `;
     const setInter = setInterval(() => {
      if (this.generating === false) {
        return;
      }
      actualStr += subString.slice(i, i + 5);
      this.stepOneProps.description = actualStr;
      i += 5;
      if (actualStr.length > subString.length + script.length) {
        clearInterval(setInter);
        this.generating = false;
        return;
       }
      }, 200);

    },
    getText(text) {
        const data = JSON.stringify({
          prompt: text,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          model: 'text-davinci-003',
        });
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.openai.com/v1/completions',
          headers: {
            Authorization: 'Bearer ' + constants.apiKey,
            'Content-Type': 'application/json',
          },
          data: data,
        };

        return new Promise((resolve, reject) => {
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              console.log('this is response', response.data.choices[0].text);
              const n = response.data.choices[0].text.charAt(0);
              console.log('F Char', n);
              resolve(response);
              this.$vs.loading.close();
              const data = response.data.choices[0].text.trim();
              this.printChar(data);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
          });
     },

      generateText(text) {
          if (text.length !== 0) {
            this.$vs.loading();
            this.maxChars = 100;
            this.generating = true;
            this.textgenerated = true;
            this.getText(text);
        } else {
          if (this.clicked) {
            return;
          }
          this.clicked = true;
          this.$vs.notify({
            title: 'Error',
            text: "Script can't be empty ",
            iconPack: 'feather',
            color: 'danger',
          });
          setTimeout(() => {
            this.clicked = false;
          }, 2900);
        }
      },
  


     generateTitle(text) {
        const data = JSON.stringify({
          prompt: text + '\n suggest an appropriate title to the above text',
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          model: 'text-davinci-003',
        });

        console.log(text);

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.openai.com/v1/completions',
          headers: {
            Authorization: 'Bearer ' + constants.apiKey,
            'Content-Type': 'application/json',
          },
          data: data
        };

        return new Promise((resolve, reject) => {
          axios(config)
            .then( (response)=> {
              console.log(JSON.stringify(response.data));
            
              const generatedTitle = response.data.choices[0].text.trim();
              console.log('Generated Title:', generatedTitle);
              resolve(generatedTitle);
              this.stepOneProps.generated_event_title = generatedTitle;

            })
            .catch(function (error) {
              reject(error);
              console.log(error);
            });
        });
     },
    

    publicAccess() {
      if (this.stepOneProps.auth_type === 'private') {
        this.stepOneProps.public_otp = false;
        this.stepOneProps.send_otp = true;
      } else {
        this.stepOneProps.send_otp = false;
        this.stepOneProps.password_auth = false;
      }
    },
    noAuth() {
      if (!this.stepOneProps.public_auth) {
        this.stepOneProps.public_otp = false;
        this.stepOneProps.send_otp = false;
        this.stepOneProps.password_auth = false;
        this.typeOfNft();
      }
    },
    setDate(e) {
      this.startD = moment.utc(this.startD).format('YYYY-MM-DD');
      this.stepOneProps.schedule_time =
        this.startD + ' ' + this.startH + ':' + this.startM + ':00';
      // this.stepOneProps.invalidTimeError = this.startH > 23 || this.startM > 59;
      this.stepOneProps.schedule_time_error = moment().isAfter(
        moment.tz(this.stepOneProps.schedule_time, this.stepOneProps.timezone)
      );
    },
    switchingOffPublicOtp(e) {
      if (!this.stepOneProps.public_otp) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs' &&
          this.stepOneProps.public_stream_nfts === 'false'
        ) {
          this.stepOneProps.public_stream_nfts = 'true';
          this.stepOneProps.give_nft = false;
          this.$vs.notify({
            time: 6000,
            title: 'Private distribution of NFTs has been disabled',
            text: ' Private Stream is only available for Public: collect Emails and Private: OTP flow',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
          });
        }
      }
    },
    switchOnPassword(e) {
      if (this.stepOneProps.password_auth) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs' &&
          this.stepOneProps.public_stream_nfts === 'false'
        ) {
          this.stepOneProps.give_nft = false;
          this.stepOneProps.public_stream_nfts = 'true';
          this.$vs.notify({
            time: 6000,
            title: 'Private distribution of NFTs has been disabled',
            text: ' Private Stream is only available for Public: collect Emails and Private: OTP flow',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
          });
        }
        if (this.stepOneProps.meeting_auth_error)
          this.stepOneProps.meeting_auth_error = false;
      }
    },
    switchOffPrivateOtp(e) {
      if (!this.stepOneProps.send_otp) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs' &&
          this.stepOneProps.public_stream_nfts === 'false'
        ) {
          this.stepOneProps.give_nft = false;
          this.stepOneProps.public_stream_nfts = 'true';
          this.$vs.notify({
            time: 6000,
            title: 'Private distribution of NFTs has been disabled',
            text: ' Private Stream is only available for Public: collect Emails and Private: OTP flow',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
          });
        }
        this.stepOneProps.auth_type = 'public';
      } else {
        if (this.stepOneProps.meeting_auth_error)
          this.stepOneProps.meeting_auth_error = false;
      }
    },
    typeOfNft(e) {
      if (this.stepOneProps.public_stream_nfts === 'true') {
        this.stepOneProps.give_nft = false;
      } else if (this.stepOneProps.public_stream_nfts === 'false') {
        if (
          this.stepOneProps.public_auth === false ||
          (this.stepOneProps.public_otp === false &&
            this.stepOneProps.send_otp === false)
        ) {
          this.stepOneProps.public_stream_nfts = 'true';
          this.stepOneProps.give_nft = false;
          this.$vs.notify({
            time: 6000,
            title: 'Access Restriction required',
            text: 'You need to either collect attendee emails or stream the cast privately with OTP verification, for enabling NFTs',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
          });
        } else {
          this.stepOneProps.give_nft = true;
        }
      }
    },
    valueCheck(e) {
      if (this.meetingopt === 'public' || this.meetingopt === 'private') {
        this.stepOneProps.meeting_type = this.meetingopt;
        this.stepOneProps.meeting_type_error = false;
      }
     if (
        this.stepOneProps.event_name.length > 1 &&
        this.stepOneProps.event_name.length < 70
      ) {
        this.stepOneProps.event_name_error = false;
        this.stepOneProps.event_name_length_error = false;
      } else if (
        this.stepOneProps.event_name.length >= 70 ||
        this.stepOneProps.event_name.length === 1
      ) {
        this.stepOneProps.event_name_length_error = true;
      }
      if (
        this.stepOneProps.description.length > 0 &&
        this.stepOneProps.description.length <= 409
      ) {
        this.stepOneProps.description_error = false;
        this.stepOneProps.description_length_error = false;
      } else if (this.stepOneProps.description.length >= 409) {
        this.stepOneProps.description_length_error = true;
      }
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs'
      ) {
        if (this.stepOneProps.mint_function_name.length === 0)
          this.stepOneProps.mintfnc_name_error = true;
        else this.stepOneProps.mintfnc_name_error = false;

        if (this.stepOneProps.contract_address.length === 0)
          this.stepOneProps.contract_address_error = true;
        else this.stepOneProps.contract_address_error = false;

        if (this.stepOneProps.aib.length === 0)
          this.stepOneProps.aib_error = true;
        else this.stepOneProps.aib_error = false;

        if (this.stepOneProps.nft_description.length === 0)
          this.stepOneProps.nft_description_error = true;
        else this.stepOneProps.nft_description_error = false;

        if (this.stepOneProps.nft_image === '')
          this.stepOneProps.nft_image_error = true;
        else this.stepOneProps.nft_image_error = false;
      }
    },
  },
};
</script>
<style>
.dual-toggle .vs-radio--borde {
  border: 2px solid transparent !important;
}
.dual-toggle .vs-radio--input:disabled + .vs-radio {
  opacity: 0;
}
.formgroup-label {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  text-transform: capitalize;
  padding-left: 5px;
}
.custom-select {
  position: relative;
}
.custom-select .vs-collapse-item--header {
  padding: 0.7rem !important;
  border-radius: 6px;
  font-size: 1rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fbfbfc;
}

.custom-select .vs-collapse-item--content {
  position: absolute;
  width: calc(100% - 20px);
  z-index: 9999;
  background: #ffffff;
}

.custom-select .con-content--item {
  padding: 1rem 0rem 0rem 0.2rem !important;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.custom-select .con-content--item div div {
  padding: 2px;
  border-radius: 1px;
}
.custom-select-item-hover:hover {
  background-color: #8d56f83a;
}

.timezone-select {
  padding: 0.6rem;
}
</style>
