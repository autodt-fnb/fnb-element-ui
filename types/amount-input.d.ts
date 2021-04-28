import {
  ElementUIComponent,
  ElementUIComponentSize
} from 'element-ui/types/component'

export declare class FnbAmountInput extends ElementUIComponent {
  /**
   * 数值
   */
  value: string
  /**
   * 是否可清空
   */
  clearable: boolean

  /**
   * 是否禁用
   */
  disabled: boolean

  /**
   * 输入框占位文本
   */
  placeholder: string | number

  /**
   * 输入框尺寸
   */
  size: ElementUIComponentSize

  /**
   * 是否显示 ￥ 符号
   */
  showAmountIcon: boolean

  /**
   * 金额最小值
   */
  min: number

  /**
   * 金额最大值
   */
  max: number

  /**
   * Focus the Input component
   */
  focus(): void

  /**
   * Blur the Input component
   */
  blur(): void

  /**
   * Select the text in input element
   */
  select(): void
}
