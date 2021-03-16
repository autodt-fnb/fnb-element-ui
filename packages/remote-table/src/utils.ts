import { FnbTableColumn } from '@autodt/fnb-element-ui/types/table'
import { sortBy } from 'lodash-es'

/**
 * 列表排序
 */
export function sortList(list: FnbTableColumn[], keys: string[]) {
  return sortBy(list, o => keys.findIndex(v => v === o.prop))
}
