<template>
  <FnbForm v-model="form" :cols="2">
    <FnbFormItem :listItems="listItems"></FnbFormItem>
  </FnbForm>
</template>

<script>
import { FormItemType } from 'fnb-element-ui/lib'
export default {
  components: {},
  data() {
    return {
      form: {},
      listItems: [
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input1',
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'prop',
          field: 'inputField',
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input2',
          endToday: true,
          itemLabel: '不能超过今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input3',
          startToday: true,
          itemLabel: '不能小于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input4',
          endToday: true,
          isExcludeToday: true,
          itemLabel: '小于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'input5',
          startToday: true,
          isExcludeToday: true,
          itemLabel: '大于今天'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'datetime',
          type: 'datetime',
          itemLabel: '时间'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'year',
          type: 'year',
          itemLabel: '年'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'month',
          type: 'month',
          itemLabel: '月'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'week',
          type: 'week',
          itemLabel: '周'
        },
        {
          formType: FormItemType.DATE_PICKER,
          prop: 'dates',
          type: 'dates',
          itemLabel: '多日期选择'
        }
      ]
    }
  },
  methods: {}
}
</script>
