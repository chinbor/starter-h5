# starter-h5

> 在线预览地址：https://chinbor.netlify.app/#/home

## 一、 前置操作

1. `pnpm i`
2. `pnpm prepare` 一般而言当你 `install` 后会自动执行，但是咱们这里使用 `create-cp` 创建的项目不存在 git 记录（我进行了删除），所以需要先执行 `git init` 初始化代码仓库
3. `pnpm exec husky add .husky/pre-commit 'pnpm exec lint-staged'`
4. `pnpm exec husky add .husky/commit-msg 'pnpm exec commitlint --edit "$1"'`

## 二、工具

1. `threeJs + dexie + qrcode + edraw + dayjs + mockjs`
2. `vue3 + ts + pinia + vue-router + sass + vant + vitest`

## 三、脚本

`commit`：进行代码提交以及检测
`up`：检测本地包的升级
其余的都不重要，是人都能看懂
