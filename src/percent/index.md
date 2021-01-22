---
title: Percent
nav:
  path: '/component'
  title: 组件
---

# Percent

目前只有暗黑主题的样式， 所以底色要以暗色为主， 有需求的时候再增加配置项，适应新的风格。<br />
展示数据的百分比， 有两种风格的， 半圆以及线性， 在数据变动的时候， 有动画。

## 何时使用

卓哥让你什么时候用， 你就什么时候用。

## 代码演示

半圆形的百分比样式

<code src="./demo/index" />

线性的百分比样式

<code src="./demo/line-percent" />

## api

所有percent组件通用api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| className | 组件的最外层样式 | `string` | - | |
| style | 就是style，你懂得 | `React.CSSProperties` | - | |
| value | 必填， 用于展示百分比 **不用*100%!**  | `number` | - | |

### SemicirclePercent(半圆形半分比)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| title | 用于表示该组件的意义 | `string` | - | |

### LinePercent(线形百分比)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| title | 用于表示该组件的意义 | `React.ReactNode` | - | |
| lineWidth | 线的长度 | `number` | - | |
| suffix | 在表示百分比的线的后面放置的内容 | `React.ReactNode` | - | |
