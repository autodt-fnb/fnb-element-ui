import { mount, createLocalVue } from '@vue/test-utils'
import { Scrollbar } from 'element-ui'
import ScrollContainer from '../src/main.vue'
const localVue = createLocalVue()
localVue.use(Scrollbar)
const _mount = (propsData?: any) =>
  mount(ScrollContainer, { localVue, propsData })

describe('ScrollContainer Component', () => {
  it('create', () => {
    const wrapper = _mount()
    expect(wrapper.classes()).toContain('el-scrollbar')
    expect(wrapper.classes()).toContain('no-scroll-x')
  })

  it('height', () => {
    const wrapper = _mount({ height: 200 })
    expect(wrapper.element.style.height).toBe('200px')
  })

  it('scrollY => false', () => {
    const wrapper = _mount({ scrollY: false })
    expect(wrapper.classes()).toContain('no-scroll-y')
  })

  it('scrollX => true', () => {
    const wrapper = _mount({ scrollX: true })
    expect(wrapper.classes().includes('no-scroll-x')).toBe(false)
  })
})
