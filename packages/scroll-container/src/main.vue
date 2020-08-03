<template>
  <ElScrollbar
    class="scroll-container"
    :style="{ height: height ? `${parseFloat(height)}px` : undefined }"
    :class="{ 'no-scroll-y': !scrollY, 'no-scroll-x': !scrollX }"
  >
    <slot />
  </ElScrollbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ components: {}, name: 'FnbScrollContainer' })
export default class ScrollContainer extends Vue {
  /** 滚动区域高度 */
  @Prop({ type: Number, default: 0 }) readonly height!: number

  /** 是否允许上下滚动，默认true */
  @Prop({ type: Boolean, default: true }) readonly scrollY!: boolean

  /** 是否允许左右滚动，默认false */
  @Prop({ type: Boolean, default: false }) readonly scrollX!: boolean
}
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;

  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }

  &.no-scroll-x ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  &.no-scroll-y ::v-deep {
    .el-scrollbar__wrap {
      overflow-y: hidden;
    }
  }
}
</style>
