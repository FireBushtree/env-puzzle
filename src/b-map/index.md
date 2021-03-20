---
title: BMap
nav:
  path: '/component'
  title: 组件
---

# BMap

基于百度地图V3的组件。

## 标记点

主要用来展示点位。

* 当不传入`children`, 会使用原生的`Icon`类, 支持拖拽等事件。
* 当传入`children`, 会使用自定义类, 不支持拖拽事件， 等具有更大的灵活性。

<code src="./demo/index" />

## 聚合点位

当点位过多的时候， 在地图上看起来很密集， 可以使用聚合点位。

<code src="./demo/aggregation" />

## 覆盖物

用于展示覆盖物

<code src="./demo/polygon.demo" />

## api

`<BMap />`组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| className | 组件的最外层样式 | `string` | - | |
| style | 就是style，你懂得 | `React.CSSProperties` | - | |
| center | 地图的中心点位 | `Point` | - | |
| zoom | 地图的缩放层级 | `number` | - | |
| onZoomChange | 当地图缩放层级变动的回调 | `function(zoom)` | - | |
| onCreate | 创建百度地图实例后的回调， 主要用来获取`map`实例， 进行一些操作 | `number` | - | |