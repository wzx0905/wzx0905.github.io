---
title: Grunt
date: 2021/5/24
categories:
 - [前端,工程化]
---

# 基本使用

- 创建一个 `package.json`

```shell
yarn init --yes
// --yes 跳过会话，直接通过默认值生成 package.json
// yarn init --yes # 简写 -y
```

- 添加`Grunt`模块

```shell
yarn add grunt
```

- 添加`gruntfile`文件

```shell
code gruntfile.js
```

```js
// Grunt的入口文件
// 用于定义一些需要Grunt自动执行的文件
// 需要导出一个函数
// 此函数接收一个grunt的形参，内部提供一些创建任务时可以用到的API
// registerTask注册任务
// 有两个参数，第一个参数可以指定任务名称，第二个参数指定任务函数（当任务发生时，自动执行的函数）
module.exports = grunt =>{
    // 命令行执行 yarn grunt foo
    grunt.registerTask('foo',() => {
        console.log('hello grunt~')
    })
    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task')
    })
    // default 是默认任务名称
    // 通过 grunt 执行时可以省略
    // grunt.registerTask('default', () => {
    //     console.log('default task')
    // })
    // 第二个参数可以指定此任务的映射任务，
    // 这样执行 default 就相当于执行对应的任务
    // 这里映射的任务会按顺序依次执行，不会同步执行
    grunt.registerTask('default', ['foo', 'bar'])
    // 也可以在任务函数中执行其他任务
    grunt.registerTask('run-other', () => {
        // foo 和 bar 会在当前任务执行完成过后自动依次执行
        grunt.task.run('foo', 'bar')
        console.log('current task runing~')
    })
    // 默认 grunt 采用同步模式编码
    // 如果需要异步可以使用 this.async() 方法创建回调函数
    // grunt.registerTask('async-task', () => {
    //   setTimeout(() => {
    //     console.log('async task working~')
    //   }, 1000)
    // })
    // 由于函数体中需要使用 this，所以这里不能使用箭头函数
    grunt.registerTask('async-task', function () {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working~')
            done()
        }, 1000)
    })
}
```

# 标记任务失败

```js
module.exports = grunt => {
  // 任务函数执行过程中如果返回 false
  // 则意味着此任务执行失败
  grunt.registerTask('bad', () => {
    console.log('bad working~')
    return false
  })
  grunt.registerTask('foo', () => {
    console.log('foo working~')
  })
  grunt.registerTask('bar', () => {
    console.log('bar working~')
  })
  // 如果一个任务列表中的某个任务执行失败
  // 则后续任务默认不会运行
  // 除非 grunt 运行时指定 --force 参数强制执行
  grunt.registerTask('default', ['foo', 'bad', 'bar'])
  // 异步函数中标记当前任务执行失败的方式是为回调函数指定一个 false 的实参
  grunt.registerTask('bad-async', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working~')
      done(false)
    }, 1000)
  })
}
```

# 配置方法

```js
module.exports = grunt => {
  // grunt.initConfig() 用于为任务添加一些配置选项
  grunt.initConfig({
    // 键一般对应任务的名称
    // 值可以是任意类型的数据
    foo: {
      bar: 'baz'
    }
  })
  grunt.registerTask('foo', () => {
    // 任务中可以使用 grunt.config() 获取配置
    console.log(grunt.config('foo'))
    // 如果属性值是对象的话，config 中可以使用点的方式定位对象中属性的值
    console.log(grunt.config('foo.bar'))
  })
}
```

# 多目标任务

```js
module.exports = grunt => {
  // 多目标模式，可以让任务根据配置形成多个子任务
  // grunt.initConfig({
  //   build: {
  //     foo: 100,
  //     bar: '456'
  //   }
  // })
  // grunt.registerMultiTask('build', function () {
  //   console.log(`task: build, target: ${this.target}, data: ${this.data}`)
  // })
  grunt.initConfig({
    build: {
      options: {
        msg: 'task options'
      },
      foo: {
        options: {
          msg: 'foo target options'
        }
      },
      bar: '456'
    }
  })
  grunt.registerMultiTask('build', function () {
    console.log(this.options())
  })
}
```

# 插件使用

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/**'
    }
  })
  grunt.loadNpmTasks('grunt-contrib-clean')
}
```

# 常用插件

```js
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })
  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务
  grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
```

