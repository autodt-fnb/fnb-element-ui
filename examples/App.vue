<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <fnb-select-goods
      v-model="name"
      row-key="id"
      :table="table"
      :tableData="tableData"
    />
    <fnb-table
      ref="table"
      :table="table"
      :row-key="'date'"
      no-card
      :data="tableData"
      @cell-click="cellClick"
    >
      <template v-slot:date="{ row }">
        <el-input v-model="row.date" />
      </template>
      <template v-slot:name="{ row }">
        <el-input v-model="row.name" />
      </template>
    </fnb-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  name = ''
  table = [
    {
      label: '日期',
      slot: 'date'
    },
    {
      slot: true,
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'address',
      label: '地址'
    }
  ]

  tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
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

  cellClick(e: any) {
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
