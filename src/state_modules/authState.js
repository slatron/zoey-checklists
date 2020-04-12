import { Auth } from '@/db';

export default {
  state: {
    user_logged_in: false,
    username: '',
    password: ''
  },

  mutations: {
    SET_LOGIN_STATUS (state, options = {}) {
      state.user_logged_in = options.status === true ? true : false
    },
    SET_LOGIN_USERNAME (state, username) {
      state.username = username
    },
    SET_LOGIN_PASSWORD (state, password) {
      state.password = password
    }
  },

  actions: {
    DO_LOGIN (state, options = {}) {
      Auth.signInWithEmailAndPassword(options.username, options.password)
        .then(function(response) {
          state.commit('TOGGLE_LOGIN', {'force': false})
          state.commit('SET_LOGIN_USERNAME', '')
        })
        .catch(function(error) {
          state.commit('SET_ERROR_MESSAGE', error.message)
        })
        .finally(function() {
          state.commit('SET_LOGIN_PASSWORD', '')
        })
    }
  }
}
