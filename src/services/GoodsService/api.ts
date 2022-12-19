import { fetch } from '@/services/fetch';

/**
 * @desc 查询rfid 记录
 * @param {*} [params={}]
 * @returns
 */
export function getRfidRecordList(params = {}) {
  return fetch('/goods/bms/rfid_list', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true
    }
  })
}
