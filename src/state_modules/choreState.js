import { db, Timestamp } from '@/db'

export default {
  state: {
    list_cache: {},
    chore_people: [],
    current_user: {},
    list_items: {},
    form_data: {}
  },

  mutations: {
    SET_ITEMS (state, list_items_by_user) {
      state.list_items = list_items_by_user
    },
    POPULATE_EXISTING_CHORES (state, chore_data) {
      state.form_data = {...chore_data}
    },
    STORE_CURRENT_USER_STATE (state, current_state) {
      if (state.current_user.key) {
        state.list_cache[state.current_user.key] = current_state
      }
    },
    SET_CURRENT_USER_STATE (state, user_key) {
      state.form_data = state.list_cache[user_key]
    },
    SELECT_CHORE_USER (state, chore_user) {
      this.commit('STORE_CURRENT_USER_STATE', {...state.form_data})
      state.current_user = chore_user
      this.commit('SET_CURRENT_USER_STATE', chore_user.key)
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
      post_data.user = state.state.current_user.key
      db.collection('choredays').add(post_data)
    },

    INIT_CHORE_PEOPLE (state) {
      return db.collection('users').get()
        .then(function(people) {
          const chore_people = people.docs.map(user => user.data())
          state.commit('SET_CHORE_PEOPLE', chore_people)
        })
    },

    INIT_ITEMS (state) {
      const list_items_by_user = {}
      db.collection('chores').get()
        .then(function(chores) {
          chores.docs.forEach(items => {
            list_items_by_user[items.id] = items.data().chorelist
          })
          state.commit('SET_ITEMS', list_items_by_user)
        })
    },

    // TODO: MOVE INIT LIST LOGIC TO MODULE
    INIT_LIST_CACHE (state) {
      let recent_lists = []
      let todays_lists = []
      const list_cache = {}
      const DEFAULT_USER = state.state.chore_people[0].key

      function createListView(item_state_map, existing) {
        existing = existing || {}
        return {
          ...item_state_map,
          approved: existing.approved || false,
          comments: existing.comments || '',
          user: existing.user || DEFAULT_USER,
          date: existing.date || Timestamp.fromDate(new Date())
        }
      }

      db.collection('choredays')
        .orderBy('date', 'desc')
        .limit(state.state.chore_people.length)
        .get()
        .then(function(choredays) {

          // Convert firebase day to view model properties
          recent_lists = choredays.docs.map(day => {
            let chore_list = state.state.list_items[day.data().user] || []
            let chore_state_map = {}
            chore_list.forEach(chore => {
              chore_state_map[chore.key] = day.data()[chore.key] || false
            })

            return createListView(chore_state_map, day.data())
          })

          // filter out days before today
          const today_string = new Date().toDateString()
          todays_lists = recent_lists.filter(day => {
            return day.date.toDate().toDateString() === today_string
          })

          // Set list_cache to todays lists, key by user
          todays_lists.forEach(day => {
            list_cache[day.user] = day
          })

          // add blank entries for people with no started list
          state.state.chore_people.forEach(user => {
            if (!list_cache.hasOwnProperty(user.key)) {
              let user_chore_list = state.state.list_items[user.key]
              let blank_chore_state_map = {}
              user_chore_list.forEach(chore => {
                blank_chore_state_map[chore.key] = false
              })
              list_cache[user.key] =  createListView(blank_chore_state_map, {'user': user.key})
            }
          })
          state.commit('SET_LIST_CACHE', list_cache)
        })
    }
  }
}
