import { db, Timestamp } from '@/db'

export default {
  state: {
    list_cache: {},
    chore_people: [],
    current_person: {},
    list_items: {},
    form_data: {}
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
      state.form_data = state.list_cache[person_key]
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


    // TODO: MOVE INIT LIST LOGIC TO MODULE
    INIT_LIST_CACHE (state) {
      let recent_lists = []
      let todays_lists = []
      const list_cache = {}

      function createListView(item_state_map, existing, id) {
        existing = existing || {}
        return {
          ...item_state_map,
          approved: existing.approved || false,
          comments: existing.comments || '',
          person: existing.person || 'ZOEY',
          date: existing.date || Timestamp.fromDate(new Date()),
          id: id
        }
      }

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

            return createListView(chore_state_map, day.data(), day.id)
          })

          // filter out days before today
          const today_string = new Date().toDateString()
          todays_lists = recent_lists.filter(day => {
            return day.date.toDate().toDateString() === today_string
          })

          // Set list_cache to todays lists, key by person
          todays_lists.forEach(day => {
            list_cache[day.person] = day
          })

          // add blank entries for people with no started list
          state.state.chore_people.forEach(person => {
            if (!list_cache.hasOwnProperty(person.key)) {
              let person_chore_list = state.state.list_items[person.key]
              let blank_chore_state_map = {}
              person_chore_list.forEach(chore => {
                blank_chore_state_map[chore.key] = false
              })
              list_cache[person.key] =  createListView(blank_chore_state_map, {'person': person.key})
            }
          })
          state.commit('SET_LIST_CACHE', list_cache)
        })
    }
  }
}
