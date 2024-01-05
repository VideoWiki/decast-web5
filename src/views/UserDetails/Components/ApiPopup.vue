<template>
  <span>
    <button
      class="whiteBtn cursor-pointer mx-4"
      @click="getKey"
      content="Get Cast Info"
      v-tippy="{ placement: 'top', arrow: true }"
    >
      <span></span>
      <vs-icon
        icon-pack="feather"
        icon="icon-code  "
        size="17px"
        rounded="true"
        style="align-self: center"
      >
      </vs-icon>
    </button>
    <vs-popup ref="Code" :active.sync="showCode" title="Invite templates">
      <div class="p-4 flex code">
        <div class="sm:w-1/2 w-full px-8">
          <h1 class="text-center pb-8">Event Data Retrieval API</h1>
          <p class="text-justify">
            The Event Information API endpoint provides comprehensive details
            about a specific event. Users can retrieve event-specific
            information by sending a GET request with the event ID as a
            parameter. It includes details such as the event title, description,
            date, time, attendees and etc. Ensure proper authentication and
            authorization to access the API endpoint. <br />
          </p>
        </div>
        <div class="sm:w-1/2 px-3 w-full">
          <div class="bg-black flex Btn relative">
            <div>
              <vs-tabs v-model="tab">
                <vs-tab label="Curl">
                  <div class="text font-medium py-8">
                    <p>curl -X GET \</p>
                    <p>
                      <span class="green"
                        >"{{ url }}/api/get/cast/information/?cast_id={{
                          $route.params.session_key +
                          '&apikey=' +
                          key +
                          '&full_info=false'
                        }}"</span
                      >
                    </p>
                  </div>
                </vs-tab>
                <vs-tab label="Axios">
                  <div class="text font-medium px-4 py-8">
                    <p>
                      <span class="blue">import</span> axios
                      <span class="blue"></span>from
                      <span class="green">'axios'</span>
                    </p>
                    <p><span class="orange">axios</span>({</p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method:
                      <span class="green">'get'</span>,
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url:
                      <span class="green">
                        '{{
                          url +
                          '/api/get/cast/information/?cast_id=' +
                          $route.params.session_key +
                          '&apikey=' +
                          key +
                          '&full_info=false'
                        }}'</span
                      >,
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</p>
                    <p>
                      .<span class="orange">then</span>(res<span class="voilet"
                        >=></span
                      >{
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(res.data)</p>
                    <p>})</p>
                    <p>.<span class="orange">catch</span>(e=>{</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(e)</p>
                    <p>})</p>
                  </div>
                </vs-tab>
              </vs-tabs>
            </div>
            <button class="pos copy cursor-pointer" @click="copy">
              <vs-icon
                icon-pack="feather"
                icon="icon-clipboard"
                size="17px"
                rounded="true"
                style="align-self: center"
              >
              </vs-icon>
            </button>
          </div>
        </div>
      </div>
    </vs-popup>
  </span>
</template>

<script>
import constants from '../../../../constant';
export default {
  data() {
    return {
      key: '',
      url: constants.apiCastUrl,
      disabled: false,
      showCode: false,
      curl: false,
      tab: 0,
    };
  },
  mounted() {
    this.$refs.Code.$el.childNodes[1].childNodes[0].style.display = 'none';
    this.$refs.Code.$el.childNodes[1].style.width = '800px';
  },
  methods: {
    generateKey() {
      this.$store
        .dispatch(
          'studio/generateKey',
          this.$store.state.AppActiveUser.username
        )
        .then((res) => {
          this.key = res.api_key;
          this.showCode = true;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    getKey() {
      // this.showCode = true;
      if (this.key !== '' && this.key) {
        this.showCode = true;
        return;
      }
      this.$vs.loading();
      this.$store
        .dispatch('studio/getKey', this.$store.state.AppActiveUser.username)
        .then((res) => {
          if (res.api_key === null) {
            this.generateKey();
            return;
          }
          this.key = res.api_key;
          this.showCode = true;
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 400) {
            this.generateKey();
          } else {
            this.$vs.notify({
              title: 'Wrong Credentials',
              text: 'Please login again',
              color: 'danger',
            });
          }
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    copy() {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 3000);
      var code;
      if (!this.tab) {
        code = `curl -X GET \
                "${this.url}/api/get/cast/information/?cast_id=${this.$route.params.session_key}&apikey=${this.key}&full_info=false"`;
      } else {
        code = `
            import axios form 'axios'
            axios({
                method: 'GET',
                url: '${this.url}/api/get/cast/information/?cast_id=${this.$route.params.session_key}&apikey=${this.key}&full_info=false',
            })
            .then(res=>{
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        `;
      }
      navigator.clipboard.writeText(code);
      this.$vs.notify({
        title: 'Copied',
        text: 'Code redy to excecute',
        color: 'success',
      });
    },
  },
};
</script>

<style scoped>
.Btn {
  border-radius: 5px;
}

* {
  font-family: sans-serif, 'feather' !important;
}
.language-javascript {
  display: none;
}
.con-vs-popup .vs-popup {
  width: 600px !important;
  min-width: calc(100% - 30%) !important;
  min-height: 20% !important;
}

.text {
  word-wrap: break-word;
  background-color: transparent;
  overflow: auto !important;
  width: 54%;
  height: 30rem;
  color: #99a6b0;
  letter-spacing: 1.5px;
}

.pos {
  position: absolute;
  top: 4px;
  right: 5px;
}

.orange {
  color: #e26a34;
}

.copy {
  background: transparent;
  color: #99a6b0;
  border: none;
}

.green {
  color: #70bf8e;
}

.voilet {
  color: #b489b5;
}

.blue {
  color: #67cac8;
}

.gey {
  color: #545a5a;
}

.code {
  overflow: hidden !important;
}

@media screen and (max-width: 800px) {
  .text {
    width: 45%;
  }
}

@media screen and (max-width: 700px) {
  .text {
    width: 35%;
  }
}

@media screen and (max-width: 576px) {
  .code {
    flex-direction: column;
  }

  .text {
    padding: 20px;
    width: 50%;
  }
}

@media screen and (max-width: 425px) {
  .text {
    width: 40%;
  }
} ;
</style>
