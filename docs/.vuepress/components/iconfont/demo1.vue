<template>
  <div>
    <fnb-iconfont
      @click="iconClick"
      name="icon-tongjifenxi"
      size="30"
      color="red"
    ></fnb-iconfont>
    <fnb-iconfont name="caiwuguanli" size="20" color="blue"></fnb-iconfont>
    <fnb-iconfont name="xinkehu" color="green"></fnb-iconfont>
    <fnb-iconfont name="icon-dingdanguanli"></fnb-iconfont>
  </div>
</template>

<script>
export default {
  methods: {
    iconClick() {
      this.$message.info('点击了 tongjifenxi 图标')
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  & > i {
    margin-right: 20px;
  }
}
</style>
