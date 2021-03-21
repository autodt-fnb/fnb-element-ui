<template>
  <div>
    <common-attribute
      title="Table Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-attributes' target='_blank' rel='noopener noreferrer'>Table Attributes</a> 全部可用，这里列举新添加字段`"
      type="attr"
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Table Events"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-events' target='_blank' rel='noopener noreferrer'>Table Events</a> 全部可用（ <code>current-change</code>改名为 <code>current-row-change</code>，为兼容分页的 <code>current-change</code> ），这里列举新添加的事件`"
      type="event"
      :data="eventsDate"
    ></common-attribute>

    <common-attribute
      title="Table Methods"
      :data="methodsData"
      type="methods"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-methods' target='_blank' rel='noopener noreferrer'>Table Methods</a> 全部可用。`"
    ></common-attribute>

    <common-attribute
      title="Table Slot"
      type="slot"
      :data="slotData"
    ></common-attribute>

    <common-attribute
      title="Table Column Attributes"
      :description="`<a href='#Attributes'>Attributes</a> <code>table</code> 字段的属性， element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes' target='_blank' rel='noopener noreferrer'>Table-column Attributes</a> 全部可用，这里列举新添加字段`"
      type="attr"
      :data="tableAttrData"
    ></common-attribute>

    <common-attribute
      title="Table Column Slot"
      type="slot"
      :data="cloumnSlotdata"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData,
      tableAttrData,
      eventsDate,
      slotData,
      cloumnSlotdata,
      methodsData
    }
  },
  methods: {}
}
/** 总的attr */
const attrData = [
  {
    name: 'table',
    desc: `表格 Column Attributes，具体看下方 <a href="#Table Column Attributes">Table Column Attributes</a>`,
    type: 'array'
  },
  {
    name: 'show-table-top',
    desc: '是否显示表格顶部 统计 和 列筛选排序',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'fetch-api',
    desc: '需要请求数据api方法',
    type: 'function'
  },
  {
    name: 'fetch-params',
    desc: 'fetch-api请求的参数',
    type: 'object'
  },
  {
    name: 'page-prop',
    desc: `自定义fetch-api需要的分页参数名称，如api参数是<code>size</code>表示每页多少条数据，<code表示每页多少条数据，>num</code表示每页多少条数据，>表示页码，则可这么写 <code>{ pageSize: 'size', pageNum: 'num' }</code>`,
    type: 'object',
    default: `<code>{ pageSize: 'pageSize', pageNum: 'pageNum' }</code>`
  },
  {
    name: 'data-prop',
    desc: `自定义fetch-api返回结果的参数名，一般后端分页接口会在data里面返回 <code>records</code> 列表数据，<code>total</code> 数据总数。如果data直接返回列表数据（一个数组），则直接使用data里面的数据作为列表数据，data的长度作为total。`,
    type: 'object',
    default: `<code>{ records: 'records', total: 'total' }</code>`
  },
  {
    name: 'storageSortKey',
    desc:
      '自定义排序存储indexedDB key值，默认使用路由name（当一个路由有多个table时，必须自定义定义一个唯一的key值）',
    type: 'string'
  },
  {
    name: 'show-pagination',
    desc: '是否显示分页',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'page-size',
    desc: '每页显示条目个数，支持 <code>.sync</code> 修饰符',
    type: 'number',
    default: '10'
  },
  {
    name: 'total',
    desc: '总条目数',
    type: 'number'
  },
  {
    name: 'current-page',
    desc: '当前页数，支持 .sync 修饰符',
    type: 'number',
    default: '1'
  },
  {
    name: 'auto-max-height',
    desc: '是否设置表格最大高度为，当前视图剩余高度，表格一屏显示',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'no-card',
    desc: '是否显示外层阴影样式',
    type: 'boolean',
    default: 'true'
  }
]

const eventsDate = [
  {
    name: 'current-row-change',
    desc:
      '与 element-ui 的 Table <code>current-change</code> 事件效果完全一致，为了与分页的 current-change 事件名不冲突，名称改变',
    params: 'currentRow, oldCurrentRow'
  },
  {
    name: 'size-change',
    desc: 'pageSize 改变时会触发',
    params: '每页条数'
  },
  {
    name: 'current-change',
    desc: 'currentPage 改变时会触发',
    params: '当前页'
  }
]

/** table Attributes data */
const tableAttrData = [
  {
    name: 'render',
    desc:
      'render 函数（使用箭头函数，不然会报 h 错误），自定义列的内容，参数为 { row, column, index }，返回一个 JSX | VNode | number | string',
    type: 'function'
  },
  {
    name: 'slot',
    desc:
      '该列是否是slot插槽（自定义列的内容，参数为 { row, column, index }），插槽名 <code>name</code> 是 <code>slot</code> 字段值（当 <code>slot</code> 不为 <code>true</code>  时）或者 <code>prop</code> 字段值',
    type: 'boolean | string',
    default: 'false'
  },
  {
    name: 'hidden',
    desc: '该列是否隐藏',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'table',
    desc: '多级表头，值与 Table Attributes table字段值一样',
    type: 'array'
  }
]

/** slot */
const slotData = [
  {
    name: 'headerActions',
    desc: '表格顶部添加操作按钮'
  },
  {
    name: 'append',
    desc:
      '插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。'
  },
  {
    name: 'paginationAppend',
    desc: '插入至分页组件同一行，右侧内容'
  }
]

const methodsData = [
  {
    name: 'updateMaxHeight',
    desc:
      '更新表格的最大高度，当表格顶部区域的高度变化时，需要同步调整表格的最大高度，可以调用此方法，需要 <code>auto-max-height</code> 参数为 <code>true</code>'
  },
  {
    name: 'getList',
    desc: `调用 <code>fetch-api</code> 接口，参数不变，重新请求。`
  }
]

const cloumnSlotdata = [
  {
    name: '[prop]Header',
    desc:
      '自定义表头的内容. 参数为 { column, index }， 有 <code>prop</code> 值和 <code>Header</code> 单词组成，如 <code>prop: name</code>, 则slot名称为 <code>nameHeader</code> '
  }
]
</script>

<style lang="scss" scoped></style>
