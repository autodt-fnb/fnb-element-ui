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
    <common-attribute
      title="Methods"
      type="methods"
      :data="methodsData"
    ></common-attribute>
    <common-attribute
      title="Slots"
      type="slot"
      :data="slotData"
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
          desc: `绑定值`,
          type: 'array'
        },
        {
          name: 'clearable',
          desc: '是否可清空',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'disabled',
          desc: '禁用',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'placeholder',
          desc: '输入框占位文本',
          type: 'string'
        },
        {
          name: 'size',
          desc: '输入框尺寸',
          type: 'string',
          optional: 'medium / small / mini'
        },
        {
          name: 'show-amount-icon',
          desc: '是否显示 <code>￥</code> 符号',
          type: 'boolean',
          default: 'true'
        }
      ],
      eventData: [
        {
          name: 'blur',
          desc: '在 Input 失去焦点时触发',
          params: '(event: Event)'
        },
        {
          name: 'focus',
          desc: '在 Input 获得焦点时触发',
          params: '(event: Event)'
        },
        {
          name: 'change',
          desc: '仅在输入框失去焦点或用户按下回车时触发',
          params: '(value: number)'
        },
        {
          name: 'input',
          desc: '在 Input 值改变时触发',
          params: '(value: number)'
        },
        {
          name: 'clear',
          desc: '在点击由 <code>clearable</code> 属性生成的清空按钮时触发',
          params: '(event: Event)'
        }
      ],
      methodsData: [
        {
          name: 'focus',
          desc: '使 input 获取焦点'
        },
        {
          name: 'blur',
          desc: '使 input 失去焦点'
        },
        {
          name: 'select',
          desc: '选中 input 中的文字'
        }
      ],
      slotData: [
        {
          name: 'prefix',
          desc: '输入框头部内容'
        },
        {
          name: 'suffix',
          desc: '输入框尾部内容'
        },
        {
          name: 'prepend',
          desc: '输入框前置内容'
        },
        {
          name: 'append',
          desc: '输入框后置内容'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
