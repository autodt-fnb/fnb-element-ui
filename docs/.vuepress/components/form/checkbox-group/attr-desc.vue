<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes' target='_blank' rel='noopener noreferrer'>Checkbox-group Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
      type="attr"
      :data="attrData"
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
          desc: '表单类型，固定填写 <code>CHECKBOX_GROUP</code>',
          optional: `<code>CHECKBOX_GROUP</code>`,
          type: 'string'
        },
        {
          name: 'isCheckboxButton',
          desc: '是否按钮样式',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'outputType',
          desc: '输出的值是逗号分割的字符串，还是保持数组形式',
          type: 'string',
          optional: `<code>string</code> <code>array</code>`,
          default: 'array'
        },
        {
          name: 'outputSeparator',
          desc:
            '当 <code>outputType="string"</code>，可自定义转换成字符串的分割符（默认是逗号）',
          type: 'string',
          default: '<code>,</code>'
        },
        {
          name: 'key',
          desc: `循环列表的key值，类似el-table组件的 <code>row-key</code>`,
          type: 'string'
        },
        {
          name: 'checkboxList',
          desc: `checkbox 列表，属性 参考<a href="/fnb-element-ui/component/form/checkbox.html#Attributes" targrt="_blank">CHECKBOX Attributes</a>`,
          type: 'array'
        },
        {
          name: 'onChange',
          desc: `当绑定值变化时触发的事件，原 el-checkbox <code>change</code> event`,
          type: '(value) => void'
        }
      ]
    }
  }
}
</script>
