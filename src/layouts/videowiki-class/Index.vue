<template>
  <div class="layout--full-page">
    <router-view></router-view>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from '@/layouts/components/footer/TheFooter';

export default {
  components: {
    TheFooter,
  },
};
</script>
