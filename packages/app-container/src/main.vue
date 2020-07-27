<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbAppContainer', inheritAttrs: false })
export default class AppContainer extends Vue {
  /** 是否固定高度 */
  @Prop({ type: Boolean, default: false }) readonly fixedHeight!: boolean

  /** 容器固定高度, 默认页面空余部分高度 */
  @Prop({
    type: String
  })
  readonly height!: string

  mountedHeight = ''

  get containerHeight() {
    return this.fixedHeight ? this.height ?? this.mountedHeight : undefined
  }

  mounted() {
    this.mountedHeight = `${window.innerHeight -
      (this.$el as HTMLElement).getBoundingClientRect().top}px`
  }

  render() {
    return (
      <div
        class="app-container"
        style={{ height: this.containerHeight }}
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
  padding: 20px;
  box-sizing: border-box;
}
</style>
