import { db, Timestamp } from '@/db'
import { tools } from '@/utils/MStools'


export default {
  state: {
    school_list: {
      'ZOEY': []
    },
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
            const sorted_items = items.data().schoollist.sort(tools().simpleSortByProperty('order'))
            school_items_by_user[items.id] = sorted_items
          })
          state.commit('SET_SCHOOL_ITEMS', school_items_by_user)
        })
    },
  }
}
