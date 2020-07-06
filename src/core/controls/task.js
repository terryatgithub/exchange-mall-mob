import { Request } from "@/core/services/http/request";
import {
  queryPointsCoinsLevelInfoUrl,
  queryUserInfoUrl,
  queryTaskHistoryUrl,
  queryShopHistoryUrl,
  queryUserAddressUrl,
  queryAddressListUrl,
  queryTaskListUrl,
  querySaveAddressUrl,
  querySaveReceiveInfoUrl,
  querySubmitTaskUrl,
  queryorderInfoUrl,
  queryCheckloginUrl,
  querylogoutUrl,
} from "@/constants/http/index";

const header = ""; //{ 'content-type': 'application/x-www-form-urlencoded' }

class TaskApiControl {
  service;
  constructor(service) {
    this.service = service;
  }
  // 用户信息(金币，经验，等级)
  queryPointsCoinsLevelInfo(data) {
    return this.service.get(queryPointsCoinsLevelInfoUrl, data, header);
  }
  // 用户信息(头像，电话)
  queryUserInfo() {
    return this.service.get(queryUserInfoUrl, {}, header);
  }

  // queryUserTask(data) {
  //   return this.service.get(queryUserTaskUrl, data, header)
  // }
  // 用户地址列表
  queryUserAddress() {
    return this.service.get(queryUserAddressUrl, {}, header);
  }
  // 保存用户地址
  querySaveAddress(data) {
    return this.service.post(querySaveAddressUrl, {}, header, data);
  }
  // 保存订单商品领取信息
  querySaveReceiveInfo(data) {
    return this.service.post(querySaveReceiveInfoUrl, {}, header, data);
  }
  //用户完成任务记录
  queryTaskHistory(data) {
    return this.service.get(queryTaskHistoryUrl, data, header);
  }
  //用户提交任务
  querySubmitTask(data) {
    return this.service.get(querySubmitTaskUrl, data, header);
  }
  //订单详情
  queryorderInfo(data) {
    return this.service.get(queryorderInfoUrl, data, header);
  }
  //兑换历史
  queryShopHistory(data) {
    return this.service.get(queryShopHistoryUrl, data, header);
  }

  // 任务列表
  queryTaskList(data) {
    return this.service.get(queryTaskListUrl, data, header);
  }
  // 检验用户登录
  queryChecklogin(data) {
    return this.service.get(queryCheckloginUrl, data, header);
  }
  // 用户退出登录
  querylogout(data) {
    return this.service.delete(querylogoutUrl, data, header);
  }
}

const taskApiControl = new TaskApiControl(Request.getInstance());

export default taskApiControl;
