/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:02:47
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:02:47
 */
import SearchContainer from './src/search-container.vue'

/* istanbul ignore next */
SearchContainer.install = function (Vue: typeof SearchContainer) {
  Vue.component(SearchContainer.options.name, SearchContainer)
}

export default SearchContainer
