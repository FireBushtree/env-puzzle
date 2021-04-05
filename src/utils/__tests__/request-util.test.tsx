import RequestUtil from '../request-util';

describe('request-util', () => {
  test('download file', () => {
    RequestUtil.downloadFile('mock.download.com');
    const iframeEls = document.querySelectorAll('iframe');
    expect(iframeEls.length).toBe(1);
  });
});
