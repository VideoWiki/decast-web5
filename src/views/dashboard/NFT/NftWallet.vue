<template>
  <div class="nft-container rounded-lg">
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
          v-model="network"
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

    <div class="add-cont" @click.stop="uploadMetadata">
      <button>Add NFT</button>
    </div>
  </div>
</template>

<script>
// import ipfsClient from 'ipfs-http-client';
import axios from '../../../axios';
import ToggleSwitch from '../../../SetUpCasts/Tabs/ToggleSwitch.vue';
import buttonToggle from '../../../SetUpCasts/Tabs/buttonToggle.vue';
export default {
  name: 'NftWallet',
  props: [
    'closeDrops',
    'nft_details_submitted',
    'stepOneProps',
    'castInfo',
    'castId',
  ],
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
      dummyURI: '',
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
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    console.log(this.castId, 'castid');
  },
  methods: {
    updateNetwork() {
      this.stepOneProps.network = this.network;
      // this.$emit('updateStepOneProps', this.stepOneProps);
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
      // const type = this.tokenIsChecked ? 'Token' : 'NFTs';
      // this.updateAirdropType(type)
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
    openUpload() {
      document.getElementById('nft_image').click();
    },
    canSubmitNft() {
      console.log(
        this.stepOneProps.audienceAirdrop,
        this.stepOneProps.airdropType,
        this.stepOneProps.mint_function_name,
        this.stepOneProps.contract_address,
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
    updateGiveNft(e) {
      console.log(e, 'updatenft');
      if (
        (this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs') ||
        this.stepOneProps.public_stream_nfts === 'false'
      ) {
        this.stepOneProps.give_nft = true;
      } else {
        this.stepOneProps.give_nft = false;
      }
    },
    async addNft(x) {
      console.log('add call');
      // this.stepOneProps.give_nft=true;
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
          if (this.stepOneProps.parameter == '') {
            this.stepOneProps.parameter = `{"_tokenURI":"${this.dummyURI}"}`;
          }
          const id = this.castId;
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
            .dispatch('studio/addNftDetails', payload)
            .then(async (res) => {
              if (x) {
                this.$vs.notify({
                  time: 6000,
                  title: 'Airdrop Details Submitted',
                  color: 'success',
                });
                this.closeDrops();
                this.$vs.loading.close();
                this.castInfo(false);
                this.airdrops = false;
                this.resetFields();
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
    async uploadMetadata() {
      const imageFile = this.stepOneProps.nft_image;
      const description = this.stepOneProps.nft_description;
      const nftFormData = new FormData();
      nftFormData.append('file', imageFile);
      const pinataMetadata = JSON.stringify({
        name: this.sampleName,
      });
      nftFormData.append('pinataMetadata', pinataMetadata);

      try {
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          nftFormData,
          {
            maxBodyLength: 'Infinity',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${nftFormData._boundary}`,
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjY5M2EwZS1jYWY2LTRjNzUtYWZkNC1iNTQ1ZGQ4MDNmNWEiLCJlbWFpbCI6Inp0ZWNoOTE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNThkMTdiYTRmYTUzODQ0NWFmYSIsInNjb3BlZEtleVNlY3JldCI6ImQ0MTJjOGVhOGJiZGNiZjljYjkwN2U5OWVmNGJkMTVkNGM0OTgyZTQ2YTIyNmE0NmU2MTViNzJmYzg1ZDZjYjQiLCJpYXQiOjE3MDQyNzU5OTV9.Bit4dIaEVZHYTcNOpSBC6tRjK88WbmusoUwIXTmoJKQ',
            },
          }
        );
        console.log(response, 'dkk');
        const cid = response.data.IpfsHash;

        const data = JSON.stringify({
          pinataContent: {
            name: this.sampleName,
            description: description,
            external_url: 'https://pinata.cloud',
            image: `ipfs://${cid}`,
          },
          pinataMetadata: {
            name: 'metadata.json',
          },
        });

        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS", data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjY5M2EwZS1jYWY2LTRjNzUtYWZkNC1iNTQ1ZGQ4MDNmNWEiLCJlbWFpbCI6Inp0ZWNoOTE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNThkMTdiYTRmYTUzODQ0NWFmYSIsInNjb3BlZEtleVNlY3JldCI6ImQ0MTJjOGVhOGJiZGNiZjljYjkwN2U5OWVmNGJkMTVkNGM0OTgyZTQ2YTIyNmE0NmU2MTViNzJmYzg1ZDZjYjQiLCJpYXQiOjE3MDQyNzU5OTV9.Bit4dIaEVZHYTcNOpSBC6tRjK88WbmusoUwIXTmoJKQ',
            },
          }
        );

        const ipfsHash = res.data.IpfsHash;
        this.dummyURI = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        await this.addNft(true);
        console.log('TokenURI:', tokenURI);
      } catch (error) {
        console.error('Error uploading metadata to Pinata IPFS:', error);
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
  width: 590px;
  min-height: 575px;
  height: auto;
  /* border-radius: 10px; */
  background-color: #1f272f;
  /* border: 1px solid #31394e; */
  padding: 15px;
  padding-bottom: 25px;
  margin: auto;
  top: 10px;
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
  margin-left: -15px;
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
