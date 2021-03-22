/*
 * @Author: 陈超
 * @Date: 2021-03-17 13:08:04
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-17 16:34:30
 */

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbTableButton', inheritAttrs: false })
export default class TableButton extends Vue {
  /**
   * 分割符
   */
  @Prop(String) readonly divider!: 'before' | 'after'

  /** 字体颜色 */
  @Prop(String) readonly color!: string

  /** 相邻的上一个元素是否是 TableButton 组件 */
  isPrevTableButton = false

  mounted() {
    const sameLevelEl = [...(this.$el.parentElement?.children ?? [])]
    const elIndex = sameLevelEl.findIndex(el => el === this.$el)

    this.isPrevTableButton =
      elIndex > 0 &&
      sameLevelEl[elIndex - 1].classList.contains('js-table-button')
  }

  render() {
    return (
      <span class="js-table-button">
        {(this.divider === 'before' || this.isPrevTableButton) && (
          <el-divider direction="vertical" key="divider" />
        )}
        <el-button
          style={{ color: this.color }}
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
