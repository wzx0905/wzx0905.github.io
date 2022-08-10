---
title: JSDoc
date: 2021/5/13
categories:
 - [前端,JavaScript]
---

# 什么是`JSDoc`

`JSDoc` 是一个根据 `JavaScript` 文件中注释信息，生成 `JavaScript` 应用程序或模块的`API`文档的工具。你可以使用 `JSDoc` 标记如：**命名空间**，**类**，**方法**，**方法参数**等。从而使开发者能够轻易地阅读代码，掌握代码定义的类和其属性和方法，从而降低维护成本，和提高开发效率。

# `JSDoc` 注释规则

`JSDoc`注释一般应该放置在方法或函数声明之前，它必须以`/**`开始，以便由`JSDoc`解析器识别。其他任何以`/*`、`/***`或者超过3个星号的注释，都将被`JSDoc`解析器忽略。

JavaScript 项目中如何有更好的类型提示：`JSDoc` + [`import-types`](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types)

## 类型检查

`@ts-check`

## 类型注解

- `@augments parent`
  - 指明继承自哪个父类
- `@author 作者名字` 
  - 指明作者
- `@callback fuc`
  - 指明这是一个回调函数，可传递给其他函数
- `@class`
  - 指明需要使用`new`关键字调用，别名`@constructor`
- `@classdesc 类描述`
  - 为类添加一大段描述
- `@constant [ ]`
  - 记录一个对象为一个常量
- `@constructor`
  - 指明函数为构造函数
- `@copyright`
  - 指明版权信息
- `@default []`
  - 记录默认值，使用该标签以后会自动添加到文档
- `@description`
  - 提供一般描述，如果在注释开始的地方添加描述，那么可省略该标签
- `@enum []`
  - 描述一个相关属性的集合
- `@examples`
  - 提供一个如何使用描述项的例子
- `@exports moduleName`
  - 标识一个模块
- `@function name`
  - 标记一个对象为一个函数
- `@global`
  - 指明一个全局对象
- `@instance`
  - 记录一个实例成员
- `@license`
  - 标识代码采用何种软件许可协议
- `@member [] []`
  - 记录一个成员
- `@module`
  - 记录一个`JavaScript`模块
- `@namespace`
  - 记录一个命名空间
- `@override`
  - 指明一个标识符覆盖其父类同名标识符
- `@param`
  - 记录函数参数，别名`arg`、`argument`
- `@param {string} name 描述` 
  - 存在多种类型
- `@param {string | string[]} name 描述`
  - 重复使用的参数
- `@param {…number} num`
  - 可选参数，默认值
- `@param {string} [name = 123]`
- `@returns {string} 描述`
  - 记录一个函数的返回值，别名`return`
- `@static`
  - 记录一个静态成员
- `@this`
  - `this`关键字的指向
- `@throws`
  - 描述可能会被抛出什么样的错误
- `@version`
  - 描述版本信息
