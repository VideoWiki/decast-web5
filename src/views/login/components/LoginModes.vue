<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h1 class="heading "><b>Login VideoWiki</b></h1>
    <h2 :style="{ color: currentButton.color }">
      {{ currentButton.text }}
    </h2>
    <p style="color: black; font-size: 16px">
      {{ currentButton.description }}
    </p>
    <div>
      <Restricted />
    </div>
  </div>
</template>

<script>
import Restricted from './Restricted.vue';
export default {
  name: 'LoginModes',
  components: {
    Restricted,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [
        {
          link: 'Login',
          color: '#DA9921',
          percent: '0%',
        },
        {
          text: 'Web2',
          link: 'Google Login',
          color: '#4CD964',
          percent: '50%',
          description: 'Login using your Social Profile',
        },
        {
          text: 'Web3',
          link: 'Wallet Login',
          color: '#F30200',
          percent: '100%',
          description: 'Login With Crypto Wallet',
        },
      ],
    },
    linkMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentButton: '',
      currentI: 0,
      proxyValue: '',
      msg: '',
    };
  },
  computed: {
    currentValue() {
      if (this.linkMode) {
        return this.$route.name;
      }
      return this.proxyValue;
    },
  },
  watch: {
    proxyValue() {
      this.getcurrent();
      this.$emit('input', this.currentValue);
    },
    $route() {
      // doesnt colors the slider appropiately on using back/forward keys without this
      this.getcurrent();
    },
  },
  created() {
    if (!this.linkMode) {
      this.proxyValue = this.value;
    }
    this.getcurrent();
  },
  methods: {
    nextStep(link) {
      if (this.linkMode) {
        this.$router.push({ name: link }, () => {
          this.proxyValue = link;
        });
      } else {
        this.proxyValue = link;
      }
    },
    getcurrent() {
      for (let i = 0; i < this.buttons.length; i += 1) {
        const button = this.buttons[i];
        if (this.currentValue === button.link) {
          this.currentI = i;
          this.currentButton = button;
        }
      }
    },
  },
};
</script>

<style scoped>
button {
  border-radius: 15px;
  cursor: pointer;
}
.heading {
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
  text-align: center;
  margin-top: 0%;
  padding-top: 0%;
}
</style>

<style lang="scss">
.tooltip {
  // ...

  &.popover {
    $color: #000;

    .popover-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
.tooltip-arrow {
  z-index: 10000;
}
</style>
