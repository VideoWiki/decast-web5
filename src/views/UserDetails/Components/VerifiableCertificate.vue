<template>
  <div
    class="vx-row px-5 no-gutter"
    v-if="
      !vc_details_submitted &&
      (this.stepOneProps.public_otp || this.stepOneProps.send_otp)
    "
  >
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">
            <span class="flex flex-wrap">Verifiable Certificate &nbsp; </span>
          </label>
          <div>
            <vs-switch
              v-model="certificateProps.audienceAirdrop"
              v-on:change="updateGiveNft()"
            />
          </div>
        </div>
        <hr
          v-if="certificateProps.audienceAirdrop"
          class="w-full mt-5 border-light"
        />
        <div v-if="certificateProps.audienceAirdrop" class="vx-row w-full mt-5">
          <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
            <label class="m-0">Select a Network</label>
            <vs-collapse
              open-hover
              class="selectType form-group w-full normal custom-select"
              id="Certificate-Network"
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
                    @click="
                      selectNetwork(
                        item.value,
                        item.text,
                        item.image,
                        'Certificate-Network'
                      )
                    "
                    v-for="(item, index) in network"
                  >
                    <div
                      class="flex flex-wrap align-center"
                      style="width: 250px"
                    >
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
              v-model="certificateProps.contract_address"
              class="w-full form-group"
              placeholder="Ex: 0x0710A4F91Dfa5c88A81A5b7a7670b579880dA5Df"
              v-on:change="valueCheck()"
              @keyup="valueCheck()"
            />
            <span
              class="text-danger text-sm mt-1"
              v-show="certificateProps.contract_address_error"
              >Contact Address is required</span
            >
          </div>
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0">ABI <span class="text-danger">*</span></label>
            <vs-textarea
              id="aib"
              v-model="certificateProps.aib"
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
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group">
            <label class="m-0"
              >Description <span class="text-danger">*</span></label
            >
            <vs-textarea
              id="nft_description"
              v-model="certificateProps.nft_description"
              class="w-full form-group"
              placeholder="Explain the utility of the NFT"
              rows="3"
              v-on:change="valueCheck()"
              @keyup="valueCheck()"
            /><span
              class="text-danger text-sm mt-1"
              v-show="certificateProps.nft_description_error"
              >Description of NFT is required</span
            >
          </div>
        </div>
        <div
          v-if="certificateProps.audienceAirdrop"
          class="vx-card no-shadow card-border p-5 flex flex-wrap"
        >
          <div class="flex flex-wrap w-full form-group items-center">
            <label class="tooltips">
              <span>
                <b>Collect Wallet Address &nbsp;</b>
                <vs-icon
                  class="pl-2px"
                  icon-pack="feather"
                  icon="icon-info"
                  size="12px"
                  rounded="true"
                  style="align-self: flex-end"
                ></vs-icon>
              </span>
              <span class="tooltipstext p-5">
                The wallet information of attendees is saved with encryption and
                only used for the airdrop configured by the event admin.
              </span>
            </label>
            <div>
              <vs-switch v-model="certificateProps.audienceAirdrop" disabled />
            </div>
          </div>
        </div>
        <div v-if="certificateProps.audienceAirdrop">
          <vs-button
            class="btn-wizard py-4 px-5 my-5"
            @click.stop="
              () => {
                addCertificate(false);
              }
            "
            >Add Certificate</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifiableCertificate',
  props: [
    'stepOneProps',
    'updateGiveNft',
    'selectedNetwork',
    'selectNetwork',
    'network',
    'valueCheck',
    'vc_details_submitted',
    'certificateProps',
  ],
  methods: {
    canSubmitCertificate() {
      if (
        this.certificateProps.audienceAirdrop &&
        (this.certificateProps.contract_address === '' ||
          this.certificateProps.aib === '' ||
          this.certificateProps.nft_description === '')
      ) {
        if (
          this.certificateProps.audienceAirdrop &&
          this.certificateProps.airdropType === 'NFTs'
        ) {
          this.certificateProps.contract_address_error =
            this.certificateProps.contract_address === '';
          this.certificateProps.aib_error = this.certificateProps.aib === '';
          this.certificateProps.nft_description_error =
            this.certificateProps.nft_description === '';
        }
        this.certificateProps.public_nft_flow =
          this.certificateProps.public_stream_nfts === 'true';
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          color: 'danger',
        });
        return false;
      } else {
        this.certificateProps.public_nft_flow =
          this.certificateProps.public_stream_nfts === 'true';
        return true;
      }
    },
    async addCertificate(x) {
      if (this.canSubmitCertificate()) {
        if (
          this.certificateProps.contract_address !==
          '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0'
        ) {
          this.$vs.notify({
            color: 'danger',
            title: 'Wrong Credentials',
            text: 'Contract address is not correct',
          });
          return;
        }
        var payload = new FormData();
        for (var [key, value] of Object.entries(this.certificateProps)) {
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
        payload.append('public_meeting_id', this.$route.params.session_key);
        await this.$store
          .dispatch('studio/addNftDetails', payload)
          .then(async (res) => {
            this.$vs.notify({
              time: 6000,
              title: 'Certificate Details Submitted',
              color: 'success',
            });
            this.castInfo(false);
            this.airdrops = false;
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            if (e) {
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
  },
};
</script>

<style scoped>
.tooltips {
  position: relative;
  display: inline-block;
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