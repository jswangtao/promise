/*
 * @Author: wangtao
 * @Date: 2022-03-24 23:07:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-03-25 16:30:02
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
  successCallback = undefined;
  // 失败的回调
  failCallback = undefined;

  reslove = (value) => {
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
    // 如果有成功的回调，则调用
    this.successCallback && this.successCallback(this.value);
  };

  reject = (reason) => {
    if (this.status !== PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    // 保存失败的原因
    this.reason = reason;
    // 如果有失败的回调，则调用
    this.failCallback && this.failCallback(this.reason);
  };

  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      // 等待状态，将成功和失败的回调存储起来
      this.successCallback = successCallback;
      this.failCallback = failCallback;
    }
  }
}
module.exports = MyPromise;
