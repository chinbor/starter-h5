import dayJs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useAppStoreWithOut } from '~/stores/modules/app'

dayJs.extend(duration)

// 走网络请求获取网络时间与本地时间的误差
const deltaTime = useAppStoreWithOut().deltaTime

// 24小时 timestamp差值 （ms单位） 3分钟：180000 24小时：86400000
export const deltaTime24h = 86400000

const formatTime = (future: dayJs.Dayjs) => {
  const now = dayJs(new Date().getTime() + deltaTime)

  const diff = future.diff(now)

  return diff
}

const countDown = (futureTime: number, duration = 1000) => {
  const future = dayJs(futureTime)
  const result = ref(formatTime(future))

  let timer: NodeJS.Timer | null = setInterval(() => {
    result.value = formatTime(future)

    if (result.value <= 0) {
      clearInterval(timer as NodeJS.Timer)
      timer = null
    }
  }, duration)

  return result.value
}

export const dayJsFormat = (time: number, formatStr: string | undefined) => {
  return dayJs(time).format(formatStr)
}

const durationFormat = (diff: number, formatStr: string | undefined) => {
  return dayJs.duration(diff).format(formatStr)
}

export const useVerficationCountDown = (seconds: number, duration: number | undefined) => {
  const isSend = ref<boolean>(false)
  const time = ref<number>(seconds)

  const countDown = () => {
    isSend.value = true

    let timer: null | NodeJS.Timer = setInterval(() => {
      if (time.value-- === 0) {
        clearInterval(timer as NodeJS.Timer)
        timer = null
        time.value = seconds
        isSend.value = false
      }
    }, duration)
  }

  return {
    isSend,
    time,
    countDown,
  }
}

export const useCountDown = () => {
  return { countDown, dayJsFormat, durationFormat }
}
