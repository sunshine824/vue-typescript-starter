import Mock from 'mockjs';
import { Result } from '../result';

const Roles = [
  { name: 'menu.system', url: 'system', icon: 'icon-guanli' },
  {
    name: 'menu.eoms',
    url: 'eoms',
    icon: 'icon-yunwei1',
    list: [
      {
        name: 'menu.eomsFault',
        url: 'eoms/fault',
        icon: ''
      },
      {
        name: 'menu.eomsAlarm',
        url: 'eoms/alarm',
        icon: ''
      }
    ]
  },
  { name: 'menu.database', url: 'database', icon: 'icon-zichan' },
  { name: 'menu.smart', url: 'smart', icon: 'icon-wulianwang' }
];

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/navPerson`, 'get', () => {
  const result = new Result();
  const menuList: StoreState.Role[] = Roles;
  result.data = {
    menuList,
    permissions: []
  };
  return result;
});
