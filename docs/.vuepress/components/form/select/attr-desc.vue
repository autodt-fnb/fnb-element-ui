<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/select#select-attributes' target='_blank' rel='noopener noreferrer'>Select Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
      type="attr"
      :data="attrData"
    ></common-attribute>
    <common-attribute
      title="optionList Props"
      type="attr"
      :data="attrOptionListData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'formType',
          desc: '表单类型，固定填写 <code>SELECT</code>',
          optional: `<code>SELECT</code>`,
          type: 'string'
        },
        {
          name: 'collapseTags',
          desc: '多选时是否将选中值按文字的形式展示',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'optionList',
          desc: 'el-option 列表，具体参数看下方 optionList Porps',
          type: 'array'
        },
        {
          name: 'outputType',
          desc:
            '当多选时，输出的值是逗号（<i>可用<code>outputSeparator</code>属性自定义分割符</i>）分割的字符串，还是保持数组形式',
          optional: '<code>string</code> <code>array</code>',
          type: 'string',
          default: 'array'
        },
        {
          name: 'outputSeparator',
          desc:
            '当 <code>outputType="string"</code> 时，可自定义数组转换成字符串的分割符',
          type: 'string',
          default: '<code>,</code>'
        },
        {
          name: 'onChange',
          desc: `选中值发生变化时触发, 原 el-select <code>change</code> event`,
          type: '(value: string | number | object) => void'
        },
        {
          name: 'onVisibleChange',
          desc: `下拉框出现/隐藏时触发, 原 el-select <code>visible-change</code> event`,
          type: '(e: boolean) => void'
        },
        {
          name: 'onRemoveTag',
          desc: `多选模式下移除tag时触发, 原 el-select <code>remove-tag</code> event`,
          type: '(item: any) => void'
        },
        {
          name: 'onClear',
          desc: `可清空的单选模式下用户点击清空按钮时触发, 原 el-select <code>clear</code> event`,
          type: '() => void'
        },
        {
          name: 'onBlur',
          desc: `当 input 失去焦点时触发, 原 el-select <code>blur</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onFocus',
          desc: `当 input 获得焦点时触发, 原 el-select <code>focus</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'renderPrefix',
          desc: `Select 组件头部内容，原 el-select <code>prefix</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderEmpty',
          desc: `无选项时的列表，原 el-select <code>empty</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        }
      ],
      attrOptionListData: [
        {
          name: 'value',
          desc: '选项的值，同 el-option 的 <code>value</code> 值',
          type: 'string/number/object'
        },
        {
          name: 'label',
          desc:
            '选项的标签，若不设置则默认与 value 相同，同 el-option 的 <code>label</code> 值',
          type: 'string/number'
        },
        {
          name: 'disabled',
          desc: '是否禁用该选项，同 el-option 的 <code>disabled</code> 值',
          type: 'boolean',
          default: 'false'
        }
      ]
    }
  }
}
</script>
