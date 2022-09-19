export interface DownloadRes {
  url: string
  blob: Blob
}

export function downloadFile(url: string): Promise<DownloadRes> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // NOTE: 这里需要设置为 异步加载的代码（true），否则在构建后报异常
    xhr.open('GET', url, true)

    xhr.responseType = 'blob'

    xhr.onload = (_e) => {
      if (xhr.status === 200) {
        const blob = xhr.response

        resolve({
          url,
          blob,
        })
      }
    }

    xhr.onabort = (e) => {
      reject(e)
    }

    xhr.onerror = (e) => {
      reject(e)
    }

    xhr.send()
  })
}
