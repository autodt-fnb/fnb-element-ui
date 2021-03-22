import { FnbTableColumn } from 'fnb-element-ui/types/table'
import { isArray, sortBy } from 'lodash'

/**
 * 列表排序
 */
export function sortList(list: FnbTableColumn[], keys: string[]) {
  return sortBy(list, o => keys.findIndex(v => v === o.prop))
}

/** 格式化table字段 */
export function formatTable(table: FnbTableColumn[]) {
  return isArray(table)
    ? table.map((v: any) => {
        const item = { ...v }
        item.align ??= 'center' // 默认居中

        // 如slot是boolean值。则slot名称为prop，否则就是slot值
        if (typeof item.slot === 'string' && !!item.slot) {
          item.prop ??= item.slot
          item.slotName = item.slot
        } else if (item.slot === true) {
          item.slotName = item.prop
        }

        if (item.table) {
          item.table = formatTable(item.table)
        }
        item.showTooltip = item.showOverflowTooltip
        // 防止将slot绑定到 tableColumn上
        Reflect.deleteProperty(item, 'slot')
        Reflect.deleteProperty(item, 'showOverflowTooltip')
        return item
      })
    : []
}
