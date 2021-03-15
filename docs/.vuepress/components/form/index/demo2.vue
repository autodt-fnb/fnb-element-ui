<template>
  <div>
    <FnbForm ref="form" v-model="form" :cols="cols">
      <FnbFormItem :listItems="listItems"></FnbFormItem>
    </FnbForm>
    <el-row style="margin-bottom: 10px">
      <el-button @click="handleSubmit">验证</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-row>
  </div>
</template>

<script>
import { FormItemType } from '@autodt/fnb-element-ui'

export default {
  components: {},
  data() {
    return {
      form: {},
      cols: 3,
      restaurants: this.loadAll()
    }
  },
  computed: {
    listItems() {
      return [
        {
          formType: FormItemType.RENDER_FORM_CONTENT,
          prop: 'diy',
          itemLabel: '自定义',
          render: form => {
            return <el-input v-model={form.diy} placeholder="我是自定义元素" />
          }
        },
        {
          formType: FormItemType.INPUT,
          itemLabel: '输入框',
          required: true,
          prop: 'input'
        },
        {
          formType: FormItemType.INPUT_NUMBER,
          itemLabel: '数字输入框',
          required: true,
          prop: 'inputNumber'
        },
        {
          formType: FormItemType.AUTOCOMPLETE,
          itemLabel: '建议输入框',
          fetchSuggestions: this.querySearch,
          prop: 'autocomplete'
        },
        {
          formType: FormItemType.SELECT,
          itemLabel: '选择框',
          required: true,
          prop: 'select',
          optionList: [
            {
              value: 1,
              label: '选择1'
            },
            {
              value: 2,
              label: '选择2'
            }
          ]
        },
        {
          formType: FormItemType.DATE_PICKER,
          itemLabel: '日期选择',
          required: true,
          prop: 'datePicker'
        },
        {
          formType: FormItemType.TIME_PICKER,
          itemLabel: '任意时间选择',
          required: true,
          prop: 'timePicker'
        },
        {
          formType: FormItemType.TIME_SELECT,
          itemLabel: '固定时间选择',
          prop: 'timeSelect'
        },
        {
          formType: FormItemType.CASCADER,
          itemLabel: '级联选择',
          options: [
            {
              label: '级联1',
              value: 1,
              children: [
                {
                  label: '级联1-1',
                  value: 1.1
                }
              ]
            },
            {
              label: '级联2',
              value: 2
            }
          ],
          prop: 'cascader'
        },
        {
          formType: FormItemType.SWITCH,
          itemLabel: '开关',
          prop: 'switch'
        },
        {
          formType: FormItemType.CHECKBOX,
          itemLabel: '多选框',
          label: '选择1',
          value: '1',
          prop: 'checkbox'
        },
        {
          formType: FormItemType.CHECKBOX_GROUP,
          itemLabel: '多选框组',
          checkboxList: [
            {
              render: () => '选择1',
              label: 1
            },
            {
              render: () => '选择2',
              label: 2
            }
          ],
          prop: 'checkboxGroup'
        },
        {
          formType: FormItemType.RADIO,
          itemLabel: '单选框',
          label: '单选框',
          value: 1,
          prop: 'radio'
        },
        {
          formType: FormItemType.RADIO_GROUP,
          itemLabel: '单选框组',
          radioList: [
            {
              render: () => '选择1',
              label: 1
            },
            {
              render: () => '选择2',
              label: 2
            }
          ],
          prop: 'radioGroup'
        },
        {
          formType: FormItemType.UPLOAD,
          itemLabel: '上传',
          itemLabelDesc: '>2M',
          prop: 'upload'
        }
      ]
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' }
      ]
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success('验证通过')
        } else {
          this.$message.error('验证不通过')
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
