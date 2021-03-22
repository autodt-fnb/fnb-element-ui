/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:04:18
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:04:18
 */
import { VueConstructor } from 'vue'
import Clipboard from './clipboard'

Clipboard.name = 'clipboard'

Clipboard.install = function (Vue: VueConstructor) {
  Vue.directive(Clipboard.name, Clipboard)
}

export default Clipboard
