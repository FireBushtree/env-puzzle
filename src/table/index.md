---
title: Table
nav:
  path: '/component'
  title: 组件
---

# Table

## 自动滚动

基于`antd-table`封装的业务组件，当设置了`autoScroll`属性后， 可以自动滚动展示数据，
主要服务于看板业务。

<code src="./demo/index" />

## 触底事件

当表格滚动到最底部的时候， 可以触发`onReachBottom`事件

<code src="./demo/reach-bottom" />

## api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| autoScroll | 是否开启自动滚动 | `boolean` | false | |
| onReachBottom | 当滚动到底部后的事件 | `function` | - | |
| wrapClassName | 包裹`table`的元素样式 | `string` | - | |
