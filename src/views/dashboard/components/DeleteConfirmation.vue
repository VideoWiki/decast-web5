<template>
  <div class="popup">
    <div class="delete-popup">
      <div class="full-wrapper">
        <div class="uppar-part flex justify-between">
          <div v-if="type === 'room'" class="heading">Delete Room</div>
          <div v-if="type === 'cast'" class="heading">Delete Cast</div>
          <div v-if="type === 'logout'" class="heading">Logout</div>
          <img
            class="cursor-pointer"
            src="@/assets/images/create-event/Vector30.svg"
            @click="closeDeletePopup"
          />
        </div>
        <div class="middle-part">
          <div class="img">
            <img src="@/assets/images/create-event/crossIcon.svg" />
          </div>
          <p v-if="type === 'room' || type === 'cast'">
            Do you really want to delete
          </p>
          <p v-if="type === 'room'">this room?</p>
          <p v-if="type === 'cast'">this cast?</p>
          <p v-if="type === 'logout'">Do you really want to Logout?</p>
        </div>
        <div class="lower-part">
          <button @click="confirmDelete" class="cursor-pointer">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDeletePopup: false,
    };
  },
  props: ['index', 'type'],
  methods: {
    confirmDelete() {
      this.$emit('confirm', this.index);
    },
    closeDeletePopup() {
      this.$emit('hide');
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.full-wrapper {
  width: 278px;
  height: 212px;
  background-color: #1f272f;
  border-radius: 10px;
  border: 1px solid #31394e;
  padding: 14px 26px;
  display: flex;
  flex-direction: column;
}

.heading {
  font-size: 14px;
  font-weight: 600;
  color: #a6a6a8;
}

.uppar-part img {
  height: 12px;
  width: 12px;
  margin-right: -18px;
  margin-top: -6px;
}

.middle-part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 25px;
}

.img {
  margin: auto;
}

.middle-part p {
  margin: auto;
  font-size: 13px;
  font-weight: 500;
  color: #a6a6a8;
}

.lower-part {
  align-self: flex-end;
  margin-top: 33px;
}

.lower-part button {
  width: 86px;
  height: 26px;
  border: 1px solid rgba(49, 57, 78, 0.6);
  background-color: rgba(49, 57, 78, 0.6);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #a6a6a8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000007e;
  z-index: 100;
}
</style>
