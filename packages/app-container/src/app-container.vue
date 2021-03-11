<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:53:56
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:53:56
 */

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbAppContainer', inheritAttrs: false })
export default class AppContainer extends Vue {
  /** 是否固定高度 */
  @Prop({ type: Boolean, default: false }) readonly fixedHeight!: boolean

  /** 容器固定高度, 默认页面空余部分高度 */
  @Prop({ type: String })
  readonly height!: string

  /** 容器的最小宽度，（包括左右padding 共40px） */
  @Prop({ type: String })
  readonly minWidth!: string

  mountedHeight = ''

  get containerHeight() {
    return this.fixedHeight ? this.height ?? this.mountedHeight : undefined
  }

  mounted() {
    if (this.fixedHeight) {
      this.mountedHeight = `${
        window.innerHeight -
        (this.$el as HTMLElement).getBoundingClientRect().top
      }px`
    }
  }

  render() {
    return (
      <div
        class="app-container"
        style={{ height: this.containerHeight, minWidth: this.minWidth }}
        {...{ on: this.$listeners }}
      >
        {this.$slots.default}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
