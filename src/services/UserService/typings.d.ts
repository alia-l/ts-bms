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
   * @description 【更新/新增账号】请求参数
   */
  type AccountParams = {
    id?: number;
    name?: string;
    phone?: string;
    roleId?: number;
  };

  /**
   * @description 【用户列表】请求参数
   */
  type UserListParams = {
    size: number;
    pageNum: number;
    phone: string;
    id: string;
    nickname: string;
  };

  /**
   * @description 【用户列表】响应数据
   */
  type UserListData = {
    avatar?: string;
    createTime?: number;
    equalLevel?: any;
    equalNickname?: any;
    equalPhone?: any;
    equalUserId?: any;
    extraCount?: number;
    hadAllowed?: boolean;
    id?: number;
    level?: number;
    nickname?: string;
    phone?: string;
    role?: number;
    roleValue?: string;
    serviceName?: string;
    serviceType?: number;
    superLevel?: number;
    superNickname?: string;
    superPhone?: string;
    superiorId?: number;
    unstable?: any;
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
    id?: number;
    menu?: string;
    menuList?: any;
    functionList?: any;
    name?: string;
    status?: number;
    type?: any;
    key?: any;
  };

  /**
   * @description 【账号管理列表】响应数据
   */
  type AccountData = {
    createTime?: string;
    email?: string;
    id?: number;
    merchantId?: number;
    name?: string;
    phone?: string;
    roleId?: number;
    key?: any;
    staffRole?: {
      createTime?: number;
      function?: string;
      id?: number;
      menu?: string;
      name?: string;
      status?: number;
      type?: any;
    };
  };
}
