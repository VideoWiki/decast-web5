<template>
  <div class="wrapper">
    <div class="heading flex">
      <div class="flex left-part">
        <img src="@/assets/images/dashboard/Vector31.svg" />
        <p class="text">Event is Live - Test Cast</p>
        <p class="name">by Aman Bishnoi</p>
      </div>
      <img class="cross" src="@/assets/images/create-event/Vector30.svg" />
    </div>
    <div class="buttons flex">
      <p
        @click="changeTab('Verification')"
        v-bind:class="{ active: activeSection === 'Verification' }"
      >
        Verification
      </p>
      <p
        @click="changeTab('Join')"
        class="join-text"
        v-bind:class="{ active: activeSection === 'Join' }"
      >
        Join
      </p>
    </div>
    <div v-if="activeSection === 'Verification'" class="verifie">
      <p class="same">
        This is a private secure event, so let’s just verify that it is really
        you.
      </p>
      <div class="input-section">
        <p>Email *</p>
        <input
          class="take-input"
          type="email"
          placeholder="jangubisnoi@gmail.com"
        />
      </div>
      <div class="otp-text">
        We will send an OTP to your email to verify your email. This does not
        create your VideoWiki account.
      </div>
      <div v-if="showOTP" class="input-section">
        <p>OTP *</p>
        <input class="take-input" type="text" placeholder="Enter OTP" />
      </div>
      <div class="flex buttonn">
        <button v-if="showOTP" class="submit verify">Verify</button>
        <button class="submit" @click="showOTPbox">Request OTP</button>
      </div>
    </div>
    <div v-else class="join">
      <p class="same">Enter your name to join the event.</p>
      <div class="input-section">
        <p>Your name *</p>
        <input class="take-input" type="email" placeholder="John Doe" />
      </div>
      <button class="submit">Join</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'JoinPrivateCast',
  data() {
    return {
      activeSection: 'Verification',
      showOTP: false,
    };
  },
  methods: {
    changeTab(tabName) {
      this.activeSection = tabName;
    },
    showOTPbox() {
      this.showOTP = true;
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 450px;
  height: auto;
  background-color: #1f272f;
  border-radius: 10px;
  padding: 14px;
}
.heading {
  justify-content: space-between;
}
.text {
  color: #d7df23;
  font-size: 14px;
  font-weight: 600;
}
.name {
  color: #a6a6a8;
  padding-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
.cross {
  width: 12px;
  height: 12px;
  margin-top: -5px;
  margin-right: -5px;
}
.buttons {
  margin-top: 28px;
}
.buttons p {
  width: fit-content;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #a6a6a8;
}
.active {
  color: #31a2f4 !important;
  display: inline-block;
}

.active::after {
  content: '';
  display: block;
  border-bottom: 2px solid #31a2f4; /* Adjust the thickness and color of the underline as needed */
  margin-top: 3px;
}
.join-text {
  margin-left: 60px;
}
.same {
  margin-top: 26px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.input-section {
  margin-top: 20px;
}
.input-section p {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
  margin-bottom: 3px;
}
.take-input {
  width: 100%;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #1d232b;
  padding: 14px;
  border-radius: 6px;
  color: #a6a6a8;
  font-size: 13px;
  font-weight: 400;
}
.otp-text {
  margin-top: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #a6a6a8;
}
.submit {
  margin-top: 20px;
  width: 115px;
  height: 34px;
  background-color: #d7df23;
  border: 1px solid #31394e;
  font-size: 12px;
  font-weight: 500;
  color: #181a20;
  border-radius: 6px;
  align-self: flex-end;
}
.buttonn {
  align-self: flex-end;
}
.verifie,
.join {
  display: flex;
  flex-direction: column;
}
.verify {
  margin-right: 5px;
}
</style>
