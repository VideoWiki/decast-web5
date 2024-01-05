<template>
  <div class="full-container">
    <div class="logo">
      <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" alt="" />
    </div>
    <div class="h-full w-full flex justify-center items-center">
      <div class="flex">
        <div class="left">
          <img src="@/assets/images/dashboard/Onlinemeeting.svg" alt="" />
        </div>
        <div class="right">
          <div class="heading-part">
            <div class="join-text">You're joining the room</div>
            <div class="class-info">{{ eventName }}</div>
            <div class="host-info">Hosted by “{{ creator }}”</div>
          </div>
          <div class="dynamic-part" v-if="loggedOut">
            <div class="inputName">
              <p>Joining name</p>
              <input
                v-model="name"
                type="text"
                placeholder="e.g John G. Miguel"
              />
            </div>
            <button class="button" @click="joinRoom">Join</button>
            <div class="separator">
              <div class="line"></div>
              <div>or</div>
              <div class="line"></div>
            </div>
            <button class="sing-in">Sign in</button>
            <div class="text">
              Do not have an account?
              <p>Sign up</p>
            </div>
          </div>
          <div class="dynamic-part" v-else>
            <div class="inputName">
              <p>Joining name</p>
              <input
                type="text"
                v-model="name"
                placeholder="e.g John G. Miguel"
              />
            </div>
            <button class="button" @click="joinRoom">Join</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../axios';
export default {
  name: 'joiningPage',
  data() {
    return {
      loggedOut: false,
      name: '',
      roomId: this.$route.params.meeting_id,
      code: '',
      eventName: '',
      creator: '',
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.getUserDetails();
  },
  methods: {
    joinRoom() {
      this.$store
        .dispatch('studio/joinEvent', {
          name: this.name,
          email: '',
          password: '',
          public_meeting_id: this.roomId,
          avatar_url: '',
          isPublic: true,
        })
        .then((response) => {
          console.log('Join API response:', response.data);
          const roomUrl = response.data.room_url;
          window.location.href = roomUrl;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((error) => {
          console.error('Join API error:', error);
          this.$vs.notify({
            title: 'OOPS',
            text: error.response.data.message,
            color: 'danger',
          });
        });
    },
    async getUserDetails() {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev.home.video.wiki/api/event/meeting/info/?public_meeting_id=${this.roomId}`,
      };

      try {
        const response = await axios(config);
        const responseData = response.data;
        console.log('here are we', responseData);
        this.eventName = responseData.meeting_info.event_name;
        this.creator = responseData.meeting_info.event_creator_name;
        document.getElementById('loading-bg').style.display = 'none';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.full-container {
  background-color: #181a20;
  background-image: url('../assets/images/joiningPage/left.png'),
    url('../assets/images/joiningPage/right.png');
  background-position: left center, right top;
  background-size: 30% 70%, contain;
  background-repeat: no-repeat, no-repeat;
  height: 100vh;
  width: 100%;
  padding-left: 67px;
  padding-right: 67px;
  display: flex;
  flex-direction: column;
}
.logo {
  width: 91px;
  height: 91px;
  padding-top: 20px;
}

.left {
  width: 229px;
  height: 194px;
}
.left img {
  object-fit: cover;
}
.right {
  margin-left: 52px;
}
.join-text {
  color: #a6a6a8;
  font-weight: 600;
  font-size: 12px;
}
.class-info {
  color: #a6a6a8;
  font-weight: 500;
  font-size: 24px;
  margin-top: 20px;
}
.host-info {
  font-weight: 500;
  font-size: 16px;
  color: #647181;
  margin-top: 14px;
}
.dynamic-part {
  margin-top: 45px;
}
.inputName p {
  font-weight: 600;
  font-size: 12px;
  color: #637181;
  margin-bottom: 6px;
}
.inputName input {
  width: 319px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  padding-left: 14px;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.button {
  margin-top: 18px;
  width: 319px;
  height: 40px;
  background-color: #d7df23;
  border: 1px solid #31394e;
  cursor: pointer;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #181a20;
}
.separator {
  width: 319px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.line {
  border: 1px solid #31394e;
  width: 135px;
  height: 1px;
}
.sing-in {
  margin-top: 14px;
  width: 319px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1f272f;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.text {
  margin-top: 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text p {
  font-weight: 600;
  font-size: 13px;
  margin-left: 5px;
}
</style>
