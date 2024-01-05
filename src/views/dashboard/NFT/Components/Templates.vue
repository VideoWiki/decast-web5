<template>
  <div>
    <button
      v-bind:class="{ 'mr-8 ': vc_Details, '': !vc_Details }"
      class="whiteBtn font-sans lg:text-lg cursor mx-1 p-4 w-20"
      @click="showTemplates = true"
    >
      Templates
    </button>
    <vs-popup
      ref="Templates"
      :active.sync="showTemplates"
      title="Invite templates"
    >
      <div class="p-2">
        <h5 class="my-3">Invite templates</h5>
        <p>Invite templates for your attendees</p>
        <div class="w-full mt-5 flex flex-wrap">
          <div class="flex w-full">
            <div class="w-full mx-1">
              <label class="m-0">
                <span class="label-role label"> Role </span>
              </label>

              <vs-collapse
                open-click
                class="selectType form-group w-full normal select-roles-2"
                id="userType"
              >
                <vs-collapse-item>
                  <div
                    slot="header"
                    style="padding: 0px"
                    class="flex flex-wrap items-center"
                    @click="closeDropDown"
                  >
                    {{ this.userRoleLabel }}
                  </div>
                  <div class="flex flex-wrap justify-center items-center">
                    <div
                      :key="index"
                      @click="
                        (viewer_mode == false && item.value == 'viewer') ||
                        ((stream_urls == null || stream_urls.length <= 2) &&
                          item.value == 'spectator')
                          ? disabledOption()
                          : selectUserRole(item.value, item.text)
                      "
                      class="mb-2 select-roles-item-hover"
                      style="width: 100%"
                      v-for="(item, index) in userType"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                </vs-collapse-item>
              </vs-collapse>
            </div>
            <div class="example w-full mx-1">
              <p>Subject</p>
              <input
                type="text"
                style="
                  height: 45px;
                  border: 1px solid #d2d2d2;
                  padding: 10px 15px;
                  border-radius: 5px;
                "
                v-model="subject"
              />
            </div>
          </div>
        </div>
        <div class="example my-4">
          <p class="label">Body</p>
          <quill-editor
            class="editor"
            ref="myTextEditor"
            :value="body"
            :options="bodyEditorOption"
            @change="onBodyChange"
          >
          </quill-editor>
        </div>

        <label class="ToolTip">
          <span class="label-role">
            <vs-button @click="resetTemplate">
              <vs-icon
                icon-pack="feather"
                icon="icon-refresh-cw"
                size="16px"
                rounded="true"
                style="align-self: flex-end"
              ></vs-icon>
            </vs-button>
          </span>
          <span class="ToolTiptext">
            <p>Reset template</p>
          </span>
        </label>

        <button
          @click="saveTemplate"
          class="whiteBtn text-base cursor lg:text-lg mx-1 mt-12 w-5/12"
        >
          Save the Template
        </button>
        <vs-button
          @click="sendTestEmail"
          class="text-white text-base lg:text-lg mx-1 mt-12 airdrop-btn w-5/12"
        >
          Send Test Email
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { quillEditor } from 'vue-quill-editor';
import { tippy } from 'vue-tippy';
// import theme style
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
  name: 'quill-example-snow',
  title: 'Theme: snow',
  components: {
    quillEditor,
    tippy,
  },
  props: ['userType', 'stream_urls', 'viewer_mode', 'vc_Details'],
  data() {
    return {
      userRoleLabel: 'Participant',
      showTemplates: false,
      role: 'participant',
      templates: {},
      subjectEditorOption: {
        modules: {
          toolbar: false,
        },
      },
      bodyEditorOption: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            [
              'bold',
              'italic',
              'underline',
              'blockquote',
              { header: 1 },
              { header: 2 },
              { list: 'ordered' },
              { list: 'bullet' },
              { align: [] },
              { color: [] },
              { background: [] },
              'link',
            ],
          ],
        },
      },
      subject: '',
      body: ``,
    };
  },
  async mounted() {
    console.log('this is Quill instance:', this.editor);
    this.getTemplate(this.role);
    this.$refs.Templates.$el.childNodes[1].childNodes[0].style.display = 'none';
    this.$refs.Templates.$el.childNodes[1].style.width = '400px';
  },
  methods: {
    closeDropDown() {
      console.log('Clicked On Drop Down');
    },
    onBodyChange: debounce(function (value) {
      this.body = value.html;
      console.log(value);
    }, 466),
    sendTestEmail() {
      this.$vs.loading();
      var payload = {
        role: this.role,
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/sendTestEmail', payload)
        .then((res) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: 'Email Send Successfully',
            text: 'Email Send to ' + this.$store.state.AppActiveUser.email,
            color: 'success',
          });
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: e.response.data.message,
            color: 'danger',
          });
        });
    },
    resetTemplate() {
      this.$vs.loading();
      var payload = {
        role: this.role,
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/resetTemplate', payload)
        .then((res) => {
          this.getTemplate(this.role);
          this.$vs.notify({
            time: 3000,
            title: 'Template Reset Success',
            text: 'Template returns to its normal form',
            color: 'success',
          });
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: e.response.data.message,
            color: 'danger',
          });
        });
    },
    getTemplate(role) {
      this.$vs.loading();
      var payload = {
        role: role,
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/getTemplate', payload)
        .then((res) => {
          this.$vs.loading.close();
          console.log(res.data);
          this.subject = res.data.data.subject;
          this.body = res.data.data.body;
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: e.response.data.message,
            color: 'danger',
          });
        });
    },
    saveTemplate() {
      this.$vs.loading();
      var data = JSON.stringify({
        cast_id: this.$route.params.session_key,
        role: this.role,
        subject: this.subject,
        body: this.body,
      });
      this.$store
        .dispatch('studio/setTemplate', data)
        .then((res) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: 'Success',
            text: 'Template Saved',
            color: 'success',
          });
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 3000,
            title: e.response.data.message,
            color: 'danger',
          });
        });
    },
    disabledOption() {
      this.$vs.notify({
        time: 6000,
        title: 'Role Disabled',
        text: 'Viewer Role is only enabled if viewer mode is enabled in step four and Spectator role is ony valid if streaming in step three is enabled. ',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning',
      });
    },
    selectUserRole(x, y) {
      if (this.role === x) {
        return;
      }
      this.role = x;
      this.userRoleLabel = y;
      document.getElementById('userType').click();
      this.$refs.userType.click();
      this.getTemplate(this.role);
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-weight: 500;
  font-size: 15px;
}
.example {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .editor {
    height: 10rem;
    width: 98.5%;
    margin: auto;
    font-size: 13px;
    // overflow: hidden;
  }
}
.ql-toolbar.ql-snow,
.ql-container.ql-snow {
  border-radius: 5px;
}

.ToolTip {
  position: relative;
  display: inline-block;
}
.ToolTip .ToolTiptext {
  visibility: hidden;
  width: 100%;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1000;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.ToolTip:hover .ToolTiptext {
  padding: 5px;
  margin-left: -50px;
  width: 250%;
  margin: 5px;
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}
.ToolTip .ToolTiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 25%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}
</style>
