---
title: Web API
date: 2021/8/29
categories:
 - [前端,JavaScript]
---

### `API`的概念

- `API`（`Application Programming Interface`,应用程序编程接口）是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。
- 任何开发语言都有自己的 `API`
- `API` 的特征输入和输出(`I/O`) 例如：`var max = Math.max(2,3,4);`
- `API` 的使用方法`console.log("abc")`

### `Web API` 的概念

- 浏览器提供了一套操作浏览器功能和页面元素的 `API`(`BOM` 和 `DOM`)。
- 此处的 `Web API` 特指浏览器提供的 `API`(一组方法)，`Web API` 在后面的课程中有其它含义。
- 学习目标：掌握常见浏览器提供的 `API` 的调用方式。
- 学习辅助 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API)

### `JavaScript` 的组成

![](https://pic.imgdb.cn/item/61b0161b2ab3f51d91fe1a03.png)

#### `ECMAScript`

- `JavaScript` 的核心
- 定义了 `JavaScript` 的语法规范
- `JavaScript` 的核心，描述了语言的基本语法和数据类型，`ECMAScript` 是一套标准，定义了一种语言的标准与具体实现无关。

#### `BOM`

- 浏览器对象模型
- `browser object model`，一套操作浏览器功能的 `API`。
- 通过 `BOM` 可以操作浏览器窗口，比如：弹出框、控制浏览器跳转、获取分辨率等 。

#### `DOM`

- 文档对象模型
- `document object model`，一套操作页面元素的 `API`。
- `DOM` 可以把 `HTML` 看做是文档树，通过 `DOM` 提供的 `API` 可以对树上的节点进行操作

