import Vue from 'vue'

import './styles/common.scss'
import './styles/reset-element-ui.scss'

import Table from '~/table/index'
import SelectGoods from '~/select-goods'
import Iconfont from '~/iconfont'

const components = [Table, SelectGoods, Iconfont]

const install = function(vue: typeof Vue) {
  components.forEach(component => {
    vue?.component(component.options.name, component)
  })
}

export { Table, SelectGoods }

export default { install }
