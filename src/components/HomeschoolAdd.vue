<template>
  <div class="homeschool-area checklist-items content-spacer">
    <ChecklistItem
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></ChecklistItem>
    <div class="comments-container">
      <textarea v-model="form_data.comments" placeholder="Comment" class="list-comment"></textarea>
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
import { Timestamp } from '@/db'
import ChecklistItem from '@/components/ChecklistItem'

export default {
  name: 'HomeschoolDay',
  components: {
    ChecklistItem
  },
  data() {
    return {
      labels: [
        {key: 'math', name: 'Math'},
        {key: 'science', name: 'Science'},
        {key: 'reading', name: 'Reading'},
        {key: 'writing', name: 'Writing'},
        {key: 'gym', name: 'Gym'}
      ],
      form_data: {
        comments: '',
        date: Timestamp.fromDate(new Date()),
        math: false,
        reading: false,
        science: false,
        gym: false,
        writing: false
      },
      approved: false
    }
  },
  computed: {
    user_logged_in () {
      return this.$store.state.auth.user_logged_in
    },
    finished () {
      return this.$store.state.school.day_finished
    }
  },
  methods: {
    approveDay: function() {
      if (this.finished) return false;
      let post_data = this.form_data
      post_data.approved = true
      this.$store.dispatch('SAVE_SCHOOLDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>
