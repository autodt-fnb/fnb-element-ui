<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`fnb-upload 的 <a href='http://docs.yangchebyd.com/fnb-element-ui/component/upload.html#Attributes' target='_blank' rel='noopener noreferrer'>Upload Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>UPLOAD</code>',
          optional: `<code>UPLOAD</code>`,
          type: 'string'
        }
      ]
    }
  }
}
</script>
