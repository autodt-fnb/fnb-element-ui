<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:49:41
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-16 22:40:07
 */
import { FormRuleItem } from '@autodt/fnb-element-ui/types/form'
import {
  ElFormItemProps,
  FormItemProps,
  InputPorps
} from '@autodt/fnb-element-ui/types/form-item'
import { camelCase, isArray, mapKeys, pick, trimStart } from 'lodash'
import {
  Vue,
  Component,
  Inject,
  Prop,
  InjectReactive
} from 'vue-property-decorator'
import itemContent, { elFormItemAttributes } from './item-content'
import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'

@Component({ name: 'FnbFormItem', components: {}, inheritAttrs: false })
export default class FormItem extends Vue {
  @Inject() readonly getForm!: any

  @Prop(Array) readonly listItems!: FormItemProps[]

  @InjectReactive() form!: Record<string, any>

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

        props.colOffset ??= this.fnbFormOffset
        if (required) {
          const addRules = {
            required: true,
            message: `${props.itemLabel ?? '此项'}是必填项！`,
            trigger: [
              FormItemType.INPUT,
              FormItemType.INPUT_NUMBER,
              FormItemType.AUTOCOMPLETE
            ].includes(props.formType)
              ? 'blur'
              : 'change'
          } as FormRuleItem

          if (isArray(rules) && !rules?.find(v => Reflect.has(v, 'required'))) {
            rules = [addRules, ...rules]
          } else if (!Reflect.has((rules ?? {}) as FormRuleItem, 'required')) {
            if (!rules) {
              rules = addRules
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
  initForm() {
    this.listItems.forEach(item => {
      const prop = item.field ?? item.prop
      if (prop) {
        if (isArray(prop)) {
          prop.forEach(v => {
            this.$set(this.form, v, this.form[v])
          })
        } else {
          this.$set(this.form, prop, this.form[prop])
        }
      }
    })
  }

  createContent(item: FormItemProps) {
    return itemContent[item.formType!]?.call(this, {
      ...item,
      field: item.field ?? item.prop
    })
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
