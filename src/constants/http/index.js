import { wxBase, actiBase, mallBase } from "./base";

export const HomeIntUrl = actiBase + "/light/v2/web/init";
export const HomeDrawUrl = actiBase + "/light/v2/web/start";

export const GET_USER_INFO_URL = actiBase + "/light/v2/web/start";
export const GET_JSSDK_INFO_URL = wxBase + "/cors/accessTokenAPI/getJssdkInfo";
export const GET_WXUSER_INFO_V2_URL =
  wxBase + "/cors/accessTokenAPI/v2/getWxUserinfo";
export const GET_WXUSER_INFO_V1_URL =
  wxBase + "/cors/accessTokenAPI/getWxUserinfo"; //可判断用户是否已关注公众号

//商品兑换
export const MallInitHome =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/initHome";
export const MallTopicPage =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/topicPage";
export const MallActInfo =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/actInfo";
//判断用户兑换资格
export const MallCheck = mallBase + "/ex-shop/exchange-shop/web-api/v1/check";
//兑换活动商品接口
export const Mallexchange =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/exchange";

//任务中心
export const queryTaskListUrl =
  mallBase + "/membership/v4/public/query-missionList";
//提交任务
export const querySubmitTaskUrl =
  mallBase + "/membership/v4/public/submit-mobileMissionEvent";
//获取用户头像、昵称、手机号
export const queryUserInfoUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/userInfo";
//获取用户等级，金币，经验
export const queryPointsCoinsLevelInfoUrl =
  mallBase + "/membership/v4/public/query-pointsCoinsLevelInfo-byToken-mobile";
//获取用户地址信息
export const queryUserAddressUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/userAddress";
//保存用户地址
export const querySaveAddressUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/saveAddress";
//保存订单商品领取信息
export const querySaveReceiveInfoUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/saveReceiveInfo";
//订单详情
export const queryorderInfoUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/orderInfo";
//获取任务记录
export const queryTaskHistoryUrl =
  mallBase + "/membership/v4/public/query-pointsCoinsDetail-pageList";
//获取兑换记录
export const queryShopHistoryUrl =
  mallBase + "/ex-shop/exchange-shop/web-api/v1/orders";
//检验用户登录
export const queryCheckloginUrl = mallBase + "/main/v1/is/login";
//用户退出登录
export const querylogoutUrl = mallBase + "/main/v1/logout";
