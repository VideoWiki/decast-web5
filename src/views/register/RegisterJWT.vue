<template>
  <div class="px-6 pt-6">
    <form @submit.prevent="register">
      <div class="flex mb-6">
        <div class="w-1/2 mr-2">
          <h6 class="mb-4">
            <b>First Name</b><span class="text-danger"> *</span>
          </h6>
          <vs-input
            type="text"
            placeholder="Enter First Name"
            class="w-full"
            autocomplete="off"
            v-model="firstName"
          />
          <span v-show="firstNameError" class="text-danger"
            >First Name is Required</span
          >
        </div>
        <div class="w-1/2">
          <h6 class="mb-4">
            <b>Last Name</b><span class="text-danger"> *</span>
          </h6>
          <vs-input
            type="text"
            placeholder="Enter Last Name"
            class="w-full"
            autocomplete="off"
            v-model="lastName"
          />
          <span v-show="lastNameError" class="text-danger"
            >Last Name is Required</span
          >
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <h6 class="mb-4"><b>Email</b><span class="text-danger"> *</span></h6>
          <vs-input
            placeholder="Enter email address"
            class="w-full"
            autocomplete="off"
            v-model="email"
          />

          <span v-show="emailError" class="text-danger">Invalid Email</span>
          <span v-show="emailEmptyError" class="text-danger"
            >Email is Require</span
          >
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <h6 class="mb-4">
            <b>Create Password</b><span class="text-danger"> *</span>
          </h6>
          <div class="flex relative">
            <vs-input
              :type="create_showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full"
              autocomplete="off"
              v-model="password"
            />
            <vs-icon
              color="#7d33ff"
              :icon="create_showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon"
              @click="create_showPassword = !create_showPassword"
              size="20px "
            />
          </div>
          <span v-show="passwordError" class="text-danger"
            >Password should be 8 characters long</span
          >
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <h6 class="mb-4">
            <b>Confirm Password</b><span class="text-danger"> *</span>
          </h6>
          <div class="flex relative">
            <vs-input
              :type="repeat_showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full"
              autocomplete="off"
              v-model="confirm_password"
            />
            <vs-icon
              color="#7d33ff"
              :icon="repeat_showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon"
              @click="repeat_showPassword = !repeat_showPassword"
              size="20px "
            />
          </div>
          <span v-show="confirmPasswordError" class="text-danger"
            >Passwords don't match</span
          >
          <span v-show="confirmPasswordEmptyError" class="text-danger"
            >Passwords Require</span
          >
        </div>
      </div>

      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
        >I accept the terms & conditions.</vs-checkbox
      >
      <div class="flex flex-wrap mb-3">
        <vs-button
          class="mt-6 mt-3 mx-1 w-full"
          :disabled="!validateForm"
          @click.prevent="registerUserJWt"
        >
          <h5 style="color: white"><b>Create Account</b></h5></vs-button
        >
      </div>
      <button style="display: none">submit</button>
    </form>
    <div class="flex flex-wrap mb-3 justify-center">
      Do you already have an account?
      <span class="ml-1 text-primary cursor-pointer" @click="navigateToLogin"
        >Login</span
      >
    </div>
  </div>
</template>

<script>
export default {
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
      confirm_password: '',
      create_showPassword: false,
      repeat_showPassword: false,
      isTermsConditionAccepted: true,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      confirmPasswordEmptyError: false,
      emailEmptyError: false,
    };
  },
  computed: {
    validateForm() {
      if (this.firstName !== '') this.firstNameError = false;
      if (this.lastName !== '') this.lastNameError = false;
      if (this.validateEmail()) this.emailError = false;
      if (this.password.length >= 8) this.passwordError = false;
      if (this.email !== '') this.emailEmptyError = false;
      if (this.confirm_password !== '') this.confirmPasswordEmptyError = false;
      if (
        this.password === this.confirm_password &&
        this.confirm_password !== ''
      )
        this.confirmPasswordError = false;
      console.log(
        this.password,
        this.confirm_password,
        !this.errors.any(),
        this.firstName !== '',
        this.lastName !== '',
        this.validateEmail(),
        this.password !== '',
        this.confirm_password !== '',
        this.confirm_password === this.password,
        this.isTermsConditionAccepted === true
      );
      return (
        !this.errors.any() &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.validateEmail() &&
        this.password !== '' &&
        this.confirm_password !== '' &&
        this.confirm_password === this.password &&
        this.isTermsConditionAccepted === true
      );
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    register() {
      if (this.validateForm) {
        this.registerUserJWt();
      } else {
        this.firstNameError = this.firstName === '';
        this.lastNameError = this.lastName === '';
        this.emailError = !this.validateEmail() && this.email !== '';
        this.passwordError = this.password.length < 8;
        this.confirmPasswordError =
          this.confirm_password !== this.password &&
          this.confirm_password !== '';
        this.confirmPasswordEmptyError = this.confirm_password === '';
        this.emailEmptyError = this.email === '';
      }
    },
    validateEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(this.email);
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload

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
      if (!this.validateForm || !this.checkLogin()) return;

      this.$vs.loading();

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
        },
        notify: this.$vs.notify,
      };
      this.$store
        .dispatch('auth/registerUser', payload)
        .then((response) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'register',
            authenticationMethod: 'Email',
            userId: response.data.usersData.id, // this should be replaced with an actual ID
          });
          const payload = {
            checkbox_remember_me: true,
            userDetails: {
              email: this.email,
              password: this.password,
            },
          };

          this.$store
            .dispatch('auth/login', payload)
            .then((response) => {
              this.$vs.loading.close();
              this.$acl.change(this.activeUserInfo.userRole);
              if (this.popup) this.$emit('registered');
              else this.$router.push('/');
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
      if (this.popup) this.$emit('toLogin');
      else this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.modified-input {
  height: 60px;
  border: none;
  background: #f0efef;
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
  line-height: 1.8rem;
}

h3 {
  font-size: 1.7rem;
}
</style>
