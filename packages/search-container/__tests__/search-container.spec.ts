/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:02:33
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:02:33
 */
import { mount } from '@vue/test-utils'
import { Card } from 'element-ui'
import SearchContainer from '../src/search-container.vue'

describe('SearchContainer Component', () => {
  it('create', () => {
    const warpper = mount(SearchContainer, {
      components: { [Card.name]: Card }
    })
    expect(warpper.find('.search-container').exists()).toBe(true)
  })

  it('Props:lastFormItem', () => {
    const warpper = mount(SearchContainer, {
      components: { [Card.name]: Card },
      propsData: { lastFormItem: true }
    })
    expect(warpper.find('.search-container').classes()).toContain('card')
  })
})
