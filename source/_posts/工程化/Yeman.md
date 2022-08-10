---
title: Yeoman
date: 2021/5/17
categories:
 - [前端,工程化]
---

# 安装

用来创造现代化`Web`应用的工具

- 在全局范围安装`yo`
  - `npm install yo --global`
- `yeoman`需要搭配特定的`generator`来使用，例如使用`generator-node`
  - 安装对应的`Generator`
    - `npm install generator-node --global`
  - 通过`Yo`运行`Generator`
    - `cd path/to/porject-dir`
    - `mkdir my-module`
    - `yo node`

# `Sub Generator`

有时候我们并不需要创建完整的项目目录结构，只是需要在已有的项目基础之上创建一些特定类型的文件

- 例如在`my-module`目录下使用`generator-node`所提供的子集生成器`cli`，使项目模块编程`cli`应用
  - 在目录下使用`yo node:cli`
  - 将本地模块`link`到全局，在目录下使用`npm link`
  - 此时就可以在全局使用项目命令`my-module --help`

- 并不是所有的`Generator`都会有子集生成器，所以需要自己去官方文档查看使用

# `Yeoman`的使用

- 明确需求
- 找到合适的`Generator`
- 全局范围安装找到的`Generator`
- 通过`Yo`运行对应的`Generator`
- 通过命令行交互填写选项
- 生成所需要的项目结构

# 自定义`Generator`

虽然市面的`Generator`已经有很多了，也很成熟了，但是我们还是有创建自己`Generator`的必要，因为在实际开发中会出现一部分基础代码和业务代码也是重复性质的，这时我们就可以将这部分代码都放到脚手架中生成，让脚手架可以发挥更大的价值

## 创建`Generator`模块

- `mkdir generator-sample` 创建`Generator`目录
- `cd generator-sample` 进入目录
- `yarn init` 初始化`package.json`
- `yarn add yeoman-generator` 安装`yeoman-generator`模块，该模块提供了生成器的基类，提供了一些工具函数，为创建生成器提供便捷
- 创建 `generators/app/index.js` 
  - 此文件作为 `Generator` 的核心入口
  - 需要导出一个继承自 `Yeoman Generator` 的类型
  - `Yeoman Generator` 在工作时会自动调用我们在此类型中定义的一些生命周期方法
  - 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

```js
const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  writing () {
    // Yeoman 自动在生成文件阶段调用此方法
    // 我们这里尝试往项目目录中写入文件
    this.fs.write(
      this.destinationPath('temp.txt'),
      Math.random().toString()
    )
  }
}
```

- 可以使用 `yarn link` 链接到全局范围，使之成为全局模块包，此时`yeman`工作时就可以找到该模块包
- `yo sample`执行`Generator`

> - `Generator`本质上就是一个`NPM`模块
> - `Generator`的基本结构
>
> ![](https://pic.imgdb.cn/item/60d30889844ef46bb23d1281.png)
>
> - 名称格式必须为`generator-<name>`

## 根据模板创建文件

- 在`generators/app`目录下创建`templates`目录，存放模板文件，模板中完全支持`ejs`模板引擎，相对于手动创建每个文件，模板的方式可以大大提高效率，尤其是在文件多并且复杂的情况下

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= name %></title>
</head>
<body>
  <h1><%= name %></h1>
</body>
</html>
```

- 修改`index.js`导入模板文件

```js
const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  writing () {
    // 通过模板方式写入文件到目标目录
    // 模板文件路径
    const tmpl = this.templatePath('foo.txt')
    // 输出目标路径
    const output = this.destinationPath('foo.txt')
    // 模板数据上下文
    const context = { title: 'Hello zce~', success: false }
    this.fs.copyTpl(tmpl, output, context)
  }
}
```

- 使用`yo sample`运行`Generator`

## 接受用户输入数据

```js
const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  prompting () {
    // Yeoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // appname 为项目生成目录名称
      }
    ])
    .then(answers => {
      // answers => { name: 'user input value' }
      this.answers = answers
    })
  }
  writing () {
    // 模板文件路径
    const tmpl = this.templatePath('bar.html')
    // 输出目标路径
    const output = this.destinationPath('bar.html')
    // 模板数据上下文
    const context = this.answers
    this.fs.copyTpl(tmpl, output, context)
  }
}
```

