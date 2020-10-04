import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {},
  targets: false,
  autoprefixer: false,
  nodeModulesTransform: {
    type: 'none',
  },
  headScripts: [`http://localhost:8080/static/recorder.mp3.min.js`],
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
      path: '/d',
      routes: [
        { path: '/d/jqfy', component: '@/pages/pc/JQFY' },
        { path: '/d/yysb', component: '@/pages/pc/YYSB' },
        { path: '/d/yyhc', component: '@/pages/pc/YYHC' },
        { path: '/d/wzsb', component: '@/pages/pc/WZSB' },
        { path: '/d/txsbmbjc', component: '@/pages/pc/TXSBMBJC' },
        { path: '/d/ljwm', component: '@/pages/pc/LJWM' },
      ],
    },
    {
      path: '/d-m',
      routes: [
        { path: '/d-m/jqfy', component: '@/pages/MDetails' },
        { path: '/d-m/yysb', component: '@/pages/MDetails' },
        { path: '/d-m/yyhc', component: '@/pages/MDetails' },
        { path: '/d-m/wzsb', component: '@/pages/MDetails' },
        { path: '/d-m/txsbhmbjc', component: '@/pages/MDetails' },
        { path: '/d-m/ljwm', component: '@/pages/MDetails' },
      ],
    },
  ],
});
