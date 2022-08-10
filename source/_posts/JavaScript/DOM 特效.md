---
title: DOM 特效
date: 2021/9/5
categories:
 - [前端,JavaScript]
---

> `DOM` 提供了一套与元素自身有关的位置和大小的属性。

### 偏移量属性

- `offsetParent` 偏移参考父级，距离自己最近的有定位的父级，如果都没有定位参考`body(html)`
- `offsetLeft`/`offsetTop` 偏移位置
- `offsetWidth`/`offsetHeight` 偏移大

### 偏移量属性

![](https://pic.imgdb.cn/item/61b067352ab3f51d912bb9c3.png)

### 客户端大小

- `client` 系列没有参考父级元素。
- `clientLeft`/`clientTop` 边框区域尺寸，不常用。
- `clientWidth`/`clientHeight` 边框内部大小。

### 客户端大小

![](https://pic.imgdb.cn/item/61b067c32ab3f51d912bf41d.png)

### 滚动偏移属性

- `scrollLeft`/`scrollTop` 盒子内部滚动出去的尺寸
- `scrollWidth`/`scrollHeight` 盒子内容的宽度和高度

### 滚动偏移属性

![](https://pic.imgdb.cn/item/61b068082ab3f51d912c1126.png)

