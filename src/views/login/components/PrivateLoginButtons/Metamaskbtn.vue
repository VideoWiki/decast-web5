<template>
  <div>
    <div class="flex flex-wrap my-6 px-6">
      <vs-button
        @click="walletUse"
        color="orange"
        class="w-full text-black text-center content-center self-top"
        ><div class="justify-content text-center inline-flex ml-6">
          <span
            class="flex self-center content-center justify-content-center ml-4"
          >
            <h3
              class="self-center align-center"
              style="text-align: center; color: white"
            >
              <b>Connect Wallet</b>
            </h3>
          </span>
        </div></vs-button
      >
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import constants from '../../../../../constant';

export default {
  name: 'SignInMetaMask',
  data() {
    return {
      constants,
      nonce: '',
      signature: '',
      publicAddress: '',
      coinbase: '',
      verify: this.payload,
    };
  },
  props: ['payload'],
  mounted() {
    console.log(this.payload,'pvt pay')
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    // Metamsask Connection
    async handleSignMessage(publicAddress, nonce) {
      // Loading
      this.$vs.loading();
      try {
        const web3 = new Web3(Web3.givenProvider);
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          '' // MetaMask will ignore the password argument here
        );
        this.signature = signature;
        this.nonce = nonce;
        // Send signature to backend for auth...
        this.$store
          .dispatch('auth/sendSignature', {
            signature: this.signature,
            nonce: this.nonce,
          })
          .then((res) => {
            // uncomment the statment below before pushing wile
            this.$vs.loading.close();

            // Remove the statment below before pushing wile
            this.$vs.notify({
              title: this.$t('Login.notify.title'),
              text: 'Login Successfull',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
            this.$acl.change(this.activeUserInfo.userRole);
            this.$router.push('/');
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.signmessage'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
    },
    async loginWithMetamask() {
      // if (!this.checkLogin()) return;
      this.publicAddress = '';
      this.signature = '';
      this.nonce = '';
      this.coinbase = '';
      const web3 = new Web3(Web3.givenProvider);
      if (!web3.givenProvider) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.install'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.activate'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      this.publicAddress = account.toLowerCase();
      this.$store
        .dispatch('auth/getNonce', { public_add: this.publicAddress })
        .then((res) =>
          // Popup MetaMask confirmation to sign message
          this.handleSignMessage(this.publicAddress, res.data.nonce)
        )
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('Metamasklogin.tryagain'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    async connectWallet() {
      await ethereum.send('eth_requestAccounts');
      // Get a Web3 instance for the wallet
      const web3 = new Web3(Web3.givenProvider);
      // Get list of accounts of the connected wallet
      const accounts = await web3.eth.getAccounts();
      // MetaMask does not give you all accounts, only the selected account
      const selectedAccount = accounts[0].toLowerCase();
      const payload = {
        cast_id: this.verify.cast_id,
        email: this.verify.email,
        public_address: selectedAccount,
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
    walletUse() {
      console.log(178);
      this.loginWithMetamask();
    },
  },
};
</script>

<style scoped>
.wallet-btn {
  padding: 2em 1em;
  width: 27rem !important;
  background-color: rgba(175, 165, 165, 0.527);
  color: #312e2ed1;
  border-radius: 6px;
  height: 50px;
  display: inline-flex !important;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
}

h3 {
  font-size: 1.17em;
}

.meta-btn:hover {
  box-shadow: 0 4px 8px 0 rgba(175, 165, 165, 0.527);
  background-color: #ff7b0086 !important;
  color: #ff7b00fb;
  transform: scale(1.1);
  transition: transform 0.2s;
}
.wallet-icon {
  width: 4rem;
  height: 2.5rem;
}
@media only screen and (max-width: 600px) {
  .wallet-btn {
    width: 20rem !important;
  }
}
</style>
