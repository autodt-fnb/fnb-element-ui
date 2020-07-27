import AppContainer from './src/main.vue'

/* istanbul ignore next */
AppContainer.install = function(Vue: typeof AppContainer) {
  Vue.component(AppContainer.options.name, AppContainer)
}

export default AppContainer
