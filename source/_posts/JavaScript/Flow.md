---
title: Flow
date: 2021/4/15
categories:
 - [前端,JavaScript]
---

`Flow`是 `JavaScript` 的静态类型检查器，`Flow` 发布在 `GitHub` 上，在 `Facebook` 内部大量使用，并且是开源的。
`Flow`使用类型注解，来给参数添加类型控制。在生产环境中可以通过编译工具，去掉类型注解，我们可以在自己需要的地方添加类型注解

# 在项目中使用`flow`

- 安装`flow-bin` `npm i flow-bin -D`
- 在要被检查的文件顶部添加 `// @flow` 标记文件要被`flow`进行检查
- 在`package.json`中的`script`中添加命令 `"flow": "flow"`
- 运行`npm run flow init`，创建`flowconfig`文件
- 运行命令 `npm run flow`

# 移除类型注解

- 方案一:自动移除类型注解，官方提供的模块：
  - 运行`npm i flow-remove-types --dev`安装`flow-remove-types`模块
  - 在`package.json`的`script` 中添加命令 `"flow-remove-types":"flow-remove-types . -d dist"`
  - 运行 `npm run flow-remove-types` 生成dist目录，其中的文件就是编译移除类型注解后的。
- 方案二:`babel`
  - 安装`babel` `npm i @babel/core @babel/cli @babel/preset-flow -D`
  - 创建`.babelrc`文件，添加 ` {"presets":["@babel/preset-flow"]}`
  - 在`package.json`的`script` 中添加 `"build":"babel . -d dist"`
  - 运行 `npm run build`

可以安装`VSCode`插件`Flow Language Support`来实时监听类型错误，但是需要保存之后才能看到错误的波浪线

# `Flow` 基本使用

- `flow` 可以为我们的代码，进行类型推断，如下图，函数参数没有添加注解但是flow可以根据运算符推断参数类型，并且给出错误提示，但是还是建议给参数都加上类型注解

![](https://pic.imgdb.cn/item/60e522515132923bf8cd8445.png)

- 类型注解，类型注解不仅可以给函数参数标记类型还可以用来标记变量的类型和函数返回值的类型

- 原始类型 目前原始类型共有6种，`number`、`boolean`、`string`、`null`、`undefined`、`symbol`，这里主要的是 `undefined` 是需要用`void`进行表示

- 结构类型
  - 数组类型
  - 对象类型
  - 函数类型
	 * 特殊类型
	   - 字面量类型 `const a: 'foo' = 'foo'` `a`的值只能是`foo`字符串
	     - 或类型 `const type: 'success' | 'warning' | 'danger' = 'success'` `type`的值只能是三者之一
	     - 声明类型, 通过`type`声明一个类型别名
	     - `Maybe`类型
  * `Mixed`与`any`
       - 两者都表示任意类型，但是`Mixed` 还是强类型，需要添加 `typeof` 判断类型
    - 而`any` 就是随便使用类似于`js`原始的类型特性
