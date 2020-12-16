import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import FnbElementUI from 'fnb-element-ui/lib'
import 'fnb-element-ui/lib/index.css'
// import FnbElementUI from '../src/index'

Vue.use(FnbElementUI)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
