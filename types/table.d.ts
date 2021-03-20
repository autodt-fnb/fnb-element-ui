import { Render } from './common.d'
import { CreateElement, VNode } from 'vue'
import {
  TableColumnType,
  TableColumnFixedType,
  RenderHeaderData,
  SortOrders,
  TableColumn,
  TableColumnFilter
} from 'element-ui/types/table-column'
import { ElTable } from 'element-ui/types/table'
import { ElementUIHorizontalAlignment } from 'element-ui/types/component'
import { PopoverPlacement } from 'element-ui/types/popover'

export interface FnbTableColumn<R = object> {
  /** 多级表头时用到 */
  table?: FnbTableColumn<R>[]

  /** Type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. */
  type?: TableColumnType

  /** Column label */
  label?: string

  /** Column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered */
  columnKey?: string

  /** Field name. You can also use its alias: property */
  prop?: string

  /** Column width */
  width?: string | number

  /** Column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion */
  minWidth?: string | number

  /** Whether column is fixed at left/right. Will be fixed at left if `true` */
  fixed?: boolean | TableColumnFixedType

  /** Render function for table header of this column */
  renderHeader?: (h: CreateElement, data: RenderHeaderData) => VNode | string

  /** Whether column can be sorted */
  sortable?: boolean | 'custom'

  /** Sorting method. Works when `sortable` is `true` */
  sortMethod?: (a: any, b: any) => number

  /** The order of the sorting strategies used when sorting the data. Works when `sortable` is `true`. */
  sortOrders?: SortOrders[]

  /** Whether column width can be resized. Works when border of `el-table` is `true` */
  resizable?: boolean

  /** Function that formats content */
  formatter?: (row: R, column: TableColumn) => any

  /**
   * 自定义渲染内容，代替slot 插入内容，必须要使用箭头函数的写法
   *
   * @example
   * ```ts
   * {
   *   prop: 'example',
   *   render: ({ row, column, index }) => {
   *     return <div>自定义</div>
   *   }
   * }
   * ```
   */
  render?: (data: { row: R; column: TableColumn; index: number }) => Render

  /** Whether to hide extra content and show them in a tooltip when hovering on the cell */
  showOverflowTooltip?: boolean

  /** Alignment */
  align?: ElementUIHorizontalAlignment

  /** Alignment of the table header. If omitted, the value of the `align` attribute will be applied */
  headerAlign?: ElementUIHorizontalAlignment

  /** Class name of cells in the column */
  className?: string

  /** Class name of the label of this column */
  labelClassName?: string

  /** Function that determines if a certain row can be selected, works when `type` is `'selection'` */
  selectable?: (row: R, index: number) => boolean

  /** Whether to reserve selection after data refreshing, works when `type` is `'selection'` */
  reserveSelection?: boolean

  /** An array of data filtering options */
  filters?: TableColumnFilter[]

  /** Placement for the filter dropdown */
  filterPlacement?: PopoverPlacement

  /** Whether data filtering supports multiple options */
  filterMultiple?: Boolean

  /** Data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true` */
  filterMethod?: (value: any, row: R) => boolean

  /** Filter value for selected data, might be useful when table header is rendered with `render-header` */
  filteredValue?: TableColumnFilter[]

  /** 该列是否是slot插槽（自定义列的内容，参数为 `{ row, column, index }`），插槽名 `name` 是 `slot` 字段值（当 `slot` 不为 `true`  时）或者 `prop` 字段值 */
  slot?: boolean | string

  /** 该列是否隐藏 */
  hidden?: boolean
}

export declare class FnbTable extends ElTable {
  /**
   * 表格字段
   */
  table: FnbTableColumn[]
  /**
   * 是都显示分页组件
   */
  showPagination: boolean

  /** 是否自动最大高度 */
  autoMaxHeight: boolean

  /**
   * 每页显示数
   */
  pageSize: number

  /**
   * 当前页码
   */
  currentPage: number

  /**
   * 数据总数
   */
  total: number

  /**
   * 是否显示外层的card组件
   */
  noCard: boolean

  /** 需要请求数据api方法 */
  fetchApi(...arg: any[]): Promise<any>

  /** 数据请求的参数 */
  params: Record<string, any>

  /** 自定义 后端需要的 分页参数名称 */
  pageProp: { pageSize: string; pageNum: string }

  /** 自定义后端返回参数的名称 */
  dataProp: { total: string; records: string }

  /** 自定义存储排序 localStorage key值，默认用 路由 name（当一个路由有多个table时，必须自定义定义一个唯一的key值） */
  storageSortKey: string

  clearFilter(columnKey?: string[]): void

  /** 自动高度调用事件 */
  updateMaxHeight(): void
}
