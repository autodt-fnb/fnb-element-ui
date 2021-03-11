<template>
  <el-popover trigger="manual" placement="bottom-start" v-model="showKeyborad">
    <el-row type="flex" justify="space-around" class="plate-number-wrapper">
      <div
        class="item"
        :class="{ active: province && province.includes(item) }"
        v-for="(item, index) in provincialAbbrev"
        :key="index"
        @click.stop="handleClickItem(item)"
      >
        {{ item }}
      </div>
    </el-row>
    <el-input
      slot="reference"
      ref="input"
      :placeholder="!this.province ? '请先选择省简称' : '请输入车牌号码'"
      :disabled="!this.province"
      maxlength="7"
      @blur="$emit('blur', plateNumber)"
      @focus="$emit('focus', plateNumber)"
      @clear="handleClear"
      v-model="plateOtherConvert"
      :clearable="clearable"
    >
      <el-button slot="prepend" @click.stop="showKeyborad = !showKeyborad">
        <span class="title" :class="{ placeholder: !province }">{{
          province || '省简称'
        }}</span>
        <i class="el-icon-caret-bottom el-icon--right" />
      </el-button>
    </el-input>
  </el-popover>
</template>

<script lang="ts">
/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:01:55
 * @Last Modified by:   陈超
 * @Last Modified time: 2021-02-21 00:01:55
 */

import {
  Vue,
  Component,
  Watch,
  Model,
  Ref,
  Emit,
  Prop
} from 'vue-property-decorator'
import { ElInput } from 'element-ui/types/input'

/**
 * 省简称
 */
const provincialAbbrev = [
  '皖',
  '苏',
  '浙',
  '沪',
  '闽',
  '赣',
  '鄂',
  '湘',
  '桂',
  '琼',
  '京',
  '津',
  '冀',
  '晋',
  '新',
  '蒙',
  '辽',
  '吉',
  '黑',
  '川',
  '渝',
  '云',
  '贵',
  '藏',
  '陕',
  '甘',
  '宁',
  '青',
  '鲁',
  '豫',
  '粤',
  '港',
  '澳',
  '台',
  '警',
  '领',
  '使',
  '学',
  '军',
  'WJ'
]
@Component({ name: 'FnbPlateNumber' })
export default class PlateNumber extends Vue {
  @Model('change', { type: String, default: '' }) readonly value!: string

  /** 可清除按钮显示 */
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean

  /**
   * 车牌号省简称
   */
  province = ''

  /**
   * 除车牌号省简称以外的内容
   */
  plateOther = ''

  /**
   * 是否显示车牌号键盘
   */
  showKeyborad = false

  /**
   * 省简称列表
   */
  provincialAbbrev = provincialAbbrev

  /** 转换大小写 */
  get plateOtherConvert() {
    return this.plateOther
  }
  set plateOtherConvert(value: string) {
    value = value.toUpperCase().replace(/[^0-9A-Z]/g, '')
    this.plateOther = value
  }

  /** 车牌号码 */
  get plateNumber() {
    return this.province + this.plateOther
  }
  set plateNumber(value: string) {
    if (typeof value !== 'string') {
      value = ''
    }
    let sub = 1
    // 兼容WJ
    if (value.indexOf('WJ') === 0) {
      ;/^[A-Za-z0-9]$/.test(value.substring(2, 3)) ? (sub = 2) : (sub = 3)
    }
    this.province = value.substring(0, sub)
    this.plateOther = value.substring(sub).toUpperCase()
  }

  @Ref('input') readonly inputRef!: ElInput

  @Watch('value')
  watchValue(value: string) {
    if (this.plateNumber !== value) {
      this.plateNumber = this.value
    }
  }

  @Watch('plateNumber')
  watchplateNumber(value: string) {
    this.$emit('change', value)
  }

  @Watch('showKeyborad')
  watchShowKeyborad(value: boolean) {
    if (value) {
      document.addEventListener('click', this.clickEvent)
    } else {
      document.removeEventListener('click', this.clickEvent)
    }
  }

  created() {
    this.plateNumber = this.value
  }

  beforeDestroy() {
    document.removeEventListener('click', this.clickEvent)
  }

  /** 监听点击事件 */
  clickEvent() {
    this.showKeyborad = false
  }

  handleClickItem(pro: string) {
    // 兼容 WJ
    if (pro === 'WJ') {
      if (this.province.includes('WJ')) {
        this.province = this.province.replace('WJ', '')
      } else {
        this.province = pro
      }
    } else {
      if (this.province.includes('WJ')) {
        this.province = `WJ${pro}`
      } else {
        this.province = pro
      }

      this.showKeyborad = false
      setTimeout(() => {
        this.inputRef.focus()
      }, 100)
    }
  }

  /** 处理点击清理按钮 */
  @Emit('clear')
  handleClear() {
    this.plateNumber = ''
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  color: #c2c2c2;
}

.title {
  display: inline-block;
  text-align: center;
  width: 3em;
}

.plate-number-wrapper {
  flex-wrap: wrap;
  width: 290px;
  padding: 0 5px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;

  & > .item {
    margin: 7px 2px;
    width: 30px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    color: #413839;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px #dcdfe6;
    cursor: pointer;

    &.active {
      color: #fff;
      background-color: #409eff;
    }
  }
}
::v-deep {
  .el-input-group__prepend {
    color: #413839;
    background-color: #fff;
  }
}
</style>
