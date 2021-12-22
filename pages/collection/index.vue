<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>兑换</text>
			</block>
		</cu-custom>
		<view class="user-info">
			<view class="flex-between ac">
				<view class="dflex ac">
					<image :src="user.userPhoto||domainStatic+'/img/icon/default-user.png'" class="user-head"></image>
					<view class="dflex fdc jc-fs">
						<view class="fs-26 lh-26 fc-464 mb8">{{user.userNickName || user.mobile}}</view>
						<view class="fs-26 lh-26 fc-464">剩余: <text class="fc-ff0 fw-b">{{scoreMoney.money}}</text>魔石</view>
					</view>
				</view>
				<navigator class="recharge-btn" url="/pages/user/assets/recharge">立即充值</navigator>
			</view>
		</view>
		<view class="container" :style="{height:'calc(100vh - 98rpx - ' + CustomBar +'px)'}">
			<scroll-view scroll-y="true" class="hp100">
				<view class="cabinet-list" v-for="item in goodsList">
					<view class="goods-info dflex ai-fs" @click="goToGoodsDetail(item.goodsId)">
						<image :src="item.goodsImage" mode="" class="goods-image"></image>
						<view class="wp100">
							<view class="goods-name mt8 mb48">{{item.goodsTitle}}</view>
							<view class="flex-between ac mb20" v-if="item.goodsBrandName">{{item.goodsBrandName}}</view>
						
						
							<view class="flex-between ac">
								<view class="fs-28 lh-28 fc-464">价格：</view>
								<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{item.goodsPrice}}</text>魔石</view>
							</view>
						</view>
					</view>
					<view class="dflex jc-end ac btn-box">
						<view class="yellow-btn" @click="handleBuy(item)">立即兑换</view>
					</view>
				</view>
				<!-- tabbar 占位 -->
				<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
			</scroll-view>
		</view>
		<buyWelfare :show="showBuyDialog" :buyGoods="buyGoods"  @close="handleClose"></buyWelfare>
	</view>
</template>

<script>
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';
	import buyWelfare from 'pages/component/buyWelfare.vue';
	export default {
		data() {
			return {
				domainStatic:this.domainStatic,
				StatusBar: this.StatusBar,
				showBuyDialog: false,
				user:{},
				buyGoods:{},
				scoreMoney:{},
				option: {
			
						},
						queryObj: {
							goodsTitle: "",
							goodsCategoryId: "",
							pageNumber: 0,
							goodsType1: 29,
							pageSize: 10,
							pageCount: 99
						},
						goodsListLoading: false,
						category: [],
						goodsList: []
					}
				},
				mounted: function () {
					  uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/goods/list')
				},
				onLoad(e) {
					this.queryObj = Object.assign(this.queryObj, e)
				},
				onShow() {
					uni.$utils.setTabBarOrderNum()
					this.initPageData()
				},
				created: function() {
			
				},
				onPullDownRefresh() {
					this.refreshGoods()
				},
				// onReachBottom(e) {
				// 	this.getAllGoods()
				// },
				methods: {
					handleClose(){
						this.showBuyDialog = false
						this.getMhUserBalanceScore()
					},
					handleBuy(goods){
						this.buyGoods = goods
						this.showBuyDialog = true
					},
					reFreshPage(){
						this.getAllGoodsCategory(() => {
							if (this.option) {
								this.queryObj = Object.assign(this.queryObj, this.option)
							}
							this.refreshGoods()
						})
					},
					categoryClick(goodsCategoryId) {
						if (goodsCategoryId == this.queryObj.goodsCategoryId) {
							return
						}
						this.queryObj.goodsCategoryId = goodsCategoryId
						this.queryObj.pageNumber = 0
						this.queryObj.pageCount = 99
						this.goodsList = []
						this.getAllGoods()
					},
					initPageData() {
						this.refreshGoods()
						this.getMhUserBalanceScore()
					},
					getMhUserBalanceScore(){
						uni.$api.getMhUserBalanceScore().then(res => {
							 
							this.user = res.data
							this.scoreMoney = res.data
						})
					},
					refreshGoods() {
						this.queryObj.pageNumber = 0
						this.queryObj.pageCount = 99
						this.goodsList = []
						this.getAllGoods()
					},
					getAllGoodsCategory(cbOk) {
						uni.$api.getAllGoodsCategory().then(res => {
							if (res.success) {
								var category = [{
									goodsCategoryId: "",
									goodsCategoryName: "全部"
								}]
								this.category = category.concat(res.rows || [])
								if (this.category.length > 0 && !this.queryObj.goodsCategoryId) {
									this.queryObj.goodsCategoryId = this.category[0].goodsCategoryId
								}
							}
							if (cbOk && cbOk()) {
								cbOk()
							}
						})
					},
					getAllGoods() {
						if (this.goodsListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
							return;
						}
						this.goodsListLoading = true
						this.queryObj.pageNumber++
						uni.$api.getIndexGoodsList(this.queryObj).then(res => {
							var dataList = res.rows || []
							this.goodsList = this.goodsList.concat(dataList)
							this.goodsListLoading = false
							this.queryObj.pageCount = res.pageCount || 99
						}).catch(res => {
							uni.$toast.showError(res.message)
							this.goodsListLoading = false
						})
					},
					goToGoodsDetail(goodsId) {
						if (goodsId) {
							uni.navigateTo({
								url: "/pages/laboratory/detail?goodsId=" + goodsId
							})
						}
					},
					addOrder(goodsId) {
						uni.$auth.checkLogin({
							autoGoLoginPage: true
						}).then(res => {
							uni.navigateTo({
								url: "/pages/order/addorder?goodsId=" + goodsId
							})
						}).catch(res => {
							uni.navigateTo({
								url: uni.$config.LOGIN_PAGE
							})
						})
					},
					back() {
						uni.navigateBack({
							delta: 1
						});
					}
				},
				watch: {
					goodsListLoading(value) {
						if (!value) {
							uni.stopPullDownRefresh()
						}
					},
				},
				components: {
					listempty,
					nomore,
					buyWelfare
				}
			}
</script>

<style scoped>
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
	color: #46464B;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	padding: 20rpx 20rpx 0; 
}
.cabinet-list {
	padding: 20rpx;
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
.cu-dialog {
	height: 82vh;
}

.cu-modal {
	background-color: rgba(0, 0, 0, 0.4);
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
.order-tab.cur::after{
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
.cu-modal {
	z-index: 1000;
}
</style>
