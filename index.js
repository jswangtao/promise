/*
 * @Author: wangtao
 * @Date: 2022-03-24 23:07:39
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-03-26 16:23:13
 * @Description: file content
 */
const myPromise = require("./myPromise");

let p1 = new myPromise((reslove, reject) => {
  reslove("成功1");
  // reject("失败");
  // setTimeout(() => {
  //   reslove("成功");
  // }, 2000);
  // throw new Error("executor error");
});

let p2 = new myPromise((reslove, reject) => {
  // reslove("成功");
  // reject("失败");
  setTimeout(() => {
    reslove("成功2");
  }, 2000);
  // throw new Error("executor error");
});

myPromise.all(["a", "b", p1, p2]).then((res) => {
  console.log("🚀🚀🚀wimi======>>>res", res);
});

// p1.then().then(
//   (res) => {
//     console.log("🚀🚀🚀wimi======>>>res2", res);
//   },
//   (reason) => {
//     console.log("🚀🚀🚀wimi======>>>reason2", reason.message);
//   }
// );

function other() {
  return new myPromise((resolve, reject) => {
    resolve("other");
  });
}
