<template>
  <fnb-date-range
    v-model="date"
    show-btns
    :operate-btns="['today', 'thisWeek', 'thisMonth']"
  ></fnb-date-range>
</template>

<script>
export default {
  data() {
    return {
      date: []
    }
  }
}
</script>
