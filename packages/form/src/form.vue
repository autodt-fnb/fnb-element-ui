<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:58:00
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-15 14:15:49
 */

import {
  Vue,
  Component,
  Prop,
  ProvideReactive,
  Provide,
  Watch,
  Ref
} from 'vue-property-decorator'
import { camelCase, cloneDeep, isEqual, mapKeys, pick } from 'lodash'
import {
  ElForm,
  ValidateCallback,
  ValidateFieldCallback
} from 'element-ui/types/form'

const formAttributes = [
  'rules',
  'inline',
  'labelPosition',
  'labelWidth',
  'labelSuffix',
  'hideRequiredAsterisk',
  'showMessage',
  'inlineMessage',
  'statusIcon',
  'size',
  'disabled'
]

@Component({
  name: 'FnbForm',
  inheritAttrs: false,
  components: {},
  inject: {},
  provide() {
    return {
      fnbForm: this
    }
  }
})
export default class Form extends Vue {
  @Prop(Object) readonly value!: Record<string, unknown>

  /** 显示列数 */
  @Prop({ type: [Number, Array] }) readonly cols!: number | number[]

  /** 列数偏移 */
  @Prop({ type: Number }) readonly offset!: number

  /** 间隔 */
  @Prop(Number) readonly gutter!: number

  /** 是否在 `rules` 属性改变后立即触发一次验证 */
  @Prop(Boolean) readonly validateOnRuleChange!: boolean

  @Provide() getForm() {
    return this
  }

  @ProvideReactive()
  form: Record<string, unknown> = {}

  @Ref('form') readonly formRef!: ElForm

  @Watch('form', { deep: true })
  watchForm(val: Record<string, unknown>) {
    if (!isEqual(val, this.value)) {
      this.$emit('input', val)
    }
  }

  @Watch('value', { deep: true, immediate: true })
  watchValue(val: Record<string, unknown>) {
    if (!isEqual(val, this.form)) {
      this.form = cloneDeep({ ...this.form, ...(this.value ?? {}) })
    }
  }

  validate(e: ValidateCallback) {
    return this.formRef.validate(e)
  }

  validateField(props: string | string[], callback?: ValidateFieldCallback) {
    this.formRef.validateField(props, callback)
  }

  resetFields() {
    this.formRef.resetFields()
  }

  clearValidate(props?: string | string[]) {
    this.formRef.clearValidate(props)
  }

  render() {
    const { $listeners, $slots } = this
    const attrs = pick(
      mapKeys(this.$attrs, (_, key) => camelCase(key)),
      formAttributes
    )
    attrs.labelWidth ??= 'auto'

    const wrapProps = {
      attrs: {
        ...attrs,
        model: this.form
      },
      on: { $listeners }
    }
    return (
      <el-form
        ref="form"
        validateOnRuleChange={this.validateOnRuleChange}
        {...wrapProps}
      >
        {$slots.default}
      </el-form>
    )
  }
}
</script>

<style lang="scss" scoped></style>
