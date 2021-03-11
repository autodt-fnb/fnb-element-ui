/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:03:15
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:03:15
 */
import SelectGoods from './src/select-goods.vue'

/* istanbul ignore next */
SelectGoods.install = function (Vue: typeof SelectGoods) {
  Vue.component(SelectGoods.options.name, SelectGoods)
}

export default SelectGoods
