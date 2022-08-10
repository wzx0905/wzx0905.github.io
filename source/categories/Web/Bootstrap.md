---
title: Bootstrap
date: 2021/8/18
categories:
 - [前端,Web]
---

### `Bootstrap`简介

`Bootstrap`来自`Twitter`（推特），是目前最受欢迎的前端框架。`Bootstrap`是基于`HTML`、`CSS`和`JavaScript`的，它简洁灵活，使得`Web`开发更加快捷。

- [中文官网](http://www.bootcss.com/)
- [官网](http://getbootstrap.com/)

框架：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。使用者要按照框架所规定的某种规范进行开发。

### `Bootstrap`优点

- 标准化的`html`+`css`编码规范
- 提供了一套简洁、直观、强悍的组件
- 有自己的生态圈，不断的更新迭代
- 让开发更简单，提高了开发的效率

### `Bootstrap`版本

- `2.x.x`：停止维护，兼容性好，代码不够简洁，功能不够完善。
- `3.x.x`：目前使用最多，稳定，但是放弃了`IE6`-`IE7`。对`IE8`支持但是界面效果不好，偏向用于开发响应式布局、移动设备优先的`WEB`项目。
- `4.x.x`：最新版，目前还不是很流行

### `Bootstrap`使用

- 创建文件夹结构

  ![](https://pic.imgdb.cn/item/617fb7022ab3f51d918e3f9f.png)

- 创建`html`骨架结构

  ```html
  <!--要求当前网页使用IE浏览器最高版本的内核来渲染-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--视口的设置：视口的宽度和设备一致,默认的缩放比例和PC端一致,用户不能自行缩放-->
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <!--[if It IE 9]>
  	<!--解决ie9以下浏览器对html5新增标签的不识别,并导致CSS不起作用的问题-->
  	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  	<!--解决ie9以下浏览器对css3 Media Query的不识别-->
  	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.minjs"></script>
  <![endif]-->
  ```

- 引入相关样式文件

  ```html
  <!--Bootstrap核心样式-->
  <link rel="stylrsheet" href="bootstrap/css/bootstrap.min.css">
  ```

- 书写内容

  - 直接拿`Bootstrap`预先定义好的样式来使用
  - 修改`Bootstrap`原来的样式，注意权重问题
  - 学好`Bootstrap`的关键在于知道它定义了哪些样式，以及这些样式能实现什么样的效果

### `Bootstrap`布局容器

- `Bootstrap`需要为页面内容和栅格系统包裹一个`.container`容器，它提供了两个作此用处的类。
  - `container`类
    - 响应式布局的容器
    - 大屏（`>=1200px`）宽度定为`1170px`
    - 中屏（`>=992px`）宽度定为`970px`
    - 小屏（`>=768px`）宽度定为`750px`
    - 超小屏（`100%`）
  - `container-fluid`类
    - 流式布局容器 百分百宽度
    - 占据全部视口（`viewport`）的容器
    - 适合于制作移动端页面开发

### `Bootstrap`栅格系统

- 简介

  - 栅格系统英文为"`grid systems`"，也有人翻译为“网格系统”，它是指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局。
  - `Bootstrap`提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（`viewport`）尺寸的增加，系统会自动分为最多12列。

- 栅格选项参数

  - 栅格系统用于通过一系列的行（`row`）与列（`column`）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。

  |                      | 超小屏幕(手机)<br>`<768px` | 小屏设备(平板)<br/>`>=768px` | 中等屏幕(桌面显示器)<br/>`>=992px` | 宽屏设备(大桌面显示器)<br/>`>=1200px` |
  | -------------------- | -------------------------- | ---------------------------- | ---------------------------------- | ------------------------------------- |
  | `.container`最大宽度 | 自动(`100%`)               | `750px`                      | `970px`                            | `1170px`                              |
  | 类前缀               | `.col-xs-`                 | `.col-sm-`                   | `.col-md-`                         | `.col-lg-`                            |
  | 列(`column`)         | 12                         | 12                           | 12                                 | 12                                    |

  - 按照不同屏幕换分为1~12等份
  - 行（`row`）可以去除父容器作用`15px`的边距
  - `xs`-`extra small`：超小；`sm`-`small`：小；`md`-`medium`：中等；`lg`-`large`：大；
  - 列（`column`）大于12，多余的“列（`column`）”所在的元素将被视为一个整体另起一行排列
  - 每一列默认有左右15像素的`padding`
  - 可以同时为一列指定多个设备的类名，以便划分不同份数，例如：`class="col-md-4 col-sm-6"`

- 列嵌套

  - 栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的`.row`元素和一系列`.col-sm-*`元素到已经存在的`.col-sm-*`元素内。

- 列偏移

  - 使用`.col-md-offset-*`类可以将列向右侧偏移。这些类实际是通过`*`选择器为当前元素增加了左侧的边距（`margin`）。

- 列排序

  - 通过使用`.col-md-push-*`往右推和`.col-md-pull-*`往左拉两个类就可以很容易的改变列（`column`）的顺序。

### 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。

| 类名         | 超小屏 | 小屏 | 中屏 | 大屏 |
| ------------ | ------ | ---- | ---- | ---- |
| `.hidden-xs` | 隐藏   | 可见 | 可见 | 可见 |
| `.hidden-sm` | 可见   | 隐藏 | 可见 | 可见 |
| `.hidden-md` | 可见   | 可见 | 隐藏 | 可见 |
| `.hidden-lg` | 可见   | 可见 | 可见 | 隐藏 |

与之相反的，`visibe-xs`、`visibe-sm`、`visibe-md`、`visibe-lg`是针对不同设备显示某个内容。

