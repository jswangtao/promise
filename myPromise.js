/*
 * @Author: wangtao
 * @Date: 2022-03-24 23:07:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-03-25 23:20:57
 * @Description: file content
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.reslove, this.reject);
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

  reslove = (value) => {
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
    // 如果有成功的回调，则调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value);
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
    let promise = new MyPromise((reslove, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        let x = successCallback(this.value);
        reslovePromise(x, reslove, reject);
      } else if (this.status === REJECTED) {
        failCallback(this.reason);
      } else {
        // 等待状态，将成功和失败的回调存储起来
        this.successCallback.push(successCallback);
        this.failCallback.push(failCallback);
      }
    });
    return promise;
  }
}

function reslovePromise(x, reslove, reject) {
  if (x instanceof MyPromise) {
    // x.then((value)=>{reslove(value)},(reason)=>{reject(reason)})
    x.then(reslove, reject);
  } else {
    reslove(x);
  }
}

module.exports = MyPromise;
