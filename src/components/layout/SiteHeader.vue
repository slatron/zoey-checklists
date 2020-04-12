<template lang="html">
  <header>
    <button
      v-if="user_logged_in"
      class="button-header"
      @click="logoutUser()"
    >
      Logout
    </button>
    <button
      v-if="!user_logged_in"
      class="button-header"
      @click="toggleLogin()"
    >
      Login
      <span v-show="!open_login_form">+</span>
      <span v-show="open_login_form">-</span>
    </button>
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
    }
  },
  methods: {
    toggleLogin: function (force) {
      this.$store.commit('TOGGLE_LOGIN', {'force': force})
    },
    logoutUser: function() {
      if (Auth.currentUser) Auth.signOut()
    }
  }
}
</script>

<style lang="css" scoped>
header {
  height: 30px;
  border-bottom: 1px solid black;
  background: #ccc;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: row-reverse;
}

.button-header {
  border: none;
  color: blue;
  background: none;
  cursor: pointer;
  outline: none;
}

</style>
