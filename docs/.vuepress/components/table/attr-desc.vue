<template>
  <div>
    <common-attribute
      title="Table Attributes"
      :description="
        `element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-attributes' target='_blank' rel='noopener noreferrer'>Table Attributes</a> 全部可用，这里列举新添加字段`
      "
      type="attr"
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Table Events"
      :description="
        `element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-events' target='_blank' rel='noopener noreferrer'>Table Events</a> 全部可用（ <code>current-change</code>改名为 <code>current-row-change</code>，为兼容分页的 <code>current-change</code> ），这里列举新添加的事件`
      "
      type="event"
      :data="eventsDate"
    ></common-attribute>

    <common-attribute
      title="Table Methods"
      :description="
        `element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-methods' target='_blank' rel='noopener noreferrer'>Table Methods</a> 全部可用。`
      "
    ></common-attribute>

    <common-attribute
      title="Slot"
      type="slot"
      :data="slotData"
    ></common-attribute>

    <common-attribute
      title="Table Column Attributes"
      :description="
        `<a href='#Attributes'>Attributes</a> <code>table</code> 字段的属性， element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes' target='_blank' rel='noopener noreferrer'>Table-column Attributes</a> 全部可用，这里列举新添加字段`
      "
      type="attr"
      :data="tableAttrData"
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
      slotData
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
    name: 'append',
    desc:
      '插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。'
  },
  {
    name: 'paginationAppend',
    desc: '插入至分页组件同一行，右侧内容'
  }
]
</script>

<style lang="scss" scoped></style>
