<template>
  <ElPopover
    placement="bottom-start"
    trigger="manual"
    popper-class="select-goods__wrap"
    :width="popoverWidth"
    v-model="showDialog"
    ref="elPopover"
  >
    <div class="flex" :style="{ height: `${popoverHeight}px` }">
      <ElScrollbar
        v-loading="treeLoading"
        v-show="!value"
        class="scrollbar-height tree"
      >
        <ElTree
          highlight-current
          :expand-on-click-node="false"
          :node-key="nodeKey"
          :data="categoryList"
          :props="treeProps"
          @node-click="categoryTreeClick"
          ref="tree"
        />
      </ElScrollbar>
      <div class="line" v-show="!value" />
      <div class="right-content">
        <div class="table-wrap" v-loading="tableLoading">
          <ElTable
            class="table"
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
    </div>
    <template slot="reference">
      <ElInput
        @click.native="handleClickInput"
        :value="value"
        @input="$emit('input', $event)"
        @clear="$emit('input-clear')"
        clearable
        :placeholder="placeholder"
      />
    </template>
  </ElPopover>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator'
import { FnbTableColumn } from '../../../types/table'

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
  @Prop({ default: true, type: Boolean }) readonly showCancle!: boolean

  /** 是否显示确认按钮 */
  @Prop({ default: true, type: Boolean }) readonly showConfirm!: boolean

  /**
   * 显示选择商品弹窗
   */
  showDialog = false

  /** 选中数据列表 */
  selectionList: object[] = []

  isCreated = false

  /** 表格最大高度 */
  get tableMaxHeight() {
    if (!this.showCancle && !this.showConfirm) {
      return this.popoverHeight
    }
    return parseInt(`${this.popoverHeight - 38}`)
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

  // 组件销毁的时候移除监听
  destroyed() {
    document.removeEventListener('click', this.clickListener)
  }

  /** 处理点击input框 */
  handleClickInput() {
    if (!this.showDialog) {
      document.addEventListener('click', this.clickListener)
    }
    this.showDialog = true
  }

  /** 点击关闭弹窗事件监听 */
  clickListener(e: any) {
    if (!this.showDialog) {
      return
    }
    const { target, path }: { path?: HTMLElement[]; target: HTMLElement } = e
    // 点击输入框不关闭弹窗

    let nodeId: string | undefined = undefined
    let referenceNode: HTMLElement | undefined = undefined

    if (path) {
      referenceNode = path.find(v =>
        v.className?.includes('el-popover__reference')
      )
    } else if (
      target?.className.includes('el-input__inner') &&
      target?.parentElement?.className.includes('el-popover__reference')
    ) {
      referenceNode = target.parentElement
    }

    nodeId = referenceNode?.attributes.getNamedItem('aria-describedby')?.value

    if (this.$refs.elPopover) {
      this.showDialog = nodeId === (this.$refs.elPopover as any).tooltipId
      if (!this.showDialog) {
        document.removeEventListener('click', this.clickListener)
      }
    }
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
</style>
