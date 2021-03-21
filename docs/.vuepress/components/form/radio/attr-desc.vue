<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes' target='_blank' rel='noopener noreferrer'>Radio Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>RADIO</code>',
          optional: `<code>RADIO</code>`,
          type: 'string'
        },
        {
          name: 'render',
          desc: '默认显示内容',
          type: '() => (VNode | JSX.Element)'
        },
        {
          name: 'onChange',
          desc: `当绑定值变化时触发的事件，原 el-radio <code>change</code> event`,
          type: '(value) => void'
        }
      ]
    }
  }
}
</script>
