<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes' target='_blank' rel='noopener noreferrer'>Radio-group Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>RADIO_GROUP</code>',
          optional: `<code>RADIO_GROUP</code>`,
          type: 'string'
        },
        {
          name: 'isRadioButton',
          desc: '是否按钮样式',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'key',
          desc: `循环列表的key值，类似el-table组件的 <code>row-key</code>`,
          type: 'string'
        },
        {
          name: 'radioList',
          desc: `radio 列表，属性 参考<a href="/fnb-element-ui/component/form/radio.html#Attributes" targrt="_blank">RADIO Attributes</a>`,
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
