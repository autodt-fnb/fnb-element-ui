import Vue from 'vue'

import { FnbTable } from './table'
import { FnbSelectGoods } from './select-goods'
import { FnbIconfont } from './iconfont'
import { FnbPlateNumber } from './plate-number'
import { FnbUpload } from './upload'
import { FnbForm } from './form'
import { FnbFormItem } from './form-item'

export { FormItemType } from '../packages/form/src/item-content'

export function install(vue: typeof Vue): void

/** table 组件 */
export class Table extends FnbTable {}

/** SelectGoods 组件 */
export class SelectGoods extends FnbSelectGoods {}

/** Iconfont 组件 */
export class Iconfont extends FnbIconfont {}

/** PlateNumber 组件 */
export class PlateNumber extends FnbPlateNumber {}

/** Upload 组件 */
export class Upload extends FnbUpload {}

/** Form 组件 */
export class Form extends FnbForm {}

/** FormItem 组件 */
export class FormItem extends FnbFormItem {}
