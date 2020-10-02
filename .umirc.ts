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
      path: '/admin/login',
      component: '@/pages/admin/login',
    },
    {
      path: '/admin',
      component: '@/pages/admin/index',
      wrappers: ['@/pages/auth/check'],
      routes: [
        {
          path: '/admin/jqfy',
          component: '@/pages/admin/jqfy',
        },
        {
          path: '/admin/resources',
          component: '@/pages/admin/resources',
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
