import { mount } from '@vue/test-utils'
import { Card } from 'element-ui'
import SearchContainer from '../src/main.vue'

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
