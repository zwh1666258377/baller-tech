const filterList = [
  '/api/login',
  '/api/get-module',
  '/api/auth/check',
  '/api/img/list',
  '/api/jqfy',
  '/api/yysb',
  '/static',
];

export function WhiteList(url: string): boolean {
  return !!filterList.find(filterUrl => url.indexOf(filterUrl) > -1);
}
