<template>
  <div class="center-container-full">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2
          class="custom-heading"
          style="color: #a6a6a8; font-weight: 500; font-size: 24px"
        >
          Casts
        </h2>
        <p class="sub-heading pt-2">
          Casts are social spaces for events and wide-range. Ideal for X Y Z.
          <a
            target="_blank"
            href="#"
            style="color: #31a2f4; text-decoration: underline; cursor: pointer"
            >Learn more about Casts.</a
          >
        </p>
      </div>
      <div class="flex justify-between">
        <button
          class="header-button p-2"
          style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          "
          @click="openCreate"
        >
          <img src="@/assets/images/Plus.svg" alt="" />
        </button>
        <!-- <button class="header-button border-none">
          <img
            src="@/assets/images/dashboard/dots3.svg"
            class="h-7 p-1"
            alt="dots"
          />
        </button> -->
      </div>
    </div>

    <!-- <div class="bottom">
      <div class="coming-soon">
        <h3>COMING SOON</h3>
      </div>
      <div class="cast-featurea">
        <p>Cast feature coming soon some more</p>
        <p>description goes here.</p>
      </div>
    </div> -->

    <div class="rooms-container">
      <div class="choose-room">
        <button
          class="options-button border-none"
          @click="changeFocus(true)"
          :class="{ 'focused-button': focusYourRooms }"
        >
          Scheduled Casts
        </button>
        <button
          class="options-button border-none px-5"
          @click="handleButtonClick"
          :class="{ 'focused-button': !focusYourRooms }"
        >
          Cast Recordings
        </button>
      </div>

      <div class="options-container">
        <div v-if="focusYourRooms">
          <div v-for="(cast, index) in casts" :key="index">
            <div
              v-if="isMobileView"
              class="child-options"
              :style="{ borderRight: '5px solid ' + getColor(index) }"
              @click="expandRoom(index)"
              :class="{ 'expanded-room': expandedRoom === index }"
            >
              <div class="inner-div1">
                <div class="inner-child1">
                  <p class="text-lg whitespace-no-wrap" style="width: 50%">
                    {{ cast.event_name }}
                  </p>
                  <button class="text-xs whitespace-no-wrap">
                    {{
                      moment(cast.event_date).format('ll').split(',')[0] +
                      ' ' +
                      moment(cast.event_time.split('.')[0], 'HH:mm:ss').format(
                        'h:mm A'
                      )
                    }}
                  </button>
                </div>
                <div v-if="cast.invitee_list.length === 0" class="inner-child2">
                  <span
                    class="invite-text"
                    href="#"
                    @click="
                      ShowInvite(
                        cast.public_meeting_id,
                        cast.invitee_list,
                        streamInfo[cast.public_meeting_id],
                        cast.viewer_mode
                      )
                    "
                    >Invite Attendees</span
                  >
                  <img src="@/assets/images/user.svg" />
                </div>
                <div v-else class="inner-child2 my-4">
                  <p
                    class="invite-text"
                    @click="
                      ShowInvite(
                        cast.public_meeting_id,
                        cast.invitee_list,
                        streamInfo[cast.public_meeting_id],
                        cast.viewer_mode
                      )
                    "
                  >
                    {{ cast.invitee_list.length }} attendees invited
                  </p>
                  <div class="flex my-1">
                    <span
                      v-for="(image, imageIndex) in cast.invitee_list"
                      :key="imageIndex"
                      alt=""
                    >
                      <span class="attendee">
                        {{ image.email.slice(0, 2) }}
                      </span>
                    </span>
                  </div>
                </div>
                <!-- <p>{{ totalImagesCount[index] }}</p> -->
              </div>
              <div
                class="inner-div2"
                v-if="expandedRoom !== null && expandedRoom !== index"
              >
                <button
                  class="k-btn"
                  @click="
                    togglePopup(
                      index,
                      cast.public_meeting_id,
                      cast.invitee_list
                    )
                  "
                >
                  <img
                    src="@/assets/images/dashboard/dots3.svg"
                    class="h-7 p-2 text-white"
                    alt=""
                  />
                </button>
              </div>

              <div
                class="inner-div2"
                v-else-if="expandedRoom === index"
                :style="{ backgroundColor: getColor(index) }"
              >
                <span v-if="streamInfo[cast.public_meeting_id]">
                  <button
                    v-if="streamInfo[cast.public_meeting_id].stream_status"
                    class="stream-btn"
                    @click.stop
                    @click="toggleStream(cast.public_meeting_id, 'pause')"
                  >
                    <feather-icon
                      icon="PauseIcon"
                      svgClasses="stroke-current"
                      class="block icon"
                    />
                  </button>
                  <!-- <div class="tooltip" v-if="showTooltip===index">Pause Stream</div> -->
                  <button
                    class="action-btn"
                    id="stream-btn"
                    v-else
                    @click.stop
                    @click="toggleStream(cast.public_meeting_id, 'start')"
                  >
                    <img src="@/assets/images/dashboard/Livecopy.svg" alt="" />
                  </button>
                </span>
                <button
                  class="k-btn"
                  @click.stop
                  @click="
                    togglePopup(
                      index,
                      cast.public_meeting_id,
                      cast.invitee_list
                    )
                  "
                >
                  <img
                    src="@/assets/images/dashboard/dots3.svg"
                    class="h-7 p-2 text-white"
                    alt=""
                  />
                </button>

                <div
                  class="cast-popup"
                  @click.stop
                  v-if="showPopup === index"
                  @click="closePopup(index)"
                >
                  <button @click="toggleNFT(cast.public_meeting_id)">
                    <img src="@/assets/images/manage.svg" alt="" />Manage
                    attendees
                  </button>
                  <button @click="showSettingsPopup(cast.public_meeting_id)">
                    <img src="@/assets/images/call.svg" alt="" />Call settings
                  </button>
                  <button @click="showStream(cast.public_meeting_id)">
                    <img src="@/assets/images/stream.svg" alt="" />Stream
                    settings
                  </button>
                  <!-- <button @click="toggleNFT">
                    <img src="@/assets/images/drops.svg" alt="" />Drops
                  </button> -->
                  <button
                    @click="togglePostpone(cast.public_meeting_id, index, true)"
                  >
                    <img
                      src="@/assets/images/reschedule.svg"
                      alt=""
                    />Reschedule cast
                  </button>
                  <!-- <button>
                    <img src="@/assets/images/clock.svg" alt="" />Set reminder
                  </button> -->
                  <button>
                    <img src="@/assets/images/pen.svg" alt="" />Edit
                  </button>
                  <button
                    @click="
                      togglePostpone(cast.public_meeting_id, index, false)
                    "
                  >
                    <img src="@/assets/images/prepone.svg" alt="" />Postpone
                    cast
                  </button>
                  <button @click="openDeletePopup(cast.public_meeting_id)">
                    <img src="@/assets/images/delete.svg" />
                    Delete
                  </button>
                </div>
                <!----------------->
                <div class="inner-child3">
                  <div class="inner-child4">
                    <button
                      class="copy-button cop-btn border-none"
                      @click.stop
                      @click="toggleCopy(index)"
                      v-if="expandedRoom === index"
                      :style="{ backgroundColor: getColor(index) }"
                    >
                      <img
                        src="@/assets/images/dashboard/copymob.svg"
                        class="p-3 bg-white bg-opacity-50"
                        style="
                          border: none;
                          padding: 10px;
                          background: rgba(255, 255, 255, 0.5);
                          border-radius: 5px;
                        "
                        alt="copy"
                        :style="{ backgroundColor: getColor(index) }"
                      />
                    </button>
                    <button
                      id="new-id"
                      v-if="
                        cast.is_running === 'true' && expandedRoom === index
                      "
                    >
                      live
                    </button>

                    <div id="copy-pop" @click.stop v-if="showCopy === index">
                      <button
                        id="copy-btn-1"
                        @click="copy(cast.public_meeting_id, cast.h_ap)"
                      >
                        <img src="@/assets/images/co-host.svg" />
                        Participant url
                      </button>
                      <br />
                      <button id="copy-btn-2">
                        <img src="@/assets/images/Participant.svg" />
                        Co-host url
                      </button>
                      <button
                        @click="copy(cast.public_meeting_id, undefined)"
                        id="copy-btn-3"
                        v-if="streamInfo[cast.public_meeting_id]"
                      >
                        <img src="@/assets/images/dashboard/Live.svg" />
                        Stream url
                      </button>
                    </div>

                    <button
                      v-if="cast.is_running === 'false'"
                      @click="joinNow(cast.public_meeting_id)"
                      id="go-btn"
                      class="btn-1"
                    >
                      Go live now
                    </button>
                    <button
                      class="copy-button border-none"
                      @click.stop
                      v-if="
                        cast.is_running === 'false' && expandedRoom === index
                      "
                      @click="joinNow(cast.public_meeting_id)"
                      :style="{ backgroundColor: getColor(index) }"
                    >
                      <img
                        :style="{ backgroundColor: getColor(index) }"
                        src="@/assets/images/dashboard/record.svg"
                        class="p-3 mr-5 bg-white bg-opacity-50"
                        style="
                          border: none;
                          padding: 10px;
                          background: rgba(255, 255, 255, 0.5);
                          border-radius: 5px;
                        "
                        alt="record"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="child-options">
              <div class="inner-div1">
                <div class="inner-child1">
                  <p>{{ cast.event_name }}</p>
                  <button>
                    {{
                      moment(cast.event_date).format('ll').split(',')[0] +
                      ' ' +
                      NewTime(cast.event_date, cast.event_time)
                    }}
                  </button>
                </div>
                <div
                  v-if="cast.invitee_list.length === 0"
                  class="inner-child2"
                  @click="
                    ShowInvite(
                      cast.public_meeting_id,
                      cast.invitee_list,
                      streamInfo[cast.public_meeting_id],
                      cast.viewer_mode
                    )
                  "
                >
                  <span class="invite-text" href="#">Invite Attendees</span>
                  <img id="user-img" src="@/assets/images/user.svg" />
                </div>
                <div v-else class="inner-child2 my-4">
                  <p
                    class="invite-text"
                    @click="
                      ShowInvite(
                        cast.public_meeting_id,
                        cast.invitee_list,
                        streamInfo[cast.public_meeting_id],
                        cast.viewer_mode
                      )
                    "
                  >
                    {{ cast.invitee_list.length }} attendees invited
                  </p>
                  <div class="flex my-1">
                    <span
                      v-for="(image, imageIndex) in cast.invitee_list"
                      :key="imageIndex"
                      alt=""
                    >
                      <span class="attendee">
                        {{ image.email.slice(0, 2) }}
                      </span>
                    </span>
                  </div>
                </div>
                <!-- <p>{{ totalImagesCount[index] }}</p> -->
              </div>

              <div class="inner-div2">
                <button
                  class="k-btn"
                  @click="
                    togglePopup(
                      index,
                      cast.public_meeting_id,
                      cast.invitee_list,
                      streamInfo[cast.public_meeting_id],
                      cast.viewer_mode
                    )
                  "
                >
                  <img
                    src="@/assets/images/Vector2.svg"
                    class="h-7 p-2"
                    alt=""
                  />
                </button>
                <div
                  class="cast-popup"
                  v-if="showPopup === index"
                  @click="closePopup(index)"
                >
                  <button @click="toggleNFT(cast.public_meeting_id)">
                    <img src="@/assets/images/manage.svg" alt="" />Manage
                    attendees
                  </button>
                  <button @click="showSettingsPopup(cast.public_meeting_id)">
                    <img src="@/assets/images/call.svg" alt="" />Call settings
                  </button>
                  <button @click="showStream(cast.public_meeting_id)">
                    <img src="@/assets/images/stream.svg" alt="" />Stream
                    settings
                  </button>
                  <!-- <button @click="toggleNFT(cast.public_meeting_id)">
                    <img src="@/assets/images/drops.svg" alt="" />Drops
                  </button> -->
                  <button
                    @click="togglePostpone(cast.public_meeting_id, index, true)"
                  >
                    <img
                      src="@/assets/images/reschedule.svg"
                      alt=""
                    />Reschedule cast
                  </button>
                  <!-- <button>
                    <img src="@/assets/images/clock.svg" alt="" />Set reminder
                  </button> -->
                  <button
                    @click="
                      toggleEditCast(cast.public_meeting_id, index, false)
                    "
                  >
                    <img src="@/assets/images/pen.svg" alt="" />Edit
                  </button>
                  <button
                    @click="
                      togglePostpone(cast.public_meeting_id, index, false)
                    "
                  >
                    <img src="@/assets/images/prepone.svg" alt="" />Postpone
                    cast
                  </button>
                  <button @click="openDeletePopup(cast.public_meeting_id)">
                    <img src="@/assets/images/delete.svg" />
                    Delete
                  </button>
                </div>

                <div class="inner-child3">
                  <div class="inner-child4">
                    <div v-if="streamInfo[cast.public_meeting_id]">
                      <button
                        v-if="streamInfo[cast.public_meeting_id].stream_status"
                        class="stream-btn"
                        @click="toggleStream(cast.public_meeting_id, 'pause')"
                      >
                        <feather-icon
                          icon="PauseIcon"
                          svgClasses="stroke-current"
                          class="block icon"
                        />
                      </button>
                      <!-- <div class="tooltip" v-if="showTooltip===index">Pause Stream</div> -->
                      <button
                        class="action-btn"
                        id="stream-btn"
                        v-else
                        @mouseover="toggleTool2(index)"
                        @mouseleave="toggleTool2(index)"
                        @click="toggleStream(cast.public_meeting_id, 'start')"
                      >
                        <img src="@/assets/images/dashboard/Live.svg" alt="" />
                      </button>
                      <div class="tooltip" v-if="showTooltip2 === index">
                        Start Stream
                      </div>
                    </div>
                    <button class="cop-btn" @click="toggleCopy(index)">
                      <img src="@/assets/images/dashboard/copy.svg" alt="" />
                    </button>
                    <div
                      id="copy-pop"
                      class="cop-cont"
                      v-if="showCopy === index"
                    >
                      <button
                        id="copy-btn-1"
                        @click="copy(cast.public_meeting_id, cast.h_ap)"
                      >
                        <img src="@/assets/images/co-host.svg" />
                        Copy Participant url
                      </button>
                      <br />
                      <button
                        @click="copy(cast.public_meeting_id, cast.h_mp)"
                        id="copy-btn-2"
                      >
                        <img src="@/assets/images/Participant.svg" />
                        Copy Co-host url
                      </button>
                      <button
                        @click="copy(cast.public_meeting_id, undefined)"
                        id="copy-btn-3"
                        v-if="streamInfo[cast.public_meeting_id]"
                      >
                        <img src="@/assets/images/dashboard/Live.svg" />
                        Copy Stream url
                      </button>
                    </div>
                    <button
                      v-if="cast.is_running === 'false'"
                      @click="joinNow(cast.public_meeting_id)"
                      id="go-btn"
                      class="live-btn"
                    >
                      Go live now
                      <p v-if="showRemainingTime(cast)">
                        {{ calculateRemainingTime(cast) }}
                      </p>
                    </button>
                    <button
                      v-if="cast.is_running === 'true'"
                      class="live-btn red-btn"
                    >
                      Cast is live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="recordingList.length">
            <div
              class="recordings flex justify-between items-center mb-4"
              v-for="(recording, index) in flattenedRecordingList"
              :key="index"
            >
              <div class="w-3/4 flex justify-between items-center">
                <p>
                  {{ recording['Start Time (Readable)'].split(' ')[0] }}
                </p>
                <p>
                  {{ recording.Name }}
                </p>
              </div>

              <button
                class="side-btn border-none"
                @click="toggleRecordingPopup(index)"
              >
                <img src="@/assets/images/Vector2.svg" class="h-7 p-2" alt="" />
              </button>
              <div
                class="record-popup"
                v-if="showRecord === index"
                @click="closePopup(index)"
              >
                <button @click="openRecording(recording)">
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-play"
                    size="12px"
                    rounded="true"
                    style="align-self: center"
                  >
                  </vs-icon>
                  Play
                </button>
                <button
                  @mouseover="toggleEditTool(index)"
                  @mouseleave="toggleEditTool(index)"
                  @click="editRecord(recording)"
                >
                  <img class="mr-1" src="@/assets/images/pen.svg" alt="" />Edit
                </button>
                <button @click="copyRecording(recording)">
                  <img src="@/assets/images/copy.svg" />
                  Copy
                </button>
                <div class="tooltip2" v-if="showTooltip === index">
                  <div>
                    The recording may require some time for processing. If it
                    doesn't work, please try again later.
                  </div>
                  <div class="triangle"></div>
                </div>
                <!-- <button @click="downloadRoom(room)">
                  <img src="@/assets/images/download.svg" />
                  Download
                </button> -->
                <!-- <button @click="copyLink(room)">
                  <img src="@/assets/images/copy.svg" />
                  Copy Link
                </button> -->
                <!-- <button @click="copyRecording(recording, index)">
                  <img src="@/assets/images/copy.svg" />
                  Copy Link
                </button> -->
              </div>
            </div>
          </div>
          <div
            v-else
            class="recording flex flex-col items-center justify-items-center"
          >
            <img
              src="@/assets/images/dashboard/NoRecording.svg"
              class="w-1/2"
            />
            <img
              src="@/assets/images/dashboard/NoRecordingText1.svg"
              class="mb-3"
            />
            <img src="@/assets/images/dashboard/NoRecordingText.svg" />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="footer-content m-auto">
      <p>
        You can only create one cast per week in our free plan want to create
        more try our premium plan.
      </p>
    </div> -->
    <div class="popup" @click="closeAllPopups" v-if="create">
      <set-up-cast
        :getList="getCastList"
        :closeCreate="closeCreate"
      ></set-up-cast>
    </div>
    <div class="popup" @click="closeAllPopups" v-if="stream">
      <StreamingTab
        class="stream-co"
        :closeCreate="() => (stream = false)"
        :stepFourProps="stepFourProps"
        :stepThreeProps="stepThreeProps"
        :stepTwoProps="stepTwoProps"
        :stepOneProps="stepOneProps"
        :castId="index"
      >
      </StreamingTab>
      <!--<stream-card
        :closeCreate="() => (stream = false)"
        :stepFourProps="stepFourProps"
        :stepThreeProps="stepThreeProps"
        :stepTwoProps="stepTwoProps"
        :stepOneProps="stepOneProps"
        :castId="index"
      ></stream-card>-->
    </div>
    <div class="popup" v-if="showSettings" @click="closeAllPopups">
      <div class="edit-settings p-5">
        <div class="flex justify-between">
          <div class="heading">Change Settings</div>
          <img
            class="cursor-pointer"
            src="@/assets/images/create-event/Vector30.svg"
            @click="closeAllPopups"
          />
        </div>
        <settings-tab
          :stepFourProps="stepFourProps"
          :stepThreeProps="stepThreeProps"
          :stepTwoProps="stepTwoProps"
          :stepOneProps="stepOneProps"
          :castId="index"
          :closeCreate="() => (showSettings = false)"
        />
      </div>
    </div>
    <div class="popup" v-if="showPostpone" @click="closeRes">
      <div class="post-time">
        <postPoneCast
          :cast_id="index"
          :cast_name="castsInfo[index].details.event_name"
          :allow_moderator_to_unmute_user="
            castsInfo[index].details.allow_moderator_to_unmute_user
          "
          :auto_start_recording="castsInfo[index].details.auto_start_recording"
          :description="castsInfo[index].details.description"
          :cast_type="castsInfo[index].details.cast_type"
          :collect_attendee_email="
            castsInfo[index].details.collect_attendee_email
          "
          :private_otp="castsInfo[index].details.otp_private"
          :timezone="castsInfo[index].details.timezone"
          :logo="castsInfo[index].details.logo"
          :cover_image="castsInfo[index].details.cover_image"
          :primary_color="castsInfo[index].details.primary_color"
          :welcome_text="castsInfo[index].details.welcome_text"
          :banner_text="castsInfo[index].details.banner_text"
          :guest_policy="castsInfo[index].details.guest_policy"
          :moderator_only_text="castsInfo[index].details.moderator_only_text"
          :logout_url="castsInfo[index].details.logout_url"
          :is_streaming="castsInfo[index].details.is_streaming"
          :public_stream="castsInfo[index].details.public_stream"
          :bbb_stream_url="castsInfo[index].details.bbb_stream_url"
          :record="castsInfo[index].details.record"
          :password_auth="castsInfo[index].details.password_auth"
          :end_when_no_moderator="
            castsInfo[index].details.end_when_no_moderator
          "
          :mute_on_start="castsInfo[index].details.mute_on_start"
          :webcam_only_for_moderator="
            castsInfo[index].details.webcam_only_for_moderator
          "
          :disable_cam="castsInfo[index].details.disable_cam"
          :disable_mic="castsInfo[index].details.disable_mic"
          :lock_layout="castsInfo[index].details.lock_layout"
          :viewer_mode="castsInfo[index].details.viewer_mode"
          :schedule="castsInfo[index].details.schedule_time"
          :timeLeft="castsInfo[index].details.duration"
          :closePostpone="closePostpone"
          :toPostpone="toPostpone"
        />
      </div>
    </div>
    <div class="popup" @click="closeAllPopups" v-if="showNftDetail">
      <NftDetails
        :isAirdrop="isAirdrop"
        :pub_nft_flow="pub_nft_flow"
        :cast_id="index"
        :stepFourProps="stepFourProps"
        :stepThreeProps="stepThreeProps"
        :stepTwoProps="stepTwoProps"
        :stepOneProps="stepOneProps"
        :cast_type="castsInfo[index].details.cast_type"
        :public_nft_status="public_nft_status"
        @updatePublicNftStatus="handlePublicNftStatusUpdate"
      />
    </div>
    <div class="popup" v-if="showEditCast">
      <SetUpEditCast
        :cast_id="index"
        :getCast="getCastList"
        :showEditCast="showEditCast"
        @updateShowEditCast="updateShowEditCast"
      ></SetUpEditCast>
    </div>
    <div class="popup" v-if="showDeletePopup">
      <DeleteConfirmation
        :index="index"
        :type="type"
        @confirm="deleteCast"
        @hide="closeDeletePopup"
      />
    </div>
    <div class="popup" @click="closeAllPopups" v-if="invite">
      <InviteCard
        :isAirdrop="isAirdrop"
        :pub_nft_flow="pub_nft_flow"
        :public_nft_status="public_nft_status"
        :changePublicNftStatus="changePublicNftStatus"
        :nft_details_submitted="nft_details_submitted"
        :vc_details_submitted="vc_details_submitted"
        :stepOneProps="stepOneProps"

        :event_nft_enabled="event_nft_enabled"
        :certificate_enabled="certificate_enabled"
        :castId="meetingId"
        :invites="invites"
        :isStream="isStream"
        :viewer="viewer"
        :closeInvite="() => (invite = false)"
      ></InviteCard>
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone';
import SetUpCast from '../../../SetUpCasts/SetUpCast.vue';
import InviteCard from '../InviteCard.vue';
import postPoneCast from '../postPoneCast.vue';
import SettingsTab from '../../../SetUpCasts/Tabs/SettingsTab.vue';
import StreamingTab from '../../../SetUpCasts/Tabs/StreamingTab.vue';
import SetUpEditCast from '../../EditCast/SetUpEditCast.vue';
import constants from '../../../../constant';
import DeleteConfirmation from './DeleteConfirmation.vue';
import NftDetails from '../NFT/PopUps/NftDeatils.vue';
export default {
  components: {
    SetUpCast,
    SetUpEditCast,
    InviteCard,
    postPoneCast,
    SettingsTab,
    StreamingTab,
    DeleteConfirmation,
    NftDetails,
  },
  name: 'rightpart',
  data() {
    return {
      type: 'cast',
      isMobileView: false,
      expandedRoom: null,
      showDeletePopup: false,
      focusYourRooms: true,
      create: false,
      showCastIsLive: false,
      showNftDetail: false,
      stream: false,
      invite: false,
      pub_nft_flow: false,
      public_nft_status: false,
      airdrops: false,
      event_nft_enabled: false,
      isAirdrop: false,
      airdrop_done: false,
      certificate_done: false,
      certificate_enabled: false,
      airDrops: false,
      walletAddress: [],
      airDropList: [],
      users: [],
      userName: '',
      running: false,
      expired: false,
      userNameError: false,
      userEmailError: false,
      userEmailDuplicate: false,
      userEmail: '',
      showPopup: false,
      showRecord: false,
      showCopy: false,
      showTooltip: false,
      showTooltip2: false,
      showSettings: false,
      moment,
      casts: [],
      remainingTime: [],
      invites: [],
      recordingList: [],
      postPoneVisible: false,
      castInfo: {},
      toPostpone: false,
      showPostpone: false,
      showEditCast: false,
      mouse: 0,
      index: '',
      stepFourProps: {},
      stepOneProps: {},
      stepTwoProps: {},
      stepThreeProps: {},
      castsInfo: [],
      streamInfo: {},
      isStream: false,
      viewer: false,
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
    const container = document.querySelectorAll('.options-container')[1];
    container.addEventListener('mousemove', (e) => {
      // Get the mouse coordinates relative to the div
      const divRect = container.getBoundingClientRect();
      const mouseY = e.clientY - divRect.top;
      this.mouse = mouseY;
    });
    this.getCastList();
    // this.getRecordings();
    window.addEventListener('click', this.handleGlobalClick);
    window.addEventListener('click', this.handleClick2);
    window.addEventListener('click', this.handleClick3);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
    window.removeEventListener('click', this.handleClick2);
    window.removeEventListener('click', this.handleClick3);
    // Remove the global click event listener when the component is destroyed
    window.removeEventListener('resize', this.checkScreenWidth);
  },
  computed: {
    totalImagesCount() {
      return this.casts.map((cast) => cast.images.length);
    },
    flattenedRecordingList() {
      return this.flattenRecordingList(this.recordingList);
    },
    // recording() {
    //   return this.$store.state.cast.recordingList;
    // },
  },
  created() {
    this.updateRemainingTime();
  },
  methods: {
    async changePublicNftStatus(castId, curr_status) {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/publicNftActivate', {
            cast_id: castId,
            nft_activate: curr_status,
          })
          .then((res) => {
            // eslint-disable-next-line camelcase
            this.public_nft_status = curr_status === 'True';
            this.$vs.loading.close();
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'Error',
          text: 'Try again !',
          color: 'Danger',
        });
      }
    },
    flattenRecordingList(recordingList) {
      const flattenedList = [];
      recordingList.forEach((meetings) => {
        meetings.forEach((recording) => {
          flattenedList.push(recording);
        });
      });
      return flattenedList;
    },
    handleButtonClick() {
      this.changeFocus(false);
      this.getRecordings();
    },
    ShowInvite(id, inviteList, stream, viewer) {
      this.meetingId = id;
      this.invites = inviteList;
      this.isStream = typeof stream !== 'undefined';
      console.log(typeof stream !== 'undefined');
      this.viewer = viewer;
      console.log(viewer);
      this.invite = true;
    },
    toggleNFT(id) {
      // this.showNftDetail = true;
      this.index = id;
      this.castNftInfo(id);
      this.invite = true;
      this.stepOneProps = {
        sender_addresses: [],
      }
    },
    handlePublicNftStatusUpdate(newStatus) {
      console.log(this.public_nft_status,'nftstatus')
      this.public_nft_status = newStatus;
    },
    async toggleStream(id, action) {
      this.resetShowTooltip2();
      console.log(action);
      try {
        this.$vs.loading();
        if (action === 'start') {
          await this.$store.dispatch('studio/startStream', {
            cast_id: id,
          });
          this.$vs.notify({
            title: 'Successful',
            text: 'Stream Started',
            color: 'success',
          });
          this.streamInfo[id].stream_status =
            !this.streamInfo[id].stream_status;
        } else {
          await this.$store.dispatch('studio/endStream', {
            cast_id: id,
          });
          this.$vs.notify({
            title: 'Successful',
            text: 'Stream Ended',
            color: 'success',
          });
          this.resetShowTooltip2();
          this.streamInfo[id].stream_status =
            !this.streamInfo[id].stream_status;
        }
      } catch (err) {
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
      } finally {
        this.$vs.loading.close();
      }
    },
    NewTime(date, time) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const a = moment(date + ' ' + time)
        .clone()
        .tz(timezone);
      // var timeAbbr = moment().tz(timezone).zoneAbbr();
      var newTime = moment(a._d).tz(timezone).format('h:mm A');
      return newTime;
    },
    calculateRemainingTime(cast) {
      const eventDateTime = moment.utc(cast.event_date + ' ' + cast.event_time);
      const currentTime = moment();
      const duration = moment.duration(eventDateTime.diff(currentTime));
      const hours = Math.floor(duration.asHours());
      const minutes = moment.utc(duration.asMilliseconds()).format('mm');
      if (hours === 0) {
        return `${minutes}`;
      }
    },
    showRemainingTime(cast) {
      const eventDateTime = moment.utc(cast.event_date + ' ' + cast.event_time);
      const currentTime = moment();
      return eventDateTime.isAfter(currentTime);
    },
    updateRemainingTime() {
      setInterval(() => {
        this.$forceUpdate();
      }, 1000);
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    checkScreenWidth() {
      // Define your breakpoint for mobile view (e.g., 768 pixels)
      const mobileBreakpoint = 480;

      // Check if the screen width is below the mobile breakpoint
      this.isMobileView = window.innerWidth < mobileBreakpoint;
    },
    expandRoom(index) {
      if (this.expandedRoom === index) {
        this.expandedRoom = null;
      } else {
        this.expandedRoom = index;
      }
    },
    getColor(index) {
      const colors = ['#FCB92d', '#FB7E84', '#2CC2D3', '#79FC9E', '#D971BC'];
      return colors[index % colors.length];
    },
    closeRes(e) {
      if (e.currentTarget === e.target) {
        this.showPostpone = false;
      }
    },
    setProps(id) {
      const details = this.castsInfo[id].details;
      this.stepOneProps = {
        event_name: details.event_name,
        moderator_password: '',
        attendee_password: '',
        meeting_type: '',
        schedule_time: details.schedule_time,
        description: details.description,
        startTime: '0:00:00',
        timezone: details.timezone,
        startD: moment().format('YYYY-MM-DD'),
        password_auth: details.password_auth,
        auth_type: details.cast_type,
        send_otp: details.otp_private,
        public_auth: false,
        public_otp: details.collect_attendee_email,
      };
      this.stepTwoProps = {
        BackImageURL: '',
        imageURL: '',
        primary_color: details.primary_color,
        secondary_color: '',
        logo: details.logo,
        back_image: '',
        cover_image: details.cover_image,
        cover_image_error: false,
        back_image_error: false,
        banner_text: details.banner_text,
        moderator_only_text:
          'You are a Moderator, you can control who presents and participates in the live cast',
        guest_policy: details.guest_policy,
        welcome_text: details.welcome_text,
        showText: true,
        duration: details.duration,
        logout_url: details.logout_url,
      };
      this.stepThreeProps = {
        vw_stream: false,
        vw_stream_url: details.bbb_stream_url,
        is_streaming: details.is_streaming,
        public_stream: details.public_stream,
      };
      this.stepFourProps = {
        start_stop_recording: details.record,
        record: details.record,
        mute_on_start: details.mute_on_start,
        end_when_no_moderator: details.end_when_no_moderator,
        allow_moderator_to_unmute_user: details.allow_moderator_to_unmute_user,
        webcam_only_for_moderator: details.webcam_only_for_moderator,
        auto_start_recording: details.auto_start_recording,
        allow_start_stop_recording: details.record,
        disable_cam: details.disable_cam,
        disable_mic: details.disable_mic,
        lock_layout: details.lock_layout,
        lock_on_join: false,
        viewer_mode: details.viewer_mode,
        viewer_password: false,
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
      };
    },
    showStream(id) {
      this.index = id;
      this.setProps(id);
      this.stream = true;
    },
    showSettingsPopup(id) {
      this.setProps(id);
      this.index = id;

      this.showSettings = true;
    },
    openDeletePopup(id) {
      this.showDeletePopup = true;
      this.index = id;
    },
    closeDeletePopup() {
      this.showDeletePopup = false;
    },
    closeAllPopups(e) {
      if (e.currentTarget === e.target) {
        this.create = false;
        this.stream = false;
        this.invite = false;
        this.showDeletePopup = false;
        this.showSettings = false;
        this.showNftDetail = false;
      }
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.cast-popup');
      const isNotTogglePopupButton = !event.target.closest('.k-btn');
      if (
        isOutsideRoomPopup &&
        isNotTogglePopupButton &&
        this.showPopup !== null
      ) {
        this.showPopup = null;
      }
    },
    handleClick2(event) {
      // const isOutsideCopyPopup = !event.target.closest('.cop-cont');
      const isNotToggleCopyButton = !event.target.closest('.cop-btn');
      if (isNotToggleCopyButton && this.showCopy !== null) {
        this.showCopy = null;
      }
    },
    handleClick3(event) {
      const isNotToggleRecordButton = !event.target.closest('.record-popup');
      const isNotTogglePopupButton = !event.target.closest('.side-btn');
      if (
        isNotToggleRecordButton &&
        isNotTogglePopupButton &&
        this.showRecord !== null
      ) {
        this.showRecord = null;
      }
    },
    toggleRecordingPopup(index) {
      this.showRecord = this.showRecord === index ? null : index;
      setTimeout(() => {
        const roomPopups = document.querySelectorAll('.record-popup');
        if (this.mouse > 222) {
          console.log('yes', roomPopups);
          roomPopups.forEach((item) => (item.style.top = '-85%'));
        } else {
          roomPopups.forEach((item) => (item.style.top = '85%'));
        }
      }, 0);
    },
    async getRecordings() {
      try {
        const res = await this.$store.dispatch('cast/recordingList');
        this.recordingList = res.status || [];
        console.log(this.recordingList, 'lliii');
        console.log(res, 'records');
      } catch (e) {
        console.log(e);
      }
    },
    openRecording(recording) {
      const playbackURL =
        recording['Playback Data']['Playback URL'].replace(
          '/presentation/2.3',
          '/video'
        ) + '/video-0.m4v';
      window.open(playbackURL, '_blank');
    },
    copyRecording(recording) {
      navigator.clipboard.writeText(
        recording['Playback Data']['Playback URL'].replace(
          '/presentation/2.3',
          '/video'
        ) + '/video-0.m4v'
      );
    },
    editRecord(recording) {
      // this.$vs.notify({
      //   title: 'Info',
      //   text: 'Recording may take some time to process. Please wait.',
      //   color: 'primary',
      // });
      console.log(recording, 'mmmmmmm');
      setTimeout(() => {
        const meetingId = recording['Record ID'];
        const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
        window.open(url, '_blank');
      }, 1000);
    },
    // getCastList() {
    //   this.$store.dispatch('cast/getUserCasts').then((res) => {
    //     this.casts = res.data.my_events;
    //   });
    // },

    closePostpone() {
      this.showPostpone = false;
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    getCertificateInfo() {
      console.log('certificate called');
      this.$store
        .dispatch('cast/getCertificateInfo', {
          session_key: this.session_key,
        })
        .then((res) => {
          console.log('certificate info getting');
          this.abi = res.data.aib;
        })
        .catch((e) => {
          console.log('certificate info not getting');
          if (e.response.data.message === 'invalid cast_id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/error/404');
          }
          console.log(e);
        });
    },
    castNftInfo(id, setRunning) {
      console.log(id, 'newnft');
      const payload = id;
      this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          const response_val = await response.data;
          // console.log(response_val, 'pinky');
          this.expired = response_val.meeting_info.expired;
          this.public_meeting_id = response_val.meeting_info.public_meeting_id;
          this.vc_details_submitted =
            response_val.meeting_info.vc_details_submitted;
          this.coverImage = response_val.meeting_info.cover_image;
          this.event_nft_enabled =
            !response_val.meeting_info.pub_nft_flow &&
            response_val.meeting_info.nft_details_submitted;
          this.certificate_enabled =
            response_val.meeting_info.vc_details_submitted;
          this.public_nft_status = response_val.meeting_info.public_nft_status;
          this.pub_nft_flow = response_val.meeting_info.pub_nft_flow;
          this.public_stream = response_val.meeting_info.public_stream;
          this.viewer_mode = response_val.meeting_info.viewer_mode;
          this.stream_urls = response_val.meeting_info.stream_urls;
          this.isAirdrop = response_val.meeting_info.airdrop;
          this.stream_live_status = response_val.meeting_info.stream_status;
          this.stepOneProps.public_otp = response_val.meeting_info.public_otp;
          this.stepOneProps.send_otp = response_val.meeting_info.send_otp;
          this.stepOneProps.password_auth =
            response_val.meeting_info.password_auth;
          this.nft_details_submitted =
            response_val.meeting_info.nft_details_submitted;
          this.eventName = response_val.meeting_info.event_name;
          this.eventDescription = response_val.meeting_info.description;
          this.running = response_val.meeting_info.running;
          if (this.certificate_enabled) {
            this.getCertificateInfo();
          }
          if (!setRunning) {
            setTimeout(() => {
              this.castNftInfo(true);
              console.log('check it otu');
            }, 5000);
          }
          this.isPublic = !response_val.meeting_info.send_otp;
        })
        .catch((err) => {
          // this.$router.push('/error/404');
          if (err.response.data.message === 'invalid cast id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/mycasts');
          }
        });
    },
    copy(id, pass) {
      if (pass === undefined) {
        navigator.clipboard.writeText(constants.joinApi + 'live/' + id);
        return;
      }
      navigator.clipboard.writeText(
        constants.joinApi + 'join-cast/' + id + '/?pass=' + pass
      );
    },
    async joinNow(id) {
      const data = {
        email: '',
        name: '',
        password: '',
        public_meeting_id: id,
        redirect: true,
        room_type: 'private',
        avatar_url: '',
        guest: false,
        attendee_password: '',
        meetingId: '',
      };
      try {
        const res = await this.$store.dispatch('cast/joinNow', data);
        window.location.href = res.url;
      } catch (e) {
        console.log('error', e);
      }
    },
    async getCastList() {
      const response = await this.$store.dispatch('cast/getUserCasts');
      let casts = response.data.my_events;
      casts = casts.sort((a, b) => b.event_id - a.event_id);
      console.log(casts, casts.event_id, 'cats list');
      const castInfoPromises = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch(
            'cast/editEvent',
            cast.public_meeting_id
          );
          return { castId: cast.public_meeting_id, details: castDetails.data };
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const streamInfoPromise = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch(
            'auth/eventDetail',
            cast.public_meeting_id
          );
          return {
            castId: cast.public_meeting_id,
            details: castDetails.data.meeting_info,
          };
        } catch (error) {
          console.log(error);
        }
      });
      const streamInfoList = await Promise.all(streamInfoPromise);
      const castInfoList = await Promise.all(castInfoPromises);
      const validCastInfoList = castInfoList.filter((info) => info !== null);
      const validStreamInfo = streamInfoList.filter((info) => info !== null);
      const castsInfo = {};
      const streamInfo = {};
      validCastInfoList.forEach((info) => {
        castsInfo[info.castId] = info.details;
      });
      validStreamInfo.forEach((info) => {
        if (info.details.stream_urls !== null)
          streamInfo[info.castId] = info.details;
      });
      this.streamInfo = streamInfo;
      this.castsInfo = castsInfo;
      this.casts = casts;
      casts.sort((a, b) => b.event_id - a.event_id);
      console.log(casts, casts.event_id, 'cats list');
      // console.log(streamInfo, 'streamInfo');
      document.getElementById('loading-bg').style.display = 'none';
      // console.log(castsInfo, 'TTTT');
      // console.log(casts, 'pppp');
    },
    toggleEditCast(id, index, toEditCast) {
      this.showEditCast = true;
      this.index = id;
      this.toEditCast = toEditCast;
      console.log('index', this.index);
    },
    updateShowEditCast(value) {
      this.showEditCast = value;
    },
    togglePostpone(id, index, toPostpone) {
      this.showPostpone = true;
      this.index = id;
      this.toPostpone = toPostpone;
    },
    togglePopup(index, id, inviteList, stream, viewer) {
      this.meetingId = id;
      this.invites = inviteList;
      this.postPoneVisible = false;
      this.isStream = typeof stream !== 'undefined';
      this.viewer = viewer;
      this.showPopup = this.showPopup === index ? null : index;
      setTimeout(() => {
        const roomPopups = document.querySelectorAll('.cast-popup');
        if (this.mouse < 80) {
          roomPopups.forEach((item) => (item.style.top = '30%'));
        } else {
          roomPopups.forEach((item) => {
            item.style.top = '-100%';
            item.style.left = '59%';
          });
        }
      }, 0);
    },
    closePopup(index) {
      this.showPopup = null;
      this.showRecord = null;
    },
    toggleCopy(index) {
      this.postPoneVisible = false;
      this.showCopy = this.showCopy === index ? null : index;
      console.log(index, 'copy');
    },
    resetShowTooltip2() {
      this.showTooltip2 = null;
      this.showTooltip = null;
    },
    // toggleTool1(index){
    //   this.showTooltip = this.showTooltip === index ? null : index;
    // },
    toggleTool2(index) {
      this.showTooltip2 = this.showTooltip2 === index ? null : index;
    },
    toggleEditTool(index) {
      this.showTooltip = this.showTooltip === index ? null : index;
    },
    async deleteCast(index) {
      const res = await this.$store.dispatch('cast/deleteCast', this.index);
      console.log(res);
      const newCasts = this.casts.filter((item) => {
        return item.public_meeting_id !== index;
      });
      this.casts = newCasts;
      this.getCastList();
      this.closeDeletePopup();
    },
    openCreate() {
      this.create = true;
    },
    closeCreate() {
      this.create = false;
    },
  },
  created() {
    this.updateRemainingTime();
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  width: 100%;
  /* max-width: 500px; */
  margin: auto;
  margin-left: 37px;
  /* border: 1px solid white; */
  height: 100%;
}

.cop-btn {
  border: 1px solid #31394e !important;
  width: 33px !important;
  height: 33px;
}

.cop-btn img {
  margin: auto !important;
}

.cop-btn:active {
  border: 1px solid #d7df23 !important;
}

.active:active {
  border: 1px solid #d7df23;
}

.options-button {
  background: none;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

#stream-btn {
  border: 1px solid #31394e !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heading-container {
  width: 270px;
}

.tooltip {
  position: absolute;
  z-index: 5;
  width: fit-content;
  font-size: 12px;
  color: #a6a6a8;
  background-color: #31394e;
  border-radius: 4px;
  padding: 5px;
  pointer-events: none;
  top: -30px;
}

.tooltip2 {
  top: 10px;
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  right: 6rem;
  background-color: none;
  background: transparent;
  width: 280px;
}

.tooltip2 div:nth-child(1) {
  background-color: #31394e;
  display: flex;
  font-size: 12px;
  border-radius: 4px;
  padding: 5px;
}

.triangle {
  width: 0px;
  height: 0px;
  background: transparent;
  border-left: 10px solid #31394e;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  margin: auto;
}

.footer-content {
  text-align: center;
  margin-top: 40px !important;
  color: #d7df23;
  width: 350px;
  margin: auto;
}

.edit-settings {
  max-height: 650px;
  min-width: fit-content;
  overflow: auto;
  width: 583px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  transition: max-height 0.5s ease-in-out;
  /* padding: 18px; */
}

.choose-room {
  margin-top: 20px;
}

.sub-heading {
  font-weight: 400;
  font-size: 11px;
  line-height: 12.86px;
}

.header-button {
  background: none;
  cursor: pointer;
  height: max-content;
  margin-left: 15px;
}

.focused-button {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.options-container {
  height: 58vh;
  overflow: auto;
  margin-top: 30px;
}

.options-container::-webkit-scrollbar {
  width: 5px !important;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #31394e !important;
  border-radius: 4px !important;
  height: 10px !important;
}

#user-img {
  margin-bottom: -4px;
}

.images-container {
  width: 140px;
  height: 30px !important;
  padding: 0;
  margin: 0;
  overflow: hidden;
  /* border: 1px solid red; */
  z-index: 99;
  position: absolute;
  top: 70%;
}

.attendee {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 1px solid #31394e;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #31394e;
  /* position: absolute; */
}

.cast-popup {
  position: absolute;
  width: 150px;
  height: fit-content;
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #31394e;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 30%;
  left: 60%;
  z-index: 99;
  padding: 10px;
  margin: auto;
  text-align: left;
}

.cast-popup button {
  display: flex;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  gap: 7px;
  background-color: #1f272f;
  border: none;
  color: #647181;
  text-align: left;
  padding-top: 5px;
}

.cast-popup button:hover {
  color: white;
  background-color: #1f272f91;
}

.cast-popup button img {
  width: 10px;
  height: 10px;
}

#copy-pop {
  position: absolute;
  z-index: 999;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 6px;
  top: 35px;
  margin: 0 !important;
  padding: 0 !important;
}

#copy-btn-2 {
  margin-top: -21px;
}

#copy-pop button {
  background: transparent !important;
  font-size: 11px !important;
  display: flex;
  text-align: left;
  gap: 8px;
  border: none;
  outline: none;
  width: 140px !important;
  height: 30px;
  padding: 6px !important;
  font-family: 'Karla', sans-serif;
  color: #a6a6a8;
}

#copy-pop button:hover {
  color: white;
}

#copy-pop button img {
  width: 15px;
  height: 15px;
}

.child-options {
  max-width: 480px;
  width: 97%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #31394e;
  background-color: #1f272f;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
}

.inner-div1 {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  /* border: 1px solid green; */
}

.inner-child1 button {
  margin-top: 5px;
  background-color: #31394e85;
  padding: 5px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  color: #a6a6a8;
  cursor: pointer;
}

.inner-child2 {
  gap: 5px;
}

.inner-child2 div {
  max-width: 180px;
  overflow: hidden;
  height: 50px;
  gap: 5px;
}

.invite-text {
  text-decoration: underline;
  color: #a6a6a8;
  font-size: 12px;
  cursor: pointer;
}

.inner-div2 {
  width: 48%;
  justify-content: right;
  text-align: right;
  /* transform: translate(-20px, 0px); */
  /* border: 1px solid yellow; */
}

.inner-div2 button {
  background: none;
  border: none;
  align-items: right;
  cursor: pointer;
}

.inner-child3 {
  position: relative;
  /* width: 156px; */
}

.live-btn {
  background-color: #f84330 !important;
  border-radius: 6px;
  color: #ffffff;
  padding: 5px;
  height: 33px;
  width: 115px;
  z-index: 999;
}

.inner-child4 {
  display: flex;
  gap: 8px;
  margin-top: 5px;
  z-index: 5;
  position: absolute;
  width: 100%;
  justify-content: flex-end;
  top: 35px !important;
  /* left: 20px; */
}

.inner-child4 .action-btn {
  background: none;
  border: 1px solid #31394e;
  width: 33px;
  height: 33px;
}

#go-btn {
  background-color: #d7df23 !important;
  color: #31394e;
  display: flex;
  align-items: center;
  justify-content: center;
}

#go-btn p {
  margin-left: 3px;
}

.recordings {
  position: relative;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 8px;
}

.side-btn {
  background: none;
  cursor: pointer;
  height: max-content;
  margin-left: 5px;
}

.record-popup {
  position: absolute;
  background-color: #1f272f;
  width: 80px;
  padding: 8px;
  border: 1px solid #31394e;
  border-radius: 6px;
  z-index: 99;
  right: 10px;
}

.record-popup button {
  background: transparent;
  outline: none;
  border: none;
  margin: auto;
  cursor: pointer;
  color: #a6a6a8;
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
<style scoped>
.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  width: 100%;
  /* max-width: 500px; */
  margin: auto;
  margin-left: 37px;
  /* border: 1px solid white; */
  height: 100%;
}

@media (max-width: 499px) {
  .center-container-full {
    border: 0.5px;
    border-radius: 7px;
    padding: 16px;
    border-color: #31394e;
    background-color: #1f272f;
    width: 100%;
    overflow: hidden;
  }

  .center-container-full {
    justify-content: center;
    align-items: center;
    color: #a6a6a8;
    padding-bottom: 10px !important;
    width: 100%;
    /* max-width: 500px; */
    margin: auto;
    margin-left: 17px;
    /* border: 1px solid white; */
    height: 100%;
  }

  .child-options {
    max-width: 480px;
    width: 98%;
    height: 140px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #31394e;
    background-color: #1f272f;
    color: #a6a6a8;
    border-radius: 6px;
    padding: 0px 0px 10px 10px;
    margin-bottom: 20px;
    position: relative;
  }

  .options-container {
    margin-top: 20px;
    height: 44vh !important;
    padding-top: 0;
    overflow: auto;
    padding-bottom: 10px !important;
  }

  .cast-popup {
    width: 145px !important;
    left: 40%;
  }

  .invite-text {
    font-size: 10px;
    font-weight: 500;
  }

  .inner-child2 img {
    width: 12px;
    height: 12px;
  }

  .inner-child2 {
    width: 120px !important;
    gap: 0px;
    display: flex !important;
  }

  .copy-button {
    padding-left: -40px;
  }

  .cop-btn {
    border: none !important;
  }

  .options-container::-webkit-scrollbar {
    width: 5px;
  }

  .options-container::-webkit-scrollbar-thumb {
    background-color: #31394e !important;
    border-radius: 4px;
    height: 6px;
  }

  .tooltip2 {
    display: none;
  }

  .inner-child4 {
    margin-left: 10px;
  }

  .inner-child4 button {
    background: none;
    border: 1px solid #31394e;
    width: 33px;
    height: 33px;
  }

  .choose-room button {
    width: 45%;
    margin: 0;
    padding: 5px;
    white-space: nowrap;
  }

  .recording img {
    width: 100%;
    padding: 2px;
    margin: 10px;
  }

  .inner-div2 {
    height: 108.5%;
    min-width: 95px !important;
    max-width: 120px !important;
  }

  .stream-btn,
  .action-btn {
    width: 36px !important;
    height: 36px !important;
    position: absolute;
    margin-left: 5px;
    top: 5px;
    background: rgba(255, 255, 255, 0.5) !important;
    border-radius: 5px;
    border: none !important;
  }

  .stream-btn {
    background-color: blue !important;
  }

  .action-btn {
    background-color: orangered !important;
  }

  .k-btn {
    height: 3px;
    padding-right: 0px !important;
    padding-top: 0;
  }

  .btn-1 {
    display: none !important;
  }

  .inner-child3 button {
    background: none;
    cursor: pointer;
    height: max-content;
    margin-left: 5px;
  }

  /* .live-btn {
    color: #283140 !important;
    border: none !important;
    background-color: none !important;
    border-radius: 5px;
    padding: 3px;
    height: fit-content;
    z-index: 999;
    font-size: 12px;
    font-weight: 500;
    width: 34px !important;
    margin-top: 8px;
    margin-right: -5px;
    margin-left: -3px;
  } */

  #new-id {
    /* padding: 5px; */
    height: 36px !important;
    min-width: 36px !important;
    border: none !important;
    border-radius: 5px !important;
    background-color: red !important;
    color: yellow !important;
    padding: 0;
  }

  .inner-child3 {
    display: flex;
    align-items: center;
    margin-left: 12px;
  }

  .child-options div {
    width: 80%;
  }

  .inner-child4 {
    margin-right: 2px;
  }

  .popup {
    width: 100%;
    position: absolute;
    top: 0;
    left: 60%;
    background: transparent !important;
    overflow-y: hidden !important;
    /* height: 70%; */
    /* border: 1px solid red; */
  }

  .popup .stream-co {
    margin-top: -30rem;
    height: auto !important;
    border: 1px solid #31394e;
    padding: 6px;
    border-radius: 8px;
    overflow-y: scroll !important;
    min-height: 350px !important;
    max-height: 450px !important;
  }

  .edit-settings {
    margin-top: -30rem;
    height: auto !important;
    border: 1px solid #31394e;
    padding: 6px;
    border-radius: 8px;
    overflow-y: scroll !important;
    min-height: 350px !important;
    max-height: 450px !important;
  }

  .tooltip2 {
    display: none;
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

  .post-time,
  .delete-popup {
    margin-top: -40vh !important;
    /* margin-left: 60%; */
    /* border: 1px solid red; */
  }

  #copy-pop {
    width: 120px;
    /* right: -1px; */
    /* left: 0px; */
  }
}

@media (min-width: 500px) {
  .btn-23 {
    display: none;
  }
}
</style>
