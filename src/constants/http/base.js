let wxBase = '' //微信后台服务器
let actiBase = '' //活动后台服务器
let mallBase = '' //兑换商城后台服务器

switch (process.env.NODE_ENV) {
  // case 'mock':
  //   wxBase = 'https://beta-wx.coocaa.com'
  //   actiBase = 'http://172.20.155.103:3000/mock/371'
  //   mallBase = 'http://172.20.135.102:9090' //吕桂兴测试服务器
  //   break
  case 'development':
    // wxBase = 'https://beta-wx.coocaa.com'
    // actiBase = 'https://beta-restful.coocaa.com'
    mallBase = '/gw' //吕桂兴测试服务器
    break
  case 'production':
    // wxBase = 'https://wx.coocaa.com'
    // actiBase = 'https://restful.skysrt.com'
    mallBase = '/gw' //@todo 需要改为正式服务器地址
    break
}

export {
  wxBase,
  actiBase,
  mallBase
}