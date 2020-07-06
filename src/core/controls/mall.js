import { Request } from '@/core/services/http/request'
import { MallInitHome, MallTopicPage, MallActInfo, MallCheck, Mallexchange } from '@/constants/http/index'

const header = { 'content-type': 'application/x-www-form-urlencoded' }

class MallApiControl {
  service
  constructor(service) {
    this.service = service
  }
  // 初始化
  init(param) {
    console.log('MallApiControl init()')
    console.log('process.env.NODE_ENV=' + process.env.NODE_ENV)
    console.log('process.env=', process.env)
    return this.service.get(MallInitHome, param, header)
    // const url = '/api/exchange-shop/web-api/v1/initHome'
    // return this.service.get(url, {}, header, data)
  }
  // 
  topicPage(param) {
    return this.service.get(MallTopicPage, param, header)
  }
  // 
  actInfo(param) {
    return this.service.get(MallActInfo, param, header)
  }
  //检验用户兑换资格datadata
  UserCheck(data) {
    return this.service.get(MallCheck, data, header)
  }
  //兑换活动商品接口
  Exchange(data) {
    return this.service.get(Mallexchange, data, header)
  }
}

const mallApiControl = new MallApiControl(Request.getInstance())

export default mallApiControl
