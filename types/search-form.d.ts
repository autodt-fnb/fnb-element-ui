import { ElementUIComponent } from 'element-ui/types/component'
import { FormItemProps } from './form-item'

export class FnbSearchForm<F = Record<string, any>> extends ElementUIComponent {
  /** form item 列表 数据 */
  listItems: FormItemProps[]

  /** 默认是否展开搜索 */
  defaultExpand: boolean

  /** 初始 form值 */
  initForm: F

  /** 表单数据 */
  form: F
}
