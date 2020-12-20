import { defineConfig } from 'umi';

const isDev = process.env['NODE_ENV'] === 'development';

export default defineConfig({
  ssr: {
    forceInitial: true,
  },
  targets: false,
  define: {
    isDev,
  },
  headScripts: [
    // `/(iPad)/i.test(navigator.userAgent)&&(()=>{
    //   const head=document.getElementsByTagName("head")
    //   const viewport=document.createElement("meta")
    //   viewport.name="viewport"
    //   viewport.content="width=device-width, initial-scale=0.5, maximum-scale=1, minimum-scale=0.5, user-scalable=no"
    //   head.length>0&&head[head.length-1].appendChild(viewport)
    // })();`,
    `/(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent)&&(()=>{
      const head=document.getElementsByTagName("head")
      const viewport=document.createElement("meta")
      viewport.name="viewport"
      viewport.content="target-densitydpi=device-dpi, width=device-width, user-scalable=no"
      head.length>0&&head[head.length-1].appendChild(viewport)
    })();`,
  ],
  publicPath: '/dist/',
  autoprefixer: false,
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: '/static/favicon.ico',
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
    },
    '/static': {
      target: 'http://localhost:8000',
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
        {
          path: '/admin/user',
          component: '@/pages/admin/user',
        },
      ],
    },
    {
      path: '/m',
      component: '@/pages/h5/layout',
      routes: [
        { path: '/m/mt', component: '@/pages/h5/jqfy' },
        { path: '/m/asr', component: '@/pages/h5/yysb' },
        { path: '/m/tts', component: '@/pages/h5/yyhc' },
        { path: '/m/ocr', component: '@/pages/h5/wzsb' },
        { path: '/m/od', component: '@/pages/h5/txsb' },
        { path: '/m/about', component: '@/pages/h5/ljwm' },
        { path: '/m', component: '@/pages/h5/home' },
      ],
    },
    {
      path: '/',
      component: '@/pages/pc/Home',
    },
    {
      path: '/',
      component: '@/pages/pc/layout',
      routes: [
        { path: '/mt', component: '@/pages/pc/JQFY' },
        { path: '/asr', component: '@/pages/pc/YYSB' },
        { path: '/tts', component: '@/pages/pc/YYHC' },
        { path: '/ocr', component: '@/pages/pc/WZSB' },
        { path: '/od', component: '@/pages/pc/TXSB' },
        { path: '/about', component: '@/pages/pc/LJWM' },
      ],
    },
  ],
});
