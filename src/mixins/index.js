import { MEDIA_TYPES, SCENE_VERSION, defaultStyles } from '@/assets/data';

export const utils = {
  methods: {
    scrollToScene(sceneNumber) {
      var element = document.getElementById(`scene_card_${sceneNumber}`);
      const headerOffset = 80;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset + window.pageYOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    },
    updateScroll() {
      // let scrollPosition = window.scrollY
      // console.log(scrollPosition)
      for (const s in this.$store.state.studio.scenes) {
        const rect = document
          .getElementById('scene_card_' + s)
          .getBoundingClientRect();
        // console.log(s, "bounding client", rect.top, rect.bottom);

        if (rect.top < 200 && rect.bottom > (this.insideIframe ? 420 : 500)) {
          // console.log(s+" is active")
          this.$store.commit('studio/setActiveScene', parseInt(s) + 1);
        }
      }
    },
    isImageUrl(urlString) {
      if (urlString) {
        const imgExtentions = ['jpg', 'png', 'jpeg', 'svg'];
        urlString = new URL(urlString);
        return imgExtentions.includes(urlString.pathname.split('.').pop());
      }
      return false;
    },
    getFirstLetter(firstName) {
      return firstName ? firstName.charAt(0) : firstName;
    },
    createImage(payload) {
      return {
        type: MEDIA_TYPES.IMAGE,
        id: payload.id,
        versions: {
          [SCENE_VERSION.RAW]: payload.url
        }
      };
    },
    createVideo(payload) {
      return {
        type: MEDIA_TYPES.VIDEO,
        id: payload.id,
        versions: {
          [SCENE_VERSION.RAW]: payload.url
        }
      };
    },
    getStyle(prop, idx) {
      idx = parseInt(idx);
      if (!this.styles[idx] || !this.styles[idx][prop]) {
        this.$store.commit('studio/setStyles', {
          prop: prop,
          sceneNum: idx,
          value: defaultStyles[prop]
        });
      }
      return this.styles[idx][prop];
    }
    /* selectMedia(mediaObj) {
      this.$store.commit('studio/selectMedia', {
        value: mediaObj,
        sceneNum: this.sceneNum
      }); */
  }
};
