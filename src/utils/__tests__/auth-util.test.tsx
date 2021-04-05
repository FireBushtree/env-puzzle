import AuthUtil from '../auth-util';
import {mockLocationHref} from '@/tests/utils';

describe('auth-util', () => {
  test('tenantId', () => {
    mockLocationHref(
      'http://demo.com.cn?username=owen&password=123&token=abcd-efg',
    );
    AuthUtil.getTenantId();
  });
});
