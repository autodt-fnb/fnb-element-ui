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
          formType: FormItemType.TIME_SELECT,
          prop: 'input1',
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.TIME_SELECT,
          prop: 'prop',
          field: 'inputField',
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.TIME_SELECT,
          prop: 'input2',
          isRange: true,
          itemLabel: '时间范围'
        },
        {
          formType: FormItemType.TIME_SELECT,
          prop: 'input3',
          isRange: true,
          startPickerOptions: {
            start: '00:00',
            end: '24:00'
          },
          endPickerOptions: {
            start: '18:00',
            end: '24:00'
          },
          itemLabel: '时间范围选项'
        }
      ]
    }
  },
  methods: {}
}
</script>
