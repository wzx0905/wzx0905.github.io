---
title: electron-builder常用配置
date: 2021/7/2
categories:
 - [前端,electron]
---

```js
build: {
    productName: 'xxxx', //项目名 这也是生成的exe文件的前缀名
    appId: 'com.xxx.xxxxx', //包名
    copyright: 'xxxx', //版权信息
    directories: {
        //输出文件夹
        output: 'build'
    },
    nsis: {
        //nsis相关配置，打包方式为nsis时生效
        oneClick: false, // 是否一键安装
        allowElevation: true, // 允许请求提升，如果为false，则用户必须使用提升的权限重新启动安装程序。
        allowToChangeInstallationDirectory: true, // 允许修改安装目录
        installerIcon: './build/icons/aaa.ico', // 安装图标
        uninstallerIcon: './build/icons/bbb.ico', //卸载图标
        installerHeaderIcon: './build/icons/aaa.ico', // 安装时头部图标
        createDesktopShortcut: true, // 创建桌面图标
        createStartMenuShortcut: true, // 创建开始菜单图标
        shortcutName: 'xxxx', // 图标名称
        include: 'build/script/installer.nsh' // 包含的自定义nsis脚本
    },
    publish: [
        {
            provider: 'generic', // 服务器提供商，也可以是GitHub等等
            url: 'http://xxxxx/' // 服务器地址
        }
    ],
    win: {
        icon: 'build/icons/aims.ico',
        target: [
            {
                target: 'nsis', //使用nsis打成安装包，"portable"打包成免安装版
                arch: [
                    'ia32', //32位
                    'x64' //64位
                ]
            }
        ]
    },
    mac: {
        icon: 'build/icons/icon.icns'
    },
    linux: {
        icon: 'build/icons'
    }
}
```

### 附录

- [Common Configuration - electron-builder](https://www.electron.build/configuration/configuration)

