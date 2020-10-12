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
          name: 'startPlaceholder',
          desc: '开始日期占位符',
          type: 'string',
          default: '开始日期'
        },
        {
          name: 'endPlaceholder',
          desc: '结束日期占位符',
          type: 'string',
          default: '结束日期'
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
            '与 ElmentUI DatePicker 组件的 <a target="_blank" herf="https://element.eleme.cn/#/zh-CN/component/date-picker#picker-options" rel="noopener noreferrer">picker-options</a> 一致。',
          type: 'object',
          default: '{}'
        },
        {
          name: 'showBtns',
          desc: '是否显示的日期操作按钮',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'operateBtns',
          desc: '需要显示的日期操作按钮，默认显示所有',
          type: 'string[]',
          optional:
            '[ <code>today</code> / <code>yesterday</code>  / <code>lastWeek</code>  / <code>thisWeek</code>  / <code>thisMonth</code> ]'
        },
        {
          name: 'date-limit',
          desc: '日期限制范围',
          type: 'number/object({limit: number;type: "d" | "m" | "y"})'
        },
        {
          name: 'end-today',
          desc: '是否不能选择超过今日的日期',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'disabled',
          desc: '是否禁止选择日期',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'clearable',
          desc: '是否可清除',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'type',
          desc: '当前按钮组的类型',
          type: 'string | number',
          optional: '1 今日；2 昨日；3 上周；4 本周；5 本月',
          default: 'true'
        }
      ],
      eventData: [
        {
          name: 'change',
          desc: '用户确认选定的值时触发',
          params: '组件绑定值。'
        },
        {
          name: 'btnClick',
          desc: '点击按钮组是触发',
          params: '1 今日；2 昨日；3 上周；4 本周；5 本月'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
