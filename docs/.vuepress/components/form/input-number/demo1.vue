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
          formType: FormItemType.INPUT_NUMBER,
          prop: 'input1',
          itemLabel: '计数器'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
          prop: 'input2',
          controls: false,
          itemLabel: '数字输入'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
          prop: 'input3',
          controls: false,
          textAlign: 'left',
          itemLabel: '文字居左'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
          prop: 'input4',
          min: 1,
          itemLabel: '最小 1'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
          prop: 'input5',
          max: 10,
          itemLabel: '最大 10'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
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
