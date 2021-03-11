/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:02:07
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:02:07
 */
import PlateNumber from './src/plate-number.vue'

/* istanbul ignore next */
PlateNumber.install = function (Vue: typeof PlateNumber) {
  Vue.component(PlateNumber.options.name, PlateNumber)
}

export default PlateNumber
