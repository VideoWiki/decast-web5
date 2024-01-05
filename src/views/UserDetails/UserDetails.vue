<!-- eslint-disable camelcase -->
<!-- eslint-disable camelcase -->
<template>
  <div class="p-20 background">
    <div class="flex mt-20 vx-card card-border relative round p-2">
      <img
        :src="coverImage"
        alt="cover Image"
        class="w-3/12 h-64 py-4 px-2 mx-1 round"
      />
      <div class="w-9/12 mx-5 py-4">
        <h3>
          {{ eventName }}
          <button
            :disabled="disableCopyID"
            class="whiteBtn cursor-pointer"
            @click="copyID"
            content="Copy cast ID"
            v-tippy="{ placement: 'top', arrow: true }"
          >
            <span></span>
            <vs-icon
              icon-pack="feather"
              icon="icon-clipboard"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
          </button>
          <ApiPopup />
        </h3>
        <p class="my-4 text-justify">{{ eventDescription }}</p>
        <div class="buttons absolute flex w-9/12">
          <h5 v-if="running" class="text-green">Cast is Live</h5>
          <h5 v-else-if="expired" class="text-danger">Cast Ended</h5>
          <h5 v-else>Cast not started yet</h5>
          <div class="flex">
            <!-- <Templates
              v-if="!stepOneProps.send_otp"
              :userType="this.userType"
              :stream_urls="this.stream_urls"
              :viewer_mode="this.viewer_mode"
              :vc_Details="
                !(
                  !(nft_details_submitted && vc_details_submitted) &&
                  !pub_nft_flow
                )
              "
            /> -->
            <vs-button
              v-if="!running"
              @click="joinNow(eventName, public_meeting_id)"
              class="ml-2 mr-1"
            >
              Start Cast
            </vs-button>
            <vs-button
              class="ml-2 mr-10"
              @click="airdrops = true"
              v-if="
                !(this.nft_details_submitted && this.vc_details_submitted) &&
                !pub_nft_flow
              "
            >
              Airdrops
            </vs-button>
          </div>
        </div>
      </div>
    </div>
    <!-- Already added users  -->

    <div class="vx-col md:w-1/1 w-full flex flex-wrap">
      <div
        class="vx-card no-shadow card-border p-5 mb-2 pb-20 flex flex-wrap space-around"
        ref="parentSidebarUserTable"
        id="parentx"
      >
        <div
          class="vx-col md:w-1/1 w-full flex flex-wrap items-center justify-end"
        >
          <div class="flex flex-wrap items-center p-2 my-1"></div>
        </div>
        <div
          class="vx-row no-gutter w-full flex flex-wrap jutsify-left mt-1 mb-3"
        >
          <span class="heading mx-4">Invite Users</span>
          <button
            color="primary"
            type="border"
            @click="showInvite = true"
            class="invite-button mx-2 p-4"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-plus"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
            Add
          </button>

          <button
            color="primary"
            type="border"
            @click="inviteeListUpload"
            class="invite-button mx-2 px-4"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-upload-cloud"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
            upload
          </button>
          <div class="w-full px-2 text-white">hello</div>
          <vs-button
            v-if="
              stream_urls != null &&
              stream_urls.length > 2 &&
              stream_live_status == false &&
              (public_stream == true || public_stream == false)
            "
            @click.prevent="startStream"
            color="primary"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span class="flex flex-wrap">
              <span></span>
              <vs-icon
                content="This will start the stream."
                v-tippy="{ placement: 'top', arrow: true }"
                icon-pack="feather"
                icon="icon-play"
                size="20px"
                rounded="true"
                style="align-self: center"
              >
              </vs-icon>
            </span>
          </vs-button>

          <vs-button
            v-if="
              stream_urls != null &&
              stream_urls.length > 2 &&
              stream_live_status == true &&
              (public_stream == true || public_stream == false)
            "
            @click.prevent="endStream"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span
              class="flex flex-wrap"
              content="If a stream is live, This will end the stream"
              v-tippy="{ placement: 'top', arrow: true }"
            >
              <span></span>
              <vs-icon
                icon-pack="feather"
                icon="icon-pause"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </span>
          </vs-button>
          <vs-button
            v-if="isAirdrop && pub_nft_flow"
            @click="
              public_nft_status
                ? changePublicNftStatus('False')
                : changePublicNftStatus('True')
            "
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span class="flex flex-wrap align-bottom">
              {{ public_nft_status ? 'Disable Claim NFT' : 'Enable Claim NFT' }}
              <div>
                &nbsp;
                <span></span>
                <vs-icon
                  content="Allow the Viewers/Attendees to mint the NFT"
                  v-tippy="{ placement: 'top', arrow: true }"
                  icon-pack="feather"
                  icon="icon-info"
                  size="12px"
                  rounded="true"
                  style="align-self: flex-end"
                >
                </vs-icon>
              </div>
            </span>
          </vs-button>

          <span></span>

          <share-popup :isAirdrop="isAirdrop" :pub_nft_flow="pub_nft_flow" />

          <span></span>
          <vs-button
            v-if="this.users"
            @click="inviteeListDownload"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
            content="Download Invitee List"
            v-tippy="{ placement: 'top', arrow: true }"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-download"
              size="20px"
              rounded="true"
              style="align-self: flex-end"
            >
            </vs-icon>
          </vs-button>

          <div v-if="nft_details_submitted && !certificate_enabled">
            <vs-button
              content="Edit NFT"
              @click="NFTEdit"
              v-tippy="{ placement: 'top', arrow: true }"
              class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-edit"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </vs-button>
          </div>
          <div v-if="certificate_enabled">
            <span></span>
            <vs-button
              class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
              @click.stop="CertificateEdit"
              content="Edit Certificate"
              v-tippy="{ placement: 'top', arrow: true }"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-edit"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </vs-button>
            <!-- </tippy> -->
          </div>
          <vs-button
            v-if="
              (nft_enable_count <= 0 || certificate_done) && certificate_enabled
            "
            disabled
            @click="setMerkleTool"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Certificate Drop
          </vs-button>
          <vs-button
            v-if="
              nft_enable_count > 0 && !certificate_done && certificate_enabled
            "
            @click="setMerkleTool"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Certificate Drop</vs-button
          >
          <vs-button
            v-if="
              (nft_enable_count <= 0 || airdrop_done) &&
              event_nft_enabled &&
              this.nft_details_submitted
            "
            disabled
            @click="audienceDropMail"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Airdrop
          </vs-button>
          <vs-button
            v-if="nft_enable_count > 0 && !airdrop_done && event_nft_enabled"
            @click="audienceDropMail"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Airdrop</vs-button
          >
        </div>
        <div
          class="vx-col md:w-1/1 flex flex-wrap items-center justify-start pl-5"
        ></div>
        <div class="vx-col md:w-1/1 w-full flex flex-wrap items-center p-2">
          <p class="add-user" style="align-self: center">Added User List</p>
        </div>

        <div v-if="!users" class="w-full">No users added</div>
        <!-- Normal table when no nft is enabled -->
        <div
          class="w-full"
          v-else-if="!event_nft_enabled && !certificate_enabled"
        >
          <vs-table stripe :data="users">
            <template slot="thead">
              <vs-th class="normal headingFont"> Status </vs-th>
              <vs-th class="normal headingFont"> Role </vs-th>
              <vs-th class="normal headingFont"> Email </vs-th>
              <vs-th class="normal headingFont"> Delete </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="index" v-for="(user, index) in data">
                <vs-td v-if="user.email">
                  <span v-if="user.joined">
                    <span></span>
                    <vs-icon
                      content="Joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-check"
                      size="24px"
                      color="green"
                      rounded="true"
                    ></vs-icon>
                  </span>
                  <span v-else>
                    <span></span>
                    <vs-icon
                      content="Didn't joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-x"
                      size="24px"
                      color="red"
                      rounded="true"
                    ></vs-icon>
                  </span>
                </vs-td>

                <vs-td v-if="user.email">
                  {{ user.role }}
                </vs-td>

                <vs-td v-if="user.email">
                  {{ user.email }}
                </vs-td>

                <vs-td class="delete" v-if="user.email">
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-trash-2"
                    class="cursor"
                    @click.stop="removeUser(user, index)"
                    size="24px"
                    rounded="true"
                    v-if="user.email"
                  >
                  </vs-icon>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div
          class="w-full mx-auto"
          v-else-if="event_nft_enabled || certificate_enabled"
        >
          <UserTable
            :certificate_enabled="certificate_enabled"
            :users="users"
            :vc_details_submitted="vc_details_submitted"
            :event_nft_enabled="event_nft_enabled"
            :nft_details_submitted="nft_details_submitted"
            :removeUser="removeUser"
          />
        </div>
      </div>
    </div>
    <vs-popup
      :active.sync="showPopup"
      ref="uploadModal"
      title="Invite Attendee"
    >
      <InviteAttendee
        :handleSheet="handleSheet"
        :sheet="sheet"
        :uploadSheet="uploadSheet"
        :sheetFileName="sheetFileName"
        :uploadPercentage="uploadPercentage"
      />
    </vs-popup>
    <vs-popup :active.sync="showInvite" ref="inviteModal">
      <Invite
        :viewer_mode="viewer_mode"
        :stream_urls="stream_urls"
        :closePopup="() => (showInvite = false)"
        :showInvite="showInvite"
        :userDetails="userDetails"
    /></vs-popup>
    <vs-popup :active.sync="airdrops" ref="airdrops">
      <div v-if="airdrops">
        <NftSelection
          :nft_details_submitted="nft_details_submitted"
          :stepOneProps="stepOneProps"
          :updateGiveNft="updateGiveNft"
          :selectedNetwork="selectedNetwork"
          :selectNetwork="selectNetwork"
          :network="network"
          :valueCheck="valueCheck"
          :castInfo="castInfo"
        />
        <!-- Verifiable Certificate drop -->
        <VerifiableCertificate
          :stepOneProps="stepOneProps"
          :updateGiveNft="updateGiveNft"
          :selectedNetwork="selectedNetwork"
          :selectNetwork="selectNetwork"
          :network="network"
          :valueCheck="valueCheck"
          :vc_details_submitted="vc_details_submitted"
          :certificateProps="certificateProps"
        />
      </div>
    </vs-popup>
  </div>
</template>
<script>
import Invite from './Components/Invite.vue';
import ApiPopup from './Components/ApiPopup.vue';
import InviteAttendee from './Components/InviteAttendee.vue';
import UserTable from './Components/UserTable.vue';
import NftSelection from './Components/NftSelection.vue';
import VerifiableCertificate from './Components/VerifiableCertificate.vue';
import Vue from 'vue';
import VueTippy, { tippy, TippyComponent } from 'vue-tippy';
import { ethers } from 'ethers';
import SharePopup from './Components/SharePopup.vue';
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);
export default {
  name: 'UserDetails',
  data() {
    return {
      showCopyPopup: false,
      disableCopyID: false,
      public_meeting_id: '',
      key: '',
      showInvite: false,
      smallBox: false,
      templates: false,
      inviteeSheet: '',
      sheetFileName: 'No File Selected',
      uploadPercentage: 0,
      showPopup: false,
      userNameLengthError: false,
      public_nft_status: false,
      airdrops: false,
      validEmailError: false,
      public_stream: '',
      nft_enable_count: 0,
      pub_nft_flow: false,
      event_nft_enabled: false,
      stream_urls: [],
      isAirdrop: false,
      airdrop_done: false,
      certificate_done: false,
      certificate_enabled: false,
      airDrops: false,
      walletAddress: [],
      users: [],
      userName: '',
      running: false,
      expired: false,
      userNameError: false,
      userEmailError: false,
      userEmailDuplicate: false,
      userEmail: '',
      viewer_mode: false,
      coverImage: '',
      eventName: '',
      eventDescription: '',
      enableNft: '',
      giveNft: false,
      clickedIndex: '',
      role: 'participant',
      userRoleLabel: 'Participant',
      coin: '',
      nft: '',
      abi: [],
      receipt: false,
      isPublic: true,
      nftReceiver: [],
      inviteeList: [],
      checkBox1: false,
      merkelTool: false,
      stream_live_status: false,
      nft_details_submitted: false,
      airDropList: [],
      certificateList: [],
      vc_details_submitted: false,
      userType: [
        { text: 'Co-Host/Moderator', value: 'co-host' },
        { text: 'Participant', value: 'participant' },
        { text: 'Viewer', value: 'viewer' },
        { text: 'Spectator', value: 'spectator' },
      ],
      coinType: [
        { text: 'Choose type of chain', value: '' },
        { text: 'Ethereum', value: 'ethereum' },
        { text: 'Polygon', value: 'polygon' },
      ],
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '41',
        audienceAirdrop: false,
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
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
        nft_t_ype: 'NFTs',
        nft_type: 'NFTs',
      },
      certificateProps: {
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        give_vc: true,
        mint_function_name: '',
        parameter: '',
        nft_image: '',
        data_token: false,
        network: '5',
        audienceAirdrop: false,
        sender_addresses: [],
        airdropType: 'vc',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        auth_type: 'private',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'false',
        public_nft_flow: false,
        nft_t_ype: 'vc',
        nft_type: 'vc',
      },
      nftType: [
        { text: 'Choose type of NFT', value: '' },
        { text: 'Videowiki', value: 'mana' },
        { text: 'Upload NFT', value: 'filecoin' },
      ],
      selectedNetwork: {
        text: 'Telos EVM Testnet',
        value: '41',
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
      sidebarProps: {
        sidebarOpen: false,
        reduce: true,
        NotExpand: false,
      },
    };
  },
  created() {
    this.castInfo();
    this.userDetails();
  },
  mounted() {
    this.$refs.inviteModal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.inviteModal.$el.childNodes[1].style.width = '800px';
    this.$refs.airdrops.$el.childNodes[1].childNodes[0].style.display = 'none';
    this.$refs.airdrops.$el.childNodes[1].style.width = '800px';
    this.$refs.uploadModal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.uploadModal.$el.childNodes[1].style.width = '800px';
  },
  beforeDestroy() {
    document.querySelectorAll('body > div.vs-component').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('body > div.vs-content-sidebar').forEach((el) => {
      el.remove();
    });
  },

  methods: {
    async joinNow(eventName, public_meeting_id) {
      const data = {
        email: '',
        name: eventName,
        password: '',
        public_meeting_id: public_meeting_id,
        redirect: true,
        room_type: 'private',
        avatar_url: '',
        guest: false,
        attendee_password: this.attendee_password,
      };

      try {
        const response = await this.$store.dispatch('cast/joinNow', data);
        console.log('joining Now');
        if (response && response.url) {
          this.responsedata = response.url;
          window.open(`/user_details/${public_meeting_id}`, '_blank');
          window.location.href = response.url;
          this.$vs.notify({
            title: 'Success',
            text: response.message,
            color: 'success',
          });
        } else {
          console.log('Invalid response format:', response);
        }
      } catch (error) {
        console.log('cannot join', error);
        this.$vs.notify({
          title: 'Oops!',
          text:
            error.response != null
              ? error.response.data.message
              : 'Check the Scheduled time',
          color: 'danger',
        });
      }
    },

    getCertificateInfo() {
      this.$store
        .dispatch('cast/getCertificateInfo', {
          session_key: this.session_key,
        })
        .then((res) => {
          console.log('certificate info getting');
          this.abi = res.data.aib;
        })
        .catch((e) => {
          console.log('certificate info not getting');
          if (e.response.data.message === 'invalid cast_id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/error/404');
          }
          console.log(e);
        });
    },
    // Unused COde,never called
    // generateKey() {
    //   this.$store
    //     .dispatch(
    //       'studio/generateKey',
    //       this.$store.state.AppActiveUser.username
    //     )
    //     .then((res) => {
    //       alert(res.api_key);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // Unused COde,never called
    // async selectAllusers(e) {
    //   this.stepOneProps.sender_addresses = [];
    //   if (this.selectAll) {
    //     for (var i = 0; i < this.inviteeList.length; i++) {
    //       this.inviteeList[i].nft_enable = true;
    //       this.users[i].nft_enable = true;
    //       this.inviteeList[i].nft_type = 'NFTs';
    //       this.stepOneProps.sender_addresses.push(this.users[i].wallet_address);
    //     }
    //     this.nft_enable_count = this.inviteeList.length;
    //     const payload = {
    //       invitee_list: this.inviteeList,
    //       cast_id: this.$route.params.session_key,
    //     };
    //     this.$store
    //       .dispatch('studio/updateEnableNft', payload)
    //       .then(() => {
    //         this.$vs.notify({
    //           title: 'Success',
    //           text: 'Drop enabled for all the users',
    //           color: 'success',
    //         });
    //       })
    //       .catch((err) => {
    //         this.$vs.notify({
    //           title: 'Error',
    //           text:
    //             err.response != null ? err.response.data.message : 'Try again',
    //           color: 'danger',
    //         });
    //       });
    //   } else {
    //     for (i = 0; i < this.inviteeList.length; i++) {
    //       this.inviteeList[i].nft_enable = false;
    //       this.users[i].nft_enable = false;
    //       this.inviteeList[i].nft_type = 'NFTs';
    //     }
    //     this.nft_enable_count = 0;
    //     const payload = {
    //       invitee_list: this.inviteeList,
    //       cast_id: this.$route.params.session_key,
    //     };
    //     this.$store
    //       .dispatch('studio/updateEnableNft', payload)
    //       .then(() => {
    //         this.$vs.notify({
    //           title: 'Success',
    //           text: 'Drop disabled for all the users',
    //           color: 'danger',
    //         });
    //       })
    //       .catch((err) => {
    //         this.$vs.notify({
    //           title: 'Error',
    //           text:
    //             err.response != null ? err.response.data.message : 'Try again',
    //           color: 'danger',
    //         });
    //       });
    //   }
    // },
    NFTEdit() {
      this.$router.push({
        name: 'Edit NFT',
        params: {
          cast_Id: this.$route.params.session_key,
          otp: this.stepOneProps.send_otp || this.stepOneProps.public_otp,
        },
      });
    },
    CertificateEdit() {
      this.$router.push({
        name: 'Edit Certificate',
        params: {
          cast_Id: this.$route.params.session_key,
          nft_type: 'vc',
        },
      });
    },

    copyID() {
      this.disableCopyID = true;
      setTimeout(() => {
        this.disableCopyID = false;
      }, 2000);
      navigator.clipboard.writeText(this.$route.params.session_key);
      this.$vs.notify({
        title: 'ID Copied',
        text: 'Cast id copied successfully',
        color: 'success',
      });
    },
    inviteeListUpload() {
      this.showPopup = true;
    },
    //Unused Code,never called
    // validateErrors() {
    //   if (this.userNameLengthError) {
    //     this.userNameLengthError = this.userName < 20;
    //   }
    //   if (this.validEmailError) {
    //     this.validEmailError = !this.validateEmail();
    //   }
    //   if (this.userNameError) {
    //     this.userNameError = this.username === '' && this.userEmail === '';
    //   }
    // },
    // validateEmail(email) {
    //   // eslint-disable-next-line no-useless-escape
    //   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
    // },
    handleSheet(e) {
      const inputFiles =
        e.target.files || e.dataTransfer.files || this.$refs.sheetUpload.files;
      this.inviteeSheet = inputFiles[0];
      this.sheetFileName =
        inputFiles[0].name.length > 40
          ? inputFiles[0].name.slice(0, 39) + '...'
          : inputFiles[0].name;
    },

    sheet() {
      this.$refs.sheetUpload.click();
    },
    uploadSheet(event) {
      this.inviteeSheet = event.target.files[0];
      this.sheetFileName =
        event.target.files[0].name.length > 40
          ? event.target.files[0].name.slice(0, 39) + '...'
          : event.target.files[0].name;
      event.target.value = null;
    },
    castInfo(setRunning) {
      const payload = this.$route.params.session_key;
      this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          // eslint-disable-next-line camelcase
          const response_val = await response.data;
          this.expired = response_val.meeting_info.expired;
          this.public_meeting_id = response_val.meeting_info.public_meeting_id;
          this.vc_details_submitted =
            response_val.meeting_info.vc_details_submitted;
          this.coverImage = response_val.meeting_info.cover_image;
          this.event_nft_enabled =
            !response_val.meeting_info.pub_nft_flow &&
            response_val.meeting_info.nft_details_submitted;
          this.certificate_enabled =
            response_val.meeting_info.vc_details_submitted;
          this.public_nft_status = response_val.meeting_info.public_nft_status;
          this.pub_nft_flow = response_val.meeting_info.pub_nft_flow;
          this.public_stream = response_val.meeting_info.public_stream;
          this.viewer_mode = response_val.meeting_info.viewer_mode;
          this.stream_urls = response_val.meeting_info.stream_urls;
          this.isAirdrop = response_val.meeting_info.airdrop;
          this.stream_live_status = response_val.meeting_info.stream_status;
          this.stepOneProps.public_otp = response_val.meeting_info.public_otp;
          this.stepOneProps.send_otp = response_val.meeting_info.send_otp;
          this.stepOneProps.password_auth =
            response_val.meeting_info.password_auth;
          this.nft_details_submitted =
            response_val.meeting_info.nft_details_submitted;
          this.eventName = response_val.meeting_info.event_name;
          this.eventDescription = response_val.meeting_info.description;
          this.running = response_val.meeting_info.running;
          if (this.certificate_enabled) {
            this.getCertificateInfo();
          }
          if (!setRunning) {
            setTimeout(() => {
              this.castInfo(true);
            }, 5000);
          }
          this.isPublic = !response_val.meeting_info.send_otp;
        })
        .catch((err) => {
          // this.$router.push('/error/404');
          if (err.response.data.message === 'invalid cast id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/mycasts');
          }
        });
    },

    userDetails() {
      this.$vs.loading();
      const payload = { cast_id: this.$route.params.session_key };
      this.$store
        .dispatch('studio/inviteeDetails', payload)
        .then(async (res) => {
          this.users = await res.data.data;
          var address = [];
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].wallet_address) {
              this.walletAddress[i] = this.users[i].wallet_address;
            } else {
              this.walletAddress[i] = null;
            }
            const userList = {
              id: this.users[i].id,
              name: this.users[i].name,
              email: this.users[i].email,
              type: this.users[i].role,
              nft_enable: this.users[i].nft_enable,
              vc_enable: this.users[i].vc_enable,
            };
            if (this.users[i].nft_enable) {
              this.nft_enable_count++;
            }
            if (this.users[i].vc_enable) {
              address.push(this.users[i].wallet_address);
            }
            this.inviteeList.push(userList);
          }
          this.certificateProps.sender_addresses = address;
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },

    async selectNetwork(value, text, image, id) {
      await this.$vs.loading();
      this.selectedNetwork.value = value;
      this.selectedNetwork.text = text;
      this.selectedNetwork.image = image;
      this.stepOneProps.network = value;
      document.getElementById(id).click();
      this.$vs.loading.close();
    },
    updateGiveNft(e) {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs' &&
        this.stepOneProps.public_stream_nfts === 'false'
      ) {
        this.stepOneProps.give_nft = true;
      } else {
        this.stepOneProps.give_nft = false;
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
    // Unused Code,never called
    // addAddress(e, walletAddress) {
    //   if (e.target.value === 'false') {
    //     this.certificateProps.sender_addresses.push(walletAddress);
    //   } else {
    //     this.certificateProps.sender_addresses =
    //       this.certificateProps.sender_addresses.filter((ele) => {
    //         return ele !== walletAddress;
    //       });
    //   }
    // },

    // //Unused Code,never called
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
    // //Unused Code,never called
    // disabledOption() {
    //   this.$vs.notify({
    //     time: 6000,
    //     title: 'Role Disabled',
    //     text: 'Viewer Role is only enabled if viewer mode is enabled in step four and Spectator role is only valid if streaming in step three is enabled. ',
    //     color: 'warning',
    //   });
    // },
    // Unused Code,never called
    // async selectUserRole(x, y) {
    //   await this.$vs.loading();
    //   this.role = x;
    //   this.userRoleLabel = y;
    //   this.$vs.loading.close();
    // },
    async checkInvitee(email) {
      let result = false;
      const payload = {
        email: email,
        cast_id: this.$route.params.session_key,
      };
      await this.$store
        .dispatch('studio/checkInvitee', payload)
        .then((res) => {
          result = false;
        })
        .catch((err) => {
          console.log(err);
          result = true;
        });
      return result;
    },
    async startStream() {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/startStream', {
            cast_id: this.$route.params.session_key,
          })
          .then((res) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: 'Successful',
              text: 'Stream Started',
              color: 'success',
            });
            this.stream_live_status = !this.stream_live_status;
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
        // this.public_nft_status = !this.public_nft_status;
      }
    },
    async endStream() {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/endStream', {
            cast_id: this.$route.params.session_key,
          })
          .then((res) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: 'Successful',
              text: 'Stream Ended',
              color: 'success',
            });
            this.stream_live_status = !this.stream_live_status;
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
      }
    },
    // eslint-disable-next-line camelcase
    async changePublicNftStatus(curr_status) {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/publicNftActivate', {
            cast_id: this.$route.params.session_key,
            nft_activate: curr_status,
          })
          .then((res) => {
            // eslint-disable-next-line camelcase
            this.public_nft_status = curr_status === 'True';
            this.$vs.loading.close();
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'Error',
          text: 'Try again !',
          color: 'Danger',
        });
      }
    },
    // //Unused Code,never called
    // async addUser() {
    //   var x = {};
    //   var emailList = this.userEmail.split(',').map((item) => {
    //     if (x[item.trim()]) {
    //       return;
    //     }
    //     return item.trim();
    //   });
    //   var validEmails = emailList.reduce((validEmail, item) => {
    //     if (!this.validateEmail(item)) {
    //       this.$vs.notify({
    //         time: 6000,
    //         title: 'Invalid Email',
    //         text: item + ' is not a valid email',
    //         color: 'danger',
    //       });
    //     }
    //     return validEmail && this.validateEmail(item);
    //   }, true);
    //   if (!validEmails) {
    //     this.validEmailError = true;
    //     return;
    //   }
    //   var users = [];
    //   for (let i = 0; i < emailList.length; i++) {
    //     const duplicate = await this.checkInvitee(emailList[i]);
    //     if (duplicate) {
    //       this.$vs.notify({
    //         time: 6000,
    //         title: 'Email Already Invited',
    //         text: 'We are going to  ignore user ' + emailList[i],
    //         color: 'warning',
    //       });
    //       continue;
    //     }
    //     users.push({
    //       name: '',
    //       email: emailList[i],
    //       type: this.role,
    //       nft_enable: '',
    //       give_nft: this.giveNft,
    //     });
    //   }
    //   const payload = {
    //     invitee_list: users,
    //     cast_id: this.$route.params.session_key,
    //   };
    //   this.validEmailError = false;
    //   if (users.length === 0) {
    //     this.$vs.loading.close();
    //     this.userEmail = '';
    //     this.$vs.notify({
    //       color: 'warning',
    //       title: 'User Already Invited',
    //     });
    //     return;
    //   }
    //   this.$store
    //     .dispatch('studio/addInvitee', payload)
    //     .then((res) => {
    //       // eslint-disable-next-line no-unused-vars
    //       const addedUser = res.data.data[0];
    //       this.$vs.notify({
    //         title: '',
    //         text: 'User added successfully !',
    //         color: 'success',
    //       });
    //       this.userName = '';
    //       this.userEmail = '';

    //       this.userNameError = false;
    //       this.userDetails();
    //       // this.users.push(addedUser);
    //       // if (this.walletAddress) {
    //       //   this.walletAddress[this.users.length - 1] =
    //       //     addedUser.wallet_address;
    //       // } else {
    //       //   this.walletAddress[this.users.length - 1] = null;
    //       // }
    //       // const userList = {
    //       //   id: addedUser.id,
    //       //   name: addedUser.name,
    //       //   email: addedUser.email,
    //       //   type: addedUser.role,
    //       //   nft_enable: addedUser.nft_enable,
    //       // };
    //       // this.inviteeList.push(userList);
    //       // this.giveNft = false;
    //       // this.$vs.loading.close();
    //       // this.$vs.notify({
    //       //   title: '',
    //       //   text: 'User added successfully !',
    //       //   color: 'success',
    //       // });
    //     })
    //     .catch((err) => {
    //       this.$vs.loading.close();
    //       this.$vs.notify({
    //         title: 'Error',
    //         text:
    //           err.response != null ? err.response.data.message : 'Try again !',
    //         color: 'Danger',
    //       });
    //     });
    // },
    removeUser(user, userIndex) {
      const payload = {
        email: user.email,
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/deleteInvitee', payload)
        .then((res) => {
          if (user.nft_enable) this.nft_enable_count--;
          if (userIndex > -1) {
            this.users.splice(userIndex, 1);
            this.inviteeList.splice(userIndex, 1);
          }
          this.$vs.notify({
            title: '',
            text: 'User removed successfully !',
            color: 'success',
          });
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again !',
            color: 'danger',
          });
        });
    },

    inviteeListDownload() {
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/inviteesCSV', payload)
        .then((res) => {
          const anchor = document.createElement('a');
          anchor.href = res.data.path;
          anchor.click();
          this.$vs.notify({
            title: 'Success',
            text: 'Downloaded Successfully !',
            color: 'success',
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    // //Unused Code,never called
    // changeSidebar(val) {
    //   this.sidebarProps.sidebarOpen = val;
    // },
    // //Unused Code,Never called
    // truncate(addressString) {
    //   if (addressString && addressString !== '')
    //     return addressString.slice(0, 8) + '.....' + addressString.slice(38);
    // },
    // // Unused Code,called only once in a below function that is never called anywhere
    // async setroothash() {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   const abi = this.abi;
    //   const contractAddress = '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0';
    //   const contract = new ethers.Contract(contractAddress, abi, signer);
    //   const roothash = this.merkelTool.getRoot();
    //   const tx = await contract.setmerkleroot(roothash);
    //   this.receipt = await tx.wait();
    // },
    // // Unused Code,never called
    // async setMerkleToolsetMerkleTool() {
    //   this.$vs.loading();
    //   const leafNodes = this.certificateProps.sender_addresses.map((addr) =>
    //     keccak256(addr)
    //   );
    //   this.merkelTool = new MerkleTree(leafNodes, keccak256, {
    //     sortPairs: true,
    //   });
    //   if (!this.receipt) {
    //     try {
    //       await this.setroothash();
    //     } catch (e) {
    //       this.$vs.loading.close();
    //       if (e.code === 'ACTION_REJECTED') {
    //         this.$vs.notify({
    //           title: 'Transaction Rejected',
    //           color: 'danger',
    //         });
    //       } else {
    //         this.$vs.notify({
    //           title: 'Only Owner Can proceed further',
    //           text: 'Ask for the rights',
    //           color: 'danger',
    //         });
    //       }
    //       return;
    //     }
    //   }
    //   this.$store
    //     .dispatch('studio/setMerkleTool', {
    //       cast_id: this.$route.params.session_key,
    //       data: leafNodes,
    //     })
    //     .then(async (res) => {
    //       await this.audienceCertificateMail();
    //       this.merkelTool = false;
    //       this.receipt = false;
    //       this.$vs.loading.close();
    //     })
    //     .catch((e) => {
    //       this.$vs.notify({
    //         title: 'Error occurred',
    //         text: 'Try Again',
    //         color: 'danger',
    //       });
    //     });
    // },
    audienceCertificateMail() {
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/audienceCertificateMail', payload)
        .then((res) => {
          this.$vs.notify({
            title: 'Success',
            text: 'Mail sent successfully !',
            color: 'success',
          });
          this.certificate_done = true;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    audienceDropMail() {
      if (this.nft_enable && this.certificate_enabled) {
        this.disabled = true;
      }
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/audienceAirdropMail', payload)
        .then((res) => {
          this.$vs.notify({
            title: 'Success',
            text: 'Mail sent successfully !',
            color: 'success',
          });
          this.airdrop_done = true;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
  },
  components: {
    Invite,
    ApiPopup,
    SharePopup,
    InviteAttendee,
    VerifiableCertificate,
    NftSelection,
    UserTable,
  },
};
</script>

<style scoped>
.headingFont {
  font-size: 15px;
}
.round {
  border-radius: 0.4rem;
}

.buttons {
  bottom: 10%;
  justify-content: space-between;
}
.background * {
  font-family: sans-serif, 'feather' !important;
}

.cursor {
  cursor: pointer;
}

.delete {
  color: 'red' !important;
}

#datatoken {
  font-size: 15px;
  font-weight: 600;
}

.heading {
  font-weight: 600;
  font-size: 18px;
  line-height: 3rem;
}

.invite-button {
  font-size: 17px;
  padding: 8px 20px 8px 10px;
  border-radius: 40px;
  border: none;
  color: rgba(115, 102, 241, 255);
  cursor: pointer;
}

.add-user {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding-left: 5px;
}

.airdrop-btn {
  width: fit-content;
  box-shadow: none;
  color: #8d56f8;
}

.delete:hover {
  color: red !important;
}

.BTN {
  background-color: transparent !important;
  color: #8d56f8;
}

.cursor-pointer {
  cursor: pointer !important;
}

.whiteBtn {
  background: transparent;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #d0d5dd;
  font-size: 16px;
}

/* .file {
  background: #8d56f8;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  padding: 10px;
  color: darkgrey;
} */
</style>

