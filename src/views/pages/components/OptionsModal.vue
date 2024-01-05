<template>
  <vs-popup :title="title" :active.sync="visibilityHandler" ref="options_modal">
    <div class="flex flex-wrap">
      <template v-for="(option, idx) in options">
        <div
          :key="idx"
          class="option-wrapper"
          :class="{
            'selected-option': value === option.value
          }"
          @click="$emit('selected', option.value)"
        >
          <p>{{ option.label }}</p>
        </div>
      </template>
    </div>
  </vs-popup>
</template>
<script>
export default {
  name: 'OptionsModal',
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    },
    sceneNum: {
      type: String
    },
    title: {
      type: String
    },
    options: {
      type: Array
    },
    value: {
      type: String
    }
  },
  computed: {
    visibilityHandler: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit('update:active', val);
      }
    }
  },
  mounted() {
    this.$refs.options_modal.$el.childNodes[1].style.width = '810px';
  }
};
</script>
<style scoped>
.option-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(155, 155, 160);
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
}
.selected-option {
  color: rgb(115, 103, 240);
  border: 1px solid rgb(115, 103, 240);
}
</style>
