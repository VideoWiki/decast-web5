<template>
  <div>
    <Cropper
      ref="cropper"
      class=""
      :src="coverimage"
      :canvas="true"
      :stencil-props="{
        handlers: {},
        aspectRatio: 16 / 9,
        movable: true,
        scalable: false,
      }"
      :resize-image="{
        adjustStencil: false,
      }"
      :stencil-component="$options.components.CircleStencil"
    />
    <!-- <vs-button class="m-4 p-4 text-xl" @click="cropImage" id="CropImg">
      Crop Image
    </vs-button> -->
    <div class="flex modal-buttons justify-center" style="height: 70px">
      <div>
        <vs-button class="m-4 p-4 text-xl" @click="cropImage" id="CropImg">
          Upload Image
        </vs-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import Stencil from './stencil.vue';
export default {
  name: 'coverCropper',
  components: {
    Cropper,
    Stencil,
  },
  props: ['coverimage', 'closepop'],
  data() {
    return {
      croppedImage: '',
      image: {
        src: '',
        type: 'image/jpeg',
      },
      stencil: {
        width: 100,
        height: 280,
      },
    };
  },
  methods: {
    async cropImage() {
      const result = this.$refs.cropper.getResult();
      this.croppedImage = result.canvas.toDataURL(this.image.type);
      const response = await fetch(this.croppedImage);
      const contentType = response.headers.get('content-type');
      const blob = await response.blob();
      const file = new File([blob], 'backImage', { type: contentType });
      this.closepop(file);
    },
    visibleArea({ boundaries, imageSize }) {
      const boundariesRatio = boundaries.width / boundaries.height;
      const imageRatio = imageSize.width / imageSize.height;

      let width, height;
      if (boundariesRatio > imageRatio) {
        height = imageSize.height;
        width = imageSize.height * boundariesRatio;
      } else {
        width = imageSize.width;
        height = imageSize.width / boundariesRatio;
      }

      return {
        width,
        height,
        left: -width / 2 + imageSize.width / 2,
        top: -height / 2 + imageSize.height / 2,
      };
    },
  },
};
</script>
