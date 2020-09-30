/*
 * @Description:
 * @Author: chenxin
 * @Date: 2020-09-29 10:19:01
 * @LastEditors: chenxin
 * @LastEditTime: 2020-09-29 10:33:52
 */

//定义分页类
export class Pagination implements StoreState.Pagination {
  public position = 'bottom';
  public pageSize = 10;
  public total = 0;
  public showTotal = (total: number) => `总 ${total} 条`
}
