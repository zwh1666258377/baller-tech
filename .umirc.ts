import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {},
  targets: false,
  autoprefixer: false,
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
    },
  },
  routes: [
    {
      path: '/admin',
      component: '@/pages/admin/index',
      routes: [
        {
          path: '/admin/jqfy',
          component: '@/pages/admin/jqfy',
        },
      ],
    },
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        {
          path: '/test',
          component: '@/pages/api-test',
        },
        {
          path: '/d/jqfy',
          component: '@/pages/Details',
        },
        {
          path: '/d/yysb',
          component: '@/pages/Details',
        },
        {
          path: '/d/yyhc',
          component: '@/pages/Details',
        },
        {
          path: '/d/wzsb',
          component: '@/pages/Details',
        },
        {
          path: '/d/txsbhmbjc',
          component: '@/pages/Details',
        },
        {
          path: '/d/ljwm',
          component: '@/pages/Details',
        },
      ],
    },
  ],
});
