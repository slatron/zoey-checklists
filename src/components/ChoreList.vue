<template>
  <div
   class="chorelist-area checklist-items content-spacer"
   :class="{'bg-color-green': finished}"
  >
    <ConfirmNotAllFinished></ConfirmNotAllFinished>
    <ConfirmChoreSaved></ConfirmChoreSaved>
    <ChecklistItem
      v-for="label in items"
      :key="label.key"
      :label="label"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
      :form-finished="finished"
    ></ChecklistItem>
    <div class="comments-container">
      <textarea v-model="form_data.comments" placeholder="Comments" class="list-comment"></textarea>
    </div>
    <div class="centered">
      <button
        v-if="user_logged_in"
        :disabled="finished"
        @click="approveDay()"
        class="action"
        type="button" name="button"
      >
        APPROVE<span v-show="finished">D <font-awesome-icon icon="check-circle" /></span>
      </button>
    </div>
  </div>
</template>

<script>
import ChecklistItem from '@/components/ChecklistItem'
import ConfirmNotAllFinished from '@/components/layout/ConfirmNotAllFinished'
import ConfirmChoreSaved from '@/components/layout/ConfirmChoreSaved'

export default {
  name: 'ChoreList',
  components: {
    ChecklistItem,
    ConfirmNotAllFinished,
    ConfirmChoreSaved
  },
  created: function() {
    const user_key = this.$store.state.chores.current_user.key
    const chore_data = this.$store.state.chores.list_cache[user_key]
    this.$store.commit('POPULATE_EXISTING_CHORES', chore_data)
  },
  computed: {
    items () {
      const user_key = this.$store.state.chores.current_user.key
      return this.$store.state.chores.list_items[user_key]
    },
    form_data () {
      return this.$store.state.chores.form_data
    },
    user_logged_in () {
      return this.$store.state.auth.user_logged_in
    },
    finished () {
      return this.$store.state.chores.form_data.approved
    }
  },
  methods: {
    approveDay: function() {
      // If day already approved, exit approval process
      if (this.finished) return false

      let unfinished_chores = 0
      this.items.forEach((item, i) => {
        if (this.form_data[item.key] === false) {
          unfinished_chores++
        }
      })

      const all_complete = unfinished_chores === 0

      if (!all_complete) {
        this.$store.commit('CONFIRM_NOT_ALL_FINISHED')
      } else {
        this.$store.dispatch('SAVE_CHOREDAY')
        this.$store.commit('CONFIRM_CHORE_SAVED')
      }
    }
  }
}
</script>
