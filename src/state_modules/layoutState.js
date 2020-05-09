export default {
  state: {
    drawer_open: false,
    error_msg: '',
    open_login_form: false,
    shade_on: false
  },

  mutations: {
    TOGGLE_LOGIN (state, options = {}) {
      const force_sent = (options.hasOwnProperty('force') && options.force !== undefined)
      this.commit('TOGGLE_SHADE', {'force': true})
      state.open_login_form = force_sent
        ? options.force
        : !state.open_login_form
    },
    TOGGLE_DRAWER (state, options = {}) {
      state.drawer_open = options.hasOwnProperty('force')
        ? options.force
        : !state.drawer_open
    },
    TOGGLE_SHADE (state, options = {}) {
      state.shade_on = options.hasOwnProperty('force')
        ? options.force
        : !state.shade_on
    },
    SET_ERROR_MESSAGE (state, msg) {
      if (typeof(msg) === 'string') {
        state.error_msg = msg
      }
    }
  }
}
