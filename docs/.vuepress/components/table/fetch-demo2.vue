<template>
  <div>
    <fnb-table
      ref="table"
      row-key="date"
      :table="table"
      :fetch-api="getList"
      :fetch-params="params"
      :data-prop="dataProp"
      show-table-top
      storage-sort-key="fetch-demo2"
    ></fnb-table>

    <el-button :style="{ marginTop: '20px' }" @click="handleRefresh"
      >刷新数据</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        date: ''
      },
      dataProp: {
        total: 'num',
        records: 'list'
      },
      table: [
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
  },
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: { list: this.tableData, num: 10 } })
        }, 1500)
      })
    },
    handleRefresh() {
      this.$refs.table.getList()
    }
  }
}
</script>
