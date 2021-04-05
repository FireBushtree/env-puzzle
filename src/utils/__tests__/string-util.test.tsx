import StringUtil from '../string-util';
import {mockLocationHref} from '@/tests/utils';

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
