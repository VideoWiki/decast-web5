<template>
  <div class="p-12 overflow-hidden">
    <h4 class="my-2">Invite</h4>
    <p class="my-2">Invite your attendees</p>
    <label class="toolTip">
      <span class="label-role">
        role
        <vs-icon
          icon-pack="feather"
          icon="icon-info"
          size="12px"
          rounded="true"
          style="align-self: flex-end"
        ></vs-icon>
      </span>
      <span class="toolTiptext p-5">
        <b>Co-Host / Moderator : </b> Co-host is the creator of the event. They
        act as moderator with many privileges. They could restrict users from
        entering the event and also assign other members as moderator.
        <br />
        <b> Participant : </b> Participants have access to microphone and
        camera. They also could share their screen when given the presenter role
        by moderator.
        <br />
        <b>Viewer : </b> Viewers could only watch the stream/cast and are
        permanently muted without access screen share and webcam.
      </span>
    </label>

    <vs-collapse
      ref="collapse"
      class="selectType my-2 form-group w-full normal select-roles-2"
      id="userType"
    >
      <vs-collapse-item>
        <div
          slot="header"
          style="padding: 0px"
          ref="userType"
          class="flex flex-wrap items-center"
        >
          {{ this.userRoleLabel }}
        </div>
        <div class="flex flex-wrap justify-center items-center">
          <div
            :key="index"
            @click="
              (viewer_mode == false && item.value == 'viewer') ||
              ((stream_urls == null || stream_urls.length <= 2) &&
                item.value == 'spectator')
                ? disabledOption()
                : selectUserRole(item.value, item.text)
            "
            class="my-2 select-roles-item-hover"
            style="width: 100%"
            v-for="(item, index) in userType"
          >
            {{ item.text }}
          </div>
        </div>
      </vs-collapse-item>
    </vs-collapse>
    <vs-input
      type="email"
      label="Email Address"
      v-model="userEmail"
      class="w-full my-2 mr-5 form-group"
      placeholder="Email"
      @keydown.enter="addUser"
    />
    <div class="my-2 flex">
      <button class="whiteBtn w-full m-2 cursor" @click="closePopup">
        Cancel
      </button>
      <vs-button class="w-full m-2" @click="addUser">Add</vs-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Invite',
  props: [
    'stream_urls',
    'viewer_mode',
    'closePopup',
    'userDetails',
    'showInvite',
  ],
  data() {
    return {
      userEmail: '',
      userType: [
        { text: 'Co-Host/Moderator', value: 'co-host' },
        { text: 'Participant', value: 'participant' },
        { text: 'Viewer', value: 'viewer' },
        { text: 'Spectator', value: 'spectator' },
      ],
      role: 'participant',
      userRoleLabel: 'Participant',
    };
  },
  watch: {
    showInvite: function (val) {
      if (this.showInvite === false) {
        this.$refs.collapse.closeAllItems();
      }
    },
  },
  created() {},
  mounted() {
    console.log('viewer', this.viewer_mode);
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
    validateEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
    },
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
    disabledOption() {
      this.$vs.notify({
        time: 6000,
        title: 'Role Disabled',
        text: 'Viewer Role is only enabled if viewer mode is enabled in step four and Spectator role is ony valid if streaming in step three is enabled. ',
        color: 'warning',
      });
    },
    async selectUserRole(x, y) {
      await this.$vs.loading();
      this.role = x;
      this.userRoleLabel = y;
      this.$refs.userType.click();
      this.$vs.loading.close();
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
        console.log(this.validateEmail(item));
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
      console.log(1);
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
          type: this.role,
          nft_enable: '',
          give_nft: false,
        });
      }
      const payload = {
        invitee_list: users,
        cast_id: this.$route.params.session_key,
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
          this.closePopup();
          this.userDetails();
          // this.users.push(addedUser);
          // if (this.walletAddress) {
          //   this.walletAddress[this.users.length - 1] =
          //     addedUser.wallet_address;
          // } else {
          //   this.walletAddress[this.users.length - 1] = null;
          // }
          // const userList = {
          //   id: addedUser.id,
          //   name: addedUser.name,
          //   email: addedUser.email,
          //   type: addedUser.role,
          //   nft_enable: addedUser.nft_enable,
          // };
          // this.inviteeList.push(userList);
          // this.giveNft = false;
          // this.$vs.loading.close();
          // this.$vs.notify({
          //   title: '',
          //   text: 'User added successfully !',
          //   color: 'success',
          // });
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again !',
            color: 'Danger',
          });
        });
    },
  },
};
</script>
<style>
.toolTip {
  position: relative;
  display: inline-block;
}
.toolTip .toolTiptext {
  visibility: hidden;
  width: 1100%;
  color: white;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 99999;
  top: 100%;
  /* margin-left: -60px;  */
  opacity: 0;
  transition: opacity 0.3s;
}

.toolTip:hover .toolTiptext {
  padding: 5px;
  margin-left: -50px;
  margin: 5px;
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}
.toolTip .toolTiptext::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 8.5%;
  transform: rotate(3.142rad);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}
</style>
