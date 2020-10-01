import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [{ path: '/test', component: '@/pages/api-test' }],
    },
  ],
});
