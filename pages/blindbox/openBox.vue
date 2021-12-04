<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content"><text>选择开盒</text></block>
		</cu-custom>
		<view class="user-info">
			<view class="flex-between ac">
				<view class="dflex ac">
					<image :src="userInfo.userPhoto || '../../static/img/icon/default-user.png'" class="user-head"></image>
					<view class="dflex fdc jc-fs">
						<view class="fs-26 lh-26 fc-464 mb8">{{ userInfo.userNickName || userInfo.mobile || '' }}</view>
						<view class="fs-26 lh-26 fc-464">
							剩余:
							<text class="fc-ff0 fw-b">{{ userInfo.money }}</text>
							魔石
						</view>
					</view>
				</view>
				<view class="recharge-btn" @click.stop="toRecharge()">立即充值</view>
			</view>
		</view>
		<view class="container">
			<view class="wrapper">
				<view class="openbox mb60">
					<view class="flex-between ac mb26">
						<view class="dflex ac">
							<image src="../../static/img/icon/openbox-icon@2x.png" class="openbox-icon"></image>
							<view class="fs-28 lh-28 fc-464 fw-b">{{ goods.goodsTitle }}</view>
						</view>
						<view class="fs-28 lh-28 fc-464">请选择您心仪的盒子</view>
					</view>
					<view class="blindbox-list mb42">
						<view class="blindbox" v-for="(item, index) in blindbox" @click.stop="changeBox(item)">
							<image src="../../static/img/images/openBoxBg.png" class="blindbox-case"></image>
							<image src="../../static/img/images/blindbox-cur@2x.png" class="blindbox-cur" v-if="item.checked"></image>
						</view>
					</view>
					<view class="btn-box">
						<view class="black-btn blindbox-btn" @click.stop="onRandom1Box">随机1个</view>
						<view class="black-btn blindbox-btn" @click.stop="onRandom5Box">随机5个</view>
						<view class="yellow-btn blindbox-btn" @click.stop="onOpenBox">开箱</view>
					</view>
				</view>
				<view class="winner-box" v-if="openList.length > 0">
					<view class="dflex ac mb30 ">
						<view class="title-icon"></view>
						<view class="fs-28 lh-28 fc-464 fw-b">该盲盒开盒名单</view>
					</view>
					<view class="winner-list">
						<swiper :circular="true" :disable-touch="true" :indicator-dots="false" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
							<swiper-item v-for="newOpenList in showOpenList">
								<view class="swiper-item">
									<view class="winner dflex ac" v-for="openItem in newOpenList">
										<image :src="openItem.goodsImage" class="winner-img"></image>
										<view class="dflex fdc jc-fs">
											<view class="fs-26 lh-36 fc-464 user-length">恭喜 {{ openItem.userNickName || openItem.mobile }}</view>
											<view class="fs-26 lh-36 fc-464 user-length">抽中了{{ openItem.goodsTitle }}</view>
										</view>
										<view class="dflex ac" v-if="openItem.goodsItemSaleStatus == 10">
											<image src="../../static/img/icon/default-user.png" class="winner-user mr12"></image>
											<view class="fs-26 lh-26 fc-ff0">回收了{{ openItem.goodsItemRecyclePrice }}魔石</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="blindbox-goods" id='blindboxGoods'>
					<view class="dflex ac mb30">
						<view class="title-icon"></view>
						<view class="fs-28 lh-28 fc-464 fw-b">本盲盒商品</view>
					</view>
					<view class="goods-list">
						<view class="goods" v-for="item in itemShow" @click="showItemGoodsInfoFun(item.goodsItemGoodsId)">
							<image :src="item.goodsImage" class="goods-image"></image>
							<view class="fs-22 lh-36 fc-464 fw-b mb10 line2">{{ item.goodsTitle }}</view>
							<view class="dflex  fdc">
								<!-- <view class="fs-20 lh-20 fc-464 td-lt dflex ai-fe mb10">
									<view class="fs-20 lh-20">原价</view>
									￥{{ item.goodsOriginalPrice }}
								</view>
								<view class="fs-28 lh-28 fc-ff0 dflex ai-fe">
									<view class="fw-b">{{ item.goodsPrice }}</view>
									<view class="fs-22 lh-22 mb2">魔石</view>
								</view> -->
								<view class="fs-26 fc-ff0 dflex align-center">
									<view class="pr10">市场价</view>
									<view class="fw-b">￥{{ item.goodsOriginalPrice }}</view>
								</view>
								<!-- <view class="fs-22 lh-22 fc-464 fw-b"></view> -->
							</view>
						</view>
					</view>
					<view class="fs-30 fc-939 text-center pb30 pt30">{{loadingText}}</view>
				</view>
			</view>
		</view>
		<!-- 购买弹窗 -->
		<view class="cu-modal bottom-modal buy-modal" :class="showPay ? 'show' : ''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="content fw-b">确认支付</view>
					<view class="action" @click.stop="showPay = false"><text class="cuIcon-close"></text></view>
				</view>
				<view class="padding-sm" style="height: calc(100% - 100rpx);">
					<scroll-view scroll-y="true" style="height: calc(100% - 296rpx);">
						<view class="cabinet-list">
							<view class="goods-info dflex ai-fs">
								<image :src="goods.goodsImage" mode="" class="goods-image"></image>
								<view class="wp100 flex-between fdc" style="height: 256rpx;">
									<view class="goods-name mt8">{{ goods.goodsTitle }}</view>
									<view class="">
										<view class="flex-between ac mb20">
											<view class="fs-28 lh-28 fc-464">数量：</view>
											<view class="fs-28 lh-28 fc-464">×{{ buyCount }}</view>
										</view>
										<view class="flex-between ac mb20">
											<view class="fs-28 lh-28 fc-464">价格：</view>
											<view class="fs-28 lh-28 fc-464">
												<text class="fc-ff0 fw-b">{{ goods.goodsPrice }}</text>
												魔石
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="operation-btnbox mt20">
						<view class="agreement-box flex-center mb20">
							<view class="agreenment-btn" :class="{ cur: payAgreementCheck }" @click="payAgreementCheck = !payAgreementCheck"></view>
							<!-- <view class="agreenment-btn cur"></view> -->
							<view class="fs-26 lh-26 fc-464">
								我已阅读并同意
								<text class="fc-ffb">《支付协议》</text>
							</view>
						</view>
						<view class="blindbox-info flex-between ac mb20">
							<view class="fs-30 lh-30 fc-464">盲盒数量：×{{ buyCount }}</view>
							<view class="fs-30 lh-30 fc-464">
								总计：
								<text class="fs-36 lh-36 fc-ff0 fw-b">{{ goods.goodsPrice * buyCount }}</text>
								魔石
							</view>
						</view>
						<view class="now-btn" @click="onRechargeAndPay(userInfo.money, goods.goodsPrice * buyCount)" v-if="userInfo.money < goods.goodsPrice * buyCount">
							充值并支付
						</view>
						<view class="now-btn" @click="onPay" v-else>确认支付</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 盒中商品弹窗 -->
		<view class="cu-modal bottom-modal box-modal" :class="showPaySuccess ? 'show' : ''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="content fw-b">盒中商品</view>
					<view class="action" @click.stop="showPaySuccess = !showPaySuccess"><text class="cuIcon-close"></text></view>
				</view>
				<view class="padding-sm" style="height: calc(100% - 160rpx);">
					<scroll-view scroll-y="true" style="height: calc(100% - 296rpx);">
						<view class="cabinet-list" v-for="(item, index) in paySuccessResult.rows" :key='index'>
							<view class="goods-info dflex ac" @click="showItemGoodsInfoFun(item.goodsItemGoodsId)">
								<view @click.stop="onSelectBoxItem(index)">
									<view class="goods-radio" v-if="!item.checked"></view>
									<image src="../../static/img/icon/goods-radio@2x.png" class="goods-radio checked" v-else></image>
								</view>
								<image :src="item.goodsImage" mode="" class="goods-image"></image>
								<view class="wp100">
									<view class="goods-name mt8 mb48">{{ item.goodsTitle }}</view>
									<view class="flex-between ac mb20">
										<view class="fs-28 lh-28 fc-464">数量：</view>
										<view class="fs-28 lh-28 fc-464">×1</view>
									</view>
									<view class="flex-between ac mb10">
										<view class="fs-28 lh-28 fc-464">市场价：</view>
										<view class="fs-28 lh-28 fc-464">
											<text class="fc-ff0 fw-b">{{ item.goodsItemOriginalPrice }}</text>
										</view>
									</view>
									<view class="flex-between ac mb10">
										<view class="fs-28 lh-28 fc-464">平台价：</view>
										<view class="fc-ff0 fw-b">{{ item.goodsItemPrice }}</view>
									</view>
									<view class="flex-between ac">
										<view class="fs-28 lh-28 fc-464">回收价：</view>
										<view class="fc-ff0 fw-b" v-if="paySuccessResult.maxGoods.goodsItemGoodsId==item.goodsItemGoodsId && couponAmount>0">
											{{ item.goodsItemRecyclePrice + couponAmount}}
										</view>
										<view class="fc-ff0 fw-b" v-else>
											{{ item.goodsItemRecyclePrice }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view>
						<view class="coupon" v-show="isCouponShow">
							<view class="text-center fs-40 mb20">可使用抵用券</view>
							<image class="close-image" @click="isCouponShow = false" src="../../static/img/icon/main-close.png" mode=""></image>
							<scroll-view scroll-y="true" style="height: calc(100% - 84rpx);">
								<view class="dflex justify-between  align-center coupon-item " v-for="item in couponData" :key="item.voucherId" @click="radioChange(item)">
									<view>
										<view class="coupon-name fs-30">回收抵用券</view>
										<view class="fs-24">有效期至{{ item.voucherTime }}</view>
									</view>
									<view class="dflex align-center">
										<view class="fc-red ">
											<view class="fs-50 text-center">{{ item.voucherValue }}</view>
											<view class="fs-24">最高抵用{{ item.voucherValue }}魔石</view>
										</view>
										<view class="coupon-radio" :class="{ 'radio-active': item.checked }"></view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="operation-btnbox mt20">
						<view class="dflex justify-between align-center">
							<view style="margin-left: 20rpx;">回收抵用券</view>
							<view class="dflex align-center" @click="handleCouponList">
								<text v-if="couponAmount != 0" class="fc-red">+{{ couponAmount }}魔石</text>
								<text v-else-if="couponData.length > 0" class="fc-red">可用{{ couponData.length }}张</text>
								<text v-else>暂无可用</text>
								<image class="more-icon" src="../../static/img/icon/more-icon.png" mode=""></image>
							</view>
						</view>
						<view class="change-box mb20" @click="onSelectBoxItemAll">
							<view class="change-btn" v-if="!paySuccessResult.isSelectAll"></view>
							<image src="../../static/img/icon/goods-radio@2x.png" class="change-btn cur" v-else></image>
							<view class="fs-30 lh-30 fc-464">全选</view>
						</view>
						<view class="recovery-btn mb20" @click="onRecycle">
							7折回收
							<text class="fs-36 lh-36 fc-f fw-b ml10 mr10">{{ totalRecoveryPrice }}</text>
							魔石
						</view>
						<view class="now-btn" @click="onSendPackage">立即发货</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情弹窗 -->
		<view class="cu-modal bottom-modal detail-modal" v-if="itemGoodsInfo" :class="showItemGoodsInfo ? 'show' : ''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="action" @click.stop="showItemGoodsInfo = false"><text class="cuIcon-close"></text></view>
				</view>
				<scroll-view scroll-y="true" class="hp100">
					<view class="goods-swiper" v-if="itemGoodsInfo.goodsImages.length > 0">
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="(item,index) in itemGoodsInfo.goodsImages" :key='index'>
								<view class="swiper-item"><image :src="item.goodsImagePath" class="goods-banner"></image></view>
							</swiper-item>
						</swiper>
					</view>
					<view class="padding-sm">
						<view class="goods-price mb20">
							<view class="fs-40 fc-464 fw-b fc-ff0">
								<text class="pr16">市场价</text>
								<text>¥{{ itemGoodsInfo.goodsOriginalPrice }}</text>
							</view>
							<!-- <view class="dflex ac">
								<view class="fs-26 lh-26 fc-464">
									原价：
									<text class="td-lt">￥{{ itemGoodsInfo.goodsOriginalPrice }}魔石</text>
								</view>
							</view> -->
						</view>
						<view class="dflex fdc ai-fs goods-parameter">
							<view class="goods-name mb16">{{ itemGoodsInfo.goodsTitle }}</view>
							<view class="fs-26 lh-48 fc-464" v-for="attrItem in itemGoodsInfo.goodsAttrList">{{ attrItem.goodsAttrName }}：{{ attrItem.goodsAttrValue }}</view>
						</view>
					</view>
					<view class="goods-detail">
						<view class="fs-28 lh-28 fc-46 fw-b mb30">商品详情</view>
						<view class="detail-imgbox" v-if="itemGoodsInfo.goodsDesc"><rich-text :nodes="itemGoodsInfo.goodsDesc"></rich-text></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<chooseaddress v-if="showAddress" :goodsItemIds="paySuccessResult.goodsItemIds" @success="sendOrRecycleSuccess" @cancel="showAddress = false"></chooseaddress>
	</view>
</template>

<script>
import chooseaddress from 'pages/component/chooseaddress.vue';
export default {
	data() {
		return {
			rechargeAndPaying: false,
			channelData: [],
			showItemGoodsInfo: false,
			itemGoodsInfo: '',
			showAddress: false,
			paySuccessResult: {
				orderId: '',
				goodsItemIds: '',
				rows: [],
				totalRecyclePrice: 0,
				isSelectAll: false
			},
			showPaySuccess: false,
			payAgreementCheck: true,
			buyCount: 1,
			showPay: false,
			goodsId: '',
			goods: {},
			openList: [],
			itemShow: [],
			userInfo: {},
			showOpenList: [],
			randoming: false,
			blindboxCur: 0,
			blindbox: [{ checked: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			isCouponShow: false,
			couponData: [],
			couponAmount: 0,
			start:0,
			limit:15,
			isReachBottom:true,
			loadingText:'加载中...',
			isPreview:1,
			voucherList:[],
		};
	},
	created: function() {
		uni.$api.getPayChannel({}).then(res => {
			this.channelData = res.data;
		});
	},
	computed:{
		totalRecoveryPrice:function(){
			return (+this.couponAmount + this.paySuccessResult.totalRecyclePrice).toFixed(2);
		}
	},
	watch:{
		showPaySuccess(newShow){
			if(newShow){
				this.couponAmount = 0;
				this.couponData.forEach(item =>{
					if(item.checked) {item.checked = false}
				})
				this.couponData = [];
			}
		}
	},
	onReachBottom(){
		if(this.isReachBottom){
			this.start += this.limit;
			this.getGoodsGameboxItemShow();
		}
	},
	components: {
		chooseaddress
	},
	onLoad(e) {
		this.goodsId = e.goodsId || '1';
		this.isPreview = e.isPreview;
		this.onFetchData();
		this.onFetchUserInfo();
	},
	onShow() {
		this.getGoodsGameboxItemShow();
		this.getVoucherByUser();
		// this.paySuccess("821092637667001")
	},
	methods: {
		// 显示抵用券列表
		handleCouponList(){
			if(this.couponData.length == 0) return
			this.isCouponShow = true;
		},
		// 获取抵用券
		getVoucherByUser(){
			// getVoucherByUser
			uni.$api.getVoucherByUser({voucherState:2}).then(res =>{
				res.voucherList.forEach(item =>{
					item.checked = false;
					item.voucherTime = item.voucherTime.split(' ')[0];
				});
				this.voucherList = res.voucherList;
			})
		},
		radioChange(e){
			console.log(this.paySuccessResult);
			let maxGoods = this.paySuccessResult.maxGoods;
			this.couponData.forEach(item =>{ 
				if(e.voucherId == item.voucherId) {
					item.checked = !item.checked
					if(item.checked){
						let voucherValue = maxGoods.goodsItemRecyclePrice + item.voucherValue;
						if(voucherValue > maxGoods.goodsItemPrice){
							this.couponAmount = (maxGoods.goodsItemPrice - maxGoods.goodsItemRecyclePrice).toFixed(2) ;
						}else{
							this.couponAmount = item.voucherValue.toFixed(2);
						}
					}else{
						this.couponAmount = 0;
					}
				}
				else if(item.checked) {item.checked = false}
			})
		},
		getGoodsGameboxItemShow(){
			this.loadingText = '加载中...'
			uni.$api
				.getGoodsGameboxItemShow({
					goodsId: this.goodsId,
					offset: this.start,
					limit: this.limit,
				})
				.then(res => {
					this.itemShow = this.itemShow.concat(res.itemShow);
					if(this.isPreview == 1){
						this.$nextTick(() =>{
							const query = uni.createSelectorQuery().in(this);
							query.select('#blindboxGoods').boundingClientRect(data => {
								uni.pageScrollTo({
									scrollTop: data.top - 80,
									duration: 300
								})
							}).exec();
							this.isPreview = 0;
						})
					}
					if(this.itemShow.length == 0){
						this.loadingText = '暂无数据'
					}
					if(res.itemShow.length < this.limit){
						this.isReachBottom = false;
						this.loadingText = '没有更多啦'
					}
				})
			
		},
		onFetchData() {
			uni.$api
				.getGoodsGameboxDetail({
					goodsId: this.goodsId
				})
				.then(res => {
					this.goods = res.goods || {};
					this.openList = res.openList || {};
					this.showOpenList = group(this.openList, 2);
				});
			function group(array, subGroupLength) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, (index += subGroupLength)));
				}
				return newArray;
			}
		},
		onFetchUserInfo() {
			uni.$api.getMhUserBalanceScore().then(res => {
				this.userInfo = res.data || {};
			});
		},
		onFetchItemGoodsInfo(goodsId) {
			return uni.$api
				.getGoodsDetail({
					goodsId
				})
				.then(res => {
					this.itemGoodsInfo = res.data || {};
					if (this.itemGoodsInfo.goodsDesc) {
						this.itemGoodsInfo.goodsDesc = uni.$utils.formatRichTextImage(this.itemGoodsInfo.goodsDesc);
					}
				});
		},
		onRechargeAndPay(balanceMoney, payMoney) {
			if (!this.payAgreementCheck) {
				uni.$toast.showError('请勾选同意支付协议！');
				return;
			}
			if (this.rechargeAndPaying) return;
			this.rechargeAndPaying = true;
			var model = this.channelData[0];
			model.money = payMoney - balanceMoney;
			uni.$api
				.rechargeScoreNew(model)
				.then(res => {
					console.log('rechargeScoreNew', res);
					return this.onPay(res.orderId);
				})
				.then(() => {
					this.rechargeAndPaying = false;
				})
				.catch(() => {
					this.rechargeAndPaying = false;
				});
		},
		onPay(chargeOrderId) {
			if (!this.payAgreementCheck) {
				uni.$toast.showError('请勾选同意支付协议！');
				return Promise.reject('请勾选同意支付协议');
			}
			if (this.paying) return Promise.reject('支付中');
			this.paying = true;
			uni.showLoading({
				title:'加载中...'
			})
			return uni.$api
				.createMhGoodsGameBoxOrderPayPlan({
					chargeOrderId: chargeOrderId,
					goodsId: this.goodsId,
					count: this.buyCount
				})
				.then(res => {
					var param = {
						orderId: res.orderId || '',
						payId: 102,
						mode: 3 //3盲盒支付
					};
					return uni.$api.appPay(param);
				})
				.then(res => {
					this.paySuccess(res.orderId);
					this.onFetchUserInfo();
					this.blindbox.map(e => (e.checked = false));
					this.blindbox[0].checked = true;
					this.buyCount = 1;
					this.paying = false;
					this.showPay = false;
				})
				.catch(err => {
					console.log(err);
					this.paying = false;
					return Promise.reject();
				});
		},
		paySuccess(orderId) {
			this.paySuccessResult.rows = [];
			this.paySuccessResult.totalRecyclePrice = 0;
			this.paySuccessResult.orderId = orderId;
			this.showPaySuccess = true;
			return uni.$api
				.getMhGoodsGameBoxItemDataByOrderId({
					orderId: orderId
				})
				.then(res => {
					res.rows.map((item,index) => {
						if (item.goodsItemSaleStatus == 0) {
							this.paySuccessResult.rows.push(item);
						}
					});
					this.onSelectBoxItemAll();
					uni.hideLoading();
				});
		},
		onSelectBoxItem(index) {
			console.log('onSelectBoxItem', index);
			let item = this.paySuccessResult.rows[index];
			if (item.goodsItemSaleStatus == 0) {
				item.checked = !item.checked;
			} else {
				item.checked = false;
			}
			this.calcIsSelectAll();
			this.$forceUpdate();
		},
		onSelectBoxItemAll() {
			this.paySuccessResult.rows.map(item => {
				if (item.goodsItemSaleStatus == 0) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			this.calcIsSelectAll();
			this.$forceUpdate();
		},
		// 回收的窗口信息
		calcIsSelectAll() {
			var isSelectAll = true;
			var totalRecyclePrice = 0;
			var selectArr = [];
			let totalPrice = 0;
			let maxGoods  = {
				goodsItemPrice:0,
				goodsItemId:0,
				goodsItemRecyclePrice:0,
			};
			this.paySuccessResult.rows.map((e,index) => {
				if (e.checked && e.goodsItemSaleStatus == 0) {
					totalRecyclePrice += e.goodsItemRecyclePrice;
					totalPrice += e.goodsItemPrice;
					selectArr.push(e.goodsItemId);
					if( this.goods.goodsPrice > e.goodsItemRecyclePrice ){
						if(e.goodsItemRecyclePrice > maxGoods.goodsItemRecyclePrice){
							maxGoods = {
								goodsItemRecyclePrice: e.goodsItemRecyclePrice,
								goodsItemId: e.goodsItemId,
								goodsItemPrice: e.goodsItemPrice,
							};
							
						}
					}
				} else {
					isSelectAll = false;
				}
			});
			console.log(this.voucherList);
			//抵用券列表
			if(maxGoods.goodsItemRecyclePrice > 0 ){
				this.couponData = Object.assign([],this.voucherList);
			}
			this.paySuccessResult.maxGoods = maxGoods;
			this.paySuccessResult.isSelectAll = isSelectAll;
			this.paySuccessResult.totalRecyclePrice = totalRecyclePrice;
			this.paySuccessResult.totalPrice = totalPrice
			this.paySuccessResult.goodsItemIds = selectArr.join(',');
		},
		onRecycle() {
			console.log('onRecycle');
			uni.showLoading({
				title:'加载中...'
			})
			if (!this.paySuccessResult.goodsItemIds.length) {
				uni.$toast.showToast('请选择回收商品');
				return;
			}
			let voucherId = 0;
			this.couponData.forEach(item =>{
				if(item.checked){
					voucherId = item.voucherId;
					item.checked = false;
				}
			})
			uni.$api
				.recycleMhGoodsGamebox({
					goodsItemIds: this.paySuccessResult.goodsItemIds,
					voucherId
				})
				.then(res => {
					uni.$toast.showToast('回收成功');
					this.sendOrRecycleSuccess();
					this.onFetchUserInfo();
					if(voucherId){
						this.getVoucherByUser();
					}
					setTimeout(()=> {
						uni.hideLoading();
						this.couponAmount = 0;
						
					},100)
				});
		},
		onSendPackage() {
			console.log('onSendPackage');
			if (!this.paySuccessResult.goodsItemIds.length) {
				uni.$toast.showToast('请选择发货商品');
				return;
			}
			this.showAddress = true;
		},
		sendOrRecycleSuccess() {
			var arr = this.paySuccessResult.goodsItemIds.split(',');

			this.paySuccessResult.goodsItemIds = '';
			if (arr.length == this.paySuccessResult.rows.length) {
				this.showPaySuccess = false;
			} else {
				this.paySuccess(this.paySuccessResult.orderId);
			}
		},
		onOpenBox() {
			console.log('onOpenBox');
			// this.buyCount = 1

			if (this.buyCount == 0) {
				uni.$toast.showError('请选择要购买的盲盒！');
				return;
			}
			this.showPay = true;
		},
		onRandom1Box() {
			console.log('onRandom1Box');
			if (this.randoming) return;
			this.randoming = true;
			var random = Math.floor(Math.random() * (this.blindbox.length - 1));
			console.log('onRandom1Box', random);
			this.blindbox.map(e => (e.checked = false));
			this.blindbox[random].checked = true;

			this.buyCount = 1;
			this.randoming = false;
			this.$forceUpdate();
		},
		onRandom5Box() {
			console.log('onRandom5Box');
			if (this.randoming) return;

			this.randoming = true;
			this.blindbox.map(e => (e.checked = false));
			var tasks = [];
			var randomMap = {};
			for (var i = 0; i < 5; i++) {
				var task = new Promise((resolve, reject) => {
					var randomFuc = () => {
						var random = Math.floor(Math.random() * (this.blindbox.length - 1));
						if (!randomMap[random]) {
							randomMap[random] = true;
							resolve(random);
						} else {
							randomFuc();
						}
					};
					randomFuc();
				});
				tasks.push(task);
			}
			Promise.all(tasks).then(res => {
				console.log('执行完毕', randomMap, res);
				res.map(value => {
					this.blindbox[value].checked = true;
				});
				this.buyCount = 5;
				this.randoming = false;
				this.$forceUpdate();
			});
		},
		changeBox(item) {
			if (this.randoming) return;
			item.checked = !item.checked;
			var checkArr = this.blindbox.filter(e => e.checked);
			if (checkArr.length > 5) {
				item.checked = !item.checked;
				uni.$toast.showToast('最多只能选择五个');
				return;
			}

			this.buyCount = checkArr.length;
			this.$forceUpdate();
		},
		toRecharge() {
			uni.navigateTo({
				url: '/pages/user/assets/recharge'
			});
		},
		showItemGoodsInfoFun(goodsId) {
			this.onFetchItemGoodsInfo(goodsId).then(() => {
				this.showItemGoodsInfo = true;
			});
		},
		// 遮罩层
		moveHandle() {}
	}
};
</script>

<style lang="scss" scoped>
.close-image {
	position: absolute;
	right: 20px;
	top: 15px;
	height: 40rpx;
	width: 40rpx;
}
.coupon {
	padding: 20rpx 30rpx 0 30rpx;
	border-radius: 30rpx 30rpx 0px 0px;
	position: absolute;
	width: 750rpx;
	background-color: #f2f2f2;
	left: 0;
	top: 0;
	height: 100%;
	z-index: 1;
	.coupon-item {
		padding: 26rpx 30rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.coupon-name {
			font-weight: bold;
			padding-bottom: 16rpx;
		}
		.coupon-radio {
			height: 36rpx;
			width: 36rpx;
			margin-left: 20rpx;
			border-radius: 50%;
			position: relative;
			border: 1px solid #d1d1d1;
			display: flex;
			justify-content: center;
			align-items: center;
			&.radio-active {
				border: none;
				background: url(../../static/img/icon/goods-radio@2x.png);
				background-size: 36rpx;
			}
		}
	}
}
.more-icon {
	height: 30px;
	width: 30px;
}
.user-info {
	height: 98rpx;
	background-color: #fff;
	padding: 16rpx 40rpx 16rpx 56rpx;
}
.user-head {
	width: 66rpx;
	height: 66rpx;
	border-radius: 50%;
	margin-right: 48rpx;
}
.recharge-btn {
	width: 186rpx;
	height: 60rpx;
	background-color: #ffb900;
	border-radius: 30rpx;
	color: #46464b;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	padding: 20rpx;
}
.wrapper {
	background-color: #fff;
	border-radius: 10rpx;
}
.openbox {
	padding: 15rpx 20rpx;
}
.openbox-icon {
	width: 50rpx;
	height: 50rpx;
	margin-right: 14rpx;
	margin-left: -2rpx;
}
.blindbox-list {
	display: flex;
	flex-wrap: wrap;
}
.blindbox {
	width: 152rpx;
	height: 152rpx;
	margin-right: 20rpx;
	position: relative;
}
.blindbox:nth-child(n + 5) {
	margin-top: 20rpx;
}
.blindbox:nth-child(4n) {
	margin-right: 0;
}
.blindbox-case {
	width: 152rpx;
	height: 152rpx;
}
.blindbox-cur {
	position: absolute;
	width: 152rpx;
	height: 152rpx;
	z-index: 3;
	top: 0;
	left: 0;
}
.blindbox-btn {
	width: 204rpx;
	height: 80rpx;
	border-radius: 40rpx;
	font-size: 30rpx;
	line-height: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn-box {
	display: flex;
}
.btn-box {
	display: flex;
	justify-content: space-around;
}
.black-btn {
	background-color: #46464b;
	color: #ffb900;
}
.yellow-btn {
	color: #46464b;
	background-color: #ffb900;
}
.title-icon {
	width: 9rpx;
	height: 26rpx;
	background-color: #ffb900;
	margin-right: 14rpx;
}
.winner {
	justify-content: space-around;
}
.winner + .winner {
	margin-top: 20rpx;
}
.winner-list swiper {
	height: 216rpx;
}
.winner-img {
	width: 95rpx;
	height: 95rpx;
	margin-right: 34rpx;
}
.user-length {
	width: 280rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.winner-user {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
}
.winner-box {
	padding: 0 18rpx 0 22rpx;
	margin-bottom: 46rpx;
}
.blindbox-goods {
	padding: 0 20rpx;
}
.goods-list {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
}
.goods {
	width: 210rpx;
	margin-right: 20rpx;
}
.goods:nth-child(3n) {
	margin-right: 0;
}
.goods:nth-child(n + 4) {
	margin-top: 42rpx;
}
.goods-image {
	width: 210rpx;
	height: 210rpx;
	margin-bottom: 14rpx;
	flex-shrink: 0;
}
.cabinet-list {
	padding: 20rpx 20rpx 20rpx 12rpx;
	background-color: #fff;
	border-radius: 10rpx;
	position: relative;
}

.cabinet-list + .cabinet-list {
	margin-top: 20rpx;
}

.cabinet-list .goods-image {
	width: 256rpx;
	height: 256rpx;
	margin-right: 36rpx;
	flex-shrink: 0;
}

.goods-info + .goods-info {
	margin-top: 24rpx;
}

.goods-radio {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	margin-right: 8rpx;
	flex-shrink: 0;
	border: 1rpx solid #46464b;
}

.goods-radio.checked {
	border: 0;
}

.goods-name {
	width: 374rpx;
	font-size: 30rpx;
	color: #46464b;
	line-height: 36rpx;
	font-weight: bold;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-align: left;
}

.box-modal .goods-name {
	width: 358rpx;
}

.goods-label {
	font-size: 20rpx;
	line-height: 20rpx;
	padding: 4rpx 10rpx;
	color: #fff;
	background: #ff411c;
	border-radius: 8rpx;
	display: inline-block;
}

.recovery-btn {
	width: 710rpx;
	height: 90rpx;
	border-radius: 45rpx;
	background-color: #46464b;
	font-size: 30rpx;
	line-height: 30rpx;
	color: #ffb900;
	display: flex;
	justify-content: center;
	align-items: center;
}

.cu-dialog {
	height: 82vh;
}

.cu-modal {
	background-color: rgba(0, 0, 0, 0.4);
}

.padding-sm {
	padding-top: 10rpx;
}
.operation-btnbox {
	padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
}
.change-box {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.change-btn {
	width: 36rpx;
	height: 36rpx;
	box-shadow: 0px 0px 20rpx 0px rgba(163, 163, 163, 0.72);
	border-radius: 50%;
	margin: 10rpx 20rpx;
	border: 1rpx solid #46464b;
}
.change-btn.cur {
	border: 0;
}
.now-btn {
	width: 710rpx;
	height: 90rpx;
	border-radius: 45rpx;
	background-color: #ffb900;
	font-size: 30rpx;
	line-height: 30rpx;
	font-weight: bold;
	color: #46464b;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* 确认支付 */
.agreenment-btn {
	width: 36rpx;
	height: 36rpx;
	box-shadow: 0px 0px 20rpx 0px rgba(163, 163, 163, 0.72);
	border-radius: 50%;
	margin: 10rpx 20rpx;
	border: 1rpx solid #46464b;
}
.agreenment-btn.cur {
	background: #46464b;
	border: 8rpx solid #ffb900;
}
.blindbox-info {
	width: 710rpx;
	height: 90rpx;
	border-radius: 45rpx;
	border: 1rpx solid #46464b;
	padding: 0 30rpx 0 40rpx;
}
/* 商品详情 */
.detail-modal .cu-bar {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 99;
}
.detail-modal .cu-bar .cuIcon-close {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}
.goods-swiper swiper {
	width: 100%;
	height: 555rpx;
}
.swiper-item {
	height: 100%;
}
.goods-price {
	width: 100%;
	
	padding: 25rpx 20rpx 18rpx;
	background-color: #fff;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.goods-parameter {
	width: 100%;
	padding: 20rpx 20rpx 10rpx;
	background-color: #fff;
	border-radius: 10rpx;
}
.detail-modal .goods-name {
	width: 100%;
	font-size: 28rpx;
	line-height: 36rpx;
}
.goods-detail {
	width: 100%;
	background-color: #fff;
	padding: 32rpx 20rpx 20rpx;
}
.detail-imgbox image {
	width: 100%;
}
</style>
