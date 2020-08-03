<template>
  <fnb-scroll-container :height="100">
    <div v-for="i in 30" :key="i" class="item">{{ i }}</div>
  </fnb-scroll-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 30px;

  &:nth-child(2n) {
    background: #f5f5f9;
  }
}
</style>
