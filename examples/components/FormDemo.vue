<template>
  <div>
    <!-- <FnbForm ref="form" :cols="[6]" v-model="form">
      <FnbFormItem :listItems="formItems" />
    </FnbForm> -->

    <el-checkbox-button v-model="checkbox">23</el-checkbox-button>
    <el-button @click="handleValid">验证</el-button>
  </div>
</template>

<script lang="tsx">
import { FnbForm } from 'fnb-element-ui/types/form'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component({ name: 'FormDemo', components: {} })
export default class FormDemo extends Vue {
  form: any = { edit: '', select: '222' }
  checkbox = false

  fileList = [
    {
      url:
        'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/1c1299c2-b137-4e59-8b91-d8ce8e54b5c4.jpg',
      type: 'image'
    },
    {
      url:
        'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/ec2de6b5-26a0-4154-a49d-8fbfcd7aa72b.png'
    }
  ]

  @Ref('form') readonly formRef!: FnbForm

  async handleValid() {
    try {
      const res = await this.formRef.validate()
      console.log('444', res)
    } catch (error) {
      console.log(333, error)
    }
  }
}
</script>

<style lang="scss" scoped></style>
