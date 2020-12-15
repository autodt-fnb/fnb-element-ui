import { VueConstructor } from 'vue'
import Clipboard from './clipboard'

Clipboard.name = 'clipboard'

Clipboard.install = function (Vue: VueConstructor) {
  Vue.directive(Clipboard.name, Clipboard)
}

export default Clipboard
