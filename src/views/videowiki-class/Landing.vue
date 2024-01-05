<template>
  <div>
    <div class="bg-white pb-base lg:pb-0">
      <div class="banner relative">
        <the-header navbarType="static" class="text-base" />
        <div class="text-center intro">
          <h1 class="lg:text-6xl font-extrabold mb-8 mt-2 text-5xl text-white">
            {{ $t('ClassLanding.Welcome.title') }}
          </h1>
          <p class="lg:text-2xl text-xl text-white lg:w-3/5 w-4/5 mx-auto">
            {{ $t('ClassLanding.Welcome.para') }}
          </p>
        </div>
        <div>
          <img
            src="../../assets/images/pages/videowikiClass/vwclass-intro.png"
            height="auto"
            width="100%"
          />
        </div>
      </div>
    </div>
    <div class="bg-white features">
      <div class="lg:w-4/5 w-full mx-auto pb-20">
        <div class="text-center mb-base">
          <h1 class="font-extrabold mb-4 lg:text-4xl text-3xl">
            {{ $t('ClassLanding.Features.title1') }}
          </h1>
        </div>
        <div class="flex flex-wrap -m-6">
          <template v-for="(feature, idx) in featureList">
            <div class="p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/3" :key="idx">
              <vx-card class="w-full h-full">
                <div slot="no-body" class="card-img h-36">
                  <img :src="getCardIcon(feature.icon)" :alt="feature.icon" />
                </div>
                <div class="text-center">
                  <h5 class="mb-2 font-semibold text-xl mb-8">
                    {{ feature.title }}
                  </h5>
                  <p>{{ feature.description }}</p>
                </div>
              </vx-card>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="pt-20 pb-20 w-5/6 mx-auto">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/videowiki-class/Navbar.vue';
import NewsLetter from '@/views/components/NewsLetter';
export default {
  components: {
    TheHeader,
    NewsLetter,
  },
  data() {
    return {
      featureList: [
        {
          icon: 'play-circle',
          title: this.$t('ClassLanding.Features.record_t'),
          description: this.$t('ClassLanding.Features.record_p'),
        },
        {
          icon: 'edit',
          title: this.$t('ClassLanding.Features.white_t'),
          description: this.$t('ClassLanding.Features.white_p'),
        },
        {
          icon: 'monitor',
          title: this.$t('ClassLanding.Features.screenShare_t'),
          description: this.$t('ClassLanding.Features.screenShare_p'),
        },
        {
          icon: 'mic',
          title: this.$t('ClassLanding.Features.audio_t'),
          description: this.$t('ClassLanding.Features.audio_p'),
        },
        {
          icon: 'trello',
          title: this.$t('ClassLanding.Features.present_t'),
          description: this.$t('ClassLanding.Features.present_p'),
        },
        {
          icon: 'video',
          title: this.$t('ClassLanding.Features.webcam_t'),
          description: this.$t('ClassLanding.Features.webcam_p'),
        },
        {
          icon: 'smile',
          title: this.$t('ClassLanding.Features.emoji_t'),
          description: this.$t('ClassLanding.Features.emoji_p'),
        },
        {
          icon: 'check-square',
          title: this.$t('ClassLanding.Features.polling_t'),
          description: this.$t('ClassLanding.Features.polling_p'),
        },
        {
          icon: 'group-chat',
          title: this.$t('ClassLanding.Features.chat_t'),
          description: this.$t('ClassLanding.Features.chat_p'),
        },
        {
          icon: 'aperture',
          title: this.$t('ClassLanding.Features.live_t'),
          description: this.$t('ClassLanding.Features.live_p'),
        },
        {
          icon: 'users',
          title: this.$t('ClassLanding.Features.break_t'),
          description: this.$t('ClassLanding.Features.break_p'),
        },
        {
          icon: 'eye',
          title: this.$t('ClassLanding.Features.screenShare_t'),
          description: this.$t('ClassLanding.Features.screenShare_p'),
        },
      ],
    };
  },
  methods: {
    getCardIcon(iconName) {
      return require(`../../assets/images/pages/videowikiClass/${iconName}.svg`);
    },
  },
};
</script>
<style scoped>
.banner {
  background: url('../../assets/images/pages/videowikiClass/classroom-header.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.intro {
  margin: auto;
  padding-top: 5rem;
}
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.features {
  padding-top: 5rem;
}
@media only screen and (min-width: 1100px) {
  .intro {
    margin-bottom: -5rem;
  }
}
</style>
