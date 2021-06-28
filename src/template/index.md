---
title: Template
nav:
  path: '/component'
  title: 组件
---

# Template

基于环境云后台管理UI规范的模板组件， 页面自动实现了查询， 导入等功能， 可以基于该组件， 开发大部分的
后台管理页面。

## 设计理念

* 查询： 理论上， 后台管理页面的列表， 仅仅需要告诉该组件后端的接口地址， 就不用去关心分页， 查询条件
等的变动

* 导入： 需要仅需要下载模板的地址跟文件上传的地址

## 代码示例

### 列表风格的查询风格

<code src="./demo/index.demo" />

### 卡片风格的查询风格

当设置为卡片风格的时候， 需要设置`tableProps.renderCard`属性告诉组件卡片张什么样子。
组件内部提供了`Template.Card`模板， 用来帮助快速实现卡片风格。也可以自己实现卡片，不过比较麻烦。每一个卡片组件
会自动注入`checked`, `data`, `index`, `selectable`, `onCheck`属性。<br/>

没想到吧， 我还设置了`Template.Card.Field`组件， 可以快速的实现 左边为**属性名**, 右侧为**属性**的布局

<code src="./demo/card.demo" />

## Template.Card.Field

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| labe | 属性名 | `React.ReactNode` | | |


## Template.Card

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| title | 卡片的顶部标题 | `React.ReactNode` | | |
| subTitle | 卡片的副标题 | `React.ReactNode` | | |
| renderButtons | 设置卡片底部的按钮 | `Array<{ name: string, onClick: (data: T, index: number) => any }>` | | |

## api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| getDataSource | 获取数据项 | `function(pagination,filter)` | | |
| onReset | 在页面更新前,重置过滤条件 | `function` | | |

### TableProps

大部分参数跟`antd`的`table`一样， 有几个是特殊的

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| hasIndex      | 是否显示序号 | `boolean` | false |  |
| colums        | 表格列的配置描述, 基于`table`的`columns`但是有额外的配置, 参考`TableColumnType` |  | - |  |
| selectable  | 是否显示表格的选择框 | `boolean` | false |  |
| theme  | 使用**卡片**或者**列表**形式来展示页面 | `list | card` | `list` |  |
| renderCard  | 仅当`theme`为`card`时， 用来设置展示的卡片风格 | `(data: T, index: number) => JSX.Element` | - |  |

### TableColumnType

列描述数据对象

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| renderButtons  | 渲染按钮， 使用该属性后， 默认的`render`属性失效。 | `ActionButton` | `Array<ActionButton>` | `(row) => ActionButton | Array<ActionButton>` | - |  |

### ActionProps

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| importBtn | 是否显示导入按钮 | `boolean` | true |  |
| createBtn  | 是否显示新建按钮 | `boolean` | true |  |
| deleteBtn  | 是否显示删除按钮 | `boolean` | true |  |
| exportBtn   | 是否显示导出按钮 | `boolean` | true |  |
| moreButtons   | 设置更多按钮 | `Array<{ icon?: React.ReactNode; name: string; onClick?: () => any; }>` | - |  |
| uploadUrl   | 上传文件的地址 | `string` | |  |
| templateSrc   | 是否显示导出按钮 | `string` | |  |
| onImport   | 导入成功后的事件 | `function` | |  |
| onCreate   | 新建按钮的点击事件 | `function` | |  |
| onDelete   | 删除按钮的点击事件， 内部实现了自动弹出确认框， 无需重复书写 | `function` |  |  |
| onExport   | 导出文件按钮的点击事件, 第一个参数为导出文件的类型(rows: 选中行， page: 当前页， all: 全部)， 第二个参数为导出传给后端所需参数{} | `(type, { dataSource, selectRows, filter }) => any` |  |  |
