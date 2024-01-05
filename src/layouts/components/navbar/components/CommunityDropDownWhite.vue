<template>
  <vs-dropdown class="vx-navbar-dropdown" vs-trigger-click>
    <router-link
      to="/"
      class="text-white text-2xl hover-link relative navItem"
      exact-active-class="link-active"
      >Community
      <vs-chip class="absolute create-chip">
        <span class="text-primary font-bold">JOIN</span>
      </vs-chip></router-link
    >

    <vs-dropdown-menu>
      <vs-dropdown-item>
        <a href="http://t.me/VideoWiki" class="text-custom-grey">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="TrendingUpIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Channel</span>
          </li>
        </a>
      </vs-dropdown-item>

      <vs-dropdown-item>
        <a
          href="https://www.linkedin.com/company/videowiki.pt/"
          class="text-custom-grey"
        >
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="ClipboardIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">News</span>
          </li>
        </a>
      </vs-dropdown-item>

      <vs-dropdown-item>
        <a
          href="https://www.youtube.com/channel/UCDbFvsc4O_sATdeXu4IJuog"
          class="text-custom-grey"
        >
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="VideoIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Videos</span>
          </li>
        </a>
      </vs-dropdown-item>

      <vs-dropdown-item>
        <a href="https://fider.video.wiki/" class="text-custom-grey">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <span class="ml-2">Features Request</span>
          </li>
        </a>
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<style lang="scss" scoped>
.create-chip {
  top: -13px;
  left: -35px;
  min-height: 16px !important;
  visibility: hidden;
}
.create-chip span {
  font-size: 10px;
}
button:hover a {
  font-weight: bold;
}

button:hover a .create-chip {
  visibility: visible;
}
</style>
