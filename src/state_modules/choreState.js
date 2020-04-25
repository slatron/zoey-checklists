import { db, Timestamp } from '@/db'

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
      options.post_data.date = Timestamp.fromDate(new Date());
      db.collection('choredays').add(options.post_data)
        .then(function(response) {
          state.commit('SET_CHOREDAY_FINISHED', true)
        })
    },
  }
}
