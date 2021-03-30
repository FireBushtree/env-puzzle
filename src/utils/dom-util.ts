/**
 * 常用的操作DOM的工具类
 */
export default class DomUtil {
  /**
   * 使用Promise异步的方式加载js文件
   * @param {string} url 加载的路径
   * @return {void}
   */
  static loadJavascript(url: string) {
    return new Promise((resolve) => {
      const scriptEl = document.createElement('script');
      scriptEl.type = 'text/javascript';
      scriptEl.src = url;
      scriptEl.onload = () => {
        resolve(null);
      };
      document.body.appendChild(scriptEl);
    });
  }

  /**
   * 使用Promise异步的方式加载css文件
   * @param {string} url 加载的css的url
   * @param {string} id link元素的id
   * @return {void}
   */
  static loadCss(url: string, id?: string) {
    return new Promise((resolve) => {
      if (id && document.querySelector(`#${id}`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';

      if (id) {
        link.id = id;
      }

      link.href = url;
      link.onload = () => {
        resolve(null);
      };
      document.head.appendChild(link);
    });
  }
}
