import routes from '../../config/routes';

export const staff_info = 'staff_info';

export function filterMenuPermission(per = [], list = routes) {
  if (per.length <= 0) return [];
  const iPer = per.join(',');
  const iList = JSON.parse(JSON.stringify(list));
  return iList.filter((i: any) => {
    const flag = iPer.indexOf(i.key) > -1;
    if (flag && (i.routes || []).length > 0) {
      i.routes = filterMenuPermission(per, i.routes);
    }
    return flag;
  });
}

export const STAFF_ROLE = [
  { value: 1, label: '超级管理员' },
  { value: 2, label: '仓库管理员' },
  { value: 3, label: '客服' },
  { value: 4, label: '仓库质检员' },
  { value: 5, label: '运营' },
  { value: 6, label: '管理员' },
  { value: 8, label: '口试审核人员' },
];
