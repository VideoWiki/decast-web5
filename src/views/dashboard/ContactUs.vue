<template>
  <div class="wrapper">
    <div class="header">
      <div class="left">
        <div class="heading">Get in touch</div>
        <div class="info">
          Want to get in touch? We'd love to hear from you. Here's how you can
          reach us...
        </div>
      </div>
      <div class="right">
        <img src="@/assets/images/dashboard/contact.svg" />
      </div>
    </div>
    <div class="middle">Connect with one of our global offices</div>
    <div class="buttom">
      <div class="img-part">
        <img src="@/assets/images/dashboard/R531.svg" />
      </div>
      <div class="text-part">
        <div class="head-part">Headquarters</div>
        <div class="info-part">463 Avenue Lalonde</div>
        <div class="info-part">State : Québec</div>
        <div class="info-part">City : Sainte-Bernadette</div>
        <div class="info-part">Post Code :D0W7D1</div>
        <div class="head-part">Phone</div>
        <div class="info-part">+185 254 698</div>
        <div class="head-part">Email</div>
        <div class="info-part">support@video.wiki</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Contact Us',
};
</script>
<style>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  width: 100%;
  height: 170vh;
  background-color: #181a20;
  padding-top: 100px;
}
.header {
  height: 420px;
  background-color: #d7df23;
  display: flex;
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
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right {
  flex: 1;
  height: 100%;
  margin-right: -15px;
}
.right img {
  height: 100%;
  width: 100%;
}
.middle {
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: 40px;
  font-weight: 700;
  color: #a6a6a8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttom {
  width: 80%;
  height: 520px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.img-part {
  flex: 2;
}
.img-part img {
  width: 100%;
  height: 100%;
}
.text-part {
  flex: 1;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #31394e;
}
.head-part {
  font-size: 32px;
  font-weight: 500;
  color: #a6a6a8;
  margin: 10px 0px;
}
.info-part {
  font-size: 22px;
  font-weight: 400;
  color: #a6a6a8;
}
</style>
