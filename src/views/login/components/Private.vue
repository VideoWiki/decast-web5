<template>
  <div class="px-6">
    <div class="overlay-bg" v-if="wallet" @click="showWallets">
      <div class="overlay-inner" @click.stop>
        <button
          @click="showWallets"
          class="border-none rounded-full cross-btn text-xl font-semibold"
        >
          X
        </button>
        <h2 class="my-4">Select Wallet</h2>
        <!-- wallet type  -->
        <Metamaskbtn :payload="this.payload" />
      </div>
    </div>

    <!-- connect to wallet -->
    <div class="flex flex-wrap my-6">
      <vs-button
        @click="showWallets"
        color="orange"
        type="border"
        class="w-full text-black text-center content-center self-top"
        ><div class="justify-content text-center inline-flex ml-6">
          <span class="flex">
            <img src="@/assets/images/login/metamask.png" class="h-8" />
          </span>
          <span
            class="flex self-center content-center justify-content-center ml-4"
          >
            <p class="self-center align-center" style="text-align: center">
              Sign in with MetaMask
            </p>
          </span>
        </div></vs-button
      >
    </div>
  </div>
</template>

<script>
import Metamaskbtn from './PrivateLoginButtons/Metamaskbtn.vue';

export default {
  components: { Metamaskbtn },
  props: ['payload'],
  data() {
    return {
      wallet: false,
    };
  },
  mounted() {
    console.log(this.payload,'pvt pay')
  },
  methods: {
    showWallets() {
      this.wallet = !this.wallet;
    },
  },
};
</script>

<style scoped>
.cross-btn {
  z-index: 250;
  background-color: #d5d0d0;
  color: rgb(110, 106, 106);
  width: 3em;
  height: 3em;
  cursor: pointer;
  margin-top: -1.5em;
}
.overlay-bg {
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #7d7c7977;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-inner {
  width: 30%;
  border-radius: 5px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
p {
  color: #101010 !important;
}
@media only screen and (max-width: 600px) {
  .overlay-inner {
    width: 85%;
  }
}
</style>
