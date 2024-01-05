<template>
  <div class="w-full">
    <form @submit.prevent="emailDisplay">
      <div>
        <div class="p-5 reset">
          <div class="mb-2 pl-3">
            <p class="my-5 text-lg">
              Enter the email address you used when you joined and we’ll sent
              you instructions to reset your password.
              <br />
              <br />
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email
            </p>
          </div>
          <div class="vx-col m-2 relative">
            <h6 class="my-4 font-black">
              Email Address <span class="text-danger"> *<br /></span>
            </h6>
            <vs-input
              type="text"
              data-vv-validate-on="blur"
              v-validate="'required'"
              @submit="validateEmail"
              name="Email"
              placeholder="Enter your email address"
              class="w-full"
              autocomplete="off"
              v-model="emailReset"
            />
            <span class="text-danger text-sm" id="title" color="danger">
              <p v-if="invalidEmailError">
                Please Enter a valid E-mail Id<br />
              </p>
            </span>
          </div>
          <vs-button
            @click="emailDisplay"
            type="filled"
            class="font-semibold mt-3 mx-1"
            >Send Email</vs-button
          >
        </div>
      </div>
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
  data() {
    return {
      emailReset: '',
      emailError: false,
      invalidEmailError: false,
    };
  },
  props: {},
  computed: {},
  mounted() {
    console.log(this.$route);
  },
  methods: {
    emailDisplay() {
      console.log(!this.validateEmail(this.emailReset));
      if (this.validateEmail(this.emailReset) === true) {
        this.sendResetEmail();
        return;
      }
      this.invalidEmailError = true;
      console.log();
      this.$vs.notify({
        title: 'Invalid Input',
        text: 'Please enter a valid E-mail',
        color: 'danger',
      });
    },
    validateEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
    },
    sendResetEmail() {
      console.log((this.invalidEmailError = false));
      if (this.emailError === false) {
        this.emailError = true;
        setTimeout(() => {
          this.emailError = false;
        }, 5000);
        this.$store
          .dispatch('auth/sendResetEmail', this.emailReset)
          .then((res) => {
            this.$vs.notify({
              title: 'Check your mail',
              text: 'Mail sent successfully',
              color: 'success',
            });
            this.emailReset = '';
          })
          .catch((e) => {
            if (e.response.data.message === 'invalid emaiil') {
              this.$vs.notify({
                title: 'Error occurred',
                text: 'Invalid email ',
                color: 'danger',
              });
            } else {
              this.$vs.notify({
                title: 'Error occurred',
                text: 'Try Again',
                color: 'danger',
              });
            }
          });
      }
    },
    navigateToLogin() {
      if (this.popup) this.$emit('toLogin');
      else this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
/*.overlay-bg {
  top: 0;
  left: 0;
  z-index: 50;
  background-color: #7d7c7977;
  position: fixed;
  width: 42vw;
  height: 100vh;
  display: flex;
  justify-content: right;
  align-items: right;
}*/
.modified-input {
  height: 60px;
  border: none;
  /* border-radius: 16px; */
  background: #e3e2e2;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
}
.company-logo {
  top: 5%;
  left: 10%;
}
.fairsociety-link {
  bottom: 10%;
}
.reset {
  display: flex;
  flex-direction: column;
}
</style>
