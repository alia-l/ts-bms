declare namespace GoodsAPI {
  /**
   * @description rfid
   */
  type RfidListData = {
    bagOrderCode?: string;
    bagOrderId?: number;
    createTime?: Date;
    id?: number;
    level?: number;
    remark?: string;
    rfid?: string;
    saleTitle?: string;
    sku?: string;
    staffName?: string;
    status?: number;
    statusDesc?: string;
    updateTime?: Date;
    userId?: number;
  }
}
