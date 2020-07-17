<template>
  <div class="date-range">
    <el-button-group
      class="button-group"
      v-if="operateBtns && operateBtns.length > 0"
    >
      <el-button
        v-for="key in operateBtns"
        :key="key"
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
      :picker-options="pickerOptions"
      clearable
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import { BtnType } from '../../../types/date-range'
import { DatePickerOptions } from 'element-ui/types/date-picker'

/** 格式化日期 */
function formatDate(date?: Date | Dayjs | string, type?: 'start' | 'end') {
  const suffix =
    type === 'start' ? '00:00:00' : type === 'end' ? '23:59:59' : ''
  return `${dayjs(date).format('YYYY-MM-DD')}${suffix ? ' ' + suffix : ''}`
}

@Component({ name: 'FnbDateRange', components: {} })
export default class DateRange extends Vue {
  @Model('change', { type: Array, default: () => [] }) value!: string[]

  @Prop({ type: String, default: 'yyyy-MM-dd' })
  readonly valueFormat!: string

  /** 是否在日期后面加 时间 */
  @Prop({ type: Boolean }) readonly valueTime!: boolean

  /** 组件显示的最大宽度，默认自适应容器 */
  @Prop({ type: Number }) readonly maxWidth!: number

  @Prop({ type: Object, default: () => ({}) })
  readonly pickerOptions!: DatePickerOptions

  @Prop({
    type: Array,
    default: () => ['today', 'yesterday', 'lastWeek', 'thisWeek', 'thisMonth']
  })
  operateBtns!: BtnType[]

  operate = {
    today: '今日',
    yesterday: '昨日',
    lastWeek: '上周',
    thisWeek: '本周',
    thisMonth: '本月'
  }

  get dateRange() {
    return this.value
  }
  set dateRange(date: (string | Dayjs)[]) {
    if (date?.length !== 2) {
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

  handleClickBtn(type: BtnType) {
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
        this.dateRange = [dayjs().startOf('M'), dayjs().endOf('M')]
        break
    }
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
