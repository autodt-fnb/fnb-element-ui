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
          formType: FormItemType.INPUT,
          prop: 'input1',
          itemLabel: '基本输入'
        },
        {
          formType: FormItemType.INPUT,
          prop: 'input2',
          type: 'phone',
          itemLabel: '手机号'
        },
        {
          formType: FormItemType.INPUT,
          prop: 'input3',
          clearable: true,
          itemLabel: '可清空'
        },
        {
          formType: FormItemType.INPUT,
          prop: 'input4',
          disabled: true,
          itemLabel: '禁用状态'
        },
        {
          formType: FormItemType.INPUT,
          prop: 'input5',
          suffixIcon: 'el-icon-date',
          itemLabel: '带icon，属性方式'
        },
        {
          formType: FormItemType.INPUT,
          prop: 'input6',
          itemLabel: '带icon，renderSuffix方式',
          renderSuffix: () => {
            return <i class="el-icon-date"></i>
          }
        },
        {
          formType: FormItemType.INPUT,
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
