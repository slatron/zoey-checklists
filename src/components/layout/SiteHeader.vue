<template lang="html">
  <header>
    <div class="header-left">
      <button type="button" class="hand nav-bars" @click="toggleDrawer"">
        <font-awesome-icon icon="bars" />
      </button>
    </div>
    <div class="header-center">
      <h2>Zoey's Chore List</h2>
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
button {
  background: none;
  border: none;
}
header {
  button {
    color: #fff;
  }

  .nav-bars {
    font-size: 24px;
  }

  .header-left {
    margin-left: 1em;
    flex-grow: 0;
  }
  .header-center {
    font-size: 24px;
    text-align: center;
    font-family: "Bree Serif", Bree, Serif, serif;
    flex-grow: 1;
  }
  .header-right {
    font-size: 16px;
    margin-right: 1em;
    flex-grow: 0;
  }
}

</style>
