<template>
  <FnbForm v-model="form" :cols="2">
    <FnbFormItem :listItems="listItems"></FnbFormItem>
  </FnbForm>
</template>

<script>
import { FormItemType } from '@autodt/fnb-element-ui'

const optionList = [
  {
    value: '1',
    label: '选项1'
  },
  {
    value: '2',
    label: '选项2'
  },
  {
    value: '3',
    label: '选项3'
  },
  {
    value: '4',
    label: '选项4'
  }
]

export default {
  components: {},
  data() {
    return {
      form: {},
      listItems: [
        {
          formType: FormItemType.SELECT,
          prop: 'input1',
          optionList,
          itemLabel: '基本使用'
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input2',
          optionList,
          multiple: true,
          itemLabel: '多选'
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input3',
          optionList,
          disabled: true,
          itemLabel: '禁用'
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input4',
          optionList,
          clearable: true,
          itemLabel: '可清空'
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input5',
          optionList,
          outputType: 'string',
          itemLabel: '输出字符串',
          onChange(val) {
            console.log('输出字符串：', val)
          }
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input6',
          optionList,
          multiple: true,
          outputType: 'string',
          outputSeparator: '@',
          itemLabel: '输出@分割字符串',
          onChange(val) {
            console.log('输出@分割字符串：', val)
          }
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input7',
          multiple: true,
          optionList: optionList.map((item, index) => ({
            ...item,
            disabled: index === 1
          })),
          itemLabel: 'option 禁用'
        },
        {
          formType: FormItemType.SELECT,
          prop: 'input8',
          optionList,
          required: true,
          clearable: true,
          itemLabel: '必填项'
        }
      ]
    }
  },
  methods: {}
}
</script>
