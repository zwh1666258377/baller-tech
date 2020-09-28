import { defineConfig } from 'umi';

const outputPath = 'dist/';

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const path = isDev ? 'http://127.0.0.1:8000/' : outputPath;

export default defineConfig({
  ssr: isDev
    ? {}
    : {
        devServerRender: false,
      },
  polyfill: {
    imports: [],
  },
  dynamicImport: false,
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: outputPath,
  publicPath: path,
  routes: [{ path: '/', component: '@/pages/index' }],
  targets: false,
  autoprefixer: false,
  manifest: {},
});
