/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:02:28
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:02:28
 */
import ScrollContainer from './src/scroll-container.vue'

/* istanbul ignore next */
ScrollContainer.install = function (Vue: typeof ScrollContainer) {
  Vue.component(ScrollContainer.options.name, ScrollContainer)
}

export default ScrollContainer
