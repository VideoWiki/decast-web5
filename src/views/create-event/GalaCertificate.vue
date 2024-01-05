<template>
  <div class="h-screen no-gutter layout--main">
    <vertical-nav-menu-drop-nft
      v-if="windowWidth < 1200"
      :navMenuItems="navMenuItems"
      title="VideoWiki"
      parent=".layout--main"
    />
    <!--Responsive Navbar  -->
    <template v-if="windowWidth >= 1200">
      <nav-bar-drop-nft class="w-full" />
    </template>
    <template v-else>
      <the-navbar-vertical
        :navbarColor="navbarColor"
        :class="[
          { 'text-white': isNavbarDark && !isThemeDark },
          { 'text-base': !isNavbarDark && isThemeDark },
        ]"
      />
    </template>
    <!-- Main Card-->
    <div
      class="flex flex-wrap w-full vx-row no-gutter items-center justify-center center"
    >
      <div class="vx-row no-gutter justify-center items-center mt-5 main-card">
        <div class="vx-row justify-center items-center w-full h-full">
          <div
            v-if="hasMint == false && loading == false"
            class="bottom vx-col md:w-1/3 w-full"
          >
            <div style="display: flex; justify-content: center">
              <img src="../../assets/images/create-event/primary-cube.svg" />
            </div>
            <div class="flex flex-wrap justify-center">
              <h3 style="color: #7448ff">Gala Certificate</h3>
            </div>
            <p v-if="public_nft_status" class="px-2 mt-5 small-text">
              Enter name and mint the Certificate
            </p>
            <div style="display: flex; justify-content: center">
              <vs-button
                pill
                @click="openBox"
                class="mt-8 mb-4 radius shifted-button"
                >Open Box</vs-button
              >
            </div>
            <vs-popup
              ref="mint_popup"
              title=""
              :active.sync="mintPopup"
              id="mint-popup-cover"
            >
              <div
                class="vx-row flex flex-wrap justify-center align-center w-full h-full mint-details p-5"
              >
                <div
                  class="vx-row w-full flex flex-wrap justify-center align-center no-gutter"
                >
                  <div class="pl-2 mb-6 w-full" style="text-align: left">
                    <h4>Certificate</h4>
                    <p class="p-2">
                      This is a standard NFT certificate approved by Gala
                    </p>
                  </div>
                </div>
                <div class="pl-4 w-full">
                  <div class="">
                    <h6 class="mb-4">
                      Name <span class="text-danger">*</span>
                    </h6>
                    <input
                      placeholder="Enter Name to display on Certificate"
                      class="modified-input w-full"
                      autocomplete="off"
                      v-model="name"
                    />
                  </div>
                </div>
                <div
                  class="vx-row w-full flex flex-wrap justify-center align-center no-gutter"
                >
                  <div
                    class="flex flex-wrap w-full p-2 mt-4 justify-center items-center"
                  >
                    <vs-button
                      v-if="hasMint == false"
                      pill
                      @click="getImage"
                      class="mt-8 mb-4 w-full"
                      >Mint</vs-button
                    >
                  </div>
                </div>
                <div
                  class="w-full"
                  style="display: flex; justify-content: center"
                >
                  <img :src="nft_image" class="certificate" />
                </div>
              </div>
            </vs-popup>
          </div>
          <div
            v-if="loading == true"
            class="bottom flex flex-wrap items-center justify-center vx-col md:w-3/4 w-full p-2 loading-container"
          >
            <img
              src="../../assets/images/create-event/loading.png"
              style="height: 100px; width: 100px"
              class="loading-img"
              alt="loading"
            />
          </div>
          <div
            v-if="hasMint && !loading"
            class="bottom vx-col md:w-3/4 w-full p-2"
          >
            <div class="w-full flex flex-wrap justify-center">
              <div class="hexagon-cover">
                <div class="hexagon-shadow">
                  <div
                    v-if="nft_image && nft_image.endsWith('.svg')"
                    class="hexagon"
                    v-bind:style="{
                      'background-image': 'url(' + nft_image + ')',
                    }"
                  ></div>
                  <img v-else v-bind:src="nft_image" class="hexagon-nft-img" />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap align-items justify-center">
              <vs-dropdown vs-custom-content class="cursor-pointer">
                <div class="flex items-center relative">
                  <vs-chip style="color: #52c41a" class="my-2 px-4">
                    Minted #{{ truncateSmaller(transactionHash) }}
                  </vs-chip>
                </div>
                <vs-dropdown-menu class="vx-navbar-dropdown">
                  <ul style="min-width: 9rem">
                    <li class="flex py-2 px-4 font-bold">
                      <span class="ml-2">{{ transactionHash }}</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <div
              class="flex flex-wrap align-center justify-center w-full"
              style="display: flex; justify-content: center"
            >
              <img
                class="open-box"
                src="../../assets/images/create-event/box-open.png"
              />
            </div>

            <div class="flex flex-wrap justify-center">
              <h3 class="my-2 p-2" style="color: #000000">
                {{ this.nft_description }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constant from '../../../constant';
import axios from 'axios';
import NavBarDropNft from '../../layouts/components/navbar/NavBarDropNft.vue';
import TheNavbarVertical from '../../layouts/components/navbar/VerticalNavbarDropNft.vue';
import navMenuItems from '../../layouts/components/vertical-nav-menu/navMenuItems';
import VerticalNavMenuDropNft from '../../layouts/components/vertical-nav-menu/VerticalNavMenuDropNft.vue';
import themeConfig from '../../../themeConfig';
import networks from './netwoks';
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

export default {
  components: {
    NavBarDropNft,
    TheNavbarVertical,
    VerticalNavMenuDropNft,
  },
  name: '',
  data() {
    return {
      verNav: false,
      horiNav: true,
      mintPopup: false,
      contractAddress: '0xF59ae1126e151b3239fCA089A5ed028359aC0553',
      functionName: '',
      abi: [],
      network: '',
      params: {},
      price: 0,
      nft_image: '',
      transactionHash: '',
      nft_description: '',
      loading: false,
      readMore: false,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      navMenuItems: navMenuItems,
      routerTransition: themeConfig.routerTransition || 'none',
      hasMint: false,
      pub_nft_flow: true,
      public_nft_status: true,
      name: '',
      EventName: '',
      client: '',
      walletAddressList: [],
      merkleTree: false,
    };
  },
  methods: {
    openBox() {
      if (!this.isConnected) {
        this.$vs.notify({
          title: 'Wallet not connected',
          text: 'Connect wallet to continue',
          color: 'danger',
        });
        return;
      }
      this.mintPopup = true;
    },
    getMerkleTree() {
      this.$store
        .dispatch('studio/getMerkleTree', this.$route.params.cast_id)
        .then((res) => {
          var leafs = res.data.map((item) => {
            return Uint8Array.from(item.data);
          });
          this.merkleTree = new MerkleTree(leafs, keccak256, {
            sortPairs: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getid() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const iuri = await contract.walletOfOwner(this.accountAddress);
      return iuri;
    },

    makeGatewayURLImage(imgCID, imgName) {
      return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
    },

    async getjson() {
      const iuri = await this.getid();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const tid = parseInt(iuri[iuri.length - 1]._hex);
      try {
        const uri = await contract.tokenURI(tid);
        axios
          .get(uri, {
            'Access-Control-Allow-Origin': '*',
          })
          .then((res) => {
            this.nft_image = res.data.image;
            this.nft_description = res.data.description;
          })
          .catch((e) => {
            console.log(e.response);
          });
      } catch (e) {
        console.log(JSON.stringify(e));
        console.log(e.response);
      }
    },
    async sendEmail() {
      const data = new FormData();
      data.append('email', this.$route.query.email);
      data.append('nft_url', this.nft_image);
      data.append('transaction_id', this.transactionHash);
      var config = {
        method: 'post',
        url: constant.apiCastUrl + '/api/event/post/vc/details/',
        data: data,
      };

      axios(config)
        .then(function (response) {
          this.$vs.notify({
            title: 'Success',
            text: 'NFT details send to ' + this.$route.query.email,
            color: 'success',
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getImage() {
      const mintIsStatus = await this.getMindId();
      if (mintIsStatus !== null) {
        this.$vs.notify({
          title: 'Cannot Add Again',
          text: 'You have already minted the nft',
          color: 'warning',
        });
        return;
      }
      // return;
      try {
        await this.verifyWallet();
      } catch (e) {
        console.log('e', e.response);
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger',
          title: e.response.data.message
            ? e.response.data.message
            : 'User not verified',
        });
        return;
      }
      this.$vs.loading();
      await this.$store
        .dispatch('cast/getImage', this.name)
        .then(async (res) => {
          this.openNotification('bottom-right', 'success', 'Creating NFT');
          this.nft_image = res.data.image_url;
          fetch(res.data.image_url).then(async (response) => {
            const contentType = response.headers.get('content-type');
            const blob = await response.blob();
            const file = new File([blob], 'VC', { contentType });
            const imgCID = await this.client.put([file], { name: 'VC' });
            this.openNotification('bottom-right', 'success', 'Uploading NFT');
            await this.upload(this.makeGatewayURLImage(imgCID, 'VC'));
            this.$vs.loading.close();
          });
        })
        .catch((e) => {
          console.log(e);
          this.$vs.loading.close();
        });
    },
    async upload(img) {
      const metadata = {
        name: 'Gala NFT',
        description: this.nft_description,
        image: img,
        attributes: [
          { trait_type: 'Participant', value: this.name },
          { trait_type: 'Event Name', value: this.EventName },
          { trait_type: 'Event Creator', value: 'Gala' },
          { trait_type: 'Date', value: '10-10-2022' },
        ],
      };
      const blob = new Blob([JSON.stringify(metadata)], {
        type: 'application/json',
      });
      const json = new File([blob], 'metadata.json');
      const jsonCID = await this.client.put([json]);
      this.openNotification('bottom-right', 'success', 'Minting NFT');
      await this.mint(this.makeGatewayURLImage(jsonCID, 'metadata.json'));
    },
    async switchNetworkRinkeby(id) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networks[id].chainId }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: networks[id].chainId,
                  chainName: networks[id].chainName,
                  rpcUrls: [networks[id].rpcUrl],
                  nativeCurrency: {
                    name: networks[id].currencyName,
                    symbol: networks[id].symbol,
                    decimals: 18,
                  },
                  blockExplorerUrls: [networks[id].blockExplorerUrl],
                },
              ],
            });
          } catch (error) {
            alert(error.message);
          }
        }
      }
    },
    openNotification(position = null, color, text) {
      this.$vs.notify({
        position,
        color,
        title: '',
        text,
      });
    },
    truncate(addressString) {
      if (addressString)
        return (
          addressString.slice(0, 4) + '..........' + addressString.slice(38)
        );
    },
    truncateSmaller(x) {
      if (x) return x.slice(0, 4) + '...' + x.slice(x.length - 3);
    },

    async getMindId() {
      try {
        const res = await this.getMintIdUtil({
          cast_id: this.$route.params.cast_id,
          public_address: this.accountAddress,
          nft_type: 'vc',
        });
        if (res.data.status === true) {
          return res;
        }
      } catch (err) {
        return null;
      }
    },
    async getMintIdUtil(payload) {
      const res = await this.$store.dispatch('studio/getMintId', payload);
      return res;
    },
    async updateWallet(status, mintId) {
      await this.$store
        .dispatch('studio/updateMintDetails', {
          cast_id: this.$route.params.cast_id,
          public_address: this.accountAddress,
          status: status,
          mint_id: mintId,
          nft_type: 'vc',
        })
        .then((res) => {
          return res.data.status;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null
                ? err.response.data.message
                : 'Unexpected Error',
            color: 'danger',
          });
        });
    },
    async verifyWallet() {
      const res = await this.$store.dispatch('studio/verifyMintDetails', {
        cast_id: this.$route.params.cast_id,
        public_address: this.accountAddress,
        nft_type: 'vc',
      });
      return res;
    },
    async addWallet() {
      try {
        await this.addWalletUtil();
        return true;
      } catch (err) {
        return false;
      }
    },
    async addWalletUtil() {
      const res = await this.$store.dispatch('studio/publicAddWallet', {
        cast_id: this.$route.params.cast_id,
        public_address: this.accountAddress,
      });
      return res;
    },
    async mint(tokenuri) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const uri = tokenuri;
      const mproof = this.merkleTree.getHexProof(
        keccak256(this.accountAddress)
      );
      const contract = new ethers.Contract(contractAddress, abi, signer);
      if (this.isConnected) {
        if (window.ethereum.networkVersion === this.network) {
          try {
            const mintIsStatus = await this.getMindId();
            if (mintIsStatus !== null) {
              this.$vs.notify({
                title: 'Cannot Add Again',
                text: 'You have already minted the nft',
                color: 'warning',
              });
              this.transactionHash = mintIsStatus.data.hashed_id;
              this.hasMint = true;
            } else {
              const tx = await contract.mintToken(uri, mproof);
              const receipt = await tx.wait();
              this.$vs.loading.close();
              this.loading = true;
              await this.updateWallet('started', '');
              await this.getjson();
              this.openNotification(
                'top-center',
                'success',
                'Congratulations! You just minted an NFT'
              );
              this.transactionHash = receipt.transactionHash;
              this.hasMint = true;
              this.sendEmail();
              await this.updateWallet('successful', receipt.transactionHash);
              setTimeout(() => {
                this.loading = false;
              }, 2000);
            }
          } catch (e) {
            console.log(JSON.stringify(e));
            if (e.code === 'INSUFFICIENT_FUNDS')
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                color: 'danger',
              });
            else if (
              e.data &&
              e.data.message === 'The sender address has a zero balance'
            ) {
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                color: 'danger',
              });
            } else if (e.response) {
              if (e.response.data.public_address_verified) {
                this.$vs.notify({
                  time: 3000,
                  title: 'Error',
                  text: 'Wallet not Added',
                  color: 'danger',
                });
              } else {
                this.$vs.notify({
                  time: 3000,
                  title: 'Error',
                  text: e.response.data.message,
                  color: 'danger',
                });
              }
            } else {
              console.log(e.response);
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Wallet is not added for this cast. Please join the cast with this wallet to claim your NFT Or an error occurred while minting',
                color: 'danger',
              });
            }
            this.$vs.loading.close();
          }
        } else {
          this.switchNetworkRinkeby(this.network);
        }
      } else {
        this.openNotification(
          'top-center',
          'danger',
          'Please Connect to the Wallet'
        );
      }
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === 'horizontal' && this.windowWidth >= 1200) ||
        (layoutType === 'vertical' && this.windowWidth < 1200)
      ) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', false);
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu');
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', true);
      }
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val === '#fff') this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff';
      this.updateNavbarColor(color);
    },
    '$store.state.mainLayoutType'(val) {
      this.setNavMenuVisibility(val);
    },
    navLoad() {
      if (this.$store.state.windowWidth < 1200) {
        this.verNav = true;
        this.horiNav = false;
      } else {
        this.verNav = false;
        this.horiNav = true;
      }
    },
  },
  computed: {
    // usersData() {
    //   return this.$store.state.AppActiveUser;
    // },
    isConnected() {
      return this.$store.state.isWalletConnected;
    },
    accountAddress() {
      return this.$store.state.accountAddress.toLowerCase();
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    },
    contentAreaClass() {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default')
          return 'content-area-reduced';
        else if (this.verticalNavMenuWidth === 'reduced')
          return 'content-area-lg';
        else return 'content-area-full';
      } else return 'content-area-full';
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme === 'dark';
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  created() {
    const color =
      this.navbarColor === '#fff' && this.isThemeDark
        ? '#10163a'
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
  },
  async mounted() {
    try {
      this.client = new Web3Storage({ token: constant.web3ApiKey });
      if (this.$route.params.cast_id === 'vw.svg') {
        return;
      }
      this.getMerkleTree();
      if (this.$refs.mint_popup)
        this.$refs.mint_popup.$el.childNodes[1].childNodes[0].style.display =
          'none';
      this.$refs.mint_popup.$el.childNodes[1].style.minWidth = '500px';
      const payload = this.$route.params.cast_id;
      this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          const responseVal = await response.data;
          this.EventName = responseVal.meeting_info.event_name;
        })
        .catch((err) => {
          if (err.response.data.message === 'invalid cast_id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/error/404');
          }
        });
      await this.$store
        .dispatch('cast/merkelTree', this.$route.params.cast_id)
        .then((res) => {
          this.contractAddress = res.data.contract_adress;
          this.abi = res.data.aib;
          this.network = res.data.network;
          this.nft_description = res.data.description;
        });
    } catch (e) {
      if (e.response.data.message === 'invalid cast_id') {
        this.$vs.notify({
          title: 'Invalid Cast ID',
          color: 'danger',
        });
        this.$router.push('/error/404');
      }
      console.log(e);
    }
    this.switchNetworkRinkeby(this.network);
  },
};
</script>
<style>
#mint-popup-cover .vs-popup {
  background: linear-gradient(#d7e1ec, #ffffff) !important;
  background: -o-linear-gradient(#d7e1ec, #ffffff) !important;
  background: -moz-linear-gradient(#d7e1ec, #ffffff) !important;
  background: -webkit-linear-gradient(#d7e1ec, #ffffff) !important;

  min-width: 60vw;
  min-height: 60vh;
  border: none;
}
#mint-popup-cover .vs-popup--content {
  /* background: rgba(0, 0, 0, 0.8); */
  border-color: none;
  min-height: 60vh !important;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>
<style scoped>
.layout--main {
  background-repeat: no-repeat;
  background-color: #7448ff;
  background-image: url('../../assets/images/create-event/background-mask.png');
  /* linear-gradient(105.14deg, #7448FF 2.88%, #200087 102.78%); */
}

.margin-top {
  margin-top: 100px;
}

.top {
  background: linear-gradient(112.12deg, #7448ff 1.33%, #7247c4 115.24%);
  border-radius: 12px 12px 0px 0px;
  background-repeat: no-repeat;
}
h3 {
  text-align: center;
}
.small-text {
  text-align: center;
}
.main-card {
  /* border-radius: 12px;
    background-color: #f4f5f7; */
  min-width: 70vw !important;
  min-height: 90vh !important;
}

.popup-mint-cover {
  width: 60vw;
}
.mint-details {
  color: #000000;
}
.sample-img {
  width: 200px !important;
  height: auto !important;
}
.hexagon img {
  width: 120px;
  height: 120px;
}
.card-top-img {
  transform: translate(0px, -40px);
}
.loading-container {
  height: 60vh !important;
}
.loading-img {
  animation: mymove 2s ease-in-out infinite;
}
.modified-input {
  height: 60px;
  border: none;
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
}
.verification-input {
  height: 60px;
  border: none;
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

@keyframes mymove {
  100% {
    transform: rotate(360deg);
  }
}
.title {
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  /* line-height: 70px; */
  color: #ffffff;
}

.vs-popup--content {
  overflow: hidden;
}

.bottom {
  background: #ffffff;
  height: 75%;
  box-shadow: 0px 30px 40px rgba(160, 142, 215, 0.1);
  border-radius: 12px;
}
.minted-msg {
  padding: 10px;
  font-size: 28px;
}
h3 {
  font-weight: bold;
  font-size: 28px;
}
form {
  text-align: center;
}
.text {
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  text-transform: capitalize;

  color: #000000;
}

.certificate {
  width: 96%;
}

p {
  font-weight: normal;
  font-size: 18px;
  letter-spacing: -0.005em;
}
.small-text,
.minted-msg {
  font-weight: normal;
  font-size: 18px;
  letter-spacing: -0.005em;
  text-align: center;
  color: #909090;
}
.shifted-button {
  background: #7367f0 !important;
  border-radius: 20px;
  padding-left: 5rem;
  padding-right: 5rem;
}
.custom-header {
  height: 100px;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
  /*justify-content: space-between!important;
    padding-left: 120px!important;
    padding-right: 15px!important;*/
}
.hexagon-nft-img {
  background: #7247c4;
  height: 145px !important;
  min-height: 145px !important;
  width: 145px;
  -webkit-clip-path: polygon(0 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.hexagon-cover {
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
}
.hexagon-shadow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #7347c42f;
  -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.hexagon {
  width: 90%;
  height: 90%;
  z-index: 2;
  background-color: #7247c4;
  -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

.open-box {
  width: 150px;
  height: auto;
}
</style>
