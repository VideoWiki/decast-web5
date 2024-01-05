<template>
  <div class="search-section">
    <vs-row vs-w="12">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="6"
        vs-sm="0"
        vs-xs="0"
      >
        <img
          class="image-responsive"
          src="../../assets/images/pages/vw-header-banner.png"
          alt="Learning"
        />
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="6"
        vs-sm="12"
        vs-xs="12"
      >
        <div class="search-section--sub font-serif font-bold m-5">
          <h1 class="mb-4">Anytime, Anywhere Learning</h1>
          <h4 class="mb-8">Teachers And Students Collaboration</h4>
          <box-search></box-search>
          <br />
          <h4 class="mb-8">
            Just paste your script and let AI create <br />
            engaging immersive video course for you to teach.
          </h4>
          <div class="aligncenter">
            <vs-button size="medium" :disabled="btndisable" @click="blockchain"
              >Create A New Video</vs-button
            >
          </div>
        </div>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12" class="info p-4">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="4"
        vs-sm="4"
        vs-xs="12"
      >
        <vs-row>
          <vs-col vs-w="4">
            <vs-icon icon="check_circle" color="white" size="large"></vs-icon>
          </vs-col>
          <vs-col vs-w="8">
            <h4 class="text-white font-bold">Open Source</h4>
            <p class="text-white text-sm">Explore variety of fresh topics</p>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="4"
        vs-sm="4"
        vs-xs="12"
      >
        <vs-row>
          <vs-col vs-w="4">
            <vs-icon icon="people" color="white" size="large"></vs-icon>
          </vs-col>
          <vs-col vs-w="8">
            <h4 class="text-white font-bold">Collaboratory</h4>
            <p class="text-white text-sm">Teachers and students collaborate</p>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="4"
        vs-sm="4"
        vs-xs="12"
      >
        <vs-row>
          <vs-col vs-w="4">
            <vs-icon icon="shutter_speed" color="white" size="large"></vs-icon>
          </vs-col>
          <vs-col vs-w="8">
            <h4 class="text-white font-bold">Lifetime Access</h4>
            <p class="text-white text-sm">Learn on Your schedule</p>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import BoxSearch from '../../components/search/BoxSearch';
export default {
  name: 'IntroductionWelcome',
  components: { BoxSearch },
  data() {
    return {
      btndisable: false,
    };
  },
  methods: {
    async blockchain(event) {
      try {
        this.btndisable = true;
        this.$router.push('/studio');
      } catch (err) {
        console.log(err);
      } finally {
        this.btndisable = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  background: rgb(115, 103, 240);
  background: linear-gradient(
    30deg,
    rgba(115, 103, 240, 1) 11%,
    rgba(234, 84, 85, 1) 100%
  );
}
.aligncenter {
  text-align: center;
}
</style>
