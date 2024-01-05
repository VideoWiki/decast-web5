<template>
  <div class="vx-col md:w-1/1 w-full mt-10 px-10 flex flex-wrap">
    <div class="vx-card no-shadow card-border px-5 py-10 flex flex-wrap">
      <div
        v-if="
          stepOneProps.audienceAirdrop && stepOneProps.airdropType == 'NFTs'
        "
        class="vx-row w-full mt-10"
      >
        <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
          <label class="m-0">Select a Network</label>
          <vs-collapse
            open-hover
            class="selectType form-group w-full normal custom-select"
            id="network"
          >
            <vs-collapse-item>
              <div
                slot="header"
                style="padding: 0px"
                class="flex flex-wrap items-center"
              >
                <img
                  :src="selectedNetwork.image"
                  style="
                    margin-right: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                  "
                />
                {{ selectedNetwork.text }}
              </div>
              <div class="flex flex-wrap justify-center items-center">
                <div
                  :key="index"
                  style="width: 100%"
                  class="mb-2 custom-select-item-hover"
                  @click="selectNetwork(item.value, item.text, item.image)"
                  v-for="(item, index) in network"
                >
                  <div class="flex flex-wrap align-center" style="width: 250px">
                    <img
                      :src="item.image"
                      style="
                        margin-right: 20px;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                      "
                    />
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </div>
        <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
          <label class="m-0"
            >Contract Address <span class="text-danger">*</span></label
          >
          <vs-input
            id="contract_address"
            v-model="stepOneProps.contract_address"
            class="w-full form-group"
            placeholder="Ex: 0x0710A4F91Dfa5c88A81A5b7a7670b579880dA5Df"
            v-on:change="valueCheck()"
            @keyup="valueCheck()"
          />
          <span
            class="text-danger text-sm mt-1"
            v-show="stepOneProps.contract_address_error"
            >Contact Address is required</span
          >
        </div>
        <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
          <label class="m-0">ABI <span class="text-danger">*</span></label>
          <vs-textarea
            id="aib"
            v-model="stepOneProps.aib"
            class="w-full form-group"
            placeholder='Ex: [{"internalType": "uint256","name": "_count","type": "uint256"}]'
            rows="4"
            v-on:change="valueCheck()"
            @keyup="valueCheck()"
          /><span
            class="text-danger text-sm mt-1"
            v-show="stepOneProps.aib_error"
            >ABI field is required</span
          >
        </div>
        <div class="vx-col md:w-3/3 w-full mt-5 flex flex-wrap form-group">
          <label class="m-0"
            >Description <span class="text-danger">*</span></label
          >
          <vs-textarea
            id="nft_description"
            v-model="stepOneProps.nft_description"
            class="w-full form-group"
            placeholder="Explain the utility of the NFT"
            rows="3"
            v-on:change="valueCheck()"
            @keyup="valueCheck()"
          /><span
            class="text-danger text-sm mt-1"
            v-show="stepOneProps.nft_description_error"
            >Description of NFT is required</span
          >
        </div>
      </div>
      <div
        v-if="stepOneProps.public_stream_nfts === 'false'"
        class="vx-card no-shadow card-border p-5 flex flex-wrap"
      >
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">
            <span class="flex flex-wrap">
              Collect Wallet Address &nbsp;
              <tippy
                content="The wallet information of attendees is saved with encryption and only used for the airdrop configured by the event admin. "
                v-tippy="{ placement: 'top', arrow: true }"
              >
                <span></span>
                <vs-icon
                  icon-pack="feather"
                  icon="icon-info"
                  size="12px"
                  rounded="true"
                  style="align-self: flex-end"
                ></vs-icon>
              </tippy>
            </span>
          </label>
          <div>
            <vs-switch v-model="stepOneProps.give_nft" disabled />
          </div>
        </div>
      </div>
      <div>
        <vs-button
          class="btn-wizard py-4 px-5 my-5 ml-5"
          @click.stop="
            () => {
              addNft(true);
            }
          "
          >Edit Certificate</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
export default {
  data() {
    return {
      cast_Id: this.$route.params.cast_Id,
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '5',
        audienceAirdrop: true,
        airdropType: 'NFTs',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        data_token: false,
        nft_image_error: false,
        password_auth: false,
        auth_type: 'private',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        nft_type: 'vc',
        public_stream_nfts: 'false',
        give_vc: true,
        public_nft_flow: false,
      },
      selectedNetwork: {
        text: 'Goerli Testnet RPC',
        value: '5',
        image: require('../../assets/images/create-event/telosTestnet.png'),
      },
      network: [
        {
          text: 'Ethereum',
          value: '1',
          image: require('../../assets/images/create-event/ethereum.png'),
        },
        {
          text: 'Gnosis',
          value: '100',
          image: require('../../assets/images/create-event/gnosis.svg'),
        },
        {
          text: 'Polygon',
          value: '137',
          image: require('../../assets/images/create-event/polygon.png'),
        },
        {
          text: 'Telos EVM Testnet',
          value: '41',
          image: require('../../assets/images/create-event/telosTestnet.png'),
        },
        {
          text: 'Telos EVM Mainnet',
          value: '40',
          image: require('../../assets/images/create-event/telos.png'),
        },
        {
          text: 'Goerli Testnet RPC',
          value: '5',
          image: require('../../assets/images/create-event/telosTestnet.png'),
        },
      ],
    };
  },
  methods: {
    async selectNetwork(value, text, image) {
      await this.$vs.loading();
      this.selectedNetwork.value = value;
      this.selectedNetwork.text = text;
      this.selectedNetwork.image = image;
      this.stepOneProps.network = value;
      this.$vs.loading.close();
    },
    typeOfNft(e) {
      if (this.stepOneProps.public_stream_nfts === 'true') {
        this.stepOneProps.give_nft = false;
      } else if (this.stepOneProps.public_stream_nfts === 'false') {
        if (!this.stepOneProps.public_otp && !this.stepOneProps.send_otp) {
          this.stepOneProps.public_stream_nfts = 'true';
          this.stepOneProps.give_nft = false;
          this.$vs.notify({
            time: 6000,
            title: 'Access Restriction required',
            text:
              'You need to either collect attendee emails or stream the cast privately with OTP verification, for enabling NFTs' +
              this.stepOneProps.public_stream_nfts,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
          });
        } else {
          this.stepOneProps.give_nft = true;
        }
      }
    },
    uploadSampleNft(event) {
      this.stepOneProps.nft_image = event.target.files[0];
      if (this.stepOneProps.nft_image === '')
        this.stepOneProps.nft_image_error = true;
      else this.stepOneProps.nft_image_error = false;
    },
    valueCheck(e) {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs'
      ) {
        if (this.stepOneProps.contract_address.length !== 0)
          this.stepOneProps.contract_address_error = false;
        if (this.stepOneProps.aib.length !== 0)
          this.stepOneProps.aib_error = false;
        if (this.stepOneProps.nft_description.length !== 0)
          this.stepOneProps.nft_description_error = false;
      }
    },
    async addNft(x) {
      console.log('add nft');
      if (this.canSubmitNft()) {
        var payload = new FormData();
        for (var [key, value] of Object.entries(this.stepOneProps)) {
          if (value.length === 0) {
            value = '';
          } else {
            if (value === false) {
              value = 'False';
            } else if (value === true) {
              value = 'True';
            } else if (value === '') {
              value = '';
            }
          }
          payload.append(key, value);
        }
        payload.append('public_meeting_id', this.cast_Id);
        await this.$store
          .dispatch('studio/updateNftDetails', payload)
          .then(async (res) => {
            console.log(res);
            this.$vs.notify({
              time: 6000,
              title: 'NFT Details Updated',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
            this.$router.push(`/user_details/${this.cast_Id}`);
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            if (e.response.status === 500) {
              this.$vs.notify({
                time: 6000,
                title: 'Error',
                text: 'Server is Down',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            }
            this.$vs.notify({
              time: 6000,
              title: 'Error',
              text: e.response.data.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          });
      }
    },
    canSubmitNft() {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs' &&
        (this.stepOneProps.contract_address === '' ||
          this.stepOneProps.aib === '' ||
          this.stepOneProps.nft_description === '')
      ) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs'
        ) {
          this.stepOneProps.contract_address_error =
            this.stepOneProps.contract_address === '';
          this.stepOneProps.aib_error = this.stepOneProps.aib === '';
          this.stepOneProps.nft_description_error =
            this.stepOneProps.nft_description === '';
        }
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
        return false;
      } else {
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        return true;
      }
    },
    updateGiveNft(e) {
      if (
        this.stepOneProps.audienceAirdrop === true &&
        this.stepOneProps.airdropType === 'NFTs' &&
        this.stepOneProps.public_stream_nfts === 'false'
      ) {
        this.stepOneProps.give_nft = true;
      } else {
        this.stepOneProps.give_nft = false;
      }
    },
    getNFTDetails() {
      this.$vs.loading();
      this.$store
        .dispatch('cast/fetchNFTDetails', this.cast_Id)
        .then((res) => {
          this.stepOneProps.contract_address = res.data.contract_adress;
          this.stepOneProps.nft_description = res.data.description;
          this.stepOneProps.network = res.data.network;
          this.stepOneProps.parameter = JSON.stringify(res.data.parameter);
          this.stepOneProps.public_stream_nfts = JSON.stringify(
            res.data.pub_nft_flow
          );
          this.network.forEach((item) => {
            if (this.stepOneProps.network === item.value) {
              console.log(this.selectedNetwork, item);
              this.selectedNetwork.value = item.value;
              this.selectedNetwork.text = item.text;
              this.selectedNetwork.image = item.image;
              console.log(this.selectedNetwork);
            }
          });
          this.stepOneProps.aib = JSON.stringify(res.data.aib);
          this.stepOneProps.price = res.data.price;
          console.log(this.stepOneProps);
          this.$vs.loading.close();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async castInfo() {
      const payload = this.cast_Id;
      await this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          this.stepOneProps.send_otp = response.data.meeting_info.send_otp;
          this.stepOneProps.public_otp = response.data.meeting_info.public_otp;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(JSON.stringify(err));
          // this.$router.push('/error/404.vue');
        });
    },
  },
  async mounted() {
    if (this.cast_Id === 'vw.svg') {
      return;
    }
    console.log(this.$route.params);
    await this.castInfo();
    this.getNFTDetails();
  },
  created() {},
};
</script>

<style>
.select-roles-1 {
  position: relative;
  margin: 0px;
  padding: 0px !important;
}

.select-roles-1 .vs-collapse-item--header {
  padding: 0.7rem !important;
  border-radius: 6px;
  font-size: 1rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fbfbfc;
}

.select-roles-1 .vs-collapse-item--content {
  position: absolute;
  width: 100%;
  z-index: 99999;
  background: #ffffff;
}

.space {
  justify-content: space-around !important;
}

.select-roles-1 .con-content--item {
  padding: 1rem 0rem 0rem 0.2rem !important;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.select-roles-1 .con-content--item div div {
  padding: 2px;
  border-radius: 1px;
}

.select-roles-item-hover:hover {
  background-color: #8d56f83a;
}

.label-roles {
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  display: inline-block;
  padding-left: 5px;
  text-transform: capitalize;
}
</style>
<style scoped>
.form-group {
  justify-content: space-between;
}

.form-group input {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  font-weight: 500;
}

.formgroup-label {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  text-transform: capitalize;
  padding-left: 5px;
}
</style>
<style>
.sidebar-ut .vs-sidebar {
  width: auto;
  max-width: 90%;
}

.sidebar-ut .vs-sidebar--items {
  background: #7367f0 !important;
  color: #fff !important;
  padding: 5px 10px !important;
  border-radius: 6px;
}

.sidebar-ut .vs-sidebar--items a {
  color: #fff !important;
}

.sidebar-ut .vs-sidebar--items a:hover {
  color: #fff !important;
  background: #0000001a;
  border-radius: 2px;
}

.sidebar-ut .vs-sidebar-primary .vs-sidebar-item-active {
  color: #fff !important;
}

.sidebar-ut .vs-sidebar-primary .vs-sidebar-item {
  color: #fff !important;
}

.dual-toggle {
  cursor: pointer;
  font-size: 16px;
}

.dual-toggle-active {
  background-color: rgb(115, 103, 240);
  color: #ebedf0;
  border-radius: 20px;
}

.dual-toggle .vs-radio--borde {
  border: 2px solid transparent !important;
}

.dual-toggle .vs-radio--input:disabled + .vs-radio {
  opacity: 0;
}

.custom-select {
  position: relative;
}

.custom-select .vs-collapse-item--header {
  padding: 0.7rem !important;
  border-radius: 6px;
  font-size: 1rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fbfbfc;
}

.custom-select .vs-collapse-item--content {
  position: absolute;
  width: calc(100% - 20px);
  z-index: 9999;
  background: #ffffff;
}

.custom-select .con-content--item {
  padding: 1rem 0rem 0rem 0.2rem !important;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.custom-select .con-content--item div div {
  padding: 2px;
  border-radius: 1px;
}

.custom-select-item-hover:hover {
  background-color: #8d56f83a;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.btn {
  padding: 100px 200px 80px 200px;
  cursor: pointer;
  background: rgba(114, 71, 196, 0.1);
  border: 1px dashed #7347c470;
  box-sizing: border-box;
  border-radius: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #7247c4;
}

.btnlogo {
  cursor: pointer !important;
  background: rgba(114, 71, 196, 0.1);
  border: 1px dashed #7347c470;
  box-sizing: border-box;
  border-radius: 12px;
  font-style: normal;
  font-weight: 500;
  background-position: center;
  background-size: contain;
  font-size: 16px;
  color: #7247c4;
  width: 52.48px;
  height: 52.49px;
}

.cursor-pointer {
  cursor: pointer !important;
}

.invisible {
  visibility: hidden;
}

.upload-success {
  color: #191818;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.logo-success {
  color: #ffffff;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.upload-btn-wrapper-logo input[type='file'] {
  font-size: 20px;
  position: relative;
  left: 0;
  top: calc(-52.49px / 1.33);
  width: 52.48px;
  opacity: 0;
  cursor: pointer;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 25%;
  opacity: 0;
  cursor: pointer;
}

.upload-resume-icon {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.button-class {
  padding: 0;
  background: #ffffff !important;
}

.hide {
  display: none;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no {
  margin-bottom: -4px !important;
}

.modal div {
  margin: 20px 0;
}

.up {
  margin-top: -10px !important;
}

.width {
  height: 40% !important;
}
</style>
