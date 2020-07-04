import Iconfont from './src/main'

/* istanbul ignore next */
Iconfont.install = function(Vue: typeof Iconfont) {
  Vue.component(Iconfont.options.name, Iconfont)
}

export default Iconfont
