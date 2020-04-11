<template>
  <div id="app">
    <header
      v-if="ready"
      class="centered-vert"
    >
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
        <span v-show="!open_login_form">+</span>
        <span v-show="open_login_form">-</span>
        Login
      </button>
    </header>
    <div class="login-form-container" v-if="open_login_form">
      <form @submit.prevent>
        <fieldset>
          <label for="uname-input">Username:</label>
          <input
            autocomplete="off"
            id="uname-input"
            v-model="username"
            type="text"
          >
        </fieldset>
        <fieldset>
          <label for="pass-input">Password:</label>
          <input
            autocomplete="off"
            id="pass-input"
            v-model="password"
            type="password"
          >
        </fieldset>
        <div class="button-row-submit">
          <button
            @click="doLogin()"
          >
            login
          </button>
        </div>
      </form>
    </div>
    <router-view />
  </div>
</template>

<script>
import { Auth } from './db';

export default {
  name: 'AppLayout',
  data () {
    return {
      open_login_form: false,
      username: '',
      password: '',
      user_logged_in: false,
      ready: false
    }
  },
  mounted: function() {
    this.ready = true
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
  methods: {
    toggleLogin: function () {
      this.open_login_form = !this.open_login_form
    },
    doLogin: function () {
      const vm = this
      Auth.signInWithEmailAndPassword(this.username, this.password)
        .then(function(response) {
          vm.open_login_form = false
          vm.username = ''
        })
        .catch(function(error) {
          // const errorCode = error.code
          // const errorMessage = error.message
        })
        .finally(function() {
          vm.password = ''
        })
    },
    logoutUser: function() {
      if (Auth.currentUser) Auth.signOut()
    }
  }
}
</script>


<style lang="scss">
// reset styles
body, html {
  margin: 0;
  padding: 0;
}
fieldset {
  border: none;
}

// Layout
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  padding-top: 31px;
}

header {
  height: 30px;
  border-bottom: 1px solid black;
  background: #ccc;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 50;
}

.big-label-area {
  margin: 1em;
}

.big-label-area label {
  font-size: 36px;
  font-weight: bold;
  display: block;
  text-align: left;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  border-right: 4px solid black;
  border-top: 4px solid black;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  background-color: aqua;
  svg {
    padding-left: 15px;
    display: none;
    color: #b71212;
  }
  &.approved {
    background-color: pink;
  }
  &.done {
    background-color: lime;

    svg {
      display: block;
    }

    .but-save {
      display: block;
    }
  }
  input {
    display: none;
  }
}

.login-form-container {
  padding: 0.25em;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-radius: 0 0 1rem 0;
  width: 250px;
  background: #ccc;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 100;
}

.button-header {
  border: none;
  color: blue;
  background: none;
  cursor: pointer;
}

.button-row-submit {
  text-align: right;
  padding: 0.5em;
}

// Shared layout classes
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.centered-vert {
  display: flex;
  align-items: center;
}
</style>
