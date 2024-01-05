<template>
  <div>
    <div class="text-center m-2">
      <img
        src="@/assets/images/logo/logo.svg"
        @click="navigateTohome"
        class="mr-2 mt-6 h-16 cursor-pointer"
      />
    </div>
    <LoginModes />
  </div>
</template>

<script>
import Web3 from 'web3';
import constants from '../../../constant';
import GAuth from 'vue-google-oauth2';
import Vue from 'vue';
import LoginModes from './components/LoginModes.vue';

export default {
  components: { LoginModes },
  data() {
    return {
      constants,
      email: '',
      password: '',
      checkbox_remember_me: false,
      showPassword: false,
      nonce: '',
      signature: '',
      publicAddress: '',
      coinbase: '',
      gAccessToken: '',
      required: false,
    };
  },
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== '' && this.password !== '';
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    this.initilizeGAuth();
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload

        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Login.notify.text'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });

        return false;
      }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        },
      };

      this.$store
        .dispatch('auth/login', payload)
        .then((response) => {
          this.$cookies.set(
            'Token',
            response.data.accessToken,
            null,
            null,
            'https://cast.video.wiki'
          );
          this.$cookies.set(
            'userId',
            response.data.usersData.id,
            null,
            null,
            'https://cast.video.wiki'
          );
          this.$cookies.set(
            'Token',
            response.data.accessToken,
            null,
            null,
            'https://room.video.wiki'
          );
          this.$cookies.set(
            'userId',
            response.data.usersData.id,
            null,
            null,
            'https://room.video.wiki'
          );

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'login',
            authenticationMethod: 'Email',
            userId: response.data.usersData.id, // this should be replaced with an actual ID
          });
          this.$vs.loading.close();
          // window.location.href = '/';
          this.$acl.change(this.activeUserInfo.userRole);
          if (this.popup) this.$emit('loggedIn');
          else this.$router.push('/');
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: error.response.data.message[0],
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push('/register').catch(() => {});
    },
    navigateToRegister() {
      if (this.popup) this.$emit('toRegister');
      else this.$router.push('/register');
    },
    navigateTohome() {
      this.$router.push('/');
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
            if (res.data.status) {
              this.$cookies.set(
                'Token',
                res.data.accessToken,
                null,
                null,
                'https://cast.video.wiki'
              );
              this.$cookies.set(
                'userId',
                res.data.usersData.id,
                null,
                null,
                'https://cast.video.wiki'
              );
              this.$cookies.set(
                'Token',
                res.data.accessToken,
                null,
                null,
                'https://room.video.wiki'
              );
              this.$cookies.set(
                'userId',
                res.data.usersData.id,
                null,
                null,
                'https://room.video.wiki'
              );

              this.$acl.change(this.activeUserInfo.userRole);
              if (this.popup) this.$emit('loggedIn');
              else this.$router.push('/');
            } else {
              this.$vs.notify({
                title: this.$t('Login.notify.title'),
                text: this.$t('Metamasklogin.notverified'),
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            }
          });
        this.$vs.loading.close();
      } catch (err) {
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
      if (!this.checkLogin()) return;
      this.publicAddress = '';
      this.signature = '';
      this.nonce = '';
      this.coinbase = '';
      const web3 = new Web3(Web3.givenProvider);
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
      this.publicAddress = coinbase.toLowerCase();
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
    // Google Login
    initilizeGAuth() {
      const gauthOption = {
        clientId:
          '819083977574-sq0gi88sfdb5skebh2kjk62t41nuegfv.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'consent',
        fetch_basic_profile: true,
      };
      Vue.use(GAuth, gauthOption);
    },
    async loginWithGoogle() {
      if (!this.checkLogin()) return;
      // Loading
      this.$vs.loading();
      try {
        const googleUser = await this.$gAuth.signIn();
        if (googleUser) {
          this.gAccessToken = googleUser.vc.access_token;
          this.$store
            .dispatch('auth/sendAccessToken', {
              access_token: this.gAccessToken,
            })
            .then((res) => {
              this.$cookies.set(
                'Token',
                res.data.accessToken,
                null,
                null,
                'https://cast.video.wiki'
              );
              this.$cookies.set(
                'userId',
                res.data.usersData.id,
                null,
                null,
                'https://cast.video.wiki'
              );
              this.$cookies.set(
                'Token',
                res.data.accessToken,
                null,
                null,
                'https://room.video.wiki'
              );
              this.$cookies.set(
                'userId',
                res.data.usersData.id,
                null,
                null,
                'https://room.video.wiki'
              );

              this.$acl.change(this.activeUserInfo.userRole);
              if (this.popup) this.$emit('loggedIn');
              else this.$router.push('/');
              this.$vs.loading.close();
            });
        } else {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('Googlelogin.notverified'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
          this.$vs.loading.close();
        }
      } catch (error) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Googlelogin.signmessage'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        this.$vs.loading.close();
      }
    },
  },
};
</script>
<style scoped>
.modified-input {
  height: 60px;
  border: none;
  /* border-radius: 16px; */
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
}
.input-icon {
  position: absolute;
  right: 5%;
  bottom: 30%;
  cursor: pointer;
}
</style>
<style scoped>
.metamask-btn {
  background-color: #ff7d00 !important;
}
.google-btn {
  background-color: rgba(175, 165, 165, 0.527);
  color: #312e2ed1;
  border-radius: 6px;
  width: 100%;
  height: 50px;
  display: inline-flex !important;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}
.google-btn:hover {
  box-shadow: 0 4px 8px 0 rgba(175, 165, 165, 0.527);
}
.google-icon {
  position: absolute;
  left: 46rem;
  width: 2rem;
  height: 2rem;
}

@media only screen and (max-width: 600px) {
  .google-icon {
    left: 3rem;
  }
  .google-icon > span {
    width: 10rem;
  }
}
</style>
