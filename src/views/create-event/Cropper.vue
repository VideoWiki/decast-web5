<template>
  <div id="app" class="p-0 m-0">
    <div class="modal">
      <div class="modal-content">
        <Cropper
          ref="cropper"
          class="upload-example-cropper cropper"
          :src="imageUrl"
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
      </div>
      <div class="flex modal-buttons justify-center" style="height: 70px">
        <div>
          <vs-button class="m-4 p-4 text-xl" @click="cropImage" id="CropImg">
            Upload Image
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import Stencil from './stencil.vue';

export default {
  name: 'ImageCropper',
  props: ['modalProps', 'Cropp', 'imageUrl'],
  data() {
    return {
      croppedImage: '',
      image: {
        src: '',
        type: 'image/jpg',
      },
      stencil: {
        width: 100,
        height: 280,
      },
    };
  },
  methods: {
    pixelsRestrictions({ minWidth, minHeight, maxWidth, maxHeight }) {
      return {
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      };
    },

    async cropImage() {
      const result = this.$refs.cropper.getResult();
      this.croppedImage = result.canvas.toDataURL(this.image.type);
      //   Converting
      const response = await fetch(this.croppedImage);

      const contentType = response.headers.get('content-type');
      const blob = await response.blob();
      const file = new File([blob], 'backImage', { type: contentType });
      this.Cropp(file, this.croppedImage);
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
  components: {
    Cropper,
    Stencil,
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
}

.modal-content {
  background: #eee;
}

.modal-content .cropper {
  max-width: 80vw;
  max-height: 70vh;
}

.cropper {
  &__background {
    background-size: 30px;
    background-position: left top;
    background-repeat: repeat;
  }
}
</style>
