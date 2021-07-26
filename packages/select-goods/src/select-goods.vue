<template>
  <ElPopover
    placement="bottom-start"
    :trigger="trigger"
    popper-class="select-goods__wrap"
    :width="popoverWidth"
    :disabled="disabled"
    v-model="showDialog"
    ref="elPopover"
  >
    <div class="flex" :style="{ height: `${popoverHeight}px` }">
      <div class="cell flex wrap-content">
        <el-row class="tab" type="flex" v-if="showTab">
          <el-col
            :style="{ flexBasis: `calc(100% / ${tabList.length})` }"
            :class="{ active: item.value === tabActiveValue }"
            v-for="item in tabList"
            :key="item.value"
            @click.native="handleTabClick(item.value)"
            >{{ item.label }}</el-col
          >
        </el-row>
        <div class="flex cell" :style="{ height: treeScrollHeight }">
          <ElScrollbar
            v-loading="treeLoading"
            v-show="!value"
            class="scrollbar-height tree"
          >
            <ElTree
              highlight-current
              :expand-on-click-node="expandOnClickNode"
              :node-key="nodeKey"
              :data="categoryList"
              :props="treeProps"
              @node-click="categoryTreeClick"
              ref="tree"
            />
          </ElScrollbar>
          <div class="line" v-show="!value" />
          <div class="right-content">
            <div class="cell" v-loading="tableLoading">
              <ElTable
                class="table"
                ref="table"
                header-cell-class-name="table-header"
                cell-class-name="table-cell"
                :max-height="tableMaxHeight"
                :row-key="rowKey"
                :data="tableData"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
              >
                <template v-for="(item, tableIndex) in tableColumn">
                  <ElTableColumn
                    v-if="item.slotName"
                    :key="tableIndex"
                    v-bind="item"
                  >
                    <template v-slot="{ row, column, $index }">
                      <slot
                        :index="$index"
                        :row="row"
                        :column="column"
                        :name="item.slotName"
                      />
                    </template>
                  </ElTableColumn>
                  <ElTableColumn v-else :key="tableIndex" v-bind="item" />
                </template>
                <slot slot="append" name="append" />
              </ElTable>
            </div>
            <div class="footer-btn" v-if="!showSelection">
              <ElButton size="mini" v-if="showCancle" @click="handleCancle"
                >取 消</ElButton
              >
              <ElButton
                type="primary"
                v-if="showConfirm"
                size="mini"
                @click="handleConfirm"
              >
                确 认
              </ElButton>
            </div>
          </div>
        </div>
      </div>
      <template v-if="showSelection">
        <div class="line" />
        <div
          class="selection-content"
          :style="{ width: `${selectionWidth}px` }"
        >
          <div class="right-scrollbar-title">
            已选项目（{{ selectionList.length }}）
          </div>
          <el-scrollbar
            :style="{ height: rightScrollHeight }"
            class="scrollbar right-scrollbar"
          >
            <div
              class="selection-list"
              v-for="(item, index) in selectionList"
              :key="index"
            >
              <div class="name">{{ item.name }}</div>
              <div
                class="el-icon-circle-close"
                @click="handleDeleteSelection(index, item)"
              />
            </div>
          </el-scrollbar>
          <div class="footer-btn">
            <ElButton size="mini" v-if="showCancle" @click="handleCancle"
              >取 消</ElButton
            >
            <ElButton
              type="primary"
              v-if="showConfirm"
              size="mini"
              @click="handleConfirm"
            >
              确 认
            </ElButton>
          </div>
        </div>
      </template>
    </div>
    <slot slot="reference" name="reference">
      <ElInput
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event)"
        @clear="$emit('input-clear')"
        clearable
        :placeholder="placeholder"
      />
    </slot>
  </ElPopover>
</template>

<script lang="ts">
/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:03:01
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:03:01
 */
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  PropSync,
  Ref
} from 'vue-property-decorator'
import { FnbTableColumn } from '../../../types/table'
import { ElTable } from 'element-ui/types/table'
import { ElTree } from 'element-ui/types/tree'

/**
 * 选择商品组件
 */
@Component({
  name: 'FnbSelectGoods'
})
export default class SelectGoods extends Vue {
  /** 搜索内容 */
  @Model('input', { type: String, required: true }) readonly value!: string

  /**
   * 表格字段
   */
  @Prop({ default: () => [], required: true }) readonly table!: FnbTableColumn[]

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
   * 分类数据加载中
   */
  @Prop({ default: false, type: Boolean }) treeLoading!: string

  /**
   * table数据加载中
   */
  @Prop({ default: false, type: Boolean }) tableLoading!: string

  /**
   * 商品分类列表
   */
  @Prop({ default: () => [] }) readonly categoryList!: object[]

  /** 树形控件 配置选项 */
  @Prop() readonly treeProps!: {
    label: string
    children: string
    disabled: boolean
  }

  /** 树形控件key值 */
  @Prop() readonly nodeKey!: string

  /** 弹窗宽度 */
  @Prop({ default: 700, type: Number }) readonly popoverWidth!: number

  /** 弹窗高度 */
  @Prop({ default: 300, type: Number }) readonly popoverHeight!: number

  /** 是否显示取消按钮 */
  @Prop({ default: false, type: Boolean }) readonly showCancle!: boolean

  /** 是否显示确认按钮 */
  @Prop({ default: false, type: Boolean }) readonly showConfirm!: boolean

  /** 是否显示tab 栏 */
  @Prop({ type: Boolean }) readonly showTab!: boolean

  /** tab栏 列表，{value: string;label: string} */
  @Prop({ type: Array, default: () => [] }) readonly tabList!: {
    value: string
    label: string
  }[]

  /** tab当前选中 */
  @PropSync('tabActive', { type: String }) tabActiveValue!: string

  /** 显示已选择项 */
  @Prop({ type: Boolean }) readonly showSelection!: boolean

  /** 当前选中的数据列表 */
  @PropSync('selection', { type: Array, default: () => [] })
  selectionList!: object[]

  /** 已选项部分的宽度, 默认200px */
  @Prop({ type: Number, default: 200 }) readonly selectionWidth!: number

  /** 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
  @Prop({ type: Boolean, default: false }) readonly expandOnClickNode!: boolean

  /** 禁止输入框输入 */
  @Prop({ type: Boolean }) readonly disabled!: boolean

  /** 触发弹窗显示 */
  @Prop({ type: String, default: 'focus' }) readonly trigger!: string

  /**
   * 显示选择商品弹窗
   */
  showDialog = false

  @Ref('tree') readonly treeRef!: ElTree<string, any>

  @Ref('table') readonly tableRef!: ElTable

  /** 表格最大高度 */
  get tableMaxHeight() {
    let height = parseFloat(`${this.popoverHeight}`)
    if (!this.showSelection) {
      if (this.showCancle || this.showConfirm) {
        height -= 38
      }
    }
    if (this.showTab) {
      height -= 40
    }
    return height
  }

  /** 右边已选择项滚动区域高度 */
  get rightScrollHeight() {
    if (!this.showCancle && !this.showConfirm) {
      return this.popoverHeight - 40 + 'px'
    }
    return parseInt(`${this.popoverHeight - 78}`) + 'px'
  }

  /** 树形 */
  get treeScrollHeight() {
    if (this.showTab) {
      return this.popoverHeight - 40 + 'px'
    }
    return this.popoverHeight + 'px'
  }

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
            ;(v as any).slotName = v.prop
          } else {
            ;(v as any).slotName = v.slot
          }
        }
        // 防止将slot绑定到 tableColumn上
        delete v.slot
        return v
      }) ?? []
    )
  }

  /** 删除已经选择的商品 */
  handleDeleteSelection(index: number, row: object) {
    this.$emit('delete-selection', index, row)
  }

  @Emit('tab-click')
  handleTabClick(value: string) {
    this.tabActiveValue = value
  }

  /** 表格单行点击事件 */
  @Emit('row-click')
  handleRowClick(e: unknown) {
    return e
  }

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

.tab {
  line-height: 40px;
  height: 40px;
  text-align: center;
  border-bottom: 1px solid #cdcdcd;
  box-sizing: border-box;

  & > div {
    position: relative;
    box-sizing: border-box;
    cursor: pointer;

    &.active {
      color: #3a8ee6;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #3a8ee6;
      }
    }
  }
}

.wrap-content {
  width: 0;
  flex-direction: column;
}

.right-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0%;
}

.cell {
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
      height: 10px;
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

.selection-content {
  .right-scrollbar {
    &-title {
      padding: 0 20px;
      font-size: 16px;
      line-height: 40px;
      font-weight: 700;
    }
  }

  .selection-list {
    display: flex;
    padding: 0 20px;
    line-height: 40px;

    .name {
      flex: 1;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .el-icon-circle-close {
      margin-left: 5px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
