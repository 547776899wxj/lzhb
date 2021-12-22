<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>即时专区</text>
			</block>
		</cu-custom>
		<view class="user-info">
			<view class="flex-between ac">
				<view class="dflex ac">
					<image :src=" userInfo.userPhoto || domainStatic+'/img/icon/default-user.png'" class="user-head"></image>
					<view class="dflex fdc jc-fs">
						<view class="fs-26 lh-26 fc-464 mb8">{{userInfo.userNickName || userInfo.mobile || ''}}</view>
						<view class="fs-26 lh-26 fc-464">剩余: <text class="fc-ff0 fw-b">{{userInfo.money}}</text>魔石</view>
					</view>
				</view>
				<view class="recharge-btn" @click.stop="toRecharge()">立即充值</view>
			</view>
		</view>
		<view class="container">
			<view class="introduce-box wrapper mb20">
				<view class="introduce-title flex-between ac">
					<view class="dflex ac">
						<view class="title-icon"></view>
						<view class="fs-28 lh-28 fc-464 fw-b">玩法介绍</view>
					</view>
					<view class="dflex ac hp100 pl24" @click.stop="onChangeIntroducShow">
						<view class="fs-26 lh-26 fc-ffb fw-b mr6">{{introduceInfo?'收起':'展开'}}</view>
						<view class="arrow-icon" :class="introduceInfo?'cur':''"></view>
					</view>
				</view>
				<view class="introduce-info" v-show="introduceInfo">
					<!-- <img v-for="item in gameIntroductionAdvList" :src="item.advUrl" alt=""> -->
					<image class="introduce-info-img" v-for="item in gameIntroductionAdvList" :src="item.advUrl" mode="widthFix"></image>
				</view>
			</view>
			<view class="openbox wrapper" v-for="item,index in gameboxList">
				<view class="dflex ac mb20">
					<image :src="domainStatic+'/img/icon/openbox-icon@2x.png'" mode="" class="openbox-icon"></image>
					<view class="fs-28 lh-28 fc-464 fw-b">{{item.goods.goodsTitle}}</view>
					<image :src="item.goods.goodsDescIcon" class="openbox-ident" v-if="item.goods.goodsDescIcon"></image>
				</view>
				<view class="blindbox-list dflex ai-fs mb20">
					<image :src="item.goods.goodsImage" class="big-img mr20"></image>
					<view class="dflex fw-w ai-fs">
						<image class="blindbox-img" v-for="itemGoods in item.itemShow" :src="itemGoods.goodsImage">
						</image>
					</view>
				</view>
				<view class="mb10">
					<view class="dflex align-center fs-26 pb10" v-for="(itemTitle,indexTitle) in item.goods.goodsSubtitle" :key="index">
						<view class="icon-point"></view>{{itemTitle.value}}
					</view>
				</view>
				<view class="flex-center mb55">
					<!-- <view class="openbox-btn mr52" @click.stop="onFastOpenBox(index)">快速开盒</view> -->
					<view class="openbox-btn mr52" @click.stop="gotoBoxDetail(index,1)">盒内预览</view>
					<view class="openbox-btn" @click.stop="gotoBoxDetail(index)">选择开盒</view>
				</view>
				<view class="winner-box" v-if="item.openList.length > 0">
					<view class="dflex ac mb30 ">
						<view class="title-icon"></view>
						<view class="fs-28 lh-28 fc-464 fw-b">该盲盒开盒名单</view>
					</view>
					<view class="winner-list">
						<swiper  :circular="true" :disable-touch="true"  :indicator-dots="false" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
							<swiper-item v-for="newOpenList in item.showOpenList">
								<view class="swiper-item">
									<view class="winner dflex ac" v-for="openItem in newOpenList">
										<image :src="openItem.goodsImage" class="winner-img"></image>
										<view class="dflex fdc jc-fs">
											<view class="fs-26 lh-36 fc-464 user-length">恭喜
												{{openItem.userNickName||openItem.mobile}}
											</view>
											<view class="fs-26 lh-36 fc-464 user-length">抽中了{{openItem.goodsTitle}}</view>
										</view>
										<view class="dflex ac" v-if="openItem.goodsItemSaleStatus == 10">
											<image :src="domainStatic+'/img/icon/default-user.png'" class="winner-user mr12"></image>
											<view class="fs-26 lh-26 fc-ff0">回收了{{openItem.goodsItemRecyclePrice}}魔石</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<listempty :list="gameboxList" :loading="listLoading"></listempty>
		</view>
		<!-- 购买弹窗 -->
		<view class="cu-modal bottom-modal buy-modal" :class="showPay?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="content fw-b">确认支付</view>
					<view class="action" @click.stop="showPay=false">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm" style="height: calc(100% - 100rpx);">
					<scroll-view scroll-y="true" style="height: calc(100% - 296rpx);">
						<view class="cabinet-list">
							<view class="goods-info dflex ai-fs">
								<image :src="chooseGoods.goodsImage" mode="" class="goods-image"></image>
								<view class="wp100 flex-between fdc" style="height: 256rpx;">
									<view class="goods-name mt8">{{chooseGoods.goodsTitle}}</view>
									<view class="">
										<view class="flex-between ac mb20">
											<view class="fs-28 lh-28 fc-464">数量：</view>
											<view class="fs-28 lh-28 fc-464">×1</view>
										</view>
										<view class="flex-between ac mb20">
											<view class="fs-28 lh-28 fc-464">价格：</view>
											<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{chooseGoods.goodsPrice}}</text>魔石</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="operation-btnbox mt20">
						<view class="agreement-box flex-center mb20">
							<view class="agreenment-btn" :class="{'cur':payAgreementCheck}" @click="payAgreementCheck=!payAgreementCheck"></view>
							<!-- <view class="agreenment-btn cur"></view> -->
							<view class="fs-26 lh-26 fc-464">我已阅读并同意<text class="fc-ffb">《支付协议》</text></view>
						</view>
						<view class="blindbox-info flex-between ac mb20">
							<view class="fs-30 lh-30 fc-464">盲盒数量：×1</view>
							<view class="fs-30 lh-30 fc-464">总计：<text class="fs-36 lh-36 fc-ff0 fw-b">{{chooseGoods.goodsPrice}}</text> 魔石</view>
						</view>
						<view class="now-btn" @click="onRechargeAndPay(userInfo.money,chooseGoods.goodsPrice)" v-if="userInfo.money < chooseGoods.goodsPrice">充值并支付</view>
						<view class="now-btn" @click="onPay" v-else>确认支付</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 盒中商品弹窗 -->
		<view class="cu-modal bottom-modal box-modal" :class="showPaySuccess?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end">
					<view class="content fw-b">盒中商品</view>
					<view class="action" @click.stop="showPaySuccess = !showPaySuccess">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm" style="height: calc(100% - 160rpx);">
					<scroll-view scroll-y="true" style="height: calc(100% - 296rpx);">
						<view class="cabinet-list" v-for="item,index in paySuccessResult.rows">
							<view class="goods-info dflex ac">
								<view @click="onSelectBoxItem(index)">
									<view class="goods-radio" v-if="!item.checked"></view>
									<image :src="domainStatic+'/img/icon/goods-radio@2x.png'" class="goods-radio checked" v-else></image>
								</view>
								<image :src="item.goodsImage" mode="" class="goods-image"></image>
								<view class="wp100">
									<view class="goods-name mt8 mb48">{{item.goodsTitle}}</view>
									<view class="flex-between ac mb20">
										<view class="fs-28 lh-28 fc-464">数量：</view>
										<view class="fs-28 lh-28 fc-464">×1</view>
									</view>
									<view class="flex-between ac mb20">
										<view class="fs-28 lh-28 fc-464">价格：</view>
										<view class="fs-28 lh-28 fc-464"><text class="fc-ff0 fw-b">{{item.goodsItemRecyclePrice}}</text>魔石</view>
									</view>
									<view class="flex-between ac">
										<view class="fs-28 lh-28 fc-464"></view>
										<view class="fs-28 lh-28 fc-464 td-lt">{{item.goodsItemPrice}}魔石</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view>
						<view class="coupon" v-show="isCouponShow">
							<view class="text-center fs-40 mb20">
								可使用抵用券
							</view>
							<image class="close-image" @click="isCouponShow=false" :src="domainStatic+'/img/icon/main-close.png'" mode=""></image>
							<scroll-view scroll-y="true" style="height: calc(100% - 84rpx);">
								<view class="dflex justify-between  align-center coupon-item " v-for="item in couponData" :key='item.voucherId' @click="radioChange(item)">
									<view>
										<view class="coupon-name fs-30">回收抵用券</view>
										<view class="fs-24">有效期至{{item.voucherTime}}</view>
									</view>
									<view class="dflex align-center">
										<view class="fc-red ">
											<view class="fs-50 text-center">{{item.voucherValue}}</view>
											<view class="fs-24">最高抵用{{item.voucherValue}}魔石</view>
										</view>
										<view class="coupon-radio" :class="{'radio-active':item.checked}" ></view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="operation-btnbox mt20">
						<view class="dflex justify-between align-center">
							<view style="margin-left: 20rpx;">回收抵用券</view>
							<view class="dflex align-center" @click="handleCouponList">
								<text v-if="couponAmount!=0" class="fc-red">+{{couponAmount}}魔石</text>
								<text v-else-if="couponData.length>0" class="fc-red">可用{{couponData.length}}张</text>
								<text v-else>暂无可用</text>
								<image class="more-icon" :src="domainStatic+'/img/icon/more-icon.png'" mode=""></image>
							</view>
						</view>
						<view class="change-box mb20" @click="onSelectBoxItemAll">
							<view class="change-btn" v-if="!paySuccessResult.isSelectAll"></view>
							<image :src="domainStatic+'/img/icon/goods-radio@2x.png'" class="change-btn cur" v-else></image>
							<view class="fs-30 lh-30 fc-464">全选</view>
						</view>
						<view class="recovery-btn mb20" @click="onRecycle">7折回收 <text class="fs-36 lh-36 fc-f fw-b ml10 mr10">{{ totalRecoveryPrice }}</text> 魔石</view>
						<view class="now-btn" @click="onSendPackage">立即发货</view>
					</view>
				</view>
			</view>
		</view>
		<chooseaddress v-if="showAddress"
		 :goodsItemIds="paySuccessResult.goodsItemIds"
		 @success="sendOrRecycleSuccess" 
		  @cancel="showAddress = false"></chooseaddress>
	</view>
</template>

<script>
	import chooseaddress from 'pages/component/chooseaddress.vue';
	import listempty from 'pages/component/listempty.vue';
	export default {
		components:{
			chooseaddress,listempty
		},
		data() {
			return {
				rechargeAndPaying:false,
				channelData: [],
				showAddress: false,
				paySuccessResult:{
					orderId: '',
					goodsItemIds: '',
					rows: [],
					totalRecyclePrice: 0,
					isSelectAll: false,
				},
				showPaySuccess: false,
				payAgreementCheck: true,
				showPay: false,
				chooseGoods: {},
				gameboxList: [],
				userInfo:{},
				goods: [],
				itemShow: [],
				openList: [],
				showOpenList: [],
				gameIntroductionAdvList:[],
				introduceInfo: true,
				StatusBar: this.StatusBar,
				isCouponShow: false,
				couponData:[],
				couponAmount:0,
				offset:0,
				limit:5,
				isReachBottom:true,
				listLoading:true,
				partitionId:0,
				domainStatic:this.domainStatic
			}
		},
		onReachBottom(){
			if(this.isReachBottom){
				this.offset += this.limit;
				this.onFetchData();
			}
		},
		created: function() {
			uni.$api.getPayChannel({}).then(res => {
				this.channelData = res.data;
			});
		},
		watch:{
			showPaySuccess(newShow){
				if(newShow){
					this.couponAmount = 0;
					this.couponData.forEach(item =>{
						if(item.checked) {item.checked = false}
					})
				}
			}
		},
		
		computed: {
			style() {
				var StatusBar = this.StatusBar;
			},
			totalRecoveryPrice:function(){
				return (+this.couponAmount + this.paySuccessResult.totalRecyclePrice).toFixed(2);
			}
		},
		onLoad({id}) {
			this.partitionId = id;
			this.onFetchData();
			this.getRuleIntroductionInteger();
		},
		onShow() {
			this.introduceInfo = uni.$session.getOpenGoodsGameboxInducInfo()
			this.onFetchUserInfo()
			this.getVoucherByUser();
			// this.paySuccess("821092637667001")
		},
		methods: {
			getRuleIntroductionInteger(){
				uni.$api.getRuleIntroductionInteger().then(res =>{
					this.gameIntroductionAdvList = res.gameIntroductionAdvList || []
				})
			},
			// 显示抵用券列表
			handleCouponList(){
				if(this.couponData.length == 0) return
				this.isCouponShow = true;
			},
			// 获取抵用券
			getVoucherByUser(){
				uni.$api.getVoucherByUser().then(res =>{
					res.voucherList.forEach(item =>{
						item.checked = false;
						item.voucherTime = item.voucherTime.split(' ')[0];
					});
					this.couponData = res.voucherList;
				})
			},
			radioChange(e){
				console.log(this.paySuccessResult);
				this.couponData.forEach(item =>{ 
					if(e.voucherId == item.voucherId) {
						item.checked = !item.checked
						if(item.checked){
							let voucherValue = this.paySuccessResult.totalRecyclePrice + item.voucherValue;
							if(voucherValue > this.paySuccessResult.totalPrice){
								this.couponAmount = (this.paySuccessResult.totalPrice - this.paySuccessResult.totalRecyclePrice).toFixed(2) ;
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
			onFetchData() {
				this.listLoading  = true;
				uni.$api.getGoodsGameboxSpecialList({
					offset: this.offset,
					limit: this.limit,
					partitionId: this.partitionId
				}).then(res => {
					let gameboxList = res.goodsList || [{
						goods: {},
						itemShow: [],
						openList: []
					}]
					gameboxList.map(e =>{
						e.showOpenList = group(e.openList,2)
						return e
					});
					this.gameboxList = this.gameboxList.concat(gameboxList);
					if(gameboxList.length < this.limit){
						this.isReachBottom = false;
					}
					this.listLoading = false;
					
				})
				// this.showOpenList = group(this.openList,2)
				
			},
			onFetchUserInfo(){
				uni.$api.getMhUserBalanceScore().then(res =>{
					this.userInfo = res.data || {}
				})
			},
			onRechargeAndPay(balanceMoney, payMoney){
				if(!this.payAgreementCheck){
					uni.$toast.showError('请勾选同意支付协议！');
					return;
				}
				if (this.rechargeAndPaying) return
				this.rechargeAndPaying = true
				var model = this.channelData[0]
				model.money = payMoney - balanceMoney
				uni.$api.rechargeScoreNew(model).then(res =>{
					console.log('rechargeScoreNew',res)
					return this.onPay(res.orderId)
				}).then(()=>{
					this.rechargeAndPaying = false
				}).catch(()=>{
					this.rechargeAndPaying = false
				})
			},
			onPay(chargeOrderId){
				if(!this.payAgreementCheck){
					uni.$toast.showError('请勾选同意支付协议！');
					return;
				}
				if (this.paying) return
				uni.showLoading({
					title:'加载中...'
				})
				this.paying = true
				uni.$api.createMhGoodsGameBoxOrderPayPlan({
					
						chargeOrderId: chargeOrderId,
					goodsId: this.chooseGoods.goodsId,
					count: 1
				}).then(res =>{
					var param = {
						orderId: res.orderId || '',
						payId: 102,
						mode: 3 //3盲盒支付
					}
					return uni.$api.appPay(param)
				
				}).then((res)=>{
					this.onFetchUserInfo()
					
					this.paying = false
					this.showPay = false
					this.paySuccess(res.orderId)
				}).catch(err =>{
					console.log(err)
					this.paying = false
					return Promise.reject()
				})
			},
			paySuccess(orderId){
				this.paySuccessResult.orderId = orderId
				this.showPaySuccess = true
				return uni.$api.getMhGoodsGameBoxItemDataByOrderId({
					orderId: orderId
				}).then(res =>{
					this.paySuccessResult.rows = []
					this.paySuccessResult.totalRecyclePrice = 0
					res.rows.map(item =>{
						if (item.goodsItemSaleStatus == 0){
							this.paySuccessResult.rows.push(item)
							this.paySuccessResult.totalRecyclePrice += item.goodsItemPrice
						}
					})
					this.onSelectBoxItemAll()
					uni.hideLoading();
					console.log(this.paySuccessResult);
				})
			},
			onSelectBoxItem(index){
				console.log('onSelectBoxItem',index)
				let item = this.paySuccessResult.rows[index]
				if (item.goodsItemSaleStatus == 0){
					item.checked = !item.checked
				}
				else {
					item.checked = false
				}
				this.calcIsSelectAll()
				this.$forceUpdate()
			},
			onSelectBoxItemAll(){
				this.paySuccessResult.rows.map(item=>{
					if (item.goodsItemSaleStatus == 0){
						item.checked = true
					}
					else {
						item.checked = false
					}
				})
				this.calcIsSelectAll()
				this.$forceUpdate()
			},
			calcIsSelectAll() {
				var isSelectAll = true
				var totalRecyclePrice = 0
				var selectArr=[]
				let totalPrice = 0
				this.paySuccessResult.rows.map(e=>{
					if (e.checked && e.goodsItemSaleStatus==0) {
						totalRecyclePrice += e.goodsItemRecyclePrice
						totalPrice += e.goodsItemPrice;
						selectArr.push(e.goodsItemId)
					}
					else{
						isSelectAll = false
					}
					
				})
				this.paySuccessResult.isSelectAll = isSelectAll
				this.paySuccessResult.totalRecyclePrice = totalRecyclePrice
				this.paySuccessResult.totalPrice = totalPrice
				this.paySuccessResult.goodsItemIds = selectArr.join(',')
			},
			onRecycle(){
				console.log('onRecycle')
				if (!this.paySuccessResult.goodsItemIds.length){
					uni.$toast.showToast("请选择回收商品")
					return
				}
				let voucherId = 0;
				this.couponData.forEach(item =>{
					if(item.checked){
						voucherId = item.voucherId;
						item.checked = false;
					}
				})
				uni.$api.recycleMhGoodsGamebox({
					goodsItemIds: this.paySuccessResult.goodsItemIds,
					voucherId
					
				}).then(res =>{
					uni.$toast.showToast('回收成功')
					this.sendOrRecycleSuccess()
					this.onFetchUserInfo()
					if(voucherId){
						this.getVoucherByUser();
					}
					setTimeout(()=> {
						this.couponAmount = 0;
					},100)
				})
			},
			onSendPackage(){
				console.log('onSendPackage')
				if (!this.paySuccessResult.goodsItemIds.length){
					uni.$toast.showToast("请选择发货商品")
					return
				}
				this.showAddress = true
			},
			sendOrRecycleSuccess(){
				var arr = this.paySuccessResult.goodsItemIds.split(',')
					
				this.paySuccessResult.goodsItemIds = ''
				if (arr.length == this.paySuccessResult.rows.length){
					this.showPaySuccess = false
				}
				else {					
					this.paySuccess(this.paySuccessResult.orderId)
				}
			},
			onFastOpenBox(index) {
				console.log(index)
				this.chooseGoods = this.gameboxList[index].goods
				this.showPay = true
			},
			onChangeIntroducShow(){
				this.introduceInfo = !this.introduceInfo
				uni.$session.setOpenGoodsGameboxInducInfo(this.introduceInfo)
			},
			gotoBoxDetail(index,isPreview) {
				console.log(index)
				let goods = this.gameboxList[index].goods
				uni.navigateTo({
					url: '/pages/blindbox/openBox?goodsId=' + goods.goodsId + '&isPreview=' + isPreview
				})
			},
			toRecharge() {
				uni.navigateTo({
					url: "/pages/user/assets/recharge"
				})
			},
		}
	}
	function group(array, subGroupLength) {
		let index = 0;
		let newArray = [];
		while (index < array.length) {
			newArray.push(array.slice(index, index += subGroupLength));
		}
		console.log(newArray);
		return newArray;
	}
</script>

<style lang="scss" scoped>
	.icon-point{
		background-color: #FFB900;
		border-radius: 50%;
		width: 20rpx;
		height: 20rpx;
		margin-right: 20rpx;
	}
	.close-image{
		position: absolute;
		right:20px;
		top: 15px;
		height: 40rpx;
		width: 40rpx;
	}
	.coupon{
		padding: 20rpx 30rpx 0 30rpx;
		border-radius: 30rpx 30rpx 0px 0px;
		position: absolute;
		width: 750rpx;
		background-color: #f2f2f2;
		left: 0;
		top: 0;
		height: 100%;
		z-index: 1;
		.coupon-item{
			padding: 26rpx 30rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.coupon-name{
				font-weight: bold;
				padding-bottom: 16rpx;
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
					background: url(https://boxapp.citytp.com/static/img/icon/goods-radio@2x.png);
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
	.more-icon{
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
		color: #46464B;
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

	.introduce-box {
		padding: 0 20rpx;
	}

	.introduce-title {
		height: 76rpx;
	}

	.title-icon {
		width: 9rpx;
		height: 26rpx;
		background-color: #FFB900;
		margin-right: 14rpx;
	}

	.introduce-info {
		padding: 25rpx 0 32rpx;
		border-top: 2rpx solid #F5F5F5;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.introduce-info-img{
		width: 670rpx;
	}
	.arrow-icon {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 10rpx solid #46464B;
	}

	.arrow-icon.cur {
		transform: rotate(180deg);
	}

	.openbox {
		padding: 15rpx 20rpx 24rpx;
	}

	.openbox+.openbox {
		margin-top: 20rpx;
	}

	.openbox-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 14rpx;
		margin-left: -2rpx;
		min-width: 50rpx;
	}

	.openbox-btn {
		width: 258rpx;
		height: 80rpx;
		background-color: #FFB900;
		color: #46464B;
		border-radius: 40rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}
	
	.openbox-ident {
		width: 192rpx;
		height: 48rpx;
		margin: 0 14rpx;
	}

	.big-img {
		width: 257rpx;
		height: 257rpx;
		flex-shrink: 0;
	}

	.blindbox-img {
		width: 118rpx;
		height: 118rpx;
		margin-right: 20rpx
	}

	.blindbox-img:nth-child(3n) {
		margin-right: 0;
	}

	.blindbox-img:nth-child(n+3) {
		margin-bottom: 20rpx;
	}

	.winner {
		justify-content: space-around;
	}

	.winner+.winner {
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

	.mr52 {
		margin-right: 52rpx;
	}

	.mb55 {
		margin-bottom: 55rpx;
	}

	.cabinet-list {
		padding: 20rpx 20rpx 20rpx 12rpx;
		background-color: #fff;
		border-radius: 10rpx;
		position: relative;
	}

	.cabinet-list+.cabinet-list {
		margin-top: 20rpx;
	}

	.goods-info+.goods-info {
		margin-top: 24rpx;
	}
	
	.goods-radio {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin-right: 8rpx;
		flex-shrink: 0;
		border: 1rpx solid #46464B;
	}
	
	.goods-radio.checked {
		border: 0;
	}

	.goods-image {
		width: 256rpx;
		height: 256rpx;
		margin-right: 20rpx;
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

	.box-modal .goods-name {
		width: 358rpx;
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

	.recovery-btn {
		width: 710rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #46464B;
		font-size: 30rpx;
		line-height: 30rpx;
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
		border: 1rpx solid #46464B;
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
		color: #46464B;
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
</style>
