<template>
  <div class="dashboard-container mx-auto">
    <div class="picture">
      <vs-avatar
        :text="getFirstLetter"
        color="primary"
        class="m-0 shadow-md"
        :src="activeUserInfo.profile_pic ? activeUserInfo.profile_pic : ''"
        size="67px"
      />
    </div>
    <div class="left-container flex justify-items-center flex-col">
      <div class="welcome-text">
        <div class="text">
          Welcome
          <span>{{ getFirstname }}</span
          >!
        </div>
        <div class="text">What are we starting today?</div>
      </div>
      <div class="bottom-date">
        <p>Today: {{ formattedDate }}</p>
      </div>
      <div class="box">
        <div class="first-row flex">
          <div class="maintext">User’s Main Room</div>
          <img src="@/assets/images/dashboard/dots.svg" />
        </div>
        <div class="desc-text">Something here</div>
        <div class="button-full">
          <FullLengthButton :buttonName="forRoom" :click="start" />
        </div>
      </div>
      <div class="box">
        <div class="first-row flex">
          <div class="maintext">Cast</div>
          <img src="@/assets/images/dashboard/dots.svg" />
        </div>
        <div class="desc-text">
          Start a cast now or schedule one for the future
        </div>
        <div class="button-full">
          <FullLengthButton :buttonName="forCast" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FullLengthButton from './Buttons/fullLengthButton.vue';
export default {
  name: 'DashBoardLeftPart',
  components: {
    FullLengthButton,
  },
  data() {
    return {
      forRoom: 'Start Session',
      forCast: 'Create a Cast',
      formattedDate: '',
    };
  },
  computed: {
    room() {
      return this.$store.state.room.room;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    getFirstname(){
      return this.activeUserInfo.first_name;
    },
    getFirstLetter() {
      return this.activeUserInfo.first_name[0];
    },
  },
  mounted() {
    this.created();
  },
  methods: {
    start() {
      let id = this.room.room_url.split('/');
      id = id[id.length - 1];
      this.$store
        .dispatch('room/start', id)
        .then((res) => {
          console.log(res.data);
          window.location.href = res.data.room_url;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    created() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);
  },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.dashboard-container {
  font-family: 'Karla', sans-serif;
  /* border: 1px solid red; */
  width: auto;
  max-width: 450px;
}

.text {
  font-style: italic;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
}
.box {
  padding: 12px;
  margin-top: 40px;
  width: 239px;
  height: 143px;
  border-radius: 6px;
  border: 1px solid #31394e;
  background-color: #181a20;
}
.first-row {
  font-weight: 500;
  font-size: 16px;
  color: #a6a6a8;
  justify-content: space-between;
}
.first-row img {
  width: 4px;
  height: 16px;
}
.desc-text {
  margin-top: 12px;
  font-weight: 400;
  font-size: 11px;
  color: #a6a6a8;
}
.button-full {
  margin-top: 12px;
}

@media (max-width: 499px){
  .dashboard-container {
    align-items: flex-start; /* Align to start for mobile view */
  }
  .box {
    display: none;
  }
  .text {
    font-size: 16px;
    font-weight: 400;
  }
  .bottom-date {
    margin-top: 15px;
    margin-bottom: 6px;
  }
  .welcome-text {
    margin-top: 15px;
  }
}

@media (min-width: 500px) {
  .picture {
    display: none;
    height: 67px;
    width: 67px;
  }

  .bottom-date {
    display: none;
    font-weight: 500;
    size: 13px;
    padding: 104px;
  }
}
</style>
