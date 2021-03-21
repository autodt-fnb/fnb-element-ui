<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/switch#attributes' target='_blank' rel='noopener noreferrer'>Switch Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>SWITCH</code>',
          optional: `<code>SWITCH</code>`,
          type: 'string'
        },
        {
          name: 'onChange',
          desc: `组件绑定值。格式与绑定值一致，可受 valueFormat 控制，原 el-time-picker <code>change</code> event`,
          type: '(value) => void'
        }
      ]
    }
  }
}
</script>
