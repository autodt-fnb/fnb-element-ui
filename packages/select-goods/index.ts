import SelectGoods from './src/main.vue'

/* istanbul ignore next */
SelectGoods.install = function (Vue: typeof SelectGoods) {
  Vue.component(SelectGoods.options.name, SelectGoods)
}

export default SelectGoods
