<template>
  <div class="popup" v-if="activePopup !== ''" @click="click">
    <profile v-if="activePopup === 'profile'" />
    <reset-password v-if="activePopup === 'resetPassword'" />
  </div>
</template>

<script>
import Profile from './Popups/Profile.vue';
import ResetPassword from './Popups/ResetPassword.vue';
export default {
  data() {
    return {
      msg: 'Hello, Vue!',
      showPopup: false, // Initially, the pop-up is hidden
    };
  },
  components: {
    Profile,
    ResetPassword,
  },
  computed: {
    activePopup() {
      return this.$store.state.room.activePopup;
    },
  },
  mounted() {
    console.log(this.activePopup);
  },
  methods: {
    click(e) {
      console.log(e.currentTarget);
      if (e.currentTarget === e.target) {
        this.$store.commit('room/SET_POPUP', '');
      }
    },
  },
};
</script>
<style scoped>
.popup {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #1f272f67;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
