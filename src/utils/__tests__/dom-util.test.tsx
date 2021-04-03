import DomUtil from '../dom-util';

const vueCDN = 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js';
const bootstrapCDN
  = 'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.0.0-beta2/css/bootstrap-grid.css';

const clearElementByTagName = (tagName: string) => {
  const elements = document.querySelectorAll(tagName);
  elements.forEach((item) => item.remove());
};

describe('dom-util', () => {
  test('loadJavascript default', () => {
    clearElementByTagName('script');
    const res = DomUtil.loadJavascript('');
    expect(res).toBe(undefined);

    DomUtil.loadJavascript(vueCDN);
    DomUtil.loadJavascript(vueCDN);
    const scriptEl = document.querySelectorAll('script');
    expect(scriptEl.length).toBe(2);
  });

  test('loadJavascript repeat', () => {
    clearElementByTagName('script');
    const res1 = DomUtil.loadJavascript(vueCDN, 'vue');
    expect(res1 instanceof Promise).toBe(true);
    const res2 = DomUtil.loadJavascript(vueCDN, 'vue');
    expect(res2).toBe(undefined);

    const scriptEl = document.querySelectorAll('script');
    expect(scriptEl.length).toBe(1);
  });

  test('loadCss default', () => {
    clearElementByTagName('link');
    const res = DomUtil.loadCss('');
    expect(res).toBe(undefined);

    DomUtil.loadCss(bootstrapCDN);
    DomUtil.loadCss(bootstrapCDN);
    const linkEl = document.querySelectorAll('link');
    expect(linkEl.length).toBe(2);
  });

  test('loadCss repeat', () => {
    clearElementByTagName('link');
    const res1 = DomUtil.loadCss(bootstrapCDN, 'bootStrap');
    expect(res1 instanceof Promise).toBe(true);
    const res2 = DomUtil.loadCss(bootstrapCDN, 'bootStrap');
    expect(res2).toBe(undefined);

    const linkEl = document.querySelectorAll('link');
    expect(linkEl.length).toBe(1);
  });
});
