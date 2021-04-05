import StringUtil from './string-util';

const TENANT_ID = 'tenantId';
const USER_ID = 'userId';
const TOKEN = 'token';
const ACCESS_TOKEN = 'access_token';

/**
 * 常用的获取权限信息的工具类
 * 比如 userId, tenantId, token等
 */
export default class AuthUtil {
  /**
   * 获取用户的tenantId
   * 获取顺序如下：
   *   1. 从url中获取
   *   2. 从localStorage中获取
   * @return {string | undefined}
   */
  static getTenantId() {
    return StringUtil.getUrlParam(TENANT_ID) || localStorage.getItem(TENANT_ID);
  }

  /**
   * 获取用户的userId
   * 获取顺序如下：
   *   1. 从url中获取
   *   2. 从localStorage中获取
   * @return {string | undefined}
   */
  static getUserId() {
    return StringUtil.getUrlParam(USER_ID) || localStorage.getItem(USER_ID);
  }

  /**
   * 获取用户的token
   * 由于有的时候叫token， 有的时候是access_token
   * 获取顺序如下：
   *   1. 从url中获取token
   *   1. 从url中获取access_token
   *   1. 从localStorage中获取token
   *   2. 从localStorage中获取access_token
   * @return {string | undefined}
   */
  static getToken() {
    return (
      StringUtil.getUrlParam(TOKEN)
      || StringUtil.getUrlParam(ACCESS_TOKEN)
      || localStorage.getItem(TOKEN)
      || localStorage.getItem(ACCESS_TOKEN)
    );
  }
}
