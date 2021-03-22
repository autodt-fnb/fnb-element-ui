/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:55:47
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-02-26 00:44:11
 */
import AmountInput from './src/amount-input.vue'

/* istanbul ignore next */
AmountInput.install = function (Vue: typeof AmountInput) {
  Vue.component(AmountInput.options.name, AmountInput)
}

export default AmountInput
