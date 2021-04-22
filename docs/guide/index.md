---
title: 介绍
order: 1
sidemenu: false
nav:
  path: '/guide'
  title: 指南
  order: 1
---

# Env Puzzle

## ✨-特性

* 🚀 开箱即用，便于上手
* ☘ 使用 TypeScript 开发，提供完整的类型定义文件
* 🍭 将平常开发任务的组件，抽象出来，形成的业务组件库
* 🤙 基于React Hooks， antd， 良好的开发体验

## 📚-安装

使用`npm` 或者 `yarn` 安装 `env-puzzle`的依赖。

```
npm i env-puzzle
```

```
yarn add env-puzzle
```

### 按需加载

`env-puzzle`打包过程中将`css`与`js`， 如果使用`import { Percent } from 'env-puzzle'`, 那么该组件中是没有`Percent`组建的样式的。
可以通过以下的写法来按需加载组件:

```javascript
import { Percent } from 'env-puzzle';
import 'env-puzzle/lib/percent/style'; // 或者 env-puzzle/lib/percent/style/css 加载 css 文件
```

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：
```javascript
import { Percent } from 'env-puzzle';
```
插件会帮你转换成 env-puzzle/lib/xxx 的写法。另外此插件配合 style 属性可以做到模块样式的按需自动加载。

由于基于`antd`， 所以在使用`babel-plugin-import`引入`antd`的时候， 需要配置`{ ..., libraryDirectory: 'es', }`
完整代码如下
```javascript
extraBabelPlugins: [
  [
    'import',
    { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
    'antd',
  ],
  [
    'import',
    {
      libraryName: 'env-puzzle',
      style: 'css'
    },
    'env-puzzle',
  ],
]
```

## 💻-示例

```javascript
import {Percent} from 'env-puzzle';

ReactDOM.render(<Percent />, mountNode);
```

### TypeScript

`env-puzzle` 使用 TypeScript 进行书写并提供了完整的定义文件。（不需要引用额外的声明文件）。
