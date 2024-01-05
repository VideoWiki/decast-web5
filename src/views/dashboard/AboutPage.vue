<template>
  <div class="containr">
    <div class="heading">
      <p>We’re changing the way people</p>
      <p>think about video conferencing</p>
    </div>
    <div class="middle">
      <div class="left">
        <p class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          risus blandit, iaculis magna et, viverra odio. Pellentesque imperdiet
          dui vitae ligula porta, sit amet sollicitudin sapien ornare. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus.
        </p>
        <p class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          risus blandit, iaculis magna et, viverra odio. Pellentesque imperdiet
          dui vitae ligula porta, sit.
        </p>
      </div>
      <div class="right">
        <img src="@/assets/images/dashboard/about.svg" />
      </div>
    </div>
    <div class="footer">
      <div class="miss">Our Mission</div>
      <div class="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus
        blandit, iaculis magna et, viverra odio. Pellentesque imperdiet dui
        vitae ligula porta, sit amet sollicitudin sapien ornare. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Nam et lacinia massa.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.containr {
  background-color: #181a20;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.heading {
  margin-top: 100px;
}
.heading p {
  display: flex;
  justify-content: center;
  color: #a6a6a8;
  font-weight: 700;
  font-size: 64px;
  line-height: 74.82px;
}
.middle {
  margin-top: 120px !important;
  display: flex;
  margin: auto;
}
.text {
  color: #a6a6a8;
  font-weight: 500;
  font-size: 20px;
}
.left {
  width: 604px;
}
.right {
  width: 660px;
  height: 405px;
  border-radius: 6px;
  margin-left: 50px;
}
.footer {
  width: 100%;
  height: 480px;
  background-color: #d7df23;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
</style>
