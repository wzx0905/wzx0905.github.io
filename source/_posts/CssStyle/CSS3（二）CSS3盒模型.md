---
title: CSS3（二）CSS3盒模型
date: 2021/8/12
categories:
 - [前端,Css]
---

`CSS3` 中可以通过 `box-sizing` 来指定盒模型，这样我们就可以设置如何计算一个元素的总宽度和总高度。

| 属性值        | 简介                                                         |
| ------------- | ------------------------------------------------------------ |
| `content-box` | 默认值，标准盒子模型，盒模型是外扩的。<br/>`width` 与 `height` 只包括内容的宽和高。<br/>`在 width 和 height 之外绘制元素的内边距和边框。` |
| `border-box`  | 怪异模式，盒模型是内减的。<br/>`width` 和 `height` 属性包括内容，内边距和边框，但不包括外边距。<br/>`为元素指定的任何内边距和边框都将在已设定的 width 和 height 内进行绘制。` |

`content-box` 标准模式

- `Standard` 模式：标准模式中，盒子总体大小为 `width`(`height`) + `padding` + `border`，内容区域是 `width` 和 `height` 部分。

`border-box` 怪异模式

- `Quirks` 模式：怪异模式中，盒子总体大小为 `width` 和 `height`，添加了`padding`和`border`后，内容区域会收缩。
