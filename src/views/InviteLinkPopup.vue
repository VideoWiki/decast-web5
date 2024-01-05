<template>
  <div style="z-index: 10">
    <div
      class="Popup cursor-pointer"
      ref="btn"
      @click="inviteLinkPopup"
      content="Invite URLs"
      v-tippy="{ placement: 'top', arrow: true }"
    >

      <span></span>
      <div class="circle red" v-if="!showLinkModal"></div>
      <feather-icon
        icon="SendIcon"
        svgClasses="h-6 w-6 stroke-current"
        class="PopBtn"
        ref="copy"
      />
    </div>
    <vs-popup ref="custom_modal1" :active.sync="showLinkModal">
      <div class="">
        <div class="mb-6 mt-4 text-center">
          <h3>Invite Links</h3>
        </div>
        <div class="links">
          <div class="my-4 text-right mr-20">Co-Host:</div>
          <div class="flex my-4">
            {{ coHostUrl }}
            <feather-icon
              icon="ClipboardIcon"
              svgClasses="h-5 w-5 stroke-current"
              id="infoBtn"
              class="info"
              @click="copyCohost"
              ref="copy"
            />
          </div>
          <div class="my-4 text-right mr-16">Participant:</div>
          <div class="flex my-4">
            {{ participantUrl }}
            <feather-icon
              icon="ClipboardIcon"
              svgClasses="h-5 w-5 stroke-current"
              id="infoBtn"
              class="info"
              @click="copyParticipant"
              ref="copy"
            />
          </div>
        </div>
      </div>
      <!--vs-divider /-->
    </vs-popup>
  </div>
</template>
<script>
import axios from '../axios';
import constants from '../../constant';
import VueTippy, { tippy, TippyComponent } from 'vue-tippy';
import Vue from 'vue';
Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

export default {
  name: 'InvitePopup',
  data() {
    return {
      showLinkModal: false,
      count: 0,
    };
  },
  computed: {
    cast_Id() {
      return this.$store.state.auth.castID;
    },
    coHostUrl() {
      const hostUrl = JSON.parse(localStorage.getItem('Instant_cast'));
      // console.log('this is Host' + Host_Url['co-host_url']);
      return hostUrl['co-host_url'][0];
    },
    participantUrl() {
      const participantUrl = JSON.parse(localStorage.getItem('Instant_cast'));
      return participantUrl.participant_url[0];
    },
    open() {
      const openVal = localStorage.getItem('open');
      console.log('value of Open is ', openVal);
      return openVal;
    },
  },
  created() {
    setInterval(() => {
      axios
        .get(
          constants.apiCastUrl +
            '/api/event/meeting/info/?public_meeting_id=' +
            JSON.parse(localStorage.getItem('Instant_cast')).public_cast_id
        )
        .then((res) => {
          if (res.data.meeting_info.running === false && this.count >= 2) {
            localStorage.removeItem('Instant_cast');
          }
          this.count++;
        });
    }, 3000);
  },
  mounted() {
    this.$refs.custom_modal1.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal1.$el.childNodes[1].style.width = '800px';
    if (this.open === 'false') {
      localStorage.setItem('open', 'true');
      this.$refs.btn.click();
    }
  },
  methods: {
    // Work here (teleram Sign)
    inviteLinkPopup() {
      this.showLinkModal = true;
    },
    copyCohost(e) {
      if (this.disableHost) {
        return;
      }
      this.disableHost = true;
      setTimeout(() => {
        this.disableHost = false;
        e.target.style.color = 'black';
      }, 2000);
      navigator.clipboard.writeText(this.coHostUrl);
      e.target.style.color = 'green';
      this.$vs.notify({
        text: 'Co-host invite copied',
        title: 'Copied',
        color: 'success',
      });
    },
    copyParticipant(e) {
      if (this.disableParticipant) {
        return;
      }
      this.disableParticipant = true;
      setTimeout(() => {
        this.disableParticipant = false;
      }, 2000);
      navigator.clipboard.writeText(this.participantUrl);
      e.target.style.color = 'green';
      setTimeout(() => {
        e.target.style.color = 'black';
      }, 1000);
      this.$vs.notify({
        text: 'Participant invite copied',
        title: 'Copied',
        color: 'success',
      });
    },
    async castInfo() {
      const payload = this.cast_Id;
      await this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          //   this.stepOneProps.public_otp = response.data.meeting_info.public_otp;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(JSON.stringify(err));
          // this.$router.push('/error/404.vue');
        });
    },
  },
  components: { tippy },
};
</script>

// ____________Script Ends Here___________
<style scoped>
.vs-popup--content {
  background: rgb(184, 178, 194);
}
.section {
  padding: 3%;
}
vs-popup--header {
  display: none;
}

.Popup {
  position: fixed;
  bottom: 7.2rem;
  right: 2.3rem;
  background: #d9c1fe;
  color: #9344f7;
  border-radius: 50%;
  padding: 12px 15px;
}

.PopBtn {
  transform: translate(0, 15%);
}

.links {
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-weight: 500;
  font-size: 15px;
}

.flex {
  justify-content: space-between;
}
/* .chat-box-toggle{

  } */
</style>
<style scoped>
@keyframes up-right {
  0% {
    transform: scale(1);
    opacity: 0.25;
  }
  50% {
    transform: scale (1, 5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.25;
  }
}
.circle {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  opacity: 0.5;
  position: absolute;
}
.red {
  background-color: red;
  top: 3%;
  right: 70%;
  -webkit-animation: up-right 1s infinite;
  -moz-animation: up-right 1s infinite;
  -o-animation: up-right 1s infinite;
  animation: up-right 1s infinite;
}
</style>
