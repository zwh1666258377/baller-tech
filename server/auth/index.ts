// const filterList = [
//   '/api/login',
//   '/api/get-module',
//   '/api/auth/check',
//   '/api/img/list',
//   '/api/jqfy',
//   '/api/yysb',
//   '/api/yyhc',
//   '/api/wzsb',
//   '/api/txsb',
//   '/api/ljwm',
//   '/static',
//   '/api/get-website',
// ];
const filterList = ['/'];

export function WhiteList(url: string): boolean {
  return !!filterList.find(filterUrl => url.indexOf(filterUrl) > -1);
}
