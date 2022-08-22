---
title: HTML基本结构
tags:
  - 技术
date: 2022-08-22 09:37:44
categories:
  - [HTML,基础]
---

### 基本骨架

HTML文件最基本的四个标签，组成了网页的基本骨架，包括：html、head、title、body四组标签。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```



#### html标签

- **作用**：定义HTML文件的根元素，表示整个HTML文档，所有的标签都要书写在html标签内部。

#### head标签

- **作用**：用于存放title，meta，base，style，script，link。内部用于对网页的设置，除了title内部的文字，其他标签都不显示在浏览器上。

- 注意在head标签中我们必须要设置的标签是title。

#### title标签

- **作用**
  - 让网页拥有一个属于自己的标题。
  - title中的关键字可以作为搜索引擎抓取时的关键字，提高SEO搜索引擎优化。
  - 内部的内容会显示在搜索结果的标题部分。
  - 作为浏览器收藏夹默认的网页标题。
- 建议网页必须添加title标签内部内容，内容尽量精简，提取网页的关键字。

#### body标签

- **作用**：定义网页的主题部分，用于存放所有的HTML显示内容的标签p，h1，a，div等。

- body内部的元素内容会显示在浏览器的窗口中。
