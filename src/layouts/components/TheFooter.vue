<template>
  <footer v-if="teamsInitialized === true"></footer>

  <footer v-else class="the-footer flex-wrap justify-between" :class="classes">
    <span class="md:flex hidden items-center">
      <span>Created as a #EUvsVirus response to COVID19</span>
      <feather-icon
        icon="HeartIcon"
        svgClasses="stroke-current text-danger w-6 h-6"
        class="ml-2"
      />
    </span>
    <div class="flex justify-between">
      <router-link class="text-black mr-5" to="/terms-of-use"
        >Terms</router-link
      >
      <router-link class="text-black mr-5" to="/privacy-policy">
        Privacy
      </router-link>

      <ChangeLog
        class="inline mr-5"
        style="color: #ffffff"
        headText="What's new"
      />

      <a class="text-black mr-5" href="https://fider.video.wiki/"
        >Features Request
      </a>
    </div>
    <p>
      <span>COPYRIGHT</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://getboarded.com" target="_blank" rel="nofollow"
        >GetBoarded</a
      >&nbsp;
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
  </footer>
</template>

<script>
import * as microsoftTeams from '@microsoft/teams-js';
import ChangeLog from '@/views/cannio/ChangeLog.vue';
import Vue from 'vue';
Vue.component('ChangeLog', ChangeLog);
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String,
    },
  },

  created() {
    var teamsInitialized = false;
    microsoftTeams.initialize(() => {
      teamsInitialized = true;
    });

    setTimeout(() => {
      if (teamsInitialized) {
        this.teamsInitialized = true;
      } else {
        this.teamsInitialized = false;
      }
    }, 1000);
  },
  data() {
    return {
      teamsInitialized: false,
    };
  },
};
</script>
