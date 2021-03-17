/*
 * @Author: 陈超
 * @Date: 2021-03-17 13:08:04
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-17 14:31:42
 */

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbTableButton', inheritAttrs: false })
export default class TableButton extends Vue {
  /**
   * 分割符
   */
  @Prop(String) readonly divider!: 'before' | 'after'

  render() {
    return (
      <span>
        {this.divider === 'before' && (
          <el-divider direction="vertical" key="divider" />
        )}
        <el-button
          {...{ attrs: this.$attrs }}
          key="button"
          type="text"
          onClick={() => this.$emit('click')}
        >
          {this.$slots.default ?? this.$scopedSlots.default?.(null)}
        </el-button>
        {this.divider === 'after' && (
          <el-divider direction="vertical" key="divider" />
        )}
      </span>
    )
  }
}
