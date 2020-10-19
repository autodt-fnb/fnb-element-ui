<template>
  <el-input
    :value="value"
    @input="emitInput"
    @change="emitChange"
    :clearable="clearable"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :prefix-icon="showAmountIcon ? 'amount-icon' : undefined"
    v-on="events"
    ref="input"
  >
    <slot name="prefix" slot="prefix" />
    <slot name="suffix" slot="suffix" />
    <slot name="prepend" slot="prepend" />
    <slot name="append" slot="append" />
  </el-input>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { ElInput } from 'element-ui/types/input'

@Component({ name: 'FnbAmountInput', components: {} })
export default class main extends Vue {
  @Prop([String, Number]) readonly value!: string | number

  /** 是否可清空 */
  @Prop(Boolean) readonly clearable!: boolean

  /** 禁用 */
  @Prop(Boolean) readonly disabled!: boolean

  /** 输入框占位文本 */
  @Prop(String) readonly placeholder!: string

  /** 输入框尺寸 */
  @Prop(String) readonly size!: string

  /** 是否显示 ￥ 符号 */
  @Prop({ type: Boolean, default: true }) readonly showAmountIcon!: boolean

  /** input组件 */
  @Ref('input') readonly inputRef!: ElInput

  /** 去除 input,change 事件 */
  private get events() {
    const es = { ...this.$listeners }
    Reflect.deleteProperty(es, 'input')
    Reflect.deleteProperty(es, 'change')
    return es
  }

  /** input输入事件 */
  private emitInput(val: string) {
    val = val ?? ''
    const value = val.toString().match(/^\d*(\.?\d{0,2})/g)?.[0] ?? ''
    this.$emit(
      'input',
      value === '' || value.endsWith('.') || value.endsWith('.0')
        ? value
        : parseFloat(value)
    )
  }

  /** change事件 */
  private emitChange(val: string) {
    this.$emit('input', val === '' ? '' : parseFloat(val))
    this.$emit('change', val === '' ? '' : parseFloat(val))
  }

  /** 使 input 获取焦点 */
  focus() {
    this.inputRef.focus()
  }

  /** 使 input 失去焦点 */
  blur() {
    this.inputRef.blur()
  }

  /** 选中 input 中的文字 */
  select() {
    this.inputRef.select()
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .amount-icon {
    &::before {
      content: '￥';
      font-style: normal;
    }
  }
}
</style>
