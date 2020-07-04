import Vue from 'vue'

import { FnbTable } from './table'
import { FnbSelectGoods } from './select-goods'

export function install(vue: typeof Vue): void

/** table 组件 */
export class Table extends FnbTable {}

/** SelectGoods 组件 */
export class SelectGoods extends FnbSelectGoods {}
