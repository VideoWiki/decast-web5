<template>
  <div class="wrapper">
    <div class="toggle-option flex">
      <div class="toggle-text">Customize the brand look</div>
      <buttonToggle v-model="toggleValue" class="toggle-button"></buttonToggle>
    </div>
    <div v-if="!toggleValue" class="default-look">
      <img
        src="@/assets/images/editor/image.svg"
        class="room-image opacity-50"
      />
      <div class="logo">
        <img :src="img1Src" class="img1" />
      </div>
      <div class="some-text">Default Cast Lime Look</div>
      <img src="@/assets/images/editor/Group154.svg" class="img3" />
    </div>
    <div v-else class="custom-look flex">
      <div class="left">
        <div class="choose-logo">
          <label>Replace logo</label>
          <div class="logo-pic">
            <div class="cross">
              <img src="@/assets/images/editor/Vector3.svg" />
            </div>
            <div class="logo-img cursor-pointer">
              <img :src="logoImg" @click="changeImageLogo" />
            </div>
          </div>
        </div>
        <div class="choose-color">
          <label class="text">Choose your brand color</label>
          <ColorPicker :stepTwoProps="stepTwoProps" />
        </div>
      </div>
      <div class="right">
        <div class="input-button" @click="triggerFileInput">
          <div class="button-text">
            <label for="fileInput" v-if="!imageSelected" class="text-one">
              <p>Click to upload</p>
              or drag and drop your brand cover image</label
            >
            <p v-if="!imageSelected" class="text-two">
              jpg, jpeg, png, or gif (recommended size 1440px by 600px)
            </p>
          </div>
          <input
            type="file"
            id="fileInput"
            @change="handleImageUpload"
            accept="image/*"
            style="display: none"
            ref="fileInput"
          />
          <img
            v-if="imageSelected"
            :src="imageUrl"
            alt="Uploaded Image"
            style="cursor: pointer"
          />
        </div>
      </div>
    </div>
    <div class="buttonn">
      <button @click="changeActiveTab('Settings')" class="cursor-pointer">
        Next
      </button>
    </div>
  </div>
</template>
<script>
import buttonToggle from './buttonToggle.vue';
import ColorPicker from '../../views/login/ColorPicker.vue';
export default {
  name: 'BrandingTab',
  data() {
    return {
      img1Src: this.stepTwoProps.logo,
      logoImg: this.stepTwoProps.logo,
      toggleValue: false,
      imageSelected: false,
      imageUrl: '',
    };
  },
  props: ['stepTwoProps', 'changeActiveTab'],
  components: {
    buttonToggle,
    ColorPicker,
  },
  mounted() {
    var img;
    if (this.stepTwoProps.logo === '') {
      img = require('@/assets/images/editor/Cast-Draft-Logo-02.svg');
      this.img1Src = img;
      this.logoImg = img;
    } else {
      img = URL.createObjectURL(this.stepTwoProps.logo);
      this.img1Src = img;
      this.logoImg = img;
    }
    // console.log(this.stepTwoProps.logo);
  },
  methods: {
    changeImageLogo() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.logoImg = event.target.result;
            this.img1Src = event.target.result;
            // console.log(file);
            this.stepTwoProps.logo = file;
          };
          reader.readAsDataURL(file);
        }
      };
      fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Assuming you are using FileReader to display the uploaded image
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSelected = true;
          this.imageUrl = reader.result;
          this.stepTwoProps.cover_image = event.target.files[0];
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileInput() {
      // Trigger the file input click when the image is clicked
      this.$refs.fileInput.click();
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
}
.toggle-option {
  align-self: flex-end;
  align-items: center;
}
.toggle-text {
  font-weight: 600;
  font-size: 14px;
  color: #a6a6a8;
  margin-right: 14px;
}
.toggle-button {
  display: flex;
  align-items: center;
}
.default-look {
  margin-top: 36px;
  position: relative;
}
.room-image {
  margin: 0px 60px 0px 60px;
  width: 417px;
  height: 216px;
}
.logo {
  position: absolute;
  top: -28px;
  left: 25px;
  width: 72px;
  height: 70px;
  border: 1px solid #31394e;
  border-radius: 61px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #181a20;
  overflow: hidden;
}
.img1 {
  width: 98%;
  height: 98%;
  border-radius: 61px;
  object-fit: cover;
  margin: auto;
}
.img3 {
  position: absolute;
  bottom: -20px;
  right: 20px;
  width: 122px;
  height: 118px;
  border-radius: 4px;
}
.some-text {
  width: 426px;
  height: 63px;
  background-color: #1f272f;
  border: 1px solid #1f272f;
  position: absolute;
  left: 60px;
  top: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 18px;
  color: #a6a6a8;
}
.buttonn {
  align-self: flex-end;
  margin-top: 40px;
}
.buttonn button {
  width: 141px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #1f272f;
}
.custom-look {
  margin-top: 15px;
}
.choose-logo label {
  font-weight: 500;
  font-size: 12px;
  color: #637181;
}
.logo-pic {
  margin-top: 12px;
  width: 137px;
  height: 134px;
  border: 1px solid #31394e;
  border-radius: 6px;
  position: relative;
}
.cross {
  width: 16px;
  height: 16px;
  background-color: #31394e;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  top: -5px;
}
.cross img {
  width: 8px;
  height: 8px;
  margin: 4px;
}
.logo-img {
  width: 135px;
  height: 132px;
  border-radius: 6px;
  margin: auto;
  overflow: hidden;
}
.logo-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.choose-color {
  font-size: 12px;
  font-weight: 600;
  color: #637181;
  margin-top: 24px;
}
.right {
  margin-left: 26px;
  margin-top: 30px;
}
.input-button {
  background-color: #1f272f;
  width: 359px;
  height: 212px;
  text-align: center;
  border: 1px dashed #31394e;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.button-text {
  position: absolute;
  top: 50px;
  left: 65px;
  width: 207px;
}
.input-button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-one {
  font-weight: 500;
  size: 12px;
  color: #a6a6a8;
}
.text-two {
  font-size: 11px;
  font-weight: 500;
  color: #647181;
  margin-top: 16px;
}
.text-one p {
  color: #31a2f4;
}
@media (max-width: 500px) {
  .room-image {
    margin: auto;
    width: 360px;
  }
  .logo {
    position: absolute;
    top: -20px;
    left: -10px;
    width: 62px;
    height: 60px;
  }
  .some-text {
    width: 360px;
    height: 55px;
    position: absolute;
    left: 0px;
    top: 76px;
    font-size: 15px;
  }
  .img3 {
    position: absolute;
    bottom: 0px;
    right: 2px;
    width: 102px;
    height: 98px;
  }
  .buttonn button {
    width: 100px;
  }
  .left {
    width: 300px;
    display: flex;
    margin: auto;
  }
  .custom-look {
    display: flex;
    flex-direction: column;
  }
  .input-button {
    width: 300px;
  }
  .button-text {
    left: 40px;
  }
  .choose-color {
    margin-left: 20px;
  }
  .text {
    margin-bottom: 8px;
  }
}
</style>
