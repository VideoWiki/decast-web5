<template>
  <div class="the-navbar__user-meta flex items-center">
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="flex items-center">
        <vs-icon icon-pack="feather" icon="icon icon-chevron-down" />
        <div class="con-img ml-3">
          <vs-avatar
            :text="getFirstLetter(activeUserInfo.first_name)"
            color="primary"
            class="m-0 shadow-md"
            :src="activeUserInfo.profile_pic ? activeUserInfo.profile_pic : ''"
            size="40px"
          />
        </div>
      </div>
      <vs-dropdown-menu class="vx-navbar-dropdown">
        <template v-if="forClassroom">
          <ul style="min-width: 9.3rem">
            <a
              :href="url + '/profile'"
              class="text-custom-grey"
              target="_parent"
            >
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">My Profile</span>
              </li>
            </a>
            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="logout"
            >
              <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Logout</span>
            </li>
          </ul>
        </template>
        <ul style="min-width: 9.3rem" v-else>
          <router-link to="/profile" class="text-custom-grey">
            <li class="flex px-2 cursor-pointer hover hover:text-white">
              <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">{{ $t('ProfileDropDown.profile') }}</span>
            </li>
          </router-link>
          <vs-divider class="m-1" />
          <li
            class="flex px-2 cursor-pointer hover hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">{{ $t('ProfileDropDown.logout') }}</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { utils } from '@/mixins/index';
import constants from '../../../../../constant';

export default {
  mixins: [utils],
  data() {
    return { url: constants.url };
  },
  props: {
    forClassroom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    getClassroomLink() {
      return `https://room.video.wiki/b/start_class?name=${this.activeUserInfo.first_name}&email=${this.activeUserInfo.email}`;
    },
  },
  methods: {
    logout() {
      this.$cookies.remove('userId');
      this.$cookies.remove('Token');
      this.$router.push('/');
      localStorage.clear();
      return this.$store.dispatch('auth/logOut');
    },
  },
};
</script>
<style>
.user-img-icon {
  background: white;
}
.vs-dropdown--menu--after {
  background: transparent;
}
.vs-dropdown--custom,
.vs-dropdown--menu {
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #a6a6a8;
}

.hover:hover {
  background: #31394e78;
}
</style>
