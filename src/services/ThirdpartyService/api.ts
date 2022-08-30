import {fetch} from '@/services/fetch';


/**
 * @desc OSS 获取签名
 * @param path
 * @returns {undefined}
 */
export function getOSSData(path :string) {
  return fetch('/thirdparty/common/get_upload_path_url', {
    params: { path }
  })
}
