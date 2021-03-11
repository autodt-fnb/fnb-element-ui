import { FnbTableColumn } from 'fnb-element-ui/types/table'

/**
 * 列表排序
 */
export function sortList(list: FnbTableColumn[], keys: string[]) {
  return list.sort((firstEl, secondEl) => {
    const firstIndex = keys.findIndex(v => v === firstEl.prop)
    const secondIndex = keys.findIndex(v => v === secondEl.prop)
    if (firstIndex === -1 || secondIndex === -1) {
      return 0
    }
    return firstIndex - secondIndex
  })
}
