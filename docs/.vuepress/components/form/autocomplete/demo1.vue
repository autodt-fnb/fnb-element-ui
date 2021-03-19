<template>
  <FnbForm v-model="form" :cols="2">
    <FnbFormItem :listItems="listItems"></FnbFormItem>
  </FnbForm>
</template>

<script>
import { FormItemType } from '@autodt/fnb-element-ui'

export default {
  components: {},
  data() {
    return {
      form: {},
      restaurants: this.loadAll(),
      listItems: [
        {
          formType: FormItemType.AUTOCOMPLETE,
          prop: 'input1',
          fetchSuggestions: this.querySearch,
          itemLabel: '基本使用'
        }
      ]
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants ?? []
      // 调用 callback 返回建议列表的数据
      console.log('666', results)
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
    }
  }
}
</script>
