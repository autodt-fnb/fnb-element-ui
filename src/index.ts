import Vue from 'vue'

import './styles/common.scss'
import './styles/reset-element-ui.scss'

import Table from '~/table/index'
import SelectGoods from '~/select-goods'
import Iconfont from '~/iconfont'
import PlateNumber from '~/plate-number'
import DateRange from '~/date-range'

const components = [Table, SelectGoods, Iconfont, PlateNumber, DateRange]

const install = function(vue: typeof Vue) {
  components.forEach(component => {
    vue?.component(component.options.name, component)
  })
}

export { Table, SelectGoods, Iconfont, PlateNumber, DateRange }

export default { install }
