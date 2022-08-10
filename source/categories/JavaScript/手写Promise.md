---
title: 手写Promise源码
date: 2021/3/27
categories:
 - [前端,JavaScript]
---

```js
/*
  1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
  2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
    pending -> fulfilled
    pending -> rejected
    一旦状态确定就不可更改
  3. resolve和reject函数是用来更改状态的
    resolve: fulfilled
    reject: rejected
  4. then方法内部做的事情就判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then方法是被定义在原型对象中的
  5. then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
  6. 同一个promise对象下面的then方法是可以被调用多次的
  7. then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
*/

const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  // 执行这个类的时候，传递一个执行器，执行器会立即执行
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e);
    }
  }
  // Promsie 状态 
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  // 此处使用箭头函数是为了使函数内部的this指向为实例类
  resolve = value => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在，如果存在就调用
    while (this.successCallback.length) this.successCallback.shift()()
  }
  // 使用箭头函数是为了使函数内部的this指向为实例类
  reject = reason => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在，如果存在就调用
    while (this.failCallback.length) this.failCallback.shift()()
  }
  then(successCallback, failCallback) {
    // 参数可选
    // 判断传入的参数是否为函数，如果是则保留，否则初始化为value => value
    successCallback = typeof successCallback === 'function' ? successCallback : value => value;
    // 参数可选
    // 判断传入的参数是否为函数，如果是则保留，否则初始化为reason => { throw reason }
    failCallback = typeof failCallback === 'function' ? failCallback : reason => { throw reason };
    let promsie = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) { // 成功
        // 此处使用setTimeout的作用是为了能够拿到实例后的promsie
        setTimeout(() => {
          try {
            // 将回调后的结果保存
            let x = successCallback(this.value);
            // 判断x的值是普通值还是promise对象
            // 如果是普通值，直接调用resolve 
            // 如果是promise对象，查看promsie对象返回的结果，再根据promise对象返回的结果，决定调用resolve，还是调用reject
            resolvePromise(promsie, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else if (this.status === REJECTED) { // 失败
        // 此处使用setTimeout的作用是为了能够拿到实例后的promsie
        setTimeout(() => {
          try {
            // 将回调后的结果保存
            let x = failCallback(this.reason);
            // 判断x的值是普通值还是promise对象
            // 如果是普通值，直接调用resolve 
            // 如果是promise对象，查看promsie对象返回的结果，再根据promise对象返回的结果，决定调用resolve，还是调用reject
            resolvePromise(promsie, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else { // 异步
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          // 此处使用setTimeout的作用是为了能够拿到实例后的promsie
          setTimeout(() => {
            try {
              // 将回调后的结果保存
              let x = successCallback(this.value);
              // 判断x的值是普通值还是promise对象
              // 如果是普通值，直接调用resolve 
              // 如果是promise对象，查看promsie对象返回的结果，再根据promise对象返回的结果，决定调用resolve，还是调用reject
              resolvePromise(promsie, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          // 此处使用setTimeout的作用是为了能够拿到实例后的promsie
          setTimeout(() => {
            try {
              // 将回调后的结果保存
              let x = failCallback(this.reason);
              // 判断x的值是普通值还是promise对象
              // 如果是普通值，直接调用resolve 
              // 如果是promise对象，查看promsie对象返回的结果，再根据promise对象返回的结果，决定调用resolve，还是调用reject
              resolvePromise(promsie, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });
    // 此处返回promise实现链式调用
    return promsie;
  }
  // catch方法 promise失败会被执行
  catch(failCallback) {
    return this.then(undefined, failCallback)
  }
  // finally方法 无论promise成功失败都会被执行
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  // all方法 接收一个array，是一个promise集合，当所有promise执行成功后，才返回resolve，有一个失败则返回reject
  static all(array) {
    // 用来存储promise执行结果
    let result = [];
    // 记录promise完成数量
    let index = 0;
    return new MyPromise((resolve, reject) => {
      // 当promise执行完成时向result添加执行结果
      function addData(key, value) {
        result[key] = value;
        index++;
        // 当所有promise执行完毕后调用resolve并返回result
        if (index === array.length) resolve(result);
      }
      array.forEach((item, key) => {
        if (item instanceof MyPromise) {
          // promise 对象
          item.then(value => addData(key, value), reject)
        } else {
          // 普通值
          addData(key, item);
        }
      })
    })
  }
  // allSettled方法 接收一个array，是一个promise集合，当所有promise执行完成(无论成功还是失败)后，返回resolve
  static allSettled(array) {
    // 用来存储promise执行结果
    let result = [];
    // 记录promise完成数量
    let index = 0;
    return new MyPromise((resolve) => {
      function addData(key, value, status) {
        // 以对象的形式存储promise执行结果和状态
        result[key] = { status, value };
        index++;
        // 当所有promise执行完毕后调用resolve并返回result
        if (index === array.length) resolve(result);
      }
      array.forEach((item, key) => {
        if (item instanceof MyPromise) {
          // promise 对象
          // 无论promsie成功还是失败，都将结果和状态存储到result中
          item.then(value => addData(key, value, FULFILLED), reason => addData(key, reason, REJECTED))
        } else {
          // 普通值
          addData(key, item, FULFILLED);
        }
      })
    })
  }
  // race方法 接收一个array，是一个promise集合，其中任意一个promise执行完毕之后，返回执行结果，无论成功失败
  static race(array) {
    return new MyPromise((resolve, reject) => {
      array.forEach(item => {
        if (item instanceof MyPromise) {
          // promise 对象
          item.then(resolve, reject)
        } else {
          // 普通值
          resolve(item)
        }
      })
    })
  }
  // resolve方法 快速创建一个执行结果一定为成功的Promise
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  // reject方法 快速创建一个执行结果一定为失败的Promise
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
}

function resolvePromise(promsie, x, resolve, reject) {
  // 判断then方法返回的promise和回调函数返回的结果x是否相等，相等则抛出异常，防止循环调用
  if (promsie === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value => resolve(value), reason => reject(reason));
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;
```