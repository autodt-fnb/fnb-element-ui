import { OpUnitType } from 'dayjs'
import { ElAutocomplete } from 'element-ui/types/autocomplete'
import {
  ElementUIComponent,
  ElementUIComponentSize
} from 'element-ui/types/component'
import { ElDatePicker } from 'element-ui/types/date-picker'
import { ElInput, InputType } from 'element-ui/types/input'
import { ElInputNumber } from 'element-ui/types/input-number'
import { ElOption } from 'element-ui/types/option'
import { ElSelect } from 'element-ui/types/select'
import { ElTimePicker } from 'element-ui/types/time-picker'
import { ElTimeSelect, TimeSelectOptions } from 'element-ui/types/time-select'

import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'
import { FormRuleItem } from './form'
import { ElSwitch } from 'element-ui/types/switch'
import { ElCheckbox } from 'element-ui/types/checkbox'
import { ElCheckboxGroup } from 'element-ui/types/checkbox-group'
import { ElCheckboxButton } from 'element-ui/types/checkbox-button'
import { ElRadio } from 'element-ui/types/radio'
import { ElRadioButton } from 'element-ui/types/radio-button'
import { ElRadioGroup } from 'element-ui/types/radio-group'
import {
  CascaderNode,
  CascaderOption,
  ElCascader
} from 'element-ui/types/cascader'
import { FnbUpload } from './upload'
import { Render } from './common'

/** 提取出 除ElementUIComponent 的属性 */
export type GetElementProps<T> = Partial<
  Pick<T, Exclude<keyof T, keyof ElementUIComponent>>
>

/** 公共属性 */
export type GetCommonProps<T> = GetElementProps<T> & ItemCommon

export interface ElFormItemProps {
  /** A key of `model` of the enclosing `el-form` component */
  prop?: string

  /** Label */
  itemLabel?: string

  /** Width of label, e.g. '50px' */
  itemLabelWidth?: string

  /** Controls the size of components in this form */
  itemSize?: ElementUIComponentSize

  /** label下方的描述文字 */
  itemLabelDesc?: string | (() => Render)

  /** Whether the field is required or not, will be determined by validation rules if omitted */
  required?: boolean

  /** Validation rules of form */
  rules?: FormRuleItem | FormRuleItem[]

  /** Field error message, set its value and the field will validate error and show this message immediately */
  error?: string

  /** Whether to show the error message */
  showMessage?: boolean

  /** Whether to display the error message inline with the form item */
  inlineMessage?: boolean

  /** slot label */
  renderItemLabel?: () => Render

  /** slot error */
  renderItemError?: (e: { error: any }) => Render
}

export interface ItemCommon extends ElFormItemProps {
  field?: string
  /** 是否隐藏  `v-if` */
  hidden?: boolean

  /** 是否不可见  `v-show` */
  invisible?: boolean

  /** 当前栅格占据的列数 */
  colSpan?: number
  /** 当前栅格左侧的间隔格数 */
  colOffset?: number
  /** 当前栅格向右移动格数 */
  colPush?: number
  /** 当前 栅格向左移动格数 */
  colPull?: number

  /** 清除浮动，使当前 form-item 在下一行显示 */
  clearfix?: boolean

  class?: string | (string | undefined)[] | Record<string, boolean>
  style?: string | Record<string, string | number | undefined> | any[]
}

export interface RenderFormContentProps extends Omit<ItemCommon, 'field'> {
  /** 表单控件类型 */
  formType: FormItemType.RENDER_FORM_CONTENT

  field?: string | string[]
  /** 自定义内容 */
  render?: (form: unknown) => Render
}

/**
 *  输入框 props
 */
export interface InputPorps extends Omit<GetCommonProps<ElInput>, 'type'> {
  /** 表单控件类型 */
  formType: FormItemType.INPUT
  /** 输入框类型 */
  type?: InputType | 'phone'
  /** 输入框头部内容 */
  renderPrefix?: () => Render
  /** 输入框尾部内容 */
  renderSuffix?: () => Render
  /** 输入框前置内容 */
  renderPrepend?: () => Render
  /** 输入框后置内容 */
  renderAppend?: () => Render
  /** 在 Input 失去焦点时触发 */
  onBlur?: (event: Event) => void
  /** 在 Input 获得焦点时触发 */
  onFocus?: (event: Event) => void
  /** 仅在输入框失去焦点或用户按下回车时触发 */
  onChange?: (value: string | number) => void
  /** 在 Input 值改变时触发 */
  onInput?: (value: string | number) => void
  /** 在点击由 clearable 属性生成的清空按钮时触发 */
  onClear?: () => void
}

/** 数字输入框 */
export interface InputNumberProps extends GetCommonProps<ElInputNumber> {
  formType: FormItemType.INPUT_NUMBER
  /** 文字居左显示 */
  textLeft?: boolean
  /** 输入类型，金额 */
  type?: 'amount'
  /** 占位符 */
  placeholder?: string
  /** 在 Input 失去焦点时触发 */
  onBlur?: (event: Event) => void
  /** 在 Input 获得焦点时触发 */
  onFocus?: (event: Event) => void
  /** 仅在输入框失去焦点或用户按下回车时触发 */
  onChange?: (currentValue?: number, oldValue?: number) => void
}

export interface AutocompletePorps extends GetCommonProps<ElAutocomplete> {
  /** 表单控件类型 */
  formType: FormItemType.AUTOCOMPLETE
  /** 输入框头部内容 */
  renderPrefix?: () => Render
  /** 输入框尾部内容 */
  renderSuffix?: () => Render
  /** 输入框前置内容 */
  renderPrepend?: () => Render
  /** 输入框后置内容 */
  renderAppend?: () => Render
  /** 点击选中建议项时触发 */
  onSelect?: (e?: any) => void
  /** 在 Input 值改变时触发 */
  onChange?: (value: string | number) => void
}

export interface OptionProps extends GetElementProps<ElOption> {
  /** 自定义内容 */
  render?: (label: unknown, value: unknown) => Render
}

export interface SelectProps extends GetCommonProps<ElSelect> {
  /** 表单控件类型 */
  formType: FormItemType.SELECT

  /** 多选时是否将选中值按文字的形式展示 */
  collapseTags?: boolean

  /** options 列表 */
  optionList?: OptionProps[]

  /** 当多选时，输出的值是逗号分割的字符串，还是保持数组形式 */
  outputType?: 'string' | 'array'

  /** 输出字符串 分割符, 默认英文逗号 */
  outputSeparator?: string

  onChange?: (v: unknown) => void

  onVisibleChange?: (v: boolean) => void

  onRemoveTag?: (v: unknown) => void

  onClear?: () => void

  onBlur?: (event: Event) => void

  onFocus?: (event: Event) => void
  /** Select 组件头部内容 */
  renderPrefix?: () => Render
  /** 无选项时的列表 */
  renderEmpty?: () => Render
}

/**
 * [今日, 昨日, 本周, 上周, 本月, 上月, 最近一周, 最近一个月, 最近三个月, 最近半年, 最近一年]
 */
export type PickerShortcuts =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'week'
  | 'oneMonth'
  | 'threeMonth'
  | 'halfAYear'
  | 'year'

export interface DatePickerProps
  extends Omit<GetCommonProps<ElDatePicker>, 'field'> {
  /** 表单控件类型 */
  formType: FormItemType.DATE_PICKER

  field?: string | [string, string]

  /** 在范围选择器里取消两个日期面板之间的联动 */
  unlinkPanels?: boolean

  /** 选中日期后的默认具体时刻 */
  defaultTime?: string | string[]

  dateLimit?: number | { limit: number; type?: OpUnitType }

  /** 是否不能选择超过今天 */
  endToday?: boolean

  /** 是否不能小于今天 */
  startToday?: boolean

  /** 当 `endToday` 或 `startToday` 为 `true` 时，默认是可以选择今天的，`isExcludeToDay` 为true，不可以选中今天 */
  isExcludeToDay?: boolean

  pickerShortcuts?: boolean | PickerShortcuts[]

  onChange?: (e?: string | string[] | Date | Date[]) => void

  onBlur?: (e: ElDatePicker) => void

  onFocus?: (e: ElDatePicker) => void
}

/** 任意时间选择组件 */
export interface TimePickerProps
  extends Omit<GetCommonProps<ElTimePicker>, 'field'> {
  /** 表单控件类型 */
  formType: FormItemType.TIME_PICKER

  field?: string | [string, string]

  valueFormat?: string

  onChange?: (e?: string | string[]) => void

  onBlur?: (e: ElTimePicker) => void

  onFocus?: (e: ElTimePicker) => void
}

/** 固定时间选择组件 */
export interface TimeSelectProps
  extends Omit<GetCommonProps<ElTimeSelect>, 'field'> {
  /** 表单控件类型 */
  formType: FormItemType.TIME_SELECT

  field?: string | [string, string]
  /** Placeholder for the start time in range mode */
  startPlaceholder?: string

  /** Placeholder for the end time in range mode */
  endPlaceholder?: string

  /** start Additional options, check the table below */
  startPickerOptions?: string

  /** end Additional options, check the table below */
  endPickerOptions?: TimeSelectOptions

  /** Whether to pick a time range */
  isRange?: boolean

  onChange?: (e?: string | string[]) => void

  onBlur?: (e: ElTimeSelect) => void

  onFocus?: (e: ElTimeSelect) => void
}

export interface SwitchProps extends GetCommonProps<ElSwitch> {
  formType: FormItemType.SWITCH

  /** switch 状态发生变化时的回调函数 */
  onChange?: (e: unknown) => void
}

export interface CheckboxProps extends GetCommonProps<ElCheckbox> {
  formType: FormItemType.CHECKBOX

  /** 默认显示内容 */
  render?: () => Render

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

export interface CheckboxButtonProps extends GetCommonProps<ElCheckboxButton> {
  /** 默认显示内容 */
  render: () => Render

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

export interface CheckboxGroupProps extends GetCommonProps<ElCheckboxGroup> {
  formType: FormItemType.CHECKBOX_GROUP

  /** 是否是 Checkbox-button */
  isCheckboxButton?: boolean

  /** 输出的值是逗号分割的字符串，还是保持数组形式 */
  outputType?: 'string' | 'array'

  /** 输出字符串 分割符, 默认英文逗号 */
  outputSeparator?: string

  /** 循环列表的key值 */
  key?: string

  /**
   * 选项列表
   */
  checkboxList?: (Omit<CheckboxProps, 'formType'> | CheckboxButtonProps)[]

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

export interface RadioProps extends GetCommonProps<ElRadio> {
  formType: FormItemType.RADIO

  /** 默认显示内容 */
  render?: () => Render

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

export interface RadioButtonProps extends GetCommonProps<ElRadioButton> {
  /** 默认显示内容 */
  render: () => Render

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

export interface RadioGroupProps extends GetCommonProps<ElRadioGroup> {
  formType: FormItemType.RADIO_GROUP

  /** 是否是 Radio-button */
  isRadioButton?: boolean

  /** 循环列表的key值 */
  key?: string

  /**
   * 选项列表
   */
  radioList?: (Omit<RadioProps, 'formType'> | RadioButtonProps)[]

  /** 当绑定值变化时触发的事件 */
  onChange?: (e: unknown) => void
}

/**
 * 级联选择器
 */
export interface CascaderProps<V = any, D = CascaderOption>
  extends Omit<GetCommonProps<ElCascader<V>>, 'field'> {
  formType: FormItemType.CASCADER

  /** 字段名称 */
  field?: string | string[]

  /** 是否严格的遵守父子节点不互相关联 */
  checkStrictly?: boolean

  /** 是否多选 */
  multiple?: boolean

  /** 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 */
  emitPath?: boolean

  /** 获取选中的节点时，是否只是叶子节点 */
  leafOnly?: boolean

  /** 获取选中节点是填写的唯一ref */
  ref?: string

  /** 获取选中的节点 */
  getCheckedNodes?: (
    node: (
      | (CascaderNode<V, D> & { path: any[]; pathLabels: any[] })
      | undefined
    )[]
  ) => void

  /** 自定义内容 */
  render?: (e: { node: CascaderNode<V, D>; data: D[] }) => Render

  /** 无匹配选项时的内容 */
  renderEmpty?: () => Render
}

export interface UploadProps extends GetCommonProps<FnbUpload> {
  formType: FormItemType.UPLOAD
}

export type FormItemProps =
  | RenderFormContentProps
  | InputPorps
  | InputNumberProps
  | AutocompletePorps
  | SelectProps
  | DatePickerProps
  | TimePickerProps
  | TimeSelectProps
  | SwitchProps
  | CheckboxProps
  | CheckboxGroupProps
  | RadioProps
  | RadioGroupProps
  | CascaderProps
  | UploadProps

export declare class FnbFormItem extends ElementUIComponent {
  form: Record<string, any>

  /**
   * form-item 列表
   */
  listItems: FormItemProps[]
}
