<template>
  <div class="date-range">
    <el-button-group
      class="button-group"
      v-if="showBtns && operateBtns && operateBtns.length > 0"
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
      :value-format="valueTime ? 'yyyy-MM-dd HH:mm:ss' : valueFormat"
      :picker-options="cusPickerOptions"
      :default-time="valueTime ? ['00:00:00', '23:59:59'] : undefined"
      :disabled="disabled"
      :clearable="clearable"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
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

  /** 开始日期占位符 */
  @Prop({ type: String, default: '开始日期' })
  readonly startPlaceholder!: string

  /** 结束日期占位符 */
  @Prop({ type: String, default: '结束日期' })
  readonly endPlaceholder!: string

  /** 是否在日期后面加 时间 */
  @Prop({ type: Boolean }) readonly valueTime!: boolean

  /** 组件显示的最大宽度，默认自适应容器 */
  @Prop({ type: Number }) readonly maxWidth!: number

  @Prop({ type: Object, default: () => ({}) })
  readonly pickerOptions!: DatePickerOptions

  /** 是否显示按钮组 */
  @Prop(Boolean) readonly showBtns!: boolean

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
    this.$emit('change', date)
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

  /** 格式化日期 */
  formatDate(dateRange: dayjs.Dayjs[]) {
    let date: string[] = []
    if (this.valueTime) {
      date = [
        dateRange[0].format('YYYY-MM-DD 00:00:00'),
        dateRange[1].format('YYYY-MM-DD 23:59:59')
      ]
    } else {
      date = [
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD')
      ]
    }
    return date
  }

  handleClickBtn(type: BtnType) {
    this.dateType = btnTypeMap[type]
    this.$emit('btnClick', btnTypeMap[type])
    switch (type) {
      case 'today':
        this.dateRange = this.formatDate([dayjs(), dayjs()])
        break
      case 'yesterday':
        this.dateRange = this.formatDate([
          dayjs().subtract(1, 'd'),
          dayjs().subtract(1, 'd')
        ])
        break
      case 'lastWeek':
        this.dateRange = this.formatDate([
          dayjs()
            .startOf('w')
            .subtract(6, 'd'),
          dayjs().startOf('w')
        ])
        break
      case 'thisWeek':
        this.dateRange = this.formatDate([
          dayjs()
            .startOf('w')
            .add(1, 'd'),
          dayjs()
            .endOf('w')
            .add(1, 'd')
        ])
        break
      case 'thisMonth':
        this.dateRange = this.formatDate([dayjs().startOf('M'), dayjs()])
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
