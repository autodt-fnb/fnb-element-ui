import DateRange from './src/main.vue'

/* istanbul ignore next */
DateRange.install = function(Vue: typeof DateRange) {
  Vue.component(DateRange.options.name, DateRange)
}

export default DateRange
