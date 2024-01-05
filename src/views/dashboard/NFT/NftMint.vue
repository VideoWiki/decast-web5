<template>
  <div class="idk-company">
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
        <div
          class="vx-row no-gutter justify-center items-center mt-5 main-card"
        >
          <div class="vx-row justify-center items-center w-full h-full">
            <div
              v-if="hasMint == false && loading == false"
              class="bottom vx-col md:w-1/3 w-full"
            >
              <div style="display: flex; justify-content: center">
                <img src="@/assets/images/dashboard/Petcare.svg" class="mt-2" />
              </div>
              <div class="flex flex-wrap justify-center">
                <h3 style="color: #d7df23">Decast NFT</h3>
              </div>
              <p v-if="public_nft_status" class="px-2 mt-5 small-text">
                Open the box to view the NFT details!
              </p>
              <div style="display: flex; justify-content: center">
                <vs-button
                  v-if="public_nft_status"
                  pill
                  @click="toggleNftView"
                  color="#1d2129"
                  text-color="#1d2129"
                  class="mt-8 mb-4 radius font-bold text-lg shifted-button"
                  >Open Box</vs-button
                >
                <p v-else class="px-2 mt-5 mb-5 small-text text-danger">
                  Minting is not activated.
                </p>
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
                    <div
                      class="vx-col flex flex-wrap lg:w-1/3 justify-center items-center w-full"
                    >
                      <div>
                        <img class="sample-img" v-bind:src="nft_image" />
                      </div>
                    </div>
                    <div class="vx-col lg:w-2/3 pl-2" style="text-align: left">
                      <p class="p-2" style="color: #a6a6a6" v-if="!readMore">
                        NFT Description:
                        {{ nft_description.slice(0, 181) }}
                        <span
                          v-if="nft_description.length > 180"
                          @click="
                            () => {
                              readMore = !readMore;
                            }
                          "
                          style="
                            color: #7448ff;
                            cursor: pointer;
                            font-size: 14px;
                          "
                          >... read more</span
                        >
                      </p>
                      <p
                        class="p-2"
                        v-if="readMore"
                        style="max-height: 100px; overflow-y: scroll"
                      >
                        NFT Description:
                        {{ nft_description }}
                        <span
                          @click="
                            () => {
                              readMore = !readMore;
                            }
                          "
                          style="
                            color: #7448ff;
                            cursor: pointer;
                            font-size: 14px;
                          "
                        >
                          Read Less</span
                        >
                      </p>
                      <p class="p-2" style="color: #a6a6a6">
                        Contract: {{ truncate(contractAddress) }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="vx-row mt-20 w-full flex flex-wrap justify-center align-center no-gutter"
                  >
                    <div
                      class="flex flex-col flex-wrap vx-col md:w-1/1 p-2 mt-4 justify-center items-center"
                    >
                      <div v-if="showSecWall">
                        <Wallet />
                      </div>
                      <br>
                      <vs-button
                        v-if="hasMint == false"
                        pill
                        @click="mint"
                        class="mt-8 mb-4 radius font-semibold text-lg shifted-button"
                        >Mint</vs-button
                      >
                    </div>
                  </div>
                </div>
              </vs-popup>
            </div>
            <div
              v-if="loading == true"
              class="bottom flex flex-wrap items-center justify-center vx-col md:w-3/4 w-full p-2 loading-container"
            >
              <img
                src="@/assets/images/dashboard/giftbox.svg"
                style="height: 100px; width: 100px"
                class="loading-img"
                alt="loading"
              />
            </div>
            <div
              v-if="hasMint == true && loading == false"
              class="bottom vx-col md:w-3/4 w-full p-2"
            >
              <div class="w-full mt-5 flex flex-wrap justify-center">
                <div class="hexagon-cover">
                  <div class="hexagon-shadow">
                    <div
                      v-if="nft_image && nft_image.endsWith('.svg')"
                      class="hexagon"
                      v-bind:style="{
                        'background-image': 'url(' + nft_image + ')',
                      }"
                    ></div>
                    <img
                      v-else
                      v-bind:src="nft_image"
                      class="hexagon-nft-img"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap align-items justify-center">
                <vs-dropdown vs-custom-content class="cursor-pointer">
                  <div class="flex items-center relative">
                    <vs-chip
                      style="color: #52c41a"
                      @click="copyTransaction"
                      class="my-2 px-4"
                    >
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
                  src="@/assets/images/dashboard/giftbox.svg"
                />
              </div>

              <div class="flex flex-wrap justify-center">
                <h3 class="my-2 p-2" style="color: #a6a6a6">Decast NFT</h3>
              </div>
              <div class="flex flex-wrap justify-center align-center p-2">
                <p class="px-2 mb-1 small-text" v-if="!readMore">
                  {{ nft_description.slice(0, 181) }}
                  <span
                    v-if="nft_description.length > 180"
                    @click="
                      () => {
                        readMore = !readMore;
                      }
                    "
                    style="color: #7448ff; cursor: pointer; font-size: 14px"
                    >... read more</span
                  >
                </p>
                <p
                  class="px-2 mb-1 small-text"
                  v-if="readMore"
                  style="max-height: 75px; overflow-y: scroll"
                >
                  {{ nft_description }}
                  <span
                    @click="
                      () => {
                        readMore = !readMore;
                      }
                    "
                    style="color: #7448ff; cursor: pointer; font-size: 14px"
                  >
                    read less</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constant from '../../../../constant';
import axios from 'axios';
import NavBarDropNft from '../../../layouts/components/navbar/NavBarDropNft.vue';
import TheNavbarVertical from '../../../layouts/components/navbar/VerticalNavbarDropNft.vue';
import navMenuItems from '../../../layouts/components/vertical-nav-menu/navMenuItems';
import VerticalNavMenuDropNft from '../../../layouts/components/vertical-nav-menu/VerticalNavMenuDropNft.vue';
import themeConfig from '../../../../themeConfig';
import networks from '../../create-event/netwoks';
import { ethers } from 'ethers';
import Wallet from '../../../layouts/components/navbar/components/Connect_Wallet.vue';
export default {
  components: {
    NavBarDropNft,
    TheNavbarVertical,
    VerticalNavMenuDropNft,
    Wallet,
  },
  name: 'NftMint',
  data() {
    return {
      verNav: false,
      horiNav: true,
      mintPopup: false,
      disableCopy: false,
      contractAddress: '',
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
      showSecWall:true,
    };
  },
  methods: {
    async getid() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const iuri = await contract.balanceOf(this.accountAddress);
      console.log(iuri, 'iuri');
      return iuri;
    },
    async fetchWallet() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          return accounts[0];
        } catch (error) {
          console.log('Error connecting...');
        }
      } else {
        alert('Meta Mask not detected');
      }
    },

    async getjson() {
      console.log('json cllled');
      const iuri = await this.getid();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const tid = iuri._hex;
      console.log(iuri, iuri._hex, tid, 'dkjdidi');
      try {
        const uri = await contract.tokenURI(tid);
        console.log(uri, 'jgjffh');
        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(uri)}`,
          {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        );
        console.log(response, 'tokenmk');
        this.nft_image = response.data.image;
        this.nft_description = response.data.description;
      } catch (e) {
        console.log(JSON.stringify(e), 'ofokfm');
        console.log(e, 'rororo');
      }
    },
    copyTransaction() {
      if (this.disableCopy) {
        return;
      }
      this.disableCopy = true;
      setTimeout(() => {
        this.disableCopy = false;
      }, 2000);
      navigator.clipboard.writeText(this.transactionHash);
      this.$vs.notify({
        title: 'Copied',
        text: 'Transaction id copied',
        color: 'success',
      });
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
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
        });
        if (res.data.status === true) {
          return res;
        }
      } catch (err) {
        return null;
      }
    },
    async getMintIdUtil(payload) {
      const res = await this.$store.dispatch('studio/publicGetMintId', payload);
      return res;
    },
    async updateWallet(status, mintId) {
      await this.$store
        .dispatch('studio/publicUpdateMint', {
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
          status: status,
          mint_id: mintId,
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
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    async verifyWallet() {
      try {
        await this.verifyWalletUtil();
        return true;
      } catch (err) {
        return false;
      }
    },
    async verifyWalletUtil() {
      const res = await this.$store.dispatch('studio/publicVerifyWallet', {
        cast_id: this.$route.query.cast_id,
        public_address: this.accountAddress,
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
        cast_id: this.$route.query.cast_id,
        public_address: this.accountAddress,
      });
      return res;
    },
    toggleNftView(){
      if(this.isConnected){
        this.showSecWall=false;
      }
      this.mintPopup=true;
    },
    async mint() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer, 'sign');
      const abi = this.abi;
      const functionParameters = this.params;
      const functionName = this.functionName;
      console.log(functionName, functionParameters, 'fkfjhhj');
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract, this.contract, 'cont');
      console.log(contract, contract.tokenURI, 'token');
      console.log('connected', this.isConnected);
      if (this.isConnected) {
        console.log('connected', this.isConnected);
        console.log(window.ethereum.networkVersion, 'mdoom,m');
        console.log(this.network, 'fjko');
        if (window.ethereum.networkVersion === this.network) {
          try {
            this.$vs.loading();
            await this.addWallet();
            const verifiedWallet = await this.verifyWallet();
            if (verifiedWallet) {
              const value = ethers.utils.parseEther(this.price);
              const transactionOptions = {
                // value: value,
                gasLimit: 3000000,
              };
              const tx = await contract[functionName](
                ...Object.values(functionParameters),
                transactionOptions
              );
              console.log(tx, 'ycndu');
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
              await this.updateWallet('successful', receipt.transactionHash);
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            } else {
              const mintIsStatus = await this.getMindId();
              if (mintIsStatus != null) {
                this.$vs.notify({
                  title: 'Cannot Add Again',
                  text: 'You have already minted the nft',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'warning',
                });
                this.$vs.loading.close();
                this.transactionHash = mintIsStatus.data.hashed_id;
                this.hasMint = true;
              } else {
                this.$vs.loading.close();
                this.$vs.notify({
                  title: 'Error',
                  text: 'Invalid Wallet Address',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger',
                });
              }
            }
          } catch (e) {
            console.log(e, 'check nft');
            if (e.code === 'INSUFFICIENT_FUNDS')
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            else if (
              e.data.message === 'The sender address has a zero balance'
            ) {
              console.log(e.data, data, 'check nft');
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            } else {
              console.log(e.response);
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Wallet is not added for this cast. Please join the cast with this wallet to claim your NFT Or an error occurred while minting',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            }
            this.$vs.loading.close();
            console.log('Minting Error', e);
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
      if (this.$refs.mint_popup)
        this.$refs.mint_popup.$el.childNodes[1].childNodes[0].style.display =
          'none';

      const urlParam = new URLSearchParams(window.location.search);
      const castId = urlParam.get('cast_id');
      await axios
        .get(
          `${constant.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${castId}`,
          {
            'Access-Control-Allow-Origin': '*',
          }
        )
        .then((res) => {
          /* *****UNCOMMENT THE BELOW TO FETCH DATA FROM BACKEND********* */
          this.contractAddress = res.data.contract_adress;
          this.abi = res.data.aib;
          this.functionName = res.data.mint_function_name;
          this.network = res.data.network;
          this.params = res.data.parameter;
          this.price = res.data.price;
          this.nft_description = res.data.description;
          this.nft_image = res.data.image;
          this.pub_nft_flow = res.data.pub_nft_flow;
          this.public_nft_status = res.data.nft_activated;
        });
      if (!this.pub_nft_flow) {
        this.$router.push('/error/404');
      }
    } catch (e) {
      this.$router.push('/error/404');
      console.log(e);
    }
    this.switchNetworkRinkeby(this.network);
  },
};
</script>
<style>
#mint-popup-cover .vs-popup {
  background: linear-gradient(#1f272f, #1f272e) !important;
  background: -o-linear-gradient(#1f272f, #1f272e) !important;
  background: -moz-linear-gradient(#1f272f, #1f272e) !important;
  background: -webkit-linear-gradient(#1f272f, #1f272e) !important;

  min-width: 50vw;
  min-height: 50vh;
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
.idk-company {
  background: #000000;
  background-image: url('../../../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.layout--main {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  overflow: hidden;
  /* background-color: #7448ff; */
  /* background-image: url('@/assets/images/create-event/background-mask.png'); */
  /* linear-gradient(105.14deg, #7448FF 2.88%, #200087 102.78%); */
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
  min-height: 70vh !important;
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
.bottom {
  margin-top: 10vh;
  background: #1f272f;
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
  background: #d7df23 !important;
  color: #1f272f !important;
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
