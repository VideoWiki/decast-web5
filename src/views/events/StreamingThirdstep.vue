<template>
  <div>
    <form :class="[this.public && !this.public_auth ? 'join-box' : '']">
      <div>
        <span v-if="!this.public_auth">
          <h2 class="font-semibold text-4xl my-4">Join Event</h2>
          <h4 class="mb-4">Enter your name to Access the stream</h4>
        </span>
        <span v-if="this.public_auth">
          <h2 class="font-semibold text-2xl my-4">Click to join the stream</h2>
        </span>
        <div v-if="!public_auth">
          <div class="flex">
            <h6 class="text-xl my-4">
              Name
              <span class="text-danger">*</span>
            </h6>
          </div>

          <input
            class="verification-input text-xl"
            v-validate="'required'"
            name="Name"
            placeholder="Enter name"
            autocomplete="off"
            v-model="name"
          />
          <p>
            Your name will be shown to other event attendees and organizers for
            attending the event, chats and logs.
          </p>
        </div>

        <div class="flex flex-wrap my-3">
          <vs-button
            class="flex-1 font-bold h-16"
            :disabled="!validateForm"
            @click.prevent="joinStreaming"
            >Access Streaming</vs-button
          >
        </div>
      </div>
    </form>
    <div>
      <img
        class="verification-img"
        src="@/assets/images/verification/display.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      public_auth: '',
      public: '',
    };
  },
  computed: {
    validateForm() {
      return (!this.errors.any() && this.name !== '') || this.public_auth;
    },
  },
  methods: {
    joinStreaming() {
      sessionStorage.setItem('username', this.name);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.join-box {
  margin-top: 5em;
  margin-left: 32em;
  padding: 5em;
  width: 40% !important;
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
  z-index: 1;
  padding: 0px;
  margin: 0px;
  width: 35%;
}
@media screen and (max-device-width: 480px) {
  .join-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 20rem;
    width: 100% !important;
  }
  .verification-img {
    display: none !important;
  }
}
</style>
