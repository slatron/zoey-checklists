<template>
  <div class="HomeschoolDay">
    {{ days }}
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'HomeschoolDay',
  data() {
    return {
      days: []
    }
  },
  firestore: {
    days: db.collection('homeschool')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
