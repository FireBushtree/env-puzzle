import DomUtil from '../dom-util';

const vueCDN = 'https://lib.baomitu.com/vue/2.6.11/vue.esm.browser.min.js';

const clearScriptEl = () => {
  const scriptEl = document.querySelectorAll('script');
  scriptEl.forEach((item) => item.remove());
};

describe('dom-util', () => {
  test('loadJavascript default', () => {
    clearScriptEl();
    const res = DomUtil.loadJavascript('');
    expect(res).toBe(undefined);

    DomUtil.loadJavascript(vueCDN);
    DomUtil.loadJavascript(vueCDN);
    const scriptEl = document.querySelectorAll('script');
    expect(scriptEl.length).toBe(2);
  });

  test('loadJavascript repeat', () => {
    clearScriptEl();
    const res1 = DomUtil.loadJavascript(vueCDN, 'vue');
    expect(res1 instanceof Promise).toBe(true);
    const res2 = DomUtil.loadJavascript(vueCDN, 'vue');
    expect(res2).toBe(undefined);

    const scriptEl = document.querySelectorAll('script');
    expect(scriptEl.length).toBe(1);
  });
});
