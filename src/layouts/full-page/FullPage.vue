<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="layout--full-page">
    <!-- <v-nav-menu
      title="VideoWiki"
      :navMenuItems="navMenuItems"
      parent=".layout--full-page"
    /> -->
    <!-- <navbar-horizontal navbarType="static" class="text-base" /> -->
    <router-view></router-view>
    <!-- <the-footer />   -->
    <!-- <back-to-top
      bottom="8rem"
      :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
      visibleoffset="500"
      v-if="!hideScrollToTop"
    >
      <vs-button
        icon-pack="feather"
        icon="icon-arrow-up"
        class="shadow-lg btn-back-to-top"
      />
    </back-to-top> -->
  </div>
</template>

<script>
import themeConfig from '../../../themeConfig';
import BackToTop from 'vue-backtotop';
import NavbarHorizontal from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems.js';
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue';
import TheFooter from '@/layouts/components/footer/TheFooter';

export default {
  components: {
    NavbarHorizontal,
    VNavMenu,
    TheFooter,
    BackToTop,
  },
  data() {
    return {
      hideScrollToTop: themeConfig.hideScrollToTop,
    };
  },
  computed: {
    navMenuItems() {
      return navMenuItems;
    },
  },
};
</script>
