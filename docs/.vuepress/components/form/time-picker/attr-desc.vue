<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/time-picker#attributes' target='_blank' rel='noopener noreferrer'>TimePicker Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>TIME_PICKER</code>',
          optional: `<code>TIME_PICKER</code>`,
          type: 'string'
        },
        {
          name: 'field',
          desc:
            '表单数据对象 属性名称，如是时间范围选择且是string类型的话，返回开始时间和结束时间的数组；[string, string]类型则第一个属性是开始时间，第二个是结束时间',
          type: 'string/[string, string]',
          default: '使用 <code>prop</code> 字段值'
        },
        {
          name: 'onChange',
          desc: `组件绑定值。格式与绑定值一致，可受 valueFormat 控制，原 el-time-picker <code>change</code> event`,
          type: '(value) => void'
        },
        {
          name: 'onBlur',
          desc: `当 input 失去焦点时触发, 原 el-time-picker <code>blur</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onFocus',
          desc: `当 input 获得焦点时触发, 原 el-time-picker <code>focus</code> event`,
          type: '(event: Event) => void'
        }
      ]
    }
  }
}
</script>
