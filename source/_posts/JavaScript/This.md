---
title: This
date: 2021/5/11
categories:
 - [前端,JavaScript]
---

关于 `this` 的总结：

- 沿着作用域向上找最近的一个 `function`（不是箭头函数），看这个 `function` 最终是怎样执行的；
- **`this` 的指向取决于所属 `function` 的调用方式，而不是定义；**
- `function` 调用一般分为以下几种情况：
  - 作为函数调用，即：`foo()`
    - 指向全局对象（`globalThis`），注意严格模式问题，严格模式下是 `undefined`
  - 作为方法调用，即：`foo.bar()` / `foo.bar.baz()` / `foo['bar']()` / `foo[0]()`
    - 指向最终调用这个方法的对象
  - 作为构造函数调用，即：`new Foo()`
    - 指向一个新对象 `Foo {}`
  - 特殊调用，即：`foo.call()` / `foo.apply()` / `foo.bind()`
    - 参数指定成员
- 找不到所属的 `function`，就是全局对象
- 箭头函数中的 `this` 指向其所在（即定义的位置）上下文的`this`值

