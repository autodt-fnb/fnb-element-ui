<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/date-picker#attributes' target='_blank' rel='noopener noreferrer'>DatePicker Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
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
          desc: '表单类型，固定填写 <code>DATE_PICKER</code>',
          optional: `<code>DATE_PICKER</code>`,
          type: 'string'
        },
        {
          name: 'field',
          desc:
            '表单数据对象 属性名称，如是日期范围选择且是string类型的话，返回开始时间和结束时间的数组；[string, string]类型则第一个属性是开始时间，第二个是结束时间',
          type: 'string/[string, string]',
          default: '使用 <code>prop</code> 字段值'
        },
        {
          name: 'unlinkPanels',
          desc: '在范围选择器里取消两个日期面板之间的联动',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'defaultTime',
          desc: '范围选择时选中日期所使用的当日内具体时刻',
          type: '[string, string]',
          optional: `元组，形如12:00:00，第一项指定开始日期的时刻，不指定会使用时刻<code>00:00:00</code>；第二项指定结束日期的时刻，不指定会使用时刻<code>23:59:59</code>`,
          default: `['00:00:00', '23:59:59']`
        },
        {
          name: 'valueTime',
          desc:
            '日期范围选择时，value值是否加上 时分秒，即 <code>valueFormat="yyyy-MM-dd HH:mm:ss"</code>（valueFormat值会被覆盖）',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'dateLimit',
          desc: '日期范围选择时的限制，默认单位天，可通过type传入时间单位',
          optional: `number类型，限制选择的天的范围，object类型，type可传入限制的时间单位，参考<a href="https://dayjs.gitee.io/docs/zh-CN/manipulate/add#%E6%94%AF%E6%8C%81%E7%9A%84%E5%8D%95%E4%BD%8D%E5%88%97%E8%A1%A8" target="_blank">dayjs</a>`,
          type: 'number | { limit: number; type?: string }'
        },
        {
          name: 'endToday',
          desc: `是否不能选择超过今天`,
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'startToday',
          desc: `是否不能小于今天`,
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'isExcludeToday',
          desc: `当 <code>endToday="true"</code> 或 <code>startToday="true"</code> 时，默认是可以选择今天的， <code>isExcludeToDay="true"</code>，则不可以选中今天 `,
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'pickerShortcuts',
          desc: `设置 日期范围 快捷选项，具体用法和效果，参考demo`,
          optional: `'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'week' | 'oneMonth' | 'threeMonth' | 'halfAYear' | 'year'，当值为 <code>true</code>时，默认为 <code>['week', 'oneMonth', 'threeMonth', 'halfAYear', 'year']</code>`,
          type: 'boolean/string[]',
          default: 'false'
        },
        {
          name: 'onChange',
          desc: `组件绑定值。格式与绑定值一致，可受 valueFormat 控制，原 el-date-picker <code>change</code> event`,
          type: '(value) => void'
        },
        {
          name: 'onBlur',
          desc: `当 input 失去焦点时触发, 原 el-date-picker <code>blur</code> event`,
          type: '(event: Event) => void'
        },
        {
          name: 'onFocus',
          desc: `当 input 获得焦点时触发, 原 el-date-picker <code>focus</code> event`,
          type: '(event: Event) => void'
        }
      ]
    }
  }
}
</script>
