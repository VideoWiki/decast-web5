<template>
  <div>
    <div class="vx-row no-gutter w-full inside-join-box p-10">
      <div class="step">
        <div>
          <div
            :class="[
              'flex',
              'items-center',
              'justify-center',
              'circle',
              { 'circle-visited': this.verified },
            ]"
            @click="reloadStepOne()"
            class="cursor"
          >
            <p v-if="!this.verified">1</p>
            <vs-icon
              v-else
              icon="icon-check-circle"
              icon-pack="feather"
              color="#fff"
              rounded="true"
            ></vs-icon>
          </div>
        </div>
        <div>
          <div v-if="!this.verified">
            <div class="title">Verification</div>
            <div class="caption">Enter your name and Email ID to verify it</div>
          </div>
          <div v-else>
            <div class="title">Verified</div>
          </div>
          <div
            v-if="
              (this.nft && !this.skippedStep && !this.walletAddress) ||
              !this.verified
            "
            class="step-content"
          >
            <form @submit.prevent="requestOtp1" v-if="!this.verified">
              <div v-if="!this.otpSent">
                <div class="flex mt-2">
                  <h6 class="label-join my-4">
                    Name
                    <span class="text-danger">*</span>
                  </h6>
                </div>

                <input
                  class="verification-input text-xl"
                  v-validate="'required'"
                  type="name"
                  name="name"
                  placeholder="Enter Name"
                  autocomplete="off"
                  v-model="name"
                />
                <p class="desc-join mt-6">
                  Your name will be shown to other event attendees and
                  organizers for attending the event, chats and logs.
                </p>
                <div class="flex mt-2">
                  <h6 class="label-join my-4">
                    Email
                    <span class="text-danger">*</span>
                  </h6>
                </div>

                <input
                  class="verification-input text-xl"
                  v-validate="'required'"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  autocomplete="off"
                  v-model="email"
                />
                <p class="desc-join mt-5">
                  We will send an OTP to your email to verify your email. This
                  does not create your VideoWiki account.
                </p>
                <div class="flex flex-wrap my-3">
                  <vs-button
                    type="submit"
                    v-if="!this.otpField"
                    class="flex items-center join-btn"
                    :disabled="!validateEmail"
                    @submit.prevent="requestOtp1"
                    @click.prevent="requestOtp"
                    >Request OTP</vs-button
                  >
                </div>
              </div>
              <span v-if="this.otpField">
                <div class="flex">
                  <h6 class="label-join my-4">
                    OTP
                    <span class="text-danger">*</span>
                  </h6>
                </div>
                <input
                  class="verification-input text-xl"
                  v-validate="'required'"
                  name="Name"
                  placeholder="Enter Otp"
                  autocomplete="off"
                  v-model="otp"
                />
                <div class="flex flex-wrap my-3">
                  <vs-button
                    class="flex items-center join-btn mr-4"
                    :disabled="!validateOtp"
                    @click.prevent="userVerification"
                    >Verify</vs-button
                  >
                  <vs-button
                    class="flex items-center go-back-btn"
                    @click.prevent="goBack"
                    style="background: red"
                    >Cancel</vs-button
                  >
                </div>
              </span>
              <input
                type="submit"
                @submit.prevent="requestOtp1"
                style="display: none"
              />
            </form>
          </div>
        </div>
      </div>
      <div class="step w-full" v-if="this.nft">
        <div>
          <div
            :class="[
              'flex',
              'items-center',
              'justify-center',
              'circle',
              { 'circle-visited': this.verified },
            ]"
            @click="reloadStepTwo"
            class="cursor"
          >
            <p v-if="!this.walletAddress && !this.skippedStep">2</p>
            <vs-icon
              v-else
              icon="icon-check-circle"
              icon-pack="feather"
              color="#fff"
              rounded="true"
            ></vs-icon>
          </div>
        </div>
        <div class="pt-8">
          <div v-if="!this.skippedStep && !this.walletAddress && this.nft">
            <div class="title">Connect Wallet</div>
            <div class="caption">Connect your wallet or skip this step.</div>
          </div>
          <div v-if="this.walletAddress" class="title">Wallet Connected</div>
          <div v-if="this.skippedStep" class="title">Step Skipped</div>
          <div class="step-content">
            <span
              v-if="
                ((this.nft && !this.skippedStep && !this.walletAddress) ||
                  !this.verified) &&
                this.otpField &&
                this.nft &&
                this.verified
              "
            >
              <Private :payload="this.payload" />
              <div class="flex flex-wrap my-5 text">
                <vs-button
                  type="border"
                  class="flex-1 font-bold h-16"
                  @click.prevent="skipStep"
                  >Skip Step</vs-button
                >
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="step w-full last-step">
        <div>
          <div :class="['flex', 'items-center', 'justify-center', 'circle']">
            <p>{{ this.nft ? '3' : '2' }}</p>
          </div>
        </div>
        <div>
          <div class="title">Join</div>
          <div class="caption">Click to join the event</div>
          <div class="step-content">
            <ThirdStep
              v-if="
                !(
                  (this.nft && !this.skippedStep && !this.walletAddress) ||
                  !this.verified
                )
              "
              :public="true"
              :password_auth="false"
              :payload="payload"
              :public_auth="true"
              :otp-auth="false"
            />
          </div>
        </div>
      </div>

      <div class="vx-col lg:w-1/2 md:w-1/2 xs:w-1/2">
        <div class="verification-box w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ThirdStep from './ThirdStep.vue';
import Private from '../../layouts/components/navbar/components/Connect_Wallet.vue';
export default {
  components: { ThirdStep, Private },
  data() {
    return {
      el: 1,
      email: '',
      name: '',
      otp: '',
      otpField: false,
      verified: false,
      skippedStep: false,
      payload: {},
      otpSent: false,
    };
  },
  props: ['nft'],
  computed: {
    validateEmail() {
      return !this.errors.any() && this.email !== '' && this.name !== '';
    },
    validateOtp() {
      return !this.errors.any() && this.email !== '' && this.otp !== '';
    },
    walletAddress() {
      console.log(this.$store.state.auth.isGetWalletAddress);
      return this.$store.state.auth.isGetWalletAddress;
    },
  },
  created() {
    if (sessionStorage.getItem('verified') === 'true') {
      this.verified = sessionStorage.getItem('verified');
      this.otpField = sessionStorage.getItem('verified');
      this.payload = {
        email: sessionStorage.getItem('email'),
        cast_id: this.$route.params.session_key,
        name: sessionStorage.getItem('name'),
      };
    }
    sessionStorage.clear();
    window.addEventListener('beforeunload', this.storeData);
  },
  beforeDestroy() {
    this.storeData();
  },
  methods: {
    reloadStepOne() {
      this.verified = false;
      this.goBack();
      this.reloadStepTwo();
    },
    reloadStepTwo() {
      this.skippedStep = false;
      this.$store.dispatch('auth/removeWalletAddress', false);
    },
    goBack() {
      this.otpSent = false;
      this.otpField = false;
      this.otp = '';
    },
    requestOtp1() {
      if (this.otpField) {
        this.userVerification();
      } else {
        if (this.name === '') {
          this.$vs.notify({
            title: 'Name Require',
            text: 'Enter Name To Enter Cast',
            color: 'danger',
          });
          return;
        }
        if (this.email === '') {
          this.$vs.notify({
            title: 'Email Require',
            text: 'Enter Email To Enter Cast',
            color: 'danger',
          });
          return;
        }
        this.requestOtp();
      }
    },
    async requestOtp() {
      if (this.otpField) {
        this.userVerification();
      } else {
        this.payload = {
          email: this.email.toLowerCase(),
          cast_id: this.$route.params.session_key,
          name: this.name,
        };
        await this.$store
          .dispatch('studio/addJoinee', {
            user_name: this.name,
            user_email: this.email,
            session_id: this.$route.params.session_key,
          })
          .then(async (response) => {
            console.log(response.data);
            if (response.data.status) {
              console.log('public path');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$vs.notify({
              title: 'Error Occurred',
              text:
                err.response != null ? err.response.data.message : 'Try again!',
              color: 'danger',
            });
          });

        // Loading
        this.$store
          .dispatch('auth/sendOtp', this.payload)
          .then((res) => {
            this.$vs.loading.close();
            if (res.data.status) {
              this.otpField = true;
              this.otpSent = true;
              this.$vs.notify({
                // title: 'Error',
                text: this.$t('Verification.otpsent'),
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success',
              });
            }
          })
          .catch(() => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: 'Error',
              text: this.$t('Verification.try'),
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          });
      }
    },
    storeData() {
      sessionStorage.setItem('verified', this.verified);
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('name', this.name);
    },
    userVerification() {
      const payload = {
        email: this.email,
        cast_id: this.$route.params.session_key,
        otp: this.otp,
      };

      // Loading
      this.$vs.loading();

      this.$store
        .dispatch('auth/verifyOtp', payload)
        .then((res) => {
          this.$vs.loading.close();
          if (res.data.status) {
            this.verified = true;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: this.$t('Verification.correctotp'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    skipStep() {
      this.skippedStep = true;
    },
  },
};
</script>

<style scoped>
/* .line {
  position: relative;
  width: 40rem;
  height: 0px;
  top: 25rem;
  left: -15rem;
  border: 1px solid rgba(175, 165, 165, 0.527);
  transform: rotate(90.23deg);
} */

/* .step {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 3.5em;
} */

/* .circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3em;
  width: 3em;
  height: 3em;
  background: #c4c4c4;
} */

.step {
  position: relative;
  min-height: 1em;
}

.title {
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.02em;
  color: #272d4d;
  line-height: 1.5em;
}

.cursor {
  cursor: pointer;
}
.caption {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.005em;
  color: #101010;
}
.label-join {
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #272d4d;
}

.desc-join {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #101010;
}

.step-content {
  padding-right: 5px;
  padding-top: 2px;
  height: auto;
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: #fff #8d56f85a; /* scroll thumb and track */
}
.step-content::-webkit-scrollbar {
  height: 3px;
  width: 2px;
}
.step-content::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 1px solid #8d56f85a;
}

.join-btn {
  background: #6ce733 !important;
  border-radius: 36px;
  width: fit-content;
  height: 36px;

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
}

.go-back-btn {
  background: #fa3f3f !important;
  border-radius: 36px;
  width: fit-content;
  height: 36px;

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  align-self: flex-end;
  box-shadow: none;
}

.join-btn:hover,
.join-btn:active {
  box-shadow: none;
}
.step + .step {
  margin-top: 1.5em;
}
.step > div:first-child {
  position: static;
  height: 0;
}

.vs-button-primary.vs-button-border {
  color: white !important;
}

.step > div:not(:first-child) {
  margin-left: 1.5em;
  padding-left: 1em;
}

.circle {
  border: 2px solid #7966fa;
  background: #f2f0fe;
  position: relative;
  width: 2em;
  height: 2em;
  line-height: 2em;
  border-radius: 100%;
  color: #7966fa;
  text-align: center;
  box-shadow: 0 0 0 3px #fff;
}

.circle-visited {
  background: #7966fa;
  color: #fff;
}

.step:after {
  content: ' ';
  position: absolute;
  display: block;
  top: 2.25rem;
  left: 1rem;
  height: 100%;
  width: 1px;
  /* transform: scale(1, 2); */
  /* transform-origin: 50% -100%; */
  background-color: #7966fa;
  z-index: 1;
}

.step:last-child .step:after {
  display: none;
  z-index: -1;
}
.last-step:after {
  display: none !important;
}
.step.step-active .circle {
  background: #7966fa;
  color: #fff;
}

.first {
  top: 10rem;
}

.second {
  top: 23rem;
}

.third {
  top: 36rem;
}

.completed-step {
  background: #1dc202;
}

.verification-box {
  /* margin-left: 32em; */
  padding: 1em;
  /* width: 100% !important; */
}

.verification-box > h2 {
  align-items: center;
  justify-content: center;
  display: flex;
}

.verification-input {
  height: 48px;
  border-radius: 4px;
  width: 100%;
  background: #f2f0fe;
  border: 1px solid #7966fa;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #272d4d;
}

.verification-img {
  position: relative;
  bottom: 0px;
  right: 3.5em;
  z-index: -1;
  padding: 0px;
  margin: 0px;
  width: 35%;
}
.step-text {
  margin-top: 0.2rem;
  width: 25rem;
  text-align: justify;
}

.inside-join-box {
  gap: 1rem;
}
/* .inside-join-box .lines {
  margin-left: 40px;
  margin-top: 6px;
}
.inside-join-box .lines .dot {
  width: 14px;
  height: 14px;
  background: #d1d6e6;
  border-radius: 7px;
}
.inside-join-box .lines .line {
  height: 103px;
  width: 2px;
  background: #324279;
  margin-left: 5.3px;
} */
@media screen and (max-device-width: 480px) {
  .first {
    top: 6rem;
  }

  .second {
    top: 15rem;
  }

  .third {
    top: 24rem;
  }

  /* .line {
    top: 20rem;
    width: 30rem;
    left: -13rem;
  } */
  .step {
    left: 1em;
  }
  .verification-box {
    padding: 1.6em;
    margin: 0;
    /* margin-top: 20rem; */
    /* width: 100% !important; */
  }

  .verification-img {
    display: none !important;
  }
}
</style>
