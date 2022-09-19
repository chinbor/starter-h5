import type { Table } from 'dexie'
import Dexie from 'dexie'
import { useAppStoreWithOut } from '~/stores/modules/app'

export interface GltfModels {
  fileName: string
  blob: Blob
  expires?: number
}

export class MySubClassedDexie extends Dexie {
  gltfModels!: Table<GltfModels>

  constructor(dbName: string) {
    super(dbName)
    this.version(1).stores({
      gltfModels: 'fileName, blob', // Primary key and indexed props
    })
  }

  private getCurrentTime() {
    return new Date().getTime() + useAppStoreWithOut().deltaTime
  }

  async getByKey(key: string) {
    const records = await this.gltfModels.get(key)

    if (!records)
      return

    if (records.expires) {
      const now = this.getCurrentTime()

      if (now >= records.expires)
        await this.gltfModels.delete(key)
    }

    return this.gltfModels.get(key)
  }

  // 默认不设置过期时间  604980000 为 7天
  updateRecord(_item: Pick<GltfModels, 'fileName' | 'blob'>, _expires?: number) {
    if (_expires) {
      const expires = this.getCurrentTime() + _expires

      const item = { ..._item, ...{ expires } }

      return this.gltfModels.put(item)
    }

    return this.gltfModels.put(_item)
  }
}

export const db = new MySubClassedDexie('modelDatabase')
