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
          name: 'value/v-model',
          desc: `绑定值`,
          type: 'array'
        },
        {
          name: 'valueFormat',
          desc: 'value 时间格式',
          optional:
            ' <code>yyyy-MM-dd</code> / <code>yyyy-MM-dd HH:mm:ss</code> ',
          type: 'number',
          default: 'yyyy-MM-dd'
        },
        {
          name: 'maxWidth',
          desc: '组件显示的最大宽度，默认自适应容器',
          type: 'number'
        },
        {
          name: 'valueTime',
          desc:
            '是否在日期后面加 时间，开始时间加 <code>00:00:00</code>，结束时间后面加 <code>23:59:59</code>',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'picker-options',
          desc:
            '与 ElmentUI DatePicker 组件的 <a target="_blank" herf="https://element.eleme.cn/#/zh-CN/component/date-picker#picker-options">picker-options</a> 一致。',
          type: 'object',
          default: '{}'
        },
        {
          name: 'operateBtns',
          desc:
            '需要显示的日期操作按钮，默认显示所有；如不想显示所有操作按钮，传空数组 <code>[]</code> ',
          type: 'string[]',
          optional:
            '[ <code>today</code> / <code>yesterday</code>  / <code>lastWeek</code>  / <code>thisWeek</code>  / <code>thisMonth</code> ]'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
