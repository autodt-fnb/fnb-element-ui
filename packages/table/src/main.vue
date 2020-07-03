<template>
  <ElCard ref="tableCard">
    <ElTable ref="table" v-bind="tableProps" v-on="tableEvents">
      <template v-for="(item, tableIndex) in tableColumn">
        <ElTableColumn v-if="item.slotName" :key="tableIndex" v-bind="item">
          <template v-slot="{ row, column, $index }">
            <slot
              :index="$index"
              :row="row"
              :column="column"
              :name="item.slotName"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-else-if="item.showOverflowTooltip"
          :key="tableIndex"
          v-bind="item"
        >
          <template v-slot="{ row, column, $index }">
            <el-popover
              trigger="hover"
              placement="top"
              popper-class="fnb-table__popper-class"
              :disabled="!popoverDisabled[`${column.id}-index_${$index}`]"
              :content="
                item.formatter ? item.formatter(row, column) : row[item.prop]
              "
            >
              <div
                class="tow-line"
                slot="reference"
                @mouseenter.stop="
                  handlePopover($event, `${column.id}-index_${$index}`)
                "
                @mouseleave.stop="
                  handlePopover($event, `${column.id}-index_${$index}`)
                "
              >
                {{
                  item.formatter ? item.formatter(row, column) : row[item.prop]
                }}
              </div>
            </el-popover>
          </template>
        </ElTableColumn>
        <ElTableColumn v-else :key="tableIndex" v-bind="item" />
      </template>
    </ElTable>
    <div
      class="pagination-wrapper"
      v-if="showPagination && tableProps.data && tableProps.data.length > 0"
    >
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 30, 50, 100]"
        :current-page.sync="currentPageProp"
        :page-size.sync="pageSizeProp"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </ElCard>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-function */ // 兼容 @Emit
/* eslint-disable @typescript-eslint/no-unused-vars */ // 兼容 @Emit
import {
  Vue,
  Component,
  Prop,
  Emit,
  Ref,
  PropSync,
  Mixins
} from 'vue-property-decorator'
import { ElTable } from 'element-ui/types/table'
import { ElementUIComponent } from 'element-ui/types/component'
import { ElCard } from 'element-ui/types/card'

/** table 默认 props */
const tableProps: { [k: string]: any } = {
  data: [],
  size: undefined,
  width: undefined,
  height: undefined,
  maxHeight: undefined,
  fit: true,
  stripe: false,
  border: true,
  rowKey: undefined,
  context: undefined,
  showHeader: true,
  showSummary: false,
  sumText: undefined,
  summaryMethod: undefined,
  rowClassName: undefined,
  rowStyle: undefined,
  cellClassName: undefined,
  cellStyle: undefined,
  headerRowClassName: undefined,
  headerRowStyle: undefined,
  headerCellClassName: undefined,
  headerCellStyle: undefined,
  highlightCurrentRow: false,
  currentRowKey: undefined,
  emptyText: undefined,
  expandRowKeys: undefined,
  defaultExpandAll: false,
  defaultSort: undefined,
  tooltipEffect: undefined,
  spanMethod: undefined,
  selectOnIndeterminate: true,
  indent: 16,
  treeProps: {
    hasChildren: 'hasChildren',
    children: 'children'
  },
  lazy: false,
  load: undefined
}

/** table 默认事件 */
const tableEventsList: string[] = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change'
]

@Component({
  name: 'FnbTable'
})
export default class FnbTable extends Vue implements ElementUIComponent {
  /**
   * 表格字段
   */
  @Prop({ default: () => [] }) readonly table!: unknown[]

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
   * 数据总数
   */
  @Prop() readonly total!: number

  /**
   * 是否显示外层的card组件
   */
  @Prop({ default: false, type: Boolean }) readonly noCard!: boolean

  /** 最外层card组件ref */
  @Ref('tableCard') readonly tableCardRef!: ElCard

  /** table组件ref */
  @Ref('table') readonly tableRef!: ElTable

  /** 禁止显示tooltip */
  popoverDisabled: { [i: string]: boolean } = {}

  /** tableColumn 组件的属性 */
  get tableColumn() {
    if (!Array.isArray(this.table)) {
      return []
    }
    return (
      this.table?.map(v => {
        v.align = v.align || 'center' // 默认居中
        if (v.slot) {
          // 如slot是boolean值。则slot名称为prop，否则就是slot值
          if (v.slot === true) {
            v.slotName = v.prop
          } else {
            v.slotName = v.slot
          }
        }
        delete v.slot
        return v
      }) ?? []
    )
  }

  /** table attributes */
  get tableProps() {
    const props = { ...tableProps }
    for (const key in this.$attrs) {
      if (Reflect.has(props, key)) {
        props[key] = this.$attrs[key]
      }
    }
    props.cellClassName = props.cellClassName ?? 'cell-class-name'
    return props
  }

  /** table events */
  get tableEvents() {
    const events: Record<string, Function | Function[]> = {}
    for (const key in this.$listeners) {
      if (tableEventsList.includes(key)) {
        events[key] = this.$listeners[key]
      }
    }
    return events
  }

  private mounted() {
    this.noCard && this.noCardAction()
  }

  /**
   * 不要外层card 样式
   */
  private noCardAction() {
    const node = this.tableCardRef.$el
    node.className = ''
    node.children[0].className = ''
  }

  /** 处理显示 popover */
  handlePopover(e: MouseEvent, type: string) {
    const el = e.target as Element
    if (e.type === 'mouseenter') {
      this.popoverDisabled = { [type]: el.scrollHeight > el.clientHeight }
    } else if (e.type === 'mouseleave') {
      this.popoverDisabled = {}
    }
  }

  @Emit('size-change')
  handleSizeChange(size: number) {
    this.currentPageProp = 1
    return size
  }

  @Emit('current-change')
  handleCurrentChange(page: number) {}
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-card__body {
    padding: 0;
  }

  .el-table {
    .cell {
      line-height: 22px;
    }
  }
  .cell-class-name {
    padding: 0;
    height: 48px;

    button[type='button'].el-button.el-button--text {
      padding: 0;
      line-height: 22px;
    }
  }
}

.tow-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
}

.pagination {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 80px;
}
</style>
<style>
.fnb-table__popper-class {
  max-width: 500px;
}
</style>
