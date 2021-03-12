import {
  computed,
  defineComponent,
  PropType,
  reactive,
  watch
} from '@vue/composition-api'
import { FnbTableColumn } from '@autodt/fnb-element-ui/types/table'
import { sortList } from './utils'

// import styles from './src.module.scss'
// import classNames from 'classnames/bind'
// const cn = classNames.bind(styles)

const RemoteTable = defineComponent({
  name: 'FnbRemoteTable',
  props: {
    fetchApi: {
      required: true,
      type: Function as PropType<(...arg: any[]) => Promise<any>>
    },
    params: {
      type: Object as PropType<Record<string, any>>,
      default: () => {}
    },
    pageProp: {
      type: Object as PropType<{ pageSize: string; pageNum: string }>,
      default: () => ({ pageSize: 'pageSize', pageNum: 'pageNum' })
    },
    dataProp: {
      type: Object as PropType<{ total: string; records: string }>,
      default: () => ({ total: 'total', records: 'records' })
    },
    storageSortKey: String
  },
  setup(props, { attrs, slots }) {
    console.log(props)
    const state = reactive({
      listLoading: false,
      pageNum: 1,
      pageSize: 10,
      /**
       * 列表数据
       */
      list: [],
      /** 数据总数 */
      total: 0,
      /** 已选中的key值 */
      checkedKeys: [] as string[],
      /** 排序key值 */
      sortKeys: [] as string[]
    })

    const tableList = computed(() =>
      sortList(
        ((attrs as any).table as FnbTableColumn[]).map(v => ({
          ...v,
          hidden: v.prop ? !state.checkedKeys.includes(v.prop) : false
        })),
        state.sortKeys
      )
    )

    const getList = async () => {
      try {
        state.listLoading = true
        const { data, total } = await props.fetchApi({
          [props.pageProp!.pageSize]: state.pageSize,
          [props.pageProp!.pageNum]: state.pageNum,
          ...props.params
        })
        state.list =
          (props.dataProp!.records ? data[props.dataProp!.records] : data) ?? []
        state.total =
          (props.dataProp!.total ? data[props.dataProp!.total] : total) ?? 0
      } catch (error) {
        console.log(error)
      } finally {
        state.listLoading = false
      }
    }

    watch(
      () => props.params,
      () => {
        state.pageNum = 1
        getList()
      },
      { deep: true, immediate: true }
    )

    return () => (
      <fnb-table
        autoMaxHeight
        currentPage={state.pageNum}
        data={state.list}
        on-current-change={getList}
        on-size-change={getList}
        pageSize={state.pageSize}
        paginationLayout="sizes, prev, pager, next, jumper"
        {...{
          on: {
            'update:currentPage': (val: number) => (state.pageNum = val),
            'update:pageSize': (val: number) => (state.pageNum = val)
          }
        }}
        {...attrs}
        ref="tableRef"
        scopedSlots={{
          TABLE_CARD_HEADER: () => {
            return (
              <table-header
                checkedKeys={state.checkedKeys}
                {...{
                  on: {
                    'update:checkedKeys': (val: string[]) =>
                      (state.checkedKeys = val),
                    'update:sortKeys': (val: string[]) => (state.sortKeys = val)
                  }
                }}
                slot="TABLE_CARD_HEADER"
                sortKeys={state.sortKeys}
                storageSortKey={props.storageSortKey}
                table={(attrs as any).table ?? []}
                total={state.total}
              />
            )
          },
          ...slots
        }}
        table={tableList.value}
        total={state.total}
        v-loading={state.listLoading}
      />
    )
  }
})

export default RemoteTable
