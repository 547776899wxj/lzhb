<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">支付订单</block>
		</cu-custom>
		<view class="container">
			<view class="pay-time flex-center">
				<view class="fs-26 fc-939 mr8">支付剩余时间</view>
				<view class="fs-40 fc-303 fw-b">{{hours > 0?hours+":":hours}}{{minute > 0?minute+":":minute}}{{second}}</view>
			</view>
			<view class="goods-info mb20" v-for="(item,index) in detailList" :key="index" v-if="detailList.length > 0">
				<image :src="item.orderGoodsImage" mode="" class="goods-image"></image>
				<view class="wp100 goods-msg flex-between fdc">
					<view class="dflex fdc jc-fs">
						<view class="goods-name mb12">{{item.orderGoodsTitle}}</view>
						<view class="fs-20 lh-28 fc-939">共{{item.orderDetailNumber}}件商品</view>
					</view>
					<view class="flex-between ai-fe">
						<view><text class="fs-24 fc-303">￥</text><text class="fs-28 fc-303">{{getMoneyForYuan(order.orderPayMoney)}}</text><text
								class="fs-20 fc-303">{{getMoneyForFen(order.orderPayMoney)}}</text></view>
					</view>
				</view>
			</view>
			<view class="pay-way">
				<view class="flex-between ac">
					<view class="dflex ac">
						<image src="../../static/img/icon/pay-bag@2x.png" mode="" class="m-icon mr32"></image>
						<view class="fs-28 fc-303 dflex">{{scoreName}} (<view class="dflex ai-fe">
								<view class="fs-24 fc-303">￥</view>
								<view class="fs-28 lh-28 fc-303 mb2">{{score.money}}</view>
							</view>)</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar dflex fdc bg-white tabbar border submit-box">
		<!-- 	<view class="wp100 pt12 pb12">
				<label class="dflex jc-fs ac wp100" @click.stop="checkClick">
					<checkbox class="hh-radio fs-0 mr16 round"  :checked="form.payCheck"  @click.stop="form.payCheck = !form.payCheck"></checkbox>
					<view class="fs-22 lh-32 fc-939">我已阅读并同意 <text @click.stop="toAgreement" class="fc-2e8">《支付协议》</text>
                </view>
				</label>
			</view> -->
			<view class="wp100 flex-between ac pt12 pb12">
				<view class="action">
					<view class="dflex ai-fe">
						<view class="fs-20 lh-28 fc-303">合计：</view>
						<view class="dflex ai-fe fw-b">
							<view class="fs-24 fc-e31 mb2">￥</view>
							<view class="fs-32 lh-32 fc-e31">{{getMoneyForYuan(order.orderPayMoney)}}</view>
							<view class="fs-20 fc-e31 mb2">{{getMoneyForFen(order.orderPayMoney)}}</view>
						</view>
						<view class="fs-20 lh-28 fc-e31 mt8 ml8">魔石</view>
					</view>
				</view>
				<button class="cu-btn bg-pp fc-f round" @click="orderPay">确认支付</button>
			</view>
		</view>
		<view class="cu-modal show" v-show="showConfirm">
			<view class="cu-dialog wait-pay-box bc-f">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">温馨提示</view>

				</view>
				<view class="wait-pay lh-48 fs-28 fc-303 mb80">
					<image src="../../static/img/images/waitpay@2x.png" mode="widthFix" class="mb28"></image>
					<view class="fs-30 lh-30 fc-9">正在支付中……</view>
				</view>
				<view class="padding-lg pt0 cu-bar bg-white dflex jc-c">
					<button class="cu-btn border-btn pp-line-btn mr40" @tap="showConfirm=false">已取消支付</button>
					<button class="cu-btn border-btn bg-pp fc-f" @tap="showConfirm=false">已完成支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkPayRule: false,
				showConfirm: false,
				orderId:"",
				detailList:[],
				score:{},
				order:{},
				orderMoneyType:2,
				channelData:[],
				outPayTime:0,
				payTimeId:"",
				scoreName:"",
				hours:0,
				minute:0,
				second:0,
				form:{
					payCheck:false,
					orderId:'',
					payId:'',
					channelType:'',
					mode :1
				}
			}
		},
		onLoad(e) {
			this.orderId = e.orderId||'821090735274001';
			this.form.orderId = this.orderId;
			this.initPayChannel();
			this.initPageData()
		},
		watch:{
			outPayTime (value) {
				if (value > 0) {
					let h = parseInt(value/60/60)
					let last = value%3600
					let m = parseInt(last/60)
					let s = last % 60 + ""
					this.hours = h > 0?h:""
					this.minute = m > 0?m:""
					this.second = s.length > 1?s:"0"+s
				} else {
					this.hours = 0
					this.minute = 0
					this.second = 0
					clearInterval(this.payTimeId)
				}
			},
		},
		beforeDestroy() {
			if(this.timers){
				clearInterval(this.timers)
				this.timers = ''
			}
		},
		methods: {
			myBack () {
				uni.switchTab({
					url:"/pages/index/main"
				})
			},
			checkClick () {
				this.form.payCheck = !this.form.payCheck
			},
			toAgreement () {
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=3"
				})
			},
			initPayChannel(){
				var self = this;
				uni.$api.getPayChannel({}).then(res =>{
					self.channelData = res.data;
				});
			},
			onChannelSelect:function(item){
				this.channelData.map(e => {
					if (e.payId == item.payId){
						e.channelCheck = e.channelCheck==1?0:1
					}
					else {
						e.channelCheck=0
					}
					return e
				})
			},
			initPageData () {
				if (this.orderId)
				var params = {
					orderId:this.orderId
				}
				uni.$api.getOrderPayPageInfo(params).then(res => {
					if (res.success) {
							let {detailList,score,order,scoreName,outPayTime} = res
							this.detailList = detailList
							this.score = score
							this.scoreName = scoreName
							this.order = order
							this.outPayTime = outPayTime
							var self = this
							if (outPayTime > 0) {
								self.payTimeId = setInterval(function () {
									self.outPayTime -= 1
								},1000)
							}
					} else {
						uni.$toast.showError(res.message)
					}

				})
			},
			getMoneyForYuan(money) {
				if (!money) {
					return "0."
				}
				var m1 = money+""
				if (m1.indexOf(".")>=0) {
					return m1.substring(0,m1.lastIndexOf(".")+1)
				}
				return m1+"."
			},
			getMoneyForFen(money) {
				if (!money) {
					return "00"
				}
				var m1 = money+""
				if (m1.indexOf(".")>=0) {
					return m1.substring(m1.lastIndexOf(".")+1,m1.length)
				}
				return "00"
			},
			checkOrderStatus(){
			var self = this
				uni.$api.getOrderPayStatus({orderId:this.orderId}).then(res =>{
					if(res.orderPayStatus===1){
						if(this.timers){
							clearInterval(this.timers)
							this.timers = ''
						}
					uni.$toast.showToast('支付成功');
					setTimeout(function(){
									uni.navigateTo({
										url:"/pages/order/paysuccess?orderId="+self.orderId
									})
					},400)
					}
				})
			},
			/** 确认支付 **/
			orderPay () {
				if(this.form.orderId == ''){
					uni.$toast.showError('订单编号不能为空！');
					return;
				}
				if(!this.form.payCheck){
					uni.$toast.showError('请勾选同意支付协议！');
					return;
				}
				this.orderScorePay(this.form.orderId)
			},
			orderScorePay(orderId=''){
				uni.$api.orderScorePay({orderId}).then(res=>{
					setTimeout(() => {
						uni.navigateTo({
							url:"/pages/order/welfarepaysuccess?orderId="+orderId
						})
					},1000)
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f6f6f6;
	}

	.container {
		padding: 8rpx 20rpx;
	}

	.pay-time {
		width: 100%;
		height: 96rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.goods-info {
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.goods-image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}

	.goods-msg {
		height: 180rpx;
	}

	.goods-name {
		font-size: 26rpx;
		color: #303133;
		text-align: left;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.pay-way {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 24rpx 0 20rpx;
	}

	.pay-way>view {
		height: 108rpx;
	}

	.cu-bar.tabbar.submit-box {
		padding: 0 32rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: auto;
		min-height: 100rpx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 支付弹窗 */
	.submit-box .cu-btn {
		width: 240rpx;
		height: 76rpx;
		margin: 0;
	}

	.cu-modal .cu-dialog {
		width: 600rpx;
	}
	.wait-pay {
		width: 414rpx;
		margin: 0 auto;
	}
	.wait-pay-box .cu-btn {
		width: 240rpx;
		height: 80rpx;
		margin: 0;
		border-radius: 40rpx;
	}
	.wait-pay-box .cu-btn[class*="line"]::after {
		display: none;
		border: 0;
	}
</style>
