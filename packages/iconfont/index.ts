/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:58:48
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:58:48
 */
import Iconfont from './src/iconfont'

/* istanbul ignore next */
Iconfont.install = function (Vue: typeof Iconfont) {
  Vue.component(Iconfont.options.name, Iconfont)
}

export default Iconfont
