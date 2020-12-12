import ScrollContainer from './src/main.vue'

/* istanbul ignore next */
ScrollContainer.install = function (Vue: typeof ScrollContainer) {
  Vue.component(ScrollContainer.options.name, ScrollContainer)
}

export default ScrollContainer
