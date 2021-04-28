import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import FnbElementUI from '@autodt/fnb-element-ui/lib'
// import '@autodt/fnb-element-ui/lib/index.css'
import FnbElementUI from '../src/index'

Vue.use(FnbElementUI)
// console.log(Fnb)
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
