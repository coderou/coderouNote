import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'coderouNote',
  mode: 'site',
  // more config: https://d.umijs.org/config
  history: {
    type: 'hash',
  },
  publicPath: '/coderouNote/', // 修改publicPath以适配gh-pages的static路径问题
});
