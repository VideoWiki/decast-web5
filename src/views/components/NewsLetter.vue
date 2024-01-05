<template>
  <div>
    <div class="text-center mb-20">
      <h1 class="font-extrabold text-4xl mb-4">
        {{ $t('NewsLetter.title1') }}
      </h1>
      <p class="font-medium">
        {{ $t('NewsLetter.title2') }}
      </p>
    </div>
    <div class="flex lg:w-2/4 justify-center">
      <vx-input-group class="mb-base relative">
        <vs-input
          icon-pack="feather"
          icon="icon-mail"
          :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
          v-validate="'required|email'"
          v-bind:placeholder="$t('NewsLetter.placeholder')"
          name="email"
          v-model="userEmail"
          icon-no-border
        />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              class="bg-custom-purple"
              :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
              @click="startSubscription"
              :disabled="subscribeInProgress"
              >{{ $t('NewsLetter.button') }}</vs-button
            >
          </div>
        </template>
      </vx-input-group>
    </div>
  </div>
</template>
<script>
import { ajaxCallMixin } from '@/http/HttpCommon';
export default {
  name: 'NewsLetter',
  mixins: [ajaxCallMixin],
  data() {
    return {
      userEmail: '',
      subscribeInProgress: false,
    };
  },
  methods: {
    startSubscription() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const url = '/community/subscribe/';
          const data = {};
          data.email = this.userEmail;
          this.subscribeInProgress = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'register',
            authenticationMethod: 'EmailSubscribe',
          });
          this.ajaxCall(url, data, this.callBackSubscribe);
        } else {
          this.$vs.notify({
            title: this.$t('NewsLetter.Valid.title'),
            text: this.$t('NewsLetter.Valid.text'),
            color: 'danger',
          });
        }
      });
    },
    callBackSubscribe(apiResponse) {
      if (apiResponse.status === 409) {
        this.$vs.notify({
          title: this.$t('NewsLetter.Response.409.title'),
          text: this.$t('NewsLetter.Response.409.text'),
          color: 'warning',
        });
      } else if (apiResponse.status === 200) {
        this.$vs.notify({
          title: this.$t('NewsLetter.Response.200.title'),
          text: this.$t('NewsLetter.Response.200.text'),
          color: 'success',
        });
        this.userEmail = '';
        this.$validator.reset();
      }
      this.subscribeInProgress = false;
    },
  },
};
</script>
