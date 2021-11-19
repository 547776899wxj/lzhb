<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="toMyOrder2">
			<block slot="backText"></block>
			<block slot="content">支付成功</block>
		</cu-custom>
		<view class="container">
			<view class="flex-center fdc mb170">
				<image src="../../static/img/images/pay-success.png" mode="widthFix" class="pay-success mb50"></image>
				<view class="fs-64 lh-64 fc-3 fw-b dflex ai-fe">
					<view class="fs-50 lh-50 mb4">￥</view>{{ order.orderPayMoney| intFormat}}{{ order.orderPayMoney| decimalFormat}}
				</view>
			</view>
			<view class="flex-center mb70">
				<view class="detail-btn flex-center" @click="goToPP">好获拍拍转拍</view>
				<view class="detail-btn flex-center" @click="goToLogistic">立即发货</view>
				<view class="detail-btn flex-center" @click="goToLogistic">其他平台转卖成功改寄件人</view>
			</view>
			<view class="seeorder" @click="goToOrderDetail()">查看订单</view>
			<!-- <view class="flex-center">
			<view class="detail-btn flex-center" @click="goToOrderDetail">查看订单</view>
			</view> -->
				<chooseaddress v-if="showAddress" :orderId="orderId"   @cancel="showAddress = false"></chooseaddress>
		</view>
	</view>
</template>

<script>
		import chooseaddress from 'pages/component/chooseaddress.vue';
export default {
		data() {
			return {
				orderId:'',
				showAddress:false,
				order:{}
			}
		},
		components:{
			chooseaddress
		},
		onLoad(e) {
			var orderId = e.orderId  || '821090153221001'
			this.orderId = orderId
			this.initPage()
			uni.$once('toMyOrder2',this.toMyOrder)
		},
		methods: {
			toMyOrder(){
				uni.navigateBack({
					delta:3
				})
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
			goToOrderDetail(){
				uni.navigateTo({
					url:'/pages/order/score/detail?orderId='+this.orderId
				})
			},
			goToPP(){
				// todo go to paipai
				uni.$toast.alert('您可以前往好货拍拍app进行转拍或者前往其他平台进行转卖')
			},
			goToLogistic(){
			this.showAddress=true
			},
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
.mb170 {
	margin-bottom: 170rpx;
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
	border: 2rpx solid #666;
	border-radius: 35rpx;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #333;
	margin: 0 auto;
    padding: 0 6px;
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
