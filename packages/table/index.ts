import Table from './src/main.vue'

/* istanbul ignore next */
Table.install = function (Vue: typeof Table) {
  Vue.component(Table.options.name, Table)
}

export default Table
