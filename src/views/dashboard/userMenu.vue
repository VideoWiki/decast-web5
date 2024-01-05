<template>
  <div v-if="showMenu" class="user-menu">
    <!-- Add your menu options here -->
    <div class="option toggle-profile" @click="toggleProfile">
      <img src="@/assets/images/usermenu.svg" />
      My Profile
    </div>
    <div class="option" @click="togglePass">
      <img src="@/assets/images/setting.svg" />
      Reset Password
    </div>
    <div class="option">
      <img src="@/assets/images/guide.svg" />
      Guide
    </div>
    <div class="option">
      <img src="@/assets/images/help.svg" />
      Help Center
    </div>
    <div class="option" @click="showDelete">
      <img src="@/assets/images/export.svg" />
      Logout
    </div>
    <!---  Confirmation Popup -->
    <div class="popup" v-if="showDeletePopup">
      <DeleteConfirmation
        :type="type"
        @confirm="logout"
        @hide="closeDeletePopup"
      />
    </div>
  </div>
</template>
<script>
import DeleteConfirmation from '../dashboard/components/DeleteConfirmation.vue';
export default {
  name: 'userMenu',
  data() {
    return {
      showDeletePopup: false,
      type: 'logout',
    };
  },
  components: {
    DeleteConfirmation,
  },
  props: {
    showMenu: Boolean,
    closeMenu: Function,
  },
  mounted() {
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    showDelete() {
      this.showDeletePopup = true;
    },
    closeDeletePopup() {
      this.showDeletePopup = false;
    },
    logout() {
      this.$cookies.remove('userId');
      this.$cookies.remove('Token');
      this.$router.push('/');
      return this.$store.dispatch('auth/logOut');
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.user-menu');
      const isNotMenu = !event.target.closest('.con-img');
      const mobSet = !event.target.closest('.ppp');
      if (
        isOutsideRoomPopup &&
        isNotMenu &&
        mobSet &&
        this.showMenu !== false
      ) {
        this.showMenu = false;
        this.$emit('menu-closed');
      }
    },
    toggleProfile() {
      this.closeMenu();
      this.$store.commit('room/SET_POPUP', 'profile');
    },
    togglePass() {
      this.closeMenu();
      this.$store.commit('room/SET_POPUP', 'resetPassword');
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles for the user menu here */
.user-menu {
  position: absolute;
  background-color: #1f272f;
  width: 145px;
  height: 186px;
  border: 1px solid #31394e;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 12px;
  color: #ffffff;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 0;
  right: 5%;
}

.option {
  background: none;
  cursor: pointer;
  border: none;
  color: #a6a6a8;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 5px 10px;
}

.option:hover {
  background: #31394e7d;
  color: #fff;
}

.option:active {
  color: #ffffff;
}

.option img {
  margin-right: 5px;
}

@media (max-width: 499px) {
  .user-menu {
    width: fit-content;
    padding: 5px;
    font-size: 10px;
    height: auto;
  }

  .option {
    padding: 5px;
  }
}
</style>
<style scoped>
.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  width: 100%;
  /* max-width: 500px; */
  margin: auto;
  margin-left: 37px;
  /* border: 1px solid white; */
  height: 100%;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Add other styles as needed */
}
</style>
