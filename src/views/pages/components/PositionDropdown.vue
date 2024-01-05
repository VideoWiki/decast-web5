<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center">
      <img :src="selectedPositionIcon" :alt="selectedPosition" />
      <!--span class="hidden sm:block ml-2">{{ currentPosiitonLabel }}</span-->
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updatePosition('top')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/top.svg"
          alt="top"
        />
        &nbsp;Top</vs-dropdown-item
      >
      <vs-dropdown-item @click="updatePosition('center')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/center.svg"
          alt="center"
        />
        &nbsp;Center</vs-dropdown-item
      >
      <vs-dropdown-item @click="updatePosition('bottom')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/bottom.svg"
          alt="bottom"
        />
        &nbsp;Bottom</vs-dropdown-item
      >
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  name: 'LanguageSelect',
  props: {
    value: String
  },
  data() {
    return {
      selectedPosition: this.value,
      positions: {
        top: 'Top',
        center: 'Center',
        bottom: 'Bottom'
      }
    };
  },
  computed: {
    selectedPositionIcon() {
      return require(`@/assets/images/pages/${this.selectedPosition}.svg`);
    }
  },
  methods: {
    updatePosition(pos) {
      this.selectedPosition = pos;
      this.$emit('input', pos);
    },
  },
};
</script>
