<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <fnb-date-range v-model="date" :max-width="350" :dateLimit="3" />
    <fnb-plate-number v-model="plateNumber" @change="plateInput" />
    <fnb-iconfont name="icon-xinkehu" size="50" @click="getList" />
    <fnb-select-goods
      v-model="name"
      row-key="id"
      :table="table"
      :tableData="tableData"
    />
    <fnb-table
      ref="table"
      :table="table"
      row-key="date"
      :data="tableData"
      @cell-click="cellClick"
      :current-page.sync="pageNum"
      :page-size.sync="pageSize"
      :total="total"
      autoMaxHeight
      @size-change="getList"
      @current-change="getList"
    >
      <template v-slot:date="{ row }">
        <el-input v-model="row.date" />
      </template>
      <template v-slot:name="{ row }">
        <el-input v-model="row.name" />
      </template>
    </fnb-table>
    <div style="height: 500px" />
    <!-- <el-button @click="clearSelection">clearSelection</el-button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import { FnbTable } from '../types/table'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  date = [undefined, undefined]
  pageNum = 1
  pageSize = 10
  total = 105
  getList() {
    console.log(23423432)
  }
  plateNumber = '皖BHT215'
  name = ''
  table = [
    {
      label: '日期',
      type: 'selection'
    },
    {
      label: '日期',
      table: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        }
      ]
    },
    {
      slot: true,
      prop: 'name1',
      label: '姓名'
    },
    {
      prop: 'address',
      label: '地址',
      showOverflowTooltip: true
    }
  ]

  tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address:
        '上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄，上海市普陀区金沙江路 1518 弄，上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ]

  pickerOptions = {
    onPick(e: any) {
      console.log(e)
    }
  }

  @Ref('table') readonly tableRef!: FnbTable

  mounted() {
    console.log(this.$refs)
    setTimeout(() => {
      this.tableData.push({
        date: '2017-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      })
    }, 3000)
  }

  clearSelection() {
    this.tableRef.clearSelection()
  }

  cellClick(e: any) {
    console.log(e)
  }

  plateInput(e: string) {
    console.log(e)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
