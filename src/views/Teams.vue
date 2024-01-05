<template>
  <div>
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">{{ $t('Teams.title1') }}</h1>
        <p class="font-medium mb-base">
          {{ $t('Teams.title2') }}
        </p>
      </div>
      <div class="vx-row">
        <div
          class="vx-col w-full mx-auto md:w-1/3 lg:w-1/4 sm:w-1/2 mb-base"
          v-for="(member, idx) in $options.teamList"
          :key="idx"
        >
          <div class="flex max-height flex-wrap">
            <MemberCard :member="member" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <Map :memberList="$options.teamList" />
    </div>

    <div class="section bg-white">
      <div class="w-full">
        <div class="vx-card" style="height: 100%">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body flex flex-wrap justify-between">
              <div class="mb-6 w-full">
                <h3 class="mb-6 lg:text-left text-center">
                  {{ $t('Teams.join') }}
                </h3>
                <form id="volunteer-form">
                  <div class="vx-row -m-2">
                    <div class="vx-col w-1/2 p-2">
                      <div class="mb-4">
                        <h6>
                          {{ $t('Teams.name')
                          }}<span class="text-danger">*</span>
                        </h6>
                        <div class="h-2">
                          <span
                            class="text-danger text-sm"
                            v-show="errors.has('fullName')"
                            >{{ errors.first('fullName') }}</span
                          >
                        </div>
                      </div>

                      <vs-input
                        :placeholder="$t('Teams.name_p')"
                        v-validate="'required|alpha_spaces'"
                        name="fullName"
                        v-model="fullName"
                        class="w-full"
                      />
                    </div>
                    <div class="vx-col w-1/2 p-2">
                      <div class="mb-4">
                        <h6>
                          {{ $t('Teams.email')
                          }}<span class="text-danger">*</span>
                        </h6>
                        <div class="h-2">
                          <span
                            class="text-danger text-sm"
                            v-show="errors.has('email')"
                            >{{ errors.first('email') }}</span
                          >
                        </div>
                      </div>

                      <vs-input
                        class="w-full"
                        type="email"
                        v-validate="'required|email'"
                        name="email"
                        v-model="email"
                        :placeholder="$t('Teams.email_p')"
                      />
                    </div>
                    <div class="vx-col w-1/2 p-2">
                      <div class="mb-4">
                        <h6>
                          {{ $t('Teams.contact')
                          }}<span class="text-danger">*</span>
                        </h6>
                        <div class="h-2">
                          <span
                            class="text-danger text-sm"
                            v-show="errors.has('contact')"
                            >{{ errors.first('contact') }}</span
                          >
                        </div>
                      </div>

                      <vs-input
                        class="w-full"
                        type="tel"
                        pattern="[0-9]{10}"
                        v-validate="'required|numeric|min:10'"
                        name="contact"
                        v-model="mob"
                        :placeholder="$t('Teams.contact_p')"
                      />
                    </div>
                    <div class="vx-col w-1/2 p-2">
                      <div class="mb-4">
                        <h6>
                          {{ $t('Teams.resume')
                          }}<span class="text-danger">*</span>
                        </h6>
                        <div class="h-2">
                          <span
                            class="text-danger text-sm"
                            v-show="errors.has('resume')"
                            >{{ errors.first('resume') }}</span
                          >
                        </div>
                      </div>
                      <vx-input-group class="mb-base">
                        <vs-input
                          :placeholder="$t('Teams.resume_p')"
                          :value="selectedFile.name"
                          disabled
                        />
                        <input
                          type="file"
                          class="hidden"
                          ref="FileInput"
                          accept=".pdf"
                          name="resume"
                          v-validate="'required'"
                          @change="selectFile"
                        />
                        <template slot="append">
                          <div class="append-text btn-addon">
                            <vs-button
                              class="bg-custom-purple"
                              @click="$refs.FileInput.click()"
                              >{{ $t('Teams.choose') }}</vs-button
                            >
                          </div>
                        </template>
                      </vx-input-group>
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <h6 class="mb-4">{{ $t('Teams.description') }}</h6>
                      <textarea
                        class="message-box"
                        v-model="description"
                        :placeholder="$t('Teams.description_p')"
                      />
                    </div>
                  </div>
                  <div class="text-center">
                    <vs-button
                      type="filled"
                      class="font-bold text-base bg-custom-purple"
                      @click.prevent="handleSubmitForm"
                      :disabled="submitInProgress"
                      >{{ $t('Teams.submit') }}</vs-button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import Map from './components/Map';
import NewsLetter from './components/NewsLetter';
import { teamList } from '@/assets/data';
import MemberCard from './components/MemberCard';
import { ajaxCallMixin } from '@/http/HttpCommon';
export default {
  name: 'Teams',
  mixins: [ajaxCallMixin],
  teamList,
  components: {
    Map,
    NewsLetter,
    MemberCard,
  },
  data() {
    return {
      fullName: '',
      email: '',
      mob: '',
      description: '',
      selectedFile: '',
      submitInProgress: false,
    };
  },
  methods: {
    selectFile(event) {
      this.selectedFile = event.target.files[0];
    },
    handleSubmitForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const data = {};
          data.name = this.fullName;
          data.email = this.email;
          data.contact = this.mob;
          data.description = this.description;
          data.resume = this.selectedFile;
          const url = '/community/volunteer/';
          this.submitInProgress = true;
          this.ajaxCall(url, data, this.callbackSubmit);
        } else {
          this.$vs.notify({
            title: this.$t('Teams.invalid.title'),
            text: this.$t('Teams.invalid.text'),
            color: 'danger',
          });
        }
      });
    },
    callbackSubmit(apiResponse) {
      if (apiResponse.status === 409) {
        this.$vs.notify({
          title: this.$t('Teams.409.title'),
          text: this.$t('Teams.409.text'),
          color: 'warning',
        });
      } else if (apiResponse.status === 200) {
        this.$vs.notify({
          title: this.$t('Teams.200.title'),
          text: this.$t('Teams.200.text'),
          color: 'success',
        });
        this.fullName = '';
        this.email = '';
        this.mob = '';
        this.selectedFile = '';
        this.description = '';
        this.$validator.reset();
      }
      this.submitInProgress = false;
    },
  },
};
</script>

<style scoped>
.section {
  padding: 8%;
  padding-top: 16rem;
}

.message-box {
  height: 250px !important;
  /* border: none; */
  /* background: #f3f4f6; */
  border-color: rgba(0, 0, 0, 0.2);
  font-size: 14px !important;
  overflow-y: auto;
  border-radius: 6px;
  color: #626262;
  width: 100%;
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
.base-input {
  height: 45px;
  background: #f3f4f6;
  border-radius: 6px;
  border: none;
  padding: 1rem;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 12px;
}
.address-box {
  background: #f4f5f7;
  border-radius: 8px;
}
.max-height {
  height: 100% !important;
}
</style>
