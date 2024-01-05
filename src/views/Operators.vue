<template>
  <div class="landing">
    <Navbar />
    <div class="home-cont mb-16">
      <div
        class="max-w-5xl w-full md:px-16 px-4 lg:py-24 py-10 lg:gap-2 gap-16 flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start">
        <div class="lg:w-full md:w-8/12 sm:w-10/12 w-full">
          <div class="op-1">
            <h1 id="head-id" class="sm:text-5xl xl:text-6xl text-4xl text-left">
              Operator - Run a KNODE (Node)
            </h1>
          </div>
          <div class="op-2 mt-2">
            <p class="text-base text-left">
              Run a KNODE (Knowledge Node) on your server
              <br class="xl:block hidden" />
              Buy a Node. Install Package on your server.
            </p>
          </div>
          <div class="op-3">
            <button @click="open">
              <img src="@/assets/images/meet.svg" />Enter
            </button>
            <!-- <button>
                            <img src="@/assets/images/key.svg" />Enter a code or link
                        </button> -->
          </div>
        </div>

        <div class="cont-3 flex justify-end items-center w-full" @scroll="handleScroll">
          <div class="rounded-lg relative p-6 basic__section__img" style="width: 500px;">
            <img class="rounded-lg object-cover w-full h-full"
              src="@/assets/images/landing/operators/operators__cover.png" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider my-16">
      <div class="slide-track">
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Creators . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Content . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Connections . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Community . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Collaborations . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Creators . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Content . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Connections . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Community . </span>
        </div>
        <div class="slide" :style="{ fontSize: dynamicFontSize3 }">
          <span>Collaborations . </span>
        </div>
      </div>
    </div>

    <div class="basic__section basic__section__1 flex w-full justify-center items-center py-16">
      <div
        class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
        <div class="flex flex-col text-grey gap-4 w-full col-span-1 lg:order-last lg:justify-end lg:items-end">
          <div class="flex-col flex md:w-10/12 sm:w-10/12">
            <div class="w-24 h-24 relative mb-4 pr-2">
              <img class="w-full h-full" src="@/assets/images/community.svg" />
            </div>
            <h5 class="lg:text-5xl text-4xl text-grey font-semibold">
              Why run a KNODE on your server? To earn Tokens!
            </h5>
            <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
            <p class="text-base text-grey font-normal">
              Token serves as the essential utility within the Decast ecosystem,
              supporting all transactions and associated fees. The tokenomics
              within the Decast ecosystem evolve through a set of specified
              steps.
            </p>
          </div>
        </div>
        <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-start">
          <img class="rounded-lg object-cover sm:w-10/12 w-full" src="@/assets/images/landing/operators/operators1.png" />
        </div>
      </div>
    </div>

    <div class="basic__section basic__section__2 hidden w-full justify-center items-center py-16">
      <div
        class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
        <div class="flex flex-col text-grey gap-4 w-full col-span-1">
          <div class="w-24 h-24 relative mb-4 pr-2">
            <img class="w-full h-full" src="@/assets/images/community.svg" />
          </div>
          <h5 class="lg:text-5xl text-4xl text-grey font-semibold md:w-10/12 sm:w-10/12">
            Decentralized and Hyper Networked
          </h5>
          <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
          <p class="text-base text-grey font-normal md:w-10/12 sm:w-10/12">
            Able to adapt to the growing computing needs of edge computing,
            where processing occurs closer to the data source. Optimal for
            scenarios where Edge computing requires low-latency responses.
          </p>
        </div>
        <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-end">
          <img class="rounded-lg object-cover sm:w-10/12 w-full" src="@/assets/images/landing-img.jpg" />
        </div>
      </div>
    </div>

    <div class="hidden w-full justify-center items-center">
      <div class="slide-cont max-w-5xl w-full lg:px-16 px-4 rounded-lg">
        <div class="btn-cont">
          <button @click="handleScrollLeft">
            <img src="@/assets/images/left.svg" />
          </button>
          <button @click="handleScrollRight">
            <img src="@/assets/images/right.svg" />
          </button>
        </div>
        <div class="testm-cont" ref="container">
          <div class="rev-cont" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial">
              <img :src="testimonial.image" alt="Testimonial Image" />
              <h2>{{ testimonial.comment }}</h2>
              <h3>
                {{ testimonial.name
                }}<span> - {{ testimonial.profession }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="logos">
      <div class="logos-slide">
        <img src="@/assets/images/partners/videowiki.png" />
        <img src="@/assets/images/partners/tedx.png" />
        <img src="@/assets/images/partners/startup portugal.png" />
        <img src="@/assets/images/partners/pci.png" />
        <img src="@/assets/images/partners/africa.png" />
        <img src="@/assets/images/partners/deep.png" />
        <img src="@/assets/images/partners/treejer.png" />
        <img src="@/assets/images/partners/getboarded.png" />
      </div>
      <div class="logos-slide">
        <img src="@/assets/images/partners/videowiki.png" />
        <img src="@/assets/images/partners/tedx.png" />
        <img src="@/assets/images/partners/startup portugal.png" />
        <img src="@/assets/images/partners/pci.png" />
        <img src="@/assets/images/partners/africa.png" />
        <img src="@/assets/images/partners/deep.png" />
        <img src="@/assets/images/partners/treejer.png" />
        <img src="@/assets/images/partners/getboarded.png" />
      </div>
      <div class="logos-slide">
        <img src="@/assets/images/partners/videowiki.png" />
        <img src="@/assets/images/partners/tedx.png" />
        <img src="@/assets/images/partners/startup portugal.png" />
        <img src="@/assets/images/partners/pci.png" />
        <img src="@/assets/images/partners/africa.png" />
        <img src="@/assets/images/partners/deep.png" />
        <img src="@/assets/images/partners/treejer.png" />
        <img src="@/assets/images/partners/getboarded.png" />
      </div>
    </div>

    <div>
      <FootSec />
    </div>
    <div :class="{ 'close-container': iframe, hidden: !iframe }">
      <loading />
      <!-- <button class="close-icon" @click="closeForm">✕</button> -->
    </div>
    <iframe :src="url" :class="{ iframe: iframe, hidden: !iframe }"></iframe>
  </div>
</template>

<script>
import constants from '../../constant';
import Loading from './Loading.vue';
import FootSec from './FootSec.vue';
import Navbar from './Navbar.vue';
export default {
  name: 'NewLanding',
  data() {
    return {
      iframe: false,
      isNavbarScrolled: false,
      scrollPosition: 0,
      isLoggedIn: false,
      username: '',
      generatedGradient: '',
      generatedCol: '',
      activeImage: require('@/assets/images/cast.svg'),
      testimonials: [
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
        {
          image: require('@/assets/images/of.svg'),
          name: 'Kevin Rich',
          profession: 'Sales & Marketing, Digital Lab',
          comment:
            '“Cast saves us from having an entire team of HR people. It saves time in training employees or supervisors and managers—half-hour increments here and there versus days compiling information.”',
        },
      ],
      boxes: [],
      boxTexts: [
        'my superpowers',
        'Awesome!',
        'Perfect!',
        'Amazing!',
        'Unreal',
        'Super!',
        'Next-level',
      ],
      boxes1: [],
      boxTexts1: ['Incredible', 'Fantastic', 'Whoa'],
      boxes2: [],
      boxTexts2: ['Mind-blowingly', 'Insane', 'Cool'],
      images: [
        require('@/assets/images/homepage/img1.svg'),
        require('@/assets/images/homepage/img2.svg'),
        require('@/assets/images/homepage/img3.svg'),
        require('@/assets/images/homepage/img4.svg'),
        require('@/assets/images/homepage/img5.svg'),
      ],
      bgcontent: [
        {
          gif: require('@/assets/images/homepage/bit.webp'),
          desc: 'Personalized NFT generated videos',
        },
        {
          gif: require('@/assets/images/homepage/nft.webp'),
          desc: 'Personalized NFT generated videos',
        },
        {
          gif: require('@/assets/images/homepage/lap.webp'),
          desc: 'Personalized NFT generated videos',
        },
        {
          gif: require('@/assets/images/homepage/dan.gif'),
          desc: 'Personalized NFT generated videos',
        },
        {
          gif: require('@/assets/images/homepage/mon.webp'),
          desc: 'Personalized NFT generated videos',
        },
      ],
      draggedBoxIndex: null,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    dynamicFontSize() {
      const scalingFactor = 5;
      const viewportWidth = window.innerWidth;
      const minFontSize = 14;

      if (viewportWidth < 499) {
        return `${minFontSize}vw`;
      } else {
        const fontSize = `${scalingFactor}vw`;
        return fontSize;
      }
    },
    dynamicFontSize2() {
      const scalingFactor = 4;
      const viewportWidth = window.innerWidth;
      const minFontSize = 14;

      if (viewportWidth < 499) {
        return `${minFontSize}vw`;
      } else {
        const fontSize = `${scalingFactor}vw`;
        return fontSize;
      }
    },
    dynamicFontSize3() {
      const scalingFactor = 8;
      const viewportWidth = window.innerWidth;
      const minFontSize = 16;

      if (viewportWidth < 499) {
        return `${minFontSize}vw`;
      } else {
        const fontSize = `${scalingFactor}vw`;
        return fontSize;
      }
    },
    dynamicFontSize5() {
      const scalingFactor = 3;
      const viewportWidth = window.innerWidth;
      const minFontSize = 8;

      if (viewportWidth < 499) {
        return `${minFontSize}vw`;
      } else {
        const fontSize = `${scalingFactor}vw`;
        return fontSize;
      }
    },
    borderStyle() {
      const maxBorderSize = 100;
      const maxScroll = 400;
      const borderSize = Math.min(
        (this.scrollPosition / maxScroll) * maxBorderSize * 3,
        maxBorderSize
      );
      const style = {
        border: `${borderSize}px solid #D7DF23`,
        backgroundColor: `#D7DF23`,
      };
      // console.log('Computed border style:', style);
      return style;
    },
    computedGradient() {
      return `linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()})`;
    },
    bgColors() {
      const red = ['#FF5733', '#FF2400', '#FF5C5C', '#FF6F61'];
      const blue = ['#35B8FF', '#0751F0', '#05FAFF', '#00ECFF'];
      const green = ['#33FF42', '#04F04F', '#027C08', '#8EFF7A'];
      const purple = ['#CA72EB', '#CC57FF', '#A700FF', '#EB09BD'];
      const orange = ['#FF7326', '#FF7526', '#FF0000', '#17FDEE'];

      const colorPalettes = [red, blue, green, purple, orange];

      const getRandomBrightColor = (colorArray) => {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
      };

      return this.bgcontent.map(() => {
        const randomSelection = Math.floor(
          Math.random() * colorPalettes.length
        );
        const selectedPalette = colorPalettes[randomSelection];
        const randomColor = getRandomBrightColor(selectedPalette);
        return randomColor;
      });
    },
  },
  components: {
    Loading,
    FootSec,
    Navbar,
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    // console.log(this.accessToken || this.loggedIn, 'prof');
    window.addEventListener('message', (event) => {
      // if (event.data === 'closeIframe') {
      //   this.iframe = false;
      //   this.url = '';
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '66%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '32%';
      // }
      // if (event.data === 'navigateToSignUp') {
      //   alert();
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '78%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '33%';
      //   document.getElementsByTagName('iframe')[0].style.height = '79%';
      //   document.getElementsByTagName('iframe')[0].style.width = '33%';
      // }
      // if (event.data === 'navigateToLogin') {
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '66%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '32%';
      //   document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      //   document.getElementsByTagName('iframe')[0].style.width = '32%';
      // }
      // if (event.data === 'navigateToPassword') {
      //   alert();
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '41%';
      //   document.getElementsByTagName('iframe')[0].style.height = '41.6%';
      // }
      if (event.data === 'loginSuccess') {
        console.log(this.$store.state.auth.loggedIn, 'loggedIn');
        this.$store.dispatch('auth/fetched');
        this.$acl.change('user');
        this.$store.commit('auth/SET_LOGGEDIN', true);
        this.$router.push('/dashboard');
        this.url = '';
      }
    });
    this.setupIntersectionObserver();
    this.generatedGradient = this.generateRandomGradient();
    this.generatedCol = this.generatedColor();
    // this.createFallingBoxes();
    // this.createFallingBoxes1();
    // this.createFallingBoxes2();
    window.addEventListener('scroll', this.handleScroll2);
    this.handleLogin();
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const childIds = ['#idk-child1', '#idk-child2', '#idk-child3'];
    childIds.forEach((id) => {
      const target = document.querySelector(id);
      if (target) {
        observer.observe(target);
      }
    });
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll2);
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    dropOpen() {
      document.getElementById('Navdrop').classList.toggle('showNav');
    },
    open() {
      window.open(constants.challengeUri, '_blank', 'width=600,height=600');
      // console.log('open');
      // this.iframe = !this.iframe;
      // this.url = constants.challengeUri;
      // // this.url = 'http://localhost:8080/login';
      // document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      // document.getElementsByTagName('iframe')[0].style.width = '32%';
      // console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
    handleScroll(event) {
      // console.log('Scrolling...');
      const scrollPosition = window.scrollY;
      this.scrollPosition = event.target.documentElement.scrollTop;
      const threshold = 10; // Adjust this threshold as needed
      if (scrollPosition > threshold) {
        this.isNavbarScrolled = true;
      } else {
        this.isNavbarScrolled = false;
      }
    },
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          this.changeImage(targetId);
        }
      });
    },
    changeImage(targetId) {
      switch (targetId) {
        case 'idk-child1':
          this.activeImage = require('@/assets/images/cast.svg');
          break;
        case 'idk-child2':
          this.activeImage = require('@/assets/images/b.svg');
          break;
        case 'idk-child3':
          this.activeImage = require('@/assets/images/c.svg');
          break;
        default:
          this.activeImage = require('@/assets/images/cast.svg');
          break;
      }
    },
    handleScroll2() {
      const sticky3Sections = [...document.querySelectorAll('.sticky3')];
      for (let i = 0; i < sticky3Sections.length; i++) {
        this.transform(sticky3Sections[i]);
      }
    },
    handleLogin() {
      const userInfo = localStorage.getItem('userInfo');
      const accessToken = localStorage.getItem('accessToken');
      if (userInfo && accessToken) {
        this.isLoggedIn = true;
        console.log('Ture');
        this.username = this.activeUserInfo.first_name || 'User';
      } else {
        console.log('false');
      }
    },
    transform(section) {
      if (window.innerWidth > 720) {
        const offsetTop = section.parentElement.offsetTop;
        const scrollSection = section.querySelector('.scroll_section');
        let percentage =
          ((window.scrollY - offsetTop) / window.innerHeight) * 100;
        percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
        scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
      }
    },

    handleScrollLeft() {
      const container = this.$refs.container;
      const scrollAmount = window.innerWidth; // Use 100vw equivalent
      container.scrollLeft -= scrollAmount;
    },
    handleScrollRight() {
      const container = this.$refs.container;
      const scrollAmount = window.innerWidth; // Use 100vw equivalent
      container.scrollLeft += scrollAmount;
    },
    generatedColor() {
      return this.getRandomColor();
    },
    generateRandomGradient() {
      return `linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()})`;
    },
    getRandomColor() {
      const colorShades = {
        red: ['#FF5733', '#FF2400', '#FF5C5C', '#FF6F61'],
        blue: ['#35B8FF', '#0751F0', '#05FAFF', '#00ECFF'],
        green: ['#33FF42', '#04F04F', '#41FF4B', '#21E103'],
        purple: ['#CA72EB', '#CC57FF', '#A700FF', '#EB09BD'],
        orange: ['#FF7326', '#FFD600', '#FF0000', '#F7EE05'],
        // violet: ['#A651FF', '#6A1BFF', '#E4ABFF', '#C449FA'],
      };

      const colorCategory =
        Object.keys(colorShades)[
        Math.floor(Math.random() * Object.keys(colorShades).length)
        ];

      const randomShade =
        colorShades[colorCategory][
        Math.floor(Math.random() * colorShades[colorCategory].length)
        ];

      return randomShade;
    },
    setupIntersectionObserver() {
      const container = this.$refs.fallboxContainer;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.createFallingBoxes();
          this.createFallingBoxes1();
          this.createFallingBoxes2();
          observer.unobserve(container);
        }
      });
      observer.observe(container);
    },
    createFallingBoxes() {
      for (let i = 0; i < 7; i++) {
        const delay = Math.random() * 2 + 0.2;
        const duration = Math.random() * 2;
        const leftPosition = Math.random() * 90 + 'vw';
        const rotation = Math.round(Math.random() * 20);
        // console.log(rotation, 'rot');

        const textIndex = Math.floor(Math.random() * this.boxTexts.length);
        const text = this.boxTexts[textIndex];
        this.boxTexts.splice(textIndex, 1);

        const box = {
          style: {
            left: leftPosition,
            top: '0vh',
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            background: `linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()})`,
            transform: `rotate(${rotation}deg)`,
          },
          text: text,
        };
        this.boxes.push(box);
      }
    },
    dragStart(index, event) {
      this.draggedBoxIndex = index;

      event.dataTransfer.setData('text/plain', index);

      event.dataTransfer.setDragImage(new Image(), 0, 0);
    },

    dragOver(index) {
      event.preventDefault();
    },

    drop(index) {
      event.preventDefault();
      const draggedIndex = event.dataTransfer.getData('text/plain');
      if (this.draggedBoxIndex !== null) {
        const draggedBox = this.boxes[this.draggedBoxIndex];
        this.boxes.splice(this.draggedBoxIndex, 1);
        this.boxes.splice(index, 0, draggedBox);
        this.draggedBoxIndex = null;
      }
    },
    createFallingBoxes1() {
      for (let i = 0; i < 3; i++) {
        const delay = Math.random() * 2 + 0.3;
        const duration = Math.random() * 2 + 0.4;
        const leftPosition = Math.random() * 90 + 'vw';
        const rotation = Math.round(Math.random() * 20);
        // console.log(rotation, 'rot');

        const textIndex1 = Math.floor(Math.random() * this.boxTexts1.length);
        const text = this.boxTexts1[textIndex1];
        this.boxTexts1.splice(textIndex1, 1);

        const box1 = {
          style: {
            left: leftPosition,
            top: '0vh',
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            background: `linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()})`,
            transform: `rotate(${rotation}deg)`,
          },
          text: text,
        };
        this.boxes1.push(box1);
      }
    },
    createFallingBoxes2() {
      for (let i = 0; i < 3; i++) {
        const delay = Math.random() * 2 + 0.1;
        const duration = Math.random() * 2;
        const leftPosition = Math.random() * 90 + 'vw';
        const rotation = Math.round(Math.random() * 20);
        // console.log(rotation, 'rot');

        const textIndex2 = Math.floor(Math.random() * this.boxTexts2.length);
        const text = this.boxTexts2[textIndex2];
        this.boxTexts2.splice(textIndex2, 1);

        const box2 = {
          style: {
            left: leftPosition,
            top: '0vh',
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            background: `linear-gradient(45deg, ${this.getRandomColor()}, ${this.getRandomColor()})`,
            transform: `rotate(${rotation}deg)`,
          },
          text: text,
        };
        this.boxes2.push(box2);
      }
    },
    redirectTo() {
      window.open('https://video.wiki/contact-us', '_blank');
    },
    redirectToLink() {
      window.open('https://fider.video.wiki/', '_blank');
    },
  },
};
</script>

<style scoped>
.hideNav {
  display: none;
}

.showNav {
  display: flex !important;
}

.basic__section__1 {
  background-image: url('../assets/images/leftPart.svg');
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
}

.basic__section__2 {
  background-image: url('../assets/images/rightPart.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
}

.basic__section__img img {
  box-shadow: 50px 50px 100px -12px rgba(214, 224, 36, 0.1);
  transition: all 0.5s ease-in-out;
}

.basic__section__img img:hover {
  box-shadow: 50px 50px 80px -12px rgba(214, 224, 36, 0.2);
}

.home-cont {
  background-image: url('../assets/images/leftPart.svg'),
    url('../assets/images/rightPart.svg');
  background-position: left, right;
  background-repeat: no-repeat, no-repeat;
  background-size: contain, contain;
  width: 100%;
  display: flex;
  justify-content: center;
}

button {
  font-family: 'Montserrat' !important;
}

.cont-2 {
  height: auto;
  z-index: 5 !important;
}

.cont-2 {
  padding-top: 8rem;
}

.mid-cont {
  margin: auto;
  width: 95%;
  margin-top: 8rem;
  /* border: 1px solid yellow; */
}

.mid-cont h1 {
  color: #d7df23;
  /* font-size: 90px; */
  text-align: center;
  font-weight: 700;
  width: 80%;
  max-width: 1200px;
  margin: auto;
}

.nam-con {
  padding: 6px;
  width: fit-content;
  display: flex;
  gap: 15px;
}

.nam-con p {
  font-size: medium;
  font-weight: 500;
  color: #a6a6a6;
  margin: auto;
}

.nam-con button {
  background-color: #d7df23;
  height: 40px;
  border-radius: 5px;
  padding: 6px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: auto;
}

.fallbox-container {
  width: 100%;
  position: relative;
  height: 60vh;
  margin: auto;
  padding-bottom: 10px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
}

.fallbox-container>div {
  /* border: 1px solid yellow; */
  display: flex;
  width: 100%;
  margin: auto;
  height: 20vh;
  gap: 1rem;
}

.fallbox-container>div:nth-child(1) {
  justify-content: flex-end;
  width: 90%;
}

.fall-child1>div:nth-child(2) {
  animation: fallbox-fall5 linear both;
  transition: 0.3s ease;
  /* animation-delay: 0.5ms; */
  transform-origin: center bottom;
}

@keyframes fallbox-fall5 {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(3vh) rotate(45deg);
  }

  50% {
    transform: translateY(6vh) rotate(90deg);
  }

  75% {
    transform: translateY(8vh) rotate(135deg);
  }

  100% {
    transform: translateY(10vh) rotate(180deg);
  }
}

.fall-child1>div:nth-child(3) {
  animation: fallbox-fall4 linear both;
  animation-delay: 0.3ms;
  /* margin-left: -20px; */
  transform-origin: center bottom;
  /* border: 1px solid red; */
}

@keyframes fallbox-fall4 {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  100% {
    transform: translateY(22vh) rotate(45deg);
  }
}

.fall-child3 {
  justify-content: center;
}

.fall-child3>div:nth-child(3) {
  margin-left: 12rem;
}

.fallbox {
  /* position: absolute; */
  width: fit-content !important;
  height: fit-content !important;
  padding: 20px 30px;
  text-align: center;
  border-radius: 35px;
  color: white;
  /* display: flex !important;
  flex-wrap: nowrap; */
  align-items: center !important;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  animation: fallbox-fall linear both;
  transform-origin: center bottom;
  cursor: pointer;
}

@keyframes fallbox-fall {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(14vh);
  }
}

.fallbox2 {
  /* position: absolute; */
  width: fit-content !important;
  height: fit-content !important;
  padding: 20px 30px;
  text-align: center;
  border-radius: 35px;
  color: white;
  /* display: flex !important;
  flex-wrap: nowrap; */
  align-items: center !important;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  animation: fallbox-fall2 linear both;
  transform-origin: center bottom;
  cursor: pointer;
}

@keyframes fallbox-fall2 {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(20vh);
  }
}

.fallbox1 {
  /* position: absolute; */
  width: fit-content !important;
  height: fit-content !important;
  padding: 20px 30px;
  text-align: center;
  border-radius: 35px;
  color: white;
  /* display: flex !important;
  flex-wrap: nowrap; */
  align-items: center !important;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  animation: fallbox-fall1 linear both;
  transform-origin: center bottom;
  cursor: pointer;
}

@keyframes fallbox-fall1 {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(8vh);
  }
}

.cont-3 {
  width: 400px;
  height: 400px;
  position: relative;
}

.cont-3 .vid-cont {
  min-height: 400px !important;
  min-width: 400px !important;
  max-width: fit-content;
  margin-top: 2rem;
  background-color: #d7df23;
  transform-origin: center !important;
  cursor: pointer;
}

.step-cont {
  width: 85%;
  /* border: 1px solid yellow; */
  margin: auto;
  margin-top: 10rem;
  max-width: 1200px;
}

.head1 {
  margin: auto;
  width: fit-content;
  text-align: center;
}

.head1 h1 {
  color: #ffffff;
}

.hov-cont {
  display: flex;
  justify-content: space-between;
  margin-top: 6rem;
  scroll-behavior: smooth;
}

.idk-1 {
  /* border: 1px solid red; */
  margin-top: 4rem;
  width: fit-content;
  max-width: 40%;
}

#idk-child1 {
  margin-top: 5rem;
}

#idk-child2 {
  margin-top: 7rem;
}

#idk-child3 {
  margin-top: 6rem;
  margin-bottom: 5rem;
}

.step-vid-cont>div {
  position: sticky;
  /* max-width: 600px; */
  padding: 35px;
  margin: auto;
  top: 8rem;
  width: auto;
  border-radius: 20px;
  height: auto;
  background-image: url('../assets/images/d.svg');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: #f1f1f1;
  animation: backgroundAnimation 5s linear infinite;
  transition: opacity 0.3s ease-in-out;
}

.step-vid-cont>div>img {
  width: auto;
  height: auto;
  max-width: 550px;
  margin: auto;
  border-radius: 8px;
}

@keyframes backgroundAnimation {
  0% {
    background-color: #f5af19;
  }

  20% {
    background-color: #da4453;
  }

  40% {
    background-color: #ff335f;
  }

  60% {
    background-color: #3f2b96;
  }

  80% {
    background-color: #8f94fb;
  }

  100% {
    background-color: #5733ff;
  }
}

.vid-cont img {
  height: 400px;
  width: 400px;
  transform: translate(-8%, -8%);
  object-fit: cover;
  animation: beat 6s infinite ease-in-out;
}

@keyframes beat {
  from {
    transform: translate(-8%, -8%);
  }

  10% {
    transform: translate(-5%, -5%);
  }

  20% {
    transform: translate(-8%, -8%);
  }

  30% {
    transform: translate(-5%, -5%);
  }

  40% {
    transform: translate(-8%, -8%);
  }

  50% {
    transform: translate(-5%, -5%);
  }

  60% {
    transform: translate(-8%, -8%);
  }

  70% {
    transform: translate(-5%, -5%);
  }

  80% {
    transform: translate(-8%, -8%);
  }

  90% {
    transform: translate(-5%, -5%);
  }

  to {
    transform: translate(-8%, -8%);
  }
}

.op-1,
.op-2 {
  width: fit-content;
  text-align: left;
}

.op-1 h1 {
  color: #a6a6a8;
  font-weight: 700;
}

.op-2 p {
  font-size: 2xl;
  color: #a6a6a8;
  font-weight: 500;
}

.op-3 {
  display: flex;
  gap: 10px;
  width: fit-content;
  margin-top: 50px;
}

.op-3 button:nth-child(1) {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  padding: 0.5rem 2rem;
  height: 40px;
  background-color: #d7df23;
  font-size: 2xl;
  font-style: italic;
  align-items: center;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.op-3 button:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 250px;
  height: 40px;
  background-color: #181a20;
  font-size: 2xl;
  font-style: italic;
  color: #a6a6a6;
  font-weight: 600;
  border: 1px solid #31394e;
  border-radius: 4px;
  cursor: pointer;
}

.iframe {
  position: absolute;
  border: 1px solid #31394e;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 66.5%;
  width: 32%;
  border-radius: 10px;
  z-index: 100;
  overflow: hidden;
}

.landing {
  height: auto;
  width: 100%;
  background-image: linear-gradient(180deg, #000, #111, #222);
  font-family: 'Montserrat' !important;
  /* overflow-x: hidden; */
  /* background: -webkit-linear-gradient(to bottom,#302f2f,#222121);
  background: linear-gradient(to bottom,#000000,#000000,#000000,#1d1c1c,#141318,#181a20,#222121);  */
}

.slider {
  max-height: 70vh;
  height: fit-content;
  margin: auto;
  margin-top: 6rem;
  position: relative;
  width: 100vw;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.slide-track {
  display: flex;
  width: calc(1200px * 6);
  animation: scroll 40s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-1200px * 3));
  }
}

.slide {
  height: auto;
  max-width: 1200px;
  width: auto;
  display: flex;
  align-items: center;
  padding: 15px;
  perspective: 100px;
}

.slide span {
  width: 100%;
  color: #d7df23;
  font-weight: 700;
  white-space: nowrap;
}

/* .slider:hover .slide-track {
  animation-play-state: paused;
} */

.nav-cont {
  width: 100%;
  background-color: #000000;
  transition: background-color 0.3s;
  position: sticky;
  top: 0%;
  z-index: 99;
}

.scrolled {
  background-color: #141318;
}

.close-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 66%;
  border-radius: 10px;
  width: 32%;
}

.sideOne {
  border-left: 1px solid #a6a6a6;
  width: 1px;
  margin: auto;
  height: 13px;
}

.sticky3_parent {
  max-height: 350vh;
  min-height: 300vh;
  /* border: 1px solid greenyellow; */
  height: auto;
  margin-top: 6rem;
}

.sticky3 {
  overflow: hidden;
  position: sticky;
  /* border: 1px solid green; */
  display: flex !important;
  height: 85vh;
  top: 7rem;
  /* border: 1px solid red; */
}

.scroll_section {
  position: absolute;
  top: 0;
  height: 100%;
  width: 300vw;
  max-width: 310vw;
  will-change: transform;
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw !important;
  overflow: hidden;
}

.cont-contain {
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  transition: transform 0.5s;
  height: 100%;
  gap: 2rem;
  /* border: 1px solid red !important; */
}

.scroll_section:hover .cont-contain {
  transform: translate3d(0, 0, 0);
}

.ima-cont {
  /* border: 1px solid red !important; */
  border-radius: 60px;
  height: 90%;
  margin: auto !important;
}

.ima-cont div {
  width: auto;
  height: 100%;
  max-height: 80vh;
  max-width: 480px;
  border-radius: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 15px;
  padding-bottom: 30px;
  background: transparent;
  /* border: 1px solid yellow !important; */
}

.why-cast img {
  width: 20rem;
  height: 20rem;
  margin: auto;
}

.why-cast h2 {
  text-align: center !important;
  font-weight: 700;
  text-wrap: balance;
  color: #d7df23;
}

.text h1 {
  font-weight: 700;
  padding-right: 20px;
  color: #d7df23;
  margin-right: 15rem;
}

.opt-cont div a {
  text-decoration: none;
  color: #a6a6a6;
  border-bottom: 2px solid transparent;
  padding: 4px 0px;
  transition: all 0.3s ease-in;
}

.opt-cont div a:hover {
  border-bottom: 2px solid #d7df23;
}

.log-cont {
  /* border: 1px solid blue; */
  width: fit-content;
  display: flex;
  gap: 15px;
  font-family: 'Montserrat' !important;
  /* margin: auto; */
}

.slog-cont,
.child-1 {
  display: flex;
  gap: 5px;
  font-size: 2xl;
}

.child-1 {
  transition: background-color 0.3s;
}

.child-1 button {
  background-color: #000000;
  border: none;
  font-size: 2xl;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slog-cont button {
  background-color: #141318;
  border: none;
  font-size: 2xl;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
}

.child-2 {
  margin: auto;
  font-size: 2xl;
}

.child-2 button {
  background-color: #d7df23;
  padding: 8px 12px 8px 12px;
  border: none;
  font-size: 2xl;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
}

.testm-cont {
  border: 1px solid transparent;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  overflow: auto;
  scroll-behavior: smooth;
  transition: 0.3s ease;
  transform-origin: center;
  margin: 5rem 0rem;
}

.testm-cont::-webkit-scrollbar {
  display: none !important;
}

.rev-cont {
  /* border: 1px solid yellow; */
  max-width: 700px;
  max-height: 700px;
  min-width: 499px;
  min-height: 499px;
  height: auto;
  transition: 0.3s ease;
  transform-origin: center;
  width: auto;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.2);
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
}

.btn-cont {
  margin: auto;
  width: 170px;
  height: 90px;
  display: flex;
  margin-top: 4rem;
  transition: 0.3s ease;
  transform-origin: right;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  /* gap: 20px; */
}

.btn-cont button {
  border-radius: 50%;
  margin: auto;
  width: 70px;
  height: 70px;
  background: transparent;
  transition: 0.3s ease-in-out;
  transform-origin: center;
  cursor: pointer;
  background: #0f0f0f;
  border: 1px solid #222;
}

.btn-cont button:hover {
  width: 90px;
  height: 90px;
}

.btn-cont button img {
  width: 27px;
  height: 18px;
}

.testimonial {
  /* border: 1px solid green; */
  display: flex;
  max-width: 700px;
  max-height: 700px;
  min-width: 499px;
  min-height: 499px;
  border-radius: 30px;
  /* backdrop-filter: blur(6px); */
  padding: 30px !important;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  flex-direction: column;
  cursor: pointer;
  /* border: 1px solid #141318; */
}

.testimonial h2 {
  font-size: 22px;
  color: #a6a6a8;
  font-size: 500;
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.testimonial h3 {
  margin-top: 2rem;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  font-size: medium;
  padding-bottom: 20px;
}

.testimonial h3 span {
  font-weight: 500;
  font-size: medium;
  color: #a6a6a8;
}

.testimonial img {
  width: 131px;
  height: 131px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 20px;
}

.logos {
  overflow: hidden;
  height: 100px;
  white-space: nowrap;
  position: relative;
  margin-top: 10rem;
}

.logos:before,
.logos:after {
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  content: '';
  z-index: 2;
}

.logos:before {
  left: 0;
}

.logos:after {
  right: 0;
}

.logos:hover .logos-slide {
  animation-play-state: paused;
}

@keyframes logos {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

.logos-slide {
  display: inline-block;
  animation: 30s logos infinite linear;
  margin: auto;
}

.logos-slide img {
  margin: auto 60px;
  max-height: 69px;
  height: auto;
  width: auto;
}

@media screen and (max-width: 499px) {
  .basic__section {
    background-image: none;
  }

  .home-cont {
    /* background: #000000; */
    background-image: url('../assets/images/rightPart.svg');
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: auto;
    overflow: hidden;
    /* border: 1px solid yellow; */
  }

  .ijdk {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin: auto;
    overflow: hidden;
  }

  .cont-3 {
    max-width: 400px;
    width: 100%;
    height: 400px;
    position: relative;
    margin-top: 1rem;
    margin: auto;
    /* border: 1px solid green; */
  }

  .cont-2 {
    padding: 15px;
    margin-top: 3rem;
  }

  .op-1 {
    text-align: center;
  }

  .op-2 {
    text-align: center;
  }

  .op-1 h1 {
    text-align: center;
  }

  .op-3 {
    margin: auto;
    margin-top: 40px;
  }

  .op-3 button:nth-child(1) {
    gap: 20px;
    width: 150px;
    height: 40px;
    font-size: 2xl;
    font-weight: 500;
  }

  .op-3 button:nth-child(2) {
    gap: 20px;
    width: 170px;
    height: 40px;
    font-size: 2xl;
    font-weight: 500;
  }

  .slider {
    max-height: 70vh;
    min-height: 50vh;
    height: fit-content;
    margin: auto;
    margin-top: 6rem;
    position: relative;
    width: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .slide-track {
    display: flex;
    width: calc(450px * 6);
    animation: scroll 40s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-450px * 3));
    }
  }

  .slide {
    height: auto;
    max-width: 450px;
    width: auto;
    display: flex;
    align-items: center;
    padding: 15px;
    perspective: 100px;
  }

  .sticky3_parent {
    height: auto;
    min-height: 95%;
    max-height: 98%;
    margin: auto;
    margin-top: 6rem;
    /* border: 1px solid blue; */
  }

  .sticky3 {
    position: relative;
    /* border: 1px solid green; */
    display: block !important;
    height: auto;
    top: 0;
  }

  .scroll_section {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 380px;
    /* border: 1px solid yellow; */
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw !important;
    overflow: hidden;
  }

  .cont-contain {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s;
    height: 100%;
    width: 100%;
    text-align: center;
    gap: 2rem;
    /* border: 1px solid red !important; */
  }

  .scroll_section:hover .cont-contain {
    transform: 0;
  }

  .ima-cont {
    border-radius: 30px;
    height: auto;
    margin: auto !important;
    /* border: 1px solid red !important; */
  }

  .ima-cont div {
    width: auto;
    height: auto;
    max-height: 45vh;
    border-radius: 30px;
  }

  .text h1 {
    font-weight: 700;
    padding-right: 0px;
    color: #d7df23;
    margin-right: 0;
  }

  .mid-cont {
    width: 98%;
    margin: auto;
    text-align: center;
    margin-top: 6rem;
  }

  .mid-cont>h1 {
    width: 100%;
    text-align: center;
  }

  .fallbox-container {
    flex-wrap: wrap;
    height: fit-content;
  }

  .fallbox-container>div {
    flex-wrap: wrap;
  }

  .fallbox2,
  .fallbox,
  .fallbox1 {
    width: fit-content !important;
    height: fit-content !important;
    padding: 10px 15px;
    text-align: center;
    border-radius: 20px;
    color: white;
    align-items: center !important;
    justify-content: center;
    font-size: medium;
    font-weight: bold;
    animation: fallbox-fall linear both;
    transform-origin: center bottom;
    cursor: pointer;
  }

  .testimonial {
    display: flex;
    max-width: 380px;
    max-height: 600px;
    min-width: 299px;
    margin-left: 10px;
    min-height: 499px;
    border-radius: 20px;
    /* backdrop-filter: blur(6px); */
    padding: 15px !important;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    flex-direction: column;
    cursor: pointer;
    /* border: 1px solid #141318; */
  }

  .rev-cont {
    max-width: 380px;
    max-height: 600px;
    min-width: 299px;
    margin-left: 10px;
    min-height: 499px;
    height: auto;
    width: auto;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.2);
  }

  .testimonial h2 {
    font-size: medium;
    color: #a6a6a8;
    font-size: 500;
    text-align: center;
    margin-bottom: 20px;
    padding-top: 20px;
  }

  .testimonial h3 {
    margin-top: 1rem;
  }

  .hov-cont {
    flex-direction: column-reverse;
    justify-content: center;
  }

  .step-cont {
    width: 95%;
  }

  .idk-1 {
    margin-top: 4rem;
    width: fit-content;
    max-width: 90%;
  }

  .step-vid-cont>div {
    padding: 20px;
    padding: 15px;
    width: 98%;
    border-radius: 10px;
  }

  .step-vid-cont>div>img {
    width: 100%;
    height: auto;
    margin: auto;
  }

  .nav-cont {
    width: 100%;
    background-color: #000;
    height: 80px;
  }

  .child-2 {
    display: none;
  }

  .slog-cont button {
    background-color: #000;
    border: none;
    font-size: 2xl;
    color: #a6a6a6;
    font-weight: 500;
    cursor: pointer;
  }
}

/* @media screen and (max-device-width: 700px) {
  .home-cont {
    background-image: url('../assets/images/rightPart.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
  }
  .cont-1,
  .cont-3 {
    display: none;
  }

  .cont-2 {
    width: auto;
    margin: auto;
    padding-top: 10px;
  }

  .op-1 h1 {
    font-size: 4xl;
    color: #a6a6a8;
    font-weight: 600;
    text-align: center;
    word-wrap: break-word;
  }

  .op-2 {
    max-width: 95%;
    width: auto;
    margin: auto;
  }
  .op-2 p {
    display: inline;
    font-size: 12px;
    color: #a6a6a8;
    font-weight: 500;
  }

  .op-4 {
    margin: auto;
    max-width: 100%;
    width: 100%;
    margin-top: 20px;
  }

  .op-4 img {
    margin: auto;
    width: 95%;
    max-width: 97%;
    width: auto;
    height: auto;
  }

  .op-3 button:nth-child(1) {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 130px;
    height: 40px;
    background-color: #d7df23;
    font-size: 12px;
    font-style: italic;
    align-items: center;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .op-3 button:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 165px;
    height: 40px;
    background-color: #181a20;
    font-size: 12px;
    font-style: italic;
    color: #a6a6a6;
    font-weight: 600;
    border: 1px solid #31394e;
    border-radius: 4px;
    cursor: pointer;
  }

  .opt-cont {
    display: none;
  }

  .child-2 {
    display: none;
  }

  .child-2 button {
    display: none;
  }

  .wiki-logo img {

    height: 60px;
    width: 60px;
  }

  .nav-cont {
    width: 100%;
    height: 60px;
    padding-top: 10px;
    background-color: #000000;
  }

  .nav-cont nav {
    display: flex;
    width: 95%;
    max-width: 98%;
    margin: auto;
    justify-content: space-between;
  }
}*/
</style>

<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #020202;
}

::-webkit-scrollbar-thumb {
  background: #181717;
  border-radius: 4px;
  height: 10px;
}

::-webkit-scrollbar-corner {
  background: #1f1e1e;
}
</style>
