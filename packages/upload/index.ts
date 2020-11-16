import Upload from './src/main.vue'

/* istanbul ignore next */
Upload.install = function(Vue: typeof Upload) {
  Vue.component(Upload.options.name, Upload)
}

export default Upload
