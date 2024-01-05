<template>
  <div>
    <span v-if="teamsInitialized === true"></span>
    <vs-button
      v-else-if="!this.$store.state.isWalletConnected"
      class="text-base font-bold wallter-button"
      @click="connect"
      >Connect Wallet</vs-button
    >

    <div v-else>
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
              @click="disconnect"
            >
              <!--feather-icon icon="HomeIcon" svgClasses="w-4 h-4" /-->
              <span class="ml-2">Disconnect</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
  </div>
</template>
<script>
import * as microsoftTeams from '@microsoft/teams-js';

export default {
  name: 'Wallet',
  created() {
    var teamsInitialized = false;
    microsoftTeams.initialize(() => {
      teamsInitialized = true;
    });

    setTimeout(() => {
      if (teamsInitialized) {
        this.teamsInitialized = true;
      } else {
      }
    }, 0);
  },
  computed: {
    accountAddress() {
      return this.$store.state.accountAddress;
    },
  },
  data() {
    return {
      vivek: false,
      teamsInitialized: false,
    };
  },
  methods: {
    connect() {
      this.$store.dispatch('connectWallet');
    },
    disconnect() {
      this.$store.dispatch('disconnectWallet');
    },
    truncate(addressString) {
      return addressString.slice(0, 6) + '...' + addressString.slice(38);
    },
  },
};
</script>

<style>
.wallter-button{
  background: #D7DF23 !important;
  border: 1px solid red !important;
}
</style>
