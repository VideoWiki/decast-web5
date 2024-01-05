<template>
  <div class="relative">
    <div class="vx-navbar-wrapper nav navbar-full p-0">
      <vs-navbar class="navbar-custom navbar-skelton custom-header responsive">
        <div class="flex justify-between lg:w-11/12 w-full">
          <router-link
            tag="div"
            to="/"
            class="vx-logo cursor-pointer md:flex items-center hidden"
          >
            <img
              src="@/assets/images/logo/logo.svg"
              class="mr-2 text-custom-purple h-16"
            />
            <span
              class="vx-logo-text text-dark hidden sm:block md:block lg:block"
              >{{ $t('Navbar.videowiki') }}</span
            >
          </router-link>
          <feather-icon
            class="sm:inline-flex lg:hidden md:hidden cursor-pointer p-2"
            icon="MenuIcon"
            @click.stop="showSidebar"
          />
          <div class="flex items-center text-center -mx-3">
            <div
              class="lg:flex md:flex hidden items-center -mx-base px-3"
              id="navBar"
            >
              <div class="navItem px-base">
                <a
                  href="https://video.wiki/studio"
                  target="_blank"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Editor
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary">{{ $t('Navbar.create') }}</span>
                  </vs-chip>
                </a>
              </div>
              <div v-if="this.alreadyLogged == true" class="navItem px-base">
                <router-link
                  to="/createEvent"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Cast
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary">{{ $t('Navbar.events') }}</span>
                  </vs-chip></router-link
                >
              </div>
              <div v-if="this.alreadyLogged == false" class="navItem px-base">
                <!-- <router-link
                  to="/dashboard"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Course
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary font-bold">CREATE</span>
                  </vs-chip></router-link
                > -->
                <router-link
                  to="/login/"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Cast
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary">{{ $t('Navbar.events') }}</span>
                  </vs-chip></router-link
                >
              </div>
              <div class="navItem px-base">
                <router-link
                  to="/room"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Room
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary">Class</span>
                  </vs-chip></router-link
                >
              </div>

              <div class="navItem px-base">
                <community-drop-down />
              </div>
            </div>
            <div class="px-3">
              <profile-drop-down v-if="accessToken" />
              <vs-button
                v-else
                class="font-bold text-base lg:text-lg"
                type="filled"
                @click="handleLogin"
                >{{ $t('Navbar.login') }}</vs-button
              >
            </div>
            <VideoWikiChat />
            <InviteLinkPopup v-if="this.cast_Id && this.cast_Id !== ''" />
          </div>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from './components/ProfileDropDown.vue';
import CommunityDropDown from './components/CommunityDropDown.vue';
import VideoWikiChat from '../../../views/VideoWikiChat';
import { mapState } from 'vuex';
import InviteLinkPopup from '../../../views/InviteLinkPopup.vue';

export default {
  name: 'the-navbar-horizontal',
  components: {
    ProfileDropDown,
    CommunityDropDown,
    VideoWikiChat,
    InviteLinkPopup,
  },
  data() {
    return {
      alreadyLogged: false,
    };
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    cast_Id() {
      const localCast = JSON.parse(localStorage.getItem('Instant_cast'));
      if ('Instant_cast' in localStorage) {
        if (
          localCast.public_cast_id !== 'null' ||
          localCast.public_cast_id !== 'undefined'
        ) {
          return localCast.public_cast_id;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  created() {
    this.checkLogin();
  },
  methods: {
    handleLogin() {
      this.$store.commit('TOGGLE_LOGIN_POPUP', true);
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        return (this.alreadyLogged = true);
      } else {
        this.alreadyLogged = false;
      }
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    },
  },
};
</script>
<style lang="scss" scoped>
.nav {
  font-family: Arial, Helvetica, sans-serif !important;
  position: fixed;
  top: 0;
}

.custom-header {
  height: 100px;
  background: white !important;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
}
.create-chip {
  top: -17px;
  left: -37px;
  min-height: 10px !important;
  visibility: hidden;
}
.create-chip span {
  font-size: 11px;
}
#navBar {
  .link-active {
    font-weight: bold;
  }
  .link-active .create-chip {
    visibility: visible;
  }
}

.navItem {
  font-weight: 490;
  box-sizing: border-box;
  width: 150px;
  text-align: center;
}
.navItem a {
  cursor: pointer;
}
.navItem a:hover {
  font-weight: bold;
  cursor: pointer !important;
}
.navItem a:hover .create-chip {
  visibility: visible;
}
</style>
