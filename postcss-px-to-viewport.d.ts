import { plugin } from 'postcss'

interface Options {
  unitToConvert?: string,
  viewportWidth?: number,
  viewportHeight?: number, // not now used; TODO: need for different units and math for different properties
  unitPrecision?: number,
  viewportUnit?: string,
  fontViewportUnit?: string,  // vmin is more suitable.
  selectorBlackList?: string[],
  propList?: string[],
  minPixelValue?: number,
  mediaQuery?: boolean,
  replace?: boolean,
  landscape?: boolean,
  landscapeUnit?: string,
  landscapeWidth?: number
}

declare module 'postcss-px-to-viewport' {
  function postcsspxtoviewport(options: Options): plugin
  export default postcsspxtoviewport
}