<template>
  <div>
    <!--
    <div class="divider mt-2 mb-2">
      <div class="divider-text p-0" />
    </div> -->

    <!-- connect to Social Accounts -->
    <!-- <div class="flex flex-wrap mt-6 w-full justify-center">
      <img
        src="@/assets/images/btn_google.png"
        @click.prevent="loginWithGoogle"
        class="btn mb-4 google-btn rounded-md"
      />
    </div> -->
    <div class="text-center flex mt-2 mr-6 ml-6 mb-4">
      <vs-button
        color=""
        type="border"
        class="w-full text-black text-center content-center self-top"
        @click.prevent="loginWithGoogle"
        ><div class="justify-content text-center inline-flex">
          <span class="flex place-content-between">
            <img src="@/assets/images/login/google.png" class="h-8" />
          </span>
          <span
            class="flex self-center content-center justify-content-center pl-2"
          >
            <h3
              class="self-center align-center"
              style="text-align: center; color: #667085"
            >
              <b>Sign in with Google</b>
            </h3>
          </span>
        </div>
      </vs-button>
    </div>
  </div>
</template>

<script>
import { detectIncognito } from 'detectincognitojs';
import constants from '../../../../constant';
import GAuth from 'vue-google-oauth2';
import Vue from 'vue';

export default {
  name: 'GoogleLogin',
  data() {
    return {
      isIncognito: false,
      constants,
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
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  created() {
    detectIncognito().then((result) => {
      console.log('this is working ', result.browserName, result.isPrivate);
      if (result.isPrivate && result.browserName.toLowerCase() === 'chrome') {
        this.isIncognito = true;
      } else {
        this.isIncognito = false;
      }
    });
  },
  mounted() {
    this.initilizeGAuth();
  },
  methods: {
    // Google Login
    initilizeGAuth() {
      this.isIncognito = false;
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
      // Loading
      this.$vs.loading();
      try {
        const googleUser = await this.$gAuth.signIn();
        if (googleUser) {
          this.gAccessToken = googleUser.getAuthResponse().access_token;
          this.$store
            .dispatch('auth/sendAccessToken', {
              access_token: this.gAccessToken,
              login_type: 'web2',
              login_challenge: this.$route.query.login_challenge,
            })
            .then((response) => {
              console.log(5);
              this.$acl.change(this.activeUserInfo.userRole);
              this.$router.push('/');
              this.$vs.loading.close();
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');
.google-btn {
  border-radius: 6px;
  height: 60px;
  display: inline-flex !important;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

h3 {
  font-size: 1.17em;
}

.google-btn:hover {
  box-shadow: 0 4px 8px 0 rgba(175, 165, 165, 0.527);
}
.google-btn:hover {
  box-shadow: 1px 1px rgba(175, 165, 165, 0.527);
  border-color: #7d33ff;
}
.google-icon {
  width: 2rem;
  height: 2rem;
}

@media only screen and (max-width: 600px) {
  .google-icon > span {
    width: 10rem;
  }
}
</style>
