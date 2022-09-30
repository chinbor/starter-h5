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
  bgIntro: string
  designerIntro: {
    name: string
    desc: string
  }
  workIntro: string
  rightsIntro: string
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
    purchaseNotes: '\t数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。数字产品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以其他任何非法方式进行使用。',
    releaseNotes: {
      content: '\t本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
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
    bgIntro: '\t成都三国灵境科技有限公司，致力于凝聚全球青年力量，打造三国元宇宙全球共创生态。通过元宇宙+三国IP+共创的新理念、新模式、新手段激活三国历史，面向世界弘扬中国文化。\n\t《招募令》系列数字藏品将作为三国灵境共创社区唯一准入凭证，拥有《招募令》数字藏品即拥有共创社区基础权益以及三国数藏平台、三国文创商城等多个共创项目的专属权益。',
    designerIntro: {
      name: 'L Design Studio  &  Hwhawha',
      desc: '设计师L与Hwhawha就读于伦敦艺术大学与中国地质大学，曾获OPPO 2020Renovators - Art Toy 设计未来奖 ，常用传统与新视角碰撞合作展开内容。',
    },
    workIntro: '\t三国时期天下纷争，乱世龙争虎斗，以虎帅天下之滨，以龙绘山河图景，该藏品结合龙与虎的形象特征绘制外形，根据三国时期文物的线条纹理为设计来源构建龙虎令牌，得龙虎符得以调兵遣将，寓意“天下能人争斗，三国设计共创”，一同创造共创共享的交流创作三国文化社区。\n\t在令牌材质选择上，选用玉、铜、木三种材料打磨，整体的视觉效果更贴近真实，正中的篆体风格“令”字被传统纹理底牌花纹承载，更能渲染三国时期氛围。',
    rightsIntro: '\t共创权益：三国灵境共创社区准入资格、共创参与权、贡献收益权、社区选举权、优先体验权。\n\t数藏权益：每月2次优先购、全年至少2次不定期空投、全年至少1次专属空投。\n\t其他权益：所属阵营文创产品9.0折、三国衍生线下消费9.5折。',
    cover: '/images/yuzhi-token.png',
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
    purchaseNotes: '\t数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。数字产品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以其他任何非法方式进行使用。',
    releaseNotes: {
      content: '\t本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
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
    bgIntro: '\t成都三国灵境科技有限公司，致力于凝聚全球青年力量，打造三国元宇宙全球共创生态。通过元宇宙+三国IP+共创的新理念、新模式、新手段激活三国历史，面向世界弘扬中国文化。\n\t《招募令》系列数字藏品将作为三国灵境共创社区唯一准入凭证，拥有《招募令》数字藏品即拥有共创社区基础权益以及三国数藏平台、三国文创商城等多个共创项目的专属权益。',
    designerIntro: {
      name: 'L Design Studio  &  Hwhawha',
      desc: '设计师L与Hwhawha就读于伦敦艺术大学与中国地质大学，曾获OPPO 2020Renovators - Art Toy 设计未来奖 ，常用传统与新视角碰撞合作展开内容。',
    },
    workIntro: '\t三国时期天下纷争，乱世龙争虎斗，以虎帅天下之滨，以龙绘山河图景，该藏品结合龙与虎的形象特征绘制外形，根据三国时期文物的线条纹理为设计来源构建龙虎令牌，得龙虎符得以调兵遣将，寓意“天下能人争斗，三国设计共创”，一同创造共创共享的交流创作三国文化社区。\n\t在令牌材质选择上，选用玉、铜、木三种材料打磨，整体的视觉效果更贴近真实，正中的篆体风格“令”字被传统纹理底牌花纹承载，更能渲染三国时期氛围。',
    rightsIntro: '\t共创权益：三国灵境共创社区准入资格、共创参与权、贡献收益权、社区选举权、优先体验权。\n\t数藏权益：每月2次优先购、全年至少2次不定期空投、全年至少1次专属空投。\n\t其他权益：所属阵营文创产品9.0折、三国衍生线下消费9.5折。',
    cover: '/images/jinshu-token.png',
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
    purchaseNotes: '\t数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满18周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。数字产品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以其他任何非法方式进行使用。',
    releaseNotes: {
      content: '\t本款藏品铸造xxxx份，发行xxxx份，其中有xx份用于平台运营活动，其余全部公开发售',
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
    bgIntro: '\t成都三国灵境科技有限公司，致力于凝聚全球青年力量，打造三国元宇宙全球共创生态。通过元宇宙+三国IP+共创的新理念、新模式、新手段激活三国历史，面向世界弘扬中国文化。\n\t《招募令》系列数字藏品将作为三国灵境共创社区唯一准入凭证，拥有《招募令》数字藏品即拥有共创社区基础权益以及三国数藏平台、三国文创商城等多个共创项目的专属权益。',
    designerIntro: {
      name: 'L Design Studio  &  Hwhawha',
      desc: '设计师L与Hwhawha就读于伦敦艺术大学与中国地质大学，曾获OPPO 2020Renovators - Art Toy 设计未来奖 ，常用传统与新视角碰撞合作展开内容。',
    },
    workIntro: '\t三国时期天下纷争，乱世龙争虎斗，以虎帅天下之滨，以龙绘山河图景，该藏品结合龙与虎的形象特征绘制外形，根据三国时期文物的线条纹理为设计来源构建龙虎令牌，得龙虎符得以调兵遣将，寓意“天下能人争斗，三国设计共创”，一同创造共创共享的交流创作三国文化社区。\n\t在令牌材质选择上，选用玉、铜、木三种材料打磨，整体的视觉效果更贴近真实，正中的篆体风格“令”字被传统纹理底牌花纹承载，更能渲染三国时期氛围。',
    rightsIntro: '\t共创权益：三国灵境共创社区准入资格、共创参与权、贡献收益权、社区选举权、优先体验权。\n\t数藏权益：每月2次优先购、全年至少2次不定期空投、全年至少1次专属空投。\n\t其他权益：所属阵营文创产品9.0折、三国衍生线下消费9.5折。',
    cover: '/images/muzhi-token.png',
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
