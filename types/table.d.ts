import { ElTableColumn } from 'element-ui/types/table-column'
import { ElTable } from 'element-ui/types/table'

export interface FnbTableColumn extends Partial<ElTableColumn> {
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

  clearFilter(columnKey?: string[]): void
}
