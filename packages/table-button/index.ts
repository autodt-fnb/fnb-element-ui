/*
 * @Author: 陈超
 * @Date: 2021-03-17 14:09:04
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-17 14:09:26
 */

import TableButton from './src/table-button'

TableButton.install = function (Vue: typeof TableButton) {
  Vue.component(TableButton.options.name, TableButton)
}

export default TableButton
