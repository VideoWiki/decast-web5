<template>
  <div class="vx-row px-5 no-gutter" v-if="!nft_details_submitted">
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="flex flex-wrap">
        <!-- <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">
            <span class="flex flex-wrap">NFT &nbsp; </span>
          </label>
          <div>
            <vs-switch
              v-model="stepOneProps.audienceAirdrop"
              v-on:change="updateGiveNft()"
            />
          </div>
        </div>
        <hr
          v-if="stepOneProps.audienceAirdrop"
          class="w-full mt-5 border-light"
        /> -->
        <div class="mid-1">
          <div>
            <span :style="{ color: stepOneProps.airdropType == 'NFTs' ? '#31a2f4' : 'gray' }">NFTs</span>
            <ToggleSwitch @toggle="updateGiveNft" />
            <span :style="{ color: stepOneProps.airdropType == 'Token' ? '#31a2f4' : 'gray' }">Token</span>
          </div>
          <div>
            <span>NFT Distribution - </span>
            <span 
              :style="{ color: stepOneProps.public_stream_nfts === 'true' ? '#31a2f4' : 'gray' }">Public</span>
            <ToggleSwitch @toggle="typeOfNft" />
            <span 
              :style="{ color: stepOneProps.public_stream_nfts === 'false' ? '#31a2f4' : 'gray' }">Private</span>
          </div>
        </div>




        <!-- <div v-if="stepOneProps.audienceAirdrop" class="vx-row w-full mt-5">
          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap items-center justify-left">
            <vs-chip class="p-1">
              <vs-radio v-model="stepOneProps.airdropType" :class="[
                stepOneProps.airdropType == 'NFTs'
                  ? 'dual-toggle-active'
                  : '',
                'dual-toggle',
                'm-0',
                'p-1',
                'pr-3',
                'pl-3',
              ]" vs-value="NFTs" v-on:change="updateGiveNft()">NFTs</vs-radio>
              <vs-radio v-model="stepOneProps.airdropType" :class="[
                stepOneProps.airdropType == 'Token'
                  ? 'dual-toggle-active'
                  : '',
                'dual-toggle',
                'm-0',
                'p-1',
                'pr-3',
                'pl-3',
              ]" vs-value="Token" disabled v-on:change="updateGiveNft()">Token</vs-radio>
            </vs-chip>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap items-center justify-end">
            <div class="vx-col md:w-1/1 w-full mb-2 flex flex-wrap items-center justify-end">
              <label class="mr-6 formgroup-label">NFT Distribution </label>
            </div>
            <div class="vx-col w-full flex flex-wrap items-center justify-end">
              <vs-chip class="p-1">
                <vs-radio v-model="stepOneProps.public_stream_nfts" id="public_stream_nfts_true" :class="[
                  stepOneProps.public_stream_nfts === 'true'
                    ? 'dual-toggle-active'
                    : '',
                  'dual-toggle',
                  '-m-2',
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]" @change="typeOfNft()" vs-value="true"><span class="flex flex-wrap">
                    Public &nbsp;

                    <span></span> </span></vs-radio>
                <vs-radio v-model="stepOneProps.public_stream_nfts" id="public_stream_nfts_false" :class="[
                  stepOneProps.public_stream_nfts === 'false'
                    ? 'dual-toggle-active'
                    : '',
                  'dual-toggle',
                  'mr-1',
                  'p-1',
                  'pr-3',
                  'pl-3',
                ]" vs-value="false" @change="typeOfNft()"><span class="flex flex-wrap">
                    Private &nbsp;

                    <span></span>
                  </span>
                </vs-radio>
              </vs-chip>
            </div>
          </div>
        </div> -->
        <div v-if="stepOneProps.audienceAirdrop && stepOneProps.airdropType == 'NFTs'
          " class="vx-row w-full mt-5">
          <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
            <label class="m-0">Select a Network</label>
            <vs-collapse open-click class="selectType form-group w-full normal custom-select">
              <vs-collapse-item>
                <div id="network" slot="header" style="padding: 0px" class="flex flex-wrap items-center">
                  <img :src="selectedNetwork.image" style="
                      margin-right: 10px;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                    " />
                  {{ selectedNetwork.text }}
                </div>
                <div class="flex flex-wrap justify-center items-center">
                  <div :key="index" style="width: 100%" class="mb-2 custom-select-item-hover" @click="
                    selectNetwork(
                      item.value,
                      item.text,
                      item.image,
                      'network'
                    )
                    " v-for="(item, index) in network">
                    <div class="flex flex-wrap align-center" style="width: 250px">
                      <img :src="item.image" style="
                          margin-right: 20px;
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                        " />
                      {{ item.text }}
                    </div>
                  </div>
                </div>
              </vs-collapse-item>
            </vs-collapse>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
            <label class="m-0">Contract Address <span class="text-danger">*</span></label>
            <vs-input id="contract_address" v-model="stepOneProps.contract_address" class="w-full form-group"
              placeholder="Ex: 0x0710A4F91Dfa5c88A81A5b7a7670b579880dA5Df" v-on:change="valueCheck()"
              @keyup="valueCheck()" />
            <span class="text-danger text-sm mt-1" v-show="stepOneProps.contract_address_error">Contact Address is
              required</span>
          </div>
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0">ABI <span class="text-danger">*</span></label>
            <vs-textarea id="aib" v-model="stepOneProps.aib" class="w-full form-group"
              placeholder='Ex: [{"internalType": "uint256","name": "_count","type": "uint256"}]' rows="4"
              v-on:change="valueCheck()" @keyup="valueCheck()" /><span class="text-danger text-sm mt-1"
              v-show="stepOneProps.aib_error">ABI field is required</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5 form-group flex flex-wrap">
            <label class="m-0">Parameters</label>
            <vs-input id="parameter" v-model="stepOneProps.parameter" class="w-full form-group"
              placeholder='Ex: {"_count": 1}' v-on:change="valueCheck()" @keyup="valueCheck()" />
            <span class="text-danger text-sm mt-1" v-show="stepOneProps.parameter_error">Parameters are required</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0 p-0">Mint Function Name <span class="text-danger">*</span></label>
            <vs-input id="mint_function_name" v-model="stepOneProps.mint_function_name" class="w-full form-group"
              placeholder="Ex: mintNFTs" v-on:change="valueCheck()" @keyup="valueCheck()" />
            <span class="text-danger text-sm mt-1" v-show="stepOneProps.mintfnc_name_error">Mint Function field is
              required</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0">Price </label>
            <vs-input id="price" v-model="stepOneProps.price" class="w-full form-group" placeholder="Ex: 0.0009 (ETH)"
              v-on:change="valueCheck()" @keyup="valueCheck()" />
            <span class="text-danger text-sm mt-1" v-show="stepOneProps.price_error">Price field is required</span>
          </div>
          <div class="vx-col md:w-2/3 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0">Description <span class="text-danger">*</span></label>
            <vs-textarea id="nft_description" v-model="stepOneProps.nft_description" class="w-full form-group"
              placeholder="Explain the utility of the NFT" rows="3" v-on:change="valueCheck()"
              @keyup="valueCheck()" /><span class="text-danger text-sm mt-1"
              v-show="stepOneProps.nft_description_error">Description of NFT is required</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5 form-group">
            <label class="m-0">Sample NFT<span class="text-danger">*</span></label>
            <input type="file" class="w-full form-control mt-4" style="
                height: 40px;
                padding: 0.7rem !important;
                font-size: 1rem !important;
              " name="Sample nft" id="nft_image" ref="nft_image" v-on:change="uploadSampleNft" />
            <span class="text-danger text-sm mt-1" v-show="stepOneProps.nft_image_error">Sample NFT is required</span>
          </div>
          <div v-if="!stepOneProps.give_nft">
            <vs-button class="btn-wizard py-4 px-5 ml-5" @click.stop="addNft(true)">Add NFT</vs-button>
          </div>
        </div>
        <div v-if="stepOneProps.give_nft" class="vx-card no-shadow card-border p-5 flex flex-wrap">
          <div class="flex flex-wrap w-full form-group items-center">
            <label class="m-0">
              <!-- <span class="flex flex-wrap">
                     Collect Wallet Address
                     <div class="">
                     &nbsp;
                   </div>

                     <span></span>
                     <vs-icon
                       class="pl-2px"
                       icon-pack="feather"
                       icon="icon-info"
                       size="12px"
                       rounded="true"
                       style="align-self: flex-end"
                     ></vs-icon>
                   </span> -->
              <label class="tooltips">
                <span>
                  Collect Wallet Address
                  <vs-icon class="pl-2px" icon-pack="feather" icon="icon-info" size="12px" rounded="true"
                    style="align-self: flex-end"></vs-icon>
                </span>
                <span class="tooltipstext p-5">
                  <b>The wallet information of attendees is saved with
                    encryption and only used for the airdrop configured by the
                    event admin.</b>
                </span>
              </label>
            </label>
            <div>
              <vs-switch v-model="stepOneProps.give_nft" disabled />
            </div>
          </div>
        </div>
        <div v-if="stepOneProps.give_nft">
          <vs-button class="btn-wizard py-4 px-5 mt-5" @click.stop="addNft(true)">Add NFT</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/SetUpCasts/Tabs/ToggleSwitch.vue';
export default {
  name: 'NftSelection',
  props: [
    'nft_details_submitted',
    'stepOneProps',
    'updateGiveNft',
    'selectedNetwork',
    'selectNetwork',
    'network',
    'valueCheck',
    'castInfo',
    'castId',
  ],
  components: {
    ToggleSwitch,
  },
  methods: {
    canSubmitNft() {
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
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          color: 'danger',
        });
        return false;
      } else {
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        return true;
      }
    },
    async addNft(x) {
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
        payload.append('public_meeting_id', this.castId);
        await this.$store
          .dispatch('studio/addNftDetails', payload)
          .then(async (res) => {
            if (x) {
              this.$vs.notify({
                time: 6000,
                title: 'Airdrop Details Submitted',
                color: 'success',
              });
              this.castInfo(false);
              this.airdrops = false;
            }
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            if (e) {
              console.log(e);
              this.$vs.notify({
                time: 6000,
                title: 'Error',
                text: e.response.data.message,
                color: 'danger',
              });
            }
          });
      }
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
  },
};
</script>

<style scoped>
.tooltips {
  position: relative;
  display: inline-block;
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

.tooltips .tooltipstext {
  visibility: hidden;
  width: 30rem;
  color: white;
  border-radius: 6px;
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 80%;
  /* margin-left: -60px;  */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltips:hover .tooltipstext {
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}

.tooltips .tooltipstext::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 8%;
  transform: rotate(3.142rad);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}

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
</style>