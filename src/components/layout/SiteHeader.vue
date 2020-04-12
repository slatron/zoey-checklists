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
  data () {
    return {
      user_logged_in: false
    }
  },
  created: function() {
    const vm = this
    Auth.onAuthStateChanged(function(user) {
      if (user) {
        vm.user_logged_in = true
      } else {
        vm.user_logged_in = false
      }
    });
  },
  computed: {
    open_login_form () {
      return this.$store.state.layout.open_login_form
    },
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
