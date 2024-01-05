<template>
  <div class="parent_work_cont">
    <Navbar />
    <div
      class="basic_parent_1 w-full flex flex-col justify-center items-center"
    >
      <div
        class="max-w-5xl w-full flex flex-col lg:flex-row justify-between items-center pb-10 lg:px-16 md:px-6 px-4 py-6"
      >
        <div
          class="basic_work_cont flex flex-col justify-start items-start gap-8"
        >
          <div class="text-5xl font-semibold">
            Don't just change jobs.<br />
            Change the nature of <br />
            work itself.
          </div>
          <div class="explore_btn p-3 rounded-sm font-bold cursor-pointer">
            EXPLORE OPPORTUNITIES
          </div>
        </div>

        <div
          class="basic_work_img flex flex-row items-center justify-end gap-4"
        >
          <div class="basic_img_1 max-w-xxs">
            <img
              src="@/assets/images/lady.svg"
              class="w-full h-full object-contain"
            />
          </div>
          <div
            class="basic_img_2 flex flex-col items-center justify-center gap-4 max-w-xxs"
          >
            <img
              src="@/assets/images/guy.svg"
              class="w-full h-full object-contain"
            />
            <img
              src="@/assets/images/glasses.svg"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="basic_parent_2 w-full flex flex-col justify-center items-center"
    >
      <div
        class="max-w-5xl w-full flex flex-col justify-between items-center lg:px-16 md:px-6 px-4 py-6"
      >
        <div
          class="human_text font-semibold text-center text-5xl max-w-lg mt-12"
        >
          Making work more human takes the right people.
        </div>
        <p
          class="human_para text-center mt-10 font-semibold max-w-xl leading-loose mb-12"
        >
          Welcome to Decast, where we believe that the heart of any successful
          endeavor lies in the people who make it happen. We're dedicated to
          revolutionizing the way we collaborate, connect, and create through
          our online meetings and events platform. But beyond our cutting-edge
          technology, we understand that the true essence of success lies in
          fostering a human-centric work environment.
          <br />
          Joining us isn't just about contributing to innovative solutions; it's
          about becoming part of a community that values individuals as much as
          their ideas. We're on a mission to transform the work experience,
          making it more personal, more engaging, and ultimately, more human.
          <br />
          At Decast, we seek individuals who share our passion for bridging
          distances, breaking barriers, and connecting people worldwide. Whether
          you're a tech wizard, a creative mind, or a customer-focused
          enthusiast, if you're driven by the desire to make a difference,
          you'll find a place among us.
        </p>
      </div>
    </div>
    <div
      class="basic_parent_3 w-full flex flex-col justify-center items-center"
    >
      <div
        class="max-w-5xl w-full flex flex-col justify-between items-center lg:px-16 md:px-6 px-4 py-6"
      >
        <div class="work_header font-semibold text-center text-5xl mt-10">
          Let's work together
        </div>
        <p class="text-center font-semibold max-w-md leading-loose">
          Current openings
        </p>
        <div
          class="work-cont mt-16 max-w-lg w-full flex flex-col gap-4 items-center justify-center"
        >
          <div
            v-for="(work, index) in works"
            :key="index"
            class="big-box-1 pb-4 mb-6 w-full text-left"
          >
            <div
              class="div-to-show flex flex-row justify-between items-center w-full text-left"
            >
              <p class="text-left font-semibold leading-loose">
                {{ work.question }}
              </p>
              <button
                class="open-work border-none outline-none cursor-pointer"
                @click="togglework(index)"
              >
                <img
                  v-if="activeIndex == index"
                  src="@/assets/images/open.png"
                />
                <img
                  v-if="activeIndex !== index"
                  src="@/assets/images/close.png"
                />
              </button>
            </div>
            <transition name="fade">
              <div class="div-to-hide mt-4 mb-4" v-if="activeIndex === index">
                <p class="text-left font-semibold leading-loose">
                  {{ work.answer }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <FootSec />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import FootSec from './FootSec.vue';
export default {
  nname: 'WorkWithUs',
  components: {
    Navbar,
    FootSec,
  },
  data() {
    return {
      activeIndex: null,
      works: [
        {
          question: 'Lead frontend developer',
          answer: 'We are coming soon with lots of opportunites.',
        },
        {
          question: 'Lead backend developer',
          answer: 'We are coming soon with lots of opportunites.',
        },
        {
          question: 'Lead fullstack developer',
          answer: 'We are coming soon with lots of opportunites.',
        },
        {
          question: 'Lead UI/UX designer',
          answer: 'We are coming soon with lots of opportunites.',
        },
      ],
    };
  },
  methods: {
    togglework(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.3s ease;
}
.parent_work_cont {
  background-image: linear-gradient(180deg, #000, #111);
}
.basic_work_cont > div:nth-child(1) {
  color: #a6a6a6;
}

.explore_btn {
  background: #d7df23;
  width: fit-content;
  color: #181a20;
  font-style: italic;
}

.basic_work_img {
  max-width: fit-content;
  /* border: 1px solid red; */
}

.basic_work_img div {
  max-width: fit-content;
}

.basic_parent_2 {
  background: #d7df23;
}

.human_text,
.human_para {
  color: #181a20;
}

.basic_parent_3 {
  color: #a6a6a6;
}

.big-box-1 {
  border-bottom: 1px solid #a6a6a6;
}

p {
  color: #a6a6a6;
}

.open-work {
  background: transparent;
}
</style>
