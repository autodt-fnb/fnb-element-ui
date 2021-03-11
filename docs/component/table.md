# Table 表格

> 对 element-ui table 组件的二次封装，使用前对 element-ui 的 [table](https://element.eleme.cn/#/zh-CN/component/table) 组件了解。

<common-democode title="基本用法" description="基础的表格展示用法。">
  <table-demo1></table-demo1>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo1.vue
  </highlight-code>
</common-democode>

<common-democode title="无阴影table">
  <table-demo2></table-demo2>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo2.vue
  </highlight-code>
</common-democode>

<common-democode title="多选" description="选择多行数据时使用 <code>el-checkbox</code>。">
  <table-demo3></table-demo3>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo3.vue
  </highlight-code>
</common-democode>

<common-democode title="无分页" description="默认是有分页组件 <code>el-pagination</code>。 ">
  <table-demo4></table-demo4>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo4.vue
  </highlight-code>
</common-democode>

<common-democode title="自定义列内容，slot插槽" description="自定义列的显示内容，可组合其他组件使用。">
  <table-demo5></table-demo5>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo5.vue
  </highlight-code>
</common-democode>

<common-democode title="自定义列内容，render 函数" description="自定义列的显示内容，可组合其他组件使用。">
  <table-demo7></table-demo7>
  <highlight-code slot="codeText" lang="vue">
```
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
      table: [
        {
          label: '日期',
          width: '180',
          render({ row }) {
            return <span style="color: green;">{row.date}</span>
          }
        },
        {
          prop: 'name',
          label: '姓名',
          width: '180',
          render({ row }) {
            return <span style="color: red;">{row.name}</span>
          }
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

```


  </highlight-code>
</common-democode>


<common-democode title="多级表头" description="数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。">
  <table-demo6></table-demo6>
  <highlight-code slot="codeText" lang="vue">
<<< @/.vuepress/components/table/demo6.vue
  </highlight-code>
</common-democode>

<table-attr-desc></table-attr-desc>

```
