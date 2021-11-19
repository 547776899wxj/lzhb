<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="toMyOrder">
			<block slot="backText"></block>
			<block slot="content">支付成功</block>
		</cu-custom>
		<view class="container">
			<view class="flex-center fdc mb120">
				<image src="../../static/img/images/pay-success.png" mode="widthFix" class="pay-success mb50"></image>
				<view class="fs-64 lh-64 fc-3 fw-b dflex ai-fe">
					<view class="fs-50 lh-50 mb4">￥</view>{{ order.orderPayMoney| intFormat}}{{ order.orderPayMoney| decimalFormat}}
				</view>
			</view>
			<!-- <view class="dflex ai-fs jc-c mb70">
				<image src="../../static/img/icon/warning.png" mode="widthFix" class="warning fs-0 mr6 mt10"></image>
				<view class="fs-30 lh-50 fc-d52 tl wm540">您购买的盲盒（01101224）将在2021-08-10 16:00:00拆开，拆盒后您可以选择转卖或者立即发货，如在7日内未选择进行选择，系统将黙认为您选择了发货</view>
			</view> -->
			<!-- <view class="flex-center">
				<view class="detail-btn flex-center" @click="toOrderDetail">查看订单详情</view>
			</view> -->
			<view class="flex-center">
				<view class="detail-btn flex-center">好获拍拍转拍</view>
				<view class="detail-btn flex-center">立即发货</view>
				<view class="detail-btn flex-center">其他平台转卖成功改寄件人</view>
			</view>
			<view class="seeorder" @click.stop="toOrderDetail()">查看订单</view>
			<view class="blind-box mt116" v-if="onSaleGameBoxCount > 0">
				<image class="wp100" src="../../static/img/images/blind-banner.png" mode="widthFix" @click="gotoGameBoxDetail"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onSaleGameBoxCount:0,
				orderId:'',
				days:'',
				order:{}
			}
		},
		onShow() {
			
			uni.$api.getOnSaleGameBoxCount().then(res =>{
				this.onSaleGameBoxCount = res.count || 0
			})
		},
		onLoad(e) {
			var orderId = e.orderId
			this.orderId = orderId
			this.initPage()
			this.getAutoStayLotConfig()
			uni.$once('toMyOrder',this.toMyOrder)
		},
		methods: {
			toMyOrder(){
				uni.navigateBack({
					delta:2
				})
			},
			getAutoStayLotConfig(){
				uni.$api.getAutoStayLotConfig().then(res => this.days = res.data)
			},
			initPage () {
				var params = {
					orderId:this.orderId
				}
				uni.$api.getOrderDetail(params).then(res => {
					var {discounts,order,orderMessage,orderAddress,outPayTime,userBalanceLock} = res.data
					this.order = order
				})
			},
			goToAuctionGoods(){
				uni.navigateTo({
					url:'/pages/user/auctiongoods?from=paysuccess'
				})
			},
			toOrderDetail() {
				uni.navigateTo({
					url:"/pages/order/detail?orderId="+this.orderId
				})
			},
			gotoGameBoxDetail(){
				uni.navigateTo({
					url:'/pages/user/blindbox'
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding-top: 123rpx;
}
.pay-success {
	width: 200rpx;
}
.fs-50 {
	font-size: 50rpx;
}
.mt116 {
	margin-top: 116rpx;
}
.warning {
	width: 30rpx;
	height: 30rpx;
}
.wm540 {
	max-width: 540rpx;
}
.mb70 {
	margin-bottom: 70rpx;
}
.detail-btn {
	width: 200rpx;
	height: 70rpx;
	border: 2rpx solid #999;
	border-radius: 12rpx;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #333;
	margin: 0 14rpx;
	padding: 0 12rpx;
}
.blind-box {
	padding: 32rpx 30rpx;
}
.seeorder {
	position: fixed;
	bottom: 10vh;
	left: 0;
	right: 0;
	width: 200rpx;
	margin: 0 auto;
	text-align: center;
	font-size: 28rpx;
	padding: 6rpx 0;
	color: #0081FF;
}
</style>
