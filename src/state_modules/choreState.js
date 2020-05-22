import { db, Timestamp } from '@/db'
import { tools } from '@/utils/MStools'

export default {
  state: {
    list_cache: {},
    chore_people: [],
    current_person: {},
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
        db_chores[chore.key] = state.form_data[chore.key] || false
      })
      state.form_data = Object.assign({}, state.form_data, db_chores)
    },
    POPULATE_EXISTING_CHORES (state, chore_data) {
      state.form_data = {...chore_data}
    },
    SELECT_CHORE_PERSON (state, chore_person) {
      // Store current user list state
      if (state.current_person.key) {
        state.list_cache[state.current_person.key] = {...state.form_data}
      }
      state.current_person = chore_person
      if (state.list_cache[chore_person.key]) {
        state.form_data = state.list_cache[chore_person.key]
      } else {
        state.form_data = {
          comments: '',
          date: Timestamp.fromDate(new Date()),
          approved: false
        }
      }
    },
    SET_CHORE_PEOPLE (state, people) {
      state.chore_people = people
    }
  },

  actions: {
    SAVE_CHOREDAY (state, options) {
      const post_data = state.state.form_data
      post_data.date = Timestamp.fromDate(new Date())
      post_data.approved = true
      post_data.person = state.state.current_person.key
      db.collection('choredays').add(post_data)
        .then(function(response) {
          state.commit('SET_CHOREDAY_FINISHED', true)
        })
    },

    GET_CHORE_PEOPLE (state) {
      db.collection('kids').get()
        .then(function(kids) {
          const chore_people = kids.docs.map(person => person.data())
          state.commit('SET_CHORE_PEOPLE', chore_people)
        })
    },

    GET_LABELS (state, options) {
      options = options || {}
      const person = options.child || state.state.current_person.key || 'ZOEY'
      db.collection('chores').doc(person).get()
        .then(function(doc) {
          if (doc) {
            const chorelist = doc.data().chorelist
            state.commit('SET_FORM', chorelist)
            state.commit('SET_LABELS', chorelist)
          } else {
              console.log("No such document!")
          }
        })
        .catch(function(error) {
            console.log("Error getting document:", error)
        })
    },

    GET_EXISTING_CHOREDAY (state) {
      let all_chores = [];
      db.collection('choredays').get()
        .then(function(choredays) {
          if (choredays) {
            all_chores = choredays.docs
            // TODO: CLEAN THIS LOGIC UP
            const dateEntries = choredays.docs.map(day => {
              return {
                person: day.data().person,
                date: day.data().date.toDate(),
                id: day.id
              }
            })

            const today = new Date()
            const today_entry = dateEntries.filter(entry => tools().isToday(entry.date, today))
            const today_entry_person = today_entry.filter(entry => entry.person === state.state.current_person.key)

            state.commit('SET_CHOREDAY_FINISHED', today_entry_person.length > 0)
            if (today_entry_person.length > 0) {
              const chore_data = all_chores.find(day => day.id === today_entry_person[0].id).data()
              state.commit('POPULATE_EXISTING_CHORES', chore_data)
            }
          }
        })
        .catch(function(error) {
            console.log("Error getting document:", error)
        })
    }
  }
}
