<template>
  <div class="nft-container pt-4">
    <div class="head-container">
      <h3>Add drops - NFT</h3>
      <button @click="closeDrops">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="horizontal-line"></div>

    <div class="mid-1">
      <div>
        <span :style="{ color: nftIsChecked ? '#31a2f4' : 'gray' }">NFTs</span>
        <ToggleSwitch @toggle="toggleNftSwitch()" />
        <span :style="{ color: tokenIsChecked ? '#31a2f4' : 'gray' }"
          >Token</span
        >
      </div>
      <div>
        <span>NFT Distribution - </span>
        <span :style="{ color: publicIsChecked ? '#31a2f4' : 'gray' }"
          >Public</span
        >
        <ToggleSwitch @toggle="togglePrivateSwitch()" />
        <span :style="{ color: privateIsChecked ? '#31a2f4' : 'gray' }"
          >Private</span
        >
      </div>
    </div>

    <div class="mid-2">
      <div>
        <label for="select">Select a network</label>
        <br />
        <select
          name="network-select"
          id="network-select"
          v-model="stepOneProps.network"
          @change="updateNetwork"
        >
          <option value="41">Telos EVM Testnet</option>
          <option value="1">Ethereum</option>
          <option value="5">Goerli Testnet RPC</option>
          <option value="137">Polygon</option>
          <option value="40">Telos EVM Mainnet</option>
          <option value="11155111">Sepolia</option>
        </select>
      </div>
      <div>
        <label for="input2"
          >Contact address <span class="text-danger">*</span></label
        >
        <br />
        <input
          type="text"
          id="contract_address"
          v-model="stepOneProps.contract_address"
          placeholder=" Ex: 0x0710A4F91Dfa5c88A81A5b7a767"
          v-on:change="valueCheck()"
          @keyup="valueCheck()"
        />
        <br />
        <span
          class="text-danger text-sm mt-1"
          v-show="stepOneProps.contract_address_error"
          >Contact Address is required</span
        >
      </div>
    </div>

    <div class="mid-3">
      <label>ABI <span class="text-danger">*</span></label>
      <br />
      <textarea
        id="aib"
        v-model="stepOneProps.aib"
        v-on:change="valueCheck()"
        @keyup="valueCheck()"
        placeholder='Ex: [{"internalType": "uint256}]'
      ></textarea>
      <br />
      <span class="text-danger text-sm mt-1" v-show="stepOneProps.aib_error"
        >ABI field is required</span
      >
    </div>

    <div class="mid-4">
      <div>
        <label for="select"
          >Parameters <span class="text-danger">*</span></label
        >
        <br />
        <input
          type="text"
          id="parameter"
          v-model="stepOneProps.parameter"
          v-on:change="valueCheck()"
          @keyup="valueCheck()"
          placeholder="Ex: {_count:1}"
        />
      </div>
      <div>
        <label for="select"
          >Mint Function Name <span class="text-danger">*</span></label
        >
        <br />
        <input
          type="text"
          placeholder=" Ex: mintNFTs"
          id="mint_function_name"
          v-model="stepOneProps.mint_function_name"
          v-on:change="valueCheck()"
          @keyup="valueCheck()"
        />
        <br />
        <span
          class="text-danger text-sm mt-1"
          v-show="stepOneProps.mintfnc_name_error"
          >Mint Function field is required</span
        >
      </div>
      <div>
        <label for="input2">Price <span class="text-danger">*</span></label>
        <br />
        <input
          type="text"
          placeholder=" Ex: 0.0009 (ETH)"
          id="price"
          v-model="stepOneProps.price"
          v-on:change="valueCheck()"
          @keyup="valueCheck()"
        />
      </div>
    </div>

    <div class="mid-5">
      <div>
        <label>Description <span class="text-danger">*</span></label>
        <br />
        <textarea
          id="nft_description"
          v-model="stepOneProps.nft_description"
          v-on:change="valueCheck()"
          @keyup="valueCheck()"
          placeholder="Explain the utility of the NFT"
        ></textarea>
      </div>
      <div id="sample-nft">
        <label>Sample NFT <span class="text-danger">*</span> -</label>
        <div>
          <button @click="openUpload">Select file</button>
          <input
            type="file"
            class="hidden"
            name="Sample nft"
            id="nft_image"
            ref="nft_image"
            v-on:change="uploadSampleNft"
          />
          <p style="max-width: 100px; overflow: hidden">{{ sampleName }}</p>
          <!-- <button>
              <img src="@/assets/images/delete.svg" />
            </button> -->
        </div>
      </div>
    </div>

    <div class="add-cont" @click.stop="addNft(true)">
      <button>Update NFT</button>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '../../../SetUpCasts/Tabs/ToggleSwitch.vue';
import buttonToggle from '../../../SetUpCasts/Tabs/buttonToggle.vue';
export default {
  name: 'NftEdit',
  props: ['cast_id', 'currStatus', 'ToggleEdit'],
  components: {
    ToggleSwitch,
    buttonToggle,
  },
  data() {
    return {
      nftIsChecked: true,
      tokenIsChecked: false,
      publicIsChecked: true,
      privateIsChecked: false,
      textColor: 'blue',
      sampleName: 'No File Selected',
      isChecked: true,
      nftDetails: null,
      localStatus: this.currStatus,
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '',
        audienceAirdrop: true,
        give_vc: false,
        airdropType: 'NFTs',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        data_token: false,
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: false, // Changed from the first object's 'true' to the second object's 'false'
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
        nft_t_ype: 'NFTs', // Appears only in the first object, I'll keep it here
        nft_type: 'NFTs', // Appears only in the first object, I'll keep it here
        generated_event_title: '',
        event_name: '',
        invalidTimeError: false,
        moderator_password: '',
        attendee_password: '',
        meeting_type: 'public',
        schedule_time: '',
        description: '',
        max_participant: 100,
        short_description: '',
        hide_users: false,
        event_name_error: false,
        moderator_password_error: false,
        attendee_password_error: false,
        viewer_password_error: false,
        description_error: false,
        description_length_error: false,
        schedule_time_error: false,
        meeting_type_error: false,
        event_name_length_error: false,
        start_now: false,
      },
    };
  },
  computed: {
    castList() {
      return this.$store.state.cast.castsInfo;
    },
    castInfoList() {
      return this.$store.state.cast.casts;
    },
  },
  watch: {
    publicIsChecked(newValue) {
      if (newValue) {
        this.typeOfNft();
      }
    },
    privateIsChecked(newValue) {
      if (newValue) {
        this.typeOfNft();
      }
    },
  },
  async mounted() {
    if (this.cast_id === 'vw.svg') {
      return;
    }
    await this.castInfo();
    this.getNFTDetails();
    document.getElementById('loading-bg').style.display = 'none';
    console.log(this.cast_id, 'cast_id');
    // this.togglePrivateSwitch();
  },
  methods: {
    getNFTDetails() {
      this.$vs.loading();
      const payload = this.cast_id;
      this.$store
        .dispatch('cast/recieveNFTDetails', payload)
        .then((res) => {
          this.nftDetails = res.data;
          if (this.nftDetails && this.nftDetails.pub_nft_flow == false) {
            this.publicIsChecked = false;
            this.privateIsChecked = true;
          }
          console.log(this.nftDetails, 'mfjf');
          console.log('working receieving');
          console.log(res, 'netwrok');
          this.stepOneProps.mint_function_name = res.data.mint_function_name;
          this.stepOneProps.contract_address = res.data.contract_adress;
          this.stepOneProps.nft_description = res.data.description;
          this.stepOneProps.network = res.data.network;
          this.stepOneProps.parameter = JSON.stringify(res.data.parameter);
          this.stepOneProps.public_stream_nfts = JSON.stringify(
            res.data.pub_nft_flow
          );
          this.stepOneProps.aib = JSON.stringify(res.data.aib);
          this.stepOneProps.image = res.data.image;
          this.stepOneProps.nft_image = res.data.image;
          this.stepOneProps.price = res.data.price;
          if (this.stepOneProps.public_stream_nfts === 'false') {
            this.stepOneProps.give_nft = true;
          }
          const imageUrl = res.data.image;
          const url = new URL(imageUrl);
          const imageName = url.pathname.split('/').pop();
          this.sampleName = imageName;
          console.log(this.stepOneProps);
          this.$vs.loading.close();
        })
        .catch((e) => {
          console.log('error in receibing', e);
        });
    },
    async castInfo() {
      const payload = this.cast_id;
      await this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          this.stepOneProps.send_otp = response.data.meeting_info.send_otp;
          this.stepOneProps.public_otp = response.data.meeting_info.public_otp;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(JSON.stringify(err));
        });
    },
    updateNetwork(event) {
      this.stepOneProps.network = event.target.value;
    },
    toggleTextColor(type) {
      if (type === 'NFTs') {
        this.textColor = this.nftIsChecked ? '#31a2f4' : 'gray';
      } else if (type === 'Token') {
        this.textColor = this.tokenIsChecked ? 'gray' : '#31a2f4';
      } else if (type === 'private') {
        this.textColor = this.privateIsChecked ? '#31a2f4' : 'gray';
      } else if (type === 'public') {
        this.textColor = this.publicIsChecked ? 'gray' : '#31a2f4';
      }
      // console.log('colortype', type);
    },
    toggleNftSwitch() {
      this.nftIsChecked = !this.nftIsChecked;
      this.tokenIsChecked = !this.tokenIsChecked;
      this.typeOfNft();
      console.log('NFT switch toggled');
    },
    togglePrivateSwitch() {
      this.publicIsChecked = !this.publicIsChecked;
      this.privateIsChecked = !this.privateIsChecked;
      console.log(this.privateIsChecked, 'toggle');
      const type = this.privateIsChecked ? 'private' : 'public';
      this.typeOfNft();
      this.updateGiveNft();
      console.log(this.stepOneProps);
      this.updateDistributionType(type);
    },
    updateAirdropType(type) {
      this.stepOneProps.airdropType = type;
      if (type === 'NFTs') {
        this.toggleTextColor('NFTs');
        this.updateGiveNft();
        this.nftIsChecked = true;
        this.tokenIsChecked = false;
      } else if (type === 'Token') {
        this.toggleTextColor('Token');
        this.updateGiveNft();
        this.tokenIsChecked = true;
        this.nftIsChecked = false;
      }
    },
    updateDistributionType(type) {
      console.log('update called with type:', type);
      if (type === 'private') {
        this.toggleTextColor('private');
        this.privateIsChecked = true;
        const e = this.privateIsChecked ? 'private' : 'public';
        this.typeOfNft(e);
        this.updateGiveNft(e);
        this.publicIsChecked = false;
        this.stepOneProps.public_stream_nfts = false;
        this.stepOneProps.public_nft_flow = false;
      } else if (type === 'public') {
        this.toggleTextColor('public');
        this.privateIsChecked = false;
        const e = this.privateIsChecked ? 'private' : 'public';
        this.publicIsChecked = true;
        this.typeOfNft(e);
        this.updateGiveNft(e);
        this.stepOneProps.public_stream_nfts = true;
        this.stepOneProps.public_nft_flow = true;
      }
    },
    updateGiveNft(e) {
      console.log(e, 'updatenft');
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
    openUpload() {
      document.getElementById('nft_image').click();
    },
    valueCheck(e) {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs'
      ) {
        if (this.stepOneProps.mint_function_name.length !== 0)
          this.stepOneProps.mintfnc_name_error = false;
        if (this.stepOneProps.contract_address.length !== 0)
          this.stepOneProps.contract_address_error = false;
        if (this.stepOneProps.aib.length !== 0)
          this.stepOneProps.aib_error = false;
        if (this.stepOneProps.nft_description.length !== 0)
          this.stepOneProps.nft_description_error = false;
        if (this.stepOneProps.nft_image !== '')
          this.stepOneProps.nft_image_error = false;
      }
    },
    canSubmitNft() {
      console.log(
        this.stepOneProps.audienceAirdrop,
        this.stepOneProps.airdropType,
        this.stepOneProps.mint_function_name,
        this.stepOneProps.contract_address,
        this.stepOneProps.aib,
        this.stepOneProps.nft_description,
        this.stepOneProps.nft_image,
        'stepproo'
      );
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs' &&
        (this.stepOneProps.mint_function_name === '' ||
          this.stepOneProps.contract_address === '' ||
          this.stepOneProps.aib === '' ||
          this.stepOneProps.nft_description === '' ||
          this.stepOneProps.nft_image === '')
      ) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs'
        ) {
          this.stepOneProps.mintfnc_name_error =
            this.stepOneProps.mint_function_name === '';
          this.stepOneProps.contract_address_error =
            this.stepOneProps.contract_address === '';
          this.stepOneProps.aib_error = this.stepOneProps.aib === '';
          this.stepOneProps.nft_image_error =
            this.stepOneProps.nft_image === '';
          this.stepOneProps.nft_description_error =
            this.stepOneProps.nft_description === '';
        }
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        console.log('error');
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          color: 'danger',
        });
        return false;
      } else {
        console.log('success');
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        return true;
      }
    },
    closeDrops() {
      this.ToggleEdit('');
    },
    async addNft(x) {
      console.log(x, this.stepOneProps, 'hope');
      if (
        this.publicIsChecked === false &&
        this.stepOneProps.meeting_type === 'public'
      ) {
        this.$vs.notify({
          title: 'Action required',
          text: 'Please collect attendee emails or stream privately before changing to private NFT.',
          color: 'warning',
        });
        return;
      } else {
        if (this.canSubmitNft()) {
          const id = this.cast_id;
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
          payload.append('public_meeting_id', id);
          this.$vs.loading();
          await this.$store
            .dispatch('studio/updateNftDetails', payload)
            .then(async (res) => {
              if (x) {
                this.$vs.notify({
                  time: 6000,
                  title: 'Airdrop Details Updated',
                  color: 'success',
                });
                this.closeDrops();
                this.$vs.loading.close();
                this.airdrops = false;
              }
            })
            .catch((e) => {
              console.log(JSON.stringify(e));
              if (e) {
                console.log(e);
                this.$vs.loading.close();
                this.$vs.notify({
                  time: 6000,
                  title: 'Error',
                  text: e.response.data.message,
                  color: 'danger',
                });
              }
            });
        }
      }
    },
    resetFields() {
      this.stepOneProps = {
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        mint_function_name: '',
        mintfnc_name_error: false,
        price: '',
        nft_description: '',
        nft_image_error: false,
      };
      this.sampleName = 'No file selected';
      this.$refs.nft_image.value = '';
    },
    typeOfNft(e) {
      console.log(e, 'typeNFT');
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
            color: 'warning',
          });
        } else {
          this.stepOneProps.give_nft = true;
        }
      }
    },
    uploadSampleNft(event) {
      if (event.target.files.length > 0) {
        this.stepOneProps.nft_image = event.target.files[0];
        this.sampleName = event.target.files[0].name;
        this.stepOneProps.nft_image_error = false;
      } else {
        this.stepOneProps.nft_image_error = true;
        this.sampleName = 'No file selected';
        this.stepOneProps.nft_image = null;
      }
    },
  },
};
</script>

<style scoped>
.nft-container {
  max-width: 590px;
  min-height: 575px;
  height: auto;
  margin: auto;
  top: 10px;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
}

button {
  cursor: pointer;
}

.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.horizontal-line {
  border: 1px solid #31394e;
  width: 588px;
  margin: auto;
  margin-top: 10px;
}

.mid-1 {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.mid-1 div {
  font-size: small;
  font-weight: 500;
  display: flex;
  gap: 5px;
}

.mid-2,
.mid-4 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.mid-2,
.mid-3,
.mid-4 div label {
  font-size: 12px;
  color: #637181;
}

.mid-2 div select,
input {
  width: 260px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  color: #a6a6a8;
  padding: 5px 10px 5px 10px;
  font-size: 13px;
}

option {
  color: #a6a6a8;
}

.mid-3 {
  margin-top: 20px;
}

.mid-3 textarea {
  resize: none;
  width: 558px;
  background-color: #1d232b;
  color: #a6a6a8;
  height: 100px !important;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 8px;
  margin-top: 6px;
  color: #a6a6a8;
  font-size: 13px;
}

.mid-4 div input {
  width: 175px;
}

.mid-5 div label {
  font-size: 12px;
  color: #637181;
}

.mid-5 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.mid-5 div textarea {
  resize: none;
  width: 275px;
  background-color: #1d232b;
  color: #a6a6a8;
  height: 85px !important;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 8px;
  margin-top: 6px;
  color: #a6a6a8;
  font-size: 13px;
}

#sample-nft {
  width: 250px;
  margin: auto;
}

#sample-nft label {
  font-size: 13px;
  color: #a6a6a8;
}

#sample-nft div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

#sample-nft div button:nth-child(1) {
  background-color: #2d3a48;
  border-radius: 6px;
  color: #a6a6a8;
  border: none;
  outline: none;
  width: 115.6px;
  height: 34px;
}

#sample-nft div button:nth-child(3) {
  background-color: #1f272f;
  border: none;
  outline: none;
  width: 16px;
  height: 18px;
  margin: auto;
}

#sample-nft div p {
  margin: auto;
  font-size: 12px;
}

#sample-nft div button img {
  width: 14px;
  height: 16px;
  margin: auto;
}

.add-cont {
  display: flex;
  justify-content: flex-end;
}

.add-cont button {
  background-color: #d7df23;
  color: #1f272f;
  font-weight: 700;
  font: bold;
  width: 91px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
}

@media screen {
}
</style>
