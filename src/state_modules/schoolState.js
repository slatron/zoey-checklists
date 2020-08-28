import { db, Timestamp } from '@/db'

export default {
  state: {
    school_list: {},
    school_form_data: {}
  },

  mutations: {
    SET_SCHOOL_ITEMS (state, school_items_by_user) {
      state.school_list = school_items_by_user
    },
    POPULATE_EXISTING_SCHOOL_ITEMS (state, school_data) {
      state.school_form_data = {...school_data}
    }
  },

  actions: {
    INIT_SCHOOL_ITEMS (state) {
      const school_items_by_user = {}
      db.collection('school').get()
        .then(function(schoolLists) {
          schoolLists.docs.forEach(items => {
            school_items_by_user[items.id] = items.data().schoollist
          })
          state.commit('SET_SCHOOL_ITEMS', school_items_by_user)
        })
    },
  }
}
