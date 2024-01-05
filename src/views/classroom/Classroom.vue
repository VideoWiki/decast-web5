<template>
  <div>
    <div class="section bg-white">
      <div class="lg:w-full text-center">
        <h1 class="lg:text-6xl font-extrabold mb-8">
          {{ $t('Classroom.Engage.engage') }}
        </h1>
        <p class="text-2xl font-medium mb-10 text-custom-black">
          {{ $t('Classroom.Engage.collaboration1') }}<br />
          {{ $t('Classroom.Engage.collaboration2') }}
        </p>
        <vs-button
          type="filled"
          class="bg-custom-purple text-base font-bold"
          @click="checkLoginStatus"
          >{{ $t('Classroom.Engage.start') }}</vs-button
        >
      </div>
      <div class="lg:w-full hidden lg:flex justify-center">
        <img src="@/assets/images/pages/classroom1.svg" />
      </div>
    </div>
    <vs-popup ref="custom_modal" :active.sync="startClassModal">
      <div>
        <h1 class="lg:text-4xl font-extrabold mb-base">
          {{ $t('Classroom.Create.create') }}
        </h1>

        <vs-input
          class="w-full"
          size="large"
          :placeholder="$t('Classroom.Create.room_p')"
          v-model="classroomName"
        />
        <div class="flex justify-between items-center mt-4 mb-8">
          <div class="flex items-start -mx-4">
            <vs-icon icon="lock" size="24px" color="primary" class="px-4" />
            <div class="px-4">
              <span class="font-semibold text-custom-black text-xl">{{
                $t('Classroom.Create.locked')
              }}</span>
              <p class="font-medium text-custom-black">
                {{ $t('Classroom.Create.guest') }}
              </p>
            </div>
          </div>
          <vs-switch color="success" v-model="isLocked" />
        </div>
        <vs-button
          type="filled"
          size="large"
          class="bg-custom-purple text-base font-bold w-full"
          target="_blank"
          :href="getClassroomLink"
          @click="startClassModal = false"
          >{{ $t('Classroom.Create.create_b') }}</vs-button
        >
      </div>
    </vs-popup>
    <!----------->
    <div class="section flex">
      <div class="lg:w-1/2 w-full">
        <h1 class="font-extrabold lg:text-4xl mb-6 lg:text-left text-center">
          {{ $t('Classroom.Conference.title1') }} <br class="hidden lg:block" />
          {{ $t('Classroom.Conference.title2') }}
        </h1>
        <p class="font-medium mb-10 lg:w-3/4">
          {{ $t('Classroom.Conference.info') }}
        </p>
        <div class="lg:text-left text-center">
          <vs-button
            type="filled"
            class="bg-custom-purple font-bold"
            @click="$router.push('/vc')"
            >{{ $t('Classroom.Conference.learn') }}</vs-button
          >
        </div>
      </div>
      <div class="lg:w-1/2 hidden lg:flex justify-center">
        <img src="@/assets/images/pages/classroom2.svg" />
      </div>
    </div>
    <!---------->
    <div class="section bg-white text-center">
      <h1 class="font-extrabold text-4xl mb-8">
        {{ $t('Classroom.Service.service') }}
      </h1>
      <div class="vx-row mt-8 sm:-mx-6">
        <div
          class="vx-col w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3 sm:px-6"
        >
          <vx-card style="height: 100%">
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/compass1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">
                {{ $t('Classroom.Service.browser.title') }}
              </h5>
              <p>
                {{ $t('Classroom.Service.browser.info') }}
              </p>
            </div>
          </vx-card>
        </div>

        <div
          class="vx-col w-full sm:w-2/3 mb-base md:w-1/3 lg:w-1/3 mx-auto sm:px-6"
        >
          <vx-card style="height: 100%">
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/chat1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">
                {{ $t('Classroom.Service.not.title') }}
              </h5>
              <p>
                {{ $t('Classroom.Service.not.info') }}
              </p>
            </div>
          </vx-card>
        </div>
        <div
          class="vx-col w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3 sm:px-6"
        >
          <vx-card>
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/group-chat1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">
                {{ $t('Classroom.Service.free.title') }}
              </h5>
              <p>
                {{ $t('Classroom.Service.free.info') }}
              </p>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <!-------------------->
    <div class="section">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          {{ $t('Classroom.Different.title') }}
        </h1>
        <p class="font-medium lg:w-3/5 mx-auto">
          {{ $t('Classroom.Different.info') }}
        </p>
      </div>
      <Reviews :users="userList" />
    </div>
    <!-------------------->
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          {{ $t('Classroom.FQ.title') }}
        </h1>
        <div class="text-left">
          <vs-collapse accordion type="margin" ref="vsCollapse">
            <vs-collapse-item
              :ref="`collapse_1`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(1) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(1),
                    'text-black': expand(1),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(1),
                    'text-black': expand(1),
                  }"
                  >{{ $t('Classroom.FQ.1.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  {{ $t('Classroom.FQ.1.ans.start') }}
                </p>
                <ol class="ml-4">
                  <li class="mb-base">
                    <b>{{ $t('Classroom.FQ.1.ans.point1_h') }} :</b>
                    {{ $t('Classroom.FQ.1.ans.point1_p') }}
                  </li>
                  <li class="mb-base">
                    <b>{{ $t('Classroom.FQ.1.ans.point2_h') }} :</b>
                    {{ $t('Classroom.FQ.1.ans.point2_p') }}
                  </li>
                  <li>
                    <b>{{ $t('Classroom.FQ.1.ans.point3_h') }} :</b>
                    {{ $t('Classroom.FQ.1.ans.point3_p') }}
                  </li>
                </ol>
              </div>
            </vs-collapse-item>
            <vs-collapse-item
              :ref="`collapse_2`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(2) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(2),
                    'text-black': expand(2),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(2),
                    'text-black': expand(2),
                  }"
                  >{{ $t('Classroom.FQ.2.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  {{ $t('Classroom.FQ.2.ans.start') }}
                </p>
                <ol class="ml-4">
                  <li>
                    <b>{{ $t('Classroom.FQ.2.ans.point1_h') }} :</b>
                    {{ $t('Classroom.FQ.2.ans.point1_p') }}
                  </li>
                </ol>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_3`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(3) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(3),
                    'text-black': expand(3),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(3),
                    'text-black': expand(3),
                  }"
                  >{{ $t('Classroom.FQ.3.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  {{ $t('Classroom.FQ.3.ans.start1') }}
                </p>
                <p class="mb-base">{{ $t('Classroom.FQ.3.ans.start2') }}:</p>
                <ol class="ml-4" style="list-style-type: decimal">
                  <li>
                    {{ $t('Classroom.FQ.3.ans.point1') }}
                  </li>
                  <li>
                    {{ $t('Classroom.FQ.3.ans.point2') }}
                  </li>
                  <li>
                    {{ $t('Classroom.FQ.3.ans.point3') }}
                  </li>
                  <li>
                    {{ $t('Classroom.FQ.3.ans.point4') }}
                  </li>
                  <li>
                    {{ $t('Classroom.FQ.3.ans.point5') }}
                  </li>
                </ol>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_4`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(4) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(4),
                    'text-black': expand(4),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(4),
                    'text-black': expand(4),
                  }"
                  >{{ $t('Classroom.FQ.4.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">
                  <i
                    ><b>{{ $t('Classroom.FQ.4.ans.quote') }}</b> -{{
                      $t('Classroom.FQ.4.ans.writer')
                    }}</i
                  >
                </p>
                <p class="mb-6">
                  {{ $t('Classroom.FQ.4.ans.para') }}
                </p>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_5`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(5) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(5),
                    'text-black': expand(5),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(5),
                    'text-black': expand(5),
                  }"
                  >{{ $t('Classroom.FQ.5.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">
                  {{ $t('Classroom.FQ.5.ans.short') }}
                  <b>{{ $t('Classroom.FQ.5.ans.no') }}</b>
                </p>
                <p class="mb-base">
                  {{ $t('Classroom.FQ.5.ans.para1') }}
                </p>
                <p class="mb-base">
                  {{ $t('Classroom.FQ.5.ans.so') }}
                  <b>{{ $t('Classroom.FQ.5.ans.can') }}</b>
                </p>
                <p>
                  <b>{{ $t('Classroom.FQ.5.ans.yes') }}</b>
                  {{ $t('Classroom.FQ.5.ans.para2') }}
                </p>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_6`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(6) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(6),
                    'text-black': expand(6),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(6),
                    'text-black': expand(6),
                  }"
                  >{{ $t('Classroom.FQ.6.q') }}</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">
                  {{ $t('Classroom.FQ.6.ans.para1') }}
                  <b>{{ $t('Classroom.FQ.6.ans.private') }}</b>
                  {{ $t('Classroom.FQ.6.ans.para2') }}
                </p>
                <p>
                  {{ $t('Classroom.FQ.6.ans.para3') }}
                </p>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </div>
    </div>
    <!------------------->
    <div class="section">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          {{ $t('Classroom.Simple.title') }}
        </h1>
        <vs-button
          type="filled"
          to="/studio"
          class="bg-custom-purple text-base font-bold mt-8"
          >{{ $t('Classroom.Simple.info') }}</vs-button
        >
      </div>
    </div>
    <!------------------------->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Reviews from './components/Reviews';
import VxCard from '../../components/vx-card/VxCard.vue';
export default {
  name: 'Classoom',
  components: {
    VxCard,
    Reviews,
  },
  data() {
    return {
      expand: Function,
      startClassModal: false,
      isLocked: false,
      classroomName: '',
      userList: [
        {
          name: this.$t('Classroom.userList[0].name'),
          desc: this.$t('Classroom.userList[0].desc'),
          review: this.$t('Classroom.userList[0].review'),
        },
        {
          name: this.$t('Classroom.userList[1].name'),
          desc: this.$t('Classroom.userList[1].desc'),
          review: this.$t('Classroom.userList[1].review'),
        },
        {
          name: this.$t('Classroom.userList[2].name'),
          desc: this.$t('Classroom.userList[2].desc'),
          review: this.$t('Classroom.userList[2].review'),
        },
        {
          name: this.$t('Classroom.userList[3].name'),
          desc: this.$t('Classroom.userList[3].desc'),
          review: this.$t('Classroom.userList[3].review'),
        },
      ],
      faqList: [
        {
          title: 'Why Videowiki.pt',
          description: `VideoWiki is created with Efficient E-Learning in mind. It not only overcomes the lacking of other E-Learning platforms but offers even more features. Let's discuss how.
          
          Collaborative contribution: Every tutorial becomes outdated after a point of time and requires amendments at regular intervals. In most platforms, this becomes the sole responsibility of the creator. VideoWiki enables and encourages collaborative effort in making e-learning modules. Everyone can fork and contribute to an existing module ensuring the contents are up to date and VideoWiki’s versioning system manages that each fork is managed properly. At the same time, every contributor is rewarded with Crypto Coins.
          
          Feedback and Response System: VideoWiki provides the opportunity of conducting virtual classes where students get the opportunity to interact directly with the teachers and discuss the topic at hand. This enables the teachers to get feedback and clear any confusion regarding the discussed curriculum.`,
          closed: true,
        },
        {
          title: `What's new in VideoWiki.pt`,
          description: 'Add sharing, feedback and communication options.',
          closed: true,
        },
        {
          title: 'Creating content using VideoWiki.pt',
          description:
            'Adding gamification capabilities with new sensors for advances sciences',
          closed: true,
        },
        {
          title: 'Earning from VideoWiki.pt',
          description:
            'Bring the global learning at a relatively more standarized norm',
          closed: true,
        },
        {
          title: 'Is cryptocurrency any different from real money?',
          description:
            'Reduce global inequalities on access to education and qualification gaps.',
          closed: true,
        },
        {
          title: 'Do I have to pay for the course?',
          description:
            'One world education and immersive with equal opportunities for all.',
          closed: true,
        },
      ],
    };
  },
  mounted() {
    this.expand = (idx) => this.isClosed(idx);
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '620px';
    this.$refs.custom_modal.$el.childNodes[1].style.borderRadius = '20px';
    this.$refs.custom_modal.$el.childNodes[1].childNodes[1].style.padding =
      '3rem';
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    getClassroomLink() {
      return `https://room.video.wiki/b/start_class?name=${this.userInfo.first_name}&email=${this.userInfo.email}`; // &room_name=${this.classroomName}`;
    },
    userInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    isClosed(idx) {
      if (this.$refs[`collapse_${idx}`].maxHeight === '0px') return true;
      return false;
    },
    checkLoginStatus() {
      if (this.isUserLoggedIn()) {
        window.open(this.getClassroomLink, '_blank');
      } else this.$store.commit('TOGGLE_LOGIN_POPUP', true);
    },
  },
  beforeDestroy() {
    if (this.$refs.vsCollapse) {
      for (const collapseItem of this.$refs.vsCollapse.$children) {
        window.removeEventListener('resize', collapseItem.changeHeight);
      }
    }
  },
};
</script>

<style scoped>
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.collapse-item-border {
  border-radius: 0;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.section {
  padding: 8%;
}
img {
  height: 100%;
}
ol {
  list-style-type: disc;
}
</style>
