<template>
  <div
    @click="videoWikiChat"
    class="fixed"
    style="right: 15px; bottom: 0px; z-index: 10"
  >
    <img
      src="../assets/images/QEsCeeqwedqG.png"
      width="60px"
      height="auto"
      class="cursor-pointer designbot image-fit"
    />

    <vs-popup
      :active="showVideoWiki"
      ref="custom_modal"
      :button-close-hidden="true"
      class="chat-box-toggle"
    >
      <div
        class="custom-modal-close"
        style="background: transparent"
        @click="showVideoWiki = false"
      >
        <vs-icon icon="close" size="20px" />
      </div>
      <div style="height: 450px" class="p-0">
        <iframe :src="chatUrl" class="w-full h-full m-0 border-0"></iframe>
      </div>
    </vs-popup>
  </div>
</template>
<script>
export default {
  name: 'VideoWikiChat',
  data() {
    return {
      showVideoWiki: false,
      chatUrl: '',
    };
  },
  mounted() {
    this.$refs.custom_modal.$el.childNodes[1].style.maxHeight = 'unset';
    this.$refs.custom_modal.$el.childNodes[1].style.height = '485px';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '400px';
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';

    this.chatUrl = 'https://gtbrdd.typeform.com/c/GNRajxsp';
  },
  methods: {
    videoWikiChat() {
      this.showVideoWiki = true;
    },
  },
};
</script>
<style scoped>
.vs-popup--content {
  background: rgb(184, 178, 194);
}
.section {
  padding: 3%;
}
vs-popup--header {
  display: none;
}
.designbot {
  padding-right: 17%;
  padding-top: 20%;
  position: relative;
  bottom: 2.5rem;
  right: 0.35rem;
}
/* .chat-box-toggle{
  
} */
@media only screen and (min-device-width: 1200px) {
  .con-vs-popup {
    justify-items: end;
    grid-template-columns: 1fr;

    display: grid;
    height: 100%;

    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 100%;
    max-width: 1100vw;
    max-height: 100vh;
    border-radius: 5px;
    padding-block-end: 3rem;
  }
}
@media only screen and (min-device-width: 700px) and (max-device-width: 1200px) {
  .con-vs-popup {
    justify-items: end;
    grid-template-columns: 1fr;

    display: grid;
    height: 100%;
    padding-left: 15rem;
    padding-top: 25rem;
    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 100%;
    max-width: 1100vw;
    max-height: 100vh;
    border-radius: 5px;
    padding-block-end: 3rem;
  }
}
.con-vs-popup >>> .vs-popup--background {
  display: none;
}

.custom-modal-close {
  position: relative;
  right: 10px;
  top: -4px;
  cursor: pointer;
  height: 8px;
  width: 12px;
  border-radius: 6px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
}
@media only screen and (min-device-width: 280px) and (max-device-width: 653px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .con-vs-popup {
    height: 100%;

    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 100%;

    border-radius: 5px;
    padding-block-end: 3rem;
  }
}
@media (min-width: 310px) and (max-device-width: 690px) {
  .con-vs-popup {
    height: 100%;

    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 100%;

    border-radius: 5px;
    padding-block-end: 3rem;
  }
}
</style>
