<template>
  <div class="view-chorelist">
    <ChoreList />
  </div>
</template>

<script>
import ChoreList from '@/components/ChoreList.vue'

export default {
  name: 'ChoreListView',
  components: {
    ChoreList
  },
  created () {
    let user = this.$store.state.chores.current_user
    if (!('key' in user)) {
      this.$router.push('select-chorelist')
    }
  }
}
</script>
