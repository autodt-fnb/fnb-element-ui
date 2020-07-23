import { ElementUIComponent } from 'element-ui/types/component'
import { OpUnitType } from 'dayjs'
import { DatePickerOptions } from 'element-ui/types/date-picker'

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

  pickerOptions: DatePickerOptions

  /** 需要显示的日期操作按钮，默认显示所有，如不想显示传空数组 [] */
  operateBtns: BtnType[]

  /** 日期限制范围 */
  dateLimit: number | { limit: number; type?: OpUnitType }

  /** 是否不能选择超过今日的日期 */
  endToday: boolean

  /** 是否禁止选择日期 */
  disabled: boolean

  /** 是否可清除 */
  clearable: boolean
}
