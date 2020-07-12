import PlateNumber from './src/main.vue'

/* istanbul ignore next */
PlateNumber.install = function(Vue: typeof PlateNumber) {
  Vue.component(PlateNumber.options.name, PlateNumber)
}

export default PlateNumber
