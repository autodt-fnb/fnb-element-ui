import dayjs, { ConfigType, OpUnitType } from 'dayjs'
import {
  DatePickerProps,
  PickerShortcuts
} from '@autodt/fnb-element-ui/types/form-item'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import {
  ElDatePicker,
  PickEventHandler,
  Shortcut
} from 'element-ui/types/date-picker'
import { pick } from 'lodash-es'
dayjs.extend(isoWeek)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

const startDate = (date?: ConfigType) =>
  dayjs(date).format('YYYY-MM-DD [00:00:00]')

const endDate = (date?: ConfigType) =>
  dayjs(date).format('YYYY-MM-DD [23:59:59]')

function shortcuts(config: DatePickerProps['pickerShortcuts']) {
  const date: { [i in PickerShortcuts]: Shortcut } = {
    today: {
      text: '今日',
      onClick(picker: ElDatePicker) {
        picker.$emit('pick', [startDate(), endDate()])
      }
    },
    yesterday: {
      text: '昨日',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(1, 'day').toDate()
        const end = dayjs().subtract(1, 'day').toDate()
        picker.$emit('pick', [startDate(start), endDate(end)])
      }
    },
    thisWeek: {
      text: '本周',
      onClick(picker: ElDatePicker) {
        const start = dayjs().isoWeekday(1).toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    lastWeek: {
      text: '上周',
      onClick(picker: ElDatePicker) {
        const weekStart = dayjs().isoWeekday(1).subtract(1, 'w')
        const start = weekStart.toDate()
        const end = weekStart.isoWeekday(7).toDate()
        picker.$emit('pick', [startDate(start), endDate(end)])
      }
    },
    thisMonth: {
      text: '本月',
      onClick(picker: ElDatePicker) {
        const start = dayjs().startOf('M').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    lastMonth: {
      text: '上月',
      onClick(picker: ElDatePicker) {
        const lastMonth = dayjs().subtract(1, 'M')
        const start = lastMonth.startOf('M').toDate()
        const end = lastMonth.endOf('M').toDate()
        picker.$emit('pick', [startDate(start), endDate(end)])
      }
    },
    week: {
      text: '最近一周',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(6, 'd').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    oneMonth: {
      text: '最近一个月',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(1, 'M').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    threeMonth: {
      text: '最近三个月',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(3, 'M').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    halfAYear: {
      text: '最近半年',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(6, 'M').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    },
    year: {
      text: '最近一年',
      onClick(picker: ElDatePicker) {
        const start = dayjs().subtract(1, 'year').toDate()
        picker.$emit('pick', [startDate(start), endDate()])
      }
    }
  }

  if (typeof config === 'boolean' && config) {
    return Object.values(
      pick(date, ['week', 'oneMonth', 'threeMonth', 'halfAYear', 'year'])
    )
  } else if (Array.isArray(config) && config.length > 0) {
    return Object.values(pick(date, config))
  }
  return undefined
}

/** Picker Options */
export function pickerOptions({
  dateLimit,
  endToday,
  startToday,
  isExcludeToDay,
  pickerOptions,
  pickerShortcuts
}: DatePickerProps) {
  /** 记录日期选择最小值 */
  let minDate!: Date | null
  /** 记录日期选择最小值 */
  let maxDate!: Date | null

  /** 日期选择事件 */
  function onPick(date: { minDate: Date; maxDate: Date }) {
    minDate = date.minDate
    maxDate = date.maxDate
  }

  /** 日期禁用选择 */
  function disabledDate(time: Date) {
    let limit!: number
    let type: OpUnitType = 'd'

    if (typeof dateLimit === 'number') {
      limit = parseInt(`${Math.abs(dateLimit)}`)
    } else if (typeof dateLimit === 'object') {
      limit = parseInt(`${Math.abs(dateLimit.limit)}`)
      if (!limit) {
        return false
      }
      type = dateLimit.type ?? 'd'
    }
    // 如 限制范围在5天内，2000-01-01 - 2000-01-05 ，应该是 `+-4` 天
    limit -= 1
    return (
      (!maxDate &&
        !!minDate &&
        !dayjs(time).isBetween(
          dayjs(minDate).subtract(limit, type),
          dayjs(minDate).add(limit, type),
          type,
          '[]'
        )) ||
      (!!endToday &&
        (!!isExcludeToDay
          ? dayjs().isSameOrBefore(time, 'd')
          : dayjs().isBefore(time, 'd'))) ||
      (!!startToday &&
        (!!isExcludeToDay
          ? dayjs().isSameOrAfter(time, 'd')
          : dayjs().isAfter(time, 'd')))
    )
  }

  let onPickEvent!: PickEventHandler
  if (pickerOptions?.onPick) {
    onPickEvent = e => {
      onPick(e)
      pickerOptions?.onPick?.(e)
    }
  } else {
    onPickEvent = onPick
  }

  return {
    onPick: onPickEvent,
    disabledDate: pickerOptions?.disabledDate ?? disabledDate,
    shortcuts: pickerOptions?.shortcuts ?? shortcuts(pickerShortcuts)
  }
}
