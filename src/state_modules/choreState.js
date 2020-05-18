import { db, Timestamp } from '@/db'
import { tools } from '@/utils/MStools'

export default {
  state: {
    chore_people: [],
    current_person: null,
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
    },
    POPULATE_EXISTING_CHORES (state, chore_data) {
      state.form_data = {...chore_data}
    },
    SELECT_CHORE_PERSON (state, person) {
      state.current_person = person
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
      post_data.person = state.state.current_person
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

    // OLD WAY WITH ONE LIST:
    // db.collection('chores').get()
    //   .then(function(doc) {
    //     if (doc) {
    //       const chorelist = doc.docs[0].data().chorelist

    GET_LABELS (state, options) {
      options = options || {}
      const person = options.child || state.state.current_person || 'ZOEY'
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
                date: day.data().date.toDate(),
                id: day.id
              }
            })
            const today = new Date()
            const today_entry = dateEntries.filter(entry => tools().isToday(entry.date, today))
            state.commit('SET_CHOREDAY_FINISHED', today_entry.length > 0)
            if (today_entry.length > 0) {
              const chore_data = all_chores.find(day => day.id === today_entry[0].id).data()
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
