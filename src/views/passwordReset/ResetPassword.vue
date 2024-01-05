<template>
  <div class="w-full pt-8">
    <div class="">
      <div class="p-5 reset">
        <div class="mb-2 pl-3">
          <p class="my-5 text-lg">
            Your new password must be different from previously used password
          </p>
        </div>
        <div class="vx-col m-2 relative">
          <h6 class="my-4 font-black">
            New Password<span class="text-danger"> *</span>
          </h6>
          <div class="flex relative">
            <vs-input
              :type="showPassword ? 'text' : 'password'"
              data-vv-validate-on="blur"
              v-validate="'required'"
              @change="validateForm"
              v-model="password"
              name="New Password"
              placeholder="Enter Password"
              class="w-full"
              autocomplete="off"
            />
            <vs-icon
              color="#7d33ff"
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon mr-2"
              @click="showPassword = !showPassword"
              size="20px "
            />
          </div>
        </div>
        <span class="text-danger m-2" v-if="passwordError"
          >Password is required</span
        >
        <div class="vx-col m-2 relative">
          <h6 class="my-4 font-black">
            Confirm Password<span class="text-danger"> *</span>
          </h6>
          <div class="flex relative">
            <vs-input
              :type="showConfirmPassword ? 'text' : 'password'"
              data-vv-validate-on="blur"
              v-validate="'required'"
              name="Confirm Password"
              @change="validateForm"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              class="w-full"
              autocomplete="off"
            />
            <vs-icon
              color="#7d33ff"
              :icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="input-icon mr-2"
              @click="showConfirmPassword = !showConfirmPassword"
              size="20px "
            />
          </div>
          <br />
        </div>
        <span class="text-danger m-2" v-if="confirmPasswordError"
          >Password is required</span
        >
        <span class="text-danger m-2" v-if="passwordMatchError"
          >Passwords do not match</span
        >
        <vs-button
          type="filled"
          @click="RestPassword"
          class="font-semibold mt-3"
          >Save</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      passwordError: false,
      confirmPasswordError: false,
      passwordMatchError: false,
    };
  },
  props: {},
  computed: {},
  mounted() {
    console.log(this.$route);
  },
  methods: {
    RestPassword() {
      if (!this.validateForm()) {
        this.passwordError = this.password === '';
        this.confirmPasswordError = this.confirmPassword === '';
        this.passwordMatchError =
          !this.confirmPasswordError && this.password !== this.confirmPassword;
        return;
      }
      const payload = {
        password: this.password,
        token_string: this.$route.params.token,
      };
      this.$store
        .dispatch('auth/resetPassword', payload)
        .then((res) => {
          this.$vs.notify({
            title: 'Password Changed',
            text: 'Login with your new credentials',
            color: 'success',
          });
          this.$router.push('/login');
        })
        .catch((e) => {
          if (e.response.data.message === 'invalid token') {
            this.$vs.notify({
              title: 'Invalid token',
              text: 'Try again',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Error Occurred',
              text: 'Try again',
              color: 'danger',
            });
          }
        });
    },
    validateForm() {
      if (this.password !== '' && this.passwordError) {
        this.passwordError = false;
      }
      if (this.confirmPassword !== '' && this.confirmPasswordError) {
        this.confirmPasswordError = false;
      }
      if (this.confirmPassword === this.password && this.passwordMatchError) {
        this.passwordMatchError = false;
      }
      return (
        this.password !== '' &&
        this.confirmPassword !== '' &&
        this.confirmPassword === this.password
      );
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
  line-height: 1.7rem;
}

.reset {
  display: flex;
  flex-direction: column;
}
</style>
