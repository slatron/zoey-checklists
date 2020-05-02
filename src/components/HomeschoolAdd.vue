<template>
  <div class="homeschool-area checklist-item">
    <ChecklistItem
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></ChecklistItem>
    <label
      v-if="user_logged_in"
      :class="{'done': approved}"
      class="approved big-label"
      for="cb-approved">
      Approved
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-approved" id="cb-approved" v-model="approved">
    </label>
    <textarea v-model="form_data.comments" placeholder="Comment"></textarea>
    <button
      v-if="!finished && user_logged_in && approved"
      @click="saveDay()"
      class="but-save">
      SAVE
    </button>
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
    saveDay: function() {
      let post_data = this.form_data
      post_data.approved = true
      this.$store.dispatch('SAVE_SCHOOLDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  min-height: 100px;
  font-size: 36px;
}

label {
  font-weight: bold;
}
</style>
