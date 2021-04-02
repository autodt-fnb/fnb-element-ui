<template>
  <FnbSearchForm :listItems="formItems" />
</template>

<script lang="tsx">
import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'
import { FormItemProps } from '@autodt/fnb-element-ui/types/form-item'
import { computed, defineComponent } from '@vue/composition-api'

const FormDemo = defineComponent({
  name: 'FormDemo',
  components: {},
  setup() {
    const formItems = computed<FormItemProps[]>(() => {
      return [
        {
          formType: FormItemType.RENDER_FORM_CONTENT,
          prop: 'render',
          itemLabel: '自定义',
          render: () => {
            return <el-input />
          }
        }
      ]
    })

    return { formItems }
  }
})

export default FormDemo
</script>

<style lang="scss" scoped></style>
