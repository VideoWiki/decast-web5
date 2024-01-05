<template>
  <div class="full-cont">
    <div class="head-container">
      <h3>My Profiles</h3>
      <button @click="closeProfile">
        <img src="@/assets/images/cross.svg" alt="Close Profile" />
      </button>
    </div>

    <div class="info-cont">
      <!-- Profile Image -->
      <div class="pri-cont">
        <div class="img-cont">
          <input
            type="file"
            id="display-profile-input"
            @change="uploadFile"
            class="hidden"
            accept="image/*"
          />
          <button
            class="img-up"
            :disabled="!isEditing || uploadInProgress"
            @click="openUpload"
            :style="{ display: !isEditing ? 'none' : 'block' }"
          >
            <img src="@/assets/images/camera.svg" alt="Upload Image" />
          </button>
          <vs-avatar
            :text="activeUserInfo.first_name[0]"
            color="primary"
            class="m-0 shadow-md"
            :src="activeUserInfo.profile_pic || null"
            size="57px"
          />
        </div>

        <div class="name-cont">
          <h3>{{ activeUserInfo.username }}</h3>
          <p>{{ activeUserInfo.email }}</p>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="form-cont">
        <div class="child-1">
          <label class="label">First name</label>
          <input
            v-model="firstName"
            :disabled="!isEditing"
            :style="{ opacity: isEditing ? 1 : 0.5 }"
            required
          />
          <span class="error" v-if="error.firstName">{{
            error.firstName
          }}</span>

          <label class="label">Email address</label>
          <input
            v-model="email"
            :disabled="!isEditing"
            :style="{ opacity: isEditing ? 1 : 0.5 }"
            type="email"
            required
          />
          <span class="error" v-if="error.email">{{ error.email }}</span>
        </div>

        <div class="child-2">
          <label class="label">Last name</label>
          <input
            v-model="lastName"
            :disabled="!isEditing"
            :style="{ opacity: isEditing ? 1 : 0.5 }"
            required
          />
          <span class="error" v-if="error.lastName">{{ error.lastName }}</span>

          <label class="label">Add your designation</label>
          <input
            v-model="designation"
            :disabled="!isEditing"
            :style="{ opacity: isEditing ? 1 : 0.5 }"
            required
          />
          <span class="error" v-if="error.designation">{{
            error.designation
          }}</span>
        </div>
      </div>

      <!-- Edit and Save Buttons -->
      <div class="edit-cont">
        <button @click="editProfile" :disabled="isEditing">Edit</button>
        <button
          @click="saveProfile"
          :disabled="!isEditing"
          :style="{ display: isEditing ? 'block' : 'none' }"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import constants from '../../../../constant';
import axios from '../../../axios';

export default {
  name: 'MyProfile',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      designation: localStorage.getItem('designation') || '',
      isEditing: false,
      uploadInProgress: false,
      uploadedImageBlob: null,
      error: {
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
      },
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    this.firstName = this.activeUserInfo.first_name;
    this.lastName = this.activeUserInfo.last_name;
    this.email = this.activeUserInfo.email;
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    openUpload() {
      document.getElementById('display-profile-input').click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.uploadedImageBlob = selectedFile;
      this.activeUserInfo.profile_pic = URL.createObjectURL(selectedFile);
      event.target.value = '';
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.full-cont');
      const isNotToggleProfile = !event.target.closest('.toggle-profile');
      if (
        isOutsideRoomPopup &&
        isNotToggleProfile &&
        this.showProfile !== false
      ) {
        this.showProfile = false;
        this.$emit('profile-closed');
      }
    },
    closeProfile() {
      this.$store.commit('room/SET_POPUP', '');
      this.isEditing = false;
    },
    editProfile() {
      this.isEditing = true;
    },
    logout() {
      this.$cookies.remove('userId');
      this.$cookies.remove('Token');
      this.$router.push('/');
      return this.$store.dispatch('auth/logOut');
    },
    saveProfile() {
      this.error = {
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
      };

      // Performing validation
      if (!this.firstName) {
        this.error.firstName = 'First name is required.';
      }
      if (!this.lastName) {
        this.error.lastName = 'Last name is required.';
      }
      if (!this.email) {
        this.error.email = 'Email address is required.';
      }
      //   if (!this.designation) {
      //     this.error.designation = 'Designation is required.';
      //   }

      if (
        !this.error.firstName &&
        !this.error.lastName &&
        !this.error.email &&
        !this.error.designation
      ) {
        this.$vs.loading();
        const payload = {
          user_name: this.activeUserInfo.username,
          fname: this.firstName,
          lname: this.lastName,
          email: this.email,
          p_image: this.uploadedImageBlob ? this.uploadedImageBlob : '',
        };
        console.log(payload);
        this.$store
          .dispatch('auth/updateUserDetails', payload)
          .then((res) => {
            // console.log(res, 'res');
            localStorage.setItem('designation', this.designation);
            this.isEditing = false;
            this.activeUserInfo.profile_pic = res.data.profile_image;
            console.log(res.data.profile_image, 'img');
            console.log(payload, 'pay');
            this.$store.commit('UPDATE_USER_INFO', this.activeUserInfo);
            this.$vs.notify({
              title: 'Success',
              text: 'Changes Saved, Please Login again',
              color: 'success',
            });
           this.logout();
          })
          .catch((err) => {
            console.error(err);
            this.$vs.notify({
              title: 'Error',
              text: 'Error Saving Details',
              color: 'danger',
            });
          })
          .finally(() => {
            this.$vs.loading.close();
          });
      }
    },
  },
};
</script>

<style scoped>
.full-cont {
  width: 541px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  z-index: 10000;
}

.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.pri-cont {
  display: flex;
  width: fit-content;
  gap: 15px;
  margin-top: 20px;
}

.img-cont {
  width: 59px;
  height: 59px;
  position: relative;
  border-radius: 50%;
  border: 1px solid #31394e;
}

.img-cont img {
  width: 59px;
  height: 59px;
  border-radius: 50%;
}

.img-up {
  position: absolute;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  right: 0%;
  z-index: 10000;
  cursor: pointer;
}

.img-up img {
  width: 18px;
  height: 18px;
}

.form-cont {
  display: flex;
  gap: 20px;
  text-align: left;
  justify-content: space-between;
  color: #647181;
  /* font-family: Popins,sans-serif; */
  /* border: 1px solid red; */
}

.form-cont input {
  background-color: #1d232b;
  border: 1px solid #31394e;
  border-radius: 6px;
  color: #a6a6a8;
  width: 242px;
  height: 34px;
  font-size: 13px;
  padding: 10px;
}

.form-cont span {
  display: block;
  color: red;
  font-size: 12px;
}

.name-cont p {
  color: #647181;
}

.name-cont h3 {
  color: #a6a6a8;
}

.label {
  display: block;
  font-size: 12px;
  color: #647181;
  margin-top: 20px;
  margin-bottom: 5px;
}

.edit-cont {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;
}

.edit-cont button:nth-child(1) {
  background-color: #1d232b;
  border: 1px solid #31394e;
  width: 113px;
  height: 40px;
  border-radius: 6px;
  color: #a6a6a8;
  font-weight: 600;
  cursor: pointer;
  font-family: Popins, sans-serif;
}

.edit-cont button:nth-child(2) {
  background-color: #d7df23;
  border: 1px solid #31394e;
  width: 113px;
  height: 40px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-family: Popins, sans-serif;
}
@media (max-width: 500px) {
  .full-cont {
    width: 300px;
    display: flex;
    flex-direction: column;
  }
  .info-cont {
    display: flex;
    flex-direction: column;
  }
  .form-cont {
    display: flex;
    flex-direction: column;
  }

  .child-2 {
    margin-top: -20px;
  }

  .name-cont h3 {
    color: #a6a6a8;
    font-size: 16px;
  }
}
</style>
