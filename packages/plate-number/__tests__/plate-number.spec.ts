import { mount, ThisTypedMountOptions, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import PlateNumber from '../src/main.vue'
const localVue = createLocalVue()
localVue.use(ElementUI)

function sleep(ms = 130) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const _mount = (options: ThisTypedMountOptions<{ value: string } & Vue>) =>
  mount(
    { components: { 'fnb-plate-number': PlateNumber }, ...options },
    { localVue }
  )

describe('PlateNumber Component', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('create', async () => {
    const wrapper = _mount({ template: `<fnb-plate-number />` })
    expect(wrapper.find('.el-popover__reference').exists()).toBe(true)
    const vm = wrapper.vm
    await wrapper.find('button').trigger('click')
    await vm.$nextTick()
    expect(
      (wrapper.findComponent({ name: 'el-popover' }).vm as any).value
    ).toBe(true)
  })

  it('input', async () => {
    const wrapper = _mount({
      template: `<fnb-plate-number v-model="value" />`,
      data() {
        return {
          value: ''
        }
      }
    })
    const vm = wrapper.vm
    await wrapper.find('button').trigger('click')
    await vm.$nextTick()
    ;(document.querySelectorAll(
      '.plate-number-wrapper > .item'
    )[0] as HTMLDivElement).click()
    await sleep()
    expect(document.hasFocus()).toBe(true)
    await wrapper.find('input').setValue('BCT789')
    await wrapper.find('input').trigger('input')
    expect(vm.value).toBe('皖BCT789')

    await wrapper.find('input').setValue('bcC999')
    await wrapper.find('input').trigger('input')
    expect(vm.value).toBe('皖BCC999')
  })

  it('Event:clear', async () => {
    const handleClear = jest.fn()
    const wrapper = _mount({
      template: `<fnb-plate-number v-model="value" clearable @clear="handleClear" />`,
      data() {
        return {
          value: '皖BCT789'
        }
      },
      methods: { handleClear }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('.el-input__clear').trigger('click')

    expect(handleClear).toBeCalledTimes(1)
    expect(wrapper.vm.value).toEqual('')
  })
})
