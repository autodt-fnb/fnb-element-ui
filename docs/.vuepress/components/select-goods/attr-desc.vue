<template>
  <div>
    <common-attribute
      title="Attributes"
      type="attr"
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Events"
      type="event"
      :data="eventsDate"
    ></common-attribute>

    <common-attribute
      title="Table Slot"
      type="slot"
      :data="slotData"
    ></common-attribute>

    <common-attribute
      title="Table Attributes"
      :description="
        `<a href='#Attributes'>Attributes</a> <code>table</code> 字段的属性， element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes' target='_blank' rel='noopener noreferrer'>Table-column Attributes</a> 全部可用，这里列举新添加字段`
      "
      type="attr"
      :data="tableAttrData"
    ></common-attribute>

    <common-attribute
      title="TreeProps Attributes"
      :description="
        `<a href='#Attributes'>Attributes</a> <code>tree-props</code> 字段的属性`
      "
      type="attr"
      :data="treePropsData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      attrData,
      tableAttrData,
      eventsDate,
      slotData,
      treePropsData
    }
  },
  methods: {}
}
/** 总的attr */
const attrData = [
  {
    name: 'v-model/value',
    desc: '输入框的值',
    type: 'string'
  },
  {
    name: 'table',
    desc: `表格Attributes，具体看下方 <a href="#Table Attributes">Table Attributes</a>`,
    type: 'array'
  },
  {
    name: 'table-data',
    desc: '显示的数据',
    type: 'array'
  },
  {
    name: 'row-key',
    desc: `行数据的<code>Key</code>，用来优化<code>Table</code>的渲染；在使用 <code>reserve-selection</code> 功能与显示树形数据时，该属性是必填的。类型为<code>String</code>时，支持多层访问：<code>user.info.id</code>，但不支持<code>user.info[0].id</code>，此种情况请使用<code>Function</code>  。`,
    type: 'Function(row)/String'
  },
  {
    name: 'placeholder',
    desc: '输入框占位文本',
    type: 'string',
    default: '请输入'
  },
  {
    name: 'tree-loading',
    desc: '树形控件数据正在加载中',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'table-loading',
    desc: '表格数据正在加载中',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'category-list',
    desc: '树形控件数据（商品分类）',
    type: 'array'
  },
  {
    name: 'tree-props',
    desc:
      '树形控件配置项，具体看下方 <a href="#TreeProps Attributes">TreeProps Attributes</a>',
    type: 'object'
  },
  {
    name: 'node-key',
    desc: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
    type: 'string'
  },
  {
    name: 'popover-width',
    desc: '弹窗宽度',
    type: 'number',
    default: '700'
  },
  {
    name: 'popover-height',
    desc: '弹窗高度',
    type: 'number',
    default: '300'
  },
  {
    name: 'show-cancle',
    desc: '是否显示取消按钮',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'show-confirm',
    desc: '是否显示确认按钮',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'show-tab',
    desc: '是否显示顶部tab栏',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'tab-list',
    desc: '顶部tab栏显示数据',
    type: '{value: string; label: string}[]',
    default: '[]'
  },
  {
    name: 'tab-active',
    desc: '顶部tab栏当前选中，支持 sync',
    type: 'string'
  },
  {
    name: 'show-selection',
    desc: '是否显示右边已选择项, 列表中要有 name 字段，name字段显示每一行',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'selection',
    desc: '已选择项列表',
    type: '{name: string}[] (至少有个name字段)',
    default: '[]'
  },
  {
    name: 'selection-width',
    desc: '已选择项区域宽度',
    type: 'number',
    default: '200'
  }
]

const eventsDate = [
  {
    name: 'input',
    desc: '在 Input 值改变时触发',
    params: '(value: string)'
  },
  {
    name: 'input-clear',
    desc: '在点击 Input 清空按钮时触发'
  },
  {
    name: 'row-click',
    desc: '当表格某一行被点击时会触发该事件',
    params: 'row, column, event'
  },
  {
    name: 'selection-change',
    desc: '当表格选择项发生变化时会触发该事件',
    params: 'selection'
  },
  {
    name: 'tree-click',
    desc: '点击树状节点时会触发该事件',
    params: 'selection'
  },
  {
    name: 'cancle',
    desc: '点击取消按钮时会触发该事件'
  },
  {
    name: 'confirm',
    desc: '点击确认按钮时会触发该事件',
    params: 'selection'
  },
  {
    name: 'tab-click',
    desc: '点击 tab 栏触发该事件',
    params: 'value'
  },
  {
    name: 'delete-selection',
    desc: '点击已选择项 删除 触发该事件',
    params: '(index: number, row: object)'
  }
]

/** table Attributes data */
const tableAttrData = [
  {
    name: 'slot',
    desc:
      '该列是否是slot插槽（自定义列的内容，参数为 { row, column, index }），是的话插槽名 <code>name</code> 是 <code>slot</code> 字段值（当 <code>slot</code> 不为 <code>true</code>  时）或者 <code>prop</code> 字段值',
    type: 'boolean | string',
    default: 'false'
  }
]

/** slot */
const slotData = [
  {
    name: 'append',
    desc:
      '插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。'
  }
]

/** 树形控件 配置选项  */
const treePropsData = [
  {
    name: 'label',
    desc: '指定节点标签为节点对象的某个属性值',
    type: 'string, function(data, node)'
  },
  {
    name: 'children',
    desc: '指定子树为节点对象的某个属性值',
    type: 'string'
  },
  {
    name: 'disabled',
    desc: '指定节点选择框是否禁用为节点对象的某个属性值',
    type: 'boolean, function(data, node)'
  }
]
</script>

<style lang="scss" scoped></style>
