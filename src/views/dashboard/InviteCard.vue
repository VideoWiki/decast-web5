<template>
  <NftEdit v-if="currStatus === 'edit'" :cast_id="castId" :currStatus="currStatus" :ToggleEdit="ToggleEdit" />
  <ShareNftLink v-else-if="currStatus === 'share'" :cast_id="castId" :ToggleEdit="ToggleEdit" />
  <div v-else class="invite-cont">
    <div class="head-container">
      <h3>Invite your attendees</h3>
      <button @click="closeInvite">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>
    <div class="invite-section mb-4">
      <div class="invite-wrapper">
        <div class="invite-wrapper-left">
          <div class="input-container">
            <div class="opt-cont" ref="customSelect" @mousedown="toggleDropdown">
              <label class="custom-selector">
                <select v-model="selectedOption">
                  <option value="participant">Participants</option>
                  <option value="co-host">Co-host</option>
                  <option v-if="isStream" value="spectator">Spectator</option>
                  <option v-if="viewer" value="viewer">Viewer</option>
                </select>
              </label>
              <ul v-if="isDropdownOpen" class="custom-options">
                <li v-for="(option, index) in options" :key="index" @mousedown="selectOption(option)">
                  {{ option.label }}
                </li>
              </ul>
            </div>
            <input v-model="userEmail" @keydown.enter="addUser" placeholder="contact@example.com" />
            <button @click="addUser">Invite</button>
          </div>
        </div>
        <p class="input-separator">or</p>
        <div class="invite-wrapper-right">
          <input type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style="display: none" @change="updateSheetInfo" ref="sheetInput" />
          <div v-if="!file" class="invite-bulk-wrapper">
            <button class="select-btn" @click="openSheetInput">Invite Bulk</button>
            <button class="sample-btn">
              <a href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx">
                <vs-icon icon-pack="feather" icon="icon-download" size="14px" rounded="true" style="align-self: flex-end; color: #a6a6a8;">
                </vs-icon>
                <span class="ml-2">Download sample file</span>
              </a>
            </button>
          </div>
          <div v-else class="invite-bulk-wrapper">
            <button class="invite-btn" @click="submitSheet">
              Upload file
            </button>
            <p>{{ sheetFileName }}</p>
            <span>{{ sheetFileSize }}</span>
            <button class="close-button" @click="handleClearFile">
              <img src="@/assets/images/delete.svg" />
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="progression">
        <progress max="100" class="prog-bar" :value="uploadPercentage"></progress>
        <p class="percent-label" style="line-height: 15px">
          {{ uploadPercentage }}%
        </p>
      </div> -->
    </div>

    <div>
      <vs-button v-if="isAirdrop && pub_nft_flow" @click="
        public_nft_status
          ? changePublicNftStatus(castId, 'False')
          : changePublicNftStatus(castId, 'True')
        " class="text-white text-base mx-2 my-1 airdrop-btn " style="font-size: 12px;">
        <span class="btn-custom-theme flex flex-wrap align-bottom">
          {{ public_nft_status ? 'Disable Claim NFT' : 'Enable Claim NFT' }}
          <div>
            &nbsp;
            <span></span>
            <vs-icon content="Allow the Viewers/Attendees to mint the NFT" v-tippy="{ placement: 'top', arrow: true }"
              icon-pack="feather" icon="icon-info" size="14px" rounded="true" style="align-self: flex-end">
            </vs-icon>
          </div>
        </span>
      </vs-button>

      <vs-button v-if="this.users" @click="inviteeListDownload" class="BTN text-base mx-2 my-1 airdrop-btn"
        content="Download Invitee List" v-tippy="{ placement: 'top', arrow: true }" style="font-size: 12px;">
        <vs-icon icon-pack="feather" icon="icon-download" size="14px" rounded="true" style="align-self: flex-end">
        </vs-icon>
      </vs-button>

      <vs-button v-if="nft_details_submitted && !certificate_enabled" content="Edit NFT" style="font-size: 12px;"
        @click="ToggleEdit('edit')" v-tippy="{ placement: 'top', arrow: true }"
        class="BTN text-base mx-2 my-1 airdrop-btn">
        <vs-icon icon-pack="feather" icon="icon-edit" size="14px" rounded="true" style="align-self: flex-end">
        </vs-icon>
      </vs-button>

      <vs-button v-if="isAirdrop && pub_nft_flow" class="BTN text-base mx-2 my-1 airdrop-btn" style="font-size: 12px;"
        @click="ToggleEdit('share')" content="Copy link of NFT to share" v-tippy="{ placement: 'top', arrow: true }">
        <vs-icon icon-pack="feather" icon="icon-share-2" size="14px" rounded="true" style="align-self: flex-end">
        </vs-icon>
      </vs-button>

      <vs-button v-if="(nft_enable_count <= 0 || airdrop_done) && event_nft_enabled && this.nft_details_submitted" disabled
        @click="audienceDropMail" class="text-white text-base mx-2 my-1 airdrop-btn" style="font-size: 12px;">Airdrop
      </vs-button>

      <vs-button v-if="nft_enable_count > 0 && !airdrop_done && event_nft_enabled" @click="audienceDropMail"
        class="text-white text-base mx-2 my-1 airdrop-btn">Airdrop
      </vs-button>
    </div>

    <div v-if="!users" class="w-full">No users added</div>
    <!-- Normal table when no nft is enabled -->
    <div v-else-if="!event_nft_enabled && !certificate_enabled" class="user-table-wrapper">
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
          <span>Delete</span>
        </div>
      </div>
      <div class="table-content-row" v-for="(user, userIdx) in users" :key="userIdx">
        <div class="table-content-col1" v-if="user.email">
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
        <div class="table-content-col2" v-if="user.email">
          <span>{{ user.role }}</span>
        </div>
        <div class="table-content-col3" v-if="user.email">
          <span>{{ user.email }}</span>
        </div>
        <div class="table-content-col4" v-if="user.email">
          <vs-icon icon-pack="feather" icon="icon-trash-2" class="cursor" @click.stop="removeUser(user, userIdx)"
            size="18px" rounded="true" v-if="user.email">
          </vs-icon>
        </div>
      </div>
    </div>

    <!-- Table when nft is enabled -->
    <div v-else-if="event_nft_enabled || certificate_enabled" class="user-table-wrapper">
      <NftUserTable :certificate_enabled="certificate_enabled" :users="users" :vc_details_submitted="vc_details_submitted"
        :event_nft_enabled="event_nft_enabled" :nft_details_submitted="nft_details_submitted" :removeUser="removeUser"
        :castId="castId" :isStream="isStream" :viewer="viewer" :stepOneProps="stepOneProps" :inviteeList="inviteeList" 
        :nft_enable_count="nft_enable_count" :increNftEnableCount="increNftEnableCount" :decreNFTEnableCount="decreNFTEnableCount"/>
    </div>

    <!-- <div class="parent-img">
      <div class="main-img">
        <div
          v-for="(invite, inviteIndex) in invites"
          :key="inviteIndex"
          class="images-container"
        >
          <p>
            {{ invite.email.slice(0, 2) }}
          </p>
          <button class="close-button" @click="removeUser(invite, inviteIndex)">
            X
          </button>
        </div>
      </div>
      <span>{{ invites.length }}</span>
    </div> -->

    <!-- <div class="info-cont">
      <p>Or Invite many attendees by submitting an excel sheet</p>
      <div class="opt-container">
        <div class="child-1">
          <div>
            <input type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style="display: none" @change="updateSheetInfo" ref="sheetInput" />
            <button @click="openSheetInput">Select file</button>
            <p>{{ sheetFileName }}</p>
            <span>{{ sheetFileSize }}</span>
          </div>

          <div>
            <button>
              <img src="@/assets/images/delete.svg" />
            </button>
          </div>
        </div>

        <div class="midStroke"></div>

        <div class="prog-cont">
          <div class="progression">
            <progress max="100" class="prog-bar" :value="uploadPercentage"></progress>
            <p class="w-2/12 px-4" style="line-height: 15px">
              {{ uploadPercentage }}%
            </p>
          </div>
          <div class="btn-cont">
            <button class="sample-Btn">
              <a href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx">
                <span>Sample List</span>
              </a>
            </button>
            <button class="invite-btn" @click="submitSheet">
              Invite People
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="nots-cont">
      <div>
        <span>Notifications</span>
        <br />
        <button>Email</button>
      </div>
      <div>
        <span>Set reminder</span>
        <br />
        <button>1 hour before call</button>
      </div>
    </div> -->

    <div class="done-btn">
      <button @click="closeInvite">Close</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import constants from '../../../constant';
import axios from '../../axios';
import NftEdit from './NFT/NftEdit.vue';
import ShareNftLink from './NFT/ShareNftLink.vue';
import NftUserTable from './NftUserTable.vue'

export default {
  name: 'InviteCard',
  props: ['isAirdrop', 'pub_nft_flow', 'public_nft_status', 'changePublicNftStatus', 'nft_details_submitted', 'stepOneProps',
    'castId', 'invites', 'closeInvite', 'isStream', 'viewer', 'event_nft_enabled', 'certificate_enabled', 'vc_details_submitted'],
  components: {
    NftEdit,
    ShareNftLink,
    NftUserTable,
  },
  data() {
    return {
      file: null,
      userEmail: '',
      userRoleLabel: 'Participant',
      inviteeList: [],
      users: [],
      walletAddress: [],
      selectedOption: 'participant',
      isDropdownOpen: false,
      options: [
        { value: 'participant', label: 'Participants' },
        { value: 'co-host', label: 'Co-host' },
      ],
      sheetFileName: 'No File Selected',
      sheetFileSize: 0,
      uploadPercentage: 0,
      currStatus: '',
      nft_enable_count: 0,
      airdrop_done: false,
    };
  },
  mounted() {
    window.addEventListener('click', this.closeDropDown);
    console.log(this.isStream);
    console.log(this.viewer);
    if (this.isStream)
      this.options.push({ value: 'spectator', label: 'Spectator' });
    if (this.viewer) this.options.push({ value: 'viewer', label: 'Viewer' });
    this.userDetails();
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeDropDown);
  },
  methods: {
    increNftEnableCount(){
      this.nft_enable_count = this.nft_enable_count + 1;
    },
    decreNFTEnableCount(){
      this.nft_enable_count = this.nft_enable_count - 1;
    },
    audienceDropMail() {
      if (this.nft_enable && this.certificate_enabled) {
        this.disabled = true;
      }
      const payload = {
        cast_id: this.castId,
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
    validateEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
    },
    ToggleEdit(status) {
      this.currStatus = status;
    },
    inviteeListDownload() {
      const payload = {
        cast_id: this.castId,
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
    userDetails() {
      this.$vs.loading();
      const payload = { cast_id: this.castId };
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
    handleClearFile() {
      this.sheetFileName = 'No File Selected';
      this.sheetFileSize = '';
      this.uploadPercentage = 0;
      this.file = null;
      fileInput.value = '';
    },
    closeDropDown(e) {
      console.log(e.target.tagName);
      if (e.target.tagName !== 'LI') {
        console.log(2);
        this.isDropdownOpen = false;
      }
    },
    toggleDropdown(event) {
      if (window.innerWidth >= 420) {
        event.preventDefault();
        console.log(1);
        setTimeout(() => (this.isDropdownOpen = !this.isDropdownOpen), 500);
      }
    },
    selectOption(option) {
      this.selectedOption = option.value;
      this.isDropdownOpen = false;
    },

    async checkInvitee(email) {
      let result = false;
      const payload = {
        email: email,
        cast_id: this.castId,
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

    async addUser() {
      var x = {};
      var emailList = this.userEmail.split(',').map((item) => {
        if (x[item.trim()]) {
          console.log('nooooo');
          return;
        }
        x[item.trim()] = 1;

        return item.trim();
      });
      emailList = Object.keys(x);
      var validEmails = emailList.reduce((validEmail, item) => {
        if (!this.validateEmail(item)) {
          this.$vs.notify({
            time: 6000,
            title: 'Invalid Email',
            text: item + ' is not a valid email',
            color: 'danger',
          });
        }
        return validEmail && this.validateEmail(item);
      }, true);
      if (!validEmails) {
        this.validEmailError = true;
        return;
      }
      this.$vs.loading();
      var users = [];
      for (let i = 0; i < emailList.length; i++) {
        const duplicate = await this.checkInvitee(emailList[i]);
        if (duplicate) {
          this.$vs.notify({
            time: 6000,
            title: 'Email Already Invited',
            text: 'We are going to  ignore user ' + emailList[i],
            color: 'warning',
          });
          continue;
        }
        console.log(duplicate);
        users.push({
          name: '',
          email: emailList[i],
          type: this.selectedOption,
          nft_enable: '',
          give_nft: false,
        });
      }
      const payload = {
        invitee_list: users,
        cast_id: this.castId,
      };
      this.validEmailError = false;
      if (users.length === 0) {
        this.$vs.loading.close();
        this.userEmail = '';
        this.$vs.notify({
          color: 'warning',
          title: 'User Already Invited',
        });
        return;
      }
      this.$store
        .dispatch('studio/addInvitee', payload)
        .then((res) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: '',
            text: 'User added successfully !',
            color: 'success',
          });
          this.userEmail = '';
          // this.closePopup();
          this.userDetails();
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

    // async addUser() {
    //   const userEmail = this.userEmail.trim();
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //   if (!emailRegex.test(userEmail)) {
    //     this.$vs.notify({
    //       time: 3000,
    //       title: 'Invalid Email',
    //       text: 'Please enter a valid email address.',
    //       color: 'warning',
    //     });
    //     return;
    //   }

    //   this.$vs.loading();

    //   const isAlreadyInvited = await this.checkInvitee(userEmail);

    //   if (isAlreadyInvited) {
    //     this.$vs.loading.close();
    //     this.$vs.notify({
    //       time: 6000,
    //       title: 'Email Already Invited',
    //       text: 'This email has already been invited.',
    //       color: 'warning',
    //     });
    //     return;
    //   }

    //   const userToInvite = {
    //     name: '',
    //     email: userEmail,
    //     type: this.selectedOption,
    //     nft_enable: '',
    //     give_nft: false,
    //   };

    //   const newUser = {
    //     email: userEmail,
    //     role: this.selectedOption,
    //     images: [],
    //   };

    //   const emailPrefix = userEmail.substring(0, 2).toUpperCase();
    //   newUser.images.push(`https://fakeimg.pl/50x50/?text=${emailPrefix}`);

    //   this.users.push(userToInvite)
    //   this.invites.push(newUser);
    //   const payload = {
    //     invitee_list: [userToInvite],
    //     cast_id: this.castId,
    //   };

    //   this.$store
    //     .dispatch('studio/addInvitee', payload)
    //     .then((res) => {
    //       this.$vs.loading.close();
    //       this.$vs.notify({
    //         title: '',
    //         text: 'User added successfully!',
    //         color: 'success',
    //       });
    //       this.userEmail = '';
    //       this.$vs.loading.close();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$vs.loading.close();
    //       this.$vs.notify({
    //         title: 'Error',
    //         text: 'Try again',
    //         color: 'danger',
    //       });
    //     });
    // },

    removeUser(user, userIndex) {
      const payload = {
        email: [user.email],
        cast_id: this.castId,
      };

      this.$store
        .dispatch('studio/deleteInvitee', payload)
        .then((res) => {
          if (user.nft_enable) this.nft_enable_count--;
          if (userIndex > -1) {
            this.users.splice(userIndex, 1);
            this.inviteeList.splice(userIndex, 1);
          }
          this.invites.splice(userIndex, 1);
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

    openSheetInput() {
      this.$refs.sheetInput.click();
    },
    submitSheet() {
      const fileInput = this.$refs.sheetInput;
      if (fileInput.files.length === 0) {
        this.$vs.notify({
          time: 3000,
          title: 'Oh No',
          text: 'No File Selected',
          color: 'warning',
        });
        return;
      }
      const file = fileInput.files[0];
      var formData = new FormData();
      formData.append('file', file);
      formData.append('cast_id', this.castId);
      axios
        .post(constants.apiCastUrl + '/api/event/invitee/import/', formData, {
          headers: {
            'Content-Type': 'multiPart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
        })
        .then((res) => {
          this.$vs.notify({
            time: 3000,
            title: 'Success',
            text: 'Invited Successfully.',
            color: 'success',
          });

          this.sheetFileName = 'No File Selected';
          this.sheetFileSize = '';
          this.uploadPercentage = 0;
          this.file = null;
          fileInput.value = '';
          this.userDetails();
        })
        .catch((error) => {
          console.log(error);
          this.$vs.notify({
            time: 3000,
            title: 'Unauthorized',
            text: 'You are not allowed to invite people',
            color: 'danger',
          });
          this.uploadPercentage = 0;
        });
    },

    updateSheetInfo(event) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.file = file;
        this.sheetFileName = file.name;
        this.sheetFileSize = `${(file.size / 1024 / 1024).toFixed(2)}MB`;
      } else {
        this.sheetFileName = 'No File Selected';
        this.sheetFileSize = '';
      }
    },
  },
};
</script>

<style scoped>
.btn-custom-theme {
  color: #000000;
  font-weight: 500;
}

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
.table-head-col2,
.table-head-col3,
.table-head-col4 {
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
.table-content-col2,
.table-content-col3,
.table-content-col4 {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px 10px;
  cursor: pointer;
}

.invite-wrapper {
  display: flex;
  margin-top: 20px;
}

.invite-wrapper-left {
  display: flex;
  flex: 0.5;
  margin-right: 10px;
}

.invite-wrapper-right {
  display: flex;
  flex: 0.5;
  margin-left: 10px;
}

.input-separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.percent-label {
  width: 100%;
  text-align: center;
}

.user-table-wrapper {
  overflow-y: scroll;
  height: inherit;
}

.select-btn {
  cursor: pointer;
  background-color: #2d3a48;
  border-radius: 6px;
  border: 1px solid #31394e;
  font-size: 12px;
  height: 100%;
  width: 115.5px;
  color: #a6a6a8;
}

.opt-cont {
  width: 109px;
  height: 40px;
  background-color: #2d3a48;
  border: 1px solid #31394e;
  border-radius: 6px;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  font-family: sans-serif;
  position: relative;
}

.opt-cont .custom-selector select {
  max-width: 95px;
  min-width: 90px;
  border-radius: 6px;
  border: 1px solid #31394e;
  outline: none;
  background-color: #2d3a48;
  color: #a6a6a8;
  cursor: pointer;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.opt-cont .custom-selector::after {
  content: '';
  border-width: 6px;
  border-style: solid;
  border-color: transparent;
  border-top-color: #fff;
  display: inline-block;
  position: absolute;
  top: 13px;
  right: 10px;
}

.opt-cont .custom-options {
  list-style: none;
  padding: 5px 0;
  background-color: #2d3a48 !important;
  z-index: 999 !important;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 108.8px;
  position: absolute !important;
  margin: auto;
  left: -1px;
}

.opt-cont .custom-options li {
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 5px;
  color: #a6a6a8;
  transition: background 0.3s ease;
}

.opt-cont .custom-options li:hover {
  background-color: #31a2f4;
}
</style>

<style scoped>
.invite-cont {
  /* width: 590px; */
  /* min-height: 475px; */
  /* height: auto; */
  width: 790px;
  height: 85vh;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
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

.input-container {
  display: flex;
  border: 1px solid #31394e;
  border-radius: 6px;
  /* width: 555px; */
  width: 100%;
  /* margin: auto; */
  height: 42px;
}

.invite-bulk-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  border: 1px solid #31394e;
  border-radius: 6px;
  /* width: 555px; */
  /* margin: auto; */
  width: 100%;
  height: 42px;
}

.invite-bulk-wrapper p {
  padding: 0px 10px;
}

/* :root {
    --select-border: #777;
    --select-focus: blue;
    --select-arrow: var(--select-border);
} */

.input-container button {
  width: 80px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  color: #fff;
  background-color: #31a2f4;
}

.input-container input {
  width: 100%;
  background-color: #1d232b;
  padding: 10px;
  border: none;
  outline: none;
  height: 40px;
  color: #a6a6a8;
}

/* .final-div {
    max-width: 270px;
    width: fit-content;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 10px;
} */

.parent-img {
  max-width: 270px;
  width: fit-content;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.main-img {
  max-width: 220px;
  height: 45px;
  width: fit-content;
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  overflow: hidden;
}

.parent-img span {
  width: 30px;
  height: 18px;
  border-radius: 8px;
  background-color: #2934415e;
  border: 1px solid #31394e99;
  margin: auto;
  text-align: center;
  font-size: 11px;
  color: #a6a6a8;
}

.images-container {
  width: 38px;
  display: inline-block;
  flex-wrap: nowrap;
  margin-top: 20px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  position: relative;
}

.images-container img {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  position: relative;
}

.images-container p {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  position: relative;
  border: 1px solid #31394e;
  color: #a6a6a8;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #31394e;
}

.close-button {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #293441;
  border: 1px solid #31394e;
  cursor: pointer;
  font-size: 10px;
  color: #a6a6a8;
}

.info-cont {
  width: 565px;
  margin: auto;
  margin-top: 25px;
}

.info-cont p {
  color: #637181;
  font-size: 12px;
  font-weight: 600px;
}

.opt-container {
  border: 1px solid #31394e;
  background-color: #1f272f;
  width: 555px;
  height: 120px;
  border-radius: 6px;
  /* margin: auto; */
  margin-top: 10px;
}

.nots-cont {
  width: 240px;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

.nots-cont div span {
  font-size: 12px;
}

.nots-cont div button {
  margin-top: 5px;
}

.nots-cont div:nth-child(1) button {
  background-color: #464775;
  width: 63px;
  height: 30px;
  border: none;
  border-radius: 6px;
  color: #a6a6a8;
}

.nots-cont div:nth-child(2) button {
  background-color: #2934415e;
  border: 1px solid #31394e;
  color: #a6a6a8;
  width: 149px;
  height: 30px;
  border-radius: 6px;
}

.done-btn {
  text-align: right;
  margin-top: 20px;
}

.done-btn button {
  background-color: #d7df23;
  width: 141px;
  height: 40px;
  border: none;
  border-radius: 6px;
}

.child-1 {
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
}

.child-1 div:nth-child(1) {
  display: flex;
  gap: 10px;
}

.child-1 div:nth-child(1) button {
  cursor: pointer;
  background-color: #2d3a48;
  border-radius: 6px;
  border: 1px solid #31394e;
  font-size: 12px;
  width: 115.5px;
  height: 34px;
  color: #a6a6a8;
}

.child-1 div:nth-child(1) p {
  margin: auto;
  color: #a6a6a8;
}

.child-1 div:nth-child(1) span {
  background-color: #2934415e;
  border: 1px solid #31394e;
  border-radius: 8px;
  width: 50px;
  height: 17px;
  margin: auto;
  font-size: 12px;
  color: #a6a6a8;
  text-align: center;
}

.child-1 div:nth-child(2) {
  width: 16px;
  margin-top: 5px;
}

.child-1 div:nth-child(2) button {
  background: none;
  border: none;
  margin: auto;
}

.child-1 div:nth-child(2) button img {
  width: 15px;
  height: 16px;
}

.midStroke {
  width: 554px;
  margin: auto;
  border: 1px solid #31394e;
}

.prog-cont {
  display: flex;
  width: 540px;
  margin: auto;
  height: 60px;
  /* border: 1px solid #fff; */
}

.progression p {
  margin: auto;
}

.prog-bar {
  width: 100%;
  /* background-color: #2934415E; */
  margin: auto;
}

.sample-Btn {
  min-width: 101px;
  height: 30px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 6px;
  color: #a6a6a8;
  margin: auto;
}

.sample-btn {
  min-width: 101px;
  height: 100%;
  background-color: #1f272f;
  border: none;
  border-radius: 6px;
  color: #a6a6a8;
  padding: 0px 10px;
}

.btn-cont {
  margin: auto;
  display: flex;
  gap: 10px;
}

.sample-Btn a span {
  color: #a6a6a8;
}

.invite-btn {
  background-color: #31a2f4 !important;
  min-width: 101px;
  /* height: 30px; */
  height: 100%;
  border-radius: 6px;
  color: #fff;
  border: none;
  /* margin: auto !important; */
}

@media (max-width: 499px) {
  .invite-cont {
    width: 370px;
    padding: auto;
    margin: auto;
    margin-top: -30rem;
  }

  .input-container input {
    width: 200px;
    padding: 3px;
    height: 40px;
    font-size: 12px;
    font-weight: 500;
  }

  .input-container button {
    width: 50px;
    font-size: 12px;
    font-weight: 500;
  }

  .input-container {
    width: 350px;
  }

  .opt-cont {
    width: 100px;
    padding: 8px 3px;
    font-size: 10px;
  }

  .opt-cont .custom-selector select {
    max-width: 95px;
    min-width: 90px;
  }

  .opt-cont .custom-selector::after {
    right: 5px;
  }

  .opt-container {
    width: 350px;
    height: auto;
  }

  .prog-cont {
    display: flex;
    flex-direction: column;
  }

  .midStroke {
    width: 350px;
  }

  .prog-cont {
    display: flex;
    width: 350px;
    margin: auto;
    height: auto;
  }

  .progression {
    display: flex;
  }

  .btn-cont {
    margin: 10px 0px 10px 0px;
  }

  .done-btn button {
    width: 100px;
    height: 40px;
  }
}
</style>
