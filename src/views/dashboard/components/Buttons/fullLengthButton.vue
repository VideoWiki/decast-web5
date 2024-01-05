<template>
  <button class="button flex cursor-pointer" @click="click">
    {{ buttonName }}
    <img class="img" src="@/assets/images/dashboard/Vector.svg" />
  </button>
</template>
<script>
export default {
  props: ['buttonName', 'click'],
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.button {
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  color: #1f272f;
  font-weight: 700;
  font-size: 12px;
  line-height: 14.03px;
}
.img {
  width: 14px;
  height: 8px;
  margin-left: 10px;
  color: #1f272f;
}
</style>
