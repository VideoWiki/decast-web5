<template>
  <div>
    <div v-if="this.payload">
      <button
        class="vs-component w-full mt-2 vs-button text-base font-bold wallter-button"
        @click="connectWallet"
        color="#1d2129"
        text-color="#1d2129"
      >
        Connect Wallet
      </button>
      <p class="mt-6 info-wall">
        Your wallet information is not mapped to your email or name. It is saved
        with encryption and only used for the airdrop configured by the event
        admin.
      </p>
    </div>

    <div v-else>
      <vs-button
        v-if="authenticated"
        class="text-base font-bold wallter-button"
        color="#1d2129"
        text-color="#1d2129"
        type="filled"
        @click="popup"
        >Connect Wallet
      </vs-button>
      <div v-else-if="!authenticated">
        <vs-dropdown vs-custom-content class="cursor-pointer">
          <div class="flex items-center relative">
            <vs-button
              type="filled"
              class="text-base font-bold pr-4"
              text-color="#544837"
              color="#f1f1f1"
            >
              {{ truncate(accountAddress) }}
            </vs-button>
            <vs-icon
              icon="radio_button_checked"
              color="success"
              size="18px"
              class="absolute"
              style="left: 3%"
            />
          </div>
          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
              <li class="flex py-2 px-4 font-bold">
                <!--feather-icon icon="UserIcon" svgClasses="w-4 h-4" /-->
                <span class="ml-2">{{ accountAddress }}</span>
              </li>

              <vs-divider class="m-1" />

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-danger hover:text-white"
                @click="logout"
              >
                <!--feather-icon icon="HomeIcon" svgClasses="w-4 h-4" /-->
                <span class="ml-2">Disconnect</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <vs-popup
        id="nft-popup"
        ref="custom_modal_mine"
        title=""
        :active.sync="popupDisplay"
      >
        <div
          class="popup-item flex flex-wrap items-center w-full justify-center p-5"
          @click="login"
        >
          <div class="w-full flex flex-wrap items-center justify-center">
            <img
              class="metamask-logo"
              src="../../../../assets/images/MetaMask_Fox.png"
            />
          </div>
          <div class="w-full flex items-center justify-center">
            <h3 class="metamask-h3">MetaMask</h3>
          </div>
          <div>
            <p
              style="
                font-size: 18px;
                margin: 0.333em 0px;
                color: rgb(169, 169, 188);
              "
            >
              Connect to your MetaMask account
            </p>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import { ajaxCallMixin } from '../../../../http/HttpCommon';
export default {
  name: 'connect-wallet',
  mixins: [ajaxCallMixin],
  props: ['payload'],
  data() {
    return {
      buttonclose: false,
      authenticated: true,
      popupDisplay: false,
    };
  },
  created() {
    console.log(this.payload);
  },
  computed: {
    accountAddress() {
      return this.$store.state.accountAddress;
    },
  },
  methods: {
    async connectWallet() {
      await this.login();
      const payload = {
        cast_id: this.payload.cast_id,
        email: this.payload.email,
        public_address: this.accountAddress.toLowerCase(),
      };
      this.$store
        .dispatch('auth/saveWalletAddress', payload)
        .then((res) => null)
        .catch((err) => {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text:
              err.response != null
                ? err.response.data.message
                : this.$t('Metamasklogin.notconnected'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    async login() {
      this.popupDisplay = false;
      await this.$store.dispatch('connectWallet');
      this.authenticated = false;
      console.log(this.$store.state.isWalletConnected);
    },
    async logout() {
      this.authenticated = true;
      this.$store.dispatch('disconnectWallet');
    },
    truncate(addressString) {
      return addressString.slice(0, 6) + '...' + addressString.slice(38);
    },
    popup() {
      this.popupDisplay = true;
    },
  },
};
</script>

<style scoped>
/* 
.modal-connect{
  max-height:60%;
  max-width: 80%;
} */

.wallter-button{
  background: #D7DF23 !important;
  color: black !important;
  height: 50px;
}

.info-wall{
  color: #637181 !important;
}

.metamask-logo {
  width: 100px;
  height: 100px;
}

p {
  color: black !important;
}

.info-wall{
  color: #a6a6a6;
}
.metamask-h3 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 0.5em;
  color: rgb(12, 12, 13);
}
.popup-item {
  cursor: pointer;
}
.popup-item:hover {
  background: rgba(195, 195, 195, 0.14);
}
</style>
