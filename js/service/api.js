/** 发送短信验证码-注册 **/
export const sendRegisterSmsCode = data => post('/rest/v4/pp/app/sendRegisterSmsCode', data);
/** 微信小程序获取openid**/
export const getWxOpenToken = data => post('/rest/v4/pp/app/getWxOpenToken', data);
/** 推荐注册-获取数据 **/
export const getDataForRegister = data => post('/rest/v4/pp/h5/register/getData', data);
/** 发送短信验证码-登录 **/
export const sendLoginSmsCode = data => post('/rest/v4/pp/app/sendLoginSmsCode', data);
/** 发送短信验证码-找回登录密码 **/
export const sendResetPasswordSmsCode = data => post('/rest/v4/pp/app/sendResetPasswordSmsCode', data);
/** 发送短信验证码-绑定微信 **/
export const sendBindWxSmsCode = data => post('/rest/v4/pp/app/sendBindWxSmsCode', data);
/** 找回登录密码-手机号码 与 短信验证码 **/
export const resetPwdByMobileWithSmsCode = data => post('/rest/v4/pp/app/resetPwdByMobileWithSmsCode', data);
// 邀请注册
export const h5Register = data => post('/rest/v4/pp/h5/mhRegister', data);

/** 登录-手机号码 与 密码 **/
export const loginByMobileWithPassword = data => post('/rest/v4/pp/app/loginByMobileWithPassword', data);

/** 登录-手机号码 与 短信验证码 **/
export const loginByMobileWithSmsCode = data => post('/rest/v4/pp/app/loginByMobileWithSmsCode', data);
/** 登录-微信OpenId登录 **/
export const loginByWxOpenId = data => post('/rest/v4/pp/app/loginByWxOpenId', data);
/** 登录-绑定微信 **/
export const loginByBindWx = data => post('/rest/v4/pp/app/loginByBindWx', data);
/**保存用户昵称**/
export const saveUserNickName = data => post('/rest/v4/pp/app/user/saveUserNickName', data);


/** 注册 **/
export const appRegister = data => post('/rest/v4/pp/app/register', data);

/** OCR-身份证识别 **/
export const idCardOCR = data => post('/rest/v4/pp/app/user/appIdCardOcr', data);
/** OCR-营业执照识别 **/
export const bizLicenseOCR = data => post('/rest/v4/pp/app/user/bizLicenseOCR', data);
/** 提交实名认证-获取数据 **/
export const getDataByPeopleCert = data => post('/rest/v4/pp/app/user/peopleCert/getData', data);
/** 提交实名认证 **/
export const peopleCert = data => post('/rest/v4/pp/app/user/peopleCert', data);
/** 绑定银行卡 **/
export const bankcardCert = data => post('/rest/v4/pp/app/user/bankcardCert', data);
/** 绑定银行卡-获取数据 **/
export const getDataByBankcardCert = data => post('/rest/v4/pp/app/user/bankcardCert/getData', data);
/** MH-获取用户资产统计信息 **/
export const getMhUserMoneyCountInfo = data => post('/rest/v4/pp/app/user/getMhUserMoneyCountInfo', data);
/** 申请提现-获取数据 **/
export const getDataByApplyWithDraw = data => post('/rest/v4/pp/app/user/withdraw/apply/getData', data);
/** 申请提现 **/
export const applyWithdraw = data => post('/rest/v4/pp/app/user/withdraw/apply', data);
/** 提现历史记录 **/
export const getHistoryByWithdraw = data => post('/rest/v4/pp/app/user/withdraw/history', data);
/** 资产冻结列表 **/
export const getFrozenList = data => post('/rest/v4/pp/app/user/money/getFrozenList', data);
/** 违约记录列表 **/
export const getBalanceBreakList = data => post('/rest/v4/pp/app/user/money/getBalanceBreakList', data);
/** 获取拓客管理 **/
export const getUserBesinessInfo = data => post('/rest/v4/pp/app/user/getUserBesinessInfo', data);
/** 获取拓客管理-拓客盲盒交易记录 **/
export const getMhGoodsGameBoxBuyList = data => post('/rest/v4/pp/app/user/team/getMhGoodsGameBoxBuyList', data);
/** 获取拓客管理-拓客购买记录 **/
export const getBuyListByTeam = data => post('/rest/v4/pp/app/user/team/getBuyList', data);
/** 获取拓客管理-拓客流拍记录 **/
export const getFlopListByTeam = data => post('/rest/v4/pp/app/user/team/getFlopList', data);
/** 获取拓客管理-拓客信息 **/
export const getUserInfoByTeam = data => post('/rest/v4/pp/app/user/team/getUserInfo', data);
/** MH-余额明细-列表 **/
export const getMhListForBalanceFlow = data => post('/rest/v4/pp/app/user/balanceScore/flow/getMhList', data);
/** 余额明细-MH-余额明细-筛选条件-流水类型 **/
export const getMhSearchFlowType = data => post('/rest/v4/pp/app/user/balanceScore/flow/getMhSearchFlowType', data);
/** 奖金池-获取数据 **/
export const getDataForBonusPool = data => post('/rest/v4/pp/app/bonuspool/getData', data);

/** 获取新用户活动 **/
export const getNewUserActivity = data => post('/rest/v4/pp/app/getNewUserActivity', data);
/** 收下新用户活动 **/
export const receviceNewUserActivity = data => post('/rest/v4/pp/app/user/receviceNewUserActivity', data);
/** 申请发放共享余额--获取信息 **/
export const getDataByBalanceShareApply = data => post('/rest/v4/pp/app/user/balanceShare/getDataByBalanceShareApply', data);
/** 申请发放共享余额--确认申请 **/
export const confirmBalanceShareApplay = data => post('/rest/v4/pp/app/user/balanceShare/confirmBalanceShareApplay', data);
/** 合拍账户管理-申请发放共享余额记录 **/
export const getBalanceShareSendNotHandleList = data => post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendNotHandleList', data);
/** 合拍账户管理-申请发放共享余额记录-获取数据 **/
export const getDataByBalanceShareSendNotHandleList = data => post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendNotHandleList/getData', data);
/** 合拍账户管理-申请发放共享余额记录-历史记录 **/
export const getBalanceShareSendHistoryList = data => post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendHistoryList', data);
/** 合拍账户管理-历史共享记录 **/
export const getBalanceShareNoteHistoryList = data => post('/rest/v4/pp/app/user/balanceShare/getBalanceShareNoteHistoryList', data);
/** 获取正在销售的盲盒数量 **/
export const getOnSaleGameBoxCount = data => post('/rest/v4/pp/app/gamebox/getOnSaleGameBoxCount', data);
/** 获取正在销售的第一个盲盒信息 **/
export const getOnSaleTopOne = data => post('/rest/v4/pp/app/gamebox/getOnSaleTopOne', data);
/** 创建盲盒订单支付计划 **/
export const createGameBoxOrderPayPlan = data => post('/rest/v4/pp/app/user/createGameBoxOrderPayPlan', data);


/** MH-获取盲盒即使专区列表 **/
export const getGoodsGameboxSpecialList = data => post('/rest/v4/pp/app/user/goodsGamebox/getGoodsGameboxSpecialList', data);
/** MH-新增盲盒订单支付计划 **/
export const createMhGoodsGameBoxOrderPayPlan = data => post('/rest/v4/pp/app/user/goodsGamebox/createMhGoodsGameBoxOrderPayPlan', data);
/** MH-获取购买盲盒页面数据 **/
export const getMhBuyGoodsGameBoxData = data => post('/rest/v4/pp/app/user/goodsGamebox/getMhBuyGoodsGameBoxData', data);
/** MH-获取订单盲盒信息 **/
export const getMhGoodsGameBoxItemDataByOrderId = data => post('/rest/v4/pp/app/user/goodsGamebox/getMhGoodsGameBoxItemDataByOrderId', data);
/** MH-盲盒回收 **/
export const recycleMhGoodsGamebox = data => post('/rest/v4/pp/app/user/goodsGamebox/recycleMhGoodsGamebox', data);
/** MH-获取用户魔石余额  **/
export const getMhUserBalanceScore = data => post('/rest/v4/pp/app/user/getMhUserBalanceScore', data);
/** MH-选择开盒(获取盲盒详情)  **/
export const getGoodsGameboxDetail = data => post('/rest/v4/pp/app/user/goodsGamebox/getGoodsGameboxDetail', data);
/** MH-获取首页数据  **/
export const getMhIndexData = data => post('/rest/v4/pp/app/index/getMhIndexData', data);
// 获取用户所持有的未使用抵用券
export const getVoucherByUser = data => post('/rest/v4/pp/app/user/getVoucherByUser', data);
// 获取用户签到状态
export const getUserSignIn = data => post('/rest/v4/pp/app/user/getUserSignIn', data);
// 用户签到
export const userSignIn = data => post('/rest/v4/pp/app/user/userSignIn', data);
// 盲盒商品
export const getGoodsGameboxItemShow = data => post('/rest/v4/pp/app/user/goodsGamebox/getGoodsGameboxItemShow', data);
// 奖金池
export const getPrizePool = data => post('/rest/v4/pp/app/user/getPrizePool', data);
// 即时专区获取玩法介绍
export const getRuleIntroductionInteger = data => post('/rest/v4/pp/app/user/goodsGamebox/getRuleIntroductionInteger ', data);
// 获取盒子专区
export const getGoodsPartition = data => post('/rest/v4/pp/app/user/goodsGamebox/getGoodsPartition', data);
// 有无提现资格
export const bonusIsEffective = data => post('/rest/v4/pp/app/user/bonusIsEffective', data);
	

/** 通用文件上传OSS **/
export const uploadFileOSS = filePathOrBase64 => {
	return new Promise((resolve,reject) =>{
			let url = '/rest/v4/pp/app/user/file/oss/sysSave'
			var file = ''
			var filePath = ''
			var isH5 = false
			// #ifdef H5
			isH5 = true
			// #endif
			if (isH5){
				var arr = filePathOrBase64.split(','), mime = arr[0].match(/:(.*?);/)[1],
				        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				    while(n--){
				        u8arr[n] = bstr.charCodeAt(n);
				    }
				file = new File([u8arr], Date.now()+'.png', {type:mime});
			}
			else {
				filePath = filePathOrBase64
			}
			uni.uploadFile({
				url: getReqDomain(url) + url,
				fileType: 'image',
				filePath: filePath,
				file: file,
				name: 'file',
				header:{
					m_token: uni.$session.getToken()
				},
				success: function (res) {
					let { data, statusCode = 200 } = res;
					if (statusCode == 200) {
						data = JSON.parse(data)
					  if (data.success) {
					    resolve(data);
					  } else {
					    if (!data.code) {
					      data.code = 10000;
					    }
					    reject(data);
					  }
					} else {
					  reject({
					    code: statusCode,
					    message: data.message
					  });
					}
				},
				 fail(err) {
					reject({ code: -999, message: err.errMsg });
				 },
			 });
		})
}


/**支付		开始**/
export const rechargeScore = data => post('/rest/v4/pay/rechargeScore', data);
export const rechargeScoreNew = data => payPost('/rest/v4/pay/rechargeScore', data);
export const testPay = data => post('/rest/v4/paycall/testpay/service/notifyUrl', data);
export const getPayChannel = data => post('/rest/v4/pay/getPayChannel', data);
export const appPay = data => post('/rest/v4/pay/appPay', data);
export const payExpress = data => post('/rest/v4/pay/payExpress', data); //支付运费
export const chooseExpress = data => post('/rest/v4/pay/chooseExpress', data);
/** MH-发货  **/
export const gbChooseExpress = data => post('/rest/v4/pay/goodsGamebox/gbChooseExpress', data);


/**支付		结束**/


/** ===============xjm start=========================== **/
/** 商品接口 **/
export const getAllGoodsCategory = data => post('/rest/v4/pp/app/goodsCategory/getAllGoodsCategory', data);
export const getGoodsDetail = data => post('/rest/v4/pp/app/goods/getGoodsDetail', data);
export const collectGoods = data => post('/rest/v4/pp/app/goods/collectGoods', data);
export const getIndexGoodsList = data => post('/rest/v4/pp/app/goods/getIndexGoodsList', data);

/** 订单通用接口 **/
export const getOrderData = data => post('/rest/v4/order/getData', data);
export const addOrderData = data => post('/rest/v4/order/addOrder', data);

/** 获取支付订单页信息 **/
export const getOrderPayPageInfo = data => post('/rest/v4/pp/app/user/order/getOrderPayPageInfo', data);
/** 订单列表 **/
export const getOrderList = data => post('/rest/v4/pp/app/user/order/getMhOrderList', data);
/** 订单列表-取消订单 **/
export const cancelOrder = data => post('/rest/v4/pp/app/user/order/cancelOrder', data);
/** 订单详情 **/
export const getOrderDetail = data => post('/rest/v4/pp/app/user/order/getOrderDetail', data);
/** 获取物流轨迹 **/
export const getOrderExpressList = data => post('/rest/v4/pp/app/user/order/express/getOrderExpressList', data);
/** 确认收货 **/
export const confirmPackage = data => post('/rest/v4/pp/app/user/order/express/confirmPackage', data);
/** 获取用户收货地址 **/
export const getAllAddress = data => post('/rest/v4/pp/app/user/address/getAllAddress', data);
/** 保存用户地址 **/
export const saveAddress = data => post('/rest/v4/pp/app/user/address/saveAddress', data);
/** 查询用户地址详情 **/
export const getAddressDetail = data => post('/rest/v4/pp/app/user/address/getAddressDetail', data);
/** 删除收货地址 **/
export const deleteAddress = data => post('/rest/v4/pp/app/user/address/deleteAddress', data);
/** 设置默认收货地址 **/
export const setDefaultAddress = data => post('/rest/v4/pp/app/user/address/setDefaultAddress', data);
/** 我的-首页-数据  **/
export const getMyIndexData = data => post('/rest/v4/pp/app/user/my/getIndexData', data);
/** 消息列表 **/
export const getMsgList = data => post('/rest/v4/pp/app/user/message/getMsgList', data);
/** 阅读全部消息  **/
export const readAllMsg = data => post('/rest/v4/pp/app/user/message/readAllMsg', data);
/** 获取收货地址  **/
export const getOrderAddress = data => post('/rest/v4/pp/app/user/order/express/getOrderAddress', data);
/** 获取客服电话  **/
export const getCustomerPhone = data => post('/rest/v4/pp/app/shopinfo/getCustomerPhone', data);
/** 获取未读消息数  **/
export const hasNotReadMsg = data => post('/rest/v4/pp/app/user/message/hasNotReadMsg', data);
/** 首页-获取人气推荐商品列表  **/
export const getSaleMaxGoods = data => post('/rest/v4/pp/app/index/getSaleMaxGoods', data);
/** 首页-查询店铺轮播图  **/
export const getSwiperImage = data => post('/rest/v4/pp/app/index/getSwiperImage', data);
/** 首页-获取首页json配置  **/
export const getJsonConfig = data => post('/rest/v4/pp/app/index/getJsonConfig', data);
/** 首页-查询最近的转卖场次  **/
export const getLateLyAuction = data => post('/rest/v4/pp/app/index/getLateLyAuction', data);
/** 好货拍拍-app-手机号码一键登录  **/
export const loginByLocalMobile = data => post('/rest/v4/pp/app/loginByLocalMobile', data);
/** 好货拍拍-app-获取手机一键登录安全验证码  **/
export const getPhoneLoginMD5Code = data => post('/rest/v4/pp/app/getPhoneLoginMD5Code', data);
/** 首页-领取优惠券  **/
export const sendNewUserCoupon = data => post('/rest/v4/pp/app/user/index/sendNewUserCoupon', data);
/** 首页-判断用户是否有新人活动（需登录）  **/
export const hasNewUserPackage = data => post('/rest/v4/pp/app/user/index/hasNewUserPackage', data);
/** 检测应用更新 **/
export const checkAppVersion = data => post('/rest/v4/pp/app/shopinfo/checkAppVersion', data);
/** 查询待支付订单数量 **/
export const getWaitPayOrderNum = data => post('/rest/v4/pp/app/order/getMhWaitPayOrderNum', data);
/** 查询待支付订单数量 **/
export const getUserSpreadShareUrl = data => post('/rest/v4/pp/app/user/my/getShareUrl', data);
/** 获取提现优惠券列表 **/
export const getWithdrawCouponList = data => post('/rest/v4/pp/app/user/coupon/getWithdrawCouponList', data);
/** 获取卡券中心优惠券使用记录 **/
export const getCouponCenterList = data => post('/rest/v4/pp/app/user/coupon/getCouponCenterList', data);
/** 获取优惠券使用记录 **/
export const getCountUseHistory = data => post('/rest/v4/pp/app/user/coupon/getCountUseHistory', data);
/** 获取系统字典列表 **/
export const getDictList = data => post('/rest/v4/pp/app/sys/dict/getDictList', data);
/** 获取盲盒IP列表 **/
export const getIpList = data => post('/rest/v4/pp/app/gamebox/ip/getIpList', data);
/** 获取首页新品推荐列表 **/
export const getIndexGameboxList = data => post('/rest/v4/pp/app/gamebox/getIndexGameboxList', data);
/** 获取盲盒列表 **/
export const getAppGameboxList = data => post('/rest/v4/pp/app/gamebox/getAppGameboxList', data);
/** 获取最新开箱列表 **/
export const getNewOpenBoxList = data => post('/rest/v4/pp/app/gamebox/getNewOpenBoxList', data);
/** ===============xjm end============================ **/


/* ================styang begin ======================= */

/* 获取当日的转卖场次 */
export const getAuctions = data => {
	return post('/rest/v4/pp/app/auction/getAuctions', data);
}
/* 获取转卖场次 */
export const getAuction = data => {
	return post('/rest/v4/pp/app/auction/getAuction', data);
}
/* 获取转卖场次 */
export const pubAuctionInfo = data => {
	return post('/rest/v4/pp/app/auction/pubAuctionInfo', data);
}

/*场次物品 */
export const getLots = data => {
	return post('/rest/v4/pp/app/auction/getLots', data);
}
/*场次库存 */
export const getAuctionLotStock = data => {
	return post('/rest/v4/pp/app/auction/getAuctionLotStock', data);
}
/*场次中-物品详情 */
export const getLot = data =>{
	return post('/rest/v4/pp/app/auction/getLot', data);
}
/* 物品列表 */
export const getAuctionLots = data => {
	return post('/rest/v4/pp/app/auction/getAuctionLots', data);
}
/* 物品转卖纪录列表 */
export const getAuctionLotList = data => {
	return post('/rest/v4/pp/app/auction/getAuctionLotList', data);
}
/* 物品列表 */
export const getAuctionLot = data => {
	return post('/rest/v4/pp/app/auction/getAuctionLot', data);
}
/* 物品-关注 */
export const followLot = data => {
	return post('/rest/v4/pp/app/user/auction/followLot', data);
}
/* 物品-转卖 */
export const pubAuctionLot = data => {
	return post('/rest/v4/pp/app/user/auction/pubAuctionLot', data);
}
/* 物品-留下自用 */
export const receiveAuctionLot = data => {
	return post('/rest/v4/pp/app/auction/receiveAuctionLot', data);
}
/* 物品-交易记录 */
export const getAuctionLotsLog = data => {
	return post('/rest/v4/pp/app/user/auction/getAuctionLotsLog', data);
}
/* 物品-场物品卖品类目 */
export const getLotsGoodsCategory = data => {
	return post('/rest/v4/pp/app/auction/getLotsGoodsCategory', data);
}
/* VIP券-列表 */
export const getAuctionCoupons = data => {
	return post('/rest/v4/pp/app/user/auction/getAuctionCoupons', data);
}
/* VIP券-数量 */
export const getAuctionCouponsCount = data => {
	return post('/rest/v4/pp/app/user/auction/getAuctionCouponsCount', data);
}
/* VIP券-使用 */
export const consumeAuctionCoupon = data => {
	return post('/rest/v4/pp/app/user/auction/consumeAuctionCoupon', data);
}
/* VIP券-赠送 */
export const transferAuctionCouponToUser = data => {
	return post('/rest/v4/pp/app/user/auction/transferAuctionCouponToUser', data);
}
/* 物品订单-下单 */
export const secKillLot = data => {
	return post('/rest/v4/pp/app/user/auction/secKillLot', data);
}
/* 物品订单-转卖押金计算 */
export const getAuctionLotDepositMoney = data => {
	return post('/rest/v4/pp/app/user/auction/getAuctionLotDepositMoney', data);
}
/**物品转卖 数据**/
export const getLotByTurn = data => {
	return post('/rest/v4/pp/app/user/auction/getLotByTurn', data);
}
/**物品-自动留下配置**/
export const getAutoStayLotConfig = data => {
	return post('/rest/v4/pp/app/user/auction/getAutoStayLotConfig', data);
}

/**物品转卖 获物品卖品协议**/
export const getLotAgreementInfo = data => {
	return post('/rest/v4/pp/app/commonAgreement/getLotAgreementInfo', data);
}
/**订单 支付状态**/
export const getOrderPayStatus = data => {
	return post('/rest/v4/pp/app/order/getOrderPayStatus', data);
}

/**物品置换-申请置换列表**/
export const getLotExchangeApplyList = data => {
	return post('/rest/v4/pp/app/user/auction/getLotExchangeApplyList', data);
}

/**物品置换-可置物品卖品**/
export const getCanExchangeLotList = data => {
	return post('/rest/v4/pp/app/user/auction/getCanExchangeLotList', data);
}

/**物品置换-申请置换**/
export const createLotApply = data => {
	return post('/rest/v4/pp/app/user/auction/createLotApply', data);
}

/**物品置换-统计**/
export const getExchangeApplyStatistics = data => {
	return post('/rest/v4/pp/app/user/auction/getExchangeApplyStatistics', data);
}
/**物品置换-置换券信息**/
export const getExchangeCouponInfo = data => {
	return post('/rest/v4/pp/app/user/auction/getExchangeCouponInfo', data);
}

/**转卖-物品优惠券详情**/
export const getLotShopGoodsCouponDetails = data => {
	return post('/rest/v4/pp/app/user/auction/getLotShopGoodsCouponDetails', data);
}
/* 置换订单信息 */
export const getExchangeOrderDetail = data => {
	return post('/rest/v4/pp/app/user/auction/getExchangeOrderDetail', data);
}
/* 客户端-首页广告-列表 */
export const getCommonPosterList = data => {
	return post('/rest/v4/pp/app/commonPoster/getCommonPosterList', data);
}

/* 客户端-首页广告-获取 */
export const getCommonPoster = data => {
	return post('/rest/v4/pp/app/commonPoster/getCommonPoster', data);
}
/* app-积分支付 */
export const orderScorePay = data => {
	return post('/rest/v4/pp/app/user/order/orderScorePay', data);
}
/* 我的盒柜 */
export const getMhGoodsGameboxItemList = data => {
	return post('/rest/v4/pp/app/user/goodsGamebox/getMhGoodsGameboxItemList', data);
}

/* 我的盒柜 发货*/
export const mhGoodsGameboxItemSendPackage = data => {
	return post('/rest/v4/pp/app/user/goodsGamebox/mhGoodsGameboxItemSendPackage', data);
}
/* 我的盒柜 确认收货 */
export const mhGoodsGameboxItemConfirmPackage = data => {
	return post('/rest/v4/pp/app/user/goodsGamebox/mhGoodsGameboxItemConfirmPackage', data);
}


/* ================styang end   ======================= */

/* ================chenjun begin ======================= */

/* 常见问题 */
export const getCommonHelpList = data => {
	return post('/rest/v4/pp/app/common/getCommonHelpList', data);
}
/* 常见问题详情 */
export const getCommonHelp = data => {
	return post('/rest/v4/pp/app/common/getCommonHelp', data);
}
/* 意见反馈标签 */
export const getSuggestLabels = data => {
	return post('/rest/v4/pp/commonSuggestLabel/getCommonSuggestLabelList', data);
}
/* 提交意见反馈 */
export const saveSuggest = data => {
	return post('/rest/v4/pp/app/user/commonSuggest/saveSuggest', data);
}
/* 店铺信息 */
export const getShopInfo = data => {
	return post('/rest/v4/pp/app/shopInfo/getShopInfo', data);
}

/* 用户信息 */
export const getUserInfo = data => {
	return post('/rest/v4/pp/app/user/getUserInfo', data);
}
/* 保存用户头像 */
export const saveUserPhoto = data => {
	return post('/rest/v4/pp/app/user/saveUserPhoto', data);
}

/* 收藏的商品 */
export const getCollectGoods = data => {
	return post('/rest/v4/pp/app/goods/getCollectGoods', data);
}

/* 协议详情 */
export const getAgreement = data => {
	return post('/rest/v4/pp/app/commonAgreement/getCommonAgreement', data);
}

/* 合拍账户管理 */
export const getBalanceShareInfo = data => {
	return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareInfo', data);
}

/* 合拍账户管理-详情 */
export const getBalanceShareInfoDetail = data => {
	return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareInfoDetail', data);
}

/* 资产-合拍列表 */
export const getBalanceShareList = data => {
	return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareList', data);
}

/* 资产-合拍列表-同意 */
export const acceptBalanceShareApply = data => {
	return post('/rest/v4/pp/app/user/balanceShare/acceptBalanceShareApply', data);
}

/* 资产-合拍列表-拒绝 */
export const refuseBalanceShareApply = data => {
	return post('/rest/v4/pp/app/user/balanceShare/refuseBalanceShareApply', data);
}

/* 资产-合拍列表-取消共享 */
export const endBalanceShareNote = data => {
	return post('/rest/v4/pp/app/user/balanceShare/endBalanceShareNote', data);
}


/* ================chenjun end   ======================= */

/*获取请求Domain*/
export const getReqDomain = url => {
	return uni.$config.DOMAIN;
};

/* 封装发起支付POST */
export const payPost = (url, data = {}) => {
	data.payType = 2;
	// #ifdef MP-WEIXIN
	if (!data.payId){
		data.payId = uni.$config.PAY_ID;
	}
	data.payType = 1;
	// #endif	
	data.isPayPost = true;
	return post(url, data);
};

/*封装post请求*/
export const post = (url, dataSource = {}) => {
	/*登录拦截器 */
	for (const index in uni.$config.CLAIM_AUTH_LOGIN_API) {
		let claim = uni.$config.CLAIM_AUTH_LOGIN_API[index];

		if (url.startsWith(claim) && uni.$config.CLAIM_AUTH_LOGIN_API_EXCLUDE.indexOf(url) < 0) {
			if (!uni.$auth.isLogin()) {
				uni.selfNavigateTo({
					url: uni.$config.LOGIN_PAGE
				});
				return;
			}
		}
	}
	
	var data = Object.assign({}, dataSource)
	// #ifdef APP-PLUS
	if (uni.$deviceId == 'null' || !uni.$deviceId){
		uni.$deviceId = plus.push.getClientInfo().clientid || ''
	}
	// #endif
	data.deviceId = uni.$deviceId || ''
	data.clientId = uni.$deviceId || ''
	data.deviceType = uni.$deviceType || ''
	let autoShowErrMsg = data.autoShowErrMsg;
	if (autoShowErrMsg !== undefined) delete data.autoShowErrMsg;
	let callBackExtData = data.callBackExtData;
	if (callBackExtData) delete data.callBackExtData;
	let isPayPost = data.isPayPost;
	if (isPayPost !== undefined) delete data.isPayPost;
	console.log(getReqDomain(url) + url,);
	return uni.$request.sendrequest({
		url: getReqDomain(url) + url,
		data
	}).then(res => {
		if (isPayPost) {
			return payDeal(res);
		}

		return res;
	}).then(res => {
		//原样返回扩展数据
		if (callBackExtData) {
			res.callBackExtData = callBackExtData;
		}

		return res;
	}).catch(err => {
		console.log(err);
		uni.hideLoading();
		let {
			code,
			message
		} = err;
		let {
			INVALID_TOKEN,
			LOGIN_OUT
		} = uni.$config.response.code;

		if (code == -999) {
			//请求fail
			if (message.indexOf('request:fail time') >= 0) {
				message = '请求超时';
				uni.$toast.showError(message);
			} else if (message.indexOf('request:fail') >= 0) {
				message = '无网络';
				uni.$toast.showError(message);
			} else {
				uni.$toast.showError(message);
			} // let pages = getCurrentPages()
			// let lastPage =pages[pages.length -1]
			// lastPage.setData({
			//     network:false
			// })

		} else if (code == INVALID_TOKEN) {
			//未登录
			uni.$auth.loginOut();

			uni.reLaunch({
				url: "/pages/login/login",
				success() {
					setTimeout(() => {
						uni.$toast.showToast('未登录！');
					}, 100)
				}
			})
		} else if (code == LOGIN_OUT) {
			//退出登录
			uni.$auth.loginOut();
			// uni.$toast.alert('强制下线！');
			uni.switchTab({
				url: "/pages/index/main",
				success() {
					setTimeout(() => {
						uni.$toast.showToast('强制下线！');
					}, 100)
				}
			})

		} else if (code >= 10000) {
			//服务端 返回false
			if (message.length > 30) {
				message = '接口请求失败';
				uni.$toast.showError(message);
			} else {
				if (autoShowErrMsg !== false) uni.$toast.showError(message);
			}
		}

		return Promise.reject(err);
	});
};
/* 支付处理 */
const payDeal = res => {
	if (res.isPayed || res.nopay) {
		return res;
	}

	let data = res.data || {};
	
	if (data&&data.package&&data.package.indexOf("test_") >= 0) {
		return uni.$api.testPay({
			'timeStamp': res.data.timeStamp,
			'nonceStr': res.data.nonceStr,
			'package': res.data.package,
			'paySign': res.data.paySign
		}).then(notifyres => {
			if (notifyres.success) {
				uni.$toast.showToast('测试支付成功');
				return res;
			} else {
				return Promise.reject(notifyres);
			}
		});
	} else {
		return new Promise((resolve, reject) => {
			var provider = "wxpay";
			switch(res.payChannel){
				case 2: provider = "wxpay"; break;
				case 3: provider = "alipay"; break;
			}
			uni.requestPayment({
				provider: provider,
				// #ifdef MP-WEIXIN
				...res.data,
				// #endif
				// #ifndef MP-WEIXIN
				orderInfo: res.orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				// #endif
				
				success: function (res) {
					console.log('requestPayment', res);
					resolve(res);
				},
				fail: function (err) {
					console.log('requestPayment err', err);
					
					if (err.errMsg.indexOf('fail cancel')) {
						reject({
							code: -800,
							message: '取消支付'
						});
					} else {
						reject({
							code: -999,
							message: err.errMsg
						});
					}
				}
			});
		});
	}
}; //////////////////////////////二维码 start////////////////////////////////////////////
// *   1用户端       1用户    1分享商品             用户编号-商品编号                u_1_1_userId_goodsId
// *   1用户端       1用户    2.分享已购订单        用户编号_订单编号                u_1_2_userId_orderId
// *   1用户端       1用户    3.店铺分享海报       用户编号_分享海报编号             u_1_3_userId_posterId  //预留
// *   1用户端       1用户    4.消费分享海报       用户编号_分享海报编号             u_1_4_userId_posterId  //删除
// *   1用户端       1用户    5.分享店铺海报        用户编号_店铺编号               u_1_5_userId_shopId
// *   1用户端       2商家    1.邀请会员           商家编号_商家编号                 u_2_1_shopId_shopId
// *   1用户端       2商家    2.进入首页           商家编号_商家编号                 u_2_2_shopId_shopId
// *   1用户端       2商家    3.收款               商家编号_商家编号                 u_2_3_shopId_shopId
// *   1用户端       2商家    4.无桌堂食点单        商家编号_商家编号                 u_2_4_shopId_shopId
// *   1用户端       2商家    5.桌位点单           商家编号_桌位编号                 u_2_5_shopId_tableId
// *   1用户端       2商家    6.领取优惠券          商家编号_优惠券编号               u_2_6_shopId_couponId


export const getQR = key =>
	`${uni.$config.IMAGE_DOMAIN}/upload/qrcode/${key}.png?_current_shop=${uni.$config.CURRENT_SHOP}`;
export const getShareUrl = key => {
	switch (key.substring(0, 1)) {
		case 'u':
			return `/pages/inmini/share/share?scene=${key}&card=1`;
	}
};
export const getQRByShareInfo = posterInfo => {
	let {
		mode,
		userInfo,
		goods,
		shopInfo
	} = posterInfo || {};
	let key = '';

	switch (mode) {
		case 1:
		case 11:
			key = `u_1_5_${userInfo.userId}_${shopInfo.userId}` || '';
			break;

		case 2:
			key = `u_1_1_${userInfo.userId}_${goods.goodsId}` || '';
			break;
	}

	if (key) {
		return getQR(key);
	}

	return '';
};
export const getShareUrlByShareInfo = posterInfo => {
	let {
		mode,
		userInfo,
		goods,
		shopInfo,
		rechargeCard,
		shopPosters = [],
		selectPosterIndex
	} = posterInfo || {};
	let key = '';

	switch (mode) {
		case 1:
		case 11:
		case 3:
			key = `u_1_5_${userInfo.userId}_${shopPosters[selectPosterIndex].userShopPosterId}` || '';
			break;

		case 2:
			key = `u_1_1_${userInfo.userId}_${goods.goodsId}` || '';
			break;
	}

	if (key) {
		return getShareUrl(key);
	}

	return '';
};
