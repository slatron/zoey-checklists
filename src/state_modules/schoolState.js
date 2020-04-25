import { db, Timestamp } from '@/db'

export default {
  state: {
    day_finished: false
  },

  mutations: {
    SET_SCHOOLDAY_FINISHED (state, finished) {
      state.day_finished = finished
    }
  },

  actions: {
    SAVE_SCHOOLDAY (state, options) {
      options.post_data.date = Timestamp.fromDate(new Date());
      db.collection('homeschool').add(options.post_data)
        .then(function(response) {
          state.commit('SET_SCHOOLDAY_FINISHED', true)
        })
    },
  }
}
