<template>
  <FnbSearchForm :listItems="listItems" @search="handleSearch"></FnbSearchForm>
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
          formType: FormItemType.INPUT,
          field: 'input1',
          itemLabel: '姓名'
        },
        {
          formType: FormItemType.SELECT,
          field: 'input2',
          itemLabel: '性别',
          optionList: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            }
          ]
        },
        {
          formType: FormItemType.INPUT,
          field: 'input3',
          type: 'phone',
          itemLabel: '手机号'
        },
        {
          formType: FormItemType.INPUT,
          field: 'input4',
          itemLabel: '住址'
        }
      ]
    }
  },
  methods: {
    handleSearch(form) {
      console.log('当前搜索表单项数据：', form)
    }
  }
}
</script>
