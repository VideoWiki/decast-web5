<template>
  <div>
    <div class="section flex bg-white">
      <div class="lg:w-1/2 w-full">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="lg:text-4xl font-extrabold mb-8 lg:text-left text-center">
            {{$t('VideoConference.title')}}
          </h1>
          <p class="text-base font-medium mb-10 text-left">
              {{$t('VideoConference.info1')}}

            <br /><br /><br />
              {{$t('VideoConference.info2')}}
          </p>
        </div>
      </div>
      <div class="lg:w-1/2 hidden lg:flex justify-center">
        <img src="@/assets/images/landing-page/Frame4.svg" />
      </div>
    </div>

    <!---------------------------------------------------------------------->
    <vs-divider class="m-0 p-0" />

    <div class="section bg-white">
      <div class="text-center mb-20">
        <h2 class="font-extrabold lg:text-4xl mb-4">
          {{$t('VideoConference.short_title')}}
        </h2>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <template v-for="(point, idx) in shortcomings">
          <div
            class="flex items-start lg:w-1/2 w-full flex-wrap justify-center p-4 -m-4"
            :key="idx"
          >
            <div class="p-4">
              <div class="custom-check flex justify-center items-center">
                <vs-icon size="50px" icon="done" />
              </div>
            </div>
            <div class="p-4 lg:w-2/3 md:w-4/5 w-4/5 mx-auto">
              <h3
                class="mb-base font-semibold lg:text-left md:text-left sm:text-left text-center"
              >
                {{ point.title }}
              </h3>
              <p class="text-left">
                {{ point.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!---------------------------------------------------------------------->
    <vs-divider class="p-0 m-0" />
    <div class="section bg-white">
      <p class="text-base font-medium mb-10 text-left">
        <b>  {{$t('VideoConference.with')}}</b>   {{$t('VideoConference.same')}}
      </p>
    </div>

    <!--------------------------------------------------------------------->
    <div class="section">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import NewsLetter from './components/NewsLetter';
export default {
  name: 'Goals',
  components: {
    NewsLetter
  },
  data() {
    return {
      shortcomings: [
        {
          title: this.$t('VideoConference.shortcomings[0].title'),
          desc: this.$t('VideoConference.shortcomings[0].desc')
        },
        {
          title: this.$t('VideoConference.shortcomings[1].title'),
          desc: this.$t('VideoConference.shortcomings[1].desc')
        },
        {
          title:this.$t('VideoConference.shortcomings[2].title'),
          desc: this.$t('VideoConference.shortcomings[2].desc')
        },  
        {
          title: this.$t('VideoConference.shortcomings[3].title'),
          desc: this.$t('VideoConference.shortcomings[3].desc')
        }
      ]
    };
  }
};
</script>
<style scoped>
.section {
  padding: 8%;
}
.custom-check {
  color: #ffffff;
  text-align: center;
  height: 69px;
  width: 72px !important;
  font-weight: bold;
  font-size: 26px;
  background: linear-gradient(180deg, #8d56f8 0%, #a06fff 100%);
  box-shadow: 0px 6px 12px #e4d7ff;
  border-radius: 50%;
}
</style>
