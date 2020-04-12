export default {
  state: {
    open_login_form: false,
    error_msg: ''
  },

  mutations: {
    TOGGLE_LOGIN (state, options = {}) {
      const force_sent = (options.hasOwnProperty('force') && options.force !== undefined)
      state.open_login_form = force_sent
        ? options.force
        : !state.open_login_form
    },
    SET_ERROR_MESSAGE (state, msg) {
      if (typeof(msg) === 'string') {
        state.error_msg = msg
      }
    }
  }
}
