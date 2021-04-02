import StringUtil from '../string-util';

const mockLocationHref = (url) => {
  delete window.location;
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    configurable: true,
    enumerable: true,
    value: {
      href: url,
    },
  });
};

describe('string-util', () => {
  test('getUrlParam', () => {
    mockLocationHref(
      'http://demo.com.cn?username=owen&password=123&token=abcd-efg',
    );

    expect(StringUtil.getUrlParam('username')).toBe('owen');
    expect(StringUtil.getUrlParam('password')).toBe('123');
    expect(StringUtil.getUrlParam('token')).toBe('abcd-efg');

    expect(StringUtil.getUrlParam('access_token')).toBe(undefined);
  });

  test('empty query param', () => {
    mockLocationHref('http://demo.com.cn');
    expect(StringUtil.getUrlParam('username')).toBe(undefined);
  });
});
