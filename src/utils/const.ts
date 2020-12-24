/*
 * @Description:
 * @Author: chenxin
 * @Date: 2020-09-29 10:19:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-20 10:58:57
 */

//定义分页类
export class Pagination {
  private Page: StoreState.Pagination = {
    position: 'bottom',
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `总 ${total} 条`
  }
  constructor(params: StoreState.Pagination) {
    Object.assign(this.Page, params)
  }
  init() { return this.Page }
}

//定义model公共属性
export const ModelProps = {
  maskClosable: false //点击蒙层是否允许关闭
};

//定义国际化
export const Languages = [
  { value: "zh", label: "country.chinese" },
  { value: "en", label: "country.english" }
];
