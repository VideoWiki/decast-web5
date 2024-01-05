<template>
  <div>
    <form v-if="currentTabIndex === 0">
      <vx-card :title="$t('studio.text.t1')" class="text-window">
        <div class="text-left">
          <h6>{{ $t('studio.text.t2') }}</h6>
          <span class="text-danger text-sm" v-show="errors.has('title')">{{
            errors.first('title')
          }}</span>
          <input
            type="text"
            id="title"
            name="title"
            size="large"
            :placeholder="$t('studio.text.t2')"
            v-model="title"
            class="w-full mt-3 mb-3 title2"
            v-validate="'required'"
            autocomplete="off"
          />
          <div class="flex items-start -mx-2">
            <h6 class="px-2">{{ $t('studio.text.t4') }}</h6>
            <div class="px-2">
              <LanguageSelect v-model="srcLang" />
            </div>
            <div class="px-2">
              <vs-dropdown
                vs-custom-content
                vs-trigger-click
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer flex items-center"
                  style="transform: translate(0px, -2px)"
                >
                  <span class="font-bold">{{
                    breakTypeOptions[breakType]
                  }}</span>
                  <vs-icon icon-pack="feather" icon="icon icon-chevron-down" />
                </span>
                <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
                  <vs-dropdown-item @click="breakType = 'short'">
                    &nbsp;Short Scenes</vs-dropdown-item
                  >
                  <vs-dropdown-item @click="breakType = 'long'">
                    &nbsp;Long Scenes</vs-dropdown-item
                  >
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>
          <span class="text-danger text-sm" v-show="errors.has('script')">{{
            errors.first('script')
          }}</span>
          <textarea
            type="text"
            id="script"
            name="script"
            :placeholder="$t('studio.text.t5')"
            v-model="script"
            v-validate="'required'"
            class="w-full mt-3 mb-3 video-script2"
          >
          </textarea>
        </div>
        <div class="items-center">
          <div class="w-full items-center">
            <vs-button color="primary" @click.prevent="handleSubmit">{{
              $t('studio.text.t6')
            }}</vs-button>
          </div>
        </div>
      </vx-card>
      <!--<div style="margin-bottom: 150px"></div>-->
    </form>
    <DocumentUpload v-else-if="currentTabIndex === 1" />
    <ExternalUrl v-else />
  </div>
</template>

<script>
import LanguageSelect from './components/LanguageSelect.vue';
import DocumentUpload from './components/DocumentUpload';
import ExternalUrl from './components/ExternalUrl';

export default {
  components: {
    LanguageSelect,
    DocumentUpload,
    ExternalUrl,
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        script: '',
      },

      options: [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'pt', label: 'Portugese' },
      ],
      breakType: 'short',
      breakTypeOptions: {
        long: 'Long Scenes',
        short: 'Short Scenes',
      },
    };
  },
  computed: {
    script: {
      get() {
        return this.$store.state.studio.video.script;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'script',
          value: value,
        });
      },
    },
    srcLang: {
      get() {
        return this.$store.state.studio.video.language;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'language',
          value: value,
        });
      },
    },
    title: {
      get() {
        return this.$store.state.studio.video.title;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'title',
          value: value,
        });
      },
    },
    description: {
      get() {
        return this.$store.state.studio.video.description;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'description',
          value: value,
        });
      },
    },
    currentTabIndex() {
      return this.$store.state.studio.tabIndex;
    },
  },
  created() {
    if (
      !this.$route.params.videoId &&
      Object.keys(this.$route.query).length === 0 &&
      this.title === '' &&
      this.script === ''
    ) {
      const storedForm = JSON.parse(localStorage.getItem('form'));
      if (storedForm) {
        this.title = storedForm.title;
        this.script = storedForm.script;
      }
    }
    window.addEventListener('beforeunload', this.saveForm);
  },
  methods: {
    saveForm() {
      const form = {
        title: this.title,
        script: this.script,
      };
      localStorage.setItem('form', JSON.stringify(form));
    },
    handleSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createScenes();
        } else {
          this.$vs.notify({
            title: 'Invalid Input',
            text: this.errors.has('title')
              ? 'Enter Video title'
              : 'Enter Video script',
            color: 'danger',
          });
        }
      });
    },
    createScenes() {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/sentenceDetection', this.breakType)
        .then((res) => {
          this.$store
            .dispatch('studio/videoSuggestions')
            .then((resVideos) => {
              this.$Progress.finish();
              this.$vs.loading.close();
              this.$store.commit('studio/resetState');
            })
            .catch((err) => {
              console.log(err);
              this.$Progress.fail();
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Error Occured',
                text: 'Video Suggestions',
                color: 'danger',
              });
            });
        })
        .catch((err) => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Sentence Detection',
            color: 'danger',
          });
        });
    },
  },
  beforeDestroy() {
    this.saveForm();
    window.removeEventListener('beforeunload', this.saveForm);
  },
};
</script>

<style scoped>
[contentEditable='true']:empty:not(:focus):before {
  content: attr(data-text);
}
::placeholder {
  color: #626262;
  opacity: 0.7;
}
.title2 {
  height: 40px !important;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  border-radius: 5px;
  color: #626262;
  opacity: 1; /* Firefox */
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.description2 {
  height: 60px !important;
  border-radius: 5px;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  color: #626262;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.video-script2 {
  height: 250px !important;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  border-radius: 5px;
  color: #626262;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.video-script.vs-con-textarea >>> .vs-textarea {
  height: 250px !important;
}

.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}

.items-left {
  text-align: left;
  text-align: -moz-left;
  text-align: -webkit-left;
}

.items-right {
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
}

/*.text-window {
  height: 33rem;
  margin-top: calc(100% - 33rem);
} */

.text-window .vx-card {
  /*height: 20rem;*/
  border: 0.5px solid gray;
}

.text-window .vx-card div {
  padding: 0.2rem;
  height: 15rem;
  overflow-y: auto;
}
.text-window .vx-card {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
