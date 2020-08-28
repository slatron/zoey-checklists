<template>
  <div class="view-chorelist">
    <SchoolList />
  </div>
</template>

<script>
import SchoolList from '@/components/SchoolList.vue'

export default {
  name: 'SchoolListView',
  components: {
    SchoolList
  }
}
</script>
