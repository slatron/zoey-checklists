<template>
  <label
    :class="{'done': formData[formKey]}"
    class="centered-vert"
    :for="'cb-' + formKey"
  >
    <input type="checkbox" :name="'cb-' + formKey" :id="'cb-' + formKey" v-model="formData[formKey]">
    <font-awesome-icon
      v-show="!formData[formKey]"
      class="empty-square"
      icon="square" />
    <font-awesome-icon
      v-show="formData[formKey]"
      icon="check-square" />
    <div class="checklist-text">{{formTitle}}</div>
  </label>
</template>

<script>
export default {
  name: 'ChecklistItem',
  props: {
    formData: { 'type': Object, 'default': {} },
    formKey: { 'type': String, 'default': '' },
    formTitle: { 'type': String, 'default': ''}
  }
}
</script>
