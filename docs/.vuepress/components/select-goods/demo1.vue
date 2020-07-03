<template>
  <fnb-select-goods
    v-model="name"
    @input="handleInput"
    :table="table"
    :tableData="tableData"
    :categoryList="categoryList"
    :treeProps="treeProps"
    node-key="code"
    row-key="id"
    placeholder="请输入商品名称"
    @row-click="rowClick"
    @selection-change="selectionChange"
    @tree-click="treeClick"
    @cancle="cancle"
    @confirm="confirm"
  ></fnb-select-goods>
</template>

<script>
const dataList = [
  {
    id: 1,
    name: '商品1',
    price: '65',
    num: 6
  },
  {
    id: 2,
    name: '商品2',
    price: '45',
    num: 6
  },
  {
    id: 3,
    name: '商品3',
    price: '45',
    num: 6
  },
  {
    id: 4,
    name: '商品4',
    price: '45',
    num: 98
  },
  {
    id: 5,
    name: '商品5',
    price: '55',
    num: 98
  },
  {
    id: 6,
    name: '商品6',
    price: '65',
    num: 98
  },
  {
    id: 7,
    name: '商品7',
    price: '75',
    num: 98
  }
]
export default {
  data() {
    return {
      /** 商品名称 */
      name: '',
      table: [
        {
          type: 'selection',
          width: '45'
        },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'price',
          label: '价格',
          formatter(row) {
            return row.price + '元'
          }
        },
        {
          prop: 'num',
          label: '数量',
          width: '80'
        }
      ],
      tableData: dataList,
      categoryList: [
        {
          code: '1',
          name: '分类1',
          level: 1,
          child: [
            {
              code: '1-1',
              name: '分类1-1',
              level: 2
            },
            {
              code: '1-2',
              name: '分类1-2',
              level: 2
            }
          ]
        },
        {
          code: '2',
          name: '分类2',
          level: 1,
          child: [
            {
              code: '2-1',
              name: '分类2-1',
              level: 2
            },
            {
              code: '2-2',
              name: '分类2-2',
              level: 2
            }
          ]
        },
        {
          code: '3',
          name: '分类3',
          level: 1,
          child: [
            {
              code: '3-1',
              name: '分类3-1',
              level: 2
            },
            {
              code: '3-2',
              name: '分类3-2',
              level: 2
            }
          ]
        },
        {
          code: '4',
          name: '分类4',
          level: 1,
          child: [
            {
              code: '4-1',
              name: '分类4-1',
              level: 2
            },
            {
              code: '4-2',
              name: '分类4-2',
              level: 2
            }
          ]
        }
      ],
      treeProps: { label: 'name', value: 'code', children: 'child' }
    }
  },
  methods: {
    /** 处理输入商品名称事件 */
    handleInput(name) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 优化 0.5s防抖
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.tableData = name
          ? dataList.filter(v => v.name.includes(name))
          : dataList
      }, 500)
    },
    rowClick(row) {
      console.log('%c当前点击表格行数据：', 'color: #D50000;', row)
    },
    selectionChange(list) {
      console.log('%c当前点击表格selection变化：', 'color: #C51162;', list)
    },
    /** 左边分类点击事件 */
    treeClick(node) {
      console.log('%c当前点击树状分类数据：', 'color: #AA00FF;', node)
    },
    cancle() {
      this.$message.warning('点击了取消按钮')
      console.log('%c点击了取消按钮', 'color: #6200EA;')
    },
    confirm(selection) {
      this.$message.success('点击了确认按钮')
      console.log(
        '%c点击确认按钮，返回selection数据: ',
        'color: #304FFE;',
        selection
      )
    }
  }
}
</script>

<style></style>
