<template>
  <div class="nft-container pt-4">
    <div class="mid-1">
      <div>
        <span
          :style="{ color: nftIsChecked ? '#31a2f4' : 'gray' }"
          >NFTs</span
        >
        <ToggleSwitch @toggle="toggleNftSwitch()" />
        <span
          :style="{ color: tokenIsChecked ? '#31a2f4' : 'gray' }"
          >Token</span
        >
      </div>
      <div>
        <span>NFT Distribution - </span>
        <span
          :style="{ color: publicIsChecked ? '#31a2f4' : 'gray' }"
          >Public</span
        >
        <ToggleSwitch @toggle="togglePrivateSwitch()" />
        <span
          :style="{ color: privateIsChecked ? '#31a2f4' : 'gray' }"
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
        </select>
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
  props: ['cast_id', 'currStatus','ToggleEdit'],
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
  },
  methods: {
    updateNetwork(event) {
        this.stepOneProps.network = event.target.value;
    },
    toggleTextColor(type) {
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
    },
    updateDistributionType(type) {
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
    },
    closeDrops() {
      this.ToggleEdit('');
    },
    async addNft(x) {
     
    },
    getNFTDetails() {
      this.$vs.loading();
      const payload = this.cast_id;
      this.$store
        .dispatch('cast/recieveNFTDetails', payload)
        .then((res) => {
          console.log('working receieving');
          console.log(res,'netwrok');
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
          const imageUrl=res.data.image;
          const url = new URL(imageUrl);
          const imageName = url.pathname.split('/').pop();
          this.sampleName=imageName;
          console.log(this.stepOneProps);
          this.$vs.loading.close();
        })
        .catch((e) => {
          console.log('error in receibing', e);
        });
    },
  },
</script>

