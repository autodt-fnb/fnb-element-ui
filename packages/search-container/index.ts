import SearchContainer from './src/main.vue'

/* istanbul ignore next */
SearchContainer.install = function (Vue: typeof SearchContainer) {
  Vue.component(SearchContainer.options.name, SearchContainer)
}

export default SearchContainer
