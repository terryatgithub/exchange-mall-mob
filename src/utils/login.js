import { loginApiControl } from "@/core";
import store from "@/store";
// 检验用户是否登录
export async function checklogin(pathurl) {
  let res = await loginApiControl.queryChecklogin();
  // debugger;
  if (pathurl === "againlogin") {
    let path = location.href;
    let url = `/gw/cc/login.html?theme=coocaa-added-service&loginMethod=weixin,qq,phoneDynameic&redirect_to=${path}`;
    window.location.href = url;
  }
  if (res.code === 200) {
    store.commit("setloginstate", 1);
    return true;
  } else {
    let path2 = location.href;
    if (pathurl) {
      let str1 = pathurl.split("?")[0];
      let str2 = pathurl.split("?")[2];
      console.log("======str1=" + str1 + ",str2=" + str2);
      console.log(typeof str2);
      if (!str2) {
        path2 = str1;
      } else {
        path2 = str1 + str2;
      }
    }
    let url2 = `/gw/cc/login.html?theme=coocaa-added-service&loginMethod=weixin,qq,phoneDynameic&redirect_to=${path2}`;
    window.location.href = url2;
    return;
  }
}

export function handleloginurl(path) {
  let str = path.split("?")[0];
  let str1 = path.split("?")[1];
  let str2 = str1.split("/")[1];
  return str + str2;
}
