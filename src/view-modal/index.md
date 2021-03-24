---
title: ViewModal
nav:
  path: '/component'
  title: 组件
---

# ViewModal

常配合`template`组件一起使用， 用于查看某条数据的详情数据。<br/>

## 设计思路

因为数据展示的风格大体较为统一， 所以基于栅格实现此组件。 组件内部会便利`props.children`，
一般来说直接添加`div`元素， 可以快速实现数据展示。 由于`children`中的组件不统一， 所以设计了使
用`data-*`的风格， 传入值。

## 代码示例

<code src="./demo/index.demo.tsx" />

## 子元素api

`props`可以参考`antd`的modal。
`子元素api`目前支持如下配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| data-span | 该字段的长度， 可以参考栅格的`span`， 1 ~ 24之间 | `number` | - | |
| data-label | 该字段的名称 | `React.ReactNode` | - | |
| data-title | 将下面的字段分组展示， 该字段会默认充满一行 | `React.ReactNode` | - | |
