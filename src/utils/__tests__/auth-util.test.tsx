import AuthUtil from '../auth-util';
import {mockLocationHref, mockLocalStorage} from '@/tests/utils';

beforeEach(() => {
  mockLocalStorage();
});

afterEach(() => {
  window.localStorage.clear();
});

describe('auth-util', () => {
  test('tenantId', () => {
    mockLocationHref('http://demo.com.cn');
    expect(AuthUtil.getTenantId()).toBe(undefined);

    window.location.href = 'http://demo.com.cn?tenantId=abcde';
    expect(AuthUtil.getTenantId()).toBe('abcde');

    window.localStorage.setItem('tenantId', '12345');
    expect(AuthUtil.getTenantId()).toBe('abcde');

    window.location.href = 'http://demo.com.cn';
    expect(AuthUtil.getTenantId()).toBe('12345');
  });

  test('userId', () => {
    mockLocationHref('http://demo.com.cn');
    expect(AuthUtil.getUserId()).toBe(undefined);

    window.location.href = 'http://demo.com.cn?userId=abcde';
    expect(AuthUtil.getUserId()).toBe('abcde');

    window.localStorage.setItem('userId', '12345');
    expect(AuthUtil.getUserId()).toBe('abcde');

    window.location.href = 'http://demo.com.cn';
    expect(AuthUtil.getUserId()).toBe('12345');
  });

  test('token', () => {
    mockLocationHref('http://demo.com.cn');
    expect(AuthUtil.getToken()).toBe(undefined);

    window.location.href = 'http://demo.com.cn?token=abcde';
    expect(AuthUtil.getToken()).toBe('abcde');

    window.location.href = 'http://demo.com.cn?access_token=abcde';
    expect(AuthUtil.getToken()).toBe('abcde');

    window.location.href = 'http://demo.com.cn';
    window.localStorage.setItem('token', '123456');
    expect(AuthUtil.getToken()).toBe('123456');

    window.localStorage.removeItem('token');
    expect(AuthUtil.getToken()).toBe(undefined);

    window.localStorage.setItem('access_token', '123456');
    expect(AuthUtil.getToken()).toBe('123456');
  });
});
