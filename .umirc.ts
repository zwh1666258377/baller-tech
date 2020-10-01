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
      ],
    },
  ],
});
