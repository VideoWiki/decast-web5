<template>
  <div class="parent-1">
    <Navbar />
    <div class="head-cont">
      <h1>Frequently asked questions</h1>
      <p>Have questions? We're here to help.</p>
    </div>

    <div class="faq-cont">
      <div v-for="(faq, index) in faqs" :key="index" class="big-box-1 max-w-5xl w-full">
        <div class="div-to-show">
          <h1>{{ faq.question }}</h1>
          <button class="open-faq" @click="toggleFAQ(index)">
            <img v-if="activeIndex == index" src="@/assets/images/open.png" />
            <img v-if="activeIndex !== index" src="@/assets/images/close.png" />
          </button>
        </div>
        <transition name="fade">
          <div class="div-to-hide" v-if="activeIndex === index">
            <p>{{ faq.answer }}</p>
          </div>
        </transition>
      </div>
    </div>
    <FootSec />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import FootSec from './FootSec.vue';
export default {
  components: {
    Navbar,
    FootSec,
  },
  data() {
    return {
      activeIndex: null,
      faqs: [
        {
          question: 'Is there a free trial available?',
          answer: 'Yes we provide free trial plans as well.',
        },
        {
          question: 'Can I change my plan later?',
          answer: 'Yes you can change your plan later.',
        },
        {
          question: 'Can I reschedule a cast?',
          answer: 'Yes you can rescedule your cast for later.',
        },
        {
          question: 'Can I see the cast or room recordings?',
          answer:
            'Yes you can record the room and cast and see there recordings anytime you want.',
        },
        {
          question: 'Can I directly send inviations for joining a cast?',
          answer:
            'Yes we provide e-mail facility for that. you can mention the email address of the person you would like to invite under invite attendees.',
        },
        {
          question: 'Can I change the name or description of my cast',
          answer: 'Yes you can update every cast detail under edit cast option',
        },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
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
.parent-1 {
  background-image: linear-gradient(180deg, #000, #111, #222);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-content: center;
}

.head-cont {
  background-color: #d7df23;
  width: 100%;
  height: 25vh;
  text-align: center;
  margin-top: -5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.head-cont h1 {
  font-size: 3em;
  font-weight: 600;
  line-height: 2em;
}

.head-cont p {
  font-size: 1em;
  font-weight: 500;
  color: black;
}

.faq-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5rem;
}

.big-box-1 {
  margin: auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #31394e;
  transition: opacity 0.5s ease;
  transform-origin: top;
}

.div-to-show {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.div-to-show button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
}

.div-to-show button img {
  width: 22px;
  height: 22px;
}

.div-to-show h1 {
  font-size: 1.5em;
  font-weight: 600;
  color: #a6a6a6;
}

.div-to-hide {
  margin-bottom: 2rem;
}

.div-to-hide p {
  color: #a6a6a6;
}
@media screen and (max-device-width: 980px) {
  .head-cont h1 {
    font-size: 2em;
    font-weight: 500;
    line-height: 1.5em !important;
  }

  .head-cont p {
    font-size: 1em;
    font-weight: 500;
    color: black;
  }
  .div-to-show h1 {
    font-size: 1em;
    font-weight: 500;
  }
  .faq-cont {
    /* border: 1px solid red; */
    padding: 2rem;
  }
}
</style>
