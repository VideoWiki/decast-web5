<!-- =========================================================================================
    File Name: MyVideos.vue
    Description: fetch all background image and details using api
    ----------------------------------------------------------------------------------------
    Item Name:
    Author: Rana Vivek Singh
========================================================================================== -->




<template>
  <div id="knowledge-base-page">
    <div class="knowledge-base-jumbotron backgroundimage">
      <span class="float"><TheHeader /></span>
    </div>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import { ajaxCallMixin } from '../http/HttpCommon';
import axios from '../axios';
import constants from '../../constant';

export default {
  mounted() {},
  name: 'Dashboard',
  mixins: [ajaxCallMixin],

  components: {
    TheHeader,
  },
  data() {
    return {
      video: {},
      isLoading: false,
      event_name: '',
    };
  },
  mounted() {
    this.getVideo();
  },
  methods: {},
};
</script>
<style scoped>
.backgroundimage {
  background: rgb(115, 103, 240);
  background-image: url(../assets/images/landing-page/newmask.svg);
  height: 37rem;
}
.textdiscover {
  text-align: center;
  padding-top: 3rem;
  color: white;
  size: 20rem;
}
</style>
