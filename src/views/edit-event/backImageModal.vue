<!-- eslint-disable no-unused-vars -->
<!-- =========================================================================================
    File Name: backImageModal.vue
    Description: fetch all background image and details using api
    ----------------------------------------------------------------------------------------
    Item Name: Back Image Modal
    Author: Ashwani bhardwaj
========================================================================================== -->

<template>
  <!-- Modal -->
  <div>
    <div
      class="flex flex-wrap items-center sticky modalTopDesign p-2"
      style="z-index: 1; background: rgba(255, 255, 255, 0.8)"
    >
      <div class="centerx">
        <vs-popup
          title="Crop your back Image "
          :active.sync="Enable_cropper"
          ref="PopUp"
        >
          <div>
            <ImageCropper :coverimage="imageUrl" :closepop="Cropp" />
          </div>
        </vs-popup>
      </div>
      <div class="centerx w-1/12 mr-5">
        <label class="toolTip">
          <vs-icon
            icon-pack="feather"
            icon="icon-upload"
            size="20px"
            rounded="true"
            style="align-self: flex-start"
            class="cursor-pointer"
            @click="inp"
          ></vs-icon>
          <span class="toolTiptext p-5">
            Upload an background image with specs
            <br />
            <b>Size:</b> Size Should be less then 5MB
            <br />
            <b>Aspect Ratio:</b> Aspect Ratio should be of 16:9
            <br />
            <b>Image Quality:</b> Image Quality should be of 1120X630 Pixel
          </span>
        </label>
        <vs-popup
          class="holamundo"
          color="primary"
          title="Upload Your Back Image"
          :active.sync="showPopup"
        >
          <label class="toolTip">
            <span class="label-role">
              Upload an Image with Specs
              <vs-icon
                icon-pack="feather"
                icon="icon-info"
                size="12px"
                rounded="true"
                style="align-self: flex-end"
              ></vs-icon>
            </span>
            <span class="toolTiptext p-5">
              <b>Size:</b> Size Should be less then 2MB
              <br />
              <b>Aspect Ratio:</b> Aspect Ratio should be of 16:9
              <br />
              <b>Image Quality:</b> Image Quality should be of 1920X1080 Pixel
            </span>
          </label>
          <div class="cursor-pointer items-center w-full" @click="inp">
            <button
              class="w-full border px-8 pt-7 pb-7 btnStyle"
              color="primary"
              id="back-Image"
              type="border"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-upload-cloud"
                size="32px"
                rounded="true"
                class="upload mt-4"
              >
              </vs-icon>
            </button>
            <input
              type="file"
              name="cover file"
              id="backImage"
              ref="backImage"
              class="hide"
              accept="image/*"
              @change="ValidatingBackImage"
            />
          </div>
        </vs-popup>
      </div>

      <div class="ml-3 relative" v-for="(item, index) in themes" :key="index">
        <vs-button
          :color="item.value"
          :text-color="item.color"
          class="p-5"
          @click.stop="imageCategory = item.name"
          :data-tooltip="item.text"
          :title="item.text"
        ></vs-button>
      </div>
    </div>
    <div class="w-full gridView">
      <div v-for="(item, index) in backImages" :key="index">
        <img
          v-if="item.category == imageCategory || imageCategory == 'all'"
          :src="item.low_quality_url"
          class="w-full cursor-pointer"
          @click.stop="setBackImage(item.high_quality_url)"
        />
        <p
          v-if="item.category == imageCategory || imageCategory == 'all'"
          class="credit"
        >
          <i>pic credit : {{ item.credit }}</i>
        </p>
      </div>
    </div>
    <!-- <vs-upload @change="BackImageUpload(e)"></vs-upload> -->
  </div>
</template>
<script>
import constants from '../../../constant';
import axios from 'axios';
import ImageCropper from '../edit-event/coverCropper.vue';
export default {
  name: 'BackImageModal',
  props: ['stepTwoProps', 'modalProps', 'modalProps.popupBackImageActive'],
  components: {
    ImageCropper,
  },
  data() {
    return {
      imageUrl: '',
      Enable_cropper: false,
      backImgName: '',
      backImg: {},
      showPopup: false,
      backImages: null,
      imageCategory: 'all',
      themes: [
        {
          name: 'river blue',
          text: 'River Blue',
          value: '#467FCF',
          color: '#FFFFFF',
        },
        {
          name: 'forest green',
          text: 'Forest Green',
          value: '#58821E',
          color: '#FFFFFF',
        },
        {
          name: 'grassland green',
          text: 'Grassland Green',
          value: '#9DCD5B',
          color: '#FFFFFF',
        },
        {
          name: 'ocean teal',
          text: 'Ocean Teal',
          value: '#3BA0BE',
          color: '#FFFFFF',
        },
        {
          name: 'space purple',
          text: 'Space Purple',
          value: '#6859B4',
          color: '#FFFFFF',
        },
        {
          name: 'solar yellow',
          text: 'Solar Yellow',
          value: '#F2C244',
          color: '#FFFFFF',
        },
        {
          name: 'sunny orange',
          text: 'Sunny Orange',
          value: '#EA7526',
          color: '#FFFFFF',
        },
        {
          name: 'bussiness red',
          text: 'Business Red',
          value: '#C6211B',
          color: '#FFFFFF',
        },
        {
          name: 'personal pink',
          text: 'Personal Pink',
          value: '#F36677',
          color: '#FFFFFF',
        },
        {
          name: 'machine grey',
          text: 'Machine Grey',
          value: '#B3B3B3',
          color: '#FFFFFF',
        },
      ],
    };
  },
  mounted() {
    this.$refs.PopUp.$el.childNodes[1].style.width = 'auto';
    axios
      .get(`${constants.backImageUrl}` + this.imageCategory)
      .then((resp) => {
        this.backImages = resp.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  methods: {
    covrImgURL(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        console.log('aksdasdakls', reader.result);
        this.$store
          .dispatch('cast/compressImage', {
            data: reader.result,
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 0.8,
          })
          .then((compressedDataURL) => {
            console.log('Compressed Image Data URL:', compressedDataURL);
            // Use the compressed data URL as needed
            this.stepTwoProps.BackImageURL = reader.result;
          })
          .catch((error) => {
            console.error('Image compression failed:', error);
          });
      });
    },
    Cropp(file) {
      this.Enable_cropper = false;
      this.modalProps.backImage = file;
      this.stepTwoProps.back_image = file;
      this.$vs.notify({
        title: 'success',
        text: 'Image Uploaded',
        iconPack: 'feather',
        color: 'success',
      });
      this.modalProps.popupBackImageActive = false;
      this.covrImgURL(file);
    },
    inp() {
      this.$refs.backImage.click();
    },
    ValidatingBackImage(event) {
      var _URL = window.URL || window.webkitURL;
      var file, img;
      file = event.target.files[0];
      img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;

        //  Checking Image Width
        if (img.width < 1120 || img.height < 630) {
          this.$vs.notify({
            title: 'Error',
            text: 'Image should be at least 1120x630',
            iconPack: 'feather',
            color: 'danger',
          });

          this.stepTwoProps.back_image_error = true;
          return;
        }
        // Checking the size
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 5) {
          this.$vs.notify({
            title: 'Error',
            text: 'File size should be less than 5MB',
            iconPack: 'feather',
            color: 'danger',
          });
          this.stepTwoProps.back_image_error = true;
        }

        // checking Aspect Ratio

        if (aspect < 1.6 || aspect > 1.8) {
          this.stepTwoProps.back_image_error = true;
          this.Enable_cropper = true;

          setTimeout(() => {
            event.target.value = null;
          }, 1000);
        }

        //  If everything is okay and StepTwopropsbackImage error is false

        if (this.stepTwoProps.back_image_error === false) {
          this.Enable_cropper = true;

          const imageFile = event.target.files[0];

          this.modalProps.backImage = URL.createObjectURL(imageFile);
          this.imageUrl = URL.createObjectURL(imageFile);
          this.backImgName = event.target.files[0].name;
          document.getElementById('back-Image').style.backgroundImage =
            'url(' + URL.createObjectURL(event.target.files[0]) + ')';

          return;
        }
        this.stepTwoProps.back_image_error = false;
        const imageFile = event.target.files[0];
        this.modalProps.backImage = URL.createObjectURL(imageFile);
        this.imageUrl = URL.createObjectURL(imageFile);
        this.backImgName = event.target.files[0].name;
      };
      img.src = _URL.createObjectURL(file);
    },
    setBackImage(image) {
      this.modalProps.backImage = image;
      this.modalProps.popupBackImageActive = false;
    },
  },
};
</script>
<style>
#back-Image {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.popUpStyle {
  width: fit-content;
}
.btnStyle {
  height: 200px;
  width: 200px;
}
.gridView {
  column-count: 1;
  column-fill: balance;
  column-gap: 7px;
}
.gridView > div {
  float: left;
  position: relative;
}
.gridView > div > p.credit {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 7px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px;
  text-align: right;
  font-weight: 600;
  margin: 0px;
}

.toolTip {
  position: relative;
  display: inline-block;
}
.toolTip .toolTiptext {
  visibility: hidden;
  color: white;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 500%;
  /* margin-left: -60px;  */
  opacity: 0;
  transition: opacity 0.3s;
}

.toolTip:hover .toolTiptext {
  padding: 5px;
  margin-left: -110px;
  width: 20rem;
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}
.toolTip .toolTiptext::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 10%;
  transform: rotate(3.142rad);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}
</style>
<style scoped>
.con-vs-popup .vs-popup {
  width: 200% !important;
  height: auto !important;
  overflow: visible;
}
</style>
<style lang="scss" scoped>
.modalTopDesign {
  top: -15px !important;
}
.imageCrop {
}
</style>
<style>
.toolTip {
  position: relative;
  display: inline-block;
}
.toolTip .toolTiptext {
  visibility: hidden;
  color: white;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1000;
  top: 100%;
  /* margin-left: -60px;  */
  opacity: 0;
  transition: opacity 0.3s;
}

.toolTip:hover .toolTiptext {
  padding: 5px;
  margin-left: -110px;
  width: 20rem;
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}
.toolTip .toolTiptext::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 7%;
  transform: rotate(3.142rad);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}
</style>
