<template>
  <vs-table stripe :data="users" :hoverFlat="true">
    <template slot="thead">
      <vs-th class="normal headingFont"> Status </vs-th>
      <vs-th class="normal headingFont"> Role </vs-th>
      <vs-th class="normal headingFont"> Email </vs-th>
      <vs-th class="normal headingFont"> Wallet Address </vs-th>
      <vs-th
        class="normal headingFont"
        v-if="certificate_enabled && vc_details_submitted"
        >VC status</vs-th
      >

      <vs-th
        class="normal headingFont"
        v-if="certificate_enabled && vc_details_submitted"
      >
        Enable Certificate</vs-th
      >

      <vs-th
        class="normal headingFont"
        v-if="event_nft_enabled && nft_details_submitted"
        >NFT status</vs-th
      >

      <vs-th class="normal" v-if="event_nft_enabled && nft_details_submitted"
        >Enable NFT</vs-th
      >

      <vs-th class="normal headingFont"> Delete </vs-th>
    </template>

    <template slot-scope="{ data }">
      <vs-tr :key="index" v-for="(user, index) in data" class="my-2">
        <vs-td>
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
        <!-- {{ user.joined }} -->
        <vs-td>
          {{ user.role == null ? 'attendee' : user.role }}
        </vs-td>

        <vs-td>
          {{ user.email }}
        </vs-td>

        <vs-td>
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
        </vs-td>

        <vs-td v-if="certificate_enabled && vc_details_submitted">
          <span
            v-if="
              certificate_enabled &&
              user.vc_enable &&
              user.vc_mint_status &&
              vc_details_submitted
            "
          >
            <span
              content="Not Clicked"
              v-tippy="{ placement: 'top', arrow: true }"
              v-if="
                user.vc_mint_status == 'not started' ||
                user.vc_mint_status == null
              "
            >
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #afb7c7;
                "
              ></div>
              <span></span>
            </span>
            <span content="clicked" v-tippy="{ placement: 'top', arrow: true }">
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffff00;
                "
              ></div>
              <span></span>
            </span>
            <span
              content="Claimed"
              v-tippy="{ placement: 'top', arrow: true }"
              v-if="user.vc_mint_status == 'successful'"
            >
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #01c34e;
                "
              ></div>
              <span></span>
            </span>
          </span>
        </vs-td>

        <vs-td v-if="certificate_enabled && vc_details_submitted">
          <span
            v-if="
              user.wallet_address && certificate_enabled && vc_details_submitted
            "
          >
            <vs-checkbox
              @change="enableCertificate(user, index)"
              v-model="user.vc_enable"
              :disabled="user.vc_mint_status == 'successful'"
            ></vs-checkbox>
          </span>
        </vs-td>

        <vs-td v-if="event_nft_enabled && nft_details_submitted">
          <span
            v-if="
              event_nft_enabled &&
              user.nft_enable &&
              user.mint_status &&
              nft_details_submitted
            "
          >
            <span
              content="Not Clicked"
              v-tippy="{ placement: 'top', arrow: true }"
              v-if="user.mint_status == 'not started'"
            >
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #afb7c7;
                "
              ></div>
              <span></span>
            </span>
            <span
              content="Clicked"
              v-tippy="{ placement: 'top', arrow: true }"
              v-if="user.mint_status == 'started'"
            >
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffff00;
                "
              ></div>
              <span></span>
            </span>
            <span
              content="Claimed"
              v-tippy="{ placement: 'top', arrow: true }"
              v-if="user.mint_status == 'successful'"
            >
              <div
                class="ml-1"
                style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #01c34e;
                "
              ></div>
              <span></span>
            </span>
          </span>
        </vs-td>

        <vs-td
          style="padding: 10px"
          v-if="event_nft_enabled && nft_details_submitted"
        >
          <span
            v-if="
              user.wallet_address && event_nft_enabled && nft_details_submitted
            "
          >
            <vs-checkbox
              @change="clickIndex(user, index)"
              v-model="user.nft_enable"
              :disabled="user.mint_status == 'successful'"
            ></vs-checkbox>
          </span>
        </vs-td>

        <vs-td>
          <vs-icon
            icon-pack="feather"
            icon="icon-trash-2"
            class="cursor delete"
            @click.stop="removeUser(user, index)"
            size="24px"
            rounded="true"
          >
          </vs-icon>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
export default {
  name: 'UserTable',
  props: [
    'certificate_enabled',
    'users',
    'vc_details_submitted',
    'event_nft_enabled',
    'nft_details_submitted',
    'removeUser',
  ],
  methods: {
    clickIndex(user, index) {
      if (this.inviteeList[index].nft_enable === false) {
        this.nft_enable_count = this.nft_enable_count + 1;
        this.inviteeList[index].nft_enable = true;
        this.inviteeList[index].nft_type = 'NFTs';
        this.stepOneProps.sender_addresses.push(user.wallet_address);
        // user.nft_type = 'NFTs';
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enabled for the user',
          color: 'success',
        });
      } else {
        this.nft_enable_count--;
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
        cast_id: this.$route.params.session_key,
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
    enableCertificate(user, index) {
      if (user.vc_enable === true) {
        this.nft_enable_count = this.nft_enable_count + 1;
        this.inviteeList[index].vc_enable = true;
        this.inviteeList[index].nft_type = 'vc';
        this.certificateProps.sender_addresses.push(user.wallet_address);
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enable for the user',
          color: 'success',
        });
      } else {
        this.nft_enable_count = this.nft_enable_count - 1;
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
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/updateEnableNft', payload)
        .then(() => console.log(this.nft_enable_count))
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
.headingFont {
  font-size: 15px;
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

.delete:hover {
  color: red !important;
}
</style>