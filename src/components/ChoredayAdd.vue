<template>
  <div class="choreday-area big-label-area">
    <BigLabel
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></BigLabel>
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
import BigLabel from '@/components/BigLabel'

export default {
  name: 'ChoredayAdd',
  components: {
    BigLabel
  },
  data() {
    return {
      labels: [
        // Will need chores instead here
        // - from db if possible, otherwise hardcode
        // {key: 'math', name: 'Math'},
        // {key: 'science', name: 'Science'},
        // ...
      ],
      form_data: {
        comments: '',
        date: Timestamp.fromDate(new Date()),
        // And here
        // math: false,
        // reading: false,
        // ...
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
      this.$store.dispatch('SAVE_CHOREDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  width: 100%;
  min-height: 100px;
  font-size: 36px;
}

label {
  font-weight: bold;
}
</style>
