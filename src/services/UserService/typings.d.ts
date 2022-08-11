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
   * @description【订阅列表】请求参数
   */
  type SubscribeParams = {
    phone?: string,
    nickname?: string
    userCardNo?: string
    createTimeStart?: string
    createTimeEnd?: string
    pageNum?: number;
    size?: number;
  }

  /**
   * @description 【抽奖记录】请求参数
   */
  type LotteryCountParams = {
    userId: number
  }

  /**
   * @description 【书袋列表-详情-订阅管理详情-冻结书袋】请求参数
   */
  type FreezeOrderParams = {
    userServiceCardId: number
    remark: string
  }

  /**
   * @description 【书袋列表-详情-订阅管理详情-增加延期】请求参数
   */
  type ExpiresTimeParams = {
    monthCnt: string,
    remark: string
    userServiceCardId: number
  }

  /**
   * @description 【短信模版-列表】请求参数
   */
  type TextTemplateParams = {
    createTimeStart?:string
    createTimeEnd?:string
    phone?:number
    keyword?:number
    pageNum?: number;
    size?: number;
  }

  /**
   *@description 【短信模版-发送短信】请求参数
   */
  type sendSmsInfoParams = {
    phone:string
    remark?:string
    params?:any
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * @description 【短信模版-列表】响应数据
   */
  type TextTemplateData = {
    content?: string
    createTime: number
    id: number
    phone: string
    staffId: number
    staffName: string
    status?: number
  }

  /**
   * @description 【用户详情-解绑微信】响应数据
   */
  type AccountListData = {
    avatarAwardSkin: any
    avatar: string
    avatarCardSkin: any
    avatarPendant: any
    avatarSkin: any
    birthday: any
    city: string
    contactPhone: string
    country: string
    followPublic: number
    id: number
    labelColor: any
    lastLoginTime: string
    nickname: string
    parentTag: number
    province: string
    realName: any
    sex: any
    source: any
    systemEnv: any
    token: string
    type: number
    unionId: string
    valueColor: any
    wechatNickname: string
    value: number
    label: string
  }

  /**
   * @description 【用户详情-订阅详情-延期记录列表】响应数据
   */
  type ExpiredTimeData = {
    createTime?: number
    id: number
    remark: string
    serviceDuration?: number
    staffId?: number
    staffName: string
    unit: number
    unitStr?: string
  }

  /**
   * @description 【用户详情-关系记录列表】响应数据
   */
  type UserReferListData = {
    createTime?: number
    orderCode?: string
    referId?: number
    referLevel?: number
    referNickname?: string
    referPhone?: string
    status?: number
    type?: number
  }

  /**
   * @description 【抽奖记录】响应数据
   */
  type LotteryCountData = {
    activeCount?: number
    goldAActiveCount?: number
    goldACount?: number
    goldBActiveCount?: number
    goldBCount?: number
    id?: number
    nickname?: string
    normalAActiveCount?: number
    normalACount?: number
    normalActiveCount?: number
    normalBActiveCount?: number
    normalBCount?: number
    normalCount?: number
    phone?: string
    silverActiveCount?: number
    silverCount?: number
    totalCount?: number
    userId?: number
  }

  /**
   * @description 【订阅列表】响应数据
   */
  type SubscribeData = {
    activateTime?: number
    cardName?: string
    createTimeMill?: number
    expireTime?: number
    id?: number
    leftCount?: number
    nickname?: string
    pauseEndTime?: any
    pauseTime?: any
    phone?: string
    serviceCount?: number
    serviceId?: number
    serviceName?: string
    status?: number
    usedCount?: any
    userCardNo?: string
    key?: any
  }

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
    superRealName?: string;
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
    referRealName?: string
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
