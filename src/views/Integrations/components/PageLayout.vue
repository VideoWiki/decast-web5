<template>
  <div>
    <div class="base-banner-wrapper pt-20 bg-white">
      <div class="base-banner flex justify-center items-center">
        <div class="text-center" style="margin-top: -14%">
          <h1
            class="text-white lg:text-5xl sm:text-4xl text-3xl font-extrabold"
          >
            <slot name="pluginTitle"></slot>
          </h1>
        </div>
        <img
          src="../../../assets/images/pages/videowikiClass/classroom-header.svg"
        />
      </div>
      <div class="demo-video-wrapper text-center">
        <iframe
          :src="
            $options.PLUGIN_DATA[$options.PLUGIN_NAMES[pluginName]].demoVideoURL
          "
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h2 class="font-extrabold text-4xl mb-4">
          {{ $t('MsTeams.About.about') }}
        </h2>
        <slot name="pluginDesc"></slot>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <template
          v-for="(feature, idx) in $options.PLUGIN_DATA[
            $options.PLUGIN_NAMES[pluginName]
          ].features"
        >
          <div
            class="flex items-start lg:w-1/2 flex-wrap justify-center p-4 -m-4"
            :key="idx"
          >
            <div class="p-2">
              <div class="custom-bullet flex justify-center items-center">
                {{ idx + 1 }}
              </div>
            </div>
            <div class="p-2 lg:w-2/3 md:w-4/5 w-4/5 ml-3">
              <h3
                class="
                  mb-base
                  font-semibold
                  lg:text-left
                  md:text-left
                  sm:text-left
                  text-center
                "
              >
                {{ feature.title }}
              </h3>
              <p class="text-left">
                {{ feature.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="section flex flex-wrap">
      <div class="lg:w-1/2 w-full">
        <h1 class="font-extrabold lg:text-4xl mb-6 lg:text-left text-center">
          {{ $t('MsTeams.How.how') }}
        </h1>
        <p class="font-medium mb-10 lg:w-3/4">
          {{ $options.PLUGIN_DATA[$options.PLUGIN_NAMES[pluginName]].working }}
        </p>
      </div>
      <div class="lg:w-1/2 flex justify-center">
        <img
          :src="
            $options.PLUGIN_DATA[$options.PLUGIN_NAMES[pluginName]].demoGifURL
          "
          width="80%"
          height="100%"
        />
      </div>
    </div>
    <div class="bg-white pb-base" style="padding-top: 10%">
      <vx-card noShadow class="w-4/5 mx-auto" style="margin-top: -14%">
        <template
          v-for="(item, idx) in $options.PLUGIN_DATA[
            $options.PLUGIN_NAMES[pluginName]
          ].usage"
        >
          <div class="flex items-start" :key="idx">
            <img src="../../../assets/images/pages/arrow-right-custom.svg" />
            <p style="transform: translate(0px, 8px)">{{ item }}</p>
          </div>
        </template>
      </vx-card>
      <vx-card class="w-4/5 mx-auto mt-base text-center">
        <div class="flex flex-wrap justify-between items-center -m-2">
          <div class="p-2 w-full sm:w-auto">
            <h4>{{ $t('MsTeams.Query.query') }}</h4>
          </div>
          <div class="p-2 w-full sm:w-auto text-center">
            <vs-button type="filled" to="/contact-us">{{
              $t('MsTeams.Query.contact')
            }}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { PLUGIN_NAMES, PLUGIN_DATA } from '@/assets/data';
export default {
  name: 'PageLayout',
  PLUGIN_NAMES,
  PLUGIN_DATA,
  props: {
    pluginName: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.section {
  padding: 8%;
}
.base-banner {
  /* background-image: url('../../assets/images/pages/videowikiClass/classroom-header.svg');
  background-size: cover;
  height: 550px; */
  position: relative;
}
.base-banner img {
  height: auto;
  width: 100%;
}
.base-banner {
  max-height: 550px;
  overflow: hidden;
}
.base-banner div {
  position: absolute;
}
.custom-bullet {
  color: #ffffff;
  text-align: center;
  height: 69px;
  width: 72px !important;
  font-weight: bold;
  font-size: 26px;
  background: linear-gradient(135deg, #e64980 14.25%, #ffafcb 87.25%);
  box-shadow: 0px 6px 12px #ffd6e4;
  border-radius: 50%;
}
.demo-video-wrapper {
  position: relative;
  overflow: hidden;
  width: 68%;
  padding-top: 40%;
  margin: auto;
  margin-top: -20%;
}
.demo-video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;
}
</style>
