---
title: video.js
date: 2022-08-19 09:30:28
categories:
 - [库,JS]
tags:
 - 技术
---

### video.js 概述

- video.js 是一个通用的在网页上嵌入视频播放器的 JS 库。video.js旨在增强HTML5中的视频元素，多年来，它的嵌入代码只是一个video元素。然后，video.js将视频元素包装在一个div中，该div用于放置控件和播放器所需的任何其他内容。
- 官网地址：https://videojs.com/

### video.js使用

##### CDN

```html
<head>
    <link href="https://vjs.zencdn.net/7.20.2/video-js.css" rel="stylesheet" />
    <!-- If you'd like to support IE8 (for Video.js versions prior to v7) -->
    <!-- <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script> -->
</head>
<body>
    <video
           id="my-video"
           class="video-js"
           controls
           preload="auto"
           width="640"
           height="264"
           poster="MY_VIDEO_POSTER.jpg"
           data-setup="{}"
           >
        <source src="MY_VIDEO.mp4" type="video/mp4" />
        <source src="MY_VIDEO.webm" type="video/webm" />
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
               >supports HTML5 video</a
                >
        </p>
    </video>
    <script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
    <script>
        var player = videojs(document.querySelector('.video-js'))
    </script>
</body>
```

##### npm

```shell
$ npm install --save-dev video.js
```

```html
<video id="my-video" class="video-js"></video>
```

```js
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
const player = videojs(document.querySelector('.video-js'));
```

##### 修改配置

```js
var player = videojs('my-video', {
  autoplay: 'muted'
});
// or
player.autoplay('muted');
```

##### 常用配置

```js
videojs('my-video', {
    autoplay: true, // 自动播放(如果video存在autoplay属性，则会被忽略)
        // false: 不会自动播放
        // true: 自动播放(受浏览器自动播放策略的限制)
        // 'muted': 将video元素静音，在加载启动时调用play()
        // 'play': 将在加载启动时调用play()，类似于浏览器自动播放
        // 'any': 在加载启动时调用play()，如果失败，会将video元素静音，然后调用play()
    controls: true, // 显示控件
    loop: false, // 循环
    muted: false, // 静音
    poster: '', // 封面
    width: 320, // 宽
    height: 180, // 高
    src: '', // 视频源URL
    preload: 'auto', // 是否在加载video元素之后立即下载视频数据
        // 'auto': 立即加载视频数据(如果浏览器支持)
        // 'metadata': 只加载视频的meta数据，如duration、dimensions等
        // 'none': 不预加载任何数据
});
```

更多配置项请查看官方ApiDocs：[Video.js Options Reference | Video.js (videojs.com)](https://videojs.com/guides/options/)
