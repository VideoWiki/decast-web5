<template>
  <div class="foot-cont">
    <div
      class="footer max-w-5xl w-full items-center lg:px-16 md:px-6 px-4 py-6 w-full"
    >
      <div class="log-co">
        <img src="@/assets/images/mono-logo.svg" />
        <p class="cursor-default">
          Headquarters LEREN LEREN , UNIPESSOAL LDA, Parque de Ciéncia e
          Inovacáo - Vía do Conhecimento s/n 3830-352 Ílhavo, Portugal,
          <br/>
          +351 912159105,Email - support@video.wiki
        </p>
      </div>
      <div class="log-co2">
        <p class="cursor-default">See yourself</p>
        <button @click="showPopUp()">Book a Demo</button>
        <div class="mt-10">
          <div>
            <p class="cursor-default">Helpful links</p>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/features')"
            >
              Features
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/faq')"
            >
              Faqs
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/achievements')"
            >
              Achievements
            </h5>
          </div>
          <div>
            <P class="cursor-default">Contact us</P>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/contact')"
            >
              Contact Us
            </h5>
            <h5 class="cursor-pointer mt-4" style="color: #ffffff"
            @click="workRed">
              Work With Us
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="redirectToLink"
            >
              Suggestions
            </h5>
          </div>
        </div>
      </div>

      <div class="log-co3">
        <div>
          <p class="cursor-default">Follow Us</p>
          <button><img src="@/assets/images/f.svg" /></button>
          <button @click="reTweet"><img src="@/assets/images/t.svg" /></button>
          <button @click="reLink"><img src="@/assets/images/l.svg" /></button>
        </div>

        <div class="mt-12">
          <p class="cursor-default">Policy</p>
          <!-- <h5 class="cursor-pointer mt-8" style="color: #ffffff">Report</h5> -->
          <h5
            class="cursor-pointer mt-5"
            style="color: #ffffff"
            @click="redirect"
          >
            Privacy
          </h5>
          <h5 class="cursor-pointer mt-5" style="color: #ffffff" @click="termsRedirect">Terms & Conditions</h5>
        </div>
      </div>
    </div>
    <div v-if="showContactPopUp" class="popup-container">
      <ContactPopUp
        :showContactPopUp="showContactPopUp"
        @updateContactPopUp="updateContactPopUp"
      />
    </div>
  </div>
</template>

<script>
import ContactPopUp from './ContactPopUp.vue';
export default {
  name: 'Footer',
  data() {
    return {
      showContactPopUp: false,
    };
  },
  components: {
    ContactPopUp,
  },
  methods: {
    redirectToLink() {
      window.open('https://fider.video.wiki/', '_blank');
    },
    redirect() {
      this.$router.push('/privacy');
    },
    termsRedirect(){
      this.$router.push('/terms');
    },
    workRed(){
      this.$router.push('/workwithus');
    },
    reTweet() {
      window.open('https://twitter.com/VideoWiki_PT', '_blank');
    },
    reLink() {
      window.open('https://www.linkedin.com/company/videowiki.pt/', '_blank');
    },
    showPopUp() {
      this.showContactPopUp = true;
    },
    updateContactPopUp(value) {
      this.showContactPopUp = value;
    },
  },
};
</script>

<style scoped>
.foot-cont {
  background-color: rgba(24, 26, 32, 1);
  padding: 40px;
  margin-top: 6rem;
  width: 100%;
}

.footer {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.log-co {
  max-width: 250px;
  width: 20%;
}

.log-co p {
  font-size: small;
  color: #ffffff;
  text-align: left;
  margin-top: 4rem;
  cursor: pointer;
}
.log-co img {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}

.log-co2 {
  width: 40%;
}
.log-co2 button {
  height: 60px;
  width: 200px;
  background-color: #d7df23;
  border-radius: 4px;
  border: none;
  margin-top: 3rem;
  cursor: pointer;
  font-weight: 600;
  font-size: medium;
}

.log-co2 > div {
  display: flex;
  justify-content: space-between;
}

.log-co2 p,
.log-co3 p {
  color: #637181;
  cursor: pointer;
}

.log-co3 button {
  margin-top: 2rem;
  border: 1px solid #637181;
  border-radius: 50%;
  background: transparent;
  width: 61px;
  height: 61px;
  margin-right: 10px;
  cursor: pointer;
}

.log-co3 div:nth-child(2) {
  text-align: left;
  width: fit-content;
  margin-left: 75%;
}
.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  padding: 20px;
  z-index: 1000;
}

@media screen and (max-device-width: 980px) {
  .foot-cont {
    background-color: rgba(24, 26, 32, 1);
    padding: 20px;
    margin-top: 6rem;
  }

  .footer {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: left;
    gap: 30px;
    flex-direction: column;
  }
  .log-co {
    width: 95%;
    max-width: 95%;
  }

  .log-co p {
    text-align: left;
    max-width: 350px;
    margin-top: 2rem;
  }

  .log-co img {
    max-width: 120px;
    max-height: 120px;
    width: auto;
    height: auto;
    margin-left: -10px;
  }
  .log-co2 {
    width: 95%;
  }

  h5 {
    cursor: pointer !important;
  }

  .log-co2 div {
    flex-direction: column;
    gap: 30px;
  }

  .log-co3 {
    width: 95%;
    /* border: 1px solid red; */
  }

  .log-co3 div:nth-child(2) {
    text-align: left;
    width: fit-content;
    margin-left: 0%;
  }
}
</style>
