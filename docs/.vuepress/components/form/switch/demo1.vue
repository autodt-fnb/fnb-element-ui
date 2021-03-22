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
          formType: FormItemType.SWITCH,
          prop: 'input1',
          activeColor: '#13ce66',
          inactiveColor: '#ff4949',
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.SWITCH,
          prop: 'prop',
          field: 'inputField',
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.SWITCH,
          prop: 'input2',
          activeText: '按月付费',
          inactiveText: '按年付费',
          itemLabel: '文字描述'
        },
        {
          formType: FormItemType.SWITCH,
          prop: 'input3',
          activeValue: '100',
          inactiveValue: '0',
          itemLabel: '扩展的 value 类型'
        }
      ]
    }
  },
  methods: {}
}
</script>
