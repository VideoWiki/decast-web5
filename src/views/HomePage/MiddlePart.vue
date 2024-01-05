<!-- <template>
  <div class="full">
    <div class="slider">
      <div class="slide-track">
        <div class="slide">
          <span>Book more meetings</span>
        </div>
        <div class="slide">
          <span>Make meaningful connections</span>
        </div>
        <div class="slide">
          <span>Collaborate instantly</span>
        </div>
        <div class="slide">
          <span>Book more meetings</span>
        </div>
        <div class="slide">
          <span>Make meaningful connections</span>
        </div>
        <div class="slide">
          <span>Collaborate instantly</span>
        </div>
      </div>
    </div>

    <div class="scroll-container">
      <div class="sticky">
        <div class="scroll-section">
          <img v-for="image in images" :key="image" :src="image" alt="" />
        </div>
      </div>
    </div>

      <div class="logos-slide">
        <img src="@/assets/images/homepage/aws.svg" />
        <img src="@/assets/images/homepage/nor.svg" />
        <img src="@/assets/images/homepage/coke.svg" />
      </div>
      <div class="logos-slide">
        <img src="@/assets/images/homepage/aws.svg" />
        <img src="@/assets/images/homepage/nor.svg" />
        <img src="@/assets/images/homepage/coke.svg" />
      </div>
      <div class="logos-slide">
        <img src="@/assets/images/homepage/aws.svg" />
        <img src="@/assets/images/homepage/nor.svg" />
        <img src="@/assets/images/homepage/coke.svg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Slide',
  data() {
    return {
      images: [
        'https://dr.savee-cdn.com/things/6/4/8dc54f76c3a306e61eb401.webp',
        'https://dr.savee-cdn.com/things/6/4/8dbbfa1740c9070b3c6581.webp',
        'https://dr.savee-cdn.com/things/6/4/827433587eb3b7a968f00a.webp',
        'https://dr.savee-cdn.com/things/6/4/82cc78905b3becf0f56637.webp',
      ],
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.transform();
    },
    transform() {
      const scrollSection = document.querySelector('.scroll-section');
      const percentage = (window.scrollY / window.innerHeight) * 100;
      scrollSection.style.transform = `translate3d(0, ${-percentage}vh, 0)`;
    },
  },
};
</script>
<style scoped>

.sticky_parent {
  height: 500vh;
}
.sticky {
  overflow: hidden;
  position: sticky;
  display: flex !important;
  top: 0;
  height: 100vh;
  border: 1px solid red;
}
.scroll_section {
  position: absolute;
  top: 0;
  height: 100%;
  width: 500vw;
  will-change: transform;
  
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
}
.scroll_section img {
  width: 400px;
  height: 80%;
  object-fit: cover;
  object-position: center;
}
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.full {
  width: 100%;
  height: 200vh;
  background: linear-gradient(180deg, #000000 0%, #181a20 50.31%);
  display: grid;
}

/* .slider {
  overflow: hidden;

  position: relative;
}
.slider:hover .slide-track {
  animation-play-state: paused;
}
.slide-track {
  display: flex !important;
  display: inline-block;
  animation: 20s slide infinite linear;
  width: 1300px !important;
}
.text {
  width: 1300px !important;
  height: 300px;
  color: #d7df23;
  font-size: 128px;
  font-weight: 700;
  line-height: 130px;
}
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
} */


</style> -->
<template>
  <div class="full">
    <div class="slider">
      <div class="slide-track">
        <div class="slide">
          <span>Book more meetings</span>
        </div>
        <div class="slide">
          <span>Make meaningful connections</span>
        </div>
        <div class="slide">
          <span>Collaborate instantly</span>
        </div>
        <div class="slide">
          <span>Book more meetings</span>
        </div>
        <div class="slide">
          <span>Make meaningful connections</span>
        </div>
        <div class="slide">
          <span>Collaborate instantly</span>
        </div>
      </div>
    </div>
    <div class="sticky_parent">
      <div class="sticky">
        <div class="scroll_section">
          <div class="content-container">
            <div class="text">Why use Cast?</div>
            <div
              class="image-container"
              v-for="image in images"
              :key="image"
              style="border-radius: 80px"
            >
              <img
                id="border"
                :src="image"
                alt=""
                style="border-radius: 80px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  mounted() {
    const stickySections = [...document.querySelectorAll('.sticky')];
    const images = [
      require('@/assets/images/homepage/img1.svg'),
      require('@/assets/images/homepage/img2.svg'),
      require('@/assets/images/homepage/img3.png'),
      require('@/assets/images/homepage/img4.png'),
      require('@/assets/images/homepage/img5.svg'),
    ];

    images.forEach((img) => {
      stickySections.forEach((section) => {
        let image = document.createElement('img');
        image.src = img;
        section.querySelector('.scroll_section').appendChild(image);
      });
    });

    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const stickySections = [...document.querySelectorAll('.sticky')];
      for (let i = 0; i < stickySections.length; i++) {
        this.transform(stickySections[i]);
      }
    },
    transform(section) {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector('.scroll_section');
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
      scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
    },
  },
};
</script>

<style>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.full {
  width: 100%;
  height: 400vh;
  background: linear-gradient(180deg, #000000 0%, #181a20 50.31%);
  display: grid;
}
.sticky_parent {
  height: 350vh;
}
.sticky {
  overflow: hidden;
  position: sticky;
  display: flex !important;
  top: 0;
  height: 100vh;
  border: 1px solid red;
}
.scroll_section {
  position: absolute;
  top: 0;
  height: 100%;
  width: 350vw;
  will-change: transform;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw !important;
  overflow: hidden;
}
.content-container {
  display: flex !important;
  align-items: center;
  padding-right: 20px;
  transition: transform 0.5s;
  margin: 50px;
  border-radius: 80px !important;
}
.scroll_section:hover .content-container {
  transform: translate3d(0, 0, 0);
}

.image-container {
  padding: 50px !important;
}
.image-container img {
  width: 400px;
  height: 80%;
  /* object-fit: cover; */
  object-position: center;
  margin: 50px;
  border-radius: 100px !important;
}
.text {
  font-size: 90px;
  font-weight: 700;
  width: 380px;
  padding-right: 20px;
  color: #d7df23;
  line-height: 105.21px;
}
#border {
  border-radius: 80px !important;
  radius: 50px;
}
</style>
