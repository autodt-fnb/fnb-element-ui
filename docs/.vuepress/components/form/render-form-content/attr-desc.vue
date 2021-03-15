<template>
  <div>
    <common-attribute
      title="Attributes"
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
          desc: '表单类型，必填 <code>RENDER_FORM_CONTENT</code>',
          optional: `<code>RENDER_FORM_CONTENT</code>`,
          type: 'string'
        },
        {
          name: 'render',
          desc: `自定义内容 <code>(form) => VNode | JSX | string | number</code> , 参数 <code>form</code> 是表单数据对象`,
          type: 'function'
        }
      ]
    }
  }
}
</script>
