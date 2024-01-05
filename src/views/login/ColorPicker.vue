<template>
  <div>
    <div class="color-preview flex">
      <div
        @click="toggleColorPicker"
        class="color"
        :style="{ backgroundColor: stepTwoProps.primary_color }"
      ></div>
      <div class="name-color" @click="toggleColorPicker">
        {{ stepTwoProps.primary_color }}
      </div>
      <div
        class="cross cursor-pointer"
        @click="stepTwoProps.primary_color = '#D7DF23'"
      >
        <img src="@/assets/images/editor/Vector3.svg" />
      </div>
    </div>
    <div class="picker" @click="picker" v-if="colorPickerVisible"></div>
    <color-picker
      v-if="colorPickerVisible"
      v-model="stepTwoProps.primary_color"
      :bottomBar="false"
      :hidePalette="true"
      @input="updateColor"
    />
  </div>
</template>

<script>
import { Sketch } from 'vue-color';

export default {
  components: {
    ColorPicker: Sketch,
  },
  props: ['stepTwoProps'],
  data() {
    return {
      selectedColor: '#ff0000', // Initial color
      colorPickerVisible: false,
    };
  },
  methods: {
    updateColor(color) {
      this.stepTwoProps.primary_color = color.hex;
    },
    toggleColorPicker() {
      this.colorPickerVisible = !this.colorPickerVisible;
    },
    picker(e) {
      this.toggleColorPicker();
    },
  },
};
</script>

<style>
body {
  background-color: #1d232b;
}

.color-preview {
  width: 137px;
  height: 32px;
  border: 1px solid #31394e;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
}
.color {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
.name-color {
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.cross {
  width: 33px;
  height: 32px;
  background-color: #242d36;
  border-radius: 0px 6px 6px 0px;
  border: 1px solid #31394e;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cross img {
  width: 7px;
  height: 7px;
}

.vc-sketch {
  min-width: 278px;
  min-height: 250px;
  max-height: 270px;
  border-radius: 10px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  margin: auto;
  padding: 0%;
  margin-top: 2rem;
  position: absolute !important;
  bottom: 35%;
  z-index: 9;
}

.vc-checkerboard {
  display: none;
}

.vc-saturation {
  width: 278px;
  height: 153px;
  margin: 0%;
  /* border: 1px solid white; */
}

.vc-saturation-circle {
  width: 16px !important;
  height: 16px !important;
}

.vc-sketch-controls {
  /* border: 1px solid green; */
  margin: auto;
  margin-top: -50px;
  width: 270px;
}

.vc-sketch-saturation-wrap {
  width: 278px;
  height: auto;
  /* min-height: 153px;
  max-height: 160px; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* border: 1px solid yellow; */
}

.vc-sketch-field--single {
  /* border: 1px solid yellow; */
  display: none;
}

.vc-editable-input {
  display: flex;
  flex-direction: row-reverse;
  color: #a6a6a8;
  gap: 5px;
  padding: 0%;
}

.vc-input__label {
  color: #a6a6a8 !important;
  font-size: 14px !important;
  margin: auto !important;
}

.picker {
  height: 100vh;
  width: 100%;
  background: #1d232b09;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
}

span {
  color: #a6a6a8;
}

.vc-input__input {
  background-color: #1d232b;
  max-width: 221px;
  height: 32px;
  border-radius: 6px;
  outline-color: #31394e !important;
  padding: 0%;
  color: #a6a6a8;
  font-size: 14px !important;
  margin: auto;
}

.vc-sketch-presets {
  display: none;
  visibility: hidden;
}
</style>
