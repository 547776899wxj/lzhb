<template>
	<view id="containerId">
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<view class="flex-between ac">
			<view class="order-nav" :class="queryObj.orderStatus == tab.orderStatus?'cur':''"
			 v-for="(tab,index) in orderTabs" :key="index" @click.stop="tabClick(tab.orderStatus)">
				{{tab.tabName}} 
				<view class="cur-icon"></view>
				<view class='cu-tag badge' v-if="tab.number > 0">{{tab.number > 99?'99+':tab.number}}</view>
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true" style="height: calc(100vh - 240rpx - env(safe-area-inset-bottom));" @scrolltolower="getOrderList">
				<view class="order-list" @click.stop="toOrderDetail(order)" v-if="orderList.length > 0" v-for="(order,index) in orderList" :key="index" >
					<view class="flex-between ac mb32">
						<view class="fs-24 lh-34 fc-303">{{order.orderCreateTime}}</view>
						<view class="fs-24 lh-34 fc-ff4">{{order.orderStatusName}}</view>
					</view>
					<view class="goods-info dflex ai-fs mb16" v-for="(goods,index) in order.details" v-if="order.details && order.details.length > 0">
						<image v-if="order.orderType == 41" :src="domainStatic+'/img/images/blindbox.png'" class="goods-image mr16" mode=""></image>
						<image v-else :src="goods.orderGoodsImage" class="goods-image mr16" mode=""></image>
						<view class="flex-1">
							<view class="flex-between ai-fs mb16">
								<view class="goods-name">{{goods.orderGoodsTitle}}</view>
								<view class="dflex ai-fe fdc">
									<view class="fs-28 fc-303 lh-34 mb4"><text class="fs-24">￥</text>{{goods.orderDetailPrice}}</view>
									<view class="fs-24 lh-34 tr fc-939">X{{goods.orderDetailNumber}}</view>
								</view>
							</view>
							<view class="fs-24 lh-34 fc-939">{{goods.orderGoodsSubTitle}}</view>
							<view class="goods-label">{{order.orderType===29?'托收':'盲盒'}}</view>
						</view>
					</view>
					<view class="dflex ac jc-end tr">
						<view class="fs-24 lh-34 fc-303">实付款</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{order.orderPayMoney}}</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="order.orderStatus == 0">
						<view class="small-radio-btn line-btn flex-center" @click.stop="cancelOrder(order.orderId)">取消订单</view>
						<view class="small-radio-btn pp-line-btn flex-center" @click.stop="orderPay(order.orderId,order.orderType)">立即付款</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="order.orderStatus == 100 && order.orderType == 11 && order.lotStatus == 1" >
						<view class="small-radio-btn line-btn flex-center"  @click.stop="depositAndSell(order.orderLotId)">寄存并转卖</view>
						<view class="small-radio-btn line-btn flex-center"  @click.stop="sendPackage(order.orderId)">发货</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="order.orderStatus == 100 && order.orderType == 21">
						<view class="small-radio-btn line-btn flex-center"  @click.stop="onRecycle(order.orderId)">{{order.orderRecycleMoney}}魔石回收</view>
						<view class="small-radio-btn line-btn flex-center"  @click.stop="sendPackage(order.orderId)">发货</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="order.orderStatus == 100 && order.orderType == 29">
						<view class="small-radio-btn line-btn flex-center"  @click.stop="goToPP">转卖</view>
						<view class="small-radio-btn line-btn flex-center"  @click.stop="sendPackage(order.orderId)">发货</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="order.orderStatus == 120" >
						<view class="small-radio-btn line-btn flex-center"  @click.stop="seeExpress(order.orderId)">查看物流</view>
						<view class="small-radio-btn line-btn flex-center"  @click.stop="confirmPackage(order.orderId)">确认收货</view>
					</view>
				</view>
				<listempty :list="orderList" :loading="orderListLoading"></listempty>
				<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
				<!-- tabbar 占位 -->
				<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
			</scroll-view>
		</view>
		<!-- <tabbar></tabbar> -->
		<chooseaddress v-if="showAddress" :orderId="sendAddresssOrderId" @success="refreshPage"  @cancel="showAddress = false"></chooseaddress>
		
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
						orderStatus:"",
						tabName:"全部",
						number:0
					},
					{  	orderStatus:"0",
						tabName:"待付款",
						number:0
					},
					{
						orderStatus:"110",
						tabName:"待发货",
						number:0
					},
					{
						orderStatus:"120",
						tabName:"待收货",
						number:0
					},
					{
						orderStatus:"300",
						tabName:"已完成",
						number:0
					},
				],
				queryObj:{
					pageNumber:0,
					pageCount:99,
					orderStatus:"",
					offset:0,
					limit:15,
				},
				orderList:[
					
				],
				orderListLoading:false,
				showAddress: false,
				sendAddresssOrderId: '',
				
				isReachBottom:true,
				domainStatic:this.domainStatic,
			}
		},
		mounted: function () {
			  uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/order/order')
		},
		// created() {
		// 	this.getOrderList()
		// },
		onLoad({orderStatus=''}) {
			this.queryObj.orderStatus = orderStatus;
		},
		onShow() {
			if(uni.$auth.isLoginAndCheckPeopleStatus()) {
				this.refreshPage()
			}
			uni.$utils.setTabBarOrderNum()
		},
		onPullDownRefresh() {
			this.refreshPage()
		},
		methods: {
			goToPP(){
				// todo go to paipai
				uni.$toast.alert('您可以前往好货拍拍app进行转拍或者前往其他平台进行转卖')
			},
			tabClick (orderStatus) {
				this.queryObj.orderStatus = orderStatus
				this.refreshPage()
			},
			resetQuery () {
				this.queryObj.pageNumber = 0;
				this.queryObj.pageCount = 99;
				this.queryObj.offset = 0;
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
			sendPackage(orderId){
				// uni.navigateTo({
				// 	url:"/pages/order/logisticspay?orderId="+orderId
				// })
				this.sendAddresssOrderId = orderId
				this.showAddress = true
			},
			getOrderList () {
				if (this.orderListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.orderListLoading = true
				this.queryObj.pageNumber++
				this.queryObj.offset ++;
				console.log(this.queryObj)
				uni.$api.getOrderList(this.queryObj).then(res => {
					;
					if (res.success) {
						var dataList = res.rows || []
						this.orderList = this.orderList.concat(dataList)
						this.orderListLoading = false
						this.queryObj.pageCount = res.pageCount || 99
						this.queryObj.pageSize = res.pageSize || 100
						this.builderTabs(res.waitOrderNum,res.payOrderNum,res.waitRecOrderNum,res.waitSendOrderNum);
					}
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.orderListLoading = false
				})
			},
			builderTabs (waitOrderNum,payOrderNum,waitRecOrderNum,waitSendOrderNum) {
				var orderTabs = [
					{
						orderStatus:"",
						tabName:"全部",
						number:0
					},
					{  	orderStatus:"0",
						tabName:"待付款",
						number:waitOrderNum || 0
					},
					{
						orderStatus:"110",
						tabName:"待发货",
						number:waitSendOrderNum || 0
					},
					{
						orderStatus:"120",
						tabName:"待收货",
						number:waitRecOrderNum || 0
					},
					{
						orderStatus:"300",
						tabName:"已完成",
						number:0
					},
				]
				this.orderTabs = orderTabs
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
			onRecycle(orderId){
				if (this.recycleing) return
				this.recycleing = true
				uni.$toast.confirm('您确定不要盒子里的商品了并且让平台直接回收吗？').then(() =>{
					return uni.$api.recycleMhGoodsGamebox({
						orderId: orderId
					}).then(res =>{
						this.recycleing = false
						uni.$toast.showToast('成功回收')
						this.refreshPage()
						
					})
				}).catch(()=>{
					this.recycleing = false
				})
				
			},
			/**
			 * 查看物流
			 * @param {Object} orderId
			 */
			seeExpress (orderId) {
				uni.navigateTo({
					url:"/pages/order/logistics?orderId="+orderId
				})
			},
			/**
			 * 确认收货
			 * @param {Object} orderId
			 */
			confirmPackage (orderId) {
				var self = this
				uni.showModal({
					title:"温馨提示",
					content:"确认收货吗",
					success(res) {
						if (res.confirm) {
						    uni.$api.confirmPackage({
								orderId:orderId
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

<style>
.cu-bar .action:first-child {
	margin-left: 32rpx;
	font-size: 36rpx;
}
.order-nav {
	font-size: 28rpx;
	line-height: 40rpx;
	color: #606266;
	padding: 12rpx 20rpx;
	position: relative;
}
.order-nav.cur {
	color: #FF411C;
	font-weight: bold;
}
.order-nav .cu-tag.badge{
	top: 0;
	right: 4px;
}
.cur-icon {
	display: none;
	width: 48rpx;
	height: 4rpx;
	background-color: #FF411C;
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
	padding: 16rpx 20rpx 0; 
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
	width: 160rpx;
	height: 160rpx;
}
.goods-name {
	width: 342rpx;
	font-size: 28rpx;
	color: #303133;
	line-height: 40rpx;
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
.small-radio-btn {
	width: auto;
	min-width: 160rpx;
	padding: 0 24rpx;
	box-sizing: border-box;
}
</style>
