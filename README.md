# starter-h5

> 在线预览地址：https://chinbor.netlify.app

TODO:

- [ ] 使用 vitest 编写单元测试

## 一、 前置操作
若你使用 [create-cp](https://www.npmjs.com/package/create-cp) 创建的项目，你需要先在终端执行如下代码，若直接 clone代码仓库代码创建的项目，也建议删除git记录然后执行如下代码）

```shell
# 初始化 git 仓库
git init
# git 的全局 clone 以及 push、 pull都换成lf
git config --global core.autocrlf false
# 统一换行符为 lf
git config --global core.eol lf
# 将自动转换关闭,避免转换失败不能不同进行提交
git config --global core.autocrlf false
# 禁止混用 lf 和 crlf 两种换行符
git config --global core.safecrlf true
```

然后

1. `pnpm i`
2. `pnpm prepare` （一般而言当你 `install` 后会自动执行）
3. `pnpm exec husky add .husky/pre-commit 'pnpm exec lint-staged'`
4. `pnpm exec husky add .husky/commit-msg 'pnpm exec commitlint --edit "$1"'`

## 二、工具

1. `threeJs + dexie + qrcode + edraw + dayjs + mockjs`
2. `vue3 + ts + pinia + vue-router + sass + vant + vitest`

## 三、脚本

`commit`：进行代码提交以及检测（使用到了自己的一个小工具 [git-pick](https://www.npmjs.com/package/@chinbor/git-pick)）

`up`：检测本地包的升级

其余的都不重要，是人都能看懂
