<template>
  <div class="homeschool">
    <HomeschoolDay />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeschoolDay from '@/components/HomeschoolDay.vue'

export default {
  name: 'homeschool',
  components: {
    HomeschoolDay
  }
}
</script>
