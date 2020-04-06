<template>
  <div class="homeschool-area">
    <label
      :class="{'done': form_data.math}"
      for="cb-math">
      Math
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-math" id="cb-math" v-model="form_data.math">
    </label>
    <label
      :class="{'done': form_data.science}"
      for="cb-science">
      Science
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-science" id="cb-science" v-model="form_data.science">
    </label>
    <label
      :class="{'done': form_data.reading}"
      for="cb-reading">
      Reading
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-reading" id="cb-reading" v-model="form_data.reading">
    </label>
    <label
      :class="{'done': form_data.writing}"
      for="cb-writing">
      Writing
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-writing" id="cb-writing" v-model="form_data.writing">
    </label>
    <label
      :class="{'done': approved}"
      class="approved"
      for="cb-approved">
      Approved
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-approved" id="cb-approved" v-model="approved">
      <div
        @click="saveDay()"
        class="but-save">
        SAVE
      </div>
    </label>
    <textarea v-model="form_data.comments" placeholder="Comment"></textarea>
    {{days}}
  </div>
</template>

<script>
// Fields:
import { db } from '../db'
import { Timestamp } from '../db'

export default {
  name: 'HomeschoolDay',
  data() {
    return {
      days: [],
      form_data: {
        writing: false,
        reading: false,
        math: false,
        science: false,
        comments: '',
        date: Timestamp.fromDate(new Date())
      },
      approved: false
    }
  },
  firestore: {
    days: db.collection('homeschool')
  },
  methods: {
    saveDay: function() {
      const adultCheck = prompt("What is the parent password?")
      if (adultCheck === 'groovy baby') {
        let post_data = this.form_data
        post_data.approved = true
        db.collection('homeschool')
          .add(post_data)
      }
    }
  },
  watch: {
    approved: function(checked) {
      if (checked) {
        const adultCheck = prompt("What is the parent password?")
        if (adultCheck !== 'muahhaha') {
          this.approved = false;
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.homeschool-area {
  border-radius: 5px;
}

.approved .but-save {
  display: none;
}

.homeschool-area label {
  font-size: 48px;
  font-weight: bold;
  display: block;
  height: 100px;
  text-align: left;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  border-right: 4px solid black;
  border-top: 4px solid black;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  background-color: aqua;

  svg {
    padding-left: 15px;
    display: none;
    color: #b71212;
  }

  &.approved {
    background-color: pink;
  }

  &.done {
    background-color: lime;

    svg {
      display: block;
    }

    .but-save {
      display: block;
    }
  }

  input {
    display: none;
  }
}

textarea {
  width: 100%;
  min-height: 100px;
  font-size: 36px;
}

</style>
