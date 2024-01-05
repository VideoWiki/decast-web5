<template>
  <div class="cursor-pointer">
    <img width="100%" :src="src" class="image" />
  </div>
</template>
<script>
export default {
  name: 'ImagePreview',
  props: ['imageId', 'src'],
  methods: {
    showOverlay(imgId) {
      const overlay = document.getElementById(imgId);
      overlay.classList.remove('hidden');
    },
    hideOverlay(imgId) {
      const overlay = document.getElementById(imgId);
      overlay.classList.add('hidden');
    },
  },
};
</script>
<style scoped>
.zoom-in {
  transition: transform 4s;
}
.zoom-in:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
.img-hover-zoom {
  overflow: hidden;
  cursor: pointer;
}
.img-hover-zoom img {
  transform-origin: 50% 65%;
  transition: transform 5s, filter 3s ease-in-out;
  filter: brightness(150%);
}
.img-hover-zoom:hover img {
  filter: brightness(100%);
  transform: scale(3);
}
.img-overlay {
  height: 100%;
  transition: 0.5s ease;
  width: 100%;
  opacity: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
}
.image {
  max-height: 140px;
  transition: 0.5s ease;
  backface-visibility: hidden;
}
.img-container:hover .image {
  opacity: 0.3;
}
.img-container:hover .img-overlay {
  opacity: 1;
}
</style>
