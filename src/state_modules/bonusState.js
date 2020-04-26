import { db, Timestamp } from '@/db'

export default {
  state: {
    day_finished: false,
    form_data: {
      comments: '',
      date: Timestamp.fromDate(new Date()),
      approved: false,
      trash: {
        bath_kid: false,
        bath_parent: false,
        bed_andy: false,
        bed_zoey: false,
        kitchen: false
      },
      vacuum: {
        bed_zoey: false,
        kitchen: false,
        living: false
      },
      kitchen_laundry: {
        dry: false,
        fold: false,
        put_away: false,
        wash: false
      },
      blinds: {
        bed_andy: false,
        bed_parent: false,
        bed_zoey: false,
        living: false
      }
    }
  },

  mutations: {
    SET_BONUSDAY_FINISHED (state, finished) {
      state.day_finished = finished
    }
  },

  actions: {
    SAVE_BONUSDAY (state, options) {
      options.post_data.date = Timestamp.fromDate(new Date())
      db.collection('weeklybonus').add(options.post_data)
        .then(function(response) {
          state.commit('SET_BONUSDAY_FINISHED', true)
        })
    }
  }
}
