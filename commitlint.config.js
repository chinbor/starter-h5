module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'UI', 'chore', 'locale', 'refactor', 'perf', 'test', 'build', 'ci', 'revert', 'conflict', 'font', 'delete', 'stash']],
  },
}
