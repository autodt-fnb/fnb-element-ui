import { createLocalVue, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import Upload from '../src/main.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

interface IDate {
  value?: string | string[]
  fileList: { type?: string; url: string }[]
}

const fileList: IDate['fileList'] = [
  { url: '44.png' },
  { url: '22.mp4', type: 'video' },
  { url: '33.mp3', type: 'audio' }
]

const _mount = (value?: string | string[]) =>
  mount<IDate & Vue>(
    {
      components: { FnbUpload: Upload },
      template: `<fnb-upload v-model="value" :action="action" :fileList="fileList" />`,
      data() {
        return { value, action: 'test-action', fileList: [] }
      }
    },
    {
      localVue
    }
  )

describe('Upload Component', () => {
  it('create', () => {
    const wrapper = _mount()
    expect(wrapper.find('.uploader').exists()).toBe(true)
  })

  it('Props:fileList', async () => {
    const wrapper = _mount()
    wrapper.setData({ fileList })
    const vm = wrapper.vm

    await vm.$nextTick()

    expect(vm.value).toBe(fileList.map(v => v.url).join()) // 字符串

    await wrapper.setData({ fileList: [] })
    await wrapper.setData({ value: [], fileList: fileList })
    expect(vm.value).toEqual(fileList.map(v => v.url)) // 数组

    expect(wrapper.find('audio').exists()).toBe(true) // 音频
    expect(wrapper.find('video').exists()).toBe(true) // 视频
    expect(wrapper.find('img').exists()).toBe(true) // 图片
  })

  it('Event:preview', async () => {
    const handlePreview = jest.fn()
    const wrapper = _mount()
    await wrapper.setData({ fileList })
    await wrapper.findComponent(Upload).setProps({ onPreview: handlePreview })
    const click = () =>
      (wrapper
        .find('.uploader')
        .element.querySelector('.el-icon-zoom-in') as HTMLSpanElement).click()
    click()
    expect(handlePreview).toBeCalled()

    await wrapper.findComponent(Upload).setProps({ onPreview: undefined })
    click()
    await wrapper.vm.$nextTick()
    expect(
      (document.querySelector(
        `img[src="${fileList[0].url}"]`
      ) as HTMLImageElement).src
    ).toContain(fileList[0].url)
  })

  it('Event:remove', async () => {
    const wrapper = _mount()
    await wrapper.setData({ value: [], fileList })
    expect(wrapper.vm.value).toHaveLength(3)
    ;(wrapper
      .find('.uploader')
      .element.querySelector('.el-icon-delete') as HTMLSpanElement).click()

    expect(wrapper.vm.value).toHaveLength(2)
  })
})
