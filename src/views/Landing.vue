<template>
  <div id="knowledge-base-page" class="">
    <!-- JUMBOTRON -->
    <div class="backgroundimg bccolor w-full pt-20 lg:block flex flex-wrap">
      <div class="section flex flex-wrap">
        <div class="lg:w-1/2 w-full lg:text-left text-center">
          <h6 class="lg:text-2xl text-xl mb-10 goaltext">
            {{ $t('Welcome to Videowiki') }}
          </h6>
          <h1 class="lg:text-7xl font-extrabold mb-8 mt-2 text-5xl goaltext">
            {{ $t('Landing.Welcome.title') }}
          </h1>
          <h4 class="lg:text-2xl text-xl mb-10 goaltext">
            {{ $t('Landing.Welcome.info1') }}
            {{ $t('Landing.Welcome.info2') }}
          </h4>
          <div class="lg:text-left text-center">
            <vs-button
              type="filled"
              class="bg-custom-purple text-base font-bold mr-1 changeatmob"
              @click="openModal"
            >
              {{ $t('Landing.Welcome.button1') }}</vs-button
            >
            <vs-button
              type="filled"
              class="bg-custom-purple text-base font-bold changeatmob"
              @click="$router.push('/events')"
            >
              {{ $t('Landing.Welcome.button') }}</vs-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- JUMBOTRON /-->

    <!--ABOUT US-->

    <div class="section flex flex-wrap md:justify-between">
      <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:block">
        <img src="@/assets/images/landing-page/Frame2new.svg" />
      </div>
      <div class="lg:w-1/2 lg:mx-auto w-full text-left">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="text-4xl font-extrabold mb-8 lg:text-left text-center">
            {{ $t('Landing.About.title') }}
          </h1>
          <div class="text-base font-medium mb-10">
            <h5>{{ $t('Landing.About.info1') }}</h5>
            <br /><br />
            <h5>{{ $t('Landing.About.info2') }}</h5>
            <br />
            <h5>
              {{ $t('Landing.About.info3') }}
              <span class="font-bold">{{ $t('Landing.About.info4') }}</span>
            </h5>
            <br />
            <ul id="ulli">
              <span class="ull">{{ $t('Landing.About.info5') }}</span>
              <li>{{ $t('Landing.About.info6') }}</li>
              <li>{{ $t('Landing.About.info7') }}</li>
              <li>{{ $t('Landing.About.info8') }}</li>
            </ul>
          </div>
          <br />
          <br />
          <div class="text-center lg:text-left">
            <vs-button
              type="filled"
              class="bg-custom-purple text-base font-bold"
              @click="$router.push('/createEvent')"
              >Create Event</vs-button
            >
          </div>
        </div>
      </div>
    </div>

    <!--ABOUT US /-->

    <vs-divider class="m-0" />

    <!-- PROJECT GOALS -->
    <div class="section flex bg-black">
      <div class="lg:w-1/2 w-full">
        <h1
          class="font-extrabold text-4xl mb-6 lg:text-left text-center goaltext"
        >
          {{ $t('Landing.Project.title1') }}<br class="hidden lg:block" />
          {{ $t('Landing.Project.title2') }}
        </h1>
        &nbsp; &nbsp;
        <h4 class="font-medium mb-10 text-left goaltext">
          {{ $t('Landing.Project.info') }}
        </h4>
        <h4 class="font-medium mb-10 text-left goaltext">
          {{ $t('Landing.Project.info2') }}
        </h4>
        <div class="lg:text-left text-center"></div>
      </div>
      <div class="lg:w-1/3 hidden md:hidden sm:hidden lg:block mx-auto">
        <img src="@/assets/images/landing-page/embedsocial-integrations.svg" />
      </div>
    </div>
    <!-- PROJECT GOALS /-->

    <!-- MISSION -->
    <div class="section flex flex-wrap md:justify-between bg-white">
      <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:block">
        <img src="@/assets/images/landing-page/analyze.svg" />
      </div>
      <div class="lg:w-1/2 lg:mx-auto w-full text-left">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="text-4xl font-extrabold mb-8 lg:text-left text-center">
            {{ $t('Landing.Mission.title') }}
          </h1>
          <div class="text-base font-medium mb-10">
            <h1>{{ $t('Landing.Mission.info1') }}</h1>
            <br /><br />
            <h5>{{ $t('Landing.Mission.info2') }}</h5>
            <br />
            <h5>{{ $t('Landing.Mission.info3') }}</h5>
            <span class="font-bold">{{ $t('Landing.Mission.info4') }}</span>
          </div>
          <br /><br />
          <div class="text-center lg:text-left">
            <vs-button
              type="filled"
              class="bg-custom-purple text-base font-bold"
              @click="$router.push('/createEvent')"
              >Create Event</vs-button
            >
          </div>
        </div>
      </div>
    </div>
    <!--NEWSLETTER-->
    <div class="section">
      <NewsLetter />
    </div>
    <!--NEWSLETTER/-->

    <footer>
      <div class="blackcolor">
        <TheFooter />
      </div>
    </footer>

    <!-- One Click PopUP -->
    <!--
    <vs-popup ref="one_Click_Modal" :active.sync="showOneClickModal">
         <div class="p-5 m-5">
        <div class="p-5 oneClick">
          <div >
            <h4>Create an instant cast</h4>
          </div>
          <div class="form-group">
            <vs-input
              type="text"
              v-model="castName"
              label="Cast Name"
              class="flex-1 mr-5 form-group w-full my-4"
              placeholder="Cast Name"
            />
          </div>
          <div>
            <vs-input
              type="text"
              v-model="name"
              label="Name"
              class="flex-1 mr-5 form-group w-full my-4"
              placeholder="Your Name"
            />
          </div>
          <vs-button
            type="filled"
            class="font-semibold mt-3"
            @click="createInstantCast"
            >Create Cast</vs-button
          >
        </div>
      </div> 
      vs-divider / 
      </vs-popup ref="one_Click_Modal" :active.sync="showOneClickModal">-->
    <!-- Worked Here -->
    <div class="w-screen">
      <div class="text-center content-center">
        <a href="" class="hide link" target="_blank" ref="link">dsa</a>
        <vs-popup ref="one_Click_Modal" :active.sync="showOneClickModal">
          <div class="m-5 mr-0 mb-2 justify-self-center self-center">
            <h1
              class="text-4xl space-y-5 font-bold subpixel-antialiased tracking-wide text-center"
            >
              Create an Instant Cast
            </h1>

            <h5 class="m-5 text-center mt-7">
              Now <strong class="font-bold">Create Cast</strong> in just one Tap
              🤳🏻
            </h5>

            <div class="Forms_groups mr-4 -ml-3">
              <!-- Email -->
              <h3 class="_input_ flex-auto mb-1 mt-6 ml-4 mr-4 text-xl">
                Cast Name
              </h3>
              <div>
                <vs-input
                  type="text"
                  v-model="castName"
                  placeholder="Enter Email"
                  class="__input_ ml-auto mr-auto mb-1 w-9/12 font-semibold mt-3"
                />
              </div>
              <!-- Password -->

              <h3 class="_input_ flex-auto mb-1 mt-6 ml-4 mr-4 text-xl">
                Name
              </h3>
              <div>
                <vs-input
                  placeholder="Enter Password"
                  type="text"
                  v-model="name"
                  class="_input_ ml-auto mr-auto mb-6 w-9/12 font-semibold mt-3"
                />
              </div>
            </div>
            <div class="text-center">
              <vs-button
                @click="createInstantCast"
                type="filled"
                class="w-9/12 font-semibold mt-3 mr-6"
                >Create Cast</vs-button
              >
            </div>
          </div>
          <p class="hr-lines">or</p>
          <p class="text-center mt-6 cursor-default">
            want to drop <strong>NFT</strong> via cast<strong
              ><span
                @click="$router.push('/createEvent')"
                class="cursor-pointer text-blue-900"
              >
                click here</span
              ></strong
            >
          </p>
        </vs-popup>
      </div>
    </div>
    <!-- Invite Links Popup -->
  </div>
</template>

// "Template Ends Here"

<script>
import NewsLetter from './components/NewsLetter';
import moment from 'moment';

export default {
  data() {
    return {
      showOneClickModal: false,
      disableHost: false,
      disableParticipant: false,
      castName: '',
      name: '',
      demoVideoUrl: '',
      expand: Function,
      list: this.$t('Landing.List'),
      list1: [
        {
          title: this.$t('Landing.List1[0]'),
          url: '/integration/ocean-protocol',
        },
        {
          title: this.$t('Landing.List1[1]'),
          url: '/integration/ms-teams',
        },
        {
          title: this.$t('Landing.List1[2]'),
          url: '#',
        },
      ],
      list2: [],
      list3: this.$t('Landing.List3'),
      list4: this.$t('Landing.List4'),
      list5: this.$t('Landing.List5'),
      list6: [
        {
          title: this.$t('Landing.List6.item1.title'),
          description: this.$t('Landing.List6.item1.description'),
          closed: true,
        },
        {
          title: this.$t('Landing.List6.item2.title'),
          description: this.$t('Landing.List6.item2.description'),
          closed: true,
        },
        {
          title: this.$t('Landing.List6.item3.title'),
          description: this.$t('Landing.List6.item3.description'),
          closed: true,
        },
        {
          title: this.$t('Landing.List6.item4.title'),
          description: this.$t('Landing.List6.item4.description'),
          closed: true,
        },
        {
          title: this.$t('Landing.List6.item5.title'),
          description: this.$t('Landing.List6.item5.description'),
          closed: true,
        },
        {
          title: this.$t('Landing.List6.item6.title'),
          description: this.$t('Landing.List6.item6.description'),
          closed: true,
        },
      ],
      steps: this.$t('Landing.Steps'),
    };
  },
  components: {
    NewsLetter,
  },

  mounted() {
    this.$refs.one_Click_Modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.one_Click_Modal.$el.childNodes[1].style.width = '500px';
    // if (this.$cookies.get('userId') && this.$cookies.get('Token')) {
    //   this.$store.commit('auth/SET_BEARER', this.$cookies.get('Token'));
    //   axios
    //     .get('https://api.video.wiki/api/users/' + this.$cookies.get('userId'))
    //     .then((res) => {
    //       this.$store.commit('UPDATE_USER_INFO', res.data, { root: true });
    //     });
    // } else {
    //   // localStorage.clear();
    //   alert();
    //   null;
    // }
    this.expand = (idx) => this.isClosed(idx);
    this.demoVideoUrl =
      'https://dapi.videowiki.pt/media/temporary/2021/03/03/demo.mp4';
  },
  methods: {
    async openModal() {
      if (this.$store.state.auth.castID !== '') {
        this.$store
          .dispatch('auth/eventDetail', this.$store.state.auth.castID)
          .then(async (response) => {
            const responseVal = await response.data.meeting_info;
            if (responseVal.running) {
              this.$vs.notify({
                title: 'A cast is running',
                text: "Can't run two cast at the same time",
                color: 'danger',
              });
            } else {
              this.showOneClickModal = true;
              if (this.$store.state.auth.isUserLoggedIn()) {
                this.name = this.$store.state.AppActiveUser.username;
              } else {
                this.name = 'Guest ' + Math.floor(Math.random() * 1001);
              }

              this.castName =
                'VideoWiki Cast ' + Math.floor(Math.random() * 1001);
            }
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
      } else {
        this.showOneClickModal = true;
        if (this.$store.state.auth.isUserLoggedIn()) {
          this.name = this.$store.state.AppActiveUser.username;
        } else {
          this.name = 'Guest ' + Math.floor(Math.random() * 1001);
        }

        this.castName = 'VideoWiki Cast ' + Math.floor(Math.random() * 1001);
      }
    },
    copyCohost(e) {
      if (this.disableHost) {
        return;
      }
      this.disableHost = true;
      setTimeout(() => {
        this.disableHost = false;
      }, 2000);
      navigator.clipboard.writeText(this.coHostUrl);
      e.target.style.color = 'green';
      setTimeout(() => {
        e.target.style.color = 'black';
      }, 1000);
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
    createInstantCast() {
      const payload = {
        castName: this.castName,
        name: this.name,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        time: moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log('1');

      this.$store
        .dispatch('studio/createInstantCast', payload)
        .then((res) => {
          console.log('2');
          // Work Here
          localStorage.setItem('Instant_cast', JSON.stringify(res.data));
          console.log(3);
          localStorage.setItem('open', 'false');
          console.log(4);
          this.$vs.notify({
            time: 3000,
            title: 'Success',
            text: 'Redirecting',
            color: 'success',
          });
          console.log(5);

          this.$store.dispatch('auth/addURLS', res.data);
          console.log(6);
          this.coHostUrl = res.data['co-host_url'][0];
          console.log(7);
          this.participantUrl = res.data.participant_url[0];
          console.log(8);
          this.showOneClickModal = false;

          // window.open(res.data.creator_url, '_blank');
          this.$refs.link.setAttribute('href', '/'); //  "/ <- homepage " , delete res.data.creator and put this is on any other page
          console.log(this.$refs.link);

          this.$refs.link.click();
          console.log(11);
          setTimeout(() => {
            location.replace(res.data.creator_url[0]);
          }, 1000);
          console.log(12);

          // worked Here
        })
        .catch((e) => {
          if (e.response.data.message) {
            this.$vs.notify({
              time: 3000,
              title: 'Error',
              text: e.response.data.message,
              color: 'danger',
            });
          }
        });
    },
    isClosed(idx) {
      if (this.$refs[`collapse_${idx}`][0].maxHeight === '0px') return true;
      return false;
    },
    getStepIcon(index) {
      return require(`../assets/images/landing-page/step${index + 1}.png`);
    },
  },
  beforeDestroy() {
    if (this.$refs.vsCollapse) {
      for (const collapseItem of this.$refs.vsCollapse.$children) {
        window.removeEventListener('resize', collapseItem.changeHeight);
      }
    }
    document.querySelectorAll('body > div.vs-component').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('body > div.vs-content-sidebar').forEach((el) => {
      el.remove();
    });
  },
};
</script>

<style scoped>
p {
  color: #544837 !important;
}

.oneClick {
  display: flex;
  flex-direction: column;
}

.hr-lines {
  position: relative;
  max-width: 50%;
  margin: 2% auto;
  text-align: center;
  cursor: default;
}

.hr-lines:before {
  content: '';
  height: 2%;
  width: 40%;
  background: grey;
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
}

.hr-lines:after {
  content: '';
  height: 2%;
  width: 40%;
  background: grey;
  display: block;
  top: 50%;
  position: absolute;
  right: 0;
}
.no-border {
  border-bottom: none;
}
.section {
  padding: 8%;
}

.link {
  position: absolute;
  top: 50%;
  left: 50%;
  color: red;
}

.hide {
  display: none;
}

.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.timeline-icon {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
.goaltext {
  color: white;
}
.blackcolor {
  background: black;
}
.bccolor {
  background: rgb(115, 103, 240);
  background-image: './assets/images/landing-page/Frame1.png';
}
.backgroundimg {
  background-image: url(../assets/images/landing-page/Framenew.svg);
}
@media only screen and (min-width: 768px) {
  .timeline::before {
    content: '';
    position: absolute;
    height: 85.5%;
    width: 1px;
    border-right: 0.5px dashed rgba(230, 73, 128, 0.7);
    left: 50%;
    transform: translateX(-50%);
  }
}
@media only screen and (max-width: 768px) {
  .changeatmob {
    margin-bottom: 2em;
    width: 220px;
  }
}
img {
  height: 100%;
}
#ulli {
  font-size: 1.2em;
  margin-left: 21px;
  list-style-image: url('../assets/images/landing-page/check.svg');
  color: black;
}
.ull {
  margin-left: -21px;
}

.vs-inputx {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
}
._input_ {
  flex-direction: column;
  width: 75%;
  justify-content: center;
  align-content: center;
  align-self: center;
  align-content: center;
}
.Forms_groups {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  align-self: center;
  align-content: center;
}
</style>

<style>
.con-vs-popup .vs-popup {
  min-width: calc(100% - 60%) !important;
  min-height: calc(100% - 90%) !important;
}
</style>
