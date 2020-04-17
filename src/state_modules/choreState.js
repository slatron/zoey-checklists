import { db } from '@/db'

export default {
  state: {
    day_finished: false
  },

  mutations: {
    SET_CHOREDAY_FINISHED (state, finished) {
      state.day_finished = finished
    }
  },

  actions: {
    SAVE_CHOREDAY (state, options) {
      db.collection('homeschool').add(options.post_data)
        .then(function(response) {
          state.commit('SET_SCHOOLDAY_FINISHED', true)
        })
    },
  }
}