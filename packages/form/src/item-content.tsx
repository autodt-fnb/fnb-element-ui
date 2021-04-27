/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:51:13
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-04-02 02:09:27
 */
import {
  AutocompletePorps,
  DatePickerProps,
  InputPorps,
  RenderFormContentProps,
  SelectProps,
  TimePickerProps,
  TimeSelectProps,
  FnbFormItem,
  InputNumberProps,
  SwitchProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioProps,
  RadioGroupProps,
  CascaderProps,
  UploadProps,
  AmountInputPorps
} from '@autodt/fnb-element-ui/types/form-item'
import {
  camelCase,
  get,
  isArray,
  isObject,
  mapKeys,
  pickBy,
  set,
  trimStart
} from 'lodash'
import { pickerOptions } from '@autodt/fnb-element-ui/src/utils/date-util'
import dayjs from 'dayjs'
import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'
import { Render } from '@autodt/fnb-element-ui/types/common'
import AmountInput from '~/amount-input'

export const elFormItemAttributes = [
  'prop',
  'itemLabel',
  'itemLabelWidth',
  'itemSize',
  'required',
  'rules',
  'error',
  'showMessage',
  'inlineMessage'
]

const proxyForm = (form: any) =>
  new Proxy(form, {
    get(target, propertyKey) {
      return get(target, propertyKey)
    },
    set(target, propertyKey, value) {
      set(target, propertyKey, value)
      return true
    }
  })

function wrapProps(attrs: Record<string, any>) {
  const listeners = mapKeys(
    pickBy(attrs, (_, key) => key.startsWith('on')),
    (_, key) => camelCase(trimStart(key, 'on'))
  )

  const props = pickBy(
    attrs,
    (_, key) =>
      !key.startsWith('render') &&
      !key.startsWith('on') &&
      ![
        'field',
        'hidden',
        'formType',
        'colOffset',
        'colSpan',
        'colPush',
        'colPull',
        'clearfix',
        ...elFormItemAttributes
      ].includes(key)
  )

  return { attrs: props, on: listeners }
}

const itemContent: {
  [i in FormItemType]: (this: FnbFormItem, e: any) => Render
} = {
  [FormItemType.RENDER_FORM_CONTENT](this, attrs: RenderFormContentProps) {
    return attrs.render?.(this.form)
  },
  [FormItemType.INPUT](this, attrs: InputPorps) {
    const {
      renderPrefix,
      renderSuffix,
      renderPrepend,
      renderAppend,
      type,
      ...props
    } = attrs
    let inputType = type

    if (type === 'phone') {
      props.maxlength = 11
      inputType = 'tel'
    }
    props.placeholder ??= '请输入'
    const form = proxyForm(this.form)
    return (
      <el-input
        type={inputType}
        value={form[props.field!]}
        onInput={(val?: string) => {
          if (type === 'phone') {
            if (
              (val?.length === 1 && val !== '1') ||
              (val?.length === 2 && !/[3-9]+/.test(val[1])) ||
              ((val?.length ?? 0) > 2 && !/[0-9]+/.test(val![val!.length - 1]))
            ) {
              return
            }
          }
          form[props.field!] = val
        }}
        {...wrapProps(props)}
      >
        {!!renderPrefix && <template slot="prefix">{renderPrefix()}</template>}
        {!!renderSuffix && <template slot="suffix">{renderSuffix()}</template>}
        {!!renderPrepend && (
          <template slot="prepend">{renderPrepend()}</template>
        )}
        {!!renderAppend && <template slot="append">{renderAppend()}</template>}
      </el-input>
    )
  },
  [FormItemType.AMOUNT_INPUT](this, attrs: AmountInputPorps) {
    const {
      renderPrefix,
      renderSuffix,
      renderPrepend,
      renderAppend,
      ...props
    } = attrs

    props.placeholder ??= '请输入'

    const form = proxyForm(this.form)

    return (
      <AmountInput v-model={form[props.field!]} {...wrapProps(props)}>
        {!!renderPrefix && <template slot="prefix">{renderPrefix()}</template>}
        {!!renderSuffix && <template slot="suffix">{renderSuffix()}</template>}
        {!!renderPrepend && (
          <template slot="prepend">{renderPrepend()}</template>
        )}
        {!!renderAppend && <template slot="append">{renderAppend()}</template>}
      </AmountInput>
    )
  },
  [FormItemType.INPUT_NUMBER](this, attrs: InputNumberProps) {
    const { field, textAlign, ...props } = attrs
    props.placeholder ??= '请输入'
    const form = proxyForm(this.form)
    return (
      <el-input-number
        class={{
          'text-left': textAlign === 'left',
          'text-right': textAlign === 'right'
        }}
        v-model={form[field!]}
        {...wrapProps(props)}
      />
    )
  },
  [FormItemType.AUTOCOMPLETE](this, attrs: AutocompletePorps) {
    const { renderPrefix, renderSuffix, renderPrepend, renderAppend } = attrs

    attrs.placeholder ??= '请输入'

    const form = proxyForm(this.form)
    return (
      <el-autocomplete
        {...wrapProps(attrs)}
        vModel={form[attrs.field as string]}
      >
        {!!renderPrefix && <template slot="prefix">{renderPrefix()}</template>}
        {!!renderSuffix && <template slot="suffix">{renderSuffix()}</template>}
        {!!renderPrepend && (
          <template slot="prepend">{renderPrepend()}</template>
        )}
        {!!renderAppend && <template slot="append">{renderAppend()}</template>}
      </el-autocomplete>
    )
  },
  [FormItemType.SELECT](this, attrs: SelectProps) {
    const {
      optionList,
      outputType,
      outputSeparator,
      renderPrefix,
      renderEmpty,
      ...props
    } = attrs
    props.placeholder ??= '请选择'

    const form = proxyForm(this.form)

    let value = form[props.field!]
    if (props.multiple) {
      props.collapseTags ??= true
      if (outputType === 'string' && typeof value === 'string') {
        value = value?.split(outputSeparator ?? ',').filter((v: string) => !!v)
      } else {
        value ??= []
      }
    }
    return (
      <el-select
        value={value}
        onInput={(val?: any | any[]) => {
          if (props.multiple && isArray(val) && outputType === 'string') {
            if (val.length > 0) {
              val = isObject(val[0]) ? val : val.join(outputSeparator ?? ',')
            } else {
              val = ''
            }
          }
          form[props.field!] = val
        }}
        {...wrapProps(props)}
      >
        {optionList?.map((item, index) => {
          return (
            <el-option key={`${item.value}-${index}`} {...wrapProps(item)}>
              {item.render?.(item.label, item.value)}
            </el-option>
          )
        })}
        {!!renderPrefix && <template slot="prefix">{renderPrefix()}</template>}
        {!!renderEmpty && <template slot="empty">{renderEmpty()}</template>}
      </el-select>
    )
  },
  [FormItemType.DATE_PICKER](this, attrs: DatePickerProps) {
    const { field, valueTime, ...props } = attrs

    const isTime = (attrs.type ?? 'date').includes('time')
    if ((attrs.type ?? 'date').includes('range')) {
      props.startPlaceholder ??= isTime ? '开始时间' : '开始日期'
      props.endPlaceholder ??= isTime ? '结束时间' : '结束日期'
      props.defaultTime ??= ['00:00:00', '23:59:59']
    } else {
      props.placeholder ??= isTime ? '选择时间' : '选择日期'
    }

    if (valueTime) {
      props.valueFormat = 'yyyy-MM-dd HH:mm:ss'
    }

    // 默认格式化日期
    props.valueFormat ??= props.format ??= isTime
      ? 'yyyy-MM-dd HH:mm:ss'
      : 'yyyy-MM-dd'

    // 默认不可输入
    props.editable ??= false

    props.pickerOptions = {
      ...props.pickerOptions,
      ...pickerOptions(attrs)
    }

    const form = proxyForm(this.form)

    if (
      ['datetimerange', 'daterange'].includes(attrs.type!) &&
      isArray(field) &&
      field.length === 2
    ) {
      return (
        <el-date-picker
          value={[form[field[0]], form[field[1]]].filter(v => !!v)}
          onInput={(date: string[] | null) => {
            ;[form[field[0]], form[field[1]]] = date ?? []
          }}
          {...wrapProps(props)}
        />
      )
    }
    return (
      <el-date-picker {...wrapProps(props)} vModel={form[field as string]} />
    )
  },
  [FormItemType.TIME_PICKER](this, attrs: TimePickerProps) {
    const { field } = attrs
    attrs.valueFormat ??= 'HH:mm:ss'
    if (attrs.isRange) {
      attrs.startPlaceholder ??= '开始时间'
      attrs.endPlaceholder ??= '结束时间'
    } else {
      attrs.placeholder ??= '选择时间'
    }
    const form = proxyForm(this.form)

    if (attrs.isRange && Array.isArray(field) && field.length === 2) {
      return (
        <el-time-picker
          format={attrs.valueFormat}
          value={[form[field[0]], form[field[1]]].filter(v => !!v)}
          onInput={(date: string[] | null) => {
            ;[form[field[0]], form[field[1]]] = date ?? []
          }}
          {...wrapProps(attrs)}
        />
      )
    }
    return (
      <el-time-picker
        format={attrs.valueFormat}
        {...wrapProps(attrs)}
        vModel={form[field as string]}
      />
    )
  },
  [FormItemType.TIME_SELECT](this, attrs: TimeSelectProps) {
    const { field, onChange, rangeSeparator } = attrs
    if (attrs.isRange) {
      attrs.startPlaceholder ??= '开始时间'
      attrs.endPlaceholder ??= '结束时间'
    } else {
      attrs.placeholder ??= '选择时间'
    }
    const form = proxyForm(this.form)
    if (attrs.isRange) {
      if (!Array.isArray(field) && !Array.isArray(form[field as string])) {
        form[field as string] = []
      }
      if (Array.isArray(field) && field.length !== 2) {
        console.error('[field] 字段必须是两个元素的数组')
      }

      const startTime =
        Array.isArray(field) && field.length === 2
          ? form[field[0]]
          : form[field as string][0]

      const endTime =
        Array.isArray(field) && field.length === 2
          ? form[field[1]]
          : form[field as string][1]
      return (
        <el-row align="middle" type="flex">
          <el-time-select
            maxTime={endTime}
            pickerOptions={attrs.startPickerOptions}
            placeholder={attrs.startPlaceholder}
            value={startTime}
            onChange={(val: string) => {
              onChange?.([val, endTime])
            }}
            onInput={(val: string) => {
              Array.isArray(field) && field.length === 2
                ? (form[field[0]] = val)
                : (form[field as string] = [val, form[field as string][1]])
              if (
                !!endTime &&
                dayjs(`2000-01-01 ${val}`).isSameOrAfter(
                  `2000-01-01 ${endTime}`
                )
              ) {
                Array.isArray(field) && field.length === 2
                  ? (form[field[1]] = undefined)
                  : (form[field as string][1] = undefined)
              }
            }}
          />
          <span style={{ margin: '0 5px' }}>{rangeSeparator ?? '-'}</span>
          <el-time-select
            pickerOptions={{
              minTime: startTime,
              ...(attrs.endPickerOptions ?? {})
            }}
            placeholder={attrs.endPlaceholder}
            style={{ marginLeft: '5px' }}
            value={endTime}
            onChange={(val: string) => {
              onChange?.([startTime, val])
            }}
            onInput={(val: string) => {
              Array.isArray(field) && field.length === 2
                ? (form[field[1]] = val)
                : (form[field as string] = [form[field as string][0], val])
            }}
          />
        </el-row>
      )
    }
    return (
      <el-time-select {...wrapProps(attrs)} vModel={form[field as string]} />
    )
  },
  [FormItemType.SWITCH](this, attrs: SwitchProps) {
    const form = proxyForm(this.form)
    return <el-switch v-model={form[attrs.field!]} {...wrapProps(attrs)} />
  },
  [FormItemType.CHECKBOX](this, attrs: CheckboxProps) {
    const { render } = attrs
    const form = proxyForm(this.form)
    return (
      <el-checkbox v-model={form[attrs.field!]} {...wrapProps(attrs)}>
        {render?.()}
      </el-checkbox>
    )
  },
  [FormItemType.CHECKBOX_GROUP](this, attrs: CheckboxGroupProps) {
    const {
      isCheckboxButton,
      outputType,
      outputSeparator,
      checkboxList,
      field,
      key,
      ...props
    } = attrs
    const Tag = isCheckboxButton ? 'el-checkbox-button' : 'el-checkbox'

    const form = proxyForm(this.form)

    if (form[field!] === undefined) {
      form[field!] = outputType === 'string' ? '' : []
    }
    let value = form[field!]

    if (outputType === 'string' && typeof value === 'string') {
      value = value
        ?.split(outputSeparator ?? ',')
        .filter((v: string) => !!v)
        .map(v => {
          // 判断label的类型，一个列表只能是string或number类型，字符串转换，暂时不支持其他类型
          if (typeof checkboxList?.[0].label === 'number') {
            return Number(v)
          }
          return v
        })
    } else {
      value ??= []
    }

    return (
      <el-checkbox-group
        value={value}
        onInput={(val?: any | any[]) => {
          if (isArray(val) && outputType === 'string') {
            val = val.join(outputSeparator ?? ',')
          }
          form[field!] = val
        }}
        {...wrapProps(props)}
      >
        {checkboxList?.map((item, index) => {
          return (
            <Tag
              key={
                (
                  item[key as keyof typeof item] ??
                  item.label ??
                  ''
                ).toString() +
                '-' +
                index
              }
              {...wrapProps(item)}
            >
              {item.render?.()}
            </Tag>
          )
        })}
      </el-checkbox-group>
    )
  },
  [FormItemType.RADIO](this, attrs: RadioProps) {
    const { render } = attrs
    const form = proxyForm(this.form)
    return (
      <el-radio v-model={form[attrs.field!]} {...wrapProps(attrs)}>
        {render?.()}
      </el-radio>
    )
  },
  [FormItemType.RADIO_GROUP](this, attrs: RadioGroupProps) {
    const { isRadioButton, key, radioList, ...props } = attrs
    const Tag = isRadioButton ? 'el-radio-button' : 'el-radio'
    const form = proxyForm(this.form)

    return (
      <el-radio-group v-model={form[props.field!]} {...wrapProps(props)}>
        {radioList?.map((item, index) => (
          <Tag
            key={
              (item[key as keyof typeof item] ?? item.label ?? '').toString() +
              '-' +
              index
            }
            {...wrapProps(item)}
          >
            {item.render?.()}
          </Tag>
        ))}
      </el-radio-group>
    )
  },
  [FormItemType.CASCADER](this, attrs: CascaderProps) {
    const {
      props,
      multiple,
      checkStrictly,
      emitPath,
      ref,
      getCheckedNodes,
      outputType,
      outputSeparator,
      ...otherAttrs
    } = attrs

    const cascaderProps = {
      ...(props ?? {}),
      multiple: multiple ?? props?.multiple ?? false,
      checkStrictly: checkStrictly ?? props?.checkStrictly ?? false,
      emitPath: emitPath ?? props?.emitPath ?? true
    }

    //多选模式下默认折叠Tag
    otherAttrs.collapseTags ??= true

    let refName = ref
    if (getCheckedNodes) {
      refName =
        ref ?? attrs.prop ?? (!isArray(attrs.field) ? attrs.field : undefined)
    }
    const form = proxyForm(this.form)

    let value: any[] = []
    if (isArray(attrs.field)) {
      attrs.field.forEach((key: string, index: number) => {
        value[index] = form[key]
      })
    } else {
      if (outputType === 'string') {
        value = (form[attrs.field!] ??= '').split(outputSeparator ?? ',')
      } else {
        value = form[attrs.field!] ??= []
      }
    }
    if (isArray(value)) {
      value = value.filter(v => !!v)
    }

    return (
      <el-cascader
        ref={refName}
        value={value}
        onChange={() => {
          if (refName && getCheckedNodes) {
            const node = (this.$refs[refName] as any).getCheckedNodes()
            getCheckedNodes(node)
          }
        }}
        onInput={(val: any[]) => {
          if (isArray(attrs.field)) {
            attrs.field.forEach((key: string, index: number) => {
              form[key] = val[index]
            })
          } else {
            if (outputType === 'string') {
              form[attrs.field!] = val?.join(outputSeparator ?? ',')
            } else {
              form[attrs.field!] = val ?? []
            }
          }
        }}
        {...wrapProps({ ...otherAttrs, props: cascaderProps })}
      />
    )
  },
  [FormItemType.UPLOAD](this, attrs: UploadProps) {
    const form = proxyForm(this.form)
    return <fnb-upload v-model={form[attrs.field!]} {...{ attrs: attrs }} />
  }
}

export default itemContent
