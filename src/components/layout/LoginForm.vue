  <template lang="html">
  <div class="shade-form login-form" v-if="open_login_form">
    <form @submit.prevent>
      <fieldset>
        <input
          id="uname-input"
          v-model="username"
          type="text"
          placeholder="Username"
        >
      </fieldset>
      <fieldset>
        <input
          id="pass-input"
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </fieldset>
      <div class="button-row-submit">
        <button
          class="action"
          @click="doLogin()"
        >
          LOGIN
        </button>
      </div>
    </form>
  </div>

</template>

<script>
import { Auth } from '@/db';
export default {
  name: 'LoginForm',
  computed: {
    open_login_form () {
      return this.$store.state.layout.open_login_form
    },
    username: {
      get () {
        return this.$store.state.auth.username
      },
      set (value) {
        this.$store.commit('SET_LOGIN_USERNAME', value)
      }
    },
    password: {
      get () {
        return this.$store.state.auth.password
      },
      set (value) {
        this.$store.commit('SET_LOGIN_PASSWORD', value)
      }
    }
  },
  methods: {
    doLogin: function () {
      this.$store.dispatch('DO_LOGIN', {username: this.username, password: this.password})
    }
  }
}
</script>

<style lang="css" scoped>
.login-form {
  text-align: center;
}

input {
  width: 70%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin-bottom: 1rem;
  font-size: 12px;
}

button {
  font-size: 14px;
  font-weight: bold;
}
</style>
