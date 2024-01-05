<template>
<!--  <div-->
<!--    class="theoplayer-container video-js theoplayer-skin vjs-16-9 THEOplayer"-->
<!--    ref="theoplayer"-->
<!--  ></div>-->
  <div>
  <div>
<!--    {{source.image}}-->
  </div>

  </div>
</template>

<script>
export default {
  props: ["source"],
  created(){
  }
};
</script>
<style scoped>
.THEOplayer {
  width: 100%;
  margin: 0 auto;
}

.video-js.vjs-16-9 {
  padding-top: 0%;
  width: 100%;
}
.theoplayer-skin ul.theo-context-menu{
  display: none !important
}
.theoplayer-skin .vjs-big-play-button{
  color: #734bc4;
}
.video-js .vjs-big-play-button {
  font-size: 3em;
  line-height: 1.5em;
  height: 1.5em;
  width: 3em;
  display: block;
  position: absolute;
  top: 40%;
  left: 10px;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: .06666em solid #fff;
  background-color: #2b333f;
  background-color: rgba(43,51,63,.7);
  border-radius: .3em;
  -webkit-transition: all .4s;
  -moz-transition: all .4s;
  transition: all .4s;
}

</style>
