export const isUndefined = (value: any) => typeof value === 'undefined'

// 封装同步获取本地与网络时间差值方法
// https://blog.csdn.net/qq_41614928/article/details/112830267?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-112830267-null-null.pc_agg_new_rank&utm_term=axios%E8%8E%B7%E5%8F%96%E8%AF%B7%E6%B1%82%E6%97%B6%E9%97%B4&spm=1000.2123.3001.4430
// https://segmentfault.com/q/1010000007464619
export function getDeltaTime() {
  return new Promise<number>((resolve) => {
    const request = new XMLHttpRequest()

    request.open('GET', '/', true)

    request.onreadystatechange = function () {
      const serverTime = request.getResponseHeader('Date')

      if (serverTime) {
        const deltaTime = Date.parse(serverTime) - new Date().getTime()

        resolve(deltaTime)
      }
      else {
        const deltaTime = 0

        resolve(deltaTime) // 没网情况获取本地时间那么时间差不存在 为 0
      }
    }

    request.send()
  })
}
