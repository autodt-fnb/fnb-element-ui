<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/input#input-attributes' target='_blank' rel='noopener noreferrer'>Input Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>INPUT</code>',
          optional: `<code>INPUT</code>`,
          type: 'string'
        },
        {
          name: 'type',
          desc:
            '输入框类型，在 el-input type 属性里，额外添加了 <code>phone</code> 值，表示输入的是11位手机号，会自动添加验证规则，判断输入是否正确的手机号',
          optional: `<code>text</code> <code>textarea</code> <code>phone</code> 和其他 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#%3Cinput%3E_types" target="__blank">原生 input 的 type 值</a>`,
          type: 'string',
          default: 'text'
        },
        {
          name: 'renderPrefix',
          desc: `输入框头部内容，原 el-input <code>prefix</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderSuffix',
          desc: `输入框尾部内容，原 el-input <code>suffix</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderPrepend',
          desc: `输入框前置内容，原 el-input <code>prepend</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderAppend',
          desc: `输入框后置内容，原 el-input <code>append</code> slot，对 type="phone" 也有效`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'onBlur',
          desc: `在 Input 失去焦点时触发, 原 el-input <code>blur</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onFocus',
          desc: `在 Input 获得焦点时触发, 原 el-input <code>focus</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onChange',
          desc: `仅在输入框失去焦点或用户按下回车时触发, 原 el-input <code>change</code> event`,
          type: '(value: string | number) => void'
        },
        {
          name: 'onInput',
          desc: `在 Input 值改变时触发, 原 el-input <code>input</code> event`,
          type: '(value: string | number) => void'
        },
        {
          name: 'onClear',
          desc: `在点击由 <code>clearable</code> 属性生成的清空按钮时触发, 原 el-input input event`,
          type: '() => void'
        }
      ]
    }
  }
}
</script>
