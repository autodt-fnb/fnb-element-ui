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
          formType: FormItemType.TIME_PICKER,
          prop: 'input1',
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.TIME_PICKER,
          prop: 'prop',
          field: 'inputField',
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.TIME_PICKER,
          prop: 'input2',
          valueFormat: 'HH:mm',
          itemLabel: '绑定值格式化'
        },
        {
          formType: FormItemType.TIME_PICKER,
          prop: 'input3',
          isRange: true,
          itemLabel: '时间范围'
        }
      ]
    }
  },
  methods: {}
}
</script>
