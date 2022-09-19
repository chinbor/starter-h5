import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('~/layout/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('~/views/home/Index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('~/views/detail/Index.vue'),
    meta: {
      title: '详情',
    },
  },
  {
    path: '/transferInstructions',
    name: 'TransferInstructions',
    component: () => import('~/views/transferInstructions/Index.vue'),
    meta: {
      title: '转增及购买须知',
    },
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: () => import('~/views/iframe/Index.vue'),
    meta: {
      title: '外部页面',
    },
  },
  {
    path: '/welcomeTo',
    name: 'WelcomeTo',
    component: () => import('~/views/welcomeTo/Index.vue'),
    meta: {
      title: '欢迎',
    },
  },
]

export default routes
