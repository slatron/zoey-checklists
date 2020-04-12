<template>
  <div class="homeschool-area big-label-area">
    <section class="block-area-half">
      <label for="todays-special">Today's Special: </label>
      <select
        v-model="form_data.special_choice"
        id="todays-special"
        name="todays-special"
      >
        <option
          v-for="option in special_options"
          v-bind:value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </section>
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
import { db, Auth } from '../db'
import { Timestamp } from '../db'
import BigLabel from '@/components/BigLabel'

export default {
  name: 'HomeschoolDay',
  components: {
    BigLabel
  },
  data() {
    return {
      labels: [
        {key: 'special', name: 'Special'},
        {key: 'math', name: 'Math'},
        {key: 'science', name: 'Science'},
        {key: 'reading', name: 'Reading'},
        {key: 'writing', name: 'Writing'},
        {key: 'gym', name: 'Gym'}
      ],
      form_data: {
        comments: '',
        special_choice: 'Art',
        date: Timestamp.fromDate(new Date()),
        math: false,
        reading: false,
        science: false,
        gym: false,
        special: false,
        writing: false
      },
      special_options: [
        {'text': 'Art', 'value': 'Art'},
        {'text': 'Dance', 'value': 'Dance'},
        {'text': 'Drama', 'value': 'Drama'},
        {'text': 'Library', 'value': 'Library'},
        {'text': 'Music', 'value': 'Music'}
      ],
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
      this.$store.dispatch('SAVE_DAY', {
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
