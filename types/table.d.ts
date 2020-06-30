import { ElementUIComponent } from 'element-ui/types/component'

export declare class FnbTable extends ElementUIComponent {
  /**
   * 表格字段
   */
  table: object[]

  /**
   * 表格数据
   */
  data: object[]

  /** 行数据的 `Key`，用来优化 `Table` 的渲染；在使用 `reserve-selection` 功能与显示树形数据时，该属性是必填的。类型为 `String` 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function` */
  rowKey?: ((row: object) => string) | string

  expandRowKeys?: string[] | number[]
  /**
   * 是都显示分页组件
   */
  showPagination?: boolean

  /**
   * 每页显示数
   */
  pageSizeProp?: number

  /**
   * 当前页码
   */
  currentPageProp?: number

  /**
   * 数据总数
   */
  total?: number

  /**
   * 表格高度
   */
  height?: number | string

  /**
   * 表格最大高度
   */
  maxHeight?: number | string
  /**
   * 是否显示外层的card组件
   */
  noCard?: boolean

  /** selection 改变事件 */
  selectionChange(e: any): void

  /** 单行点击事件 */
  rowClick(e: any): void

  /** 当前页 数据显示个数 */
  sizeChange(size: number): void

  /** 页码改变 */
  currentChange(page: number): void

  /** 表格改变事件 */
  expandChange(row: object, expandedRows: object): void
}
