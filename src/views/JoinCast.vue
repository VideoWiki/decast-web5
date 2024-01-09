<template>
  <div class="idk-co">
    <div class="container-full flex">
      <div class="logo">
        <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" alt="" />
      </div>
      <div class="left-side">
        <!-- <div class="time flex">
         <div class="number flex">
           02
           <p>hr</p>
           <p class="dot">:</p>
         </div>
         <div class="number flex">
           06
           <p>min</p>
           <p class="dot">:</p>
         </div>
         <div class="number flex">
           08
           <p>sec</p>
         </div>
       </div> -->
        <div v-if="running" class="info-part flex">
          <div><span v-if="sentOtp">Private </span>Cast is live</div>
          <img src="@/assets/images/dashboard/Live.svg" alt="" />
        </div>
        <div v-else class="info-part flex text-danger">
          <div><span v-if="sentOtp">Private </span>Cast is not live</div>
        </div>
        <div class="class-name">
          <p>{{ eventName }}</p>
          <div class="host-name">Hosted by “{{ creator }}”</div>
        </div>
        <div class="bottom-text">
          {{ eventDescription }}
        </div>
      </div>
      <div v-if="sentOtp && !verified" class="right-side">
        <p class="heading">
          This is a private secure event, so let's just verify that it is really
          you.
        </p>
        <form
          @submit.prevent="requestOtp"
          v-if="activeSection === 'Verification' && !verified"
        >
          <div v-if="!otpSent" class="name">
            Enter Your Email
            <input
              class="verification-input text-xl"
              v-validate="'required'"
              type="email"
              name="email"
              placeholder="xyz@example.com"
              autocomplete="off"
              v-model="email"
            />
            <p class="otp-text pt-3">
              We will send an OTP to your email to verify your email. This does
              not create your VideoWiki account.
            </p>
            <div class="button">
              <button v-if="!otpField" @click.prevent="requestOtp">
                Request OTP
              </button>
            </div>
          </div>
          <span v-if="otpField">
            <div class="flex name">
              <p class="text-grey">Check your email for OTP</p>
            </div>
            <input
              class="verification-input text-xl"
              v-validate="'required'"
              name="Name"
              placeholder="Enter OTP"
              autocomplete="off"
              v-model="otp"
            />
            <div class="flex flex-wrap my-6 w-full px-16">
              <button
                class="sub-btn justify-center text-lg flex items-center"
                :style="{ backgroundColor: '#1D232B', color: '#A6A6A8' }"
                :disabled="!validateOtp"
                @click.prevent="userVerification"
              >
                Verify
              </button>

              <button
                class="sub-btn justify-center text-lg flex items-center text-black"
                @click.prevent="goBack"
              >
                Cancel
              </button>
            </div>
          </span>
        </form>
      </div>
      <div v-else class="right-side">
        <div class="heading">You're joining the cast</div>
        <div class="step w-full" v-if="this.nft">
          <div>
            <div
              v-if="this.walletAddress"
              @click="reloadStepTwo"
              class="title cursor wall-conn"
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
                <Private :payload="this.newPay" />
                <!-- <div class="flex flex-wrap my-5">
                  <vs-button
                    class="flex-1 font-bold h-16"
                    @click.prevent="skipStep"
                    >Skip Step</vs-button
                  >
                </div> -->
              </span>
            </div>
          </div>
          <div v-if="!this.walletAddress" class="or-cont">
            <div class="border-line"></div>
            <h3 class="mx-auto or-wall" v-if="!this.walletAddress">Or Skip</h3>
            <div class="border-line"></div>
          </div>
        </div>
        <br />
        <div class="name">Joining name</div>
        <input
          placeholder="e.g John G. Miguel"
          @keydown.enter="joinCast"
          v-model="joiningName"
        />
        <div class="button">
          <button class="cursor-pointer" @click="joinCast">Access cast</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../axios';
import Private from '../layouts/components/navbar/components/Connect_Wallet.vue';
export default {
  name: 'WaitForJoin',
  components: { Private },
  data() {
    return {
      joiningName: '',
      meeting_id: this.$route.params.meetingID,
      eventName: '',
      eventDescription: '',
      creator: '',
      disabled: false,
      running: false,
      activeSection: 'Verification',
      email: '',
      name: '',
      verified: false,
      otpField: false,
      otp: '',
      skippedStep: false,
      otpSent: false,
      payload: {},
      newPay: {},
      sentOtp: false,
      password: '',
      nft: false,
    };
  },
  // created() {
  //   const credentials = this.extractCredentials();
  //   if (credentials) {
  //     this.password = credentials.password;
  //     this.email = credentials.email;
  //   }
  // },
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
    document.getElementById('loading-bg').style.display = 'block';
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      this.email = decodeURIComponent(emailParam);
    }
    this.getMeetingDetails();
    this.castInfo();
    console.log(this.newPay);
    console.log(this.nft, 'nft');
  },
  methods: {
    // extractCredentials() {
    //   const url = window.location.href;
    //   const passStartIndex = url.indexOf('?pass=') + 6; // 6 is the length of '?pass='
    //   const passEndIndex = url.indexOf('%3Femail%3D', passStartIndex); // '%3Femail%3D' is the end of the password

    //   if (passStartIndex !== -1 && passEndIndex !== -1) {
    //     const passParam = url.substring(passStartIndex, passEndIndex);
    //     let emailParam = url.substring(passEndIndex + 10); // 10 is the length of '%3Femail%3D'
    //     emailParam = emailParam.substring(1); // remove the first character
    //     return {
    //       password: decodeURIComponent(passParam),
    //       email: emailParam ? decodeURIComponent(emailParam) : '',
    //     };
    //   }

    //   return null;
    // },
    async castInfo() {
      try {
        this.$vs.loading();
        const payload = this.meeting_id;
        const response = await this.$store.dispatch(
          'auth/eventDetail',
          payload
        );

        this.nft =
          response.data.meeting_info.give_nft ||
          response.data.meeting_info.vc_details_submitted;
        this.otpVerification = response.data.meeting_info.send_otp;
        this.password_auth = response.data.meeting_info.password_auth;
        this.public_otp = response.data.meeting_info.public_otp;
        this.is_public = !this.password_auth && !this.otpVerification;
        this.event_creator_name = response.data.meeting_info.event_creator_name;
        this.event_name = response.data.meeting_info.event_name;
        this.event_date = response.data.meeting_info.date;
        this.event_time = response.data.meeting_info.time;
        this.description = response.data.meeting_info.description;
        this.meeting_running = response.data.meeting_info.running;
        this.viewer_mode = response.data.meeting_info.viewer_mode;
        this.isExpired = response.data.meeting_info.expired;
        this.has_magic = this.$route.query.pass !== undefined;
        console.log(this.has_magic);
        this.$vs.loading.close();
        this.data_loaded = true;
      } catch (err) {
        if (err.status === 404) {
          this.$router.push('/error/404.vue');
        } else {
          console.log(err);
        }
      }
    },
    async getMeetingDetails() {
      const res = await this.$store.dispatch(
        'cast/meetingInfo',
        this.meeting_id
      );
      const details = res.data.meeting_info;
      console.log(details);
      this.sentOtp = details.send_otp;
      console.log(this.sentOtp);
      this.eventName = details.event_name;
      this.eventDescription = details.description;
      this.creator = details.event_creator_name;
      this.running = details.running;
      document.getElementById('loading-bg').style.display = 'none';
    },
    async joinCast() {
      // const credentials = this.extractCredentials();
      // console.log('my credentials are', credentials);
      const payload = {
        name: this.joiningName,
        email: !this.sentOtp ? '' : this.email,
        password: !this.sentOtp ? this.$route.query.pass : '',
        public_meeting_id: this.meeting_id,
        avatar_url: '',
        isPublic: !this.sentOtp,
      };
      console.log('my payload is this', payload);
      if (this.payload) {
        this.email = this.payload.email;
      } else {
        this.email = '';
      }

      if (!this.sentOtp) {
        const joineePayload = {
          user_name: this.joiningName,
          user_email: payload.email || '',
          session_id: payload.public_meeting_id,
        };

        await this.$store
          .dispatch('studio/addJoinee', joineePayload)
          .then(async (response) => {
            console.log(response.data);
            if (response.data.status) {
              console.log('public path');
              if (this.$route.query.pass !== undefined) {
                console.log(payload);
                await this.magicJoin(payload);
              } else {
                await this.joinCastUtil(payload);
              }
            }
          })
          .catch((err) => {
            console.log(err);
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Error Occurred',
              text:
                err.response != null
                  ? err.response.data.message
                  : 'Something went wrong! Try Again',
              color: 'danger',
            });
          });
      } else {
        if (this.$route.query.pass !== undefined) {
          await this.magicJoin(payload);
        } else {
          this.joinCastUtil(payload);
        }
      }
    },
    storeData() {
      sessionStorage.setItem('verified', this.verified);
      // sessionStorage.setItem('email', this.email);
    },
    joinCastUtil(payload) {
      console.log('----->');
      this.$store
        .dispatch('studio/joinEvent', payload)
        .then((response) => {
          this.responsedata = response.data.url;
          window.location.href = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((e) => {
          console.log(e.response);
          this.$vs.loading.close();
          this.disabled = false;
          this.$vs.notify({
            title: 'Error Occurred',
            text:
              e.response != null
                ? e.response.data.message
                : 'Check either your password or the cast timing',
            color: 'danger',
          });
        });
    },
    async magicJoin(payload) {
      console.log(payload);
      var data = JSON.stringify({
        id: this.meeting_id,
        pass: this.$route.query.pass,
        name: this.joiningName,
      });
      console.log(178);
      await this.$store
        .dispatch('studio/magicJoin', data)
        .then((res) => {
          console.log(res.data.url, 181);
          if (res.data.url) {
            console.log(184);
            this.$vs.notify({
              title: 'Success',
              color: 'success',
            });
            location.href = res.data.url;
          } else {
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Wrong Link',
              text: 'You have the wrong link to join',
              color: 'danger',
            });
          }
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.disabled = false;
          console.log(e.response);
        });
    },
    accessCast() {
      console.log('access called')
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
      if (this.joiningName.length === 0) {
        this.$vs.notify({
          title: 'Name require',
          color: 'danger',
        });
        return;
      }
      var data = JSON.stringify({
        id: this.meeting_id,
        pass: !this.sentOtp ? this.$route.query.pass : '',
        name: this.joiningName,
      });
      sessionStorage.setItem('name', this.joiningName);
      this.$vs.loading();
      console.log(178);
      this.$store
        .dispatch('studio/magicJoin', data)
        .then((res) => {
          console.log(res.data.url, 181);
          if (res.data.url) {
            console.log(184);
            this.$vs.notify({
              title: 'Success',
              color: 'success',
            });
            location.href = res.data.url;
          } else {
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Wrong Link',
              text: 'You have the wrong link to join',
              color: 'danger',
            });
          }
        })
        .catch((e) => {
          this.$vs.loading.close();
          console.log(e.response);
        });
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
    requestOtp() {
      sessionStorage.clear();
      if (this.otpField) {
        this.userVerification();
      } else {  
        this.payload = {
          email: this.email.toLowerCase(),
          meeting_id: this.$route.params.meetingID,
        };
        sessionStorage.setItem('email', this.payload.email);
        this.newPay = {
          email: this.email.toLowerCase(),
          cast_id: this.meeting_id,
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
          .dispatch('auth/sendingOtp', this.payload)
          .then((res) => {
            console.log(res.data);
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
            console.log(e.response.data);
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
        meeting_id: this.$route.params.meetingID,
        otp: this.otp,
      };
      // Loading
      this.$vs.loading();

      this.$store
        .dispatch('auth/verifyingOtp', payload)
        .then((res) => {
          this.$vs.loading.close();
          if (res.data.status) {
            this.verified = true;
          }
          this.$vs.notify({
            title: 'Congrats',
            text: 'Verified',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success',
          });
          this.setDid();
          this.setDidOrg();
          this.activeSection = 'Join';
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
    async setDid() {
      try {
        const res = await axios.get(
          'https://amanbishnoi.tech/api/issue-did'
        );
        const data = res.data.did;
        const obj = res.data;
        // localStorage.setItem('userd',JSON.stringify(obj));
        localStorage.setItem('did', data);
        // console.log('DID Issued:', obj);
      } catch (error) {
        console.error('Error issuing DID:', error);
      }
    },
    async setDidOrg() {
      try {
        const res = await axios.get(
          'https://amanbishnoi.tech/api/issue-did-to-org'
        );
        const data = res.data.keys;
        const obj = res.data;
        // localStorage.setItem('orgId',JSON.stringify(obj));
        localStorage.setItem('orgDid', JSON.stringify(data));
        // console.log('orgDID Issued:', JSON.stringify(obj));
      } catch (error) {
        console.error('Error issuing DID:', error);
      }
    },
    goBack() {
      this.otpSent = false;
      this.otpField = false;
    },
    skipStep() {
      this.skippedStep = true;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.idk-co {
  background: #000000;
  background-image: url('../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.container-full {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.caption {
  color: #a6a6a6;
  font-size: medium;
}

.wall-conn {
  color: #a6a6a6;
  font-size: medium;
  font-weight: 500;
}

.or-cont {
  display: flex;
  gap: 3;
}
.or-wall {
  color: #a6a6a6;
  width: fit-content;
  text-align: center;
  margin: auto;
  /* border: 1px solid red; */
}

.border-line {
  /* border-color: #a6a6a6; */
  border-bottom: 1px solid #a6a6a6;
  height: 1px;
  margin: auto;
  width: 40%;
}
.logo {
  width: 91px;
  height: 91px;
}
.left-side {
  width: 425px;
  margin-left: 300px;
  margin-top: 200px;
}
.number {
  font-weight: 600;
  font-size: 20px;
  color: #d7df23;
}
.number p {
  font-size: 13px;
  font-weight: 500;
  color: #647181;
  display: flex;
  align-self: flex-end;
  padding-bottom: 4px;
  padding-left: 2px;
}
.dot {
  margin: 5px 32px 0px 32px;
  width: 6px;
  height: 28px;
  color: #64718180;
  display: flex;
}
.info-part {
  margin-top: 30px;
  align-items: center;
}
.info-part div {
  font-weight: 600;
  font-size: 14px;
  color: #d7df23;
}
.info-part img {
  margin-left: 8px;
  width: 16px;
  height: 12px;
}
.class-name p {
  margin-top: 15px;
  font-weight: 500;
  font-size: 24px;
  color: #a6a6a8;
}
.host-name {
  margin-top: 5px;
  font-weight: 500;
  font-size: 16px;
  color: #647181;
}
.bottom-text {
  margin-top: 33px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.right-side {
  margin-top: 200px;
  margin-left: 14px;
  margin-right: 10rem;
  width: 376px;
  height: fit-content;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 6px;
  padding: 30px;
}
.heading {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
  /* margin-bottom: 15px; */
}
.name {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;
  color: #637181;
  margin-bottom: 5px;
}
.right-side input {
  width: 319px;
  height: 40px;
  background-color: #1d232b;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 0px 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.button {
  margin-top: 20px;
}
.button button {
  width: 319px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  font-weight: 600;
  font-size: 12px;
  color: #181a20;
  background-color: #d7df23;
}
.sub-btn {
  height: 40px;
  width: 89px;
  cursor: pointer;
  border-radius: 6px;
  background: #d7df23;
  border: #31394e 1px solid;
  margin: 4px;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
}

@media (max-width: 499px) {
  .container-full {
    flex-direction: column;
    justify-content: center;
    max-width: 499px;
    margin: auto;
    /* border: 1px solid red; */
  }

  .left-side {
    /* border: 1px solid red; */
    margin: auto;
    width: auto !important;
    max-width: 400px !important;
    margin-top: 60px;
  }

  .right-side {
    /* border: 1px solid yellow; */
    /* max-height: 280px !important; */
    max-width: 320px;
    width: auto;
    min-width: 280px;
    margin: auto;
    margin-top: -100px;
    padding: 15px;
  }

  .right-side input {
    width: 100%;
  }

  .button button {
    width: 100%;
  }
}
</style>
