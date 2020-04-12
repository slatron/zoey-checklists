export default {
  state: {
    user_logged_in: false
  },
  mutations: {
    SET_LOGIN_STATUS (state, options = {}) {
      state.user_logged_in = options.status === true ? true : false
    }
  }
}
