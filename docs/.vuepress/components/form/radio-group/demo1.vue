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
      radioList: [
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
          formType: FormItemType.RADIO_GROUP,
          prop: 'input1',
          radioList: this.radioList,
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.RADIO_GROUP,
          prop: 'prop',
          field: 'inputField',
          radioList: this.radioList,
          itemLabel: '自定义field',
          onChange: () => {
            console.log(this.form)
          }
        },
        {
          formType: FormItemType.RADIO_GROUP,
          prop: 'input3',
          key: 'label',
          isRadioButton: true,
          itemLabel: '按钮样式',
          radioList: this.radioList,
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
