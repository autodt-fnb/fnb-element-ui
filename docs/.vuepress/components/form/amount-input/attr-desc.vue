<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`FnbAmountInput 的 <a href='http://docs.yangchebyd.com/fnb-element-ui/component/amount-input.html#Attributes' target='_blank' rel='noopener noreferrer'>Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>AMOUNT_INPUT</code>',
          optional: `<code>AMOUNT_INPUT</code>`,
          type: 'string'
        },
        {
          name: 'renderPrefix',
          desc: `输入框头部内容，原 FnbAmountInput <code>prefix</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderSuffix',
          desc: `输入框尾部内容，原 FnbAmountInput <code>suffix</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderPrepend',
          desc: `输入框前置内容，原 FnbAmountInput <code>prepend</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderAppend',
          desc: `输入框后置内容，原 FnbAmountInput <code>append</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
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
        },
        {
          name: 'onInput',
          desc: `在 Input 值改变时触发, 原 FnbAmountInput <code>input</code> event`,
          type: '(value: string | number) => void'
        },
        {
          name: 'onClear',
          desc: `在点击由 <code>clearable</code> 属性生成的清空按钮时触发, 原 FnbAmountInput input event`,
          type: '() => void'
        }
      ]
    }
  }
}
</script>
