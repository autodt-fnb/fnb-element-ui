import Vue from 'vue'
import { ElementUIComponent } from 'element-ui/types/component'

declare module 'vue/types/vue' {
  // 可以使用 `VueConstructor` 接口
  // 来声明全局 property
  interface VueConstructor {
    install(vue: typeof Vue): void

    options: {
      name: string
    }
  }
}

declare module 'element-ui' {
  export class Scrollbar extends ElementUIComponent {}
}
