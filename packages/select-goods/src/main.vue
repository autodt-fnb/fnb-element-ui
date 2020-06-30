<template>
  <Popover
    placement="bottom-start"
    trigger="manual"
    popper-class="select-goods__wrap"
    :width="popoverWidth"
    v-model="showDialog"
  >
    <div class="flex" :style="{ height: `${popoverHeight}px` }">
      <Scrollbar v-show="!value" class="scrollbar-height tree">
        <Tree
          highlight-current
          :expand-on-click-node="false"
          :node-key="nodeKey"
          :data="categoryList"
          :props="treeProps"
          @node-click="categoryTreeClick"
        />
      </Scrollbar>
      <div class="line" v-show="!value" />
      <div class="right-content">
        <div class="table-wrap">
          <Table
            class="table"
            header-cell-class-name="table-header"
            cell-class-name="table-cell"
            :max-height="popoverHeight - 38"
            :row-key="rowKey"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <TableColumn
              type="selection"
              reserve-selection
              align="center"
              width="45"
            />
            <TableColumn
              v-for="(item, index) in table"
              :key="index"
              show-overflow-tooltip
              align="center"
              :formatter="item.formatter"
              :prop="item.prop"
              :label="item.label"
            />
            <slot slot="append" name="append" />
          </Table>
        </div>
        <div class="footer-btn">
          <Button size="mini" @click="handleCancle">取 消</Button>
          <Button type="primary" size="mini" @click="handleConfirm">
            确 认
          </Button>
        </div>
      </div>
    </div>
    <template slot="reference">
      <Input
        @click.native="showDialog = true"
        :value="value"
        @input="$emit('input', $event)"
        @clear="$emit('inputClear')"
        clearable
        :placeholder="placeholder"
      />
    </template>
  </Popover>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator'
import {
  Popover,
  Input,
  Scrollbar,
  Table,
  TableColumn,
  Tree,
  Button
} from 'element-ui'

/**
 * 选择商品组件
 */
@Component({
  components: { Popover, Input, Scrollbar, Table, TableColumn, Tree, Button },
  name: 'FnbSelectGoods'
})
export default class FnbSelectGoods extends Vue {
  /** 搜索内容 */
  @Model('input', { type: String, required: true }) readonly value!: string

  /**
   * 表格字段
   */
  @Prop({ default: () => [], required: true }) readonly table!: object[]

  /**
   * 表格数据
   */
  @Prop({ default: () => [], required: true }) readonly tableData!: object[]

  /**
   * 行数据的 `Key`，用来优化 `Table` 的渲染；在使用 `reserve-selection` 功能与显示树形数据时，该属性是必填的。类型为 `String` 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`
   */
  @Prop({ default: undefined, required: true }) readonly rowKey!:
    | ((row: unknown) => string)
    | string

  /**
   * 输入框占位字符
   */
  @Prop({ default: '请输入' }) placeholder!: string

  /**
   * 商品分类列表
   */
  @Prop({ default: () => [] }) readonly categoryList!: object[]

  /** 树形控件 配置选项 */
  @Prop() readonly treeProps!: { label: string; children: string }

  /** 树形控件key值 */
  @Prop() readonly nodeKey!: string

  /** 弹窗宽度 */
  @Prop({ default: 700, type: Number }) readonly popoverWidth!: number

  /** 弹窗高度 */
  @Prop({ default: 300, type: Number }) readonly popoverHeight!: number

  /**
   * 显示选择商品弹窗
   */
  showDialog = false

  /** 选中数据列表 */
  selectionList: object[] = []

  /**
   * 处理可选择项选择变化事件
   */
  @Emit('selection-change')
  handleSelectionChange(list: object[]) {
    this.selectionList = list
    return list
  }

  /**
   * 树状分类点击事件
   */
  @Emit('tree-click')
  categoryTreeClick(data: object) {
    return data
  }

  /**
   * 点击取消按钮
   */
  @Emit('cancle')
  handleCancle() {
    this.showDialog = false
  }

  /**
   * 点击确认按钮
   */
  @Emit('confirm')
  handleConfirm() {
    this.showDialog = false
    return this.selectionList
  }
}
</script>
<style lang="scss">
.select-goods__wrap {
  padding: 0;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

<style lang="scss" scoped>
.line {
  width: 1px;
  height: 100%;
  background-color: #cdcdcd;
}

.right-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0%;
}

.table-wrap {
  flex: 1;
}

.flex {
  display: flex;
  box-sizing: border-box;
}

.footer-btn {
  display: flex;
  justify-content: flex-end;
  padding: 5px 20px;
}

@mixin scrollbar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}

::v-deep {
  .table-header {
    padding: 8px 0;
    background: rgb(236, 245, 255);
    line-height: 1;
  }

  .table-cell {
    padding: 8px 0;
    line-height: 1;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-table__body-wrapper {
    @include scrollbar;

    &::-webkit-scrollbar {
      width: 10px;
    }
  }
}

.scrollbar-height {
  height: 100%;

  &.tree {
    flex-basis: 150px;
  }

  & ::v-deep .scrollbar-wrapper {
    overflow-x: hidden;
  }

  @include scrollbar;
}
</style>
