// @ts-ignore
/* eslint-disable */

declare namespace UserAPI {
  /**
   * @description 【登录】请求参数
   */
  type LoginParams = {
    phone?: string;
    password?: string;
  };

  /**
   * @description 【登录】响应数据
   */
  type LoginData = {
    function?: string;
    menu?: string;
    roleName?: string;
    staffVo?: {
      id?: number;
      merchantId?: any;
      roleId?: number;
      name?: string;
      email?: any;
      phone?: number;
      status?: number;
    };
    token?: string;
  };

  /**
   * @description 【角色权限列表】响应数据
   */
  type RoleData = {
    createTime?: number;
    function?: string;
    id: number;
    menu?: string;
    menuList?: any;
    functionList?: any;
    name?: string;
    status?: number;
    type?: any;
    key?: any;
  };
}
