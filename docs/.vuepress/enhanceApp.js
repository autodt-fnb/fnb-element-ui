/**
 * 扩展 VuePress 应用
 */
import pageComponents from '@internal/page-components'
import VueHighlightJS from 'vue-highlight.js'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import vue from 'vue-highlight.js/lib/languages/vue'

import 'highlight.js/styles/atom-one-dark.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import FnbElementUI from '@autodt/fnb-element-ui'
import '@autodt/fnb-element-ui/lib/index.css'

export default ({
  Vue // VuePress 正在使用的 Vue 构造函数
}) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(VueHighlightJS, {
    languages: {
      css,
      javascript,
      vue
    }
  })
  Vue.use(ElementUI, { size: 'small' })
  Vue.use(FnbElementUI, {
    UPLOAD_URL: ''
  })
}
