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
      form: {}
    }
  },
  computed: {
    listItems() {
      return [
        {
          formType: FormItemType.CHECKBOX,
          prop: 'input1',
          activeColor: '#13ce66',
          inactiveColor: '#ff4949',
          itemLabel: '基本使用',
          render: () => {
            return '选择1'
          }
        },
        {
          formType: FormItemType.CHECKBOX,
          prop: 'prop',
          field: 'inputField',
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          },
          render: () => {
            return '选择2'
          }
        },
        {
          formType: FormItemType.CHECKBOX,
          prop: 'input2',
          indeterminate: this.form.inputField,
          itemLabel: 'indeterminate状态',
          render: () => {
            return '选择3'
          }
        },
        {
          formType: FormItemType.CHECKBOX,
          prop: 'input3',
          trueLabel: '100',
          falseLabel: '0',
          itemLabel: '扩展的 label 类型',
          onChange: () => {
            console.log(this.form)
          },
          render: () => {
            return '选择4'
          }
        }
      ]
    }
  },
  methods: {}
}
</script>
