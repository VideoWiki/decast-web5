<template>
  <div>
    <div class="w-9/10">
      <video ref="video" controls crossorigin playsinline :data-poster="poster">
        <source ref="source" type="application/x-mpegURL" :src="videoSrc" />
      </video>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'vue-plyr/dist/vue-plyr.css';

export default {
  data() {
    return {
      dataLoaded: false,
    };
  },
  props: ['videoSrc', 'poster'],
  mounted() {
    var myRequest = new Request(this.videoSrc);
    fetch(myRequest).then(function (response) {});
    const video = this.$refs.video;
    const source = this.$refs.source.src;
    const defaultOptions = {};
    if (!Hls.isSupported()) {
      video.src = source;
    } else {
      const hls = new Hls();
      hls.loadSource(source);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        defaultOptions.captions = {
          active: true,
          update: true,
          language: 'en',
        };
        const player = new Plyr(video, defaultOptions);
        player.on('languagechange', () => {
          setTimeout(() => (hls.subtitleTrack = player.currentTrack), 50);
        });
        hls.attachMedia(video);
        window.hls = hls;
        window.player = player;
      });
      function updateQuality(newQuality) {
        hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            hls.currentLevel = levelIndex;
          }
        });
      }
    }
  },
};
</script>
<style lang="css">
.plyr__control--overlaid,
.plyr__control:hover,
.plyr__control[role='menuitemradio'][aria-checked='true']::before,
.plyr__control[aria-expanded='true'] {
  background: #d7df23 !important;
}
.plyr--full-ui input[type='range'] {
  color: #d7df23;
}
</style>
