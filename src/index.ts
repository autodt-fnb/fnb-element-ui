import Vue from 'vue'

import './styles/common.scss'
import './styles/reset-element-ui.scss'

import Table from '~/table/index'
import SelectGoods from '~/select-goods'
import Iconfont from '~/iconfont'
import PlateNumber from '~/plate-number'
import DateRange from '~/date-range'
import AppContainer from '~/app-container'
import SearchContainer from '~/search-container'
import ScrollConatiner from '~/scroll-container'
import AmountInput from '~/amount-input'
import Upload from '~/upload'

const components = [
  Table,
  SelectGoods,
  Iconfont,
  PlateNumber,
  DateRange,
  AppContainer,
  SearchContainer,
  ScrollConatiner,
  AmountInput,
  Upload
]

const install = function (vue: typeof Vue, options: Record<string, unknown>) {
  // 上传组件，默认action
  vue.prototype.UPLOAD_URL = options?.UPLOAD_URL
  components.forEach(component => {
    vue?.component(component.options.name, component)
  })
}

// export {
//   Table,
//   SelectGoods,
//   Iconfont,
//   PlateNumber,
//   DateRange,
//   AppContainer,
//   SearchContainer,
//   ScrollConatiner,
//   AmountInput,
//   Upload
// }

export default {
  install,
  Table,
  SelectGoods,
  Iconfont,
  PlateNumber,
  DateRange,
  AppContainer,
  SearchContainer,
  ScrollConatiner,
  AmountInput,
  Upload
}
