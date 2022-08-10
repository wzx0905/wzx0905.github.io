---
title: ECMAScript新特性(二)ES6+
date: 2021/4/5
categories:
 - [前端,JavaScript]
---

# `ES2016`

## 数组扩展方法

- `includes()`判断数组是否包含某一个元素

## 指数运算符

```js
// Math.pow(2, 10)
2 ** 10 // 2的10次方
```

# `ES2017`

## 对象扩展方法

- `Object.values()`对象中所有值组成的数组

- `Object.entries()`对象中所有键值对组成的数组

- `Object.getOwnPropertyDescriptors()`获取对象中属性的详细描述信息

```js
const p1 = {
  firstName: 'Lei',
  lastName: 'Wang',
  get fullName () {
    return this.firstName + ' ' + this.lastName
  }
}
// console.log(p1.fullName)
// const p2 = Object.assign({}, p1)
// p2.firstName = 'zce'
// console.log(p2)
const descriptors = Object.getOwnPropertyDescriptors(p1)
// console.log(descriptors)
const p2 = Object.defineProperties({}, descriptors)
p2.firstName = 'zce'
console.log(p2.fullName)
```

## 字符串的扩展方法

- `String.prototype.padStart()`用给定的字符串填充目标字符串的开始位置，直到该字符串达到指定长度
- `String.prototype.padEnd()`用给定的字符串填充目标字符串的结束位置，直到该字符串达到指定长度

## 在函数参数中添加尾逗号

```js
function foo (
  bar,
  baz,
) {}
```

## `Async/Await`

- `Async` 自动将常规函数转换成 `Promise`，返回值一个 `Promise` 对象

- `Await` 放置在 `Promise` 调用之前，强制后面的代码等待，直到 `Promise` 对象 `resolve`，得到 `resolve` 的值作为 `await` 表达式的运算结果

# `ES2018`

## `Async/Await` 异步迭代

`ES2018`引入异步迭代器（`asynchronous iterators`），使得`await`可以和`for…of`循环一起使用，以串行的方式运行异步操作

## `Promise.finally()`

不管 `Promise` 对象最后状态如何，都会执行的操作

## 正则表达式`s(dotAll)`标记

使得`.`可以匹配任意单个字符（除了换行符）

# `ES2019`

## 字符串的扩展方法

- `String.prototype.trimStart()`去除给定的字符串开始位置的空格、换行符等
- `String.prototype.trimEnd()`去除给定的字符串结束位置的空格、换行符等

## 对象的扩展方法

- `Object.fromEntries()`把一个对象转为`[key, value]`键值对的形式

## 数组的扩展方法

- `Array.prototype.flat()`多维数组拍平
- `Array.prototype.flatMap()`相当于`flat`和`map`一起组合操作

## `catch`的参数改为可选

在进行`try...catch`错误处理过程中，可以省略catch绑定的参数和括号

## `Symbol.description`

描述属性是只读的，可用于获取符号对象的描述，更好了解它的作用

# `ES2020`

## 可选链运算符`?.`

允许读取位于连接对象链深处的属性值,而不必明确验证链中的每个引用是否有效

```js
let nestedProp = obj.first && obj.first.second;
// 等价于
let nestedProp = obj.first?.second;
// js会在尝试访问obj.first.second之前隐式的检查并确定obj.first既不是null也不是undefined。如果obj.first是null或者undefined,表达式将会短路计算直接返回undefined
```

## 空值合并运算符`??`

可以在使用可选链时设置一个默认值

```js
function foo (option) {
  // 只有 size = null 或者 undefined
  option.size = option.size ?? 100
  const mode = option.mode || 'hash' 
  console.log(option)
}
foo({ size: 0 })
```

## 字符串的扩展方法

- `String.prototype.matchAll()`返回一个正则表达式在当前字符串中所有的匹配

## `import()`

一种使用动态说明符异步导入模块的语法

```js
import(`./home.js`)
  .then(({export1, export2})=> 
    // 加载成功的回调
  })
  .catch(err => {
    // 加载失败的回调
  });
```

## `BigInt`

一个用于处理任意精度整数的新数字基元

## `Promise.allSettled()`

接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束，一旦结束，状态总是  `fulfilled`，不会变成`rejected`。状态变成`fulfilled`后，`Promise` 的监听函数接收到的参数是一个数组，每个成员对应一个传入`Promise.allSettled()`的 `Promise` 实例

## `globalThis`

一种在不同环境中获取顶层对象的通用方式

## `import.meta`

给`JavaScript`模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的`URL`

# `ES2021`

## 字符串的扩展方法

- `String.prototype.replaceAll()`全部替换

## `Promise.any()`

只要其中的一个 `Promise` 成功，就返回那个已经成功的 `Promise`，如果可迭代对象中没有一个 `Promise` 成功（即所有的 `Promise` 都失败/拒绝），就返回一个失败的 `Promise`和 `AggregateError` 类型的实例，它是 `Error` 的一个子类，用于把单一的错误集合在一起

