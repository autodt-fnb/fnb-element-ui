/** 表单 item 类型 */
export enum FormItemType {
  /** 自定义 formitem content 内容 */
  RENDER_FORM_CONTENT = 'RENDER_FORM_CONTENT',
  /** 输入框组件 */
  INPUT = 'INPUT',
  /** 输入框组件 */
  INPUT_NUMBER = 'INPUT_NUMBER',
  /** 自动建议组件 */
  AUTOCOMPLETE = 'AUTOCOMPLETE',
  /** 选择框 */
  SELECT = 'SELECT',
  /** 日期选择组件 */
  DATE_PICKER = 'DATE_PICKER',
  /** 任意时间点 时间选择组件 */
  TIME_PICKER = 'TIME_PICKER',
  /** 固定时间点 时间选择组件 */
  TIME_SELECT = 'TIME_SELECT',
  /** 开关 */
  SWITCH = 'SWITCH',
  /** 多选框 */
  CHECKBOX = 'CHECKBOX',
  /** 多选框组 */
  CHECKBOX_GROUP = 'CHECKBOX_GROUP',
  /** 单选框 */
  RADIO = 'RADIO',
  /** 单选框组 */
  RADIO_GROUP = 'RADIO_GROUP',
  /** 级联选择器 */
  CASCADER = 'CASCADER',
  /** 上传图片视频 */
  UPLOAD = 'UPLOAD'
}
