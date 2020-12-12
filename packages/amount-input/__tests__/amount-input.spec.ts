import { mount, ThisTypedMountOptions, createLocalVue } from '@vue/test-utils'
import { Input } from 'element-ui'
import AmountInput from '../src/main.vue'
const localVue = createLocalVue()
localVue.use(Input)

const _mount = (
  options: ThisTypedMountOptions<{ value: string | number } & Vue>
) =>
  mount(
    {
      components: { 'fnb-amount-input': AmountInput },
      ...options
    },
    { localVue }
  )

describe('AmountInput Component', () => {
  it('create', async () => {
    const wrapper = _mount({
      template: `<fnb-amount-input placeholder="请输入" v-model="value" />`,
      data() {
        return {
          value: '1'
        }
      }
    })
    const vm = wrapper.vm
    const inputElm = wrapper.find('input').element as HTMLInputElement
    expect(inputElm.value).toBe('1')
    expect(inputElm.placeholder).toBe('请输入')
    expect(wrapper.find('.el-input__icon').classes()).toContain('amount-icon')

    vm.value = '7845'

    await vm.$nextTick()
    expect(inputElm.value).toBe('7845')
  })

  it('default empty', () => {
    const wrapper = _mount({
      template: `<fnb-amount-input />`
    })
    const inputElm = wrapper.find('input').element as HTMLInputElement
    expect(inputElm.value).toBe('')
  })

  it('disabled', () => {
    const wrapper = _mount({
      template: `<fnb-amount-input disabled />`
    })

    const inputElm = wrapper.find('input').element as HTMLInputElement
    expect(inputElm.disabled).toBe(true)
  })

  it('hidden amount icon', () => {
    const wrapper = _mount({
      template: `<fnb-amount-input :showAmountIcon="false" />`
    })

    expect(wrapper.find('.el-input__prefix').exists()).toBe(false)
  })

  it('format amount', async () => {
    const wrapper = _mount({
      template: `<fnb-amount-input v-model="value" />`,
      data() {
        return {
          value: '444.2365'
        }
      }
    })
    const vm = wrapper.vm
    const inputElm = wrapper.find('input').element as HTMLInputElement

    expect(inputElm.value).toBe(vm.value)
    wrapper.findComponent(Input).vm.$emit('input', inputElm.value)

    await vm.$nextTick()
    expect(vm.value).toBe(444.23)
    expect(inputElm.value).toBe(`${vm.value}`)
  })

  it('min & max', async () => {
    const min = 10
    const max = 100
    const wrapper = _mount({
      template: `<fnb-amount-input v-model="value" :min="min" :max="max" />`,
      data() {
        return {
          min,
          max,
          value: '444.2365'
        }
      }
    })
    const vm = wrapper.vm
    const inputElm = wrapper.find('input').element as HTMLInputElement

    wrapper.findComponent(Input).vm.$emit('input', inputElm.value)
    await vm.$nextTick()
    expect(vm.value).toBe(max)

    inputElm.value = '1'
    wrapper.findComponent(Input).vm.$emit('input', inputElm.value)
    await vm.$nextTick()
    expect(vm.value).toBe(min)
  })

  it('size', () => {
    const wrapper = _mount({
      template: `<fnb-amount-input size="large" />`
    })

    expect(wrapper.find('.el-input--large').exists()).toBe(true)
  })

  it('clearable', async () => {
    const handleClear = jest.fn()
    const wrapper = _mount({
      template: `<fnb-amount-input v-model="value" clearable @clear="handleClear" />`,
      data() {
        return {
          value: '444.2365'
        }
      },
      methods: { handleClear }
    })

    await wrapper.find('input').trigger('focus')
    const vm = wrapper.vm
    await wrapper.findComponent(Input).find('.el-input__clear').trigger('click')
    expect(handleClear).toBeCalledTimes(1)
    expect(vm.value).toEqual('')
  })
})
