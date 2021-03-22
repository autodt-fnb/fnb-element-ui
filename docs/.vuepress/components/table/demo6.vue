<template>
  <fnb-table
    row-key="date"
    :table="table"
    :data="tableData"
    :total="10"
    :page-size.sync="pageSize"
    :current-page.sync="pageNum"
  >
    <template v-slot:date="{ row }">
      <span style="color: red">{{ row.date }}</span>
    </template>
    <template v-slot:name="{ row }">
      <span style="color: green">{{ row.name }}</span>
    </template>
  </fnb-table>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 3,
      pageNum: 1,
      table: [
        {
          slot: 'date',
          label: '日期',
          width: '180'
        },
        {
          slot: true,
          prop: 'name',
          label: '姓名',
          width: '180'
        },
        {
          label: '信息',
          width: '180',
          table: [
            {
              label: '性别',
              prop: 'sex'
            },
            {
              label: '身高',
              prop: 'height'
            }
          ]
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
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          height: '180'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex: '男',
          height: '180'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          sex: '男',
          height: '180'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          sex: '男',
          height: '180'
        }
      ]
    }
  }
}
</script>
