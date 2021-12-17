<template>
	<view id="containerId">
		<cu-custom bgColor="bg-white" :isBack="false" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>盒柜</text>
			</block>
		</cu-custom>
		<view class="flex-between ac cabinet-nav">
			<view class="order-nav" :class="queryObj.goodsItemSaleStatus == tab.goodsItemSaleStatus?'cur':''"
			 v-for="(tab,index) in orderTabs" :key="index" @click.stop="tabClick(tab.goodsItemSaleStatus)">
				{{tab.tabName}} 
				<view class="cur-icon"></view>
				<view class='cu-tag badge' v-if="tab.number > 0">{{tab.number > 99?'99+':tab.number}}</view>
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true"  :style="{height:'calc(100vh - 118rpx - ' + CustomBar +'px)'}" @scrolltolower="getOrderList">
				<view class="cabinet-list" v-for="(item,index) in orderList" :key='index'>
					<view class="flex-between ac mb34">
						<view class="fs-30 lh-30 fc-464">{{item.goodsItemOpenTime}}</view>
						<view class="fs-30 lh-30 fc-ffb">{{item.goodsItemSaleStatus===0?'已支付':item.goodsItemSaleStatusStr}}</view>
					</view>
					<view class="goods-info dflex ai-fs">
						<image :src="item.goodsImage" mode="" class="goods-image"></image>
						<view class="wp100">
							<view class="goods-name mt8 mb48">{{item.goodsTitle}}</view>
							<view class="flex-between ac mb20">
								<view class="fs-28 lh-28 fc-464">数量：</view>
								<view class="fs-28 lh-28 fc-464">x1</view>
							</view>
							<view class="flex-between ac mb20">
								<view class="fs-28 lh-28 fc-464">出处：</view>
								<view class="fs-28 lh-28 fc-464">{{item.gameBoxGoodsTitle}}</view>
							</view>
							<view class="flex-between ac mb20">
								<view class="fs-28 lh-28 fc-464">价格：</view>
								<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{item.goodsItemPrice}}</text>魔石</view>
							</view>
							<view class="flex-between ac" v-if="item.goodsItemSaleStatus===10">
								<view class="fs-28 lh-28 fc-464">回收：</view>
								<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{item.goodsItemRecyclePrice}}</text>魔石</view>
							</view>
						</view>
					</view>
					<view class="dflex jc-end ac btn-box">
						<view class="recovery-btn" v-if="item.goodsItemSaleStatus===0" @click="onRecycle(item)">7折回收<text class="fc-f ml10 mr10">{{item.goodsItemRecyclePrice}}</text>魔石</view>
						<view class="yellow-btn" v-if="item.goodsItemSaleStatus===0" @click="sendPackage(item.goodsItemId)">发货</view>
						
						<view class="yellow-btn" v-if="item.goodsItemSaleStatus>1 && item.goodsItemSaleStatus<3" @click="confirmPackage(item.goodsItemId)">确认收货</view>
						<view class="border-btn" v-if="item.goodsItemSaleStatus>1 && item.goodsItemSaleStatus<3" @click="seeExpress(item.goodsItemId)">查看物流</view>
					</view>
				</view>
				
				<listempty :list="orderList" :loading="orderListLoading"></listempty>
				<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
				<!-- tabbar 占位 -->
				<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
			</scroll-view>
		</view>
		<!-- <tabbar></tabbar> -->
		<chooseaddress v-if="showAddress" :goodsItemId="goodsItemId" @success="refreshPage"  @cancel="showAddress = false"></chooseaddress>
		<uni-popup ref="popup" type="bottom">
			<view class="popup">
				<view class="popup-content">
					<image class="close-image" @click="closePopup" src="../../static/img/icon/main-close.png" mode=""></image>
					<image :src="popupData.goodsImage" mode="" class="goods-image"></image>
					<view class="wp100">
						<view class="goods-name mt8 mb48">{{popupData.goodsTitle}}</view>
						<view class="flex-between ac mb20">
							<view class="fs-28 lh-28 fc-464">数量：</view>
							<view class="fs-28 lh-28 fc-464">x1</view>
						</view>
						<view class="flex-between ac mb20">
							<view class="fs-28 lh-28 fc-464">出处：</view>
							<view class="fs-28 lh-28 fc-464">{{popupData.gameBoxGoodsTitle}}</view>
						</view>
						<view class="flex-between ac mb20">
							<view class="fs-28 lh-28 fc-464">价格：</view>
							<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{popupData.goodsItemPrice}}</text>魔石</view>
						</view>
					</view>
				</view>
				<view class="dflex justify-between align-center">
					<view>回收抵用券</view>
					<view class="dflex align-center mb40" @click="handleCouponList">
						<text v-if="couponAmount!=0" class="fc-red">+{{couponAmount}}魔石</text>
						<text v-else-if="couponData.length>0" class="fc-red">可用{{couponData.length}}张</text>
						<text v-else>暂无可用</text>
						<image class="more-icon" src="../../static/img/icon/more-icon.png" mode=""></image>
					</view>
				</view>
				<view class="recovery-btn" @click="confirmRecycle">确定回收<text class="fc-f ml10 mr10">{{totalRecoveryPrice}}</text>魔石</view>
				<view class="coupon" v-show="isCouponShow">
					<view class="text-center fs-40 mb20">
						可使用抵用券
					</view>
					<image class="close-image" @click="isCouponShow=false" src="../../static/img/icon/main-close.png" mode=""></image>
					<scroll-view scroll-y="true" style="height: calc(100% - 154rpx);">
						<view class=" coupon-item " v-for="item in couponData" :key='item.voucherId' @click="radioChange(item)">
							<view class="dflex justify-between  align-center">
								<view>
									<view class="coupon-name fs-30">回收抵用券</view>
									<view class="fs-24">有效期至{{item.voucherExpireTime}}</view>
								</view>
								<view class="dflex align-center">
									<view class="fc-red ">
										<view class="fs-50 text-center">{{item.voucherValue}}</view>
										<view class="fs-24">最高抵用{{item.voucherValue}}魔石</view>
									</view>
									<view class="coupon-radio" :class="{'radio-active':item.checked}" ></view>
								</view>
							</view>
							<view class="fs-24" style="color: #8e8e8e;">注：每张抵用券仅限一个盒子使用</view>
						</view>
					</scroll-view>
					<view class="yellow-btn" style="margin: auto; width: 448rpx;" @click="isCouponShow=false">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tabbar from 'pages/component/tabbar.vue';
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';
	import chooseaddress from 'pages/component/chooseaddress.vue';
	
	export default {
		data() {
			return {
				orderTabs:[
					{
						goodsItemSaleStatus:"",
						tabName:"全部",
						number:0
					},
					{
						goodsItemSaleStatus:"0",
						tabName:"已支付",
						number:0
					},
					{
						goodsItemSaleStatus:"1",
						tabName:"待发货",
						number:0
					},
					{
						goodsItemSaleStatus:"2",
						tabName:"待收货",
						number:0
					},
					{
						goodsItemSaleStatus:"3",
						tabName:"已完成",
						number:0
					},
					{
						goodsItemSaleStatus:"10",
						tabName:"已回收",
						number:0
					},
				],
				queryObj:{
					pageNumber:0,
					pageCount:99,
					goodsItemSaleStatus:""
				},
				orderList:[
					
				],
				orderListLoading:false,
				showAddress: false,
				goodsItemId: '',
				popupData:{},
				isCouponShow: false,
				couponData:[],
				couponAmount:0,
				recycleing:false,
				voucherList:[],
			}
		},
		computed:{
			totalRecoveryPrice:function(){
				return (+this.couponAmount + this.popupData.goodsItemRecyclePrice).toFixed(2);
			}
		},
		mounted: function () {
			  uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/order/order')
		},
		// created() {
		// 	this.getOrderList()
		// },
		onShow() {
			if(uni.$auth.isLoginAndCheckPeopleStatus()) {
				this.refreshPage()
			}
			uni.$utils.setTabBarOrderNum();
			this.getVoucherByUser();
		},
		onPullDownRefresh() {
			this.refreshPage();
		},
		onReachBottom(e) {
			this.getOrderList()
		},
		methods: {
			// 显示抵用券列表
			handleCouponList(){
				if(this.couponData.length == 0) return
				this.isCouponShow = true;
			},
			// 获取抵用券
			getVoucherByUser(){
				uni.$api.getVoucherByUser({voucherState:2}).then(res =>{
					res.voucherList.forEach(item =>{
						item.checked = false;
						item.voucherTime = item.voucherTime.split(' ')[0];
					});
					this.voucherList = res.voucherList;
				})
			},
			goToPP(){
				// todo go to paipai
				uni.$toast.alert('您可以前往好货拍拍app进行转拍或者前往其他平台进行转卖')
			},
			tabClick (goodsItemSaleStatus) {
				this.queryObj.goodsItemSaleStatus = goodsItemSaleStatus
				this.refreshPage()
			},
			resetQuery () {
				this.queryObj.pageNumber = 0;
				this.queryObj.pageCount = 99;
				this.orderList = [];
			},
			depositAndSell (orderLotId) {
				if (!orderLotId) {
					uni.$toast.showError("非拍品订单无法寄存与转卖")
					return
				}
				uni.navigateTo({
					url:"/pages/order/addauction?lotId="+orderLotId
				})
			},
			sendPackage(goodsItemId){
				this.goodsItemId = goodsItemId
				this.showAddress = true
			},
			getOrderList () {
				if (this.orderListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.orderListLoading = true
				this.queryObj.pageNumber++
				uni.$api.getMhGoodsGameboxItemList(this.queryObj).then(res => {
					if (res.success) {
						var dataList = res.rows || []
						this.orderList = this.orderList.concat(dataList)
						this.orderListLoading = false
						this.queryObj.pageCount = res.pageCount || 99
						this.queryObj.pageSize = res.pageSize || 100
						this.orderTabs.forEach(e=>{
							if(e.goodsItemSaleStatus && (e.goodsItemSaleStatus=='1' || e.goodsItemSaleStatus=='2')){
								let obj = res.countObj.find(b=>b.goodsItemSaleStatus==e.goodsItemSaleStatus)||{}
								e.number = obj.counts ||'0'
							}
						
						})
					}
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.orderListLoading = false
				})
			},
			
			refreshPage () {
				console.log('refreshPage'
				)
				this.resetQuery()
				this.getOrderList()
				
			},
			/**
			 * 取消订单
			 * @param {Object} orderId
			 */
			cancelOrder (orderId) {
				var self = this
				uni.showModal({
					title:"温馨提示",
					content:"您是否要取消该笔订单吗?",
					cancelText:"否",
					confirmText:"是",
					success(res) {
						if (res.confirm) {
						    uni.$api.cancelOrder({
								orderId:orderId
							}).then(res => {
								if (res.success) {
									uni.$toast.showToast("取消成功")
									self.refreshPage()
								}
							})
						}
					}
				})
			},
			/**
			 * 立即付款
			 * @param {Object} orderId
			 */
			orderPay (orderId,orderType) {
				if (orderType == 0) {
					uni.navigateTo({
						url:"/pages/order/pay?orderId="+orderId
					})
				}
				if (orderType == 11) {
					uni.navigateTo({
						url:"/pages/order/auctionpay?orderId="+orderId
					})
				}
				if (orderType == 29) {
					this.orderScorePay(orderId)
					
				}
				
			},
			orderScorePay(orderId=''){
				uni.$api.orderScorePay({orderId}).then(res=>{
					uni.$toast.alert("支付成功")
					this.refreshPage()
				})
			},
			closePopup(){
				this.$refs.popup.close();
			},
			radioChange(e){
				this.couponData.forEach(item =>{
					if(e.voucherId == item.voucherId) {
						item.checked = !item.checked
						if(item.checked){
							let voucherValue = this.popupData.goodsItemRecyclePrice + item.voucherValue;
							if(voucherValue > this.popupData.goodsItemPrice){
								this.couponAmount = (this.popupData.goodsItemPrice - this.popupData.goodsItemRecyclePrice ).toFixed(2);
							}else{
								this.couponAmount = item.voucherValue.toFixed(2)
							}
						}else{
							this.couponAmount = 0
						}
					}
					else if(item.checked) {
						item.checked = false
					}
				})
			},
			//确认回收
			confirmRecycle(){
				if(this.recycleing) return
				this.recycleing = true
				let voucherId = 0;
				this.couponData.forEach(item =>{
					if(item.checked){
						voucherId = item.voucherId;
					}
				})
				uni.$api.recycleMhGoodsGamebox({
					orderId: this.popupData.goodsItemOrderId,
					goodsItemIds: this.popupData.goodsItemId,
					voucherId
				}).then(res =>{
					this.recycleing = false
					uni.$toast.showToast('成功回收')
					this.refreshPage()
					if(voucherId){
						this.getVoucherByUser();
					}
					this.$refs.popup.close();
				}).catch(err => {
					this.recycleing = false
				});
			},
			// 打开回收popup
			onRecycle(item){
				console.log(item);
				this.isCouponShow = false;
				if(item.gameBoxGoodsPrice > item.goodsItemRecyclePrice){
					this.couponData = this.voucherList;
				}else{
					this.couponData = [];
				}
				this.popupData = item;
				this.couponAmount = 0;
				this.$refs.popup.open();
			},
			/**
			 * 查看物流
			 * @param {Object} goodsItemId
			 */
			seeExpress (goodsItemId) {
				uni.navigateTo({
					url:"/pages/order/logistics?goodsItemId="+goodsItemId
				})
			},
			/**
			 * 确认收货
			 * @param {Object} goodsItemId
			 */
			confirmPackage (goodsItemId) {
				var self = this
				uni.showModal({
					title:"温馨提示",
					content:"确认收货吗",
					success(res) {
						if (res.confirm) {
						    uni.$api.mhGoodsGameboxItemConfirmPackage({
								goodsItemId:goodsItemId
							}).then(res => {
								if (res.success) {
									uni.$toast.showToast("收货成功")
									self.refreshPage()
								}
							})
						}
					}
				})
			},
			/**
			 * 前往订单详情
			 * @param {Object} orderId
			 */
			toOrderDetail (order) {
				var orderType = order.orderType
				if(orderType===31){
					uni.navigateTo({
						url:"/pages/order/blindboxorder/detail?orderId="+order.orderId
					})
					return
				}	if(orderType===29){
					uni.navigateTo({
						url:"/pages/order/score/detail?orderId="+order.orderId
					})
					return
				}
				// if(orderType === 11) {
				// 	uni.navigateTo({
				// 		url:"/pages/user/auctiongoods/detail?lotId="+order.orderLotId
				// 	})
				// 	return
				// }
				uni.navigateTo({
					url:"/pages/order/detail?orderId="+order.orderId
				})
			},
		},
		watch: {
			orderListLoading(value) {
				if (!value) {
					uni.stopPullDownRefresh()
				}
			}
		},
		components: {
			tabbar,
			listempty,
			nomore,
			chooseaddress
		}
	}
</script>

<style lang="scss" scoped>
.coupon{
	padding: 20rpx 30rpx 0 30rpx;
	border-radius: 30rpx 30rpx 0px 0px;
	position: absolute;
	width: 750rpx;
	background-color: #f2f2f2;
	left: 0;
	top: 0;
	height: 100%;
	.coupon-item{
		padding: 26rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.coupon-name{
			font-weight: bold;
			padding-bottom: 10rpx;
		}
		.coupon-radio{
			height: 36rpx;
			width: 36rpx;
			margin-left: 20rpx;
			border-radius: 50%;
			position: relative;
			border: 1px solid #d1d1d1;
			display: flex;
			justify-content: center;
			align-items: center;
			&.radio-active{
				border: none;
				background: url(../../static/img/icon/goods-radio@2x.png);
				background-size: 36rpx ;
				// &::before{
				// 	font: normal normal normal 14px/1 uni;
				// 	content: "\EA08";
				// 	color: #333;
				// 	font-size: 22rpx;
				// 	font-weight: bold;
				// }
			}
			
		}
	}
}
/* #ifdef H5 */
	.popup{
		bottom: 60px;
	}
	/* #endif */
.popup{
	padding: 34rpx 40rpx 34rpx 56rpx;
	position: relative;
	background-color: #ffffff;
	border-radius: 30rpx 30rpx 0px 0px;
	
	.popup-content{
		display: flex;
		justify-content: space-between;
	}
	.close-image{
		position: absolute;
		right:20px;
		top: 15px;
		height: 40rpx;
		width: 40rpx;
	}
	.recovery-btn{
		margin: auto;
	}
	.more-icon{
		height: 30px;
		width: 30px;
	}
}
.cu-bar .action:first-child {
	margin-left: 32rpx;
	font-size: 36rpx;
}
.cabinet-nav {
	height: 98rpx;
	background-color: #fff;
}
.order-nav {
	font-size: 28rpx;
	line-height: 40rpx;
	color: #B4B4B4;
	padding: 12rpx 20rpx;
	position: relative;
}
.order-nav.cur {
	color: #46464B;
	font-weight: bold;
}
.order-nav .cu-tag.badge{
	top: 0;
	right: 4px;
}
.cur-icon {
	display: none;
	width: 94rpx;
	height: 4rpx;
	background-color: #FFB900;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.order-nav.cur .cur-icon {
	display: block;
}
.container {
	padding: 20rpx 20rpx 0; 
}
.cabinet-list {
	padding: 36rpx 20rpx 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
}
.cabinet-list + .cabinet-list {
	margin-top: 20rpx;
}
.order-list {
	padding: 16rpx 24rpx;
	border-radius: 20rpx;
	background-color: #fff;
}
.order-list+.order-list {
	margin-top: 24rpx;	
}
.goods-info+.goods-info {
	margin-top: 24rpx;
}
.goods-image {
	width: 256rpx;
	height: 256rpx;
	margin-right: 36rpx;
	flex-shrink: 0;
}
.goods-name {
	width: 324rpx;
	font-size: 30rpx;
	color: #46464B;
	line-height: 36rpx;
	font-weight: bold;
	display: -webkit-box;    
	-webkit-box-orient: vertical;    
	-webkit-line-clamp: 2;    
	overflow: hidden;
}
.goods-label {
	font-size: 20rpx;
	line-height: 20rpx;
	padding: 4rpx 10rpx;
	color: #fff;
	background: #FF411C;
	border-radius: 8rpx;
	display: inline-block;
}
.btn-box {
	margin-top: 26rpx;
}
.btn-box > view+view {
	margin-left: 16rpx;
}
.recovery-btn {
	width: 410rpx;
	height: 70rpx;
	border-radius: 35rpx;
	background-color: #46464B;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #ffb900;
	display: flex;
	justify-content: center;
	align-items: center;
}
.yellow-btn {
	width: 246rpx;
	height: 70rpx;
	border-radius: 35rpx;
	background-color: #ffb900;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #46464B;
	display: flex;
	justify-content: center;
	align-items: center;
}

.border-btn {
	width: 246rpx;
	height: 70rpx;
	border-radius: 35rpx;
	border: 1rpx solid #46464B;
	box-sizing: border-box;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #46464B;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
