import { db, Timestamp } from '@/db'

export default {
  state: {
    day_finished: false,
    labels: [],
    form_data: {
      comments: '',
      date: Timestamp.fromDate(new Date()),
      approved: false
    }
  },

  mutations: {
    SET_CHOREDAY_FINISHED (state, finished) {
      state.day_finished = finished
    },
    SET_LABELS (state, chorelist) {
      state.labels = chorelist
    },
    SET_FORM (state, chorelist) {
      let db_chores = {}
      chorelist.forEach(chore => {
        db_chores[chore.key] = false
      })
      state.form_data = Object.assign({}, state.form_data, db_chores)
    }
  },

  actions: {
    SAVE_CHOREDAY (state, options) {
      const post_data = state.state.form_data
      post_data.date = Timestamp.fromDate(new Date())
      post_data.approved = true
      db.collection('choredays').add(post_data)
        .then(function(response) {
          state.commit('SET_CHOREDAY_FINISHED', true)
          state.commit('SET_CHOREDAY_FINISHED', true)
        })
    },
    // Called when chores page is initialized
    // - Gets chores data from db to populate list
    GET_LABELS (state, options) {
      db.collection('chores').get()
        .then(function(doc) {
          if (doc) {
            const chorelist = doc.docs[0].data().chorelist
            state.commit('SET_FORM', chorelist)
            state.commit('SET_LABELS', chorelist)
          } else {
              console.log("No such document!")
          }
        })
        .catch(function(error) {
            console.log("Error getting document:", error)
        })
    }
  }
}
