import Mock from 'mockjs';
import { Result } from '../result';

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/logout`, 'get', () => {
  const result = new Result();
  result.msg = '退出成功！';
  return result;
});
