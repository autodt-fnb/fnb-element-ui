/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:58:44
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-02-27 20:01:21
 */
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
        class={[name]}
        style={{
          fontSize: this.size ? `${this.size}px` : '',
          color: this.color
        }}
        onClick={() => this.$emit('click')}
      />
    )
  }
}
