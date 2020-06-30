import Vue from 'vue'
import App from './App.vue'

import FnbElementUi from 'fnb-element-ui/lib/fnb-element-ui.common'
import 'fnb-element-ui/lib/index.css'
Vue.use(FnbElementUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
