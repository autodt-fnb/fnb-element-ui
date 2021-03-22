import { ElForm } from 'element-ui/types/form'

export declare class FnbForm extends ElForm {
  /**
   * 列数，或者 用数组自定义列数的span
   *
   * 如：
   *
   * 数字：cols=3,则显示3列，每列24/3=6个栅格
   *
   * 数组：cols=[6,7,5],显示3列，按照span=6，span=7，span=5，排列下去
   */
  cols: number | number[]
  /**
   * 表单左边偏移几个单位
   */
  offset: number

  /**
   * 两个表单之间的空隙
   */
  gutter: number

  form: Record<string, any>

  rules: FormRules
}

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'any'

export interface FormRuleItem {
  type?: RuleType // default type is 'string'
  required?: boolean
  pattern?: RegExp | string
  min?: number // Range of type 'string' and 'array'
  max?: number // Range of type 'string' and 'array'
  len?: number // Length of type 'string' and 'array'
  enum?: (string | number | boolean | null | undefined)[] // possible values of type 'enum'
  whitespace?: boolean
  fields?: FormRules // ignore when without required
  options?: ValidateOption
  defaultField?: FormRuleItem // 'object' or 'array' containing validation rules
  transform?: (value: any) => any
  message?: string | (() => string)
  trigger?: 'blur' | 'change' // 触发时机
  asyncValidator?: (
    rule: FormRules,
    value: any,
    callback: (error: string | string[] | void) => void,
    source: ValidateSource,
    options: ValidateOption
  ) => void | Promise<void>
  validator?: (
    rule: FormRules,
    value: any,
    callback: (error: string | string[] | void) => void,
    source: ValidateSource,
    options: ValidateOption
  ) => void
}

export interface FormRules {
  [field: string]: FormRuleItem | FormRuleItem[]
}

export interface ValidateSource {
  [field: string]: any
}

export interface ValidateOption {
  // whether to suppress internal warning
  suppressWarning?: boolean

  // when the first validation rule generates an error stop processed
  first?: boolean

  // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
  firstFields?: boolean | string[]
}
