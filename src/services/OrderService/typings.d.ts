// @ts-ignore
/* eslint-disable */

declare namespace OrderAPI {
  /**
   * @description 【书袋列表】请求参数
   */
  type BagListParams = {
    confirmTimeEnd?: string;
    confirmTimeStart?: string;
    createTimeEnd?: string;
    createTimeStart?: string;
    endTime?: string;
    orderCode?: string;
    phone?: string;
    startTime?: string;
    trackingCode?: string;
    pageNum?: number;
    size?: number;
  };



  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * @description 【书袋列表】响应数据
   */
  type BagListData = {
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

  /**
   * @description 【用户管理列表详情 - 获取基础信息】响应数据
   */
  type UserDetailData = {
    avatar?: string
    babyInfo?:
      {
        id: number,
        name: string
        birthday: number
        sex: number
      }
    birthday?: number
    name?: string
    sex?: number
    createTime?: number
    hadAllowed?: boolean
    id?: number
    interview?: boolean
    level?: number
    nickname?: string
    phone?: string
    points?: any
    realName?: string
    referLevel?: number
    referNickname?: string
    referPhone?: string
    referStatusValue?: string
    referUserId?: number
    role?: number
    roleValue?: string
    serviceName?: string
    userPoints?: number
    wechatNo?: any
    wechatQrCode?: any
  }
}
