<template>
  <div class="wrapper flex justify-center items-center">
    <Navbar />
    <div class="header py-16">
      <div class="max-w-5xl w-full flex items-center justify-center p-0 ga[-5] lg:px-16 md:px-6 px-4 py-6 last">
        <div class="left w-full">
          <div class="heading text-center w-full">Get in touch</div>
          <div class="info text-center">
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us...
          </div>
        </div>
      </div>
    </div>
    <div class="middle max-w-5xl w-full my-16">
      Connect with one of our global offices
    </div>
    <div class="max-w-5xl flex flex-col lg:flex-row items-center gap-8 justify-center border-black border-solid border-2 rounded-lg overflow-hidden h-full p-0 lg:px-8 md:px-6 px-4 py-10 mx-4" style="width: fit-content;">
      <div class="flex max-w-md relative h-full bg-white overflow-hidden rounded-lg">
        <img class="w-full h-full object-cover" src="@/assets/images/map.svg" />
      </div>
      <div class="">
        <div class="head-part">Headquarters</div>
        <div class="info-part">LEREN LEREN , UNIPESSOAL</div>
        <div class="info-part">LDA, Parque de Ciéncia e</div>
        <div class="info-part">Inovacáo - Vía do</div>
        <div class="info-part">Conhecimento s/n 3830-352</div>
        <div class="info-part">Ílhavo, Portugal</div>
        <div class="head-part mt-6">Phone</div>
        <div class="info-part">+351 912159105</div>
        <div class="head-part mt-6">Email</div>
        <a class="info-part hover:text-white" href="mailto:support@cast.com">support@video.wiki</a>
      </div>
    </div>
    <FootSec />
  </div>
</template>
<script>
import FootSec from './FootSec.vue';
import Navbar from './Navbar.vue';
export default {
  name: 'Contact',
  components: {
    Navbar,
    FootSec,
  },
};
</script>
<style>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  width: 100%;
  height: auto;
  background-color: #181a20;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header {
  background-color: #d7df23;
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 100%;
}
.heading {
  font-weight: 700;
  font-size: 64px;
  color: #181a20;
}
.info {
  font-weight: 500;
  font-size: 20px;
  color: #181a20;
  line-height: 30px;
  margin-top: 30px;
}
.left {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right {
  flex: 1;
  height: 100%;
  /* margin-right: -15px; */
}
.right img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.middle {
  margin: 80px auto;
  font-size: 40px;
  font-weight: 700;
  color: #a6a6a8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttom {
  height: auto;
  margin: auto;
  display: flex;
  gap: 0;
  justify-content: center !important;
  align-items: center !important;
}
.img-part {
  max-width: 600px;
  width: auto;
  /* border: 1px solid green; */
}
.img-part img {
  height: 100% !important;
  /* border: 1px solid red; */
  object-fit: cover;
}
.text-part {
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  max-width: 400px;
  height: 100% !important;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #31394e;
}
.head-part {
  font-size: 32px;
  font-weight: 500;
  color: #a6a6a8;
}
.info-part {
  font-size: 22px;
  font-weight: 400;
  color: #a6a6a8;
}
.last {
  display: flex;
  justify-content: center;
  margin: auto;
}
@media screen and (max-device-width: 768px) {
  .buttom {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    /* border: 1px solid red; */
    overflow: hidden;
    height: auto;
    max-height: fit-content;
  }
  header {
    height: auto;
  }
  .last {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .heading {
    font-weight: 700;
    font-size: 56px;
    text-align: center;
  }
  .info{
    text-align: center;
  }
  .right {
    display: none;
  }
  .right img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .middle {
    font-size: 35px;
    font-weight: 600;
    margin: auto;
    text-align: center;
    width: 90vw;
    height: auto;
  }
  .head-part {
    font-size: 25px;
    font-weight: 500;
  }
  .info-part {
    font-size: 15px;
    font-weight: 400;
  }
  .img-part {
    width: 100%;
    max-width: 80vw;
    height: auto;
    margin: auto;
    /* border: 1px solid green; */
  }
  .img-part img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .text-part {
    width: 90%;
    max-width: 80vw;
    text-align: left;
    width: 100%;
    margin: auto;
  }
}
</style>