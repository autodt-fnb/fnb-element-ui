import { ElementUIComponent } from 'element-ui/types/component'
import { FnbTableColumn } from './table'

export declare class FnbSelectGoods extends ElementUIComponent {
  /** 输入框内容 */
  value: string

  /** 表格 Column 字段 */
  table: FnbTableColumn[]

  /** 表格数据 */
  tableData: object[]
  /**
   * 行数据的 `Key`，用来优化 `Table` 的渲染；在使用 `reserve-selection` 功能与显示树形数据时，该属性是必填的。类型为 `String` 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`
   */
  rowKey: ((row: unknown) => string) | string

  /** 输入框占位字符 */
  placeholder: string

  /** 分类数据加载中 */
  treeLoading: boolean

  /** table数据加载中 */
  tableLoading: string

  /** 商品分类列表 */
  categoryList: object[]

  /** 树形控件 配置选项 */
  treeProps: {
    label: string
    children: string
    disabled: boolean
  }

  /** 树形控件key值 */
  nodeKey: string

  /** 弹窗宽度 */
  popoverWidth: number

  /** 弹窗高度 */
  popoverHeight: number

  /** 是否显示取消按钮 */
  showCancle: boolean

  /** 是否显示确认按钮 */
  showConfirm: boolean
}
