/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:03:34
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:03:34
 */
import Table from './src/table.vue'

/* istanbul ignore next */
Table.install = function (Vue: typeof Table) {
  Vue.component(Table.options.name, Table)
}

export default Table
