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
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input1',
          itemLabel: '基本输入'
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input2',
          type: 'phone',
          itemLabel: '手机号'
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input3',
          showAmountIcon: false,
          itemLabel: '不显示￥符号'
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input4',
          min: 1,
          itemLabel: '最小 1'
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input5',
          max: 10,
          itemLabel: '最大 10'
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input6',
          itemLabel: 'suffix',
          renderSuffix: () => {
            return <i>元</i>
          }
        },
        {
          formType: FormItemType.AMOUNT_INPUT,
          prop: 'input7',
          required: true,
          itemLabel: '必填项'
        }
      ]
    }
  },
  methods: {}
}
</script>
