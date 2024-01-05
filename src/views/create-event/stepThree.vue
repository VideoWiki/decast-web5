<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap form-group">
        <div class="flex items-center">
          <img
            class="step-third-logo"
            src="@/assets/images/logo/logo.svg"
            alt="Videowiki"
          />
          <label class="mb-0">VideoWiki Streaming</label>
        </div>
        <vs-switch
          v-model="stepThreeProps.vw_stream"
          v-on:change="toggleStream()"
        />
        <div class="w-full ml-2 mt-2">
          For streaming the event on VideoWiki, choose this option and you will
          receive the stream page address in your email.
        </div>
        <div v-if="stepThreeProps.vw_stream" class="w-full">
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <label class="m-0">
                  <span class="flex flex-wrap">
                    Stream Cast Privately &nbsp;

                    <tippy
                      content="Private cast restricts stream access to specific users. "
                      v-tippy="{ placement: 'top', arrow: true }"
                    >
                      <span></span>
                      <vs-icon
                        icon-pack="feather"
                        icon="icon-info"
                        size="12px"
                        rounded="true"
                        style="align-self: flex-end"
                      ></vs-icon></tippy></span
                ></label>
                <div>
                  <vs-switch
                    v-model="publicStream"
                    v-on:change="streamType()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap form-group">
        <div class="flex items-center">
          <label class="mb-0">Third Party Streaming</label>
        </div>
        <vs-switch v-model="showStream" />
        <div v-if="showStream" class="w-full">
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
                  <div
                    class="vx-card no-shadow card-border p-5 flex flex-wrap form-group"
                  >
                    <div class="flex items-center">
                      <img
                        class="step-third-logo"
                        src="@/assets/images/logo/youtube1.png"
                        alt="Youtube"
                      />
                      <label class="mb-0">YouTube</label>
                    </div>
                    <vs-switch
                      v-model="stepThreeProps.record_youtube"
                      v-on:change="toggleStream()"
                    />
                    <div class="w-full ml-2 mt-2">
                      You can stream your event on YouTube. - Server URL
                      address: - Stream name/key:
                    </div>
                    <div v-if="stepThreeProps.record_youtube" class="w-full">
                      <hr class="w-full mt-5 border-light" />
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Youtube RTMP Url"
                          class="w-full form-group"
                          v-model="stepThreeProps.youtube_rtmp_url"
                          v-on:change="valueCheck()"
                        />
                      </div>
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Youtube Secret Key"
                          class="w-full form-group"
                          v-model="stepThreeProps.youtube_secret_key"
                          v-on:change="valueCheck()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
                  <div
                    class="vx-card no-shadow card-border p-5 flex flex-wrap form-group"
                  >
                    <div class="flex items-center">
                      <img
                        class="step-third-logo"
                        src="@/assets/images/logo/facebook.png"
                        alt="Facebook"
                      />
                      <label class="mb-0">Facebook</label>
                    </div>
                    <vs-switch
                      v-model="stepThreeProps.record_facebook"
                      v-on:change="toggleStream()"
                    />
                    <div class="w-full ml-2 mt-2">
                      You can stream your event on Facebook. - Server URL
                      address: - Stream name/key:
                    </div>
                    <div v-if="stepThreeProps.record_facebook" class="w-full">
                      <hr class="w-full mt-5 border-light" />
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Facebook RTMP Url"
                          class="w-full form-group"
                          v-model="stepThreeProps.facebook_rtmp_url"
                          v-on:change="valueCheck()"
                        />
                      </div>
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Facebook Secret Key"
                          class="w-full form-group"
                          v-model="stepThreeProps.facebook_secret_key"
                          v-on:change="valueCheck()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
                  <div
                    class="vx-card no-shadow card-border p-5 flex flex-wrap form-group"
                  >
                    <div class="flex items-center">
                      <img
                        class="step-third-logo"
                        src="@/assets/images/logo/twitch.png"
                        alt="Twitch"
                      />
                      <label class="mb-0">Twitch</label>
                    </div>
                    <vs-switch
                      v-model="stepThreeProps.record_twich"
                      v-on:change="toggleStream()"
                    />
                    <div class="w-full ml-2 mt-2">
                      You can stream your event on Twitch. - Server URL address:
                      - Stream name/key:
                    </div>
                    <div v-if="stepThreeProps.record_twich" class="w-full">
                      <hr class="w-full mt-5 border-light" />
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Twitch RTMP Url"
                          class="w-full form-group"
                          v-model="stepThreeProps.twich__rtmp_url"
                          v-on:change="valueCheck()"
                        />
                      </div>
                      <div class="vx-col md:w-1/1 w-full mt-5">
                        <vs-input
                          label="Twitch Secret Key "
                          class="w-full form-group"
                          v-model="stepThreeProps.twicth_secret_key"
                          v-on:change="valueCheck()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: '',
  props: ['stepThreeProps'],
  data() {
    return {
      accessRestriction: false,
      stream_type_error: false,
      publicStream: false,
      privateStream: false,
      public_stream: true,
      userName: '',
      showStream: false,
      userNameError: false,
      userEmailError: false,
      userEmail: '',
      userRole: 'attendee',
      userType: [
        { text: 'Attendee', value: 'attendee' },
        { text: 'Moderator', value: 'moderator' },
      ],
    };
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    streamType() {
      this.publicStream === false ? (this.accessRestriction = false) : '';
      this.stepThreeProps.public_stream = !this.publicStream;
    },
    toggleStream() {
      if (
        this.stepThreeProps.record_facebook ||
        this.stepThreeProps.record_twich ||
        this.stepThreeProps.record_youtube ||
        this.stepThreeProps.vw_stream
      ) {
        this.stepThreeProps.is_streaming = true;
      } else {
        this.stepThreeProps.is_streaming = false;
      }
      if (this.stepThreeProps.vw_stream) {
        this.stepThreeProps.public_stream = !this.publicStream;
        if ((this.publicStream && this.privateStream) === false) {
          this.stepThreeProps.stream_type_error = true;
        } else {
          this.stepThreeProps.stream_type_error = false;
        }
      } else {
        this.stepThreeProps.public_stream = false;
      }
      if (!this.stepThreeProps.record_facebook) {
        this.stepThreeProps.facebook_secret_key = '';
        this.stepThreeProps.facebook_rtmp_url = '';
      }
      if (!this.stepThreeProps.record_twich) {
        this.stepThreeProps.twich__rtmp_url = '';
        this.stepThreeProps.twicth_secret_key = '';
      }
      if (!this.stepThreeProps.record_youtube) {
        this.stepThreeProps.youtube_rtmp_url = '';
        this.stepThreeProps.youtube_secret_key = '';
      }
    },
    valueCheck() {
      if (
        this.stepThreeProps.youtube_secret_key.length > 0 &&
        this.stepThreeProps.record_youtube === true
      ) {
        this.stepThreeProps.youtube_stream_url =
          this.stepThreeProps.youtube_rtmp_url +
          '/' +
          this.stepThreeProps.youtube_secret_key;
      } else {
        this.stepThreeProps.youtube_stream_url = '';
      }
      if (
        this.stepThreeProps.facebook_secret_key.length > 0 &&
        this.stepThreeProps.record_facebook === true
      ) {
        this.stepThreeProps.facebook_stream_url =
          this.stepThreeProps.facebook_rtmp_url +
          '/' +
          this.stepThreeProps.facebook_secret_key;
      } else {
        this.stepThreeProps.facebook_stream_url = '';
      }
      if (
        this.stepThreeProps.twicth_secret_key.length > 0 &&
        this.stepThreeProps.record_twich === true
      ) {
        this.stepThreeProps.twitch_stream_url =
          this.stepThreeProps.twich__rtmp_url +
          '/' +
          this.stepThreeProps.twicth_secret_key;
      } else this.stepThreeProps.twitch_stream_url = '';
    },
  },
};
</script>
<style scoped>
.step-third-logo {
  z-index: 1;
  padding: 0px;
  margin: 0px;
  height: 3em;
}
</style>
