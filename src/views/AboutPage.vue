<template>
  <div class="containr">
    <Navbar />
    <div class="w-full text-black py-10 px-4" style="background-color: #d6de22;">
      <p class="text-black text-5xl font-semibold text-center">We’re changing the way people</p>
      <p class="text-black text-5xl font-semibold text-center">think about video conferencing</p>
    </div>

    <div class="middle max-w-5xl w-full items-center flex flex-row justify-between gap-5 lg:px-16 md:px-6 px-4 py-6">
      <div class="left">
        <p class="text">
          A collaborative platform for learners and educators to secure learning
          continuity in times of restrictions and beyond. A simple tool for
          teachers to create teaching content without any advance knowledge of a
          tool or code. They create by using various media and graphics from the
          open stock libraries and merging it with their own content to keep it
          engaging and diverse.
        </p>
        <p class="text">
          We are a diversified team of dedicated and enthusiastic solution
          architects, developers, and experts with the belief that online
          education of the future requires special tools to facilitate learning
          to all humanity, equally and equitably.
        </p>
      </div>
      <div class="right">
        <img src="@/assets/images/about.svg" />
      </div>
    </div>

    <div class="footer">
      <div class="max-w-5xl w-full last">
        <div class="miss">Our Mission</div>
        <div class="info text-center">
          Theoretical knowledge online is what most universities have achieved,
          but practical training online so far seems unique. We are building
          tools to auto-generate (convert) text-based content to video-based
          online content with an extension towards gamification and immersive
          techniques for advanced pieces of training. Vision to ensure learning
          continuity for all. Standardized education and access to all with
          equal opportunities to educational processes.
          <br />
          In the education system, more than 90% of students are impacted by
          school and university closures. The map is a depiction of countries
          that are experiencing lockdown in terms of a countrywide or a
          localized lockdown. The education sector and an estimated 1.5 billion
          students were affected worldwide due to these lockdowns. Learning has
          been disrupted due to the pandemic, and there is a requirement for a
          new education model.
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
  name: 'About',
  components: {
    Navbar,
    FootSec,
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.containr {
  background-image: linear-gradient(180deg, #000, #111);
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.heading {
  margin: 100px auto 0px auto;
}
.heading p {
  display: flex;
  justify-content: center;
  color: #a6a6a8;
  font-weight: 700;
  font-size: 64px;
  text-align: center;
}
.middle {
  margin: 120px auto 0px auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.text {
  color: #a6a6a8;
  font-weight: 500;
  font-size: 20px;
}
.left {
  width: 48%;
}
.right {
  width: 48%;
  margin-left: 30px;
}
.right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.footer {
  width: 100%;
  height: auto;
  background-color: #d7df23;
  margin: 80px auto 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 4rem;
  padding-top: 4rem;
}
.miss {
  font-weight: 700;
  font-size: 64px;
  color: #181a20;
}
.info {
  font-weight: 500;
  font-size: 20px;
  color: #181a20;
  margin-top: 50px;
  width: 655px;
}
.last {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 0px auto 0px auto;
}
@media screen and (max-device-width: 980px) {
  .heading p {
    font-weight: 500;
    font-size: 45px;
    margin: auto;
  }
  .middle {
    margin-top: 50px !important;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .left {
    width: 90%;
    margin: auto;
  }
  .text {
    font-weight: 400;
    font-size: 16px;
  }
  .right {
    width: 90%;

    margin: auto;
  }
  .right img {
    width: 100%;
    object-fit: cover;
    margin-top: 20px;
  }
  .info {
    font-weight: 400;
    font-size: 16px;

    margin: 50px auto 0px auto;
    width: 90%;
  }
  .footer {
    margin-top: 20px;
  }
  .miss {
    font-weight: 500;
    font-size: 55px;
    color: #181a20;
  }
}
</style>
