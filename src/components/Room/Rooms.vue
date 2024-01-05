<template>
  <div class="center-container m-auto mt-10">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2
          class="custom-heading"
          style="color: #a6a6a8; font-weight: 500; font-size: 24px"
        >
          Rooms
        </h2>
        <p class="sub-heading pt-2">
          Rooms are social spaces for direct communication. Ideal for X Y Z.
          <a
            target="_blank"
            href="#"
            style="color: #31a2f4; text-decoration: underline; cursor: pointer"
            >Learn more about Rooms.</a
          >
        </p>
      </div>

      <div class="flex justify-between">
        <button class="header-button border-none">
          <img src="./Rooms/Vector.svg" class="h-7 p-2 px-2" alt="" />
        </button>
        <button
          class="header-button p-2"
          style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          "
        >
          <img src="./Rooms/Plus.svg" alt="" />
        </button>
        <button class="header-button border-none">
          <img src="./Rooms/Vector2.svg" class="h-7 p-2 px-2" alt="" />
        </button>
      </div>
    </div>

    <div class="rooms-container">
      <div class="choose-room mt-12">
        <button class="options-button border-none">Your Rooms</button>
        <button class="options-button border-none px-6">Room Recordings</button>
      </div>

      <div class="options-container mt-10">
        <div class="child-options flex justify-between items-center mb-5">
          <div>
            <p style="font-size: 14px; font-weight: 500">
              Room title and length limit
            </p>
          </div>
          <div class="flex justify-between">
            <button class="copy-link">
              <img src="./Rooms/copy.svg" alt="" />
            </button>
            <button class="session-button ml-4">Start Session</button>
            <button class="header-button border-none">
              <img src="./Rooms/Vector2.svg" class="h-7 p-2 pl-4" alt="" />
            </button>
          </div>
        </div>
        <div class="child-options flex justify-between items-center mb-5">
          <div>
            <p style="font-size: 14px; font-weight: 500">
              Room title and length limit
            </p>
          </div>
          <div class="flex justify-between">
            <button class="copy-link">
              <img src="./Rooms/copy.svg" alt="" />
            </button>
            <button class="session-button ml-4">Start Session</button>
            <button class="header-button border-none">
              <img src="./Rooms/Vector2.svg" class="h-7 p-2 pl-4" alt="" />
            </button>
          </div>
        </div>
        <div class="child-options flex justify-between items-center mb-5">
          <div>
            <p style="font-size: 14px; font-weight: 500">
              Room title and length limit
            </p>
          </div>
          <div class="flex justify-between">
            <button class="copy-link">
              <img src="./Rooms/copy.svg" alt="" />
            </button>
            <button class="session-button ml-4">Start Session</button>
            <button class="header-button border-none">
              <img src="./Rooms/Vector2.svg" class="h-7 p-2 pl-4" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content m-auto">
      <p class="m-auto">3/3</p>
      <p>
        Need more dedicated room?
        <a target="_blank" href="#" style="color: #31a2f4; cursor: pointer"
          >Contact us for a tailored plan</a
        >
      </p>
    </div>
  </div>
</template>

<style>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

body {
  background-color: #181a20;
}

.center-container {
  justify-content: center;
  align-items: center;
  border: 1px solid #31394e;
  border-radius: 10px;
  padding: 30px;
  max-width: 550px;
  min-height: 75vh;
  background-color: #181a20;
  color: #a6a6a8;
}

.heading-container {
  width: 270px;
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
  margin-left: 5px;
}

.options-button {
  background: none;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.options-button:focus {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.child-options {
  padding: 10px 10px 10px 25px;
  border: 1px solid #31394e;
  border-radius: 10px;
  height: 70px;
  font-weight: 600;
}

.session-button {
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 8px 10px 8px 10px;
  color: #a6a6a8;
  border-radius: 5px;
  font-weight: 700;
  font-weight: 12px;
}

.session-button:hover {
  background-color: #d7df23;
  color: #1f272f;
  cursor: pointer;
}

.copy-link {
  cursor: pointer;
  background: none;
  border: 1px solid #31394e;
  border-radius: 6px;
  width: 35px;
  height: 34px;
  padding: 5px;
  position: relative;
}

.copy-link:hover::before {
  content: 'https://room.video.wiki/b/dhe-ztu-y2w-lsi';
  /* Add your desired tooltip text */
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #a6a6a8;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0.9;
  z-index: 1;
}

.options-container {
  height: 303px;
  padding-top: 0;
  overflow-y: scroll;
}

.options-container::-webkit-scrollbar {
  width: 8px;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.footer-content {
  width: max-content;
  text-align: center;
  margin-top: 20;
}
</style>
