/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:04:09
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-09 20:23:33
 */
import Vue from 'vue'

import './styles/common.scss'
import './styles/reset-element-ui.scss'

import Clipboard from './directives/clipboard'

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
import Form from '~/form'
import FormItem from '~/form-item'
import { FormItemType } from '~/form/src/item-content'
import SearchForm from '~/search-form'
import RemoteTable from '~/remote-table'

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
  Upload,
  Form,
  FormItem,
  SearchForm,
  RemoteTable
]

const directives = [Clipboard]

const install = function (vue: typeof Vue, options: Record<string, unknown>) {
  // 上传组件，默认action
  vue.prototype.UPLOAD_URL = options?.UPLOAD_URL
  components.forEach(component => {
    vue?.component(component.options.name, component)
  })

  directives.forEach(directive => {
    vue.directive(directive.name, directive)
  })
}

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
  Upload,
  Form,
  FormItem,
  FormItemType,
  SearchForm,
  RemoteTable
}
