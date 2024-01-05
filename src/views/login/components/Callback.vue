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
    var config = {
      method: 'get',
      url:
        constant.hydra_ep +
        '/api/token/?code=' +
        this.$route.query.code +
        '&origin=editor',
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        this.$store
          .dispatch('auth/fetchUser', {
            access_token: response.data.data.token_data.access_token,
            ...response.data.data.user_info,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem(
              'accessToken',
              response.data.data.token_data.access_token
            );
            this.$store.commit('auth/SET_LOGGEDIN', true);
            window.opener.postMessage('loginSuccess', '*');
            window.close();
            location.href = '/dashboard';
            // location.href =
            //   'https://dev.stream.video.wiki/saveInfo/?name=' +
            //   response.data.data.user_info.first_name +
            //   '&username=' +
            //   response.data.data.user_info.username +
            //   '&profile_pic=' +
            //   response.data.data.user_info.profile_pic +
            //   '&token=' +
            //   response.data.data.token_data.access_token +
            //   '&origin=editor';
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
      })
      .catch((e) => {
        this.$vs.notify({
          title: 'Error',
          text: 'Error occurred',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        window.location.href = constant.challengeUri;
        console.log(JSON.stringify(e));
      });
  },
};
</script>
<style lang="scss" scoped>
* {
  overflow: hidden;
}
</style>
