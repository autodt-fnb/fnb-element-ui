# 媒体上传

可在入口文件中，写入全局默认 action，也可单独在组件调用时写，优先组件调用时传入的 action

```js
import FnbElementUI from '@autodt/fnb-element-ui'
Vue.use(FnbElementUI, { UPLOAD_URL: 'http://xxxxx' })
```

<common-democode title="基本用法">
  <upload-demo1></upload-demo1>
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/upload/demo1.vue
  </highlight-code>
</common-democode>

<upload-attr-desc></upload-attr-desc>
