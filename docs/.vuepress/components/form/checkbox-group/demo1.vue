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
      checkboxList: [
        {
          label: 1,
          render: () => {
            return '选择1'
          }
        },
        {
          label: 2,
          render: () => {
            return '选择2'
          }
        },
        {
          label: 3,
          render: () => {
            return '选择3'
          }
        }
      ]
    }
  },
  computed: {
    listItems() {
      return [
        {
          formType: FormItemType.CHECKBOX_GROUP,
          prop: 'input1',
          checkboxList: this.checkboxList,
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.CHECKBOX_GROUP,
          prop: 'prop',
          field: 'inputField',
          checkboxList: this.checkboxList,
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.CHECKBOX_GROUP,
          prop: 'input2',
          itemLabel: '输出字符串',
          outputType: 'string',
          checkboxList: this.checkboxList
        },
        {
          formType: FormItemType.CHECKBOX_GROUP,
          prop: 'input3',
          key: 'label',
          isCheckboxButton: true,
          itemLabel: '按钮样式',
          checkboxList: this.checkboxList,
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
