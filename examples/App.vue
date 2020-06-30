<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <fnb-select-goods
      v-model="name"
      row-key="id"
      :table="table"
      :tableData="tableData"
    />
    <fnb-table />
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
      prop: 'id',
      label: '商品'
    }
  ]

  tableData: any = []

  mounted() {
    setTimeout(() => {
      this.tableData = [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 11
        },
        {
          id: 12
        },
        {
          id: 13
        },
        {
          id: 14
        },
        {
          id: 15
        },
        {
          id: 16
        },
        {
          id: 17
        }
      ]
    }, 3000)
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
