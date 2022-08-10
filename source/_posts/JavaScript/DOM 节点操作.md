---
title: DOM 节点操作
date: 2021/9/3
categories:
 - [前端,JavaScript]
---

### `DOM` 树

![](https://pic.imgdb.cn/item/61b029542ab3f51d910d66fa.png)

### 节点属性

- `nodeType` 节点的类型，属性值为数字，表示不同的节点类型，共 12 种，只读
  - 元素节点
  - 属性节点
  - 文本节点
- `nodeName` 节点的名称(标签名称)，只读
- `nodeValue` 节点值，返回或设置当前节点的值
  - 元素节点的 `nodeValue` 始终是 `null`

### 父子节点常用属性

- `childNodes` 只读属性，获取一个节点所有子节点的实时的集合，集合是动态变化的。
- `children` 只读属性，返回一个节点所有的子元素节点集合，是一个动态更新的 `HTML` 元素集合。
- `firstChild` 只读属性，返回该节点的第一个子节点，如果该节点没有子节点则返回 `null`
- `lastChild` 只读属性，返回该节点的最后一个子节点，如果该节点没有子节点则返回 `null`。
- `parentNode` 返回一个当前节点的父节点，如果没有这样的节点，比如说像这个节点是树结构 的顶端或者没有插入一棵树中，这个属性返回 `null`
- `parentElement` 返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 `DOM` 元素，则返回 `null`

### 兄弟节点常用属性

- `nextSibling` 只读属性，返回与该节点同级的下一个节点，如果没有返回`null`。 
- `previousSibling` 只读属性，返回与该节点同级的上一个节点，如果没有返回`null`。
- `nextElementSibling` 只读属性，返回与该节点同级的下一个元素节点，如果没有返回`null`。
- `previousElementSibling` 只读属性，返回与该节点同级的上一个元素节点，如果没有返回`null`。
- 注意：`nextElementSibling` 和 `previousElementSibling` 有兼容性问题，`IE9`以后才支持。

### 创建新节点的方法

- `document.createElement("div")` 创建元素节点
- `document.createAttribute("id")` 创建属性节点
- `document.createTextNode("hello")` 创建文本节点
- 一般将创建的新节点存在变量中，方便使用。

### 节点常用操作方法 1

- `parentNode.appendChild(child)`将一个节点添加到指定父节点的子节点列表末尾。
- `parentNode.replaceChild(newChild, oldChild)：`用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。
- `parentNode.insertBefore(newNode, referenceNode)：`在参考节点之前插入一个拥有指定父节点的子节点，`referenceNode` 必须设置，如果 `referenceElement` 为 `null` 则 `newNode` 将被插入到子节点的末尾。
- `parentNode.removeChild(child)：`移除当前节点的一个子节点。这个子节点必须存在于当前节点中。

### 节点常用操作方法 2

- `Node.cloneNode()`克隆一个节点，并且可以选择是否克隆这个节点下的所有内容。参数为 `Boolean` 布尔值，表示是否采用深度克隆,如果为 `true`,则该节点的所有后代节点也都会被克隆,如果为 `false`,则只克隆该节点本身，默认值为 `true`，节点下的内容会被克隆。
- 注意：克隆时，标签上的属性和属性值也会被复制，写在标签行内的绑定事件可以被复制，但是通过 `JavaScript` 动态绑定的事件不会被复制

### 节点常用操作方法 3

- `Node.hasChildNodes()`没有参数，返回一个 `Boolean` 布尔值，来表示该元素是否包含有子节点。
- `Node.contains(child)`返回一个 `Boolean` 布尔值，来表示传入的节点是否为该节点的后代节点。

### 判断方法总结

- 有三种方法可以判断当前节点是否有子节点。

  - `node.firstChild !== null`

  - `node.childNodes.length > 0`

  - `node.hasChildNodes()`

