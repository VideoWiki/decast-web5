<template>
  <div class="center">
    <label class="toggle-switch">
      <input type="checkbox" v-model="isChecked" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'buttonToggle',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  watch: {
    isChecked(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>
<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 33px;
  height: 16px;
}
.toggle-switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353d4e;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 15px;
}
.slider.round {
  border-radius: 50px;
}
.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 0px;
  bottom: 0px;
  background-color: #c5baba;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #31a2f4;
}
input:focus + .slider {
  box-shadow: 0 0 1px #31a2f4;
}
input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}
</style>
