import axios from 'axios';
import {AuthUtil} from '../utils/AuthUtil';

export interface UploadFileRes {
  result: 0 | 1;
  msg: string;
  exception: string;
}

/**
 * 接口请求的工具类
 */
export default class RequestUtil {
  /**
   * 文件上传
   * @param {string} url
   * @param {FormData} formData
   * @return {Promise}
   */
  static uploadFile(url: string, formData: FormData) {
    return new Promise<UploadFileRes>((resolve, reject) =>
      axios
          .request<UploadFileRes>({
            method: 'POST',
            url: url,
            headers: {
              access_token: AuthUtil.getToken(),
            },
            params: {
              tenantId: AuthUtil.getTenantId(),
              userId: AuthUtil.getUserId(),
            },
            data: formData,
          })
          .then((res) => {
            if (res.data.result === 1) {
              reject(res.data);
              return;
            }

            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          }),
    );
  }
}
