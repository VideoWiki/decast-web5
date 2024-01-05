<template>
  <div
    class="lg:h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login" style="background: linear-gradient(135deg, #F0ECFF 0%, #E5E1FF 52.6%, #FFFDEA 100%);"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/4 xl:w-1/3 sm:m-0 m-4">
      <vs-card>
        <div class="pt-6">
          <div class="text-center m-2">
            <img
              src="@/assets/images/logo/logo.svg"
              @click="navigateTohome"
              class="mr-2 mt- h-16 cursor-pointer"
            />
            <h1 class="font-black text-4xl"><b>Create Account</b></h1>
          </div>
          <register-jwt></register-jwt>
        </div>
      </vs-card>
      <h4 class="w-full justify-center items-center text-center">
        Data policies aligned with
        <a
          href="https://principles.fairdatasociety.org/"
          style="text-decoration: underline"
          target="_blank"
          >Fair Data Society Principles</a
        >
      </h4>
    </div>
  </div>
</template>
<script>
import RegisterJwt from './RegisterJWT.vue';

export default {
  components: {
    RegisterJwt,
  },
  methods: {
    navigateTohome() {
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
  #page-login{
    min-height: 100vh ;
    height: 100% !important ;
  }

</style>
