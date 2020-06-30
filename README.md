# fnb-element-ui

## 基于 Element UI 组件封装的适用于本公司业务逻辑通用组件

### 使用实例

```js
// main.js
import Vue from 'vue'

import FnbElementUi from '@autodt/fnb-element-ui'
import '@autodt/fnb-element-ui/lib/index.css' // css文件要在下面
Vue.use(FnbElementUi)
```

```vue
<template>
  <fnb-table v-model="name" row-key="id" :table="table" :tableData="tableData">
  </fnb-table>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      table: [],
      tableData: []
    }
  }
}
</script>
```
