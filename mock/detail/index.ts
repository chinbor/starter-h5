import type { MockMethod, Recordable } from 'vite-plugin-mock'

interface ResParams {
  url: Recordable
  body: Recordable
  query: Recordable
  headers: Recordable
}

interface ReleaseNotes {
  content: string
  tags: {
    icon: string
    name: string
  }[]
}

export interface CollectionsItem {
  id: string
  price: number
  isSoldOut: false
  advanceTime: number | null
  normalTime: number
  modelUrls: string[]
  name: string
  numbers: number
  imgs: string[]
  purchaseNotes: string
  releaseNotes: ReleaseNotes
  cover: string
  type: number
}

interface Collections {
  [key: string]: CollectionsItem
}

const collections: Collections = {
  1: {
    id: '1',
    price: 99.9,
    isSoldOut: false,
    advanceTime: null,
    normalTime: 1663646400000,
    modelUrls: ['/models/yuzhi-token-processed.glb'],
    type: 2,
    name: '共创招募令 · 玉',
    numbers: 9999,
    imgs: [
      'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/5313576/pexels-photo-5313576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/9909478/pexels-photo-9909478.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ],
    purchaseNotes: '数字藏品为虚拟数宇商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
    releaseNotes: {
      content: '本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
      tags: [
        {
          name: '唯一编号',
          icon: 'detail-unique-numbers',
        },
        {
          name: '永久存证',
          icon: 'detail-pergment-save',
        },
        {
          name: '不可复制',
          icon: 'detail-not-copy',
        },
        {
          name: '不可篡改',
          icon: 'detail-not-modifed',
        },
      ],
    },
    cover: 'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  2: {
    id: '2',
    price: 99.9,
    isSoldOut: false,
    advanceTime: null,
    normalTime: 1663646400000,
    modelUrls: ['/models/jinshu-token-processed.glb'],
    type: 2,
    name: '共创招募令 · 金',
    numbers: 9999,
    imgs: [
      'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/5313576/pexels-photo-5313576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/9909478/pexels-photo-9909478.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ],
    purchaseNotes: '数字藏品为虚拟数宇商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
    releaseNotes: {
      content: '本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
      tags: [
        {
          name: '唯一编号',
          icon: 'detail-unique-numbers',
        },
        {
          name: '永久存证',
          icon: 'detail-pergment-save',
        },
        {
          name: '不可复制',
          icon: 'detail-not-copy',
        },
        {
          name: '不可篡改',
          icon: 'detail-not-modifed',
        },
      ],
    },
    cover: 'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  3: {
    id: '3',
    price: 99.9,
    isSoldOut: false,
    advanceTime: null,
    normalTime: 1663646400000,
    modelUrls: ['/models/muzhi-token-processed.glb'],
    name: '共创招募令 · 木',
    numbers: 9999,
    type: 2,
    imgs: [
      'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/5313576/pexels-photo-5313576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/9909478/pexels-photo-9909478.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ],
    purchaseNotes: '数字藏品为虚拟数宇商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
    releaseNotes: {
      content: '本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
      tags: [
        {
          name: '唯一编号',
          icon: 'detail-unique-numbers',
        },
        {
          name: '永久存证',
          icon: 'detail-pergment-save',
        },
        {
          name: '不可复制',
          icon: 'detail-not-copy',
        },
        {
          name: '不可篡改',
          icon: 'detail-not-modifed',
        },
      ],
    },
    cover: 'https://images.pexels.com/photos/10311898/pexels-photo-10311898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
}

export default [
  // 首页 banner 区
  {
    url: '/api/detail/collection',
    method: 'get',
    timeout: 1000,
    response: ({ query }: ResParams) => {
      const { id } = query

      return {
        code: 0,
        message: null,
        success: true,
        data: {
          collection: collections[id],
        },
      }
    },
  },
] as MockMethod[]
