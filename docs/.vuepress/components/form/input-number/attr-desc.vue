<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/input-number#attributes' target='_blank' rel='noopener noreferrer'>InputNumber Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>INPUT_NUMBER</code>',
          optional: `<code>INPUT_NUMBER</code>`,
          type: 'string'
        },
        {
          name: 'textAlign',
          desc: `自定义内容位置`,
          optional: '<code>left</code> <code>center</code> <code>right</code>',
          type: 'string',
          default: 'center'
        },
        {
          name: 'onBlur',
          desc: `在 Input 失去焦点时触发, 原 FnbAmountInput <code>blur</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onFocus',
          desc: `在 Input 获得焦点时触发, 原 FnbAmountInput <code>focus</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onChange',
          desc: `仅在输入框失去焦点或用户按下回车时触发, 原 FnbAmountInput <code>change</code> event`,
          type: '(value: string | number) => void'
        }
      ]
    }
  }
}
</script>
