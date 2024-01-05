<template>
  <div class="container">
    <div class="head-cont">
      <h3>Reset Password</h3>
      <button @click="closeProfile">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="desc-cont">
      <p>Strong password required. Enter 8-14 characters.</p>
    </div>

    <div class="form">
      <label for="oldPassword">Old password</label>
      <div class="password-input">
        <input type="password" id="oldPassword" v-model="oldPassword" />
        <span
          class="toggle-password"
          @click="togglePasswordVisibility('oldPassword')"
        >
          <img
            v-if="passwordVisible.oldPassword"
            src="@/assets/images/dashboard/eye.svg"
            alt="Show Password"
          />
          <img
            v-else
            src="@/assets/images/dashboard/eye3.svg"
            alt="Hide Password"
          />
        </span>
      </div>
      <span class="error" v-if="error.oldPassword">{{
        error.oldPassword
      }}</span>

      <label for="newPassword">Create new password</label>
      <div class="password-input">
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          @input="validatePassword"
        />
        <span
          class="toggle-password"
          @click="togglePasswordVisibility('newPassword')"
        >
          <img
            v-if="passwordVisible.newPassword"
            src="@/assets/images/dashboard/eye.svg"
            alt="Show Password"
          />
          <img
            v-else
            src="@/assets/images/dashboard/eye3.svg"
            alt="Hide Password"
          />
        </span>
      </div>
      <span class="error" v-if="error.newPassword">{{
        error.newPassword
      }}</span>

      <!-- <input
        type="password"
        id="newPassword"
        v-model="newPassword"
        @input="validatePassword"
      /> -->

      <label for="confirmPassword">Confirm new password</label>
      <div class="password-input">
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          @input="validatePassword"
        />
        <span
          class="toggle-password"
          @click="togglePasswordVisibility('confirmPassword')"
        >
          <img
            v-if="passwordVisible.confirmPassword"
            src="@/assets/images/dashboard/eye.svg"
            alt="Show Password"
          />
          <img
            v-else
            src="@/assets/images/dashboard/eye3.svg"
            alt="Hide Password"
          />
        </span>
      </div>
      <span class="error" v-if="error.confirmPassword">{{
        error.confirmPassword
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordVisible: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      error: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      isPasswordValid: false,
    };
  },
  mounted() {
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    togglePasswordVisibility(field) {
      this.passwordVisible[field] = !this.passwordVisible[field];
      const input = document.getElementById(field);
      if (input) {
        input.type = this.passwordVisible[field] ? 'text' : 'password';
      }
    },
    validatePassword() {
      // Password conditions
      const capitalRegex = /[A-Z]/;
      const smallRegex = /[a-z]/;
      const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /\d/;

      // Check if the new password meets all conditions
      const isCapital = capitalRegex.test(this.newPassword);
      const isSmall = smallRegex.test(this.newPassword);
      const isSymbol = symbolRegex.test(this.newPassword);
      const isNumber = numberRegex.test(this.newPassword);

      // Update the error message based on the conditions
      this.error.newPassword = '';
      if (!isCapital)
        this.error.newPassword +=
          'Password must contain at least one capital letter. ';
      if (!isSmall)
        this.error.newPassword +=
          'Password must contain at least one small letter. ';
      if (!isSymbol)
        this.error.newPassword += 'Password must contain at least one symbol. ';
      if (!isNumber)
        this.error.newPassword += 'Password must contain at least one number. ';

      // Check if the password length is between 8 and 14 characters
      if (this.newPassword.length < 8 || this.newPassword.length > 14) {
        this.error.newPassword +=
          'Password must be between 8 and 14 characters. ';
      }

      // Check if the "Confirm new password" field matches the "Create new password" field
      if (this.confirmPassword !== this.newPassword) {
        this.error.confirmPassword = 'Passwords do not match.';
      } else {
        this.error.confirmPassword = '';
      }

      // Update the isPasswordValid flag
      this.isPasswordValid =
        isCapital &&
        isSmall &&
        isSymbol &&
        isNumber &&
        this.newPassword.length >= 8 &&
        this.newPassword.length <= 14 &&
        this.confirmPassword === this.newPassword;
    },
    closeProfile() {
      this.$store.commit('room/SET_POPUP', '');
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.container');
      const isNotTogglePass = !event.target.closest('.toggle-pass');
      if (isOutsideRoomPopup && isNotTogglePass && this.showPass !== false) {
        this.showPass = false;
        this.$emit('p-closed');
      }
    },
    savePassword() {
      // Reset previous error messages
      this.error = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      };

      // Performing validation
      if (!this.oldPassword) {
        this.error.oldPassword = 'Old password is required.';
      }
      if (this.newPassword.length < 8 || this.newPassword.length > 14) {
        this.error.newPassword =
          'Password must be between 8 and 14 characters.';
      }
      if (this.newPassword !== this.confirmPassword) {
        this.error.confirmPassword = 'Passwords do not match.';
      }

      // reset paasword
      if (
        !this.error.oldPassword &&
        !this.error.newPassword &&
        !this.error.confirmPassword
      ) {
        const data = {};
        data.current_password = this.oldPassword;
        data.new_password = this.newPassword;
        data.confirm_password = this.confirmPassword;
        this.$vs.loading();
        this.$store
          .dispatch('auth/changePassword', data)
          .then(() => {
            this.$vs.notify({
              title: 'Success',
              text: 'Password updated successfully',
              color: 'success',
            });
            this.oldPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.$validator.reset();
          })
          .catch((error) => {
            this.$vs.notify({
              title: 'Error',
              text: error.response.data.message,
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
.container {
  width: 367px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  z-index: 10000;
}

.head-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-cont h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-cont button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.form input {
  background-color: #1d232b;
  border: 1px solid #31394e;
  border-radius: 6px;
  color: #a6a6a8;
  width: 315px;
  height: 34px;
  font-size: 13px;
  padding: 10px;
}

.form span {
  display: block;
  color: red;
  font-size: 12px;
}

label {
  display: block;
  font-size: 12px;
  color: #647181;
  margin-top: 20px;
}

.desc-cont P {
  font-size: 12px;
  color: #647181;
  text-align: left;
}

.save-btn {
  background-color: #d7df23;
  border: 1px solid #31394e;
  width: 113px;
  height: 40px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 60%;
}
.password-input {
  position: relative;
  display: inline-block;
}
.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.toggle-password img {
  width: 16px;
  height: 16px;
}
@media (max-width: 500px) {
  .container {
    width: 350px;
  }
  .form input {
    width: 100%;
  }
}
</style>
