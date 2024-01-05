<template>
  <div>
    <form class="mt-6 rounded-lg px-6" @submit.prevent="login">
      <div class="vx-row mb-6">
        <span class="mb-2 ml-4"
          ><h3><b>Email</b></h3></span
        >
        <vs-input
          color="#7d33ff"
          v-validate="'required|email'"
          type="email"
          name="email"
          placeholder="Enter your Email"
          class="w-full ml-4 mr-4"
          autocomplete="off"
          v-model="email"
        />
        <span v-show="emailEmptyError" class="text-danger ml-6 mt-2"
          >Email is Required</span
        >
        <span class="text-danger ml-6 mt-2" v-show="email !== '' && !ValidMail"
          >Invalid Email</span
        >
      </div>
      <div class="vx-row mb-6">
        <span class="ml-4"
          ><h3><b>Password</b></h3></span
        >
        <div class="w-full">
          <div class="mb-4"></div>
          <div class="flex relative">
            <vs-icon color="#7d33ff"> </vs-icon>
            <vs-input
              color="#7d33ff"
              :type="showPassword ? 'text' : 'password'"
              data-vv-validate-on="blur"
              v-validate="'required'"
              name="password"
              :placeholder="$t('Login.password_p')"
              class="w-full ml-4 mr-4"
              autocomplete="off"
              v-model="password"
            />
            <vs-icon
              color="#7d33ff"
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon mr-2"
              @click="showPassword = !showPassword"
              size="20px "
            />
          </div>
          <span v-show="passwordError" class="text-danger ml-6"
            >Enter Your Password
          </span>
        </div>
      </div>

      <div class="flex flex-wrap justify-between my-5" v-if="!popup">
        <vs-checkbox v-model="checkbox_remember_me" class="text-sm">{{
          $t('Login.remember')
        }}</vs-checkbox>
        <p
          class="cursor-pointer text-sm text-primary"
          @click="$router.push('/resetpassword')"
        >
          {{ $t('Login.forgot') }}
        </p>
      </div>
      <div class="flex flex-wrap mb-3">
        <vs-button
          :disabled="!validateForm"
          :class="{
            cursor: !validateForm,
            '': validateForm,
          }"
          @click.prevent="loginJWT"
          class="w-full text-black text-center content-center"
          ><h3 style="color: white">
            <b>{{ $t('Login.login') }}</b>
          </h3></vs-button
        >
      </div>
      <input type="submit" value="" style="display: none" />
    </form>

    <div class="flex flex-wrap mb-3 text-sm px-6">
      {{ $t('Login.account') }}
      <span
        class="ml-1 text-primary cursor-pointer"
        @click="navigateToSignup"
        >{{ $t('Login.create') }}</span
      >
    </div>

    <p class="hr-lines">or</p>

    <SignInMetaMask />
    <p class="hr-lines">or</p>
    <GoogleLogin />
  </div>
</template>

<script>
import constants from '../../../../constant';
import SignInMetaMask from '../components/PrivateLoginButtons/Metamaskbtn.vue';
import GoogleLogin from '../components/Public.vue';

export default {
  components: { SignInMetaMask, GoogleLogin },
  data() {
    return {
      wallet: false,
      constants,
      email: '',
      password: '',
      ValidMail: 'example@mail.com',
      checkbox_remember_me: false,
      showPassword: false,
      required: false,
      resetEmail: false,
      emailEmptyError: false,
      passwordError: false,
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.email !== '') this.emailEmptyError = false;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.password !== ' ') this.passwordError = false;
      if (/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) this.ValidMail = true;
      // return !this.errors.any() && this.email !== '' && this.password !== '';
      return !this.errors.any() && this.password !== '' && this.email !== '';
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {},
  methods: {
    showWallets() {
      this.wallet = !this.wallet;
    },
    login(e) {
      e.preventDefault();
      if (this.validateForm) {
        this.loginJWT();
      } else {
        this.$vs.notify({
          title: 'Fill all the details',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
    },

    loginJWT() {
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
            'https://class.video.wiki'
          );
          this.$cookies.set(
            'userId',
            response.data.usersData.id,
            null,
            null,
            'https://class.video.wiki'
          );
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'login',
            authenticationMethod: 'Email',
            userId: response.data.usersData.id, // this should be replaced with an actual ID
          });
          console.log(this.activeUserInfo.userRole);
          this.$acl.change(this.activeUserInfo.userRole);
          this.$vs.loading.close();
          this.$router.push('/');
          this.$vs.notify({
            title: 'Success',
            text: 'Login Successfull',
            iconPack: 'feather',
            color: 'success',
          });
        })
        .catch((error) => {
          console.log(error);
          this.$vs.loading.close();
          if (
            error.response.data.message ===
              "user doesn't exist , register yourself" ||
            error.response.data.message === 'invalid Password!'
          )
            this.$vs.notify({
              time: 6000,
              title: 'Error',
              text: 'Wrong ID or wrong password',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          else {
            this.$vs.notify({
              time: 6000,
              title: 'Error',
              text: 'Something Went Wrong Try Again',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          }
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push('/signup').catch(() => {});
    },
    navigateToSignup() {
      if (this.popup) this.$emit('toSignup');
      else this.$router.push('/signup');
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');
.vs-input--placeholder {
  top: 0px;
  color: #000000;
}
.modified-input {
  height: 40px;
  border: none;
  background: #ffffff !important;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 1.5rem;
  width: 100%;
}
.vuesax-app-is-ltr .vs-input--placeholder {
  left: 0;
  color: #000000;
}
.vs-input--input {
  padding: 1.5rem !important;
}

h3 {
  font-size: 1.17em;
}
.vs-input--placeholder {
  top: 0px;
  color: #000000;
}
.input-icon {
  position: absolute;
  right: 5%;
  bottom: 30%;
  cursor: pointer;
  line-height: 2rem;
}
.google-btn:hover {
  box-shadow: 1px 1px rgba(175, 165, 165, 0.527);
  border-color: #7d33ff;
}
.cursor {
  padding: 10px;
}
.hr-lines {
  position: relative;
  max-width: 100%;
  margin: 2% auto;
  text-align: center;

  cursor: default;
}

.hr-lines:before {
  content: '';
  height: 2%;
  width: 40%;
  background: #e7e7e7;
  display: block;
  position: absolute;
  top: 50%;
  left: 5%;
}

.hr-lines:after {
  content: '';
  height: 2%;
  width: 40%;
  background: #e7e7e7;
  display: block;
  top: 50%;
  position: absolute;
  right: 5%;
}
</style>
