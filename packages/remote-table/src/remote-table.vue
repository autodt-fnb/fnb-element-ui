<script lang="tsx">
import { ElTree } from 'fnb-element-ui/node_modules/element-ui/types/tree'
import { FnbTableColumn } from 'fnb-element-ui/types/table'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import Table from '~/table'
import TableHeader from './table-header.vue'
import { sortList } from './utils'

@Component({
  name: 'FnbRemoteTable',
  components: { [Table.options.name]: Table, TableHeader },
  inheritAttrs: false
})
export default class RemoteTable extends Vue {
  /** 请求的api方法 */
  @Prop({ required: true, type: Function })
  readonly fetchApi!: (...arg: any[]) => Promise<any>

  /** 请求的参数 */
  @Prop({ type: Object, default: () => {} }) readonly params!: Record<
    string,
    any
  >

  /** 后端需要的分页参数名称 */
  @Prop({
    type: Object,
    default: () => ({ pageSize: 'pageSize', pageNum: 'pageNum' })
  })
  readonly pageProp!: { pageSize: string; pageNum: string }

  /** 后端返回的参数名称 */
  @Prop({
    type: Object,
    default: () => ({ total: 'total', records: 'records' })
  })
  readonly dataProp!: { total: string; records: string }

  /** 自定义存储排序 localStorage key值 */
  @Prop(String) storageSortKey!: string

  /** 页面加载中 */
  listLoading = false

  pageNum = 1

  pageSize = 10

  /**
   * 列表数据
   */
  list = []

  /** 数据总数 */
  total = 0

  /** 已选中的key值 */
  checkedKeys: string[] = []

  /** 排序key值 */
  sortKeys: string[] = []

  get tableList() {
    return sortList(
      ((this.$attrs as any).table as FnbTableColumn[]).map(v => ({
        ...v,
        hidden: v.prop ? !this.checkedKeys.includes(v.prop) : false
      })),
      this.sortKeys
    )
  }

  @Ref('dropdownTree') readonly dropdownTreeRef!: ElTree<any, any>

  @Ref('table') readonly tableRef!: any

  @Watch('params')
  watchParams() {
    this.pageNum = 1
    this.getList()
  }

  created() {
    this.getList()
  }

  async getList() {
    try {
      this.listLoading = true
      const { data, total } = await this.fetchApi({
        [this.pageProp.pageSize]: this.pageSize,
        [this.pageProp.pageNum]: this.pageNum,
        ...this.params
      })
      this.list =
        (this.dataProp.records ? data[this.dataProp.records] : data) ?? []
      this.total =
        (this.dataProp.total ? data[this.dataProp.total] : total) ?? 0
    } catch (error) {
      console.log(error)
    } finally {
      this.listLoading = false
    }
  }

  render() {
    return (
      <fnb-table
        autoMaxHeight
        currentPage={this.pageNum}
        data={this.list}
        pageSize={this.pageSize}
        paginationLayout="sizes, prev, pager, next, jumper"
        ref="table"
        v-loading={this.listLoading}
        {...{
          attrs: { ...this.$attrs },
          on: {
            'update:currentPage': (val: number) => (this.pageNum = val),
            'update:pageSize': (val: number) => (this.pageSize = val),
            'size-change': this.getList,
            'current-change': this.getList,
            ...this.$listeners
          }
        }}
        scopedSlots={{
          ...this.$scopedSlots
        }}
        table={this.tableList}
        total={this.total}
      >
        <TableHeader
          checkedKeys={this.checkedKeys}
          {...{
            on: {
              'update:checkedKeys': (val: string[]) => {
                this.checkedKeys = val
              },
              'update:sortKeys': (val: string[]) => {
                this.sortKeys = val
              }
            }
          }}
          slot="TABLE_CARD_HEADER"
          sortKeys={this.sortKeys}
          storageSortKey={this.storageSortKey}
          table={(this.$attrs as any).table ?? []}
          total={this.total}
        />
      </fnb-table>
    )
  }
}
</script>

<style lang="scss" scoped></style>
