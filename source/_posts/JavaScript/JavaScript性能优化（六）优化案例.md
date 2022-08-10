---
title: JavaScript性能优化（六）优化案例
date: 2021/5/5
categories:
 - [前端,JavaScript]
---

# 变量局部化

定义变量时尽可能将变量定义在局部作用域内，这样可以提高代码的执行效率（减少了数据访问时需要查找的路径）

![](https://pic.imgdb.cn/item/60ebeb1e5132923bf8079504.png)

从`JSBench`测试结果中可以看到对比结果差距还是挺大的

![](https://pic.imgdb.cn/item/60e7b1665132923bf813f288.png)

# 缓存数据

对于需要多次使用的数据进行提前保存，后续进行使用

```js
<div id="skip" class="skip"></div>
<script>
  // 缓存数据：对于需要多次使用的数据进行提前保存，后续进行使用
  var oBox = document.getElementById('skip')
  // 假设在当前的函数体当中需要对 className 的值进行多次使用，那么我们就可以将它提前缓存起来
  // 非缓存
  function hasClassName(ele, cls) {
    console.log(ele.className)
    return ele.className == cls
  }
  console.log(hasClassName(oBox, 'skip'))
  // 缓存
  function hasClassName(ele, cls) {
    var clsName = ele.className
    console.log(clsName)
    return clsName == cls
  }
  console.log(hasClassName(oBox, 'skip'))
  /*
    01 减少声明和语句数（词法 语法）
    02 缓存数据（作用域链查找变快）
  */
</script>
```

# 减少层级访问

```js
// 直接访问，速度快
function Person() {
  this.name = 'zce'
  this.age = 40
}
let p1 = new Person()
console.log(p1.age)
// 通过函数访问，速度慢
function Person() {
  this.name = 'zce'
  this.age = 40
  this.getAge = function () {
    return this.age
  }
}
let p1 = new Person()
console.log(p1.getAge())
```

# 防抖和节流

## 为什么需要防抖和节流

- 在一些高频率事件触发的场景下我们不希望对应的事件处理函数多次执行
- 场景
  - 滚动事件
  - 输入的模糊匹配
  - 轮播图切换
  - 点击操作
  - ....
- 浏览器默认情况下都会有自己的监听事件间隔（`4~6ms`)，如果检测到多次事件的监听执行，那么就会造成不必要的资源浪费

## 定义

- 防抖：对于高频操作，我们只希望识别一次点击，可以人为是第一次或者是最后一次
- 节流：对于高频操作，我们可以自己来设置频率，让本来会执行很多次的事件触发，按着我们定义的频率减少触发的次数

## 防抖函数实现

```js
/** 
	* handle 最终需要执行的事件监听
	* wait 事件触发之后多久开始执行
	* immediate 控制执行第一次还是最后一次，false 执行最后一次
*/
function myDebounce(handle, wait, immediate) {
	// 参数类型判断及默认值处理
	if (typeof handle !== 'function') throw new Error('handle must be an function')
	if (typeof wait === 'undefined') wait = 300
	if (typeof wait === 'boolean') {
		immediate = wait
		wait = 300
	}
	if (typeof immediate !== 'boolean') immediate = false
	// 所谓的防抖效果我们想要实现的就是有一个 ”人“ 可以管理 handle 的执行次数
	// 如果我们想要执行最后一次，那就意味着无论我们当前点击了多少次，前面的N-1次都无用
	let timer = null
	return function proxy(...args) {
		let self = this,
			init = immediate && !timer
		clearTimeout(timer)
		timer = setTimeout(() => {
			timer = null
			!immediate ? handle.call(self, ...args) : null
		}, wait)
		// 如果当前传递进来的是 true 就表示我们需要立即执行
		// 如果想要实现只在第一次执行，那么可以添加上 timer 为 null 做为判断
		// 因为只要 timer 为 Null 就意味着没有第二次....点击
		init ? handle.call(self, ...args) : null
	}
}
```

## 节流函数实现

```js
/** 
	* handle 最终需要执行的事件监听
	* wait 执行频率
*/
function myThrottle(handle, wait) {
	if (typeof handle !== 'function') throw new Error('handle must be an function')
	if (typeof wait === 'undefined') wait = 400
	let previous = 0  // 定义变量记录上一次执行时的时间 
	let timer = null  // 用它来管理定时器
	return function proxy(...args) {
		let now = new Date() // 定义变量记录当前次执行的时刻时间点
		let self = this
		let interval = wait - (now - previous)
		if (interval <= 0) {
			// 此时就说明是一个非高频次操作，可以执行 handle 
			clearTimeout(timer)
			timer = null
			handle.call(self, ...args)
			previous = new Date()
		} else if (!timer) {
			// 当我们发现当前系统中有一个定时器了，就意味着我们不需要再开启定时器
			// 此时就说明这次的操作发生在了我们定义的频次时间范围内，那就不应该执行 handle
			// 这个时候我们就可以自定义一个定时器，让 handle 在 interval 之后去执行 
			timer = setTimeout(() => {
				clearTimeout(timer) // 这个操作只是将系统中的定时器清除了，但是 timer 中的值还在
				timer = null
				handle.call(self, ...args)
				previous = new Date()
			}, interval)
		}
	}
}
```

![](https://pic.imgdb.cn/item/60e7b1675132923bf813f6d1.png)

# 减少判断层级

![](https://pic.imgdb.cn/item/60ed02595132923bf870954a.png)

# 减少循环体活动

![](https://pic.imgdb.cn/item/60ed05615132923bf883e3cf.png)

![](https://pic.imgdb.cn/item/60ed05615132923bf883e3e7.png)

# 字面量与构造式

![](https://pic.imgdb.cn/item/60ed072d5132923bf88ed468.png)

![](https://pic.imgdb.cn/item/60ed087f5132923bf89641f6.png)

