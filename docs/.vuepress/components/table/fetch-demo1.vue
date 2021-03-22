<template>
  <fnb-table
    row-key="date"
    :table="table"
    :fetch-api="getList"
    :fetch-params="params"
    show-table-top
    storage-sort-key="fetch-demo1"
  ></fnb-table>
</template>

<script>
export default {
  data() {
    return {
      params: {
        date: ''
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
        },
        {
          prop: 'operate',
          label: '操作',
          render: () => {
            return (
              <span>
                <fnb-table-button>查看</fnb-table-button>
                <fnb-table-button>编辑</fnb-table-button>
                <fnb-table-button>确认</fnb-table-button>
              </span>
            )
          }
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
          resolve({ data: { records: this.tableData, total: 10 } })
        }, 1500)
      })
    }
  }
}
</script>
