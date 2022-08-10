---
title: JavaScript基础
date: 2021/8/19
categories:
 - [前端,JavaScript]
---

### 前言

#### 网页、网站和应用程序

- 网页：单独的一个页面
- 网站：一系列相关的页面组合到一起。
- 应用程序：可以和用户产生交互，并实现某种功能。

#### 前端三层

- `HTML` 结构层 从语义的角度描述页面结构
- `css` 样式层 从美观的角度描述页面样式
- `JavaScript` 行为层 从交互的角度描述页面行为

#### `JavaScript`的应用场景

`JavaScript`发展到现在几乎无所不能，常见的应用场景有

- 网页特效
- 服务端开发(`Node.js`)
- 命令行工具(`Node.js`)
- 桌面程序(`Electron`)
- `App`(`Cordova`)
- 控制硬件-物联网(`Ruff`)
- 游戏开发(`cocos2d-js`)

### `JavaScript`介绍

#### `JavaScript`是什么

- `JavaScript` 是一种运行在客户端 的脚本语言 ，最早是在 `HTML`（标准通用标记语言下的一个应用）网页上使用，用来给 HTML 网页增加动态功能。
- 浏览器就是一种运行 `JavaScript` 脚本语言的客户端，`JavaScript` 的解释器被称为 `JavaScript` 引擎，为浏览器的一部分。

#### `JavaScript` 简史

- 在 `WEB` 日益发展的同时，网页的大小和复杂性不断增加，受制于网速的限制，为完成简单的表单验证而频繁地与服务器交换数据只会加重用户的负担，当时走在技术革新最前沿的 `Netscape` （网景）公司，决定着手开发一种客户端语言，用来处理这种简单的验证。
- 1995 年，就职于 `Netscape` 公司的 `Brendan Eich`，开始着手为即将于 1996 年 2 月发布的 `Netscape Navigator 2` 浏览器开发一种名为 `LiveScript` 的脚本语言。为了尽快完成 `LiveScript` 的开发，`Netscape` 与 `Sun` 公司建立了一个开发联盟。在 `Netscape Navigator 2` 正式发布前夕，`Netscape` 为了搭上媒体热炒 `Java` 的顺风车，临时把 `LiveScript` 改名为 `JavaScript`。
- 由于 `JavaScript 1.0` 获得的关注度越来越高，1996 年，微软就在其 `Internet Explorer 3` 中加入了名为 `JScript` 的 `JavaScript` 实现，这意味着有了两个不同的 `JavaScript` 版本，导致 `JavaScript` 没有一个标准化的语法和特性。
- 1997 年，以 `JavaScript 1.1` 为蓝本的建议被提交给了欧洲计算机制造商协会（`ECMA`，`European Computer Manufacturers Association`）。该协会指定 39 号技术委员会（`TC39`，`Technical Committee #39`）负责“ 标准化一种通用、跨平台、供应商中立的脚本语言的语法和语义”。`TC39` 由来自 `Netscape`、`Sun`、微软、`Borland` 及其他关注脚本语言发展的公司的程序员组成，他们经过数月的努力完成了 `ECMA-262` 标准，定义一种名为 `ECMAScript` 的新脚本语言。

#### `ECMAScript` 发展过程

![](https://pic.imgdb.cn/item/618a10e62ab3f51d91378a85.png)

#### `ECMAScript` 的应用

- `Javscript`，`JScript`，`ActionScript` 等脚本语言都是基于 `ECMAScript` 标准实现的。
- 在 `JavaScript`，`JScript` 和 `ActionScript` 中声明变量，操作数组等语法完全一样，因为它们都是`ECMAScript`。但是在操作浏览器对象等方面又有各自独特的方法，这些都是各自语言的扩展。

#### `JavaScript` 的组成

`JavaScript` 是由 `ECMAScript`，`DOM` 和 `BOM` 三者组成的。

![](https://pic.imgdb.cn/item/618a120b2ab3f51d913a0910.png)

### 计算机组成

- 软件
  - 应用软件：浏览器(`Chrome`/`IE`/`Firefox`)、`QQ`、`Sublime`、`Word`
  - 系统软件：`Windows`、`Linux`、`mac OS`
- 硬件
  - 三大件：`CPU`、内存、硬盘 -- 主板
  - 输入设备：鼠标、键盘、手写板、摄像头等
  - 输出设备：显示器、打印机、投影仪等
