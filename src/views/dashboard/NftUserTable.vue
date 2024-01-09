<template>
  <div>
    <div class="table-heading-wrapper">
      <div class="table-head-col1">
        <span>Status</span>
      </div>
      <div class="table-head-col2">
        <span>Role</span>
      </div>
      <div class="table-head-col3">
        <span>Email</span>
      </div>
      <div class="table-head-col4">
        <span>Wallet Address</span>
      </div>
      <div class="table-head-col5" v-if="certificate_enabled && vc_details_submitted">
        <span>VC status</span>
      </div>
      <div class="table-head-col6" v-if="certificate_enabled && vc_details_submitted">
        <span>Enable Certificate</span>
      </div>
      <div class="table-head-col7" v-if="event_nft_enabled && nft_details_submitted">
        <span>NFT status</span>
      </div>
      <div class="table-head-col8" v-if="event_nft_enabled && nft_details_submitted">
        <span>Enable NFT</span>
      </div>
      <div class="table-head-col9">
        <span>Delete</span>
      </div>
    </div>
    <div class="table-content-row" v-for="(user, index) in users" :key="index">
      <div class="table-content-col1">
        <span v-if="user.joined">
          <span></span>
          <vs-icon content="Joined the event" v-tippy="{ placement: 'top', arrow: true }" icon-pack="feather"
            icon="icon-user-check" size="18px" color="green" rounded="true"></vs-icon>
        </span>
        <span v-else>
          <span></span>
          <vs-icon content="Didn't joined the event" v-tippy="{ placement: 'top', arrow: true }" icon-pack="feather"
            icon="icon-user-x" size="18px" color="red" rounded="true"></vs-icon>
        </span>
      </div>
      <div class="table-content-col2">
        <span>{{ user.role == null ? 'attendee' : user.role }}</span>
      </div>
      <div class="table-content-col3">
        <span>{{ user.email }}</span>
      </div>
      <div class="table-content-col4">
        <span v-if="user.wallet_address">
          {{
            user.wallet_address.slice(0, 4) +
            '***************' +
            user.wallet_address.slice(
              user.wallet_address.length - 4,
              user.wallet_address.length
            )
          }}
        </span>
        <span class="text-danger" v-else>Wallet is not connected yet...</span>
      </div>
      <div class="table-content-col5" v-if="certificate_enabled && vc_details_submitted">
        <span v-if="certificate_enabled &&
          user.vc_enable &&
          user.vc_mint_status &&
          vc_details_submitted
          ">
          <span content="Not Clicked" v-tippy="{ placement: 'top', arrow: true }" v-if="user.vc_mint_status == 'not started' ||
            user.vc_mint_status == null
            ">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #afb7c7;
                "></div>
            <span></span>
          </span>
          <span content="clicked" v-tippy="{ placement: 'top', arrow: true }">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffff00;
                "></div>
            <span></span>
          </span>
          <span content="Claimed" v-tippy="{ placement: 'top', arrow: true }" v-if="user.vc_mint_status == 'successful'">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #01c34e;
                "></div>
            <span></span>
          </span>
        </span>
      </div>
      <div class="table-content-col6" v-if="certificate_enabled && vc_details_submitted">
        <span v-if="user.wallet_address && certificate_enabled && vc_details_submitted
          ">
          <vs-checkbox @change="enableCertificate(user, index)" v-model="user.vc_enable"
            :disabled="user.vc_mint_status == 'successful'"></vs-checkbox>
        </span>
      </div>
      <div class="table-content-col7" v-if="event_nft_enabled && nft_details_submitted">
        <span v-if="event_nft_enabled &&
          user.nft_enable &&
          user.mint_status &&
          nft_details_submitted
          ">
          <span content="Not Clicked" v-tippy="{ placement: 'top', arrow: true }"
            v-if="user.mint_status == 'not started'">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #afb7c7;
                "></div>
            <span></span>
          </span>
          <span content="Clicked" v-tippy="{ placement: 'top', arrow: true }" v-if="user.mint_status == 'started'">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffff00;
                "></div>
            <span></span>
          </span>
          <span content="Claimed" v-tippy="{ placement: 'top', arrow: true }" v-if="user.mint_status == 'successful'">
            <div class="ml-1" style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #01c34e;
                "></div>
            <span></span>
          </span>
        </span>
      </div>
      <div class="table-content-col8" v-if="event_nft_enabled && nft_details_submitted">
        <span v-if="user.wallet_address && event_nft_enabled && nft_details_submitted
          ">
          <vs-checkbox @change="clickIndex(user, index)" v-model="user.nft_enable"
            :disabled="user.mint_status == 'successful'"></vs-checkbox>
        </span>
      </div>
      <div class="table-content-col9">
        <vs-icon icon-pack="feather" icon="icon-trash-2" class="cursor delete" @click.stop="removeUser(user, index)"
          size="18px" rounded="true">
        </vs-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios';
export default {
  name: 'NftUserTable',
  props: [
    'certificate_enabled',
    'users',
    'vc_details_submitted',
    'event_nft_enabled',
    'nft_details_submitted',
    'removeUser',
    'castId',
    'isStream',
    'viewer',
    'stepOneProps',
    'inviteeList',
    'increNftEnableCount',
    'decreNFTEnableCount',
  ],
  methods: {
    async issueVC() {
      console.log('issue func call');
      const userDid = localStorage.getItem('did');
      const orgDidKeySet = JSON.parse(localStorage.getItem('orgDid'));
      // console.log(userDid, orgDidKeySet, 'dkdkk');
      try {
        const response = await axios.post(
          'https://amanbishnoi.tech/api/issue-vc',
          {
            userDid,
            orgDidKeySet,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const vcData = response.data.vc_jwt_attendance;
        localStorage.setItem('vcData',vcData);
        // console.log('Issued VC:', vcData);
      } catch (error) {
        console.error('Error issuing VC:', error);
      }
    },
    clickIndex(user, index) {
      if (this.inviteeList[index].nft_enable === false) {
        this.stepOneProps.sender_addresses = [];
        this.increNftEnableCount();
        this.inviteeList[index].nft_enable = true;
        this.inviteeList[index].nft_type = 'NFTs';
        this.stepOneProps.sender_addresses.push(user.wallet_address);
        user.nft_type = 'NFTs';
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enabled for the user',
          color: 'success',
        });
      } else {
        this.decreNFTEnableCount();
        this.inviteeList[index].nft_enable = false;
        this.inviteeList[index].nft_type = 'NFTs';
        this.$vs.notify({
          title: 'Success',
          text: 'Drop disabled for the user',
          color: 'danger',
        });
      }
      const payload = {
        invitee_list: [this.inviteeList[index]],
        cast_id: this.castId,
      };
      this.$store
        .dispatch('studio/updateEnableNft', payload)
        .then(() => this.issueVC())
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    enableCertificate(user, index) {
      if (user.vc_enable === true) {
        this.increNftEnableCount();
        this.inviteeList[index].vc_enable = true;
        this.inviteeList[index].nft_type = 'vc';
        this.certificateProps.sender_addresses.push(user.wallet_address);
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enable for the user',
          color: 'success',
        });
      } else {
        this.decreNFTEnableCount();
        this.inviteeList[index].vc_enable = false;
        this.inviteeList[index].nft_type = 'vc';
        this.certificateProps.sender_addresses =
          this.certificateProps.sender_addresses.filter((ele) => {
            return ele !== user.wallet_address;
          });
        this.$vs.notify({
          title: 'Success',
          text: 'Drop disabled for the user',
          color: 'danger',
        });
      }
      const payload = {
        invitee_list: [this.inviteeList[index]],
        cast_id: this.castId,
      };
      this.$store
        .dispatch('studio/updateEnableNft', payload)
        .then()
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
};
</script>

<style scoped>
.table-heading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #31394e;
  background-color: #1f272f;
  border-radius: 6px;
  /* margin: auto; */
  margin-top: 10px;

  span {
    font-weight: 700;
  }
}

.table-head-col1,
.table-head-col9 {
  display: flex;
  align-items: center;
  flex: 0.5;
  padding: 5px 10px;
}

.table-head-col2,
.table-head-col3,
.table-head-col4,
.table-head-col5,
.table-head-col6,
.table-head-col7,
.table-head-col8 {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px 10px;
}

.table-content-row {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 6px;
  /* margin: auto; */
}

.table-content-col1,
.table-content-col9 {
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  flex: 0.5;
  padding: 5px 10px;
  cursor: pointer;
}

.table-content-col2,
.table-content-col3,
.table-content-col4,
.table-content-col5,
.table-content-col6,
.table-content-col7,
.table-content-col8 {
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
