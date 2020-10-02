const filterList = ['/api/login'];

export function WhiteList(url: string): boolean {
  return !!filterList.find(filterUrl => url.indexOf(filterUrl) > -1);
}
