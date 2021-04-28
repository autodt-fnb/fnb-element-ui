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
          formType: FormItemType.UPLOAD,
          prop: 'input1',
          itemLabel: '基本使用'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      form.input1 =
        'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/1c1299c2-b137-4e59-8b91-d8ce8e54b5c4.jpg,https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/ec2de6b5-26a0-4154-a49d-8fbfcd7aa72b.png'
    }, 1500)
  },
  methods: {}
}
</script>
