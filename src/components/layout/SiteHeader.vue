<template lang="html">
  <header>
    <div class="header-left">
      <button type="button" class="hand nav-bars" @click="toggleDrawer">
        <font-awesome-icon icon="bars" />
      </button>
    </div>
    <div class="header-center">
      <h2>{{page_name}}</h2>
    </div>
    <div class="header-right">
      <button
        v-if="user_logged_in"
        @click="logoutUser()"
      >
        <font-awesome-icon icon="lock-open" />
        Logout
      </button>
      <button
        v-if="!user_logged_in"
        @click="toggleLogin()"
      >
        <font-awesome-icon icon="lock" />
        Login
      </button>
    </div>
  </header>
</template>

<script>
import { Auth } from '@/db';
export default {
  name: 'SiteHeader',
  computed: {
    open_login_form () {
      return this.$store.state.layout.open_login_form
    },
    user_logged_in () {
      return this.$store.state.auth.user_logged_in
    },
    page_name () {
      let title = ''
      let user = this.$store.state.chores.current_user.name
      switch (this.$route.name) {
        case 'chores':
          title = `${user}\'s Chore List`
          break
        case 'school':
          title = 'Zoeys Homework Review'
          break
        default:
          title = 'Slater Family Lists'
      }
      return title
    }
  },
  methods: {
    toggleLogin: function () {
      this.$store.commit('TOGGLE_LOGIN')
    },
    toggleDrawer: function () {
      this.$store.commit('TOGGLE_DRAWER')
    },
    logoutUser: function() {
      if (Auth.currentUser) Auth.signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
}
</style>
