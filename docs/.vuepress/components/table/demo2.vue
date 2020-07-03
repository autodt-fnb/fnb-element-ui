<template>
  <fnb-table
    row-key="date"
    no-card
    :table="table"
    :data="tableData"
  ></fnb-table>
</template>

<script>
export default {
  data() {
    return {
      table: [
        {
          type: 'index',
          prop: 'index',
          label: '序号',
          width: '80'
        },
        {
          prop: 'date',
          label: '日期',
          width: '180'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '180'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      tableData: [
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
    }
  }
}
</script>
