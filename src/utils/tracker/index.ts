import sensors from 'sa-sdk-javascript'

function init() {
  const url = import.meta.env.VITE_TRACK_URL
  const showLog = import.meta.env.MODE === 'development'

  sensors.init({
    server_url: url,
    // 表示是否开启单页面自动采集 $pageview 功能，SDK 会在 url 改变之后自动采集web页面浏览事件 $pageview。单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    is_track_single_page: true,
    // 不适用客户端时间
    use_client_time: false,
    // 发送方式 ajax
    send_type: 'ajax',
    heatmap: {
      // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'not_collect',
      // 是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'not_collect',
    },
    // 开启调试
    show_log: showLog,
    // 开启 cookie 加密配置，默认 false
    encrypt_cookie: true,
    // 开启批量发送数据（防止请求过多）
    batch_send: {
      datasend_timeout: 6000, // 一次请求超过多少毫秒的话自动取消，防止请求无响应。
      send_interval: 6000, // 间隔多少毫秒发一次数据。
      one_send_max_length: 6, // 一次请求最大发送几条数据，防止数据太大，v1.15.21 及以上版本不支持 one_send_max_length 参数。
    },
  })
}

// 登录或者注册后需要传入 返回的 id，默认情况神策会给用户自动生成 唯一id并存入 cookie中
function login(id: string) {
  sensors.login(id)
}

// 后续可以自定义事件在此
// function $pageView(params) {
//   sensors.track('$customPageView', params)
// }

export const tracker = {
  init,
  login,
  // $pageView,
}
