<template>
  <div class="container-full">
    <div class="nav-bar flex">
      <div class="leftPart">
        <div class="wiki-logo cursor-pointer" @click="homeRedirect">
          <img src="@/assets/images/logot.svg" />
        </div>
      </div>
      <div class="rightPart flex">
        <div class="search-bar flex">
          <input placeholder="Search" type="text" />
          <img src="@/assets/images/dashboard/Search.svg" />
        </div>
        <div class="wallet">
          <img src="@/assets/images/dashboard/Wallet.svg" />
        </div>
        <div class="setting">
          <div class="ppp" @click="toggleUserMenu">
            <img src="@/assets/images/dashboard/settings.svg" alt="settings" />
          </div>
          <div class="">
            <div v-if="accessToken || loggedIn">
              <div class="con-img ml-3" @click="toggleUserMenu">
                <div class="pfp">
                  <vs-avatar
                    :text="getFirstLetter(activeUserInfo.first_name)"
                    color="primary"
                    class="m-0 shadow-md"
                    :src="
                      activeUserInfo.profile_pic
                        ? activeUserInfo.profile_pic
                        : ''
                    "
                    size="40px"
                  />
                </div>
              </div>
              <div class="pop-up">
                <userMenu
                  :showMenu="userMenuVisible"
                  :closeMenu="toggleUserMenu"
                  @menu-closed="toggleUserMenu"
                />
              </div>
            </div>
            <button v-else class="butt cursor-pointer" @click="open">
              Login
            </button>
          </div>
          <!-- <img src="@/assets/images/dashboard/Setting.svg" /> -->
        </div>
      </div>
    </div>
    <div class="buttomPart">
      <div class="vertical-line sideOne one flex justify-items-start">
        <LeftPart />
      </div>

      <div
        class="scroll-container gap-x-2"
        :style="{ transform: `translateX(${offset}vw)` }"
      >
        <div class="middleOne vertical-line scroll">
          <Rooms />
        </div>
        <div class="sideOne last scroll">
          <RightPart />
        </div>
      </div>
      <div class="middleOne vertical-line no-scroll">
        <Rooms />
      </div>
      <div class="sideOne last no-scroll">
        <RightPart />
      </div>
    </div>
    <div class="close-container">
      <iframe :src="url" :class="{ iframe: iframe, hidden: !iframe }"></iframe>
      <!-- <button class="close-icon" @click="closeForm">✕</button> -->
    </div>
    <popups />
  </div>
</template>
<script>
import LeftPart from './components/LeftPart.vue';
import RightPart from './components/RightPart.vue';
import userMenu from './userMenu.vue';
import Rooms from './components/Room.vue';
import constants from '../../../constant';
import { utils } from '@/mixins/index';
import Popups from './Popups.vue';
import UserMenu from './userMenu.vue';

export default {
  mixins: [utils],
  name: 'FullDashBoard',
  components: {
    LeftPart,
    RightPart,
    Rooms,
    userMenu,
    Popups,
    UserMenu,
  },
  data() {
    return {
      offset: 0,
      url: constants.challengeUri,
      iframe: false,
      userMenuVisible: false,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    console.log(this.accessToken || this.loggedIn, 'prof');
    window.addEventListener('message', (event) => {
      if (event.data === 'closeIframe') {
        this.iframe = false;
        this.url = '';
        console.log(this.iframe);
      }
      if (event.data === 'navigateToSignUp') {
        document.getElementsByTagName('iframe')[0].style.height = '79%';
        document.getElementsByTagName('iframe')[0].style.width = '33%';
      }
      if (event.data === 'navigateToLogin') {
        document.getElementsByTagName('iframe')[0].style.height = '66.7%';
        document.getElementsByTagName('iframe')[0].style.width = '32%';
      }
      if (event.data === 'navigateToPassword') {
        document.getElementsByTagName('iframe')[0].style.height = '41.6%';
      }
      if (event.data === 'loginSuccess') {
        console.log(this.$store.state.auth.loggedIn, 'loggedIn');
        this.iframe = false;
        this.url = '';
      }
    });
  },
  methods: {
    scroll(offset) {
      this.offset = offset;
    },
    homeRedirect(){
      this.$router.push('/');
    },
    closeIframe() {
      var iframe = document.getElementById('myIframe');
      iframe.style.display = 'none';
    },
    open() {
      console.log('open');
      this.iframe = !this.iframe;
      this.url = constants.challengeUri;
      // this.url = 'http://localhost:8080/login';
      document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      document.getElementsByTagName('iframe')[0].style.width = '32%';
      console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
    toggleUserMenu() {
      console.log('Clicked');
      this.userMenuVisible = !this.userMenuVisible;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.container-full {
  background-color: #181a20;
  /* border: 1px solid red; */
  overflow-y: scroll;
  height: 100vh;
}

.container-full::-webkit-scrollbar {
  width: 3px;
}

.container-full::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.middleOne {
  width: 35%;
  padding: 0px 37px 0px 37px;
  /* border: 1px solid red; */
}

.iframe {
  position: absolute;
  border: 1px solid #31394e;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 66.5%;
  width: 32%;
  border-radius: 10px;
  z-index: 100;
  overflow: hidden;
}

.sideOne {
  width: 31%;
  /* border: 1px solid yellow; */
  padding-right: 27px;
}

.load {
  height: 100%;
  width: 100%;
}

.butt {
  background: #d7df23;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  color: #1f272f;
  font-weight: 700;
  font-size: 12px;
}

.nav-bar {
  padding: 20px 67px 0px 67px;
  align-items: center;
  justify-content: space-between;
}
.wiki-logo img {
  height: 91px;
  width: 91px;
}
.rightPart {
  align-items: center;
}
.search-bar {
  height: 40px;
  width: 197px;
  border: 1px solid #31394e;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 12px 10px;
}
.search-bar input {
  background-color: #181a20;
  border: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 14.03px;
}
.search-bar img {
  width: 16px;
  height: 16px;
  color: #7a7a7a;
}
.wallet {
  margin-left: 68px;
  width: 16px;
  height: 16px;
  color: #637181;
}
.setting {
  margin-left: 24px;
  color: #637181;
}
.buttomPart {
  height: 77vh !important;
  margin: auto;
  display: flex;
  margin: auto;
  /* border: 1px solid red; */
  width: 100%;
  margin-top: 20px;
}
.vertical-line {
  border-right: 1px solid #31394e;
}
@media (max-width: 499px) {
  .sideOne {
    width: 31%;
    /* border: 1px solid yellow; */
    padding-right: 24px;
  }
  .container-full {
    padding: 0;
    margin: 0;
  }
  .middleOne {
    width: 35%;
    padding: 0px 0px 0px 20px;
    margin-right: 10px;
    /* border: 1px solid white; */
    /* border: 1px solid red; */
  }
  .rightPart {
    display: flex;
  }
  .wiki-logo img {
    height: 68px;
    width: 68px;
  }
  .buttomPart {
    display: flex;
    flex-direction: column; /* Change to column layout */
    align-items: flex-start; /* Center items horizontally */
    justify-content: flex-start; /* Align items to the top */
    padding: 0; /* Remove padding for mobile view */
    margin: 0; /* Remove margin for mobile view */
    width: 100%;
    overflow: hidden !important;
    height: 85vh !important;
  }

  .one {
    margin-top: 40px;
    padding-left: 37px;
    padding-right: 40%;
    width: min-content;
  }

  .sideOne,
  .middleOne {
    width: 100%; /* Make sure components take full width */
    flex-shrink: 1; /* Distribute available space equally among them */
    justify-content: flex-start;
    height: 220px;
    /* border: 1px solid blue; */
    margin-top: 0px;
  }

  .nav-bar {
    padding: 0;
    align-items: center;
    justify-content: space-between;
  }

  .search-bar {
    height: 16px;
    width: 16px;
    border: 0;
  }
  .search-bar input {
    display: none; /* Hide the input element */
  }
  .search-bar,
  .wallet,
  .ppp {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 10px;
  }

  .pfp {
    display: none;
    width: 0;
  }

  .ppp {
    margin-left: 0px;
    margin-right: 20px;
  }
  .wallet {
    margin-right: 0px;
  }
  .vertical-line {
    border-right: none;
    /* border: 1px solid white; */
  }
  .no-scroll {
    display: none;
  }
  .scroll-container {
    width: 100%; /* Twice the width of the viewport */
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 10px;
    max-height: 600px;
    height: 100%;
    transition: transform 0.3s ease-in-out; /* Smooth transition */
    /* flex-direction: column; */
  }
  .scroll {
    width: 90vw; /* Half the width of the viewport */
    height: auto;
    /* border: 1px solid green; */
    /* max-height: 500px; */
  }
  .pop-up {
    top: 0;
    left: 0;
    z-index: 999;
  }
}

@media (min-width: 500px) {
  .ppp {
    display: none;
    width: 0;
  }
  .scroll-container {
    display: none;
  }
}
</style>
