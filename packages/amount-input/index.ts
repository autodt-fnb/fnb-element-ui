import AmountInput from './src/main.vue'

/* istanbul ignore next */
AmountInput.install = function (Vue: typeof AmountInput) {
  Vue.component(AmountInput.options.name, AmountInput)
}

export default AmountInput
