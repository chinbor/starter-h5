# digital-collection

## 一、 前置操作

1. `pnpm i`
2. `pnpm prepare` 一般而言当你install后会自动执行
3. `pnpm exec husky add .husky/pre-commit 'pnpm exec lint-staged'`
4. `pnpm exec husky add .husky/commit-msg 'pnpm exec commitlint --edit "$1"'`

## 二、工具

1. `threeJs + dexie + qrcode + edraw + dayjs + mockjs`
2. `vue3 + ts + pinia + vue-router + sass + vant + vitest`

## 三、脚本

`commit`：进行代码提交以及检测
`up`：检测本地包的升级
其余的都不重要，是人都能看懂
