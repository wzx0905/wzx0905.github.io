---
title: electron+vue项目添加vue-devTools
date: 2021/6/30
categories:
 - [前端,electron]
---

首先需要下载vue-devtools离线crx文件，建议使用第三方谷歌商店镜像站

[收藏猫插件-Chrome插件商店](https://chrome.pictureknow.com/)

在商店内找到vue-devtools，选择下载插件手动安装

![](https://pic.imgdb.cn/item/60dc2e925132923bf8892361.png)

下载完成后解压缩，得到vue-devtools文件夹

![](https://pic.imgdb.cn/item/60dc2e925132923bf8892376.png)

拿到vue-devtools文件夹路径，在win.loadURL()之前导入vue-devtools插件

![](https://pic.imgdb.cn/item/60dc2e925132923bf889238e.png)

此时插件已经可以正常使用了

![](https://pic.imgdb.cn/item/60dc2e975132923bf8893c5e.png)

但还存在一些小问题需要处理

![](https://pic.imgdb.cn/item/60dc2e975132923bf8893c44.png)

我们回到vue-devtools插件文件夹下，找到manifest.json并打开

![](https://pic.imgdb.cn/item/60dc2e975132923bf8893c73.png)

将刚才提示所对应的字段手动删除，重新启动electron

![](https://pic.imgdb.cn/item/60dc2e975132923bf8893c9c.png)

大功告成！