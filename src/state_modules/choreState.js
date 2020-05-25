import { db, Timestamp } from '@/db'

export default {
  state: {
    list_cache: {},
    chore_people: [],
    current_person: {},
    list_items: {},
    form_data: {
      comments: '',
      date: Timestamp.fromDate(new Date()),
      approved: false
    }
  },

  mutations: {
    SET_ITEMS (state, list_items_by_person) {
      state.list_items = list_items_by_person
    },
    POPULATE_EXISTING_CHORES (state, chore_data) {
      state.form_data = {...chore_data}
    },
    STORE_CURRENT_USER_STATE (state, current_state) {
      if (state.current_person.key) {
        state.list_cache[state.current_person.key] = current_state
      }
    },
    SET_CURRENT_USER_STATE (state, person_key) {
      if (state.list_cache[person_key]) {
        state.form_data = state.list_cache[person_key]
      } else {
        state.form_data = {
          comments: '',
          date: Timestamp.fromDate(new Date()),
          approved: false,
          person: state.current_person.key,
          ...state.list_items[state.current_person.key]
        }
      }
    },
    SELECT_CHORE_PERSON (state, chore_person) {
      this.commit('STORE_CURRENT_USER_STATE', {...state.form_data})
      state.current_person = chore_person
      this.commit('SET_CURRENT_USER_STATE', chore_person.key)
    },
    SET_CHORE_PEOPLE (state, people) {
      state.chore_people = people
    },
    SET_LIST_CACHE (state, list_map) {
      state.list_cache = {...list_map}
    }
  },

  actions: {
    SAVE_CHOREDAY (state, options) {
      const post_data = state.state.form_data
      post_data.date = Timestamp.fromDate(new Date())
      post_data.approved = true
      post_data.person = state.state.current_person.key
      db.collection('choredays').add(post_data)
    },

    INIT_CHORE_PEOPLE (state) {
      return db.collection('kids').get()
        .then(function(people) {
          const chore_people = people.docs.map(person => person.data())
          state.commit('SET_CHORE_PEOPLE', chore_people)
        })
    },


    INIT_ITEMS (state) {
      const list_items_by_person = {}
      db.collection('chores').get()
        .then(function(chores) {
          chores.docs.forEach(items => {
            list_items_by_person[items.id] = items.data().chorelist
          })
          state.commit('SET_ITEMS', list_items_by_person)
        })
    },

    INIT_LIST_CACHE (state) {
      let recent_lists = []
      let todays_lists = []
      let found_people = []
      const list_cache = {}

      db.collection('choredays')
        .orderBy('date', 'desc')
        .limit(state.state.chore_people.length)
        .get()
        .then(function(choredays) {
          // Convert firebase day to view model properties
          recent_lists = choredays.docs.map(day => {
            let chore_list = state.state.list_items[day.data().person]
            let chore_state_map = {}
            chore_list.forEach(chore => {
              chore_state_map[chore.key] = day.data()[chore.key] || false
            })

            return {
              ...chore_state_map,
              approved: day.data().approved || false,
              comments: day.data().comments || '',
              person: day.data().person || 'ZOEY',
              date: day.data().date || Timestamp.fromDate(new Date()),
              id: day.id
            }
          })

          // filter out days before today
          const today_string = new Date().toDateString()
          todays_lists = recent_lists.filter(day => {
            return day.date.toDate().toDateString() === today_string
          })

          // set current list cache, ensure unique entries per person
          todays_lists.forEach(day => {
            if (found_people.indexOf(day.person) === -1) {
              list_cache[day.person] = day
            }
            found_people.push(day.person)
          })
          state.commit('SET_LIST_CACHE', list_cache)
        })
    }
  }
}
