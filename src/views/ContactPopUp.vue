<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full min-h-screen p-4"
    style="min-width: 100vw"
  >
    <div
      class="flex flex-col absolute bg-black bg-opacity-50 min-h-screen z-50"
      style="min-width: 100vw; backdrop-filter: blur(5px)"
      @click="closePopUp"
    ></div>

    <div
      class="wrapper flex flex-col justify-center items-center gap-6 w-full lg:w-7/12 max-w-md px-4 py-8 lg:px-6 lg:py-8"
    >
      <div class="heading-part w-full flex justify-between">
        <h3>Contact Us</h3>
        <img
          class="cursor-pointer"
          src="@/assets/images/create-event/Vector.svg"
          @click="closePopUp"
        />
      </div>
      <div
        class="input-part flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full"
      >
        <input placeholder="Your Name" type="text" class="input-box w-full" v-model="formData.name"/>
        <input placeholder="Your Email" type="email" class="input-box w-full" v-model="formData.email"/>
      </div>
      <div
        class="input-part flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full"
      >
        <input placeholder="Your Phone No." class="input-box w-full" type="tel" pattern="[0-9]*" v-model="formData.phone"/>
        <input placeholder="Other Phone" class="input-box w-full" type="tel" pattern="[0-9]*" v-model="formData.otherphone"/>
      </div>
      <div
        class="input-msg flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full"
      >
        <textarea class="msg w-full" placeholder="Your Message" v-model="formData.message"></textarea>
      </div>
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>
<script>
import constants from '../../constant';
import axios from '../axios';
export default {
  name: 'ContactPopUp',
  props: {
    showContactPopUp: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
        phone: '',
        otherphone: '',
      },
    };
  },
  methods: {
    closePopUp() {
      this.$emit('updateContactPopUp', false);
    },
    async sendMessage() {
      if (
        !this.formData.name ||
        !this.formData.email ||
        !this.formData.message
      ) {
        this.$vs.notify({
            title: 'Error',
            text: 'Basic fields are mandatory',
            color: 'danger',
          });
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.formData.email)) {
        this.$vs.notify({
            title: 'Error',
            text: 'Incorrect email',
            color: 'danger',
          });
        return;
      }

      const phonePattern = /^\d+$/;
      if (this.formData.phone && !phonePattern.test(this.formData.phone)  || this.formData.phone.length !== 10) {
        this.$vs.notify({
            title: 'Error',
            text: 'Mention a valid number',
            color: 'danger',
          });
        return;
      }

      try {
        const response = await axios.post(
          constants.apiCastUrl+"/api/contact_us/",
          this.formData
        );
        this.$vs.notify({
            title: 'Successful',
            text: 'Response recieved',
            color: 'success',
          });
        this.resetForm();
      } catch (error) {
        this.$vs.notify({
            title: 'Error',
            text: 'Try again',
            color: 'danger',
          });
        console.error('Error sending message:', error);
      }
    },
    resetForm() {
      this.formData.name = '';
      this.formData.email = '';
      this.formData.message = '';
      this.formData.phone = '';
      this.formData.otherphone = '';
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: auto;
  background-color: #181a20;
  border-radius: 8px;
  display: flex;
  z-index: 999;
}
.heading-part {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
h3 {
  font-size: 16px;
  font-weight: 500;
  color: #a6a6a8;
}
.input-part {
  display: flex;
}
.input-box {
  height: 45px;
  border: 1px solid #1f272f;
  background-color: #31394e;
  border-radius: 4px;
  padding: 0px 12px;
  color: #a6a6a8;
  font-size: 13px;
  font-weight: 600;
}
.msg {
  padding: 12px;
  height: 109px;
  resize: none;
  background-color: #31394e;
  border: 1px solid #1f272f;
  color: #a6a6a8;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}
button {
  width: 191px;
  height: 45px;
  background-color: #d7df23;
  border: 1px solid #1f272f;
  color: #000000;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}
</style>
