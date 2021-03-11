/*
 * @Author: 陈超
 * @Date: 2021-03-09 17:52:09
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-09 20:24:37
 */
import SearchForm from './src/search-form.vue'

/* istanbul ignore next */
SearchForm.install = function (Vue: typeof SearchForm) {
  Vue.component(SearchForm.options.name, SearchForm)
}

export default SearchForm
