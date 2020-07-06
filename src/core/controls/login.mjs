import { Request } from "@/core/services/http/request";
import { queryCheckloginUrl } from "@/constants/http/index";

const header = ""; //{ 'content-type': 'application/x-www-form-urlencoded' }

class LoginApiControl {
  service;
  constructor(service) {
    this.service = service;
  }
  // 检验用户登录
  queryChecklogin(data) {
    return this.service.get(queryCheckloginUrl, data, header);
  }
}

const loginApiControl = new LoginApiControl(Request.getInstance());

export default loginApiControl;
