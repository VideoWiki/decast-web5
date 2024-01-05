<template>
  <div class="margin">
    <div class="flex justify-between items-center">
      <div class="popup-text">Set up your cast</div>
      <img
        @click="closeCreate"
        class="cursor-pointer"
        src="@/assets/images/editor/cross.svg"
        alt=""
      />
    </div>
    <div class="popup-svg">
      <img src="@/assets/images/create-event/trophy.svg" />
    </div>
    <div class="popup-text2">Your Cast was created successfully!</div>
    <div class="my-5 flex justify-center">
      <button
        class="success-btn stream flex justify-around items-center"
        @click="changeStatus('stream')"
      >
        <img src="@/assets/images/create-event/Cam.svg" />Stream your cast on
        other apps
      </button>
      <button
        @click="changeStatus('invite')"
        class="success-btn invite flex justify-around items-center"
      >
        <img src="@/assets/images/create-event/users.svg" />Share and Invite
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello, Vue!',
      showPopup: false, // Initially, the pop-up is hidden
    };
  },
  props: ['closeCreate', 'changeStatus'],
  mounted() {},
  methods: {
    closePopup() {
      this.showPopup = false; // Close the popup when the SVG is clicked
      console.log('Popup closed');
    },
  },
};
</script>
<style scoped>
.margin {
  margin: 18px;
}
.popup-text {
  font-family: Karla;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.37px;
  letter-spacing: 0em;
  text-align: left;
  color: #a6a6a8;
}

.popup-svg {
  width: 133px;
  height: 120px;
  left: 2543px;
  margin: 0 auto;
  margin-top: 35px;
}

.popup-text2 {
  font-family: Karla;
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #d7df23;
  padding-top: 22px;
}

.success-btn {
  display: flex;
  font-size: 12px;
  font-family: Karla;
  padding: 15px;
  font-weight: 600;
  border-radius: 6px;
  height: 40px;
  border: 1px;
  margin: 0 10px;
  cursor: pointer;
}
.stream {
  width: 242px;
  background: #31394e;
  color: #a6a6a8;
}
.invite {
  width: 168px;
  color: #31394e;
  background: #d7df23;
}
</style>
