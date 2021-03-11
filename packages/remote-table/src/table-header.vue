<script lang="tsx">
import {
  Component,
  Prop,
  PropSync,
  Ref,
  Vue,
  Watch
} from 'vue-property-decorator'
import {
  ElTree,
  TreeNode as ElTreeNode
} from 'fnb-element-ui/node_modules/element-ui/types/tree'
import { FnbTableColumn } from 'fnb-element-ui/types/table'
import { sortList } from './utils'

type Tree = ElTree<string, FnbTableColumn>
type TreeNode = ElTreeNode<string, FnbTableColumn>

@Component({ name: 'FnbTableHeader' })
export default class TableHeadera extends Vue {
  @Prop(Number) readonly total!: number
  @Prop(Array) readonly table!: FnbTableColumn[]
  @Prop(String) readonly storageSortKey!: string
  /** 已选择项的个数 */
  @Prop(Number) readonly selectionSize!: number

  @PropSync('sortKeys', Array) sortKeysComputed!: string[]

  @PropSync('checkedKeys', Array) checkedKeysComputed!: string[]

  get sortClomunKey() {
    return this.storageSortKey ?? `sort-clomun-${(this as any).$route.name}`
  }

  get defaultCheckedKeys() {
    return this.table?.filter(v => !v.hidden && !v.type).map(v => v.prop!)
  }

  get treeList() {
    return sortList(
      this.table?.filter(v => !v.hidden && !v.type) ?? [],
      this.sortKeysComputed
    )
  }

  /** 是否有选择项 */
  get hasSelection() {
    return this.table.findIndex(v => v.type === 'selection') >= 0
  }

  @Ref('dropdownTree') readonly dropdownTreeRef!: Tree

  allChecked = false

  indeterminate = false

  @Watch('checkedKeysComputed')
  watchcheckedKeysComputed() {
    this.$nextTick().then(() => {
      if (this.checkedKeysComputed.length === 0) {
        this.allChecked = false
        this.indeterminate = false
      } else if (
        this.checkedKeysComputed.length === this.sortKeysComputed.length
      ) {
        this.allChecked = true
        this.indeterminate = false
      } else {
        this.allChecked = false
        this.indeterminate = true
      }
    })
  }

  created() {
    const keys = JSON.parse(localStorage.getItem(this.sortClomunKey) ?? '[]')
    const getKeys = [...(keys.length === 0 ? this.defaultCheckedKeys : keys)]
    this.checkedKeysComputed = getKeys
    this.sortKeysComputed = getKeys
    console.log(this.$scopedSlots)
  }

  handleCheckChange() {
    this.checkedKeysComputed = this.dropdownTreeRef?.getCheckedKeys() ?? []
  }

  async handleAllChange(val: boolean) {
    try {
      this.sortKeysComputed.forEach(key => {
        this.dropdownTreeRef.setChecked(key, val, false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  /** 节点拖拽完成 */
  handleTreeNodeDrop(draggingNode: TreeNode, dropNode: TreeNode) {
    console.log(6666, this.sortKeysComputed)
    this.dropdownTreeRef?.setChecked(
      draggingNode.data.prop!,
      draggingNode.checked,
      false
    )
    const keys = [...this.sortKeysComputed]
    const fIndex = keys.findIndex(v => v === draggingNode.data.prop)
    const sIndex = keys.findIndex(v => v === dropNode.data.prop)
    ;[keys[fIndex], keys[sIndex]] = [keys[sIndex], keys[fIndex]]

    this.sortKeysComputed = keys

    localStorage.setItem(
      this.sortClomunKey,
      JSON.stringify(this.sortKeysComputed)
    )
  }

  handleClearSelection() {
    ;(this.$parent as any).tableRef.clearSelection()
    this.$emit('clear-selection')
  }

  render() {
    return (
      <el-row
        align="center"
        class="card-header"
        justify="space-between"
        type="flex"
      >
        <el-alert show-icon closable={false} type="info">
          <div slot="title">
            <span>
              总共 <i class="total">{this.total}</i> 条数据
            </span>
            {this.hasSelection && (
              <span>
                ，已选择 <i class="total">{this.selectionSize}</i> 项
                {this.selectionSize > 0 && (
                  <el-button
                    class="clear-btn"
                    size="small"
                    type="text"
                    onClick={this.handleClearSelection}
                  >
                    清空
                  </el-button>
                )}
              </span>
            )}
          </div>
        </el-alert>
        <el-row align="center" type="flex">
          {this.$scopedSlots.headerActions?.(null)}
          <el-dropdown style={{ marginLeft: '10px' }} trigger="click">
            <el-button icon="el-icon-s-operation" type="text">
              列筛选排序
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <div class="dropdown-checkbox">
                <el-checkbox
                  checked={this.allChecked}
                  indeterminate={this.indeterminate}
                  value={this.allChecked}
                  onChange={this.handleAllChange}
                >
                  全/反选
                </el-checkbox>
              </div>
              <el-tree
                check-on-click-node
                default-expand-all
                draggable
                show-checkbox
                allow-drop={(_1: any, _2: any, type: string) =>
                  type !== 'inner'
                }
                class="dropdown-tree"
                data={this.treeList}
                defaultCheckedKeys={this.defaultCheckedKeys}
                indent={10}
                nodeKey="prop"
                on-check-change={this.handleCheckChange}
                on-node-drop={this.handleTreeNodeDrop}
                ref="dropdownTree"
              />
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-row>
    )
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  padding: 6px 10px;
  justify-content: space-between;
}

.el-alert--info.is-light {
  width: auto;
  margin-right: 15px;
  padding: 6px 10px;
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;

  ::v-deep {
    .el-alert__title {
      font-size: 12px;

      .total {
        font-weight: 600;
        font-size: 13px;
        color: #409eff;
      }
    }

    .el-alert__icon {
      color: #409eff;
    }
    .el-alert__content {
      padding-right: 0;
    }
  }
}

.clear-btn {
  padding: 0;
  margin-left: 7px;
}

.dropdown-checkbox {
  display: flex;
  align-items: center;
  margin: 0 24px 0 12px;
  height: 26px;
}

.dropdown-tree {
  padding-right: 24px;
}
</style>
