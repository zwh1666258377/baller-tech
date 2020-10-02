const filterList = [
  '/api/login',
  '/api/get-module',
  '/api/img/list',
  '/static',
];

export function WhiteList(url: string): boolean {
  return !!filterList.find(filterUrl => url.indexOf(filterUrl) > -1);
}
