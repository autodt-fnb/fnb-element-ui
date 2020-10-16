<template>
  <div id="app">
    <FnbSearchContainer>8</FnbSearchContainer>
    <FnbScrollContainer :height="300">
      <FnbAppContainer fixed-height>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <fnb-amount-input v-model="amount" @input="amountInput" />
        <fnb-date-range v-model="date" valueTime showBtns :max-width="350" />
        <fnb-plate-number v-model="plateNumber" @change="plateInput" />
        <fnb-iconfont
          name="icon-xinkehu"
          size="50"
          @click="disabled = !disabled"
        />
        <fnb-select-goods
          v-model="name"
          row-key="id"
          :input-disabled="disabled"
          :table="table"
          :tableData="tableData"
          :tabList="tabList"
          showSelection
          show-tab
          trigger="click"
          :showCancle="true"
          :showConfirm="true"
          :tab-active.sync="tabActive"
          :selection.sync="sectionList"
        >
          <template v-slot:reference>
            <el-button>点击</el-button>
          </template>
        </fnb-select-goods>
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
      </FnbAppContainer>
    </FnbScrollContainer>
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
  disabled = false
  date = []
  pageNum = 1
  pageSize = 10
  total = 105
  amount = 0
  getList() {
    console.log(23423432)
  }
  tabList = [
    {
      label: '服务',
      value: '1'
    },
    {
      label: '商品',
      value: '2'
    }
  ]
  plateNumber = '皖BHT215'
  name = ''
  table = [
    {
      label: '日期',
      type: 'selection',
      hidden: true
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
  sectionList = []

  tabActive = '2'

  tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 '
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

  amountInput(e: string) {
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
}
</style>
