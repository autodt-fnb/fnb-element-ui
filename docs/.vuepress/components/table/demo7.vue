<template>
  <fnb-table
    row-key="date"
    :table="table"
    :data="tableData"
    :total="10"
    :page-size.sync="pageSize"
    :current-page.sync="pageNum"
  >
  </fnb-table>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 3,
      pageNum: 1,
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
  },
  computed: {
    table() {
      return [
        {
          prop: 'date',
          label: '日期',
          width: '180',
          render: ({ row }) => {
            return <span style="color: red">{row.date}</span>
          }
        },
        {
          prop: 'name',
          label: '姓名',
          width: '180',
          render: ({ row }) => {
            return <span style="color: green">{row.name}</span>
          }
        },
        {
          prop: 'address',
          label: '地址'
        }
      ]
    }
  }
}
</script>
