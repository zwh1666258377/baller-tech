import { defineConfig } from 'umi';
const outputPath = 'dist/';
const env = process.env.NODE_ENV;
const path = env === 'development' ? 'http://127.0.0.1:8000/' : outputPath;
export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dynamicImport: false,
  dva: {
    immer: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: outputPath,
  publicPath: path,
  routes: [{ path: '/', component: '@/pages/index' }],
});
//# sourceMappingURL=.umirc.js.map
