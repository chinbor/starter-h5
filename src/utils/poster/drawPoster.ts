import type { QRCodeToDataURLOptions } from 'qrcode'
import QRcode from 'qrcode'
import { Toast } from 'vant'
import EDraw from '../edraw'
import type { DrawCanvasConfig, DrawInstanceOptions } from '../edraw/types'

// NOTE: 增加一个模板配置方法，那么这里需要进行申明
type PosterType = 'jumpDetailPoster'

export interface Options {
  type: PosterType
  canvasOptions: DrawInstanceOptions
  qrcodeOptions: QRCodeToDataURLOptions
}

type ModuleType = {
  [k in PosterType]: (params: Record<string, any>) => DrawCanvasConfig
}

const modulesFiles = import.meta.glob<true, string, any>('./template/*.ts', { eager: true })

// @ts-expect-error let me do it
const modules: ModuleType = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  const value = modulesFiles[modulePath]

  // @ts-expect-error let me do it
  modules[moduleName] = value.default
  return modules
}, {})

export default class DrawPoster extends EDraw {
  constructor(options: DrawInstanceOptions) {
    super(options)
  }

  canvasToDataUrl() {
    return this.canvas.toDataURL('image/png', 1)
  }
}

export async function draw(path: string, options: Options, params: Record<string, any>) {
  const drawPosterInstance = new DrawPoster(options.canvasOptions)

  Toast.loading({
    message: '海报生成中',
    forbidClick: true,
  })

  try {
    try {
      const qrcodeUrl = await QRcode.toDataURL(path, options.qrcodeOptions)

      params = { ...params, qrcodeUrl }

      const instance = await drawPosterInstance.drawByConfig(modules[options.type](params))

      return instance.canvasToDataUrl()
    }
    catch {
      Toast.fail({
        message: '海报绘制失败',
      })
    }
  }
  finally {
    Toast.clear()
  }
}
