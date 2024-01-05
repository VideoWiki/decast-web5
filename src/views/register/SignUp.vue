<template>
  <div class="centered-container">
    <div class="container">
      <div class="signUp">
        <div class="signUp-text">Sign Up</div>
      </div>
      <div class="singUp-box">
        <div
          @click="loginWithGoogle"
          class="google box flex justify-items-start items-center font-normal cursor-pointer"
        >
          <img src="@/assets/images/login/google.png" class="h-6 px-3" />
          <p class="google">Sign up with Google</p>
        </div>
        <div
          @click="loginWithMetamask"
          class="wallet box flex justify-items-start items-center font-normal cursor-pointer"
        >
          <img src="@/assets/images/Wallet.svg" class="h-6 px-3" />
          <p>Sign up with Wallet</p>
        </div>
      </div>
      <div class="partition">
        <div class="horizontal-line"></div>
        <div class="partition-text">or signup with email</div>
        <div class="horizontal-line"></div>
      </div>
      <div class="input-name">
        <input placeholder="Your Name" type="text" v-model="firstName" />
        <input placeholder="Last Name" type="text" v-model="lastName" />
      </div>
      <div class="input-box">
        <input placeholder="Email" type="email" v-model="email" />
      </div>
      <div class="input-box">
        <input placeholder="Password" type="password" v-model="password" />
      </div>
      <div class="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          v-model="isTermsConditionAccepted"
          class="custom-checkbox"
        />
        <label class="font-medium" for="checkbox"
          >I agree to the Video wiki
          <span class="underline">
            <a href="#" class="underline"> User Agreement</a>
          </span>
          and
          <span class="underline"
            ><a href="#" class="underline"> Privacy Policy</a></span
          >
        </label>
      </div>
      <div>
        <button
          :class="['enb-button', { faded: !validateForm }]"
          :disabled="!validateForm"
          @click.prevent="registerUserJWt"
        >
          Sign Up
        </button>
      </div>
      <div
        class="bottom-text text-sm font-semibold cursor-pointer"
        style="color: #a6a6a8; text-decoration: underline"
        @click="navigateToLogin"
      >
        Already have an account? Log in
      </div>
    </div>
  </div>
</template>
<script>
import GAuth from 'vue-google-oauth2';
import Web3 from 'web3';
import Vue from 'vue';
import { detectIncognito } from 'detectincognitojs';
import constants from '../../../constant';
export default {
  name: 'SignUp',
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isTermsConditionAccepted: true,
    };
  },
  mounted() {
    this.initilizeGAuth();
  },
  computed: {
    validateForm() {
      console.log(
        this.password,
        !this.errors.any(),
        this.firstName !== '',
        this.lastName !== '',
        this.validateEmail(),
        this.password !== '',
        this.isTermsConditionAccepted === true
      );
      return (
        !this.errors.any() &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.validateEmail() &&
        this.password !== '' &&
        this.isTermsConditionAccepted === true
      );
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  created() {
    document.getElementById('loading-bg').style.display = 'none';
    detectIncognito().then((result) => {
      console.log('this is working ', result.browserName, result.isPrivate);
      if (result.isPrivate && result.browserName.toLowerCase() === 'chrome') {
        this.isIncognito = true;
      } else {
        this.isIncognito = false;
      }
    });
  },
  methods: {
    register() {
      if (this.validateForm) {
        this.registerUserJWt();
      } else {
        console.log('some error');
      }
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(this.email);
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      // if (!this.validateForm || !this.checkLogin()) return;
      console.log('yessss');
      this.$vs.loading();

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        },
        notify: this.$vs.notify,
      };
      this.$store
        .dispatch('auth/userRegister', payload)
        .then((response) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'register',
            authenticationMethod: 'Email',
            userId: response.data.data.user_id, // this should be replaced with an actual ID
          });
          this.$vs.notify({
            title: 'Registration Successful',
            text: 'You have successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check-circle',
            color: 'success',
          });
          console.log('Registration successful - after notification');
          console.log('ye res', response);
          location.href = constants.challengeUri;
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(
            error.response.data.message,
            error.response.data.message === 'username already exists'
          );
          this.$vs.notify({
            title: 'Login Error',
            text:
              error.response.data.message === 'username already exists'
                ? 'Email already exists'
                : error.response.data.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    navigateToLogin() {
      // window.parent.postMessage('navigateToLogin', '*');
      this.$router.push('/login');
    },
    // Metamsask Connection
    async handleSignMessage(publicAddress, nonce) {
      // Loading
      this.$vs.loading();
      try {
        const web3 = new Web3(Web3.givenProvider);
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          '' // MetaMask will ignore the password argument here
        );
        this.signature = signature;
        this.nonce = nonce;
        // Send signature to backend for auth...
        this.$store
          .dispatch('auth/sendSignature', {
            signature: this.signature,
            nonce: this.nonce,
          })
          .then((res) => {
            // uncomment the statment below before pushing wile
            this.$vs.loading.close();

            // Remove the statment below before pushing wile
            this.$vs.notify({
              title: this.$t('Login.notify.title'),
              text: 'Login Successfull',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
            this.$acl.change(this.activeUserInfo.userRole);
            this.$router.push('/');
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.signmessage'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
    },
    async loginWithMetamask() {
      // if (!this.checkLogin()) return;
      this.publicAddress = '';
      this.signature = '';
      this.nonce = '';
      this.coinbase = '';
      const web3 = new Web3(Web3.givenProvider);
      if (!web3.givenProvider) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.install'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.activate'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      this.publicAddress = account.toLowerCase();
      this.$store
        .dispatch('auth/getNonce', { public_add: this.publicAddress })
        .then((res) =>
          // Popup MetaMask confirmation to sign message
          this.handleSignMessage(this.publicAddress, res.data.nonce)
        )
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('Metamasklogin.tryagain'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },

    walletUse() {
      console.log(178);
      this.loginWithMetamask();
    },
    // Google Login
    initilizeGAuth() {
      const gauthOption = {
        clientId:
          '819083977574-sq0gi88sfdb5skebh2kjk62t41nuegfv.apps.googleusercontent.com',
        scope: ' profile email',
        prompt: 'consent',
        fetch_basic_profile: true,
      };
      Vue.use(GAuth, gauthOption);
    },
    async loginWithGoogle() {
      // Loading
      this.$vs.loading();
      try {
        const googleUser = await this.$gAuth.signIn();
        if (googleUser) {
          this.gAccessToken = googleUser.getAuthResponse().access_token;
          this.$store
            .dispatch('auth/sendAccessTokenReg', {
              access_token: this.gAccessToken,
              login_type: 'web2',
              login_challenge: this.$route.query.login_challenge,
            })
            .then((response) => {
              console.log(5);
              this.$acl.change(this.activeUserInfo.userRole);
              this.$router.push('/');
              this.$vs.loading.close();
              this.$vs.notify({
                title: this.$t('Login.notify.title'),
                text: 'Successfully signed up with Google!',
                iconPack: 'feather',
                icon: 'icon-check-circle',
                color: 'success',
              });
            });
        } else {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('GoogleLogin.notverified'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
          this.$vs.loading.close();
        }
      } catch (error) {
        console.log(error, 'err');
        if (this.isIncognito) {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: 'Allow Third Party Cookies',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        } else {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: 'User not verified',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        }
        this.$vs.loading.close();
      }
    },
  },
};
</script>
<style scoped>
:not(i) {
  font-family: 'Karla', sans-serif;
}

.faded {
  opacity: 0.6;
  cursor: not-allowed;
}
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1f272f;
}
.container {
  height: 550px;
  max-width: 500px;
  background-color: #1f272f;
  border-radius: 12px;
  padding: 20px 25px;
  position: relative;
}
.signUp {
  display: flex;
  justify-content: space-between;
}
.signUp-text {
  font-family: 'Karla', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #a6a6a8;
}
.signUp-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
.signUp-icon i {
  font-size: 2em;
  color: #a6a6a8;
}
.singUp-box {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.box {
  height: 40px;
  width: 48%;
  padding: 10px;
  border: 1px solid #31394e;
  border-radius: 8px;
}
.box p {
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
  font-weight: regular;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
}

.box i {
  padding-right: 15px;
  color: #a6a6a8;
}

.input-name {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}
.input-name input {
  height: 40px;
  width: 49%;
  border: 1px solid #31394e;
  background-color: #18191b;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 20px;
}
.input-box input {
  margin-top: 20px;
  height: 40px;
  width: 100%;
  border: 1px solid #31394e;
  background-color: #18191b;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 20px;
}
.checkbox {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.checkbox input {
  margin-right: 10px;
}
.checkbox label {
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
  font-weight: regular;
  cursor: pointer;
}
.custom-checkbox {
  background-color: #18191b;
  color: #18191b;
}

.enb-button {
  margin-top: 30px;
  height: 45px;
  width: 100%;
  background-color: #d7df23;
  border: 1px solid #31394e;
  border-radius: 6px;
  cursor: pointer;
}
.bottom-text {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
  font-weight: regular;
}
.partition {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.horizontal-line {
  border: 0.8px solid #a6a6a8;
  width: 33%;
}
.partition-text {
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
}
.underline {
  text-decoration: underline;
  color: #a6a6a8 !important;
}
</style>
