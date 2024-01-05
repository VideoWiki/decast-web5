<template>
  <div
    class="h-screen flex w-full vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-row w-full no-gutter justify-center items-center ">
      <div class="justify-center items-center">
        <div class=" tabs-container justify-center items-center">
          <div class="top">
            <div style="display: flex;justify-content: center;">
              <img
                style="border-radius:50%;"
                src="@/assets/images/pages/thanks1.png"
              />
            </div>
            <div style="display: flex;justify-content: center;">
              <h2 class="title mb-10">Thanks!</h2>
            </div>


          </div>
          <div class="bottom px-12">
            <h2 class="pt-10 pb-2 text" style="display: flex;justify-content: center;">Thanks For Attending Event!</h2>
            <p class="px-2">We recommended that you sign up to create or <br> attend more casts on videowiki</p>
            <div style="display: flex;justify-content: center;">
              <router-link class="textwh mr-5" to="/"
              >
              <vs-button pill class="mt-8 radius">Back to Home</vs-button>
              </router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .top{
    background: linear-gradient(112.12deg, #7448FF 1.33%, #7247C4 115.24%);
    border-radius: 12px 12px 0px 0px;
  }
  img{
    transform: translate(0px, -30px);
  }
  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 70px;
    color: #FFFFFF;
  }
  .bottom {
    background: #FFFFFF;
    box-shadow: 0px 30px 40px rgba(160, 142, 215, 0.1);
    border-radius: 0px 0px 12px 12px;
  }
  .text{
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    text-transform: capitalize;

    color: #000000;
  }
  p {
    font-weight: normal;
    font-size: 18px;
    letter-spacing: -0.005em;
    display: flex;justify-content: center;
    color: #909090;
  }

  button{
    background: #7247C4!important;
    transform: translate(0px, 20px);
    border-radius: 20px;
  }
</style>
