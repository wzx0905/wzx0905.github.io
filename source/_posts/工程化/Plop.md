---
title: Plop
date: 2021/5/18
categories:
 - [前端,工程化]
---

- 将`plop`作为一个`npm`模块安装到开发依赖当中

```shell
yarn add plop --dev
```

- 项目根目录下新建一个`plopfile.js`文件

```js
// Plop入口文件,需要导出一个函数
// 此函数接收一个Plop对象，用于创建生成器任务
// setGenerator需要两个参数，第一个参数是项目名字，第二个参数是项目配置
module.exports = plop => {
    plop.setGenerator('component',{
        description:'create a component',
        prompots:[
            {
                type:'input',
                name:'name',
                message:'component name',
                default:'MyCompontent',
            }
        ],
　　　　　// 添加多个模板，就在actions中添加多个数组
        actions:[
            {
                type:'add',
                path:'src/components/{{name}}/{{name}}.js',
                templateFile:'plop-templates/component.hbs'
            },
            {
                type:'add',
                path:'src/components/{{name}}/{{name}}.js',
                templateFile:'plop-templates/component.test.hbs'
            }
        ]
    })
}
```

- 新建`plop-templates`文件夹，在此文件夹下新建`components.hbs`文件，写入模板

```react
import React from 'React';
export default() => (
    <div className="{{name}}">
        <h1>{{name}}Component</h1>
    </div>
)
```

- 通过`yarn`启动`plop`程序

```shell
yarn plop component
```

- 总结
  - 将`plop`模块作为项目开发依赖安装
  - 在项目根目录下创建一个`plopfile.js`文件
  - 在`plopfile.js`文件中定义脚手架任务
  - 编写用于生产特定类型文件的模板
  - 通过`plop`提供的`CLI`运行脚手架任务
