import type { CollectionsItem } from '../../../mock/detail/index'
import { service } from '~/utils/request'

interface CollectionResponse {
  collection: CollectionsItem
}

type CollectionReqParams = Pick<CollectionsItem, 'id'>

export function getCollection<T = CollectionResponse>(params: CollectionReqParams): Promise<T> {
  return service.get<any, T>('/api/detail/collection', { params })
}
