/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:53:47
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:53:47
 */
import AppContainer from './src/app-container.vue'

/* istanbul ignore next */
AppContainer.install = function (Vue: typeof AppContainer) {
  Vue.component(AppContainer.options.name, AppContainer)
}

export default AppContainer
