<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/1 w-full mt-5 form-group">
      <div class="form-group flex flex-wrap">
        <label>Cover <span class="text-danger">*</span></label>
        <label>{{ coverFileName }}</label>
      </div>
      <div class="centerx">
        <vs-popup
          title="Crop you Cover Image"
          :active.sync="coverPopup"
          ref="coverPopup"
        >
          <div>
            <coverCropper :closepop="closepop" :coverimage="coverimage" />
          </div>
        </vs-popup>
      </div>
      <div
        class="upload-btn-wrapper cursor-pointer items-center w-full"
        ref="coverImg"
        @drop.prevent="dragAndDrop"
        @dragenter.prevent=""
        @dragover.prevent=""
        @click="inp"
      >
        <button
          class="btn w-full border px-8 pt-7 pb-7"
          id="upload-cover-container-step2"
          :class="{ 'upload-success': upload_success }"
        >
          <span
            :class="{
              invisible: !this.stepTwoProps.showText,
              '': this.stepTwoProps.showText,
            }"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-upload-cloud"
              size="32px"
              rounded="true"
              class="upload mt-4"
            >
            </vs-icon>
            <br />
            <div class="mb-6 mt-6">
              <span class="font-bold purple">
                Click to {{ upload_success ? 'change ' : 'upload ' }}
              </span>
              or drag and drop
              <br />
              <span class=""> png , jpeg or jpg</span>
            </div>
          </span>
        </button>
        <input
          type="file"
          name="cover file"
          id="coverfile"
          ref="coverfile"
          accept="image/*"
          @change="checkAspectRatio"
        />
      </div>
      <span
        class="text-danger text-sm mt-1"
        v-show="stepTwoProps.cover_image_error"
        >Cover Image field is required.</span
      >
    </div>
    <div class="vx-col md:w-3/4 w-full mt-5 form-group">
      <label>Choose Color</label>
      <div class="flex flex-wrap">
        <vs-button
          v-for="(item, index) in colors"
          :key="index"
          :color="item.value"
          :text-color="item.color"
          style="height: 52.49px; width: 52.48px"
          class="ml-1 mr-5 mb-6 p-5"
          @click.stop="setPrimaryColor(item.value)"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="item.text"
        >
          <feather-icon
            v-if="stepTwoProps.primary_color === item.value"
            icon="CheckCircleIcon"
            svgClasses="text-white w-5 h-5"
          />
        </vs-button>
        <vs-button
          class="medium button-class mb-4"
          title="Background Image"
          style="padding: 0px"
          @click.stop="modalProps.popupBackImageActive = true"
        >
          <img
            src="../../assets/images/create-event/image_2021_09_07T14_47_36_644Z.png"
            style="height: 52.49px; width: 52.48px"
        /></vs-button>
        <vs-input type="hidden" v-model="stepTwoProps.primary_color" />
      </div>
    </div>
    <div class="vx-col md:w-1/4 w-full mt-5 form-group">
      <label class="flex flex-wrap items-center space-between"
        >Brand Logo &nbsp;
        <span class="flex flex-wrap">
          <span></span>
          <vs-icon
            content="Choose your brand logo to be displayed on the event."
            v-tippy="{ placement: 'top', arrow: true }"
            icon-pack="feather"
            icon="icon-info"
            size="12px"
            rounded="true"
            style="align-self: flex-end"
          ></vs-icon>
        </span>
      </label>
      <div class="flex flex-wrap items-center w-full cursor-pointer">
        <div style="height: 52.49px; width: 52.48px" class="cursor-pointer">
          <div
            class="upload-btn-wrapper-logo items-center w-full cursor-pointer"
          >
            <button
              class="btnlogo"
              id="brand-logo-preview"
              @click="bLogo"
              :class="[{ 'logo-success': logo_success }, 'cursor-pointer']"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-upload"
                size="12px"
                rounded="true"
                color="#000000"
                impoer
                style="align-self: flex-end"
                class="upload-resume-icon-logo cursor-pointer"
              ></vs-icon>
            </button>
            <input
              class="cursor-pointer"
              type="file"
              name="Brand Logo"
              id="brandLogo"
              ref="brandLogo"
              v-on:change="uploadBrandLogo"
              accept="image/*"
            />
          </div>
        </div>
        <div class="ml-1">
          {{ this.logoFileName }}
        </div>
      </div>
    </div>
    <div
      class="vx-col md:w-1/1 w-full mt-5"
      v-if="(stepTwoProps.back_image = modalProps.backImage)"
    >
      <label>{{ stepTwoProps.back_image }}</label>
    </div>
    <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
      <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
        <div class="flex flex-wrap w-full form-group items-center">
          <label class="m-0">Advanced Options</label>
          <div>
            <vs-switch v-model="advanceOpts" />
          </div>
        </div>
        <hr v-if="advanceOpts" class="w-full mt-5 border-light" />
        <div v-if="advanceOpts" class="vx-row mt-5">
          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap">
            <vs-input
              id="bannerTxt"
              label="Banner Text"
              v-model="stepTwoProps.banner_text"
              class="w-full form-group"
              placeholder="Your banner text here"
            />
          </div>

          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap">
            <vs-input
              id="welcomeMsg"
              label="Welcome Message"
              v-model="stepTwoProps.welcome_text"
              class="w-full form-group"
              placeholder="Write welcome message here"
            />
          </div>

          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap">
            <vs-input
              id="moderatorOnlyMsg"
              label="Moderator Only Message"
              v-model="stepTwoProps.moderator_only_text"
              class="w-full form-group"
              placeholder="Write Moderator message here"
            />
          </div>

          <div class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap">
            <vs-select
              autocomplete
              class="selectType form-group w-full normal"
              label="Guest Policy"
              v-model="stepTwoProps.guest_policy"
              id="guest_policy"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in guestPolicy"
              />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap">
            <vs-input
              type="number"
              :min="15"
              id="duration"
              label="Cast Duration"
              v-model="stepTwoProps.duration"
              class="w-full form-group input-with-min"
              @blur="appendMin"
              placeholder="In Minutes"
            />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap">
            <vs-input
              id="logoutURL"
              label="Logout URL"
              v-model="stepTwoProps.logout_url"
              class="w-full form-group"
              placeholder="Enter your Logout url"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <vs-popup
      title="Choose Background Image"
      :active.sync="modalProps.popupBackImageActive"
    >
      <BackImageModal
        :modalProps="modalProps"
        :stepTwoProps="stepTwoProps"
        :closeBackImg="closeBackImg"
      />
    </vs-popup>
  </div>
</template>
<script>
// import { read } from 'fs';
import BackImageModal from './backImageModal.vue';
import coverCropper from './coverCropper.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: '',
  props: ['stepTwoProps'],
  components: {
    BackImageModal,
    coverCropper,
  },
  data() {
    return {
      imgName: '',
      coverimage: {},
      coverPopup: false,
      upload_success: false,
      logo_success: false,
      coverFileName: '',
      logoFileName: '',
      advanceOpts: false,
      modalProps: {
        popupBackImageActive: false,
        backImage: '',
      },
      colors: [
        { text: 'River Blue', value: '#3A74D0', color: '#FFFFFF' },
        { text: 'Forest Green', value: '#398C19', color: '#FFFFFF' },
        { text: 'Grassland Green', value: '#7FDA57', color: '#FFFFFF' },
        { text: 'Ocean Teal', value: '#00A2BF', color: '#FFFFFF' },
        { text: 'Space Purple', value: '#753FB5', color: '#FFFFFF' },
        { text: 'Solar Yellow', value: '#FBC73E', color: '#FFFFFF' },
        { text: 'Sunny Orange', value: '#FF6721', color: '#FFFFFF' },
        { text: 'Business Red', value: '#E00019', color: '#FFFFFF' },
        { text: 'Personal Pink', value: '#FF4177', color: '#FFFFFF' },
        { text: 'Machine Grey', value: '#B3B3B3', color: '#FFFFFF' },
      ],
      guestPolicy: [
        { text: 'Select a Guest Policy', value: '' },
        { text: 'Always Accept', value: 'ALWAYS_ACCEPT' },
        { text: 'Ask Moderator', value: 'ASK_MODERATOR' },
      ],
    };
  },
  validations: {
    back_image: { required },
  },
  mounted() {
    this.$refs.coverImg.addEventListener('mouseenter', () => {
      this.stepTwoProps.showText = true;
    });
    this.$refs.coverImg.addEventListener('mouseleave', () => {
      if (this.stepTwoProps.cover_image !== '')
        this.stepTwoProps.showText = false;
    });
    console.log('img ', this.stepTwoProps.cover_image);
    var x =
      this.stepTwoProps.cover_image === ''
        ? 'duded'
        : this.stepTwoProps.cover_image;
    if (this.stepTwoProps.cover_image) {
      console.log('yeh');
      document.getElementById(
        'upload-cover-container-step2'
      ).style.backgroundImage = `url(https://api.cast.video.wiki/media/${this.stepTwoProps.cover_image})`;
      this.upload_success = true;
    }
    if (this.stepTwoProps.logo) {
      document.getElementById('brand-logo-preview').style.backgroundImage =
        'url(' + this.stepTwoProps.logo + ')';
    }
    console.log(
      document.getElementById('upload-cover-container-step2').style
        .backgroundImage
    );
  },
  watch: {
    'stepTwoProps.cover_image': {
      handler: function (after, before) {
        // Changes detected. Do work...
        document.getElementById(
          'upload-cover-container-step2'
        ).style.backgroundImage = 'url(' + URL.createObjectURL(after) + ')';
      },
      deep: true,
    },

    'stepTwoProps.duration': function (newVal, oldVal) {
      if (newVal === '') {
        this.timeoutId = setTimeout(() => {
          this.stepTwoProps.duration = 60;
        }, 3000);
      } else {
        clearTimeout(this.timeoutId);
        if (newVal > 600) {
          this.stepTwoProps.duration = 600;
        }
      }
    },
    data() {
      return {
        timeoutId: null,
      };
    },
  },
  methods: {
    closeBackImg() {
      this.modalProps.popupBackImageActive = false;
    },
    closepop(file) {
      this.stepTwoProps.cover_image = file;
      document.getElementById(
        'upload-cover-container-step2'
      ).style.backgroundImage =
        'url(' + URL.createObjectURL(this.stepTwoProps.cover_image) + ')';
      this.coverPopup = false;
      this.coverFileName =
        this.imgName.length > 24
          ? this.imgName.slice(-24).concat('...')
          : this.imgName;
      this.$vs.notify({
        title: 'success',
        text: 'Image Uploaded',
        iconPack: 'feather',
        color: 'success',
      });
      this.covrImgURL(file);
    },
    covrImgURL(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {});
    },

    setPrimaryColor(color) {
      this.stepTwoProps.primary_color = color;
    },
    dragAndDrop(e) {
      const inputFiles =
        e.target.files || e.dataTransfer.files || this.$refs.coverfile.files;
      document.getElementById(
        'upload-cover-container-step2'
      ).style.backgroundImage =
        'url(' + URL.createObjectURL(inputFiles[0]) + ')';

      const reader = new FileReader();
      reader.readAsDataURL(inputFiles[0]);
      reader.addEventListener('load', () => {
        this.stepTwoProps.cover_image = reader.result;
      });
      this.coverFileName = inputFiles[0].name;
      const nameTruncer = inputFiles[0].name;

      this.coverFileName =
        nameTruncer.length > 24 ? nameTruncer.slice(-10) : nameTruncer;
      this.stepTwoProps.cover_image = inputFiles[0];
      this.stepTwoProps.cover_image_error = false;
      this.upload_success = true;
      this.stepTwoProps.showText = false;
    },
    inp() {
      this.$refs.coverfile.click();
    },
    bLogo() {
      this.$refs.brandLogo.click();
    },
    checkAspectRatio(event) {
      var _URL = window.URL || window.webkitURL;
      var file, img;
      file = event.target.files[0];
      img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;

        // Checking aspect Ratio if not then making cover_image_error = true
        if (aspect < 1.6 || aspect > 1.8) {
          this.coverimage = _URL.createObjectURL(file);

          this.coverPopup = true;
          this.imgName = event.target.files[0].name;
          event.target.value = null;
        } else {
          this.coverPopup = false;
          this.stepTwoProps.cover_image_error = false;
          this.uploadCover(event);
        }
      };
      img.src = _URL.createObjectURL(file);
    },
    uploadCover(event) {
      var _URL = window.URL || window.webkitURL;

      // Size Limit 5MB
      if (event.target.files[0].size > 2 * 1024 * 1024) {
        this.$vs.notify({
          title: 'Error',
          text: 'file size should be less than 2MB',
          iconPack: 'feather',
          color: 'danger',
        });
        return;
      }

      this.imgName = event.target.files[0].name;
      this.coverimage = _URL.createObjectURL(event.target.files[0]);

      this.coverPopup = true;

      this.stepTwoProps.cover_image_error = false;
      this.upload_success = true;
      this.stepTwoProps.showText = false;

      event.target.value = null;
    },
    uploadBrandLogo(event) {
      document.getElementById('brand-logo-preview').style.backgroundImage =
        'url(' + URL.createObjectURL(event.target.files[0]) + ')';
      this.stepTwoProps.logo = event.target.files[0];
      const nameTruncerBrand = event.target.files[0].name;
      this.logoFileName =
        nameTruncerBrand.length > 24
          ? nameTruncerBrand.slice(-24).concat('...')
          : nameTruncerBrand;
      this.logo_success = true;
    },
    geustPolicySelect() {
      this.stepOneProps.guest_policy = this.geustPolicy;
    },
  },
};
</script>
<style scoped>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

#upload-cover-container-step2 {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.btn {
  padding: 100px 200px 80px 200px;
  cursor: pointer;
  background: rgba(114, 71, 196, 0.1);
  border: 1px dashed #7347c470;
  box-sizing: border-box;
  border-radius: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #7247c4;
}
.btnlogo {
  cursor: pointer !important;
  background: rgba(114, 71, 196, 0.1);
  border: 1px dashed #7347c470;
  box-sizing: border-box;
  border-radius: 12px;
  font-style: normal;
  font-weight: 500;
  background-position: center;
  background-size: contain;
  font-size: 16px;
  color: #7247c4;
  width: 52.48px;
  height: 52.49px;
}
.cursor-pointer {
  cursor: pointer !important;
}
.invisible {
  visibility: hidden;
}
.upload-success {
  color: #191818;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}
.logo-success {
  color: #ffffff;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.upload-btn-wrapper-logo input[type='file'] {
  font-size: 20px;
  position: relative;
  left: 0;
  top: calc(-52.49px / 1.33);
  width: 52.48px;
  opacity: 0;
  cursor: pointer;
}
.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 25%;
  opacity: 0;
  cursor: pointer;
}
input {
  cursor: pointer !important;
  border: 3px solid !important;
}
.upload-resume-icon {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.button-class {
  padding: 0;
  background: #ffffff !important;
}
input[type='file'] {
  display: none;
}
.input-with-min input[type='number'] {
  padding-right: 2rem;
}
.input-with-min:after {
  content: 'min';
  position: absolute;
  right: 1rem;
  top: 75%;
  transform: translateY(-50%);
  font-size: 1rem;
}
</style>
