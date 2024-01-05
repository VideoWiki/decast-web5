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
  <div v-if="!insideIframe" class="relative">
    <div class="navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />
        <vs-spacer />
        <div class="flex mr-4 flex-wrap">
          <Wallet />
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Wallet from './components/Connect_Wallet.vue';

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff',
    },
  },
  components: {
    Wallet,
  },
  beforeCreate(){
    if(document.getElementById('nft-popup'))
    document.getElementById('nft-popup').remove();
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff'
        ? '#10163a'
        : this.navbarColor;
    },
    textColor() {
      return {
        'text-white':
          (this.navbarColor != '#10163a' &&
            this.$store.state.theme === 'dark') ||
          (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark'),
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    // NAVBAR STYLE
    classObj() {
      let classStr = '';
      if (this.$store.state.insideIframe) {
        classStr += 'reduced-width-iframe ';
      }
      if (this.$store.state.verticalNavMenuWidth === 'default')
        classStr += 'navbar-default ';
      else if (this.$store.state.verticalNavMenuWidth === 'reduced')
        classStr += 'navbar-reduced ';
      else classStr += 'navbar-full';
      return classStr;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', true);
    },
  },
};
</script>
<style scoped>
.reduced-width-iframe {
  width: 72% !important;
}
.navbar-wrapper{
  background: #fff;
  z-index: 4120;;
}
</style>
