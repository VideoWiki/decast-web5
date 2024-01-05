<template>
  <div>
    <div class="bg-white awards-container">
      <div class="flex items-center mb-base">
        <div class="w-full lg:w-1/2">
          <h1 class="text-custom-black font-extrabold text-4xl mb-base">
            {{$t('Awards.EUV.euv')}}
          </h1>
          <p class="text-custom-purple mb-base">- {{$t('Awards.EUV.project')}}</p>
          <p class="text-black">
            {{$t('Awards.EUV.info')}}
          </p>
        </div>
        <div class="hidden lg:w-2/5 lg:block mx-auto">
          <img src="@/assets/images/pages/awards1.svg" />
        </div>
        <!-------IMAGE---------------->
      </div>

      <!----------------------------------------------------------------------->

      <div class="flex items-center mb-24">
        <div class="hidden lg:w-1/2 lg:block mr-4">
          <img
            src="@/assets/images/pages/awards2.svg"
            class="h-full max-w-full block mx-auto"
          />
        </div>
        <!-------IMAGE---------------->
        <div class="w-full lg:w-1/2">
          <h1 class="text-custom-black font-extrabold text-4xl mb-base">
            {{$t('Awards.Hack.hack')}}
          </h1>
          <p class="text-custom-purple mb-base">
            - {{$t('Awards.Hack.ux')}}
          </p>
          <p class="text-black mb-base">
            {{$t('Awards.Hack.info1')}}
          </p>
          <p class="text-black">
            {{$t('Awards.Hack.info2')}}
          </p>
        </div>
      </div>

      <!----------------------------------------------------------------------->

      <div class="mb-10">
        <h2 class="font-extrabold text-4xl text-center mb-4">
          {{$t('Awards.News.news')}}
        </h2>
      </div>
      <div class="grid-container">
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-1 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards3.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              {{$t('Awards.News.euv.title')}}
            </p>
            <p class="mb-2 text-base">
             {{$t('Awards.News.euv.info')}}
            </p>
            <vs-button
              :href="
                `https://www.eua.eu/partners-news/519-euvsvirus-hackathon-results-bringing-solutions-to-covid-19-challenges-to-the-next-level.html?utm_source=social&utm_medium=LinkedIn&utm_name=LinkedIn-social-10-6-2020`
              "
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-2 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards4.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              {{$t('Awards.News.videowiki.title')}}
            </p>
            <p class="mb-2 text-base">
              {{$t('Awards.News.videowiki.info')}}
            </p>
            <vs-button
              :href="
                `https://hundred.org/en/innovations/videowiki-video-wikipedia-for-learners-and-creators`
              "
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-3 flex items-center justify-center"
          >
            <img
              src="@/assets/images/pages/awards5.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
             {{$t('Awards.News.remote.title')}}
            </p>
            <p class="mb-2 text-base">
              {{$t('Awards.News.remote.info')}}
            </p>
            <vs-button
              :href="`https://covid-eic.easme-web.eu/solution/videowiki/about`"
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-4 flex items-center justify-center"
          >
            <img
              src="@/assets/images/pages/awards6.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              {{$t('Awards.News.ua.title')}}
            </p>
            <p class="mb-2 text-base">
              {{$t('Awards.News.ua.info')}}
            </p>
            <vs-button
              :href="`https://www.ua.pt/en/news/16/63381`"
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-6 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards8.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              {{$t('Awards.News.sustainable.title')}}
            </p>
            <p class="mb-2 text-base">
             {{$t('Awards.News.sustainable.info')}}
            </p>
            <vs-button
              type="filled"
              :href="`https://digieduhack.com/en/solutions/videowiki`"
              target="_blank"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-5 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards7.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
             {{$t('Awards.News.sustainable.remote')}}
            </p>
            <p class="mb-2 text-base">
              {{$t('Awards.News.remote.info')}}
            </p>
            <vs-button
              :href="`https://www.euvsvirus.org/finalreport.pdf`"
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-4 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards9.svg"
              alt="Not Found"
              width="136px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              {{$t('Awards.News.tch.title')}}
            </p>
            <p class="mb-3 text-base">
              {{$t('Awards.News.tch.info')}}
            </p>
            <vs-button
              :href="
                `https://twitter.com/oceanprotocol/status/1356921263952977922/photo/1`
              "
              target="_blank"
              type="filled"
              >{{$t('Awards.News.read')}}</vs-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import NewsLetter from './components/NewsLetter';
export default {
  name: 'Awards',
  components: {
    NewsLetter
  }
};
</script>
<style scoped>
.awards-container {
  padding: 8%;
}
.section {
  padding: 8%;
}
.grid-container .grid-item .card-body {
  padding: 8%;
}
.bg-card-1 {
  background: linear-gradient(180deg, #00b3ec 0%, #00b3ec 100%);
}
.bg-card-2 {
  background: #99139b;
}
.bg-card-3 {
  background: #f8a629;
}
.bg-card-4 {
  background: #000000;
}
.bg-card-5 {
  background: #3432ab;
}
.bg-card-6 {
  background: #e04e82;
}
.grid-container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: minmax(300px, auto);
  grid-gap: 10px;
}
.grid-container .grid-item {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: minmax(300px, auto);
}

@media only screen and (min-width: 1100px) {
  .grid-container .grid-item:nth-child(2) .inner-grid-item {
    grid-column-start: 2;
  }
  .grid-container .grid-item:nth-child(6) .inner-grid-item {
    grid-column-start: 2;
  }
  .grid-container .grid-item:nth-child(7) .inner-grid-item {
    grid-column-start: 2;
  }
  .grid-container .grid-item:nth-child(1) {
    grid-row: span 2;
  }
  .grid-container .grid-item:nth-child(2) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(3) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(4) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(6) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(5) {
    grid-row: span 2;
  }
  .grid-container .grid-item:nth-child(7) {
    grid-column: none;
    grid-column-start: 2;
  }
}
</style>
