export default {
  state: {
    drawer_open: false,
    error_msg: '',
    open_login_form: false,
    shade_on: false,
    open_confirm_not_all_finished: false,
    open_confirm_chore_saved: false
  },

  mutations: {
    TOGGLE_LOGIN (state, options = {}) {
      this.commit('CLOSE_FORMS')
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
      if (!state.shade_on) {
        this.commit('CLOSE_FORMS')
      }
    },
    SET_ERROR_MESSAGE (state, msg) {
      if (typeof(msg) === 'string') {
        state.error_msg = msg
      }
    },
    CLOSE_FORMS (state) {
      state.open_login_form = false
      state.open_confirm_not_all_finished = false
      state.open_confirm_chore_saved = false
    },
    CONFIRM_NOT_ALL_FINISHED (state) {
      this.commit('CLOSE_FORMS')
      state.open_confirm_not_all_finished = true
      this.commit('TOGGLE_SHADE', {'force': true})
    },
    CONFIRM_CHORE_SAVED (state) {
      this.commit('CLOSE_FORMS')
      state.open_confirm_chore_saved = true
      this.commit('TOGGLE_SHADE', {'force': true})
    }
  }
}
