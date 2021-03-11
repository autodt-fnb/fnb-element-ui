/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:56:18
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-02-20 23:56:41
 */
import DateRange from './src/date-range.vue'

/* istanbul ignore next */
DateRange.install = function (Vue: typeof DateRange) {
  Vue.component(DateRange.options.name, DateRange)
}

export default DateRange
