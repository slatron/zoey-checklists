<template lang="html">
  <div class="login-form-container" v-if="open_login_form">
    <form @submit.prevent>
      <fieldset>
        <label for="uname-input">Username:</label>
        <input
          id="uname-input"
          v-model="username"
          type="text"
        >
      </fieldset>
      <fieldset>
        <label for="pass-input">Password:</label>
        <input
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

</template>

<script>
import { Auth } from '@/db';
export default {
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    open_login_form () {
      return this.$store.state.layout.open_login_form
    },
  },
  methods: {
    doLogin: function () {
      const LoginForm = this
      Auth.signInWithEmailAndPassword(this.username, this.password)
        .then(function(response) {
          LoginForm.$store.commit('TOGGLE_LOGIN', {'force': false})
          LoginForm.username = ''
        })
        .catch(function(error) {
          // to read error code
          // const errorCode = error.code
          LoginForm.$store.commit('SET_ERROR_MESSAGE', error.message)
        })
        .finally(function() {
          LoginForm.password = ''
        })
    }
  }
}
</script>

<style lang="css" scoped>
.login-form-container {
  padding: 0.25em;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  border-radius: 0 0 0 1rem;
  width: 250px;
  background: #ccc;
  position: fixed;
  top: 30px;
  right: 0;
  z-index: 100;
}

.button-row-submit {
  text-align: right;
  padding: 0.5em;
}

</style>
