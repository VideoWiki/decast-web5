<template>
  <div class="container">
    <div class="loader">
      <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
.container {
  background: black;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: fade 2s ease infinite;
}

@keyframes fade {
  0% {
    opacity: 0; 
  }
  50% {
    opacity: 1; 
  }
  100% {
    opacity: 0; 
  }
}
</style>
