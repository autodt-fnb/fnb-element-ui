import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbIconfont' })
export default class Iconfont extends Vue {
  @Prop({ required: true, type: String }) name!: string
  @Prop({ type: String }) size!: number
  @Prop({ type: String }) color!: string

  render() {
    let name = this.name
    if (/^icon-.*$/.test(name)) {
      name = `iconfont ${name}`
    } else if (!/^el-icon-.*$/.test(name)) {
      name = `iconfont icon-${name}`
    }

    return (
      <i
        onClick={() => this.$emit('click')}
        style={{
          fontSize: this.size ? `${this.size}px` : '',
          color: this.color
        }}
        class={[name]}
      />
    )
  }
}
