<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/input#autocomplete-attributes' target='_blank' rel='noopener noreferrer'>Autocomplete Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>AUTOCOMPLETE</code>',
          optional: `<code>AUTOCOMPLETE</code>`,
          type: 'string'
        },
        {
          name: 'renderPrefix',
          desc: `输入框头部内容，原 el-autocomplete <code>prefix</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderSuffix',
          desc: `输入框尾部内容，原 el-autocomplete <code>suffix</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderPrepend',
          desc: `输入框前置内容，原 el-autocomplete <code>prepend</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'renderAppend',
          desc: `输入框后置内容，原 el-autocomplete <code>append</code> slot`,
          type: 'VNode | JSX.Element | string | number'
        },
        {
          name: 'onSelect',
          desc: `点击选中建议项时触发, 原 el-autocomplete <code>select</code> event`,
          type: '(item: any) => void'
        },
        {
          name: 'onChange',
          desc: `仅在输入框失去焦点或用户按下回车时触发, 原 el-autocomplete <code>change</code> event`,
          type: '(value: string | number) => void'
        }
      ]
    }
  }
}
</script>
