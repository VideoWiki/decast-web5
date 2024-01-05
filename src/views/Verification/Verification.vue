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
          >
            <p v-if="!this.verified">1</p>
            <vs-icon
              v-else
              icon="icon-check-circle"
              icon-pack="feather"
              color="#fff"
              rounded="true"
              @click="reloadStepOne"
              class="cursor-pointer"
            ></vs-icon>
          </div>
        </div>
        <div>
          <div v-if="!this.verified">
            <div class="title">Verification</div>
            <div class="caption">
              This is a private secure event, so let's just verify that it is
              really you.
            </div>
          </div>
          <div v-else @click="reloadStepOne" class="cursor-pointer">
            <div class="title">Verified</div>
          </div>
          <div
            v-if="
              (this.nft && !this.skippedStep && !this.walletAddress) ||
              !this.verified
            "
            class="step-content"
          >
            <form @submit.prevent="requestOtp" v-if="!this.verified">
              <div v-if="!this.otpSent">
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
                  disabled
                  v-model="email"
                />
                <p class="desc-join">
                  We will send an OTP to your email to verify your email. This
                  does not create your VideoWiki account.
                </p>
                <div class="flex flex-wrap my-3">
                  <vs-button
                    v-if="!this.otpField"
                    class="flex items-center join-btn"
                    :disabled="!validateEmail"
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
                <div class="flex flex-wrap my-3 w-full">
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
        <div>
          <div v-if="!this.skippedStep && !this.walletAddress && this.nft">
            <div class="title">Connect Wallet</div>
            <div class="caption">Connect your wallet or skip this step.</div>
          </div>
          <div
            v-if="this.walletAddress"
            @click="reloadStepTwo"
            class="title cursor"
          >
            Wallet Connected
          </div>
          <div
            v-if="this.skippedStep"
            @click="reloadStepTwo"
            class="title cursor"
          >
            Step Skipped
          </div>
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
              <div class="flex flex-wrap my-5">
                <vs-button
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
          <div class="caption">Enter your name to join the event</div>
          <div class="step-content">
            <ThirdStep
              v-if="
                !(
                  (this.nft && !this.skippedStep && !this.walletAddress) ||
                  !this.verified
                )
              "
              :payload="this.payload"
              :password_auth="false"
              :public_auth="false"
              :otp_auth="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Private from '../../layouts/components/navbar/components/Connect_Wallet.vue';
import ThirdStep from './ThirdStep.vue';
export default {
  components: { Private, ThirdStep },
  data() {
    return {
      email: this.$route.query.email,
      otp: '',
      otpField: false,
      verified: false,
      skippedStep: false,
      otpSent: false,
      payload: {},
    };
  },
  props: ['nft'],
  computed: {
    validateEmail() {
      return !this.errors.any() && this.email !== '';
    },
    validateOtp() {
      return !this.errors.any() && this.email !== '' && this.otp !== '';
    },
    walletAddress() {
      return this.$store.state.auth.isGetWalletAddress;
    },
  },
  mounted() {
    if (sessionStorage.getItem('verified') === 'true') {
      console.log(sessionStorage.getItem('verified'));
      this.verified = sessionStorage.getItem('verified');
      this.otpField = true;
      this.payload = {
        email: sessionStorage.getItem('email'),
        cast_id: this.$route.params.session_key,
      };
    }
    sessionStorage.clear();
    window.addEventListener('beforeunload', this.storeData);
  },
  beforeDestroy() {
    this.storeData();
  },
  methods: {
    storeData() {
      sessionStorage.setItem('verified', this.verified);
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('name', this.name);
    },
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
    },
    requestOtp() {
      if (this.otpField) {
        this.userVerification();
      } else {
        this.payload = {
          email: this.email.toLowerCase(),
          cast_id: this.$route.params.session_key,
        };

        // Loading
        if (this.email === '') {
          this.$vs.notify({
            title: 'Email Require',
            text: 'Enter Email to Proceed Further',
            color: 'danger',
          });
          return;
        }
        this.$vs.loading();
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
          .catch((e) => {
            this.$vs.loading.close();
            if (e.response.data.message === 'invalid email')
              this.$vs.notify({
                title: 'Unauthorized',
                text: 'Invalid Email',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            else {
              this.$vs.notify({
                title: 'Error Occurred',
                text: 'Try Again',
                color: 'danger',
              });
            }
          });
      }
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
.step {
  position: relative;
  min-height: 1em;
}

.title {
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.02em;
  color: #ffffff;
  line-height: 1.5em;
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
  color: #ffffff;
}

.cursor {
  cursor: pointer;
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
  max-height: 300px;
  overflow: auto;
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
  box-shadow: none;
  align-self: flex-start;
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

.step + .step {
  margin-top: 1.5em;
}
.step > div:first-child {
  position: static;
  height: 0;
}
.step > div:not(:first-child) {
  margin-left: 1.5em;
  padding-left: 1em;
}

.circle {
  border: 2px solid #1f00ea;
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
  padding: 1em;
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
  background: #f2f0fe3c;
  border: 1px solid #7966fa;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
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
  .step {
    left: 1em;
  }
  .verification-box {
    padding: 1.6em;
    margin: 0;
  }

  .verification-img {
    display: none !important;
  }
}
</style>
