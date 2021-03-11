import { FnbTable } from './table'

export declare class FnbRemoteTable extends FnbTable {
  /** 需要请求数据api方法 */
  fetchApi(...arg: any[]): Promise<any>

  /** 数据请求的参数 */
  params: Record<string, any>

  /** 自定义 后端需要的 分页参数名称 */
  pageProp: { pageSize: string; pageNum: string }

  /** 自定义后端返回参数的名称 */
  dataProp: { total: string; records: string }

  /** 自定义存储排序 localStorage key值，默认用 路由 name（当一个路由有多个table时，必须自定义定义一个唯一的key值） */
  storageSortKey: string
}
