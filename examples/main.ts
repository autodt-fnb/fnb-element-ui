import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Fnb from 'fnb-element-ui/lib'
// import 'fnb-element-ui/lib/index.css'
import FnbElementUI from '../src/index'
import VueCompositionApi from '@vue/composition-api'

Vue.use(FnbElementUI)
// console.log(Fnb)
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
Vue.use(VueCompositionApi)
new Vue({
  render: h => h(App)
}).$mount('#app')
