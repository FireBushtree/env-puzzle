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
}
