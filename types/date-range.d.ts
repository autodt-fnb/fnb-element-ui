import { ElementUIComponent } from 'element-ui/types/component'

export type BtnType =
  | 'today'
  | 'yesterday'
  | 'lastWeek'
  | 'thisWeek'
  | 'thisMonth'

export declare class FnbPlateNumber extends ElementUIComponent {
  /**
   * 日期
   */
  value: string[]

  /**
   * value 时间格式
   */
  valueFormat: string

  /** 组件显示的最大宽度，默认自适应容器 */
  maxWidth: number

  /** 是否在日期后面加 时间，开始时间加 00:00:00，结束时间后面加23:59:59 */
  valueTime: boolean

  /** 需要显示的日期操作按钮，默认显示所有，如不想显示传空数组 [] */
  operateBtns: BtnType[]
}
