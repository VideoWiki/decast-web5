<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from './layouts/components/vertical-nav-menu/VerticalNavMenu.vue';

export default {
  components: {
    TheNavigation
  },
  data() {
    return {
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'vivek', role: 'Engineer' },
        { id: 'u2', fullName: 'anurag', role: 'Engineer' },
        { id: 'u3', fullName: 'blabla', role: 'Engineer' },
        { id: 'u4', fullName: 'blabla', role: 'Consultant' },
        { id: 'u5', fullName: 'bla bla', role: 'Consultant' },
      ],
    };
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>