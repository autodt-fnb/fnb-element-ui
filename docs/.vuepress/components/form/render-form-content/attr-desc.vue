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
          desc: '表单类型，固定填写 <code>RENDER_FORM_CONTENT</code>',
          optional: `<code>RENDER_FORM_CONTENT</code>`,
          type: 'string'
        },
        {
          name: 'field',
          desc:
            '表单数据字段名称，当与 <code>prop</code> 属性值相同的时候，可不填',
          type: 'string | string[]'
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
