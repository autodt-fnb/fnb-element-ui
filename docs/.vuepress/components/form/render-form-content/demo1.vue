<template>
  <FnbForm v-model="form">
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
          formType: FormItemType.RENDER_FORM_CONTENT,
          prop: 'diy',
          itemLabel: '自定义',
          render: form => {
            return <div>我是自定内容</div>
          }
        },
        {
          prop: 'input',
          itemLabel: '自定义输入框',
          formType: FormItemType.RENDER_FORM_CONTENT,
          render: form => {
            return <el-input v-model={form.input}></el-input>
          }
        },
        {
          itemLabel: '输入框的值',
          formType: FormItemType.RENDER_FORM_CONTENT,
          render: form => {
            return form.input
          }
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
