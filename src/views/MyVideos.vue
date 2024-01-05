<template>
  <div>
    <TheHeader />
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="
            knowledge-base-jumbotron-content
            lg:p-32
            md:p-24
            sm:p-16
            p-8
            rounded-lg
            mb-base
          "
        >
          <h1 class="mb-1">My Events</h1>
          <p class="">lorem ipsum dolor</p>
          <vs-input
            icon-no-border
            placeholder="Search Topic or Keyword"
            v-model="knowledgeBaseSearchQuery"
            icon-pack="feather"
            icon="icon-search"
            size="large"
            class="w-full mt-6"
          />
        </div>
      </div>

      <!-- KNOWLEDGE BASE CARDS  -->
      <div class="vx-row">
        <div
          class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
          v-for="item in filteredKB"
          :key="item.id"
          @click="$router.push(item.url).catch(() => {})"
        >
          <vx-card class="text-center cursor-pointer">
            <img
              :src="item.graphic"
              alt="graphic"
              width="180"
              class="mx-auto mb-4"
            />
            <h4 class="mb-2">{{ item.title.toUpperCase() }}</h4>
            <small>{{ item.description }}</small>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/TheNavbarHorizontal';
import VideoCard from './dashboard/components/VideoCard';
import axios from '../axios';
import { GitBranchIcon } from 'vue-feather-icons';
import constants from '../../constant';
export default {
  name: 'MyVideos',
  components: {
    TheHeader,
    VideoCard,
    GitBranchIcon,
  },
  data() {
    return {
      myVideoList: [],
      isLoading: false,
      videoTabIndex: 0,
      pageNumber: 1,
      totalItems: 0,
      knowledgeBaseSearchQuery: '',
      kb: [
        {
          id: 1,
          title: 'Event 1',
          description:
            'Muffin lemon drops chocolate carrot cake chocolate bar sweet roll.',
          graphic: require('@/assets/images/pages/graphic-1.png'),
          url: '/pages/knowledge-base/category',
        },
        {
          id: 2,
          title: 'Event 2',
          description:
            'Gingerbread sesame snaps wafer soufflé. Macaroon brownie ice cream',
          graphic: require('@/assets/images/pages/graphic-2.png'),
          url: '/pages/knowledge-base/category',
        },
        {
          id: 3,
          title: 'Event 3',
          description:
            'cotton candy caramels danish chocolate cake pie candy. Lemon drops tart.',
          graphic: require('@/assets/images/pages/graphic-3.png'),
          url: '/pages/knowledge-base/category',
        },
        {
          id: 4,
          title: 'Event 4',
          description:
            'Pudding oat cake carrot cake lemon drops gummies marshmallow.',
          graphic: require('@/assets/images/pages/graphic-4.png'),
          url: '/pages/knowledge-base/category',
        },
        {
          id: 5,
          title: 'Event 5',
          description: 'Gummi bears pudding icing sweet caramels chocolate',
          graphic: require('@/assets/images/pages/graphic-5.png'),
          url: '/pages/knowledge-base/category',
        },
        {
          id: 6,
          title: 'Event 6',
          description:
            'Dragée jelly beans candy canes pudding cake wafer. Muffin croissant.',
          graphic: require('@/assets/images/pages/graphic-6.png'),
          url: '/pages/knowledge-base/category',
        },
      ],
    };
  },
  computed: {
    usersData() {
      return this.$store.state.AppActiveUser;
    },
    filteredKB() {
      return this.kb.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase())
      );
    },
    videoType() {
      let type = '';
      switch (this.videoTabIndex) {
        case 0:
          type = 'published';
          break;
        case 1:
          type = 'saved';
          break;
        case 2:
          type = 'forked';
          break;
        case 3:
          type = 'classroom';
          break;
      }
      return type;
    },
    notFoundMessage() {
      return `You haven't ${this.videoType} any videos yet`;
    },
    totalPages() {
      return this.totalItems % 15 === 0
        ? parseInt(this.totalItems / 15)
        : parseInt(this.totalItems / 15) + 1;
    },
  },
  watch: {
    videoTabIndex: function (newVal, oldVal) {
      this.getUserVideos(1);
      this.pageNumber = 1;
    },
    pageNumber: function (newVal) {
      this.getUserVideos(newVal);
    },
  },
  mounted() {
    this.getUserVideos(1);
  },
  methods: {
    setTabIndex(idx) {
      this.videoTabIndex = idx;
    },
    components: {},
    getUserVideos(pageNumber) {
      this.$vs.loading({
        background: 'transparent',
        container: `#video-container`,
      });
      this.isLoading = true;
      this.myVideoList = [];
      axios
        .get(
          constants.apiUrl +
            `/api/user_videos?page=${pageNumber}&user_id=${this.usersData.id}&video_type=${this.videoType}`
        )
        .then((res) => {
          this.totalItems = res.data.count;
          this.myVideoList = res.data.results;
        })
        .catch((err) => {
          this.$vs.notify({
            title: this.$t('MyVideos.notify.title'),
            text:
              err.response != null && err.response.data != null
                ? err.response.data.message
                : this.$t('MyVideos.notify.text'),
            color: 'danger',
          });
        })
        .finally(() => {
          this.$vs.loading.close(`#video-container > .con-vs-loading`);
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped>
.section-header {
  padding: 4rem 0 2rem 0;
}
ul {
  padding: 2.5rem 0;
}
li {
  padding: 0.2rem 5.5rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
li:not(:last-child) {
  margin-bottom: 2rem;
}
.active-tab-bar {
  position: absolute;
  width: 5px;
  height: 100%;
  background: #7247c4;
  border-radius: 0px 5px 5px 0;
  display: none;
  left: 0;
  top: 0;
}
li.activeTab .active-tab-bar {
  display: inline;
}
.activeTab {
  color: #7247c4;
}
</style>
