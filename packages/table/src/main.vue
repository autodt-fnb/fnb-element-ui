<template>
  <Card>
    <Table
      ref="table"
      :data="data"
      highlight-current-row
      element-loading-text="Loading"
      border
      fit
      :height="height"
      :max-height="maxHeight"
      :row-key="rowKey"
      :expand-row-keys="expandRowKeys"
      tooltip-effect="dark"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
      cell-class-name="cell-class-name"
    >
      <template v-for="(tableItem, tableIndex) in table">
        <TableColumn
          :key="tableIndex"
          :type="tableItem.type"
          v-if="tableItem.type === 'expand'"
        >
          <template slot-scope="props">
            <slot
              :index="props.$index"
              :row="props.row"
              :name="tableItem.prop"
            />
          </template>
        </TableColumn>
        <TableColumn
          :key="tableIndex"
          :type="tableItem.type"
          :label="tableItem.label"
          :reserve-selection="tableItem.reserveSelection"
          :align="tableItem.align || 'center'"
          :width="tableItem.width"
          v-else-if="!!tableItem.type"
        />
        <TableColumn
          v-else-if="!tableItem.hidden"
          :key="tableIndex"
          :align="tableItem.align || 'center'"
          :label="tableItem.label"
          :width="tableItem.width"
          :min-width="tableItem.minWidth"
          :fixed="tableItem.fixed"
          :reserve-selection="tableItem.reserveSelection"
          :resizable="tableItem.resizable"
        >
          <template v-slot="props">
            <template v-if="!tableItem.hidden">
              <template v-if="tableItem.showOverflowTooltip">
                <el-popover
                  trigger="hover"
                  placement="top"
                  popper-class="customerze-table__popper-class"
                  :disabled="
                    !popoverDisabled[`${props.column.id}-index_${props.$index}`]
                  "
                  :content="
                    tableItem.formatter
                      ? tableItem.formatter(props.row, props.column)
                      : props.row[tableItem.prop]
                  "
                >
                  <div
                    class="tow-line"
                    slot="reference"
                    @mouseenter.stop="
                      handlePopover(
                        $event,
                        `${props.column.id}-index_${props.$index}`
                      )
                    "
                    @mouseleave.stop="
                      handlePopover(
                        $event,
                        `${props.column.id}-index_${props.$index}`
                      )
                    "
                  >
                    {{
                      tableItem.formatter
                        ? tableItem.formatter(props.row, props.column)
                        : props.row[tableItem.prop]
                    }}
                  </div>
                </el-popover>
              </template>
              <template v-else-if="!tableItem.slot">
                <div>
                  {{
                    tableItem.formatter
                      ? tableItem.formatter(props.row, props.column)
                      : props.row[tableItem.prop]
                  }}
                </div>
              </template>
              <slot
                v-else
                :index="props.$index"
                :row="props.row"
                :name="tableItem.prop"
              />
            </template>
          </template>
        </TableColumn>
      </template>
    </Table>
    <div class="pagination-wrapper" v-if="showPagination && data.length > 0">
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
  </Card>
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
import { Table, Card, TableColumn } from 'element-ui'
import { ElementUIComponent } from 'element-ui/types/component'

@Component({
  components: { Table, Card, TableColumn },
  name: 'FnbTable'
})
export default class FnbTable extends Vue implements ElementUIComponent {
  /**
   * 表格字段
   */
  @Prop({ default: () => [] }) readonly table!: unknown[]

  /**
   * 表格数据
   */
  @Prop({ default: () => [] }) readonly data!: unknown[]

  @Prop() readonly rowKey!: ((row: unknown) => string) | string

  @Prop({ default: null }) readonly expandRowKeys!: string[] | number[]
  /**
   * 是都显示分页组件
   */
  @Prop({ default: true, type: Boolean }) readonly showPagination!: boolean

  /**
   * 每页显示数
   */
  @PropSync('pageSize', { default: 0 }) pageSizeProp!: number

  /**
   * 当前页码
   */
  @PropSync('currentPage', { default: 0 }) currentPageProp!: number

  /**
   * 数据总数
   */
  @Prop({ default: 0 }) readonly total!: number

  /**
   * 表格高度
   */
  @Prop() readonly height!: number | string

  /**
   * 表格最大高度
   */
  @Prop() readonly maxHeight!: number | string
  /**
   * 是否显示外层的card组件
   */
  @Prop({ default: false, type: Boolean }) readonly noCard!: boolean

  @Ref('table') readonly tableRef!: ElTable

  /** 禁止显示tooltip */
  popoverDisabled: { [i: string]: boolean } = {}

  private mounted() {
    this.noCard && this.noCardAction()
  }

  /**
   * 不要外层card 样式
   */
  private noCardAction() {
    const node = this.tableRef.$el
    if (node.parentElement) {
      node.parentElement.className = ''

      node.parentElement.parentElement &&
        (node.parentElement.parentElement.className = '')
    }
  }

  handlePopover(e: MouseEvent, type: string) {
    const el = e.target as Element
    if (e.type === 'mouseenter') {
      this.popoverDisabled = { [type]: el.scrollHeight > el.clientHeight }
    } else if (e.type === 'mouseleave') {
      this.popoverDisabled = {}
    }
  }

  @Emit('selection-change')
  handleSelectionChange(e: unknown) {}

  @Emit('row-click')
  handleRowClick(e: unknown) {}

  @Emit('size-change')
  handleSizeChange(size: number) {
    this.currentPageProp = 1
    return size
  }

  @Emit('current-change')
  handleCurrentChange(page: number) {}

  @Emit('expand-change')
  handleExpandChange(row: unknown, expandedRows: unknown) {}
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
.customerze-table__popper-class {
  max-width: 500px;
}
</style>
