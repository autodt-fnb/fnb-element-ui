<template>
  <FnbForm v-model="form" :cols="2">
    <FnbFormItem :listItems="listItems"></FnbFormItem>
  </FnbForm>
</template>

<script>
import { FormItemType } from '@autodt/fnb-element-ui'
export default {
  components: {},
  data() {
    return {
      form: {},
      listItems: [
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input1',
          type: 'daterange',
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'prop',
          type: 'daterange',
          field: ['startTime1', 'endTime1'],
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input2',
          type: 'datetimerange',
          itemLabel: '日期时间选择'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input3',
          type: 'daterange',
          dateLimit: 10,
          itemLabel: '限制选择范围10天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input4',
          type: 'daterange',
          dateLimit: { limit: 1, type: 'month' },
          itemLabel: '限制选择范围1个月'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input5',
          type: 'daterange',
          endToday: true,
          itemLabel: '不能超过今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input6',
          type: 'daterange',
          startToday: true,
          itemLabel: '不能小于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input7',
          type: 'daterange',
          endToday: true,
          isExcludeToday: true,
          itemLabel: '小于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input8',
          type: 'daterange',
          startToday: true,
          isExcludeToday: true,
          itemLabel: '大于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input9',
          type: 'daterange',
          pickerShortcuts: true,
          itemLabel: '快捷选项'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input10',
          type: 'daterange',
          pickerShortcuts: ['today', 'week', 'lastWeek', 'oneMonth'],
          itemLabel: '自定义快捷选项'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input11',
          type: 'daterange',
          valueTime: true,
          itemLabel: '绑定值有时分秒',
          onChange: () => {
            console.log(this.form)
          }
        }
      ]
    }
  },
  methods: {}
}
</script>
