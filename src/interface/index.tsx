/**
 * 分页接口的返回格式
 */
export interface PageApiRes<T> {
  total: number;
  rows: T[];
}
