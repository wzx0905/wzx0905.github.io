---
title: electron安装失败
date: 2021/7/2
categories:
 - [前端,electron]
---

在安装项目依赖时，出现报错`RequestError: read ECONNRESET`报错，如下图

![](https://pic.imgdb.cn/item/60dedff25132923bf80193f3.png)

解决方法：安装`cross-env`

```shell
npm install -g cross-env
```

然后到项目目录下安装依赖，使用`cross-env`，注意`electron`版本号，我当前的版本为`13.1.5`

```shell
cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron/" npm_config_electron_custom_dir="13.1.5" npm i
```

安装成功！