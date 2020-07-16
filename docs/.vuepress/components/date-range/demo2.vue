<template>
  <div>
    <fnb-date-range v-model="date" value-time></fnb-date-range>
    <div>value：[{{ date.join() }}]</div>
  </div>
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
