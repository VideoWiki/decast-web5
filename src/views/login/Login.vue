<template>
  <div
    class="lg:h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" 
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/4 xl:w-1/3 sm:m-0 m-4">
      <vs-card>
        <div class="w-full no-gutter justify-center items-center">
          <login-jwt></login-jwt>
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
import LoginJwt from './LoginJWT.vue';

export default {
  components: {
    LoginJwt,
  },
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 18px;
}
.login-tabs-container {
  min-height: 505px;
  padding-top: 5.5rem;
  margin-right: 60px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
.svg-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(130deg)
    brightness(106%) contrast(103%);
}
.company-logo {
  top: 5%;
  left: 10%;
}

.fairsociety-link {
  bottom: 10%;
  left: 10%;
}

.left-panel::after {
  content: '';
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
.vx-logo-text {
  font-size: 22px;
  font-weight: 600;
  animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
}
</style>
<style scoped>
@media screen and (max-height: 5000px) {
  .fix_screen {
    display: flex;
    max-height: 1200%;
  }
}
#page-login {
  background: linear-gradient(135deg, #f0ecff 0%, #e5e1ff 52.6%, #fffdea 100%);
  min-height: 100vh ;
  height: 100% !important ;
}
</style>
