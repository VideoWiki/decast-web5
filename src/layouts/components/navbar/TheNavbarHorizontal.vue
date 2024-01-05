<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper nav navbar-full p-0" style="height: auto">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >
        <!--      <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" />-->

        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer mr-auto flex items-center"
        >
          <!--logo class="w-10 mr-4 fill-current text-primary" /-->
          <img src="@/assets/images/logo/logo.svg" class="mr-2 h-12" />
          <span class="vx-logo-text text-custom-purple">VideoWiki</span>
        </router-link>

        <!--      <search-bar />-->

        <!--      <notification-drop-down />-->
        <profile-drop-down v-if="isUserLoggedIn()" />
        <vs-button v-else color="primary" href="/login" type="filled"
          >Sign In</vs-button
        >
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from './components/Bookmarks.vue';
import SearchBar from './components/SearchBar.vue';
import NotificationDropDown from './components/NotificationDropDown.vue';
import ProfileDropDown from './components/ProfileDropDown.vue';
import Logo from '../Logo.vue';
import { mapState } from 'vuex';

export default {
  name: 'the-navbar-horizontal',
  props: {
    logo: { type: String },
    navbarType: {
      type: String,
      required: false,
    },
  },
  components: {
    Logo,
    Bookmarks,
    SearchBar,
    NotificationDropDown,
    ProfileDropDown,
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    navbarColor() {
      let color = '#fff';
      if (this.navbarType === 'sticky') color = '#f7f7f7';
      else if (this.navbarType === 'static') {
        // if (this.scrollY < 50) {
        //   color = "#f7f7f7"
        // }
      }

      this.isThemedark === 'dark'
        ? color === '#fff'
          ? (color = '#10163a')
          : (color = '#262c49')
        : null;

      return color;
    },
    isThemedark() {
      return this.$store.state.theme;
    },
    navbarStyle() {
      return this.navbarType === 'static'
        ? { transition: 'all .25s ease-in-out' }
        : {};
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === 'static'
        ? null
        : 'd-theme-dark-light-bg shadow-none';
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
};
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0;
}
.navbar-full {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
