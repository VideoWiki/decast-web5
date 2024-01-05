<template>
  <div>
    <div class="loading-logo">
      <img src="@/../public/logo.svg" alt="Logo" />
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const data = {
      id: this.$route.params.cast_Id,
      pass: this.$route.query.pass,
    };
    this.$store
      .dispatch('cast/checkCreateJoin', data)
      .then((res) => {
        console.log('This is running');
        console.log(res);
        location.href = res.data.cast_url;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style scoped></style>
