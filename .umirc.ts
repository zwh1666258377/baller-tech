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
    '/static': {
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
          path: '/admin/yysb',
          component: '@/pages/admin/yysb',
        },
        {
          path: '/admin/yyhc',
          component: '@/pages/admin/yyhc',
        },
        {
          path: '/admin/wzsb',
          component: '@/pages/admin/wzsb',
        },
        {
          path: '/admin/txsb',
          component: '@/pages/admin/txsb',
        },
        {
          path: '/admin/ljwm',
          component: '@/pages/admin/ljwm',
        },
        {
          path: '/admin/resources',
          component: '@/pages/admin/resources',
        },
        {
          path: '/admin/website',
          component: '@/pages/admin/website',
        },
      ],
    },
    {
      path: '/m',
      component: '@/pages/h5/layout',
      routes: [
        { path: '/m/jqfy', component: '@/pages/h5/jqfy' },
        { path: '/m/yysb', component: '@/pages/h5/yysb' },
        { path: '/m/yyhc', component: '@/pages/h5/yyhc' },
        { path: '/m/wzsb', component: '@/pages/h5/wzsb' },
        { path: '/m/txsbhmbjc', component: '@/pages/h5/txsbhmbjc' },
        { path: '/m/ljwm', component: '@/pages/h5/ljwm' },
        { path: '/m', component: '@/pages/h5/home' },
      ],
    },
    {
      path: '/',
      component: '@/pages/pc/layout',
      routes: [
        { path: '/jqfy', component: '@/pages/pc/JQFY' },
        { path: '/yysb', component: '@/pages/pc/YYSB' },
        { path: '/yyhc', component: '@/pages/pc/YYHC' },
        { path: '/wzsb', component: '@/pages/pc/WZSB' },
        { path: '/txsbmbjc', component: '@/pages/pc/TXSBMBJC' },
        { path: '/ljwm', component: '@/pages/pc/LJWM' },
        { path: '/', component: '@/pages/pc/Home' },
      ],
    },
  ],
});
