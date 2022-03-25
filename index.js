/*
 * @Author: wangtao
 * @Date: 2022-03-24 23:07:39
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-03-25 23:24:16
 * @Description: file content
 */
const myPromise = require("./myPromise");

let p1 = new myPromise((reslove, reject) => {
  console.log("🚀🚀🚀wimi======>>>1111");
  reslove("成功");
  // reject("失败");
  // setTimeout(() => {
  //   reslove("成功");
  // }, 2000);
});

function other() {
  return new myPromise((resolve, reject) => {
    resolve("other");
  });
}

p1.then((res) => {
  console.log("🚀🚀🚀wimi======>>>res1", res);
  return 100;
}).then((res) => {
  console.log("🚀🚀🚀wimi======>>>res2", res);
});
