---
title: ECMAScript新特性(一)ES6
date: 2021/4/1
categories:
 - [前端,JavaScript]
---

大致可分为四类

- 解决原有语法上的⼀些问题或者不足
- 对原有语法进⾏增强
- 全新的对象、全新的⽅法、全新的功能
- 全新的数据类型和数据结构

# `let`与块级作用域

- 作用域: 指某个成员能够起作用的范围

- `ES2015`之前只有两种作用域：全局作用域和函数作用域，`ES2015`新增了块级作用域(代码中用一对花括号`{}`包裹起来的范围)，同时新增`let`关键字声明变量，在块级作用域内使用`let`声明的变量只会在当前的块级作用域内访问

- `let`存在暂时性死区(声明之前不可用)

```js
if (true) {
    console.log(bar) // undefined
    var bar = '132'
    console.log(foo) // Uncaught ReferenceError: Cannot access 'foo' before initialization
    let foo = 'abc'
    console.log(foo) // abc
}
console.log(foo) // Uncaught ReferenceError: foo is not defined
```

*`注：从以上这个例子可以看出`*

*`1.let声明的成员只会在所声明的块中生效，外部无法访问`*

*`2.let存在暂时性死区，声明之前不可用，会抛出异常，但是从异常信息中我们可以了解到此时并非是foo is not defined，说明let与var都存在变量提升，但var对变量进行了初始化undefined的操作，使得我们在var定义变量之前也能够访问该变量，而let并没有对变量进行初始化，所以导致访问变量时抛出异常信息`*

# `const`

- 在`let`基础上多了只读的特性，与`let`用法基本一致，区别在于`const`定义的通常是常量，即声明过后的变量不允许重新赋值，声明时就必须赋值
- 如果使用`const`声明复杂类型的数据，如`object`，则只针对于`const`所声明的`object`的内存地址不可修改，对于`object`内部数据可以正常修改

# 数组的解构

```js
// 基本用法
const arr = [100, 200, 300]
const [foo, bar, baz] = arr
console.log(foo, bar, baz) // 100, 200, 300
// 获取指定位置的值
const [, , baz] = arr
console.log(baz) // 300
// 利用剩余参数接受
const [foo, ...rest] = arr
console.log(rest) // [200, 300]
// 根据下标没有匹配到对应值时返回undefined
const [foo, bar, baz, more] = arr
console.log(more) // undefined
// 添加默认值
const [foo, bar, baz = 123, more = 'default value'] = arr
console.log(baz, more) // 300, 'default value'
```

# 对象的解构

``` js
// 基本用法
const obj = { name: 'zce', age: 18 }
const { name } = obj
console.log(name) // zce
// 对于命名存在冲突的解构时，可以重命名
const name = 'tom'
const { name: objName } = obj
console.log(objName)
// 添加默认值
const name = 'tom'
const { name: objName = 'jack' } = obj
console.log(objName)
```

# 模板字符串

- 使用反引号来创建模板字符串
- 直接使用跟普通字符串没有什么区别，但是它比普通字符串多了很多新功能
  - 支持换行，多行字符串
  - 支持插入表达式

```js
// 基本用法
const str = `hello es2015, this is a string`
// 允许换行
const str = `hello es2015,
this is a \`string\`` // 如果字符串中需要使用`，可以使用\进行转义
// 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置
const name = 'tom'
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}`
```

- 带标签的模板字符串
  - 模板字符串的标签就是一个特殊的函数
  - 使用这个标签就是调用这个函数

```js
const name = 'tom'
const gender = false
function myTagFunc (strings, name, gender) {
	// 这里的strings 就是模板字符串中静态的字符串组成的数组
	console.log(strings) // ['hey',' is a']
	const sex = gender ? 'man' : 'woman'
	// 标签函数的返回值就是模板字符串的返回值
	return strings[0] + name + strings[1] + sex + strings[2]
}
const result = myTagFunc`hey,${name} is a ${gender}`
```

# 字符串扩展方法

- `startsWith()`判断字符串是否以参数开头
- `endsWith()`判断字符串是否以参数结尾
- `includes()`判断字符串中是否包含参数

# 参数默认值

``` js
// 参数默认值必须写在最后
function foo (a, b, c = true) {
  console.log(c)
}
foo() // true
```

# `...`操作运算符

- 剩余参数

``` js
function foo (first, ...rest) {
  console.log(rest)
}
foo(1, 2, 3) // [2, 3]
```

- 展开数组

``` js
const arr = ['foo', 'bar', 'baz']
console.log(...arr)
```

# 箭头函数

- 箭头函数不会改变 `this` 指向
- 没有`arguments`
- 不能用作构造函数

```js
// 普通函数
function inc (number) {
	return number + 1
}
// 箭头函数
const inc = n => n + 1
```

# 对象字面量增强

``` js
const bar = '345'
const obj = {
  foo: 123,
  // bar: bar
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // method1: function () {
  //   console.log('method111')
  // }
  // 方法可以省略 : function
  method1 () {
    console.log('method111')
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this)
  },
  // Math.random(): 123 // 不允许
  // 计算属性名，通过 [] 让表达式的结果作为属性名
  [bar]: 123
}
```

## `Object.assign`

- 可以将多个源对象中的属性复制到一个目标对象中，返回目标对象，如果存在相同属性，则会使用后边的源对象覆盖目标对象
- 浅拷贝

``` js
function func (obj) {
  // obj.name = 'func obj'
  // console.log(obj)

  const funcObj = Object.assign({}, obj)
  funcObj.name = 'func obj'
  console.log(funcObj)
}
const obj = { name: 'global obj' }
func(obj)
console.log(obj)
```

## `Object.is`

- 判断两个值是否为同一个值

```js
// 0 == false              // => true
// 0 === false             // => false
// +0 === -0               // => true
// NaN === NaN             // => false
// Object.is(+0, -0)       // => false
// Object.is(NaN, NaN)     // => true
```

# `Proxy`

``` js
// 基本使用
const person = {
  name: 'zce',
  age: 20
}
// new Proxy接受两个参数，第一个参数为需要代理的目标对象，第二个为代理的处理对象
const personProxy = new Proxy(person, {
  // 监视属性读取
  // target 目标对象 这里指的就是person
  // property 要访问的目标对象的属性
  get (target, property) {
    return property in target ? target[property] : 'default'
    // console.log(target, property)
    // return 100
  },
  // 监视属性设置
  // target 目标对象 这里指的就是person
  // property 要访问的目标对象的属性
  // value是新值
  set (target, property, value) {
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an int`)
      }
    }
    target[property] = value
    // console.log(target, property, value)
  }
})
personProxy.age = 100
personProxy.gender = true
console.log(personProxy.name)
```

与`defineProperty`的区别

- `Proxy` 可以监视读写以外的操作

``` js
const person = {
  name: 'zce',
  age: 20
}
const personProxy = new Proxy(person, {
  deleteProperty (target, property) {
    console.log('delete', property)
    delete target[property]
  }
})
delete personProxy.age
console.log(person)
```

- `Proxy` 可以很方便的监视数组操作

``` js
const list = []
const listProxy = new Proxy(list, {
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 表示设置成功
  }
})
listProxy.push(100)
listProxy.push(100)
```

- `Proxy` 不需要侵入对象,方式更为合理

``` js
const person = {}
Object.defineProperty(person, 'name', {
  get () {
    console.log('name 被访问')
    return person._name
  },
  set (value) {
    console.log('name 被设置')
    person._name = value
  }
})
Object.defineProperty(person, 'age', {
  get () {
    console.log('age 被访问')
    return person._age
  },
  set (value) {
    console.log('age 被设置')
    person._age = value
  }
})
person.name = 'jack'
console.log(person.name)
// Proxy 方式更为合理
const person2 = {
  name: 'zce',
  age: 20
}
const personProxy = new Proxy(person2, {
  get (target, property) {
    console.log('get', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
  }
})
personProxy.name = 'jack'
console.log(personProxy.name)
```

# `Reflect`

`Reflect` 是一个内置的对象，内部封装了一系列对对象的底层操作，属于静态类，不能被实例，`Reflect` 成员方法就是`Proxy`处理对象的默认实现

- **`Reflect.apply(target, thisArgument, argumentsList)`** 
  - 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 `Function.prototype.apply()` 功能类似。
- **`Reflect.construct(target, argumentsList[, newTarget])`** 
  - 对构造函数进行 new 操作，相当于执行 `new target(…args)`。
- **`Reflect.defineProperty(target, propertyKey, attributes)`** 
  - 和 `Object.defineProperty()` 类似，如果设置成功就会返回 `true`
- **`Reflect.deleteProperty(target, propertyKey)`** 
  - 作为函数的`delete`操作符，相当于执行 `delete target[name]`。
- **`Reflect.get(target, propertyKey[, receiver])`** 
  - 获取对象身上某个属性的值，类似于 `target[name]`。
- **`Reflect.getOwnPropertyDescriptor(target, propertyKey)`** 
  - 类似于 `Object.getOwnPropertyDescriptor()`，如果对象中存在该属性，则返回对应的属性描述符, 否则返回`undefined`.
- **`Reflect.getPrototypeOf(target)`** 
  - 类似于 `Object.getPrototypeOf()`。
- **`Reflect.has(target, propertyKey)`** 
  - 判断一个对象是否存在某个属性，和 `in` 运算符 的功能完全相同。
- **`Reflect.isExtensible(target)`** 
  - 类似于 `Object.isExtensible()`.
- **`Reflect.ownKeys(target)`** 
  - 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 `Object.keys()`, 但不会受`enumerable`影响).
- **`Reflect.preventExtensions(target)`** 
  - 类似于 `Object.preventExtensions()`。返回一个`Boolean`。
- **`Reflect.set(target, propertyKey, value[, receiver])`** 
  - 将值分配给属性的函数。返回一个`Boolean`，如果更新成功，则返回`true`。
- **`Reflect.setPrototypeOf(target, prototype)`** 
  - 设置对象原型的函数. 返回一个 `Boolean`， 如果更新成功，则返回`true`。

# `Promise`

[跳转至`Promise`](https://wzx0905.gitee.io/JavaScript/JavaScript异步编程#Promise)

# `class` 类

```js
// 基本用法
class Person {
  // 构造函数 
  constructor (name) {
  	// 实例成员
    this.name = name
  }
  // 原型方法
  say () {
    console.log(`hi, my name is ${this.name}`)
  }
}
// 实例
const p = new Person('tom')
p.say()
// extends 继承
class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`hi, my name is ${this.name}`)
  }
}
class Student extends Person {
  constructor (name, number) {
    super(name) // 调用父类构造函数，要在this之前使用
    this.number = number
  }
  hello () {
    super.say() // 调用父类成员
    console.log(`my school number is ${this.number}`)
  }
}
const s = new Student('jack', '100')
s.hello()
// static 静态方法
// 只能通过类名访问
class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`hi, my name is ${this.name}`)
  }
  static create (name) {
    return new Person(name)
  }
}
const tom = Person.create('tom')
tom.say()
```

# `set`

全新的数据结构，与数组非常类似，区别在于，`set` 中的值是不允许重复的，每个值在同一个`set`当中都是唯一的

```js
// Set 数据结构
// 创建集合实例
const s = new Set()
// 通过add方法新增成员，并且add返回集合实例本身，所以可以链式调用
s.add(1).add(2).add(3).add(4).add(2)
// 数组去重
const arr = [1, 2, 1, 3, 4, 1]
// const result = Array.from(new Set(arr))
const result = [...new Set(arr)]
console.log(result)
// 循环遍历
s.forEach(i => console.log(i))
// 也可以使用ES2015中的 for…of 来遍历
for (let i of s) {
  console.log(i)
}
```

# `Map`

全新的数据结构，与对象非常类似，区别在于，对象结构中的`key`只能是字符串类型，`map`可以接受任意类型的数据作为`key`

```js
const obj = {}
obj[true] = 'value'
obj[123] = 'value'
obj[{ a: 1 }] = 'value'
console.log(Object.keys(obj))  // ['123','true','[object Object]']
console.log(obj['[object Object]']) // value 
// 可以将一个二维键值对数组转换成一个Map对象
console.log(new Map([['uname':'zs'],['age':12]]))
```

# `Symbol`

新的原始数据类型 `Symbol` ，表示独一无二的值

```js
const s = Symbol()
console.log(s) // Symbol()
console.log(typeof s) // symbol
// 两个 Symbol 永远不会相等
console.log(
  Symbol() === Symbol() // false
)
// 可以传入一个描述字符串用来区分Symbol
// Symbol 描述文本
console.log(Symbol('foo'))
console.log(Symbol('bar'))
console.log(Symbol('baz'))
// 获取添加了描述字符串的Symbol
// Symbol.for() 
// 首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索，只接受string类型参数 如果传入的不是string会自动转为string
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true
const yellow = Symbol("Yellow");
const yellow1 = Symbol.for("Yellow");
yellow === yellow1;      // false
// 对象可以开始使用symbol作为属性key
const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = '456'
console.log(obj) // { [Symbol()]: '123', [Symbol()]: '456' }
// 可以使用Symbol为对象添加私有成员
// Symbol 模拟实现私有成员
// a.js ======================================
const static_name = Symbol()
const person = {
  [static_name]: 'zce',
  say () {
    console.log(this[static_name])
  }
}
// 只对外暴露 person
// b.js =======================================
// 由于无法创建出一样的 Symbol 值，
// 所以无法直接访问到 person 中的「私有」成员
// person[Symbol()]
person.say()
// 对象中的Symbol属性名 无法被for…in、Object.key()、JSON.stringify 这些手段获取到如果要获取对象中的Symbol属性，可以使用 Object.getOwnPropertySymbols() 方法来获取
```

# `for…of`循环

可以作为遍历所有数据结构的统一方式，只要明白它的工作原理( 迭代器 )就可以使用它去遍历任何一种自定义的数据结构

```js
// 基本使用
const arr = [100, 200, 300, 400]
// item 是数组中的每一个成员
for (const item of arr) {
  console.log(item)
}
// for…of 循环可以替代 数组对象的 forEach 方法
arr.forEach(item => {
  console.log(item)
})
// ==================================
for (const item of arr) {
  console.log(item)
  // 使用for of 可以配合break终止循环
  if (item > 100) {
    break
  }
}
// for…of 遍历Set 和 Map
// 遍历 Set 与遍历数组相同
const s = new Set(['foo', 'bar'])
for (const item of s) {
  console.log(item)
}
// 遍历 Map 可以配合数组结构语法，直接获取键值
const m = new Map()
m.set('foo', '123')
m.set('bar', '345')
// 遍历 Map 得到的是[key, value]结构的数组
for (const [key, value] of m) {
  console.log(key, value)
}
// 普通对象不能被 for…of 遍历
const obj = { foo: 123, bar: 456 }
for (const item of obj) {
  console.log(item)
}
```

# 可迭代接口

只要数据结构实现了`Iterable`接口，就可以被 `for…of` 进行遍历

- 所有能够被`for…of`遍历数据类型都要实现 `Iterable` 这个接口 (内部需要挂载一个`Iterable`方法) 即 `Symbol.Iterable`
- 这个方法需要返回一个带有`next()` 方法的对象，不断调用`next`就可以实现对内部数据的遍历

```js
const set = new Set(['foo', 'bar', 'baz'])
const iterator = set[Symbol.iterator]()
console.log(iterator.next()) //{ value: 'foo', done: false } 
console.log(iterator.next()) //{ value: 'bar', done: false }
console.log(iterator.next()) //{ value: 'baz', done: false }
console.log(iterator.next()) //{ value: undefined, done: true }
console.log(iterator.next()) //{ value: undefined, done: true }
// 迭代器设计模式
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],
  // 提供统一遍历访问接口
  each: function (callback) {
    const all = [].concat(this.life, this.learn, this.work)
    for (const item of all) {
      callback(item)
    }
  },
  // 提供迭代器（ES2015 统一遍历访问接口）
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}
todos.each(function (item) {
  console.log(item)
})
console.log('-------------------------------')
for (const item of todos) {
  console.log(item)
}
```

# 生成器

- 生成器函数会返回一个生成器对象，
- 当我们调用这个生成器对象的`next`方法 才会开始直接函数体，
- 在执行的过程中一旦遇到了`yield`关键词 函数的执行就会被暂停下来，
- `yield` 后面的值会作为 `next`方法的返回值的结果 `{ value：yield后面的值, done：false/true }`,
- 继续调用`next`就会从暂停的位置继续执行

```js
function * foo () {
  console.log('1111')
  yield 100
  console.log('2222')
  yield 200
  console.log('3333')
  yield 300
}
const generator = foo()
console.log(generator.next()) // 1111 { value: 100, done: false }  第一次调用，函数体开始执行，遇到第一个 yield 暂停
console.log(generator.next()) // 2222 { value: 200, done: false } 第二次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()) // 3333 { value: 300, done: false } 第三次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()) // { value: undefined, done: true } 第四次调用，已经没有需要执行的内容了，所以直接得到undefined
```

# `ES Modules`

语言层面的模块化标准

[跳转至模块化开发与规范化标准](https://wzx0905.gitee.io/工程化/模块化开发与规范化标准)
