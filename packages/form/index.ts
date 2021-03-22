/*
 * @Author: 陈超
 * @Date: 2021-02-20 23:58:12
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-20 23:58:12
 */
import Form from './src/form.vue'

/* istanbul ignore next */
Form.install = function (Vue: typeof Form) {
  Vue.component(Form.options.name, Form)
}

export default Form
