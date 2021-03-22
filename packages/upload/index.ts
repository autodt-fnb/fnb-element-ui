/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:04:01
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-22 16:37:55
 */
import Upload from './src/upload.vue'

/* istanbul ignore next */
Upload.install = function (Vue: typeof Upload) {
  Vue.component(Upload.options.name, Upload)
}

export default Upload
