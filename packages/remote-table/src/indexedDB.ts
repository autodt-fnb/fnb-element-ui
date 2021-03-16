export default class IndexedDB {
  /** 数据表名称 */
  dbName: string = 'remote-table-sort'

  objectStore!: any

  db!: IDBDatabase

  constructor(name: string) {
    this.dbName = name
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('fnb-element-ui', 1)

      request.onupgradeneeded = (ev: any) => {
        const db = ev.target?.result as IDBDatabase
        if (!db.objectStoreNames.contains(this.dbName)) {
          db.createObjectStore(this.dbName, { keyPath: 'key' })
        }
      }

      request.onsuccess = (ev: any) => {
        this.db = ev.target?.result as IDBDatabase
        resolve(this.db)
      }

      request.onblocked = (ev: any) => {
        this.db = ev.target?.result as IDBDatabase
        resolve(this.db)
      }

      request.onerror = reject
    })
  }

  add(data: any) {
    return this.operate('add', data)
  }

  /** 获取当前表中的某一条数据 */
  get<T = any>(key: string): Promise<T> {
    return this.operate('get', key) as Promise<T>
  }

  put(data: any) {
    return this.operate('put', data)
  }

  private operate(type: 'get' | 'add' | 'put', data: any) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db
        .transaction([this.dbName], type === 'get' ? 'readonly' : 'readwrite')
        .objectStore(this.dbName)
      const request = objectStore[type](data)
      request.onsuccess = (ev: any) => {
        resolve(ev.target.result)
      }
      request.onerror = reject
    })
  }
}
