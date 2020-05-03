<template lang="html">
  <header>
    <div>
      <button type="button" class="hand" @click="toggleDrawer"">
        <font-awesome-icon icon="bars" />
      </button>
    </div>
    <div>
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
    }
  },
  methods: {
    toggleLogin: function (force) {
      this.$store.commit('TOGGLE_LOGIN', {'force': force})
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
header {
  height: 30px;
  border-bottom: 1px solid black;
  background: #ccc;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 50;
  padding: 0.25em;


  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  > div svg {
    font-size: 26px;
  }
}

button {
  font-size: 10px;
  padding: 0.25em;
  margin: 0;
  border-radius: 0;
}

.button-header {
  border: none;
  color: blue;
  background: none;
  cursor: pointer;
  outline: none;
}

</style>
