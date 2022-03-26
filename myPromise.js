/*
 * @Author: wangtao
 * @Date: 2022-03-24 23:07:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-03-26 00:14:47
 * @Description: file content
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  // promise的初始状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败的原因
  reason = undefined;
  // 成功的回调
  successCallback = [];
  // 失败的回调
  failCallback = [];

  resolve = (value) => {
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
    // 如果有成功的回调，则调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) {
      let x = this.successCallback.shift()(this.value);
    }
  };

  reject = (reason) => {
    if (this.status !== PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    // 保存失败的原因
    this.reason = reason;
    // 如果有失败的回调，则调用
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason);
    }
  };

  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = successCallback(this.value);
          // 判断 x 的值是普通值还是promise对象
          // 如果是普通值 直接调用resolve
          // 如果是promise对象 查看promsie对象返回的结果
          // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          let x = failCallback(this.reason);
          // 判断 x 的值是普通值还是promise对象
          // 如果是普通值 直接调用resolve
          // 如果是promise对象 查看promsie对象返回的结果
          // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      } else {
        // 等待状态，将成功和失败的回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promsie对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promsie对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (x instanceof MyPromise) {
    // x.then((value)=>{resolve(value)},(reason)=>{reject(reason)})
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;
