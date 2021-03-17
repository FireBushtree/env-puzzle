/**
 * 对字符串处理的工具类
 */
export default class StringUtil {
  /**
   * 通过键名获取url的参数
   * @param {string} key  要获取的参数的键名
   * @return {string | undefined}
   */
  public static getUrlParam(key: string): string | undefined {
    const paramObj = {};
    const matchList = window.location.href.match(/([^\?&]+)=([^&]+)/g) || [];
    for (let i = 0, len = matchList.length; i < len; i++) {
      const r = matchList[i].match(/([^\?&]+)=([^&]+)/);
      paramObj[r[1]] = r[2];
    }

    return paramObj[key];
  }
}
