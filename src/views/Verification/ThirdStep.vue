<template>
  <div>
    <form
      class="text-white"
      :class="[
        (this.public && !this.public_auth) || this.password_auth
          ? 'vx-col w-full flex flex-wrap justify-center items-center p-5'
          : '',
      ]"
      @submit.prevent="submit"
    >
      <div>
        <span v-if="this.public && !this.public_auth">
          <h2 class="join-heading mt-4">Join Event</h2>
          <h4 class="join-heading-desc caption mb-2">
            Enter you name to Access the cast
          </h4>
        </span>
        <span v-else-if="this.password_auth">
          <h2 class="join-heading mt-4">Join Event</h2>
          <h4 class="join-heading-desc caption mb-2">
            Enter name and password to access the cast
          </h4>
        </span>
        <div v-if="!public_auth">
          <div class="flex">
            <h6 class="join-label-head my-2">
              Name
              <span class="text-danger">*</span>
            </h6>
          </div>
          <input
            class="verification-input text-xl"
            v-validate="'required'"
            name="Name"
            placeholder="Enter name"
            autocomplete="off"
            v-model="name"
          />
          <p class="join-label-foot caption">
            Your name will be shown to other event attendees and organizers for
            attending the event, chats and logs.
          </p>
        </div>
        <div class="flex" v-if="password_auth">
          <h6 class="join-label-head my-2">
            Password
            <span class="">*</span>
          </h6>
        </div>
        <input
          v-if="password_auth"
          class="verification-input text-xl mt-2"
          v-validate="'required'"
          name="Password"
          placeholder="Enter Password"
          autocomplete="off"
          type="password"
          v-model="password"
        />

        <div class="flex flex-wrap my-4">
          <vs-button
            type="submit"
            class="flex items-center join-button px-4 text-white	"
            :disabled="!validateForm"
            @submit.prevent="entercast"
            @click.prevent="joinCast"
            >Access Cast</vs-button
          >
          <input type="submit" style="display: none" />
        </div>
      </div>
      <input
        type="submit"
        :disabled="true"
        value="Submit"
        style="display: none"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      publicEmail: '',
      password: '',
      skippedStep: false,
      disable: false,
      publicPayload: {
        email: '',
        cast_id: this.$route.params.session_key,
      },
    };
  },
  props: [
    'payload',
    'public',
    'password_auth',
    'public_auth',
    'otp_auth',
    'nft',
  ],
  computed: {
    validateForm() {
      if (this.password_auth) {
        return !this.errors.any() && this.name !== '' && this.password !== '';
      }
      return (!this.errors.any() && this.name !== '') || this.public_auth;
    },
  },
  mounted() {
    this.name = this.$route.query.name;
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (this.name === '') {
        this.$vs.notify({
          title: 'Name Required',
          text: 'Enter Name To Enter Cast',
          color: 'danger',
        });
        return;
      }
      if (this.password_auth && this.password === '') {
        this.$vs.notify({
          title: 'Password Required',
          text: 'Enter Password To Enter Cast',
          color: 'danger',
        });
        return;
      }
      this.$vs.loading();
      setTimeout(() => {
        if (!this.disabled) {
          this.disabled = true;
          this.joinCast();
        }
      });
    },

    joinCastUtil(payload) {
      console.log('----->');
      this.$store
        .dispatch('studio/joinEvent', payload)
        .then((response) => {
          this.responsedata = response.data.url;
          window.location.href = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((e) => {
          console.log(e.response);
          this.$vs.loading.close();
          this.disabled = false;
          this.$vs.notify({
            title: 'Error Occurred',
            text:
              e.response != null
                ? e.response.data.message
                : 'Check either your password or the cast timing',
            color: 'danger',
          });
        });
    },
    async magicJoin(payload) {
      console.log(payload);
      var data = JSON.stringify({
        id: this.$route.params.session_key,
        pass: this.$route.query.pass,
        name: payload.name,
      });
      console.log(178);
      await this.$store
        .dispatch('studio/magicJoin', data)
        .then((res) => {
          console.log(res.data.url, 181);
          if (res.data.url) {
            console.log(184);
            this.$vs.notify({
              title: 'Success',
              color: 'success',
            });
            location.href = res.data.url;
          } else {
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Wrong Link',
              text: 'You have the wrong link to join',
              color: 'danger',
            });
          }
        })
        .catch((e) => {
          this.$vs.loading.close();
          this.disabled = false;
          console.log(e.response);
        });
    },
    async joinCast() {
      const payload = {
        name: this.public_auth ? this.payload.name : this.name,
        email:
          (this.public && !this.public_auth) || this.password_auth
            ? ''
            : this.payload.email,
        password: this.password,
        public_meeting_id: this.$route.params.session_key,
        avatar_url: '',
        isPublic: this.public,
      };
      if (this.payload) {
        this.publicEmail = this.payload.email;
      } else {
        this.publicEmail = '';
      }

      if (this.public && this.public_auth) {
        const joineePayload = {
          user_name: this.name,
          user_email: this.public_auth ? payload.email : '',
          session_id: this.$route.params.session_key,
        };

        await this.$store
          .dispatch('studio/addJoinee', joineePayload)
          .then(async (response) => {
            console.log(response.data);
            if (response.data.status) {
              console.log('public path');
              if (this.$route.query.pass !== undefined) {
                console.log(payload);
                await this.magicJoin(payload);
              } else {
                await this.joinCastUtil(payload);
              }
            }
          })
          .catch((err) => {
            console.log(err);
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Error Occurred',
              text:
                err.response != null
                  ? err.response.data.message
                  : 'Something went wrong! Try Again',
              color: 'danger',
            });
          });
      } else {
        if (this.$route.query.pass !== undefined) {
          await this.magicJoin(payload);
        } else {
          this.joinCastUtil(payload);
        }
      }
    },
  },
};
</script>

<style scoped>
.join-box {
  margin-top: 5em;
  /* margin-left: 32em; */
  padding: 5em;
  width: 90%;
}

.join-heading {
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #272d4d;
}
.join-label-head {
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #272d4d;
}

.join-label-foot {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #767b99;
}
.join-heading-desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.005em;
  color: #767b99;
}
.verification-input {
  height: 48px;
  border: none;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  background: #f2f0fe;
  border: 1px solid #7966fa;
  border-radius: 4px;
}
.verification-img {
  position: absolute;
  bottom: 0px;
  right: 3.5em;
  z-index: -1;
  padding: 0px;
  margin: 0px;
  width: 35%;
}
.join-button {
  background: #6ce733 !important;
  border-radius: 36px;
  width: fit-content;
  height: 36px;

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #5e6660;
}
.join-button:hover,
.join-button:active {
  box-shadow: none;
}

.caption {
  color: #101010 !important;
}
@media screen and (max-device-width: 1024px) {
  .join-box {
    padding: 1.6em;
    /* margin-left: 10%; */
    margin-top: 2rem;
    width: 100% !important;
  }
  .verification-img {
    display: none !important;
  }
}
@media screen and (max-device-width: 700px) {
  .join-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 2rem;
    width: 100% !important;
  }
  .verification-img {
    display: none !important;
  }
}
</style>
