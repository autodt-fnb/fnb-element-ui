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
      form: {}
    }
  },
  computed: {
    listItems() {
      return [
        {
          formType: FormItemType.UPLOAD,
          prop: 'input1',
          itemLabel: '基本使用'
        }
      ]
    }
  },
  methods: {}
}
</script>
