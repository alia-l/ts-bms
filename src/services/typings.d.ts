// @ts-ignore
/* eslint-disable */

declare namespace API {
  /**
   * @description 分页请求参数
   */
  type PageParams = {
    size?: number;
    pageNum?: number;
  };

  /**
   * @description 返回类型
   */
  type Result = {
    data?: any;
    dataCount?: number | null;
    hasMore?: boolean | null;
    resultStatus?: {
      code?: number;
      message?: string;
    };
  };
}
