<template>
  <div class="nav-cont">
    <nav>
      <div class="wiki-logo">
        <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
      </div>

      <div class="opt-cont">
        <div><a href="#">Features</a></div>
        <div><a href="#">Pricing</a></div>
        <div><a href="#">About</a></div>
        <div><a href="#">Faq</a></div>
        <div><a href="#">Contact</a></div>
      </div>

      <div class="log-cont">
        <div class="child-1">
          <button>Login</button>
          <div class="vertical-line sideOne"></div>
          <button>Signup</button>
        </div>
        <div class="child-2">
          <button>Book a Demo</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
/* body {
    background-color: #000000;
} */

.wiki-logo img {
  /* border: 1px solid red; */
  height: 91px;
  width: 91px;
}

.nav-cont {
  /* border: 1px solid white; */
  width: 100%;
  height: 100px;
  /* padding-top: 30px; */
  background-color: #000000;
}

.nav-cont nav {
  display: flex;
  /* border: 1px solid yellow; */
  width: 90%;
  max-width: 1400px;
  margin: auto;
  justify-content: space-between;
}

.sideOne {
  border-left: 1px solid #a6a6a6;
  width: 1px;
  margin: auto;
  height: 13px;
}

.opt-cont {
  width: fit-content;
  /* border: 1px solid green; */
  display: flex;
  gap: 20px;
  color: #a6a6a6;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}

.opt-cont div a {
  text-decoration: none;
  color: #a6a6a6;
}

.log-cont {
  /* border: 1px solid blue; */
  width: fit-content;
  display: flex;
  gap: 15px;
  /* margin: auto; */
}

.child-1 {
  display: flex;
  gap: 5px;
}

.child-1 button {
  background-color: #000000;
  border: none;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
}

.child-2 {
  margin: auto;
}

.child-2 button {
  background-color: #d7df23;
  padding: 8px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
}
</style>
