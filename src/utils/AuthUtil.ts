import StringUtil from './StringUtil';

const TENANT_ID = 'tenantId';
const USER_ID = 'userId';
const TOKEN = 'token';
const ACCESS_TOKEN = 'access_token';

/**
 * 常用的获取权限信息的工具类
 * 比如 userId, tenantId, token等
 */
export default class AuthUtil {
  static getTenantId() {
    return StringUtil.getUrlParam(TENANT_ID) || localStorage.getItem(TENANT_ID);
  }

  static getUserId() {
    return StringUtil.getUrlParam(USER_ID) || localStorage.getItem(USER_ID);
  }

  static getToken() {
    return (
      StringUtil.getUrlParam(TOKEN) ||
      StringUtil.getUrlParam(ACCESS_TOKEN) ||
      localStorage.getItem(TOKEN) ||
      localStorage.getItem(ACCESS_TOKEN)
    );
  }
}
