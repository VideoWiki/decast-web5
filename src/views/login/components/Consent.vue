<template>
  <div class="loader-container" id="loading-bg">
    <div class="svg-container">
      <img src="@/assets/images/logot.svg" alt="Logo" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import constant from '../../../../constant';

export default {
  name: 'callback',
  components: {},
  data() {
    return {
      alreadyLogged: false,
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  mounted() {
    this.$vs.notify({
      title: 'Wait',
      iconPack: 'feather',
      icon: 'icon-alert-circle',
      color: 'warning',
    });
    console.log(this.$route.query);
    var config = {
      method: 'get',
      url:
        constant.hydra_ep +
        '/api/consent/?consent_challenge=' +
        this.$route.query.consent_challenge,
      headers: {},
    };

    axios(config)
      .then((response) => {
        this.$store
          .dispatch('auth/fetchUser', {
            access_token: undefined,
            fist_name: response.data.first_name,
            profile_pic: response.data.profile_pic,
            username: response.data.username,
          })
          .then((res) => {
            console.log(res);
            // location.href = '/';
          })
          .catch((_err) => {
            this.$vs.notify({
              title: 'Error',
              text: 'Error occurred',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
            window.location.href = constant.challengeUri;
          });
        location.href = response.data.url.redirect_to;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
* {
  overflow: hidden;
}
</style>
