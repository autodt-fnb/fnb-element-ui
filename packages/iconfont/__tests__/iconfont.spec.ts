/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:59:05
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:59:05
 */
import { mount } from '@vue/test-utils'
import Iconfont from '../src/iconfont'

describe('Iconfont Component', () => {
  it('name', () => {
    const name = 'plus'
    const wrapper = mount(Iconfont, {
      propsData: { name }
    })
    expect(wrapper.find(`.iconfont`).classes()).toContain('icon-plus')
  })

  it('element icon', () => {
    const name = 'el-icon-plus'
    const wrapper = mount(Iconfont, {
      propsData: { name }
    })
    expect(wrapper.classes()).toContain('el-icon-plus')
  })

  it('size & color', () => {
    const wrapper = mount(Iconfont, {
      propsData: { name: 'icon-plus', size: '16', color: 'rgb(51, 51, 51)' }
    })
    expect(wrapper.element.style.fontSize).toEqual(`16px`)
    expect(wrapper.element.style.color).toEqual(`rgb(51, 51, 51)`)
  })
})
