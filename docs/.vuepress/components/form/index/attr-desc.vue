<template>
  <div>
    <common-attribute
      title="Form Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/form#form-attributes' target='_blank' rel='noopener noreferrer'>Form Attributes</a> 全部可用(注意 model 字段使用 value 代替)，这里列举新添加字段，`"
      type="attr"
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Table Methods"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/form#form-methods' target='_blank' rel='noopener noreferrer'>Form Methods</a> 全部可用。`"
    ></common-attribute>

    <common-attribute
      title="Form Item Attributes"
      :description="`自定义 form item 的属性`"
      type="attr"
      :data="formItemAttrData"
    ></common-attribute>

    <common-attribute
      title="Form Item listItems props"
      :description="`listItems 通用的属性，不同的表单组件用 <code>formType</code> 字段区分，每个表单都有自己独立的属性，所以formType 字段是必填`"
      type="attr"
      :data="listItemsAttrData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData,
      formItemAttrData,
      listItemsAttrData
    }
  }
}
/** 总的attr */
const attrData = [
  {
    name: 'value/v-model',
    desc: '表单数据对象',
    type: 'object'
  },
  {
    name: 'cols',
    desc: '显示的列数，数字类型需要是 24 的约数；数组类型 数字不能大于24',
    type: 'number | number[]',
    default: '1'
  },
  {
    name: 'offset',
    desc: '每一列数偏移',
    type: 'number',
    default: '0'
  },
  {
    name: 'gutter',
    desc: '每列的间隔 单位px',
    type: 'number',
    default: '10'
  }
]

/** table Attributes data */
const formItemAttrData = [
  {
    name: 'listItems',
    desc: 'form item 表单列表，可看下面 listItems 可选值',
    type: 'array'
  }
]

const listItemsAttrData = [
  {
    name: 'formType',
    desc:
      '表单类型，可用 <code>FormItemType</code> 枚举表示，不同字段表示的组件可看子菜单',
    type: 'string',
    optional: `<code>RENDER_FORM_CONTENT</code> <code>INPUT</code> <code>AMOUNT_INPUT</code> <code>INPUT_NUMBER</code> <code>AUTOCOMPLETE</code> <code>SELECT</code> <code>DATE_PICKER</code> <code>TIME_PICKER</code> <code>TIME_SELECT</code> <code>SWITCH</code> <code>CHECKBOX</code> <code>CHECKBOX_GROUP</code> <code>RADIO</code> <code>RADIO_GROUP</code> <code>CASCADER</code> <code>UPLOAD</code>`
  },
  {
    name: 'prop',
    desc:
      '表单域 value/v-model 字段，如想自定义表单数据对象字段名，可用 field 属性，在使用 validate、resetFields 方法的情况下，该属性是必填的',
    type: 'string'
  },
  {
    name: 'field',
    desc: '表单域 value/v-model 字段，如字段值与 prop 相同，可不填',
    type: 'string'
  },
  {
    name: 'itemLabel',
    desc: '原 el-form-item 的 label 属性',
    type: 'string'
  },
  {
    name: 'itemLabelWidth',
    desc: '原 el-form-item 的 label-width 属性',
    type: 'string'
  },
  {
    name: 'itemSize',
    desc: '原 el-form-item 的 size 属性',
    type: 'string'
  },
  {
    name: 'itemLabelDesc',
    desc: 'label 下面的描述文字',
    type: 'string'
  },
  {
    name: 'required',
    desc:
      '是否必填，如不设置，则会根据校验规则自动生成，设置此属性后，可不在rules中填写 required 规则，校验时也会校验必填。',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'rules',
    desc: '表单验证规则',
    type: 'object'
  },
  {
    name: 'error',
    desc:
      '表单域验证错误信息, 设置该值会使表单验证状态变为<code>error</code>，并显示该错误信息',
    type: 'string'
  },
  {
    name: 'showMessage',
    desc: '是否显示校验错误信息',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'inlineMessage',
    desc: '以行内形式展示校验信息',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'renderItemLabel',
    desc: '原 el-form-item 的 slot label',
    type: 'JSX | VNode'
  },
  {
    name: 'renderItemError',
    desc: '原 el-form-item 的 slot error',
    type: 'JSX | VNode'
  },
  {
    name: 'hidden',
    desc: '是否隐藏，效果同 <code>v-if</code>',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'invisible',
    desc: '是否不可见，效果同 <code>v-show</code>',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'colSpan',
    desc:
      '自定义当前栅格占据的列数，不设置，默认由Form组件中 <code>clos</code> 属性定义',
    type: 'number'
  },
  {
    name: 'colOffset',
    desc:
      '自定义当前栅格左侧的间隔格数，不设置，默认由Form组件中 <code>offset</code> 属性定义',
    type: 'number'
  },
  {
    name: 'colPush',
    desc: '自定义当前栅格向右移动格数',
    type: 'number'
  },
  {
    name: 'colPull',
    desc: '自定义当前栅格向左移动格数',
    type: 'number'
  },
  {
    name: 'clearfix',
    desc: '清除浮动，使当前 form-item 在下一行显示',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'class',
    desc: '自定义样式类名',
    type: 'string | object | array'
  },
  {
    name: 'style',
    desc: '自定义样式',
    type: 'string | object | array'
  }
]
</script>
