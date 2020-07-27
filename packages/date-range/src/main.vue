<template>
  <div class="date-range">
    <el-button-group
      class="button-group"
      v-if="operateBtns && operateBtns.length > 0"
    >
      <el-button
        v-for="key in operateBtns"
        :key="key"
        :disabled="disabled"
        @click="handleClickBtn(key)"
        >{{ operate[key] }}</el-button
      >
    </el-button-group>
    <el-date-picker
      :style="{ maxWidth: `${maxWidth}px` }"
      class="date-picker"
      v-model="dateRange"
      type="daterange"
      :value-format="valueFormat"
      :picker-options="cusPickerOptions"
      :disabled="disabled"
      clearable
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, PropSync } from 'vue-property-decorator'
import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import { BtnType } from '../../../types/date-range'
import {
  DatePickerOptions,
  PickEventHandler
} from 'element-ui/types/date-picker'

const btnTypeMap: { [i in BtnType]: number } = {
  today: 1,
  yesterday: 2,
  lastWeek: 3,
  thisWeek: 4,
  thisMonth: 5
}

/** 格式化日期 */
function formatDate(date?: Date | Dayjs | string, type?: 'start' | 'end') {
  const suffix =
    type === 'start' ? '00:00:00' : type === 'end' ? '23:59:59' : ''
  return `${dayjs(date).format('YYYY-MM-DD')}${suffix ? ' ' + suffix : ''}`
}

@Component({ name: 'FnbDateRange', components: {} })
export default class DateRange extends Vue {
  @Model('change', { type: Array, default: () => [] }) value!: string[]

  /** 当前按钮日期类型 */
  @PropSync('type', { type: [Number, String] }) dateType!:
    | string
    | number
    | undefined

  @Prop({ type: String, default: 'yyyy-MM-dd' })
  readonly valueFormat!: string

  /** 是否在日期后面加 时间 */
  @Prop({ type: Boolean }) readonly valueTime!: boolean

  /** 组件显示的最大宽度，默认自适应容器 */
  @Prop({ type: Number }) readonly maxWidth!: number

  @Prop({ type: Object, default: () => ({}) })
  readonly pickerOptions!: DatePickerOptions

  /** 快捷操作按钮组 显示 */
  @Prop({
    type: Array,
    default: () => ['today', 'yesterday', 'lastWeek', 'thisWeek', 'thisMonth']
  })
  operateBtns!: BtnType[]

  /** 日期限制范围 */
  @Prop({ type: [Number, Object] }) readonly dateLimit!:
    | number
    | { limit: number; type?: OpUnitType }

  /** 是否不能选择超过今日的日期 */
  @Prop({ type: Boolean, default: true }) readonly endToday!: boolean

  /** 是否禁止选择日期 */
  @Prop({ type: Boolean }) readonly disabled!: boolean

  /** 是否可清除 */
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean

  operate = {
    today: '今日',
    yesterday: '昨日',
    lastWeek: '上周',
    thisWeek: '本周',
    thisMonth: '本月'
  }

  get dateRange() {
    return this.value?.filter(v => !!v) ?? []
  }
  set dateRange(date: (string | Dayjs)[]) {
    date = date?.filter(v => !!v) ?? []

    if (date.length !== 2) {
      this.minDate = null
      this.$emit('change', [])
      return
    }
    if (this.valueFormat === 'yyyy-MM-dd HH:mm:ss' || this.valueTime) {
      this.$emit('change', [
        formatDate(date[0], 'start'),
        formatDate(date[1], 'end')
      ])
    } else {
      this.$emit('change', [formatDate(date[0]), formatDate(date[1])])
    }
  }

  get cusPickerOptions() {
    const options = this.pickerOptions
    let onPick!: PickEventHandler

    if (options.onPick) {
      onPick = e => {
        this.onPick(e)
        options.onPick?.(e)
      }
    } else {
      onPick = this.onPick
    }
    if (!options.disabledDate) {
      options.disabledDate = this.disabledDate
    }
    return { ...options, onPick }
  }

  handleClickBtn(type: BtnType) {
    this.dateType = btnTypeMap[type]
    this.$emit('btnClick', btnTypeMap[type])
    switch (type) {
      case 'today':
        this.dateRange = [dayjs(), dayjs()]
        break
      case 'yesterday':
        this.dateRange = [dayjs().subtract(1, 'd'), dayjs().subtract(1, 'd')]
        break
      case 'lastWeek':
        this.dateRange = [
          formatDate(
            dayjs()
              .startOf('w')
              .subtract(6, 'd')
          ),
          formatDate(dayjs().startOf('w'))
        ]
        break
      case 'thisWeek':
        this.dateRange = [
          dayjs()
            .startOf('w')
            .add(1, 'd'),
          dayjs()
            .endOf('w')
            .add(1, 'd')
        ]
        break
      case 'thisMonth':
        this.dateRange = [dayjs().startOf('M'), dayjs()]
        break
    }
  }

  /** 记录日期选择最小值 */
  minDate!: Date | null
  /** 日期选择事件 */
  onPick({ minDate }: { minDate: Date }) {
    this.dateType = undefined
    this.minDate = minDate
  }

  /** 日期禁用选择 */
  disabledDate(time: Date) {
    // 未设置限制天数
    if (!this.dateLimit || !this.minDate) {
      if (this.endToday) {
        return dayjs().isBefore(time, 'd')
      }
      return false
    }

    let limit!: number
    let type: OpUnitType = 'd'

    if (typeof this.dateLimit === 'number') {
      limit = this.dateLimit
    } else if (typeof this.dateLimit === 'object') {
      limit = parseInt(`${Math.abs(this.dateLimit.limit)}`)
      if (!limit) {
        return false
      }
      type = this.dateLimit.type ?? 'd'
    }
    return (
      dayjs(this.minDate)
        .subtract(limit, type)
        .isAfter(time, type) ||
      (this.endToday
        ? dayjs(this.minDate)
            .add(limit, type)
            .isAfter(dayjs())
          ? dayjs().isBefore(time, type)
          : dayjs(this.minDate)
              .add(limit, type)
              .isBefore(time)
        : dayjs(this.minDate)
            .add(limit, type)
            .isBefore(time))
    )
  }
}
</script>

<style lang="scss" scoped>
.date-range {
  display: flex;
}

.button-group {
  margin-right: 15px;
}

.date-picker {
  flex: 1;
  min-width: 250px;
}
</style>
