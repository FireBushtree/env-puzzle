import axios from 'axios';
import AuthUtil from './auth-util';

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
   * 导出文件专用
   * @param {string} url
   * @param {string} params
   * @return {void}
   */
  static exportFile(url, params) {
    if (!url || !params) {
      return;
    }

    params = {...params, DATA_TYPE: 'page', access_token: AuthUtil.getToken()};
    const name = 'downloadFileIframe';

    const existDownloadIframe = document.getElementsByName(name)[0];

    if (!existDownloadIframe) {
      const iframeDom = document.createElement('iframe');
      iframeDom.setAttribute('name', name);
      iframeDom.style.display = 'none';

      document.body.appendChild(iframeDom);
    }

    const formDom = document.createElement('form');
    formDom.style.display = 'none';
    formDom.setAttribute('target', name);
    formDom.setAttribute('method', 'post');
    formDom.setAttribute('action', url);
    document.body.appendChild(formDom);

    for (const key in params) {
      if (params[key] !== null && params[key] !== undefined) {
        const inputDom = document.createElement('input');
        const value
          = typeof params[key] === 'object'
            ? JSON.stringify(params[key])
            : params[key];
        inputDom.setAttribute('type', 'hidden');
        inputDom.setAttribute('name', key);
        inputDom.setAttribute('value', value);
        formDom.appendChild(inputDom);
      }
    }

    formDom.submit();
    formDom.parentNode.removeChild(formDom);
  }

  /**
   * 文件下载
   * @param {string} url
   */
  static downloadFile(url) {
    try {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.onload = function() {
        document.body.removeChild(iframe);
      };
    } catch (e) {
      // nothing
    }
  }

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
