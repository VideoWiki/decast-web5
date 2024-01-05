<template>
  <div class="awards">
    <section class="awards-main"
      :style="{ 'background-image': 'url(' + require('@/assets/images/awards/backgroundimg.svg') + ')' }">
      <div class="awards-main-left">
        <div class="awards-ml-wrapper">
          <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
          <h1>Cast your Content <br>from the Future!</h1>
          <h4>Cast is a Video Conferencing Software <br>For Virtual Communication And <br>Collaboration.</h4>
        </div>
      </div>
      <div class="awards-main-right">
        <img src="@/assets/images/awards/intro.svg" />
      </div>
    </section>

    <section class="awards-vision">
      <h2>OurVision</h2>
      <div class="awards-vcards-container">
        <div class="awards-vcard" v-for="(vision, index) in visions" :key="index">
          <div class="awards-vcard-img" v-if="vision.image">
            <img :src="vision.image" :alt="vision.title" />
          </div>
          <h3>{{ vision.title }}</h3>
          <p>{{ vision.description }}</p>
        </div>
      </div>
    </section>

    <section class="awards-vision">
      <h2>The Technology</h2>
      <div class="awards-vcards-container">
        <div class="awards-vcard" v-for="(technology, index) in technologies" :key="index">
          <div class="awards-vcard-img" v-if="technology.banner">
            <img :src="technology.banner" :alt="technology.title" />
          </div>
          <h3>{{ technology.title }}</h3>
          <p>{{ technology.description }}</p>
        </div>
      </div>
    </section>

    <section class="awards-vision">
      <h2>Awards & Recognitions</h2>
      <div class="awards-recog-container">
        <div class="awards-rcard" v-for="(recog, index) in recognitions" :key="index">
          <div v-if="!recog.isImage">
            <h3>{{ recog.title }}</h3>
            <img :src="recog.banner" :alt="recog.title" />
            <p class="recog-desc">{{ recog.description }}</p>
            <a :href="recog.url" target="_blank">Read More</a>
          </div>

          <div v-else>
            <div class="awards-vcard-bigimg" v-if="recog.banner">
              <img :src="recog.banner" :alt="recog.title" />
              <a :href="recog.url" target="_blank"><span>{{recog.title}}</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="awards-vision">
      <h2>Roadmap</h2>
      <img class="roadmap-image" :src="require('@/assets/images/awards/roadmap.svg')" />
    </section>

    <section class="awards-news">
      <h2>News & Media Coverage</h2>
      <div class="awards-news-container">
        <div class="awards-news-card" v-for="(topic, index) in news" :key="index">
          <div class="awards-nc-left">
            <div class="awards-nc-img">
              <img :src="topic.image" :alt="topic.title" />
            </div>
          </div>
          <div class="awards-nc-right">
            <h4>{{ topic.title }}</h4>
            <p>{{ topic.description }}</p>
            <a :href="topic.url" target="_blank">Read More</a>
          </div>
        </div>
      </div>
      <div class="awards-news-img">
        <div class="awards-news-img1">
          <img :src="require('@/assets/images/awards/presidentpic.svg')" />
        </div>
        <div class="awards-news-img2">
          <img :src="require('@/assets/images/awards/grouppic.svg')" />
        </div>
      </div>
    </section>

    <FootSec/>
  </div>
</template>

<script>
import constants from '../../constant';
import Loading from './Loading.vue';
import FootSec from './FootSec.vue';

export default {
  data() {
    return {
      visions: [
        {
          image: require('@/assets/images/awards/vision1.svg'),
          title: 'Meaningful Human Collaboration',
          description: 'Besides collaboration in content creation between users, our team offers fully customized support.',
        },
        {
          image: require('@/assets/images/awards/vision2.svg'),
          title: 'Individual Specialized Features',
          description: "Every company and organization we've partnered with helped us building the platform, with their value feedback.",
        },
        {
          image: require('@/assets/images/awards/vision3.svg'),
          title: 'Knowledge Sharing',
          description: 'Our ultimate goal is to create a culture of knowledge sharing, available to all.',
        },
      ],
      technologies: [
        {
          title: 'Video Creation',
          description: 'AI-based text classification methods. We make queries to public video media libraries using APIs.',
        },
        {
          title: 'Video Conferencing',
          description: "Docker, FFmpge, Nginx, Vue Js & Django, AWS, React Js, Java, Redis, Ruby on Rails and Python. Machine Learning models and open APIs.",
        },
        {
          title: 'Event Scheduling',
          description: "Django Rest Framewok, Vue Js,Python, AWS, Nginx, Blockchain, Docker Javascript and Ruby onRails",
        },
      ],
      recognitions: [
        {
          isImage: false,
          title: '#Partnership with SWARM',
          url:"https://www.ethswarm.org/ecosystem.html#:~:text=Apply%20for%20a%20grant,mentors%20the%20developers%20and%20founders.",
          banner: require('@/assets/images/awards/swarmlogo.svg'),
          description: "After applying for SWARM grant program, VideoWiki had the opportunity of showcasing the product to SWARM team, which led to conversations for a partnership. SWARM is a decentralised storage and communication system for a sovereign digital society. It works as a system of peer-to-peer networked nodes, that create a decentralised storage and communication service. The system is economically self-sustaining due to a built-in incentive system enforced through smart contracts on the Ethereum blockchain.",
        },
        {
          isImage: false,
          title: '#DFINITY Foundation Finalist',
          url: "https://dfinity.org/",
          banner: require('@/assets/images/awards/dfinitylogo.svg'),
          description: "The DFINITY Foundation is a not-for-profit organization based in Zurich, Switzerland, which believes smart contracts that run on a public blockchain are a vastly superior new form of software. Thus, their mission is to develop technology that supports the next generation Internet Computer blockchain network and ecosystem. The Internet Computer is supported by a growing community of crypto enthusiasts, investors, and independent node providers, who operate the node machines that power the Internet Computer. And VideoWiki was one of the 8 finalists who saw their project being selected in a program that allows developers to build dapps that are scaleable, run smart contracts at web speed, and serve user experiences directly on chain.",
        },
        {
          isImage: false,
          title: '#EUvsVirus Hackathon Challenge Winner',
          url: "https://www.euvsvirus.org/",
          banner: require('@/assets/images/awards/euvsviruslogo.svg'),
          description: "The European Commission launched the #EUvsVirus hackathon, a non-profit online hackathon to connect civil society, innovators, partners and buyers across Europe to develop innovative solutions to overcome coronavirus-related challenges. It is also the largest hackathon in the world. VideoWiki (“Video Wikipedia for Learners and Creators”) was one of the winning projects in the hackathon, being supported by the EUA members. It is a simple tool to create teaching content without any additional skills needed from the teachers' side. VideoWiki enables you to easily create content and make it available for everyone, with censorship protection through a Public Blockchain Network.",
        },
        {
          isImage: false,
          title: '#HackBack Overall Winner 2020',
          url: "https://what-the-hack.co/hackback/",
          banner: require('@/assets/images/awards/hackbacklogo.svg'),
          description: "#HackBack, an online hackathon organised by What The Hack aims to address the needs of small to medium enterprises (SMEs) and startups during the recovery from Covid-19 crisis. Besides securing the first prize in #HackBack 2020, it has also been awarded for the user-friendly UX. VideoWiki platform is made keeping simplicity and ease of use in mind. It ensures continuous content consumption without any form of distraction or disturbance. The UI provides every needed tool in a simple step-by-step workflow which makes content-creation and consumption easy and effective.",
        },
        {
          isImage: false,
          title: '#And... the winner is out!',
          url: "https://x.com/oceanprotocol/status/1654889932152885250?t=2lxJyg7ZaI6w4Zhg-EU_RQ&s=08",
          banner: require('@/assets/images/awards/oceanlogo.svg'),
          description: "Video Wiki is the very first decentralized video marketplace that uses Ocean & ChatGPT to autogenerate, publish & monetise content Congratulations to @VideoWiki_PT  for winning the $1000 DevChallenge announced at @PolkadotNowInd",
        },
        {
          isImage: true,
          title: 'Startup, Stories, and Selfies: A Gratitude-Filled Reflection',
          url: "https://www.linkedin.com/pulse/startup-stories-selfies-gratitude-filled-reflection-shivam-dhawan-j5ezf/?utm_source=share&utm_medium=member_android&utm_campaign=share_via",
          banner: require('@/assets/images/awards/galp.jpg'),
        },
      ],
      news: [
        {
          image: require('@/assets/images/awards/news1.svg'),
          title: "#EUvsVIRUS Hackathon results: bringing solutions to Covid-19 challenges to the next level",
          url: "https://www.eua.eu/partners-news/519-euvsvirus-hackathon-results-bringing-solutions-to-covid-19-challenges-to-the-next-level.html?utm_source=social&utm_medium=LinkedIn&utm_name=LinkedIn-social-10-6-2020",
          description: 'VideoWiki: defined as a "Video Wikipedia for Learners and Creators", this simple tool helps teachers create teaching content without any advanced knowledge of a tool or code.',
        },
        {
          image: require('@/assets/images/awards/news2.svg'),
          title: "VideoWiki “Video Wikipedia for Learners and Creators",
          url: "https://hundred.org/en/innovations/videowiki-video-wikipedia-for-learners-and-creators",
          description: "We offer a tool for teachers. They copy-paste the content they want to convert to a video. A collaborative platform for learners and educators to secure learning continuity in times of restrictions and beyond.",
        },
        {
          image: require('@/assets/images/awards/news3.svg'),
          title: "Remote Working & Education - E-Learning methods & tools",
          url: "https://eic.eismea.eu/challenges/solution/videowiki/about",
          description: "A collaborative platform for learners and educators to secure learning continuity in times of restrictions and beyond. A simple tool for teachers to create teaching content without any advanced knowledge of a tool or code.",
        },
        {
          image: require('@/assets/images/awards/news4.svg'),
          title: "UA Incubator Startup creates an award-winning automatic content scanning project",
          url: "https://www.ua.pt/en/news/16/63381",
          description: "The VideoWiki - Video Wikipedia for Learners and Creators project consists of a platform that allows the automatic conversion of teaching content into appealing digital media.",
        },
        {
          image: require('@/assets/images/awards/news5.svg'),
          title: "Sustainable education through digital learning spaces",
          url: "https://digieduhack.com/en/solutions/videowiki",
          description: "VideoWiki is an AI teaching assistant tool that quickly creates teaching courses in video format that can be shared online while streaming or sharing.",
        },
        {
          image: require('@/assets/images/awards/news6.svg'),
          title: "Awards.News.sustainable.remote",
          url: "https://www.euvsvirus.org/finalreport.pdf",
          description: "A collaborative platform for learners and educators to secure learning continuity in times of restrictions and beyond. A simple tool for teachers to create teaching content without any advanced knowledge of a tool or code.",
        },
        {
          image: require('@/assets/images/awards/news7.svg'),
          title: "The Alternate Future Summit",
          url: "https://www.linkedin.com/posts/thealternatefuture_creativity-personaldevelopment-motivation-activity-7120314541179101184-c8jH?utm_source=share&utm_medium=member_android",
          description: "It has been three weeks since the successful hosting of the inaugural in-person Alternate Future Summit at PCI · Creative Science Park Aveiro Region 🎉 We are delighted to inform you that the Summit was only the beginning. As our community continues to grow, we are committed to sharing our developments and initiatives with you. ",
        },
        {
          image: require('@/assets/images/awards/news8.svg'),
          title: "VideoWiki (TCH Protocol)",
          url: "https://twitter.com/oceanprotocol/status/1356921263952977922",
          description: "An open content editing platform that powers the creation and monetization of content while prioritizing IP protection. The Team recognized the need for simple text-to-video content creation to benefit the rise of online learning and enable a more immersive learning experience.",
        },
      ]
    };
  },
  computed: {
  },
  components: {
    Loading,
    FootSec,
  },
  mounted() {
  },
  destroyed() {
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
  },
};
</script>

<style scoped>
.awards {
  background-color: #000;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-y: scroll;
}

.awards-main {
  height: 90vh;
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  background-size: contain;
}

.awards-main-left {
  flex: 1;
}

.awards-ml-wrapper {
  margin-left: 130px;
}

.awards-ml-wrapper img {
  height: 140px;
  margin-top: 15px;
}

.awards-ml-wrapper h1 {
  color: #FFF;
  font-family: "Karla";
  font-size: 54px;
  font-style: normal;
  font-weight: 700;
  line-height: 75px;
  margin: 60px 0px 30px 0px;
}

.awards-ml-wrapper h4 {
  color: #A6A6A8;
  font-family: "Karla";
  font-size: 35px;
  font-style: normal;
  font-weight: 500;
  line-height: 136.4%;
}

.awards-main-right {
  flex: 1;
  display: flex;
}

.awards-main-right img {
  width: 100%;
  padding: 60px;
}

.awards-vision {
  padding: 0px 90px 0px 130px;
  box-sizing: border-box;
}

.awards-vision h2 {
  color: #D7DF23;
  font-family: "Karla";
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: fit-content;
  border-bottom: 2px solid #D7DF23;
  margin-bottom: 30px;
}

.awards-vcards-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
}

.awards-vcard {
  padding-right: 20px;
  flex: 1;
}

.awards-vcard .awards-vcard-img {
  margin-top: 50px;
  height: 150px;
}

.awards-vcard h3 {
  color: #F7F7F7;
  font-family: "Karla";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 20px 0px 34px 0px;
}

.awards-vcard p {
  color: #A6A6A8;
  font-family: "Karla";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  /* 141.667% */
  padding-right: 20px;
}

.awards-recog-container {
  display: grid;
  grid-template-columns: 55% 45%;
}

.awards-rcard {
  padding-right: 20px;
  flex: 1;
  margin-bottom: 20px;
}

.awards-vcard-bigimg img {
  border-radius: 10px;
  width: 100%;
  margin: 50px 20px 10px 0px;
}

.awards-vcard-bigimg a {
  cursor: pointer;
  color: rgb(126, 126, 255);
}

.awards-rcard h3 {
  color: #F7F7F7;
  font-family: "Karla";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 20px;
}

.awards-rcard p {
  color: #A6A6A8;
  font-family: "Karla";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
}

.awards-rcard a {
  color: #FFF;
  font-family: Karla;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  background-color: transparent;
  outline: none;
  border-bottom: 1.5px solid #FFF;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin-top: 10px;
  cursor: pointer;
}

.awards-rcard:nth-child(odd) p {
  padding-right: 100px;
}

.awards-roadmap-container {
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 30px;
}

.awards-roadmap-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.awards-roadmap-card h3 {
  color: #3FB00D;
  text-align: center;
  font-family: Karla;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal
}

.awards-roadmap-card p {
  color: #A6A6A8;
  font-family: Karla;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 151.4%;
  text-align: center;
}

.roadmap-image {
  width: 100%;
  margin-bottom: 80px;
}

.awards-news {
  padding: 0px 130px;
  box-sizing: border-box;
}

.awards-news h2 {
  color: #D7DF23;
  font-family: "Karla";
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: fit-content;
  border-bottom: 2px solid #D7DF23;
  margin-bottom: 30px;
}

.awards-news-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 80px;
  margin-bottom: 50px;
}

.awards-news-card {
  display: flex;
  margin: 0px 50px 50px 0px;
}

/* .awards-nc-img{
  width: 130px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
} */
/* .awards-nc-left img{
  width: 130px;
} */

.awards-nc-right {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  align-items: flex-start;
}

.awards-nc-right h4 {
  color: #F7F7F7;
  font-family: Karla;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.awards-nc-right p {
  color: #A6A6A8;
  font-family: "Karla";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  margin: 14px 0px;
}

.awards-nc-right a {
  color: #FFF;
  font-family: Karla;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  background-color: transparent;
  outline: none;
  border-bottom: 1.5px solid #FFF;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  cursor: pointer;
}

.awards-news-img {
  display: flex;
  margin-bottom: 50px;
}

.awards-news-img1 {
  flex: 1;
  margin-right: 35px;
}

.awards-news-img2 {
  flex: 1;
  margin-left: 35px;
}

.awards-news-img1 img {
  width: 100%;
}

.awards-news-img2 img {
  width: 100%;
}

@media screen and (max-width: 1220px) {
  .awards-ml-wrapper {
    margin-left: 50px;
  }
  .awards-vision {
    padding: 0px 50px;
  }
  .awards-news[data-v-d2f068a8] {
    padding: 0px 50px;
  }
}

@media screen and (max-width: 499px) {
  .awards {
    overflow-y: unset;
    overflow-x: clip;
  }
  .awards-main {
    height: unset;
    flex-direction: column;
  }

  .awards-ml-wrapper {
    margin-left: 14px;
  }

  .awards-ml-wrapper img {
    height: 100px;
  }

  .awards-ml-wrapper h1 {
    font-size: 36px;
    line-height: 55px;
  }

  .awards-ml-wrapper h4 {
    font-size: 18px;
  }

  .awards-main-right img {
    padding: 20px 40px 40px 40px;
  }

  .awards-vision {
    padding: 0px 14px;
  }

  .awards-vision h2 {
    font-size: 30px;
  }

  .awards-vcards-container {
    flex-direction: column;
  }

  .awards-vcard h3 {
    margin: 20px 0px 10px 0px;
    font-size: 20px;
  }
  .awards-vcard p{
    padding-right: 0px;
    font-size: 16px;
    line-height: 20px;
  }
  .awards-vcard {
    padding-right: 0px;
  }
  .awards-vcard .awards-vcard-img {
    margin-top: 20px;
  }
  .awards-recog-container {
    display: flex;
    flex-direction: column;
  }
  .awards-rcard {
    padding-right: 0px;
  }
  .awards-rcard h3{
    font-size: 20px;
  }
  .awards-rcard:nth-child(odd) p {
    padding-right: 0px;
  }
  .awards-recog-container img {
    width: 100%;
  }
  .awards-news{
    padding: 0px 14px;
  }
  .awards-news-container {
    display: flex;
    flex-direction: column;
  }
  .awards-news-container{
    margin-top: 0px;
    margin-bottom: 30px;
  }
  .awards-news-card {
    margin: 0px 0px 30px 0px;
  }
  .awards-news-card {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
  }
  .awards-nc-right {
    padding-left: 0px;
  }
  .awards-nc-img img{
    width: 85%;
  }
  .awards-news-img {
    flex-direction: column;
  }
}</style>
