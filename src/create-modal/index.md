---
title: CreateModal
nav:
  path: '/component'
  title: 组件
---

# CreateModal

服务于后台管理页面创建表单的组件

## 设计思路

组件内部跟`view-modal`一样， 也是基于栅格系统的。且组件内部使用`ant-design`的`Form`组件，自动
完成了数据校验等操作。<br/>
该组件设计成了我认为的最简单的api风格， 在直接子元素上， 设置`prop`就可以快速完成表单， 避免使用
大量的`Form.Item`。 由于配合`typescript`使用的原因， 直接子元素肯定为`Input`, `Select`之类的
表单组件， 所以使用`data-*`的风格， 避免了`ts`类型检测异常。

## 代码示例

<code src="./demo/index.demo" />

## api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| extraFooter | 模态框底部的额外按钮 | `Array<React.ReactNode>` | `[]` | |
| onReset | 清空表单后的事件 | `function` | - | |


## 子元素api

`props`可以参考`antd`的modal。
`子元素api`目前支持如下配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| data-required | 字段是否必填 | `boolean` | - | |
| data-span | 该字段的长度， 可以参考栅格的`span`， 1 ~ 24之间 | `number` | 12 | |
| data-label | 该字段的名称 | `React.ReactNode` | - | |
| data-name | 该字段在表单中的值的键 | `string` | - | |
| data-title | 将下面的字段分组展示， 该字段会默认充满一行 | `React.ReactNode` | - | |
| data-rules | 该字段的额外的校验规则， 参考[antd-form](https://ant.design/components/form-cn/#components-form-demo-basic) | `Array<object>` | - | |
| data-style | 字段样式 | `React.CSSProperties` | - | |
| data-className | 字段className | `boolean` | - | |
