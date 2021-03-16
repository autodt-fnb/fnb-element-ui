import { VNode } from 'vue'

/** 渲染函数返回值 */
export type Render =
  | JSX.Element
  | VNode
  | string
  | number
  | undefined
  | null
  | Render[]
