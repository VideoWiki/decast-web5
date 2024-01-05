<!-- =========================================================================================
    File Name:
    Description:
    ----------------------------------------------------------------------------------------
    Item Name: ChangeLog UI Template
    Author: Ashwani bhardwaj
========================================================================================== -->

<template>
  <div class="cursor-pointer">
    <span
      v-if="headText != ''"
      v-on:click="logsPrompt = true"
      class="relative py-1 px-2 w-5 h-5 rounded"
      :class="btnTransparent ? 'bg-transparent text-custom-grey' : 'bg-primary'"
    >
      {{ headText }}
      <span
        class="absolute px-1 rounded bg-danger"
        style="right: -13px; top: -8px"
        :class="btnTransparent ? 'text-white' : ''"
        >{{ changelog.length }}</span
      >
    </span>
    <feather-icon
      v-else
      tooltip="what's new"
      class="cursor-pointer mt-1 sm:mr-6 mr-2"
      icon="BellIcon"
      v-on:click="logsPrompt = true"
      >What's New</feather-icon
    >
    <vs-popup
      :active.sync="logsPrompt"
      :title="$t('changelog.title')"
      class="full-width-popup pad-0"
    >
      <vs-button
        v-if="isMobile && !isChangelogSidebarActive"
        @click="isChangelogSidebarActive = true"
        class="bg-primary m-2"
      >
        More Updates
      </vs-button>
      <div
        id="changelog-app"
        class="
          border border-solid
          d-theme-border-grey-light
          rounded
          relative
          overflow-hidden
        "
        style="height: 85vh"
      >
        <vs-sidebar
          class="items-no-padding"
          :click-not-close="clickNotClose"
          :hidden-background="clickNotClose"
          v-model="isChangelogSidebarActive"
        >
          <component
            :is="scrollbarTag"
            class="todo-scroll-area"
            :settings="settings"
            :key="$vs.rtl"
          >
            <div class="todo__filters-container">
              <div class="list-group list-group-labels px-6 py-4">
                <template v-for="filter in logFilters">
                  <span
                    class="flex mt-6 cursor-pointer"
                    :class="{ 'text-primary': logFilter == filter.filter }"
                    :key="filter.filter"
                    v-on:click="setLogFilter(filter.filter)"
                  >
                    <feather-icon
                      :icon="filter.icon"
                      :svgClasses="[
                        {
                          'text-primary stroke-current':
                            logFilter == filter.filter,
                        },
                        'h-6 w-6',
                      ]"
                    ></feather-icon>
                    <span class="text-lg ml-3" style="">{{
                      filter.filterName
                    }}</span>
                  </span>
                </template>
              </div>
            </div>
          </component>
        </vs-sidebar>
        <div
          :class="{ 'sidebar-spacer': clickNotClose }"
          class="
            border border-r-0 border-b-0 border-t-0 border-solid
            d-theme-border-grey-light
            no-scroll-content
          "
          style="height: 100%"
        >
          <div class="relative h-full overflow-auto">
            <component
              :is="scrollbarTag"
              class="content-scroll-area"
              :settings="settings"
              :key="$vs.rtl"
            >
              <div v-for="log in changelog" :key="log.id" class="p-6">
                <div v-if="logFilter == 'all' || log.types.includes(logFilter)">
                  <div class="flex justify-between items-center">
                    <div>
                      <h3>{{ log.title }}</h3>
                      <vs-chip
                        v-for="chip in log.labels"
                        :key="chip.id"
                        class="bg-primary my-2"
                      >
                        <span style="color: #ffffff">{{ chip.name }}</span>
                      </vs-chip>
                      <vs-chip
                        v-for="chip in log.types"
                        :key="chip.id"
                        class="bg-primary my-2"
                      >
                        <span style="color: #ffffff">{{ chip }}</span>
                      </vs-chip>
                    </div>
                    <span class="text-secondary"
                      ><b>{{
                        new Date(log.created) | moment('YYYY-MM-DD')
                      }}</b></span
                    >
                  </div>
                  <div
                    class=""
                    v-for="content in log.text"
                    :key="content.index"
                  >
                    <div v-html="content">
                      {{ content }}
                    </div>
                  </div>

                  <vs-divider></vs-divider>
                </div>
              </div>
            </component>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Moment from 'vue-moment';
import i18n from '../../i18n/i18n';
import ComingSoonVue from '../ComingSoon.vue';
Vue.use(Moment);
export default {
  name: 'ChangeLog',
  props: {
    headText: { type: [String], default: '' },
    btnTransparent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logsPrompt: false,
      clickNotClose: true,
      isChangelogSidebarActive: true,
      changelog: '',
      responseAvailable: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      logFilters: [
        {
          filterName: i18n.t('changelog.lbl0_opt0'),
          filter: 'all',
          icon: 'ArrowRightIcon',
        },
        { filterName: i18n.t('changelog.lbl0_opt1'), filter: 'new', icon: '' },
        {
          filterName: i18n.t('changelog.lbl0_opt2'),
          filter: 'improved',
          icon: '',
        },
        {
          filterName: i18n.t('changelog.lbl0_opt3'),
          filter: 'fixed',
          icon: '',
        },
      ],
      logFilter: 'all',
    };
  },
  components: {
    VuePerfectScrollbar,
  },

  watch: {
    windowWidth() {
      this.setSidebarWidth();
    },
  },
  computed: {
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    isMobile() {
      return this.windowWidth < 900;
    },
  },
  mounted() {},
  methods: {
    //log filter filters and also hides the vs-sidebar if width<900px
    setLogFilter(value) {
      this.logFilter = value;
      this.isChangelogSidebarActive = !this.isMobile;
    },
    setSidebarWidth() {
      if (this.windowWidth < 900) {
        this.isTodoSidebarActive = this.clickNotClose = false;
      } else {
        this.isTodoSidebarActive = this.clickNotClose = true;
        this.isChangelogSidebarActive = true;
        //expand sidebar if resized to bigger size
      }
    },
    fetchChangelog() {
      this.responseAvailable = false;
      fetch(
        'https://canny.io/api/v1/entries/list?apiKey=8b40c895-4535-e58e-71a1-8c0436ae09e6'
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.entries.length) {
            let text = [];
            for (let i = 0; i < result.entries.length; i++) {
              text = result.entries[i].markdownDetails.split('\n');
              result.entries[i].text = text;
              for (let j = 0; j < result.entries[i].text.length; j++) {
                if (result.entries[i].text[j].includes('!')) {
                  const media = result.entries[i].text[j].split(']');
                  if (media.length != 1) {
                    media[1] = media[1].replace(/[()]/g, '');
                    if (
                      media[1].includes('jpeg') ||
                      media[1].includes('jpg') ||
                      media[1].includes('png') ||
                      media[1].includes('gif') ||
                      media[1].includes('webp')
                    ) {
                      result.entries[i].text[j] =
                        "<img class='content-img' style='max-width:100%;max-height:400px;' src='" +
                        media[1] +
                        "' name='aaa' />";
                    } else {
                      result.entries[i].text[j] =
                        "<iframe src='" + media[1] + "'></iframe>";
                    }
                  }
                }
              }
            }
          }
          this.changelog = result.entries;
          this.responseAvailable = true;
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.fetchChangelog();
  },
  created() {
    // this.fetchChangelog();

    this.setSidebarWidth();
  },
};
</script>
<style>
.pre-formatted {
  white-space: pre-line;
}
.full-width-popup {
  width: 100%;
}
.full-width-popup .vs-popup {
  width: 100%;
  height: 100%;
}
.full-width-popup .vs-popup .vs-popup--content {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
