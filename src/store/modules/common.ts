/*
 * @Description:
 * @Author: chenxin
 * @Date: 2020-10-07 10:45:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-20 16:30:17
 */
import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface CommonState {
  themeMode: string;
  loading: boolean;
  collapsed: boolean;
}

interface SystemInfo {
  image: string;
  name: string;
}

// @Module 标记当前为module
@Module({ dynamic: true, store, name: 'common' })
class Common extends VuexModule implements CommonState {
  /* 这里代表的就是state里面的状态 */
  public themeMode = 'dark';

  // 全局路由切换loading
  public loading = false;

  // 导航栏收缩状态
  public collapsed = false;

  // logo base64 + name
  public systemInfo: SystemInfo = {
    image: '',
    name: ''
  };

  // 返回loading
  get getLoading() {
    return this.loading;
  }

  // 返回主题模式
  get getThemeMode() {
    return this.themeMode;
  }

  // 返回导航状态
  get getCollapsed() {
    return this.collapsed;
  }

  // 返回系统信息
  get getSystemInfo() {
    return this.systemInfo;
  }

  // @Mutation 标注为mutation
  @Mutation
  public setThemeMode(mode: string) {
    this.themeMode = mode;
  }

  @Mutation
  public setLoadingState(flag: boolean) {
    this.loading = flag;
  }

  @Mutation
  public setCollapsedState(flag: boolean) {
    this.collapsed = flag;
  }

  @Mutation
  public setSystemInfo(data: SystemInfo) {
    this.systemInfo = data;
  }
}

// getModule 得到一个类型安全的store，module必须提供name属性
export const CommonModule = getModule(Common);
