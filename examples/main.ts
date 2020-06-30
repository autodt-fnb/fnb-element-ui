import Vue from 'vue'
import App from './App.vue'

import FnbElementUi from '../lib/fnb-element-ui.common.js'
import '../lib/fnb-element-ui.css'
console.log(FnbElementUi)
Vue.use(FnbElementUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
