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
        >Event Name should not exceed 70 Character
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
        v-on:change="valueCheck()"
        @keyup="valueCheck()"
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
    </div>

    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">Access Restrictions</label>
          <div>
            <vs-switch
              v-model="stepOneProps.public_auth"
              v-on:change="noAuth()"
            />
          </div>
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
                  'm-0',
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]"
                vs-value="public"
                v-on:change="publicAccess()"
              >
                <span class="flex flex-wrap">
                  Public &nbsp;
                  <tippy
                    content="Anyone with the event invitation link can join the event, with or without authentication. Choose to collect attendee emails or leave the event accessible to any viewer."
                    v-tippy="{ placement: 'top', arrow: true }"
                  >
                    <span></span>
                    <vs-icon
                      icon-pack="feather"
                      icon="icon-info"
                      size="12px"
                      rounded="true"
                      style="align-self: flex-end"
                    ></vs-icon
                  ></tippy>
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
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]"
                v-on:change="publicAccess()"
                vs-value="private"
              >
                <span class="flex flex-wrap">
                  Private &nbsp;
                  <tippy
                    content="Allow invited participants only to join the event, through verification. You will be able to manage the attendee list in the audience dashboard."
                    v-tippy="{ placement: 'top', arrow: true }"
                  >
                    <span></span>
                    <vs-icon
                      icon-pack="feather"
                      icon="icon-info"
                      size="12px"
                      rounded="true"
                      style="align-self: flex-end"
                    ></vs-icon
                  ></tippy>
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
                  Collect Attendee Emails &nbsp;
                  <tippy
                    text="Users can join by entering their email, which gets collected in audience management dashboard."
                    v-tippy="{ placement: 'top', arrow: true }"
                  >
                    <span></span>
                    <vs-icon
                      icon-pack="feather"
                      icon="icon-info"
                      size="12px"
                      rounded="true"
                      style="align-self: flex-end"
                    ></vs-icon
                  ></tippy>
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
          <!-- <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <label class="m-0">Password Protected</label>
                <div>
                  <vs-switch
                    v-model="stepOneProps.password_auth"
                    :disabled="stepOneProps.send_otp || stepOneProps.public_otp"
                    v-on:change="switchOnPassword()"
                  />
                </div>
              </div>
              <hr
                v-if="stepOneProps.password_auth"
                class="w-full mt-5 border-light"
              />
              <div
                v-if="stepOneProps.password_auth"
                class="vx-row mt-5 w-full no-gutter"
              >
                <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap p-1">
                  <vs-input
                    id="moderatorPass"
                    type="password"
                    label="Co-Host/Moderator Password"
                    v-model="stepOneProps.moderator_password"
                    class="w-full form-group"
                    placeholder="You can keep a co-host/moderator password empty"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.moderator_password_error"
                    >Co-Host / Moderator Password field is required</span
                  >
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap p-1">
                  <vs-input
                    id="attendeePass"
                    type="password"
                    label="Participant Password"
                    v-model="stepOneProps.attendee_password"
                    class="w-full form-group"
                    placeholder="You can skip a Participant password as an empty"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.attendee_password_error"
                    >Attendee Password field is required</span
                  >
                </div>
              </div>
            </div>
          </div> -->
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
          <label class="m-0">Schedule </label>
        </div>
        <div class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group">
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
                :min="0"
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
          <label>Time Zone</label>
          <select
            class="selectType w-full dropdown timezone-select"
            v-model="stepOneProps.timezone"
            @change="setDate()"
          >
            <optgroup label="Most Used Timezone">
              <option value="Asia/Kolkata" class="mt-4">Asia/Calcutta</option>
              <option value="Europe/Lisbon">Europe/Lisbon</option>
              <option value="GMT" class="mb-4">GMT</option>
            </optgroup>
            <optgroup label="All Timezones">
              <option
                :key="index"
                v-for="(allTimeZoneData, index) in allTimeZone"
                :value="allTimeZoneData.value"
              >
                {{ allTimeZoneData.value }}
              </option>
            </optgroup>
          </select>
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
import moment from 'moment';
import { required } from 'vuelidate/lib/validators';
import allTimeZone from '../create-event/allTimeZone';
import { tippy } from 'vue-tippy';
export default {
  name: '',
  props: ['stepOneProps'],
  components: {
    Datepicker,
    tippy,
  },
  data() {
    return {
      advanceOpts: false,
      meetingopt: 2,
      startH: 0,
      startM: 0,
      startD: this.tomorrowDate(),
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
  watch: {
    'stepOneProps.schedule_time': function (cur, prev) {
      console.log('this is cur', cur);
    },
  },
  mounted() {
    console.log('date', this.stepOneProps.schedule_time);
    (this.startH =
      this.stepOneProps.schedule_time !== ''
        ? moment(this.stepOneProps.schedule_time).hours()
        : moment().minutes() + 5 > 59
        ? (moment().hours() + 1) % 24
        : moment().hours() % 24),
      (this.startM =
        this.stepOneProps.schedule_time !== ''
          ? moment(this.stepOneProps.schedule_time).minutes()
          : (moment().minutes() + 5) % 60),
      (this.startD =
        this.stepOneProps.schedule_time != ''
          ? moment.utc(this.stepOneProps.schedule_time).format('YYYY-MM-DD')
          : this.setDate());
    console.log(
      'this is moment',
      moment.utc(this.stepOneProps.schedule_time).format('YYYY-MM-DD')
    );
  },
  methods: {
    tomorrowDate() {
      const t = new Date();
      t.setDate(t.getDate());
      const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(t.getDate()).padStart(2, '0')}`;
      return ret;
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
      if (this.stepOneProps.public_auth === false) {
        this.stepOneProps.public_otp = false;
        this.stepOneProps.send_otp = false;
        this.stepOneProps.password_auth = false;
        this.typeOfNft();
      }
    },
    setDate() {
      this.startD = moment.utc(this.startD).format('YYYY-MM-DD');
      this.stepOneProps.schedule_time =
        this.startD + ' ' + this.startH + ':' + this.startM + ':00';
      this.stepOneProps.invalidTimeError = this.startH > 23 || this.startM > 59;
      this.stepOneProps.schedule_time_error = moment().isAfter(
        this.stepOneProps.schedule_time
      );
      console.log(this.stepOneProps.schedule_time);
    },
    switchingOffPublicOtp(e) {
      if (this.stepOneProps.public_otp === false) {
        if (
          this.stepOneProps.audienceAirdrop === true &&
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
      if (this.stepOneProps.password_auth === true) {
        if (
          this.stepOneProps.audienceAirdrop === true &&
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
        if (this.stepOneProps.meeting_auth_error === true)
          this.stepOneProps.meeting_auth_error = false;
      }
    },
    switchOffPrivateOtp(e) {
      if (this.stepOneProps.send_otp === false) {
        if (
          this.stepOneProps.audienceAirdrop === true &&
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
        if (this.stepOneProps.meeting_auth_error === true)
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
        this.stepOneProps.event_name.length > 0 &&
        this.stepOneProps.event_name.length < 70
      ) {
        this.stepOneProps.event_name_error = false;
        this.stepOneProps.event_name_length_error = false;
      } else if (this.stepOneProps.event_name.length >= 70) {
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
