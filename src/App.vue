<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
    <vs-popup
      title="Login/Register"
      id="login-popup"
      ref="login-popup"
      :active.sync="authPopup"
    >
      <!-- <iframe
        src="/signup"
        style="width: 500px; height: 77vh"
        allowtransparency="true"
      ></iframe> -->
      <SignUp
        v-if="authPopup === 12"
        :popup="true"
        @loggedIn="$store.commit('TOGGLE_LOGIN_POPUP', false)"
        @toRegister="login = false"
      />
      <PasswordReset v-else-if="authPopup === 11" />
      <Login v-else />
    </vs-popup>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js';
import Login from '@/views/login/LoginNew';
import SignUp from '@/views/register/SignUp';
import PasswordReset from './views/passwordReset/PasswordReset.vue';
export default {
  data() {
    return {
      vueAppClasses: [],
      login: true,
    };
  },
  components: {
    Login,
    SignUp,
    PasswordReset,
  },
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val);
    },
    '$vs.rtl'(val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr');
    },
  },
  computed: {
    authPopup: {
      get() {
        return this.$store.state.authPopup;
      },
      set(value) {
        this.$store.commit('TOGGLE_LOGIN_POPUP', value);
      },
    },
  },
  methods: {
    toggleClassInBody(className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark');
        document.body.classList.add('theme-dark');
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-semi-dark');
      } else {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark');
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark');
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);
      this.$store.commit('UPDATE_WINDOW_HEIGHT', window.innerHeight);

      // Set --vh property
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    },
    handleScroll() {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY);
    },
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    this.$refs['login-popup'].$el.childNodes[1].childNodes[0].style.display =
      'none';
    console.log(this.$refs['login-popup'].$el);
    console.log(document.getElementById('login-popup'));
    var styles = {
      padding: 0,
      margin: 0,
      width: '500px',
      overflow: 'hidden',
    };
    var obj = document.getElementsByClassName('vs-popup--content')[0];
    Object.assign(obj.style, styles);
    styles = {
      background: 'transparent',
      boxShadow: 'none',
      width: '500px',
      minWidth: '500px !important',
      overflow: 'hidden',
    };
    this.$refs['login-popup'].$el.childNodes[1].style.cssText =
      'min-width:500px !important';
    obj = document.getElementsByClassName('vs-popup')[0];
    Object.assign(obj.style, styles);
  },
  async created() {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    if (window.location !== window.parent.location) {
      this.$store.commit('SET_IFRAME_STATUS', true);
    }
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style>
input {
  font-family: Montserrat;
}
body {
  background: none transparent;
}
</style>
<style lang="scss" scoped>
iframe {
  overflow: hidden;
}

.vs-popup--content {
  margin: 0;
  padding: 0;
  border-radius: 10px;
  background: #1f272f;
}
</style>
