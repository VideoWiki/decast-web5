<template>
  <div>
    <div class="">
      <ThirdStep
        :public="false"
        :public_auth="false"
        :payload="payload"
        :password_auth="true"
        :otp-auth="false"
      />
    </div>
  </div>
</template>

<script>
import ThirdStep from './ThirdStep.vue';
export default {
  components: { ThirdStep },
  data() {
    return {
      email: '',
      name: '',
      skippedStep: false,
      payload: {},
      emailGiven: false,
    };
  },
  props: ['nft'],
  computed: {
    validateEmail() {
      return !this.errors.any() && this.email !== '';
    },
    walletAddress() {
      return this.$store.state.auth.isGetWalletAddress;
    },
  },
  created() {
    this.walletAddress;
  },
  methods: {
    async nextStep() {
      this.emailGiven = true;
      this.payload = {
        email: this.email.toLowerCase(),
        cast_id: this.$route.params.session_key,
      };
    },
    skipStep() {
      this.skippedStep = true;
    },
  },
};
</script>

<style scoped>
.line {
  position: absolute;
  width: 40rem;
  height: 0px;
  top: 25rem;
  left: -15rem;
  border: 1px solid rgba(175, 165, 165, 0.527);
  transform: rotate(90.23deg);
}

.step {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 3.5em;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3em;
  width: 3em;
  height: 3em;
  background: #c4c4c4;
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

.verification-box > h2 {
  align-items: center;
  justify-content: center;
  display: flex;
}

.verification-input {
  height: 60px;
  border: none;
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

.verification-img {
  position: absolute;
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

  .line {
    top: 20rem;
    width: 30rem;
    left: -13rem;
  }
  .step {
    left: 1em;
  }
  .verification-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 2rem;
    width: 100% !important;
  }

  .verification-img {
    display: none !important;
  }
}
</style>
