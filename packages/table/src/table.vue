<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:03:27
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-14 17:54:20
 */
import {
  Vue,
  Component,
  Prop,
  Emit,
  Ref,
  PropSync
} from 'vue-property-decorator'
import { debounce } from 'throttle-debounce'
import { FnbTable, FnbTableColumn } from '../../../types/table'
import { ElTooltip } from 'element-ui/types/tooltip'
import { VNode } from 'vue'
import { camelCase, kebabCase } from 'lodash-es'

/** 格式化table字段 */
function formatTable(table: FnbTableColumn[]) {
  return Array.isArray(table) && table.length > 0
    ? table.map((v: any) => {
        v.align = v.align || 'center' // 默认居中
        if (v.slot) {
          // 如slot是boolean值。则slot名称为prop，否则就是slot值
          if (v.slot === true) {
            v.slotName = v.prop
          } else {
            v.slotName = v.slot
          }
        }
        if (v.table) {
          v.table = formatTable(v.table)
        }
        v.showTooltip = v.showOverflowTooltip
        // 防止将slot绑定到 tableColumn上
        Reflect.deleteProperty(v, 'slot')
        Reflect.deleteProperty(v, 'showOverflowTooltip')
        return v
      })
    : []
}

@Component({
  name: 'FnbTable',
  inheritAttrs: false
})
export default class Table extends Vue {
  /**
   * 表格字段
   */
  @Prop({ default: () => [] }) readonly table!: FnbTableColumn[]

  /**
   * 是都显示分页组件
   */
  @Prop({ default: true, type: Boolean }) readonly showPagination!: boolean

  /**
   * 每页显示数
   */
  @PropSync('pageSize', { default: 10, type: Number }) pageSizeProp!: number

  /**
   * 当前页码
   */
  @PropSync('currentPage', { default: 1, type: Number })
  currentPageProp!: number

  /**
   * 是否启用自动最大高度，使用当前窗口剩余高度
   */
  @Prop({ type: Boolean }) readonly autoMaxHeight!: boolean

  /**
   * 数据总数
   */
  @Prop() readonly total!: number

  /**
   * 是否显示外层的card组件
   */
  @Prop({ default: false, type: Boolean }) readonly noCard!: boolean

  /** 分页 layou 参数 */
  @Prop({ default: 'total, sizes, prev, pager, next, jumper' })
  readonly paginationLayout!: string

  /** table组件ref */
  @Ref('table') readonly tableRef!: FnbTable

  /** popover 组件 ref */
  @Ref('popover') readonly popoverRef!: ElTooltip

  /** 提示框内容 */
  popoverContent = ''

  maxHeight: string | number = 0

  /** tableColumn 组件的属性 */
  get tableColumn() {
    if (!Array.isArray(this.table)) {
      return []
    }
    return formatTable(this.table)
  }

  /** table attributes */
  get tableProps() {
    const props: Record<string, any> = {}
    for (const key in this.$attrs) {
      props[camelCase(key)] = this.$attrs[key]
    }
    // 纵向边框
    props.border = props.border ?? true

    // 处理最大高度
    props.maxHeight = this.autoMaxHeight ? this.maxHeight : props.maxHeight

    props.cellClassName ??= 'cell-class-name'

    props.headerCellClassName ??= 'header-cell-class-name'
    return props
  }

  /** table events */
  get tableEvents() {
    const events: Record<string, Function | Function[]> = {}
    for (const key in this.$listeners) {
      const name = kebabCase(key)
      // 为了兼容 分页的current-change
      if (name === 'current-row-change') {
        events['current-change'] = this.$listeners[key]
      } else if (name !== 'current-change') {
        // 为了兼容 分页的current-change
        events[name] = this.$listeners[key]
      }
    }
    if (!Reflect.has(events, 'cell-mouse-enter')) {
      events['cell-mouse-enter'] = this.handlePopover
    }
    if (!Reflect.has(events, 'cell-mouse-leave')) {
      events['cell-mouse-leave'] = this.handlePopover
    }
    return events
  }

  /** 显示tooltip文字弹窗 */
  activateTooltip!: Function

  created() {
    this.activateTooltip = debounce(50, (tooltip: any) =>
      tooltip.handleShowPopper()
    )
  }

  mounted() {
    if (this.autoMaxHeight) {
      window.addEventListener('resize', this.updateMaxHeight)
      this.updateMaxHeight()
    }
  }

  beforeDestroy() {
    if (this.autoMaxHeight) {
      window.removeEventListener('resize', this.updateMaxHeight)
    }
  }

  /** 处理显示 popover */
  handlePopover(
    row: any,
    column: any,
    cell: HTMLTableCellElement,
    event: MouseEvent
  ) {
    // 如不是 需要隐藏文字 单元，不显示tooltips
    if (!new Set(cell.classList.values()).has('tow-line')) {
      return
    }

    const type = event.type
    if (type === 'mouseenter') {
      const cellHtml = cell.querySelector('.cell') as HTMLDivElement

      const range = document.createRange()
      range.setStart(cellHtml, 0)
      range.setEnd(cellHtml, cellHtml.childNodes.length)
      const rangeHeight = range.getBoundingClientRect().height
      const padding =
        (parseInt(window.getComputedStyle(cellHtml).paddingTop, 10) || 0) +
        (parseInt(window.getComputedStyle(cellHtml).paddingBottom, 10) || 0)
      if (
        (rangeHeight + padding > cellHtml.offsetHeight ||
          cellHtml.scrollHeight > cellHtml.offsetHeight) &&
        this.popoverRef
      ) {
        const tooltip = this.popoverRef as any

        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.popoverContent = cellHtml.innerText || cellHtml.textContent || ''
        tooltip.referenceElm = cell
        if (tooltip.$refs.popper) {
          const popper = tooltip.$refs.popper as HTMLDivElement
          popper.style.display = 'none'
        }
        tooltip.doDestroy()
        tooltip.setExpectedState(true)
        this.activateTooltip(tooltip)
      }
    } else {
      const tooltip = this.popoverRef as any
      if (tooltip) {
        tooltip.setExpectedState(false)
        tooltip.handleClosePopper()
      }
    }
  }

  /** 自动高度 */
  updateMaxHeight() {
    this.$nextTick(() => {
      /** 分页容器的高度 */
      const paginationHeight =
        (this.$el.querySelector('.pagination-wrapper') as HTMLElement)
          ?.offsetHeight ?? 48

      this.maxHeight =
        window.innerHeight -
        (this.tableRef.$el as HTMLElement).getBoundingClientRect().top -
        10 -
        (this.showPagination ? paginationHeight : 0) -
        (this.noCard ? 0 : 2)
    })
  }

  /** element-ui table method clearSelection */
  clearSelection() {
    this.tableRef.clearSelection()
  }

  /** element-ui table method toggleRowSelection */
  toggleRowSelection(row: object, selected?: boolean) {
    this.tableRef.toggleRowSelection(row, selected)
  }

  /** element-ui table method toggleAllSelection */
  toggleAllSelection() {
    this.tableRef.toggleAllSelection()
  }

  /** element-ui table method toggleRowExpansion */
  toggleRowExpansion(row: object, expanded?: boolean) {
    this.tableRef.toggleRowExpansion(row, expanded)
  }

  /** element-ui table method setCurrentRow */
  setCurrentRow(row?: object) {
    this.tableRef.setCurrentRow(row)
  }

  /** element-ui table method clearSort */
  clearSort() {
    this.tableRef.clearSort()
  }

  /** element-ui table method clearFilter */
  clearFilter(columnKey?: string[]) {
    this.tableRef.clearFilter(columnKey)
  }

  /** element-ui table method doLayout */
  doLayout() {
    this.tableRef.doLayout()
  }

  /** element-ui table method sort */
  sort(prop: string, order: string) {
    this.tableRef.sort(prop, order)
  }

  @Emit('size-change')
  handleSizeChange(size: number) {
    this.pageSizeProp = size
    this.currentPageProp = 1
    return size
  }

  @Emit('current-change')
  handleCurrentChange(page: number) {
    this.currentPageProp = page
    return page
  }

  /** 渲染 tableColumn 组件 */
  renderTableColumn(list: any[]): (VNode | Element)[] {
    return list
      .filter(v => !v.hidden)
      .map((item, tableIndex) => {
        const columnSlots = {
          default:
            (item.render
              ? ({ row, column, $index }: any) =>
                  item.render?.({
                    row,
                    column,
                    index: $index
                  })
              : undefined) ??
            (this.$scopedSlots[item.slotName]
              ? ({ row, column, $index }: any) =>
                  this.$scopedSlots[item.slotName]?.({
                    row,
                    column,
                    index: $index
                  })
              : undefined),
          header: this.$scopedSlots[`${item.prop}Header`]
            ? ({ column, $index }: any) =>
                this.$scopedSlots[`${item.prop}Header`]?.({
                  column,
                  index: $index
                })
            : undefined
        }

        return Array.isArray(item.table) && item.table.length > 0 ? (
          <el-table-column
            key={`${item.prop ?? ''}-${tableIndex}`}
            {...{ attrs: item }}
            scopedSlots={columnSlots}
          >
            {this.renderTableColumn(item.table)}
          </el-table-column>
        ) : (
          <el-table-column
            key={`${item.prop ?? ''}-${tableIndex}`}
            {...{
              attrs: {
                ...item,
                className:
                  (item.className ?? '') + (item.showTooltip ? ' tow-line' : '')
              }
            }}
            scopedSlots={columnSlots}
          />
        )
      }) as (VNode | Element)[]
  }

  render() {
    return (
      <div class={!this.noCard ? 'el-card is-always-shadow' : ''}>
        {this.$scopedSlots.TABLE_CARD_HEADER?.(null) ??
          this.$slots.TABLE_CARD_HEADER}
        <el-table
          ref="table"
          onCellMouseEnter={this.handlePopover}
          onCellMouseLeave={this.handlePopover}
          {...{ attrs: this.tableProps, on: this.tableEvents }}
        >
          {this.renderTableColumn(this.tableColumn)}
          <template slot="append">
            {this.$scopedSlots.append?.(null) ?? this.$slots.append}
          </template>
        </el-table>
        {this.showPagination &&
        this.tableProps.data &&
        this.tableProps.data.length > 0 ? (
          <div class="pagination-wrapper">
            <el-pagination
              class="pagination"
              {...{
                on: {
                  ['size-change']: this.handleSizeChange,
                  ['current-change']: this.handleCurrentChange
                }
              }}
              small
              current-page={this.currentPageProp}
              layout={this.paginationLayout}
              page-size={this.pageSizeProp}
              page-sizes={[10, 30, 50, 100]}
              total={this.total}
            />
            {this.$scopedSlots.paginationAppend?.(null) ??
              this.$slots.paginationAppend}
          </div>
        ) : null}
        <el-tooltip
          content={this.popoverContent}
          effect="light"
          placement="top"
          popper-class="fnb-table__popper-class el-popover el-popper el-popover--plain"
          ref="popover"
        />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-table {
    font-size: 12px;
    .cell {
      line-height: 1.25;
    }
  }
  .cell-class-name {
    padding: 0;
    height: 44px;

    button[type='button'].el-button.el-button--text {
      padding: 0;
      line-height: 22px;
    }
  }
  .header-cell-class-name {
    @extend .cell-class-name;
    background-color: #f5f7fa;
  }
  .tow-line > .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .is-group.has-gutter {
    .gutter {
      width: 10px !important;
    }
  }

  .el-table__body-wrapper {
    &::-webkit-scrollbar-track-piece {
      background: #f4f4f5;
    }

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #dcdfe6;
      border-radius: 5px;
    }
  }
}

.pagination-wrapper {
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination {
  display: flex;
  align-items: center;
  height: 48px;

  ::v-deep {
    .el-input--mini .el-input__inner {
      font-size: 12px;
      height: 22px;
      line-height: 22px;
    }
  }
}
</style>
<style lang="scss">
.fnb-table__popper-class {
  max-width: 500px;

  &.el-popover--plain {
    padding: 18px 20px;
  }

  &.el-popover {
    position: absolute;
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
  }

  &.el-popper {
    .popper__arrow {
      border-width: 6px;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    }
    .popper__arrow,
    .popper__arrow:after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }

    &[x-placement^='bottom'] .popper__arrow {
      top: -6px;
      left: 50%;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
    }
    &[x-placement^='top'] .popper__arrow {
      bottom: -6px;
      left: 50%;
      margin-right: 3px;
      border-top-color: #ebeef5;
      border-bottom-width: 0;
    }
  }
}
</style>
