<template>
  <div>
    <common-attribute
      title="Attributes"
      type="attr"
      :data="attrData"
    ></common-attribute>
    <common-attribute
      title="Events"
      type="event"
      :data="eventData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'value/v-model',
          desc: `车牌号码`,
          type: 'string'
        },
        {
          name: 'clearable',
          desc: '是否可清空',
          type: 'boolean',
          default: 'true'
        }
      ],
      eventData: [
        {
          name: 'change',
          desc: `车牌号改变时触发事件`,
          type: 'string',
          params: '(value: string)'
        },
        {
          name: 'blur',
          desc: `输入框失去焦点事件`,
          type: 'string',
          params: '(value: string)'
        },
        {
          name: 'focus',
          desc: `输入框获得焦点事件`,
          type: 'string',
          params: '(value: string)'
        },
        {
          name: 'clear',
          desc: `在点击由 <code>clearable</code> 属性生成的清空按钮时触发`
        }
      ]
    }
  }
}
</script>
