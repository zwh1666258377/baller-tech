import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/d/jqfy', component: '@/pages/Details' },
    { path: '/d/yysb', component: '@/pages/Details' },
    { path: '/d/yyhc', component: '@/pages/Details' },
    { path: '/d/wzsb', component: '@/pages/Details' },
    { path: '/d/txsbhmbjc', component: '@/pages/Details' },
    { path: '/d/ljwm', component: '@/pages/Details' },
  ],
});
