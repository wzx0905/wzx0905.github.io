---
title: JavaScript异步编程
date: 2021/3/25
categories:
 - [前端,JavaScript]
---

# 同步模式

代码中的任务依次执行，排队执行

*`注：优点：代码自上而下执行，便于阅读，逻辑清晰；缺点：如果其中某一部分代码执行时间过长，会造成代码阻塞，页面卡顿，影响用户体验`*

# 异步模式

不会等待这个任务的结束才开始下一个任务，开启之后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义

*`注：优点：不会造成页面阻塞；缺点：代码执行顺序混乱，不易于阅读理解`*

# 回调函数

所有异步编程方案的根基，由调用者定义，交给执行者执行的函数（把函数作为参数传递）

# `Promise`

为异步编程提供一种更合理、更强大的统一解决方案

## 状态

![](https://pic.imgdb.cn/item/60d30889844ef46bb23d12af.png)

*`注：Promise的状态只会从Pending变为Fulfilled或Rejected，且一旦改变不可更改`*

## 基本用法

```js
const promise = new Promise(function(resolve, reject) {
    // 这里用来“兑换”承诺
    resolve(100) // 承诺达成
    // reject(new Error('promise rejected')) // 承诺失败
})
promise.then(function(value) {
    // 成功之后的回调并接受返回值
    console.log('resolved', value)
}, function(error) {
    // 成功之后的回调并接受失败信息
    console.log('rejected', error)
})
```

使用`promise`封装`ajax`案例

```js
// Promise 方式的 AJAX
function ajax (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}
ajax('/api/foo.json').then(function (res) {
    console.log(res)
}, function (error) {
    console.log(error)
})
```

常见误区（错误使用）

``` js
// 嵌套使用 Promise 是最常见的误区
ajax('/api/urls.json').then(function (urls) {
    ajax(urls.users).then(function (users) {
        ajax(urls.users).then(function (users) {

        })
    })
})
```
链式调用（正确使用）

``` js
// 使用链式调用，避免嵌套
ajax('/api/users.json')
    .then(function (value) {
    	return ajax('/api/urls.json')
    }) // => Promise
    .then(function (value) {
    	return ajax('/api/urls.json')
    }) // => Promise
    .then(function (value) {
    	return ajax('/api/urls.json')
    }) // => Promise
    .catch(function onRejected (error) {
    	console.log('onRejected', error)
    })
    .finally(function (value) {
    	console.log(value)
    })
```

*`注：catch(onRejected) 实际上就相当于 then(undefined, onRejected)，Promise 链条上的任何一个异常都会被一直向后传递，直至被捕获，所以建议使用catch方法捕获异常，finally方法无论promise执行成功还是失败都会被调用`*

## 静态方法

- `Promise.resolve()`
  - 快速创建一个执行结果为`Fulfilled`的`Promise`对象
  - 如果传入的是一个值，作为`resolve`的参数返回
  - 如果传入的是一个 `Promise` 对象，`Promise.resolve` 方法原样返回
  - 如果传入的是带有一个跟 `Promise` 一样的 then 方法的对象， `Promise.resolve` 会将这个对象作为 `Promise` 执行

```
Promise.resolve('foo')
    .then(function (value) {
    	console.log(value)
    })
```

- `Promise.reject()`
  - 快速创建一个执行结果为`Rejected`的`Promise`对象
  - 传入任何值，都会作为这个 `Promise` 失败的理由

``` js
Promise.reject(new Error('rejected'))
    .catch(function (error) {
    	console.log(error)
    })
```

- `Promise.all()`
  - 将多个`Promise`合并为一个`Promise`
  - 当所有组合`Promise`执行成功后，才会成功，任何一个`Promise`执行失败都会失败

``` js
ajax('/api/users.json')
ajax('/api/posts.json')
var promise = Promise.all([
    ajax('/api/users.json'),
    ajax('/api/posts.json')
])
promise
    .then(function (values) {
        console.log(values)
    }).catch(function (error) {
        console.log(error)
    })
ajax('/api/urls.json')
    .then(value => {
        const urls = Object.values(value)
        const tasks = urls.map(url => ajax(url))
        return Promise.all(tasks)
    })
    .then(values => {
    	console.log(values)
	})
```

- `Promise.race()`
  - 将多个`Promise`合并为一个`Promise`
  - 只要有一个组合的`Promise`执行成功，就会成功，执行结果以第一个完成的`Promise`为准

``` js
// Promise.race 实现超时控制
const request = ajax('/api/posts.json')
const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timeout')), 500)
})
Promise.race([
    request,
    timeout
])
    .then(value => {
        console.log(value)
    })
    .catch(error => {
        console.log(error)
    })
```

# 执行时序

- 宏任务：回调队列中的任务，宏任务执行过程中可以临时加上一些额外的需求，可以选择作为一个新的宏任务进到队列中排队，也可以作为当前任务的微任务
  - script中的代码块
  - `setTimeout()`
  - `setInterval()`
  - `setImmediate()`（非标准，`IE`和`Node.js`中支持）
  - 注册事件
- 微任务：直接在当前任务结束过后立即执行
  - `Promise`
  - `MutationObserver`
  - `queueMicrotask()`
  - `process.nextTick(Nodejs)`

# `Generator`异步方案

使得异步调用变得扁平化

``` js
// Generator 配合 Promise 的异步方案
function ajax (url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.statusText))
            }
        }
        xhr.send()
    })
}
function * main () {
    try {
        const users = yield ajax('/api/users.json')
        console.log(users)

        const posts = yield ajax('/api/posts.json')
        console.log(posts)

        const urls = yield ajax('/api/urls11.json')
        console.log(urls)
    } catch (e) {
        console.log(e)
    }
}
function co (generator) {
    const g = generator()
    function handleResult (result) {
        if (result.done) return // 生成器函数结束
        result.value.then(data => {
            handleResult(g.next(data))
        }, error => {
            g.throw(error)
        })
    }
    handleResult(g.next())
}
co(main)
```

# `Async/Await`语法糖

语言层面的异步编程标准

``` js
async function main () {
    try {
        const users = await ajax('/api/users.json')
        console.log(users)
        const posts = await ajax('/api/posts.json')
        console.log(posts)
        const urls = await ajax('/api/urls.json')
        console.log(urls)
    } catch (e) {
        console.log(e)
    }
}
main ()
```

*`注：async返回是一个Promsie对象，await目前只能async内部使用`*
