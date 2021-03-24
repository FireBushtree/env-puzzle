---
title: ImportModal
nav:
  path: '/component'
  title: 组件
---

# ImportModal

基于公司业务封装的导入组件， 支持**下载模板**以及**上传导入文件**的功能。<br/>
组件内部基于`antd`的`Upload`组件， 点击上传按钮后， 不会立即上传文件到服务器， 点击导入按钮后， 才会发起网络请求。
## 代码示例

<code src="./demo/index.demo" />

## api

该组件由`Modal`组件包裹， 所以props可以参考`Modal`, 部分额外的属性如下：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| uploadUrl | 文件上传的地址 | `string` | - | |
| templateSrc | 导入模板的下载地址 | `string` | - | |
| onOk | 点击确定， 模板导入完成后的回调， 一般用来刷新列表 | `function` | - | |
