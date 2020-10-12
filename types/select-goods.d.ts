import { ElementUIComponent } from 'element-ui/types/component'
import { ElTable } from 'element-ui/types/table'
import { ElTree } from 'element-ui/types/tree'
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

  /** 是否显示tab 栏 */
  showTab: boolean

  /** tab栏 列表，{value: string;label: string} */
  tabList: {
    value: string
    label: string
  }[]

  /** tab当前选中 */
  tabActiveValue: string

  /** 显示已选择项 */
  showSelection: boolean

  /** 当前选中的数据列表 */
  selectionList: object[]

  /** 已选项部分的宽度, 默认200px */
  selectionWidth: number

  /** 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
  expandOnClickNode: boolean

  /** 禁止输入框输入 */
  disabled: boolean

  /** 触发弹窗显示 */
  trigger: string

  /**
   * 显示选择商品弹窗
   */
  showDialog: boolean

  treeRef: ElTree<string, any>

  tableRef: ElTable
}
