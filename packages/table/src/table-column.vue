<template>
  <div>
    <template v-for="(item, tableIndex) in tableColumn">
      <template v-if="!item.hidden">
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
          v-else-if="item.showTooltip"
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
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FnbTableColumn } from '../../../types/table'

@Component({ components: {} })
export default class TableColumn extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly tableColumn!: FnbTableColumn[]
}
</script>

<style lang="scss" scoped></style>
