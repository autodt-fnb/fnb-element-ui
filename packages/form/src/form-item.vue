<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:49:41
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-04-02 09:20:56
 */
import { FormRuleItem, FormRules } from '@autodt/fnb-element-ui/types/form'
import {
  ElFormItemProps,
  FormItemProps,
  InputPorps
} from '@autodt/fnb-element-ui/types/form-item'
import {
  camelCase,
  isArray,
  isPlainObject,
  mapKeys,
  pick,
  set,
  trimEnd,
  trimStart
} from 'lodash'
import {
  Vue,
  Component,
  Inject,
  Prop,
  InjectReactive,
  Watch
} from 'vue-property-decorator'
import itemContent, { elFormItemAttributes } from './item-content'
import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'

@Component({ name: 'FnbFormItem', components: {}, inheritAttrs: false })
export default class FormItem extends Vue {
  @Inject() readonly getForm!: any

  @Prop(Array) readonly listItems!: FormItemProps[]

  @InjectReactive() form!: Record<string, any>

  @InjectReactive() formRules!: FormRules

  get fnbForm() {
    return this.getForm()
  }

  get fnbFormOffset() {
    return this.fnbForm?.offset
  }

  /** 过滤 hidden 为true 的item */
  get items() {
    return this.listItems
      .filter(v => !v.hidden)
      .map(item => {
        let { required, rules, ...props } = item
        if (
          props.formType !== FormItemType.RENDER_FORM_CONTENT &&
          !props.field &&
          !props.prop
        ) {
          console.error('[prop]和[field]两个字段至少填写一个！')
        }

        props.field ??= props.prop

        props.colOffset ??= this.fnbFormOffset

        if (Reflect.has(this.formRules ?? {}, props.prop!)) {
          const propRules = this.formRules[props.prop!]
          // 如果rules 是对象的话，变成数组
          if (isPlainObject(rules)) {
            rules = [rules as FormRuleItem]
          }
          if (isArray(propRules)) {
            ;((rules ??= []) as FormRuleItem[]).push(...propRules)
          } else {
            ;((rules ??= []) as FormRuleItem[]).push(propRules)
          }
        }

        // 如果rules 中已经定义的 required 属性，则不添加自定义 required rule
        const isRequired =
          (isArray(rules) && rules.some(v => v.required)) ||
          (isPlainObject(rules) && (rules as FormRuleItem).required)

        if (required && !isRequired) {
          const addRules = {
            required: true,
            message: `${trimEnd(
              trimEnd(props.itemLabel ?? '此项', '：'),
              ':'
            )}是必填项！`,
            trigger: [
              FormItemType.INPUT,
              FormItemType.AMOUNT_INPUT,
              FormItemType.AUTOCOMPLETE
            ].includes(props.formType)
              ? 'blur'
              : 'change'
          } as FormRuleItem

          if (isArray(rules) && !rules?.find(v => Reflect.has(v, 'required'))) {
            rules = [addRules, ...rules]
          } else if (!Reflect.has((rules ?? {}) as FormRuleItem, 'required')) {
            if (!rules) {
              rules = [addRules]
            } else {
              rules = [addRules, rules as FormRuleItem]
            }
          }
        }

        if (
          props.formType === FormItemType.INPUT &&
          (item as InputPorps).type === 'phone'
        ) {
          const phoneRule = {
            message: `请输入正确的${props.itemLabel}`,
            trigger: 'blur',
            len: 11
          } as FormRuleItem
          if (isArray(rules)) {
            rules = [...rules, phoneRule]
          } else if (!rules) {
            rules = phoneRule
          } else {
            rules = [rules as FormRuleItem, phoneRule]
          }
        }
        return { ...props, rules }
      })
  }

  created() {
    this.initForm()
  }

  /** 初始化form字段 */
  @Watch('items.length')
  initForm() {
    const form = { ...this.form }
    this.items.forEach(item => {
      const prop = item.field ?? item.prop
      if (prop) {
        if (isArray(prop)) {
          prop.forEach(v => {
            set(form, v, form[v])
          })
        } else {
          set(form, prop, form[prop])
        }
      }
    })

    for (const key in form) {
      this.$set(this.form, key, form[key])
    }
  }

  createContent(item: FormItemProps) {
    return itemContent[item.formType!]?.call(this, { ...item })
  }

  /** 计算 span */
  computedSpan(index: number, colSpan?: number) {
    const cols: number | number[] = this.fnbForm.cols ?? 1
    let span = 24
    if (isArray(cols)) {
      span = cols[index % cols.length]
    } else {
      span = parseInt(`${24 / cols}`)
    }
    span = colSpan ?? span
    return span
  }

  render() {
    return (
      <el-row gutter={this.fnbForm.gutter ?? 10}>
        {this.items.map((item, index) => {
          const elFormItemProps = mapKeys(
            pick(item, elFormItemAttributes),
            (_, key) => camelCase(trimStart(key, 'item'))
          ) as ElFormItemProps

          return (
            <el-col
              key={index}
              offset={item.colOffset}
              pull={item.colPull}
              push={item.colPush}
              span={this.computedSpan(index, item.colSpan)}
              style={{ clear: item.clearfix ? 'both' : undefined }}
              v-show={!item.invisible}
            >
              <el-form-item
                {...{ attrs: { ...elFormItemProps } }}
                scopedSlots={{ error: item.renderItemError }}
              >
                {(!!item.renderItemLabel || !!item.itemLabelDesc) && (
                  <template slot="label">
                    {item.renderItemLabel?.() ?? item.itemLabel}
                    <div class="form-label-desc">
                      {typeof item.itemLabelDesc === 'string'
                        ? item.itemLabelDesc
                        : item.itemLabelDesc?.()}
                    </div>
                  </template>
                )}
                {this.createContent(item)}
              </el-form-item>
            </el-col>
          )
        })}
      </el-row>
    )
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-form-item__label {
    position: relative;
  }

  .el-input-number {
    width: 100%;
  }

  .text-left.el-input-number .el-input__inner {
    text-align: left;
  }
}

.form-label-desc {
  position: absolute;
  bottom: 10px;
  transform: translateY(100%);
  font-size: 12px;
  font-weight: normal;
  line-height: 1.15;
}
</style>
