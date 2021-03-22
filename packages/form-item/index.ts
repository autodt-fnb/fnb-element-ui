/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:58:19
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:58:19
 */
import FormItem from '../form/src/form-item.vue'

/* istanbul ignore next */
FormItem.install = function (Vue: typeof FormItem) {
  Vue.component(FormItem.options.name, FormItem)
}

export default FormItem
