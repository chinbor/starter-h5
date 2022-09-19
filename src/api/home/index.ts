import type { BannerItem } from '../../../mock/home/index'
import { service } from '~/utils/request'

export interface BannersResponse {
  banners: BannerItem[]
}

export interface CollectionsItem {
  id: string
  isSoldOut: boolean
  time: number
  url: string
}

export interface CollectionsResponse {
  page: number
  size: number
  total: number
  list: CollectionsItem[]
}

export interface ReleasesItem {
  id: string
  normalTime: number
  advanceTime: number | null
  url: string
  title: string
  price: number
  limit: number
}

export interface ReleasesResponse {
  page: number
  size: number
  total: number
  list: ReleasesItem[]
}

type ListReqParams = Pick<ReleasesResponse, 'page' | 'size'>

export function getBanners<T = BannersResponse>(): Promise<T> {
  return service.get<any, T>('/api/home/banners')
}

export function getCollections<T = CollectionsResponse>(params: ListReqParams = { page: 1, size: 4 }): Promise<T> {
  return service.get<any, T>('/api/home/collections', {
    params,
  })
}

export function getReleases<T = ReleasesResponse>(params: ListReqParams = { page: 1, size: 4 }): Promise<T> {
  return service.get<any, T>('/api/home/releases', {
    params,
  })
}
