<template>
	<!-- 购买弹窗 -->
	<view>
		<view class="cu-modal bottom-modal buy-modal" :class="show?'show':''" @catchtouchmove="moveHandle">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="content fw-b">确认订单</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm" style="height: calc(100% - 100rpx);">
					<view class="operation-order">
						<view class="order-tab" @click="tabIndex=0" :class="{cur:tabIndex ===0}" >委托平台拍卖</view>
						<view class="order-tab" @click="tabIndex=1" :class="{cur:tabIndex ===1}" >立即发货</view>
					</view>
					<view class="fs-28 lh-36 fc-ff0 wt-info bc-f tl" v-show="tabIndex===0">
						委托成功后，平台将当前商品通过拍拍平台或闲鱼等二手交易平台进行销售，所得收益将归用户所有。<br/>
						<view class="dflex ac">拍拍下载地址：<view class="link" @click="onCopyToClipboard('http://dl.citytp.com/j4gd')">http://dl.citytp.com/j4gd</view></view>
						<view class="dflex ac">闲鱼下载地址：<view class="link" @click="onCopyToClipboard('https://2.taobao.com')">https://2.taobao.com</view></view>
					</view>
					<view class="address-box" @click="showAddressList()" v-show="tabIndex===1">
						<view class="flex-between ai-fs mb12">
							<view class="address">{{orderAddress.addressAllName ||'请选择收货地址'}}</view>
							<image src="../../static/img/icon/black-gd.png" class="more-icon mt10"></image>
						</view>
						<view class="dflex ac">
							<view class="fs-28 lh-28 fc-464">{{orderAddress.addressContacts}} {{orderAddress.addressMobile}}</view>
						</view>
					</view>
					<view class="cabinet-list mb20">
						<view class="goods-info dflex ai-fs">
							<image :src="buyGoods.goodsImage" mode="" class="goods-image"></image>
							<view class="wp100 flex-between fdc" style="height: 256rpx;">
								<view class="goods-name mt8">价{{buyGoods.goodsTitle}}</view>
								<view>
									<view class="flex-between ac mb20">
										<view class="fs-28 lh-28 fc-464">数量：</view>
										<view class="fs-28 lh-28 fc-464">x1</view>
									</view>
									<view class="flex-between ac mb20">
										<view class="fs-28 lh-28 fc-464">价格：</view>
										<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{buyGoods.goodsPrice}}</text>魔石</view>
									</view>
								</view>
							</view>
						</view>
					</view>
		
					<view class="remark-list flex-between ac" @click="showOrderRemark=true">
						<view class="fs-26 lh-26 fc-464">备注</view>
						<view class="flex justify-end">
							<view>{{userMessage}}</view>
							<image src="/static/img/icon/black-gd.png" mode="" class="more-icon"></image>
						</view>
					</view>
					<view class="operation-btnbox mt20">
						<view class="agreement-box flex-center mb20" v-show="tabIndex===0">
							<view class="agreenment-btn" :class="{cur:checkAgreement}" @click="checkAgreement=!checkAgreement"></view>
							<view class="fs-26 lh-26 fc-464">我已阅读并同意<text class="fc-ffb" @click="toCollection">《托收协议》</text><text class="fc-ffb" @click="toAgreement">《支付协议》</text></view>
						</view>
						<view class="agreement-box flex-center mb20" v-show="tabIndex===1">
							<view class="agreenment-btn" :class="{cur:checkAgreement}" @click="checkAgreement=!checkAgreement"></view>
							<view class="fs-26 lh-26 fc-464">我已阅读并同意<text class="fc-ffb" @click="toAgreement">《支付协议》</text></view>
						</view>
						<view class="blindbox-info flex-between ac mb20">
							<view class="fs-30 lh-30 fc-464">总计：</view>
							<view class="fs-30 lh-30 fc-464"><text class="fs-36 lh-36 fc-ff0 fw-b mr14">{{buyGoods.goodsPrice}}</text> 魔石</view>
						</view>
						<view class="now-btn" @click="checkAndBuy">确认支付</view>
					</view>
				</view>
			</view>
		</view>
		<remarkComponents :show="showOrderRemark" :remark="userMessage" @confirm="getRemark" @cancel="remarkCancel"></remarkComponents>
		<changeAddress :show="showAddress" :addressList="addressList" @choose="chooseAddress" @cancel="showAddress = false"></changeAddress>
	</view>
	
</template>

<script>
	import remarkComponents from 'pages/component/remark.vue';
	import changeAddress from 'pages/component/changeaddress.vue';
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			buyGoods: {
				type: Object,
				default: {}
			}
			
		},
		components:{
			remarkComponents,
			changeAddress
		},
		data() {
			return {
				addressList:[],
				addressId:"",
				tabIndex:0,
				orderAddress:{},
				score:{},
				showOrderRemark:false,
				showAddress:false,
				checkAgreement:false,
				userMessage:""//订单备注
			}
		},
		created() {
			this.getAllAddress()
			this.getMhUserBalanceScore()
		},activated() {
			this.getAllAddress()
			this.getMhUserBalanceScore()
		},
		methods: {
			getMhUserBalanceScore(){
				uni.$api.getMhUserBalanceScore().then(res=>{
					this.score = res.data
				})
			},
			checkAndBuy(){
				if(this.buyGoods.goodsPrice > this.score.money){
					uni.$toast.showError('魔石余额不足请先充值！');
					return
				}
				if(!this.checkAgreement){
					uni.$toast.showError('请勾选同意支付协议！');
					return
				}
				this.addOrder()
			},
			toAgreement () {
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=3"
				})
			},
			toCollection () {
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=6"
				})
			},
			showAddressList () {
				this.setAddressCheck()
				this.showAddress = true
			},
			setAddressCheck () {
				for (var i in this.addressList) {
					if (this.addressId == this.addressList[i].addressId) {
						this.addressList[i]['checked'] = true
					} else {
						this.addressList[i]['checked'] = false
					}
				}
			},
			getAllAddress () {
				uni.$api.getAllAddress().then(res=>{
					if (res.success) {
						this.addressList = res.rows || []
						this.orderAddress = this.addressList.find(e=>e.addressDefaultStatus===1)||{}
						this.addressId = this.orderAddress.addressId
						this.setAddressCheck()
					}
				})
			},
			chooseAddress (e) {
				this.addressId = e.addressId
				this.showAddress = false
				this.getOrderData()
			},
			remarkCancel () {
				this.showOrderRemark = false
			},
			getRemark (e) {
				this.showOrderRemark = false
				this.userMessage = e
			},
			toAddress () {
				uni.navigateTo({
					url:"/pages/user/address?needBackAddressId="+true
				})
			},
			addOrder () {
				var params = {
					goodsId:this.buyGoods.goodsId,
					payId:210,
					ruleId:"app_pp_goods_first_pay",
					addressId:this.tabIndex===1?this.addressId:'',
					userMessage:this.userMessage
				}
				uni.$api.addOrderData(params).then(res => {
					if (res.success) {
						this.orderScorePay(res.data.orderId)
					}
				})
			},
			orderScorePay(orderId=''){
				uni.$api.orderScorePay({orderId,operationType:this.tabIndex}).then(res=>{
					uni.$toast.alert("购买成功")
					this.hideModal()
				})
			},
			hideModal() {
				this.$emit('close')
				this.show = false
			},
			onCopyToClipboard(data){
				uni.setClipboardData({
					data,
					success: function() {
						uni.showToast({
							title: "链接已复制,请在浏览器中粘贴访问",
						})
					}
				})
			},
		}
	}
</script>

<style>
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
		width: 374rpx;
		font-size: 30rpx;
		color: #46464B;
		line-height: 36rpx;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-align: left;
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

	.btn-box>view+view {
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

	.cu-dialog {
		height: 82vh;
		z-index: 9999;
	}

	.cu-modal {
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1000;
	}

	.padding-sm {
		padding-top: 10rpx;
	}

	/* 确认支付 */
	.operation-order {
		position: relative;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 60rpx;
	}

	.order-tab {
		font-size: 28rpx;
		line-height: 28rpx;
		color: #B4B4B4;
		position: relative;
		padding: 0 56rpx;
	}

	.order-tab.cur {
		font-weight: bold;
		color: #46464B;
	}

	.order-tab.cur::after {
		position: absolute;
		bottom: -10rpx;
		width: 108rpx;
		height: 7rpx;
		background-color: #FFB900;
		content: "";
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.address-box {
		width: 100%;
		padding: 28rpx 20rpx 24rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	.address {
		width: 608rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 30rpx;
		line-height: 48rpx;
		font-weight: bold;
		text-align: left;
	}

	.more-icon {
		width: 16rpx;
		height: 28rpx;
	}

	.remark-list {
		width: 100%;
		height: 100rpx;
		border-radius: 10rpx;
		background-color: #fff;
		padding: 0 20rpx;
	}

	.agreenment-btn {
		width: 36rpx;
		height: 36rpx;
		box-shadow: 0px 0px 20rpx 0px rgba(163, 163, 163, 0.72);
		border-radius: 50%;
		margin: 10rpx 20rpx;
		border: 1rpx solid #46464B;
	}

	.agreenment-btn.cur {
		background: #46464B;
		border: 8rpx solid #FFB900;
	}

	.blindbox-info {
		width: 710rpx;
		height: 90rpx;
		border-radius: 45rpx;
		border: 1rpx solid #46464B;
		padding: 0 30rpx 0 40rpx;
	}

	.now-btn {
		width: 710rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #ffb900;
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
		color: #46464B;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.operation-btnbox {
		position: absolute;
		bottom: 20rpx;
		padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
	}
	
	.wt-info {
		padding: 24rpx 30rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.link {
		text-decoration: underline;
	}
</style>
