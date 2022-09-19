import type { MockMethod, Recordable } from 'vite-plugin-mock'

interface ResParams {
  url: Recordable
  body: Recordable
  query: Recordable
  headers: Recordable
}

export interface BannerItem {
  type: number
  url: string
  link?: string
  title?: string
}

const banners: BannerItem[] = [
  {
    type: 1,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    link: 'https://mp.weixin.qq.com/s/o5tgIgeKKGVA-J5qxhKXtg', // iframe链接地址
    title: '招募令', // iframe 顶部 nav 标题名称
  },
  {
    type: 2,
    url: 'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    type: 3,
    url: 'https://zodance.oss-cn-shenzhen.aliyuncs.com/three-kingdoms/dg-collection/home-banner1.svg',
  },
]

const collections = [
  {
    id: '1',
    isSoldOut: false,
    time: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '2',
    isSoldOut: false,
    time: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3',
    isSoldOut: false,
    time: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  // {
  //   id: '4',
  //   isSoldOut: false,
  //   time: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  // },
  // {
  //   id: '5',
  //   isSoldOut: false,
  //   time: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  // },
  // {
  //   id: '6',
  //   isSoldOut: false,
  //   time: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  // },
  // {
  //   id: '7',
  //   isSoldOut: false,
  //   time: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  // },
  // {
  //   id: '8',
  //   isSoldOut: false,
  //   time: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  // },
]

const releases = [
  {
    id: '1',
    normalTime: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '三国武将系列  赵云',
    advanceTime: null,
    price: 19.9,
    limit: 10000,
  },
  {
    id: '2',
    normalTime: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '三国武将系列  赵云',
    advanceTime: null,
    price: 19.9,
    limit: 10000,
  },
  {
    id: '3',
    normalTime: 1663646400000,
    url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '三国武将系列  赵云',
    advanceTime: null,
    price: 19.9,
    limit: 10000,
  },
  // {
  //   id: '4',
  //   normalTime: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: null,
  //   price: 19.9,
  //   limit: 10000,
  // },
  // {
  //   id: '5',
  //   normalTime: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: 1663473600000,
  //   price: 19.9,
  //   limit: 10000,
  // },
  // {
  //   id: '6',
  //   normalTime: 1663646400000, // 8/28
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: 1663473600000,
  //   price: 19.9,
  //   limit: 10000,
  // },
  // {
  //   id: '7',
  //   normalTime: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: null,
  //   price: 19.9,
  //   limit: 10000,
  // },
  // {
  //   id: '8',
  //   normalTime: 1663646400000, // 8/27
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: 1663473600000,
  //   price: 19.9,
  //   limit: 10000,
  // },
  // {
  //   id: '9',
  //   normalTime: 1663646400000,
  //   url: 'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   title: '三国武将系列  赵云',
  //   advanceTime: 1663473600000,
  //   price: 19.9,
  //   limit: 10000,
  // },
]

export default [
  // 首页 banner 区
  {
    url: '/api/home/banners',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        message: null,
        success: true,
        data: {
          banners,
        },
      }
    },
  },
  // 分页（首页 - 数藏精选）
  {
    url: '/api/home/collections',
    method: 'get',
    timeout: 1000,
    response: ({ query }: ResParams) => {
      const { page, size } = query
      const _page = Number(page)
      const _size = Number(size)
      const total = collections.length
      const lastPage = Math.ceil(collections.length / _size)

      let res = []

      if (_page === lastPage)
        res = collections.slice((_page - 1) * _size)

      else
        res = collections.slice((_page - 1) * _size, (_page - 1) * _size + _size)

      return {
        code: 0,
        message: null,
        success: true,
        data: {
          list: res,
          page: _page,
          size: _size,
          total,
        },
      }
    },
  },
  // 分页（首页 - 发售日历）
  {
    url: '/api/home/releases',
    method: 'get',
    timeout: 1000,
    response: ({ query }: ResParams) => {
      const { page, size } = query
      const _page = Number(page)
      const _size = Number(size)
      const total = releases.length
      const lastPage = Math.ceil(releases.length / _size)

      let res = []

      if (_page === lastPage)
        res = releases.slice((_page - 1) * _size)

      else
        res = releases.slice((_page - 1) * _size, (_page - 1) * _size + _size)

      return {
        code: 0,
        message: null,
        success: true,
        data: {
          list: res,
          page: _page,
          size: _size,
          total,
        },
      }
    },
  },
] as MockMethod[]
