<script>
import {
  StencilPreview,
  BoundingBox,
  DraggableArea,
} from 'vue-advanced-cropper';

function floorTo(number, to) {
  return Math.floor(number / to) * to;
}

function ceilTo(number, to) {
  return Math.ceil(number / to) * to;
}
export default {
  components: {
    StencilPreview,
    BoundingBox,
    DraggableArea,
  },
  props: [
    'image',
    'coordinates',
    'stencilCoordinates',
    'aspectRatio',
    'minAspectRatio',
    'maxAspectRatio',
    'transitions',
  ],
  computed: {
    style() {
      const { height, width, left, top } = this.stencilCoordinates;
      const style = {
        position: 'absolute',
        // width: `${width}px`,
        width: `${width}%`,
        height: `${height}px`,
        // height: `${(9 * width) / 16}%`,
        transform: `translate(${left}px, ${top}px)`,
      };
      if (this.transitions && this.transitions.enabled) {
        style.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`;
      }
      return style;
    },

    gridStyle() {
      return {
        left: `${-this.stencilCoordinates.left}px`,
        top: `${-this.stencilCoordinates.top}px`,
        width: `${
          this.stencilCoordinates.left + this.stencilCoordinates.width
        }px`,
        height: `${
          this.stencilCoordinates.top + this.stencilCoordinates.height
        }px`,
      };
    },

    newGridStyle() {
      return {
        backgroundPosition: `${-this.stencilCoordinates.left}px ${-this
          .stencilCoordinates.top}px`,
      };
    },
  },
  methods: {
    onMove(moveEvent) {
      this.$emit('move', moveEvent);
    },
    onMoveEnd() {
      this.$emit('moveEnd');
    },
    onResize(resizeEvent) {
      this.$emit('resize', resizeEvent);
    },
    onResizeEnd() {
      this.$emit('resizeEnd');
    },
    aspectRatios() {
      return {
        minimum: this.aspectRatio || this.minAspectRatio,
        maximum: this.aspectRatio || this.maxAspectRatio,
      };
    },
  },
};
</script>

<template>
  <div class="grid-stencil" :style="style">
    <bounding-box @resize="onResize" @resize-end="onMoveEnd">
      <draggable-area @move="onMove" @move-end="onMoveEnd">
        <stencil-preview
          :image="image"
          :width="stencilCoordinates.width"
          :height="stencilCoordinates.height"
          :coordinates="coordinates"
          :transitions="transitions"
        />
        <div
          class="grid-stencil__grid-wrapper"
          :style="{
            width: `${stencilCoordinates.width}px`,
            height: `${stencilCoordinates.height}px`,
          }"
        >
          <div class="grid-stencil__grid" :style="newGridStyle" />
        </div>
      </draggable-area>
    </bounding-box>
  </div>
</template>

<style lang="scss">
.grid-stencil {
  &__grid {
    position: absolute;
    background-size: 30px;
    background-position: left top;
    background-repeat: repeat;
    height: 100%;
    width: 100%;
  }
  &__grid-wrapper {
    overflow: hidden;
    position: relative;
    z-index: -1;
  }
}
.vue-advanced-cropper__stretcher {
  height: 300px !important;
  width: 300px !important;
}
.vue-advanced-cropper__foreground {
  background: white;
}
.vue-advanced-cropper__background {
  background: white;
}
</style>
