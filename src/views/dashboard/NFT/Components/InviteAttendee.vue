<template>
  <div class="modal p-6">
    <div>
      <h5 class="my-2">Invite Attendee</h5>
      <p class="my-2">Invite many attendees by submitting an Excel sheet.</p>
    </div>
    <div class="vx-col md:w-1/1 width w-full form-group">
      <div
        class="upload-btn-wrapper cursor-pointer items-center w-full"
        @drop.prevent="handleSheet"
        @dragenter.prevent=""
        @dragover.prevent=""
        @click="sheet"
      >
        <button class="btn w-full border px-8 pt-10 pb-2">
          <span>
            <vs-icon
              icon-pack="feather"
              icon="icon-upload-cloud"
              size="32px"
              rounded="true"
              class="upload mt-3"
            >
            </vs-icon>
            <br />
            <div class="">
              <span class="font-bold purple">Click to upload</span> or drag and
              drop
              <br />
              <span class="px-4">xlsx, xls or xlsm</span>
            </div>
          </span>
        </button>
        <input
          class="hide"
          type="file"
          name="Excel sheet"
          id="sheetUpload"
          ref="sheetUpload"
          @change="uploadSheet"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
    </div>
    <div class="w-full border px-6 pt-6">
      <h4>
        <vs-icon
          icon-pack="feather"
          icon="icon-file"
          size="16px"
          class="px-2"
          rounded="true"
        >
        </vs-icon
        >{{ sheetFileName }}
      </h4>
      <div class="flex px-8">
        <progress
          max="100"
          class="w-10/12 py-1"
          :value.prop="uploadPercentage"
        ></progress>
        <p class="w-2/12 px-4" style="line-height: 15px">
          {{ uploadPercentage }}%
        </p>
      </div>
    </div>
    <div class="flex">
      <button class="whiteBtn w-full cursor mx-2">
        <a
          href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx"
          class="text-black"
        >
          <vs-icon
            icon-pack="feather"
            icon="icon-download"
            size="16px"
            rounded="true"
            style="align-self: flex-end"
          >
          </vs-icon>
          <span class="pl-1">Sample List</span>
        </a>
      </button>
      <vs-button class="text-base w-full mx-2 lg:text-lg" @click="submitSheet">
        Invite People
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InviteAttendee',
  props: [
    'handleSheet',
    'sheet',
    'uploadSheet',
    'sheetFileName',
    'uploadPercentage',
  ],
  methods: {
    submitSheet() {
      if (this.inviteeSheet === null) {
        this.$vs.notify({
          time: 3000,
          title: 'Oh No',
          text: 'No File Selected',
          color: 'warning',
        });
        return;
      }
      var formData = new FormData();
      formData.append(
        'file',
        this.inviteeSheet,
        console.log(URL.createObjectURL(this.inviteeSheet))
      );
      formData.append('cast_id', this.$route.params.session_key);
      axios
        .post(constants.apiCastUrl + '/api/event/invitee/import/', formData, {
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((res) => {
          this.$vs.notify({
            time: 3000,
            title: 'Success',
            text: 'People Invited Successfully.',
            color: 'success',
          });
          this.showPopup = false;
          this.inviteeSheet = '';
          this.sheetFileName = 'No File Selected';
          this.uploadPercentage = 0;
          this.userDetails();
        })
        .catch((e) => {
          if (e.response.data.message === 'invalid data') {
            this.$vs.notify({
              time: 3000,
              title: 'Try Again',
              text: 'The Format of the file is not supported',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              time: 3000,
              title: 'Unauthorize',
              text: 'You are not allowed to invite people',
              color: 'danger',
            });
          }
          this.inviteeSheet = '';
          this.sheetFileName = 'No File Selected';
          this.uploadPercentage = 0;
        });
    },
  },
};
</script>




<style scoped>
.border {
  border: 1px solid rgb(232, 237, 241);
}

.cursor {
  cursor: pointer;
}

.purple {
  color: #5925dc;
}
.form-group {
  justify-content: space-between;
}

.form-group input {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  font-weight: 500;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.btn {
  cursor: pointer;
  background: #ffffff;
  border: 1px dashed #eaecf0;
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.cursor-pointer {
  cursor: pointer !important;
}

.whiteBtn {
  background: transparent;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #d0d5dd;
  font-size: 16px;
}

.upload {
  height: 40px;
  width: 40px;
  background: #f2f4f7;
  border: 6px solid #f9fafb;
  border-radius: 28px;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 25%;
  opacity: 0;
  cursor: pointer;
}

.hide {
  display: none;
}

.modal div {
  margin: 20px 0;
}

.width {
  height: 40% !important;
}
</style>


