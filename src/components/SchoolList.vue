<template>
  <div
   class="chorelist-area checklist-items content-spacer"
  >
    <ChecklistItem
      v-for="label in items"
      :key="label.key"
      :label="label"
      :form-data="school_form_data"
      :form-key="label.key"
      :form-title="label.name"
      :form-finished="false"
    ></ChecklistItem>
  </div>
</template>

<script>
import ChecklistItem from '@/components/ChecklistItem'

export default {
  name: 'SchoolList',
  components: {
    ChecklistItem
  },
  created: function() {
    this.$store.dispatch('INIT_SCHOOL_ITEMS')
  },
  computed: {
    items () {
      return this.$store.state.school.school_list['ZOEY']
    },
    school_form_data () {
      return this.$store.state.school.school_form_data
    }
  },
  methods: {}
}
</script>
