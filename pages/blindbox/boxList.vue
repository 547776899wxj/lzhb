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
					<image :src=" userInfo.userPhoto ||'../../static/img/icon/default-user.png'" class="user-head"></image>
					<view class="dflex fdc jc-fs">
						<view class="fs-26 lh-26 fc-464 mb8">{{userInfo.userNickName || userInfo.mobile || ''}}</view>
						<view class="fs-26 lh-26 fc-464">剩余: <text class="fc-ff0 fw-b">{{userInfo.money}}</text>魔石</view>
					</view>
				</view>
				<view class="recharge-btn" @click.stop="toRecharge()">立即充值</view>
			</view>
		</view>
		<view class="container">
			<view>
				<image class="introduce-img" src="../../static/img/bg/share-bg.png"></image>
			</view>
			<view class="box-list">
				<view class="box-item dflex justify-between align-center" v-for="(item,index) in boxList" :key='index'>
					<view class="box-title">{{item.partitionTitle}}</view>
					<view class="box-btn">立即进入></view>
					<view>
						<image class="box-item-img" src="../../static/img/example/goods-list@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				introduceInfo: true,
				gameIntroductionAdvList:[],
				userInfo:{},
				boxList:[]
			}
		},
		onShow() {
			this.introduceInfo = uni.$session.getOpenGoodsGameboxInducInfo()
			this.onFetchUserInfo();
		},
		onLoad() {
			this.getRuleIntroductionInteger();
			this.getGoodsPartition();
		},
		methods:{
			getGoodsPartition(){
				uni.$api.getGoodsPartition({
					offset:0,
					limit:20,
				}).then(res =>{
					res.data.forEach((item)=>{
						item.isShowInfo = false;
					})
					this.boxList = res.data;
				})
			},
			onFetchUserInfo(){
				uni.$api.getMhUserBalanceScore().then(res =>{
					this.userInfo = res.data || {}
				})
			},
			getRuleIntroductionInteger(){
				uni.$api.getRuleIntroductionInteger().then(res =>{
					this.gameIntroductionAdvList = res.gameIntroductionAdvList || []
				})
			},
			onChangeIntroducShow(){
				this.introduceInfo = !this.introduceInfo
				uni.$session.setOpenGoodsGameboxInducInfo(this.introduceInfo)
			},
			navTo(id){
				uni.navigateTo({
					url: 'index?id='+id,
				});
			},
			toRecharge() {
				uni.navigateTo({
					url: "/pages/user/assets/recharge"
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		text-align: center;
		.introduce-img{
			height: 175rpx;
			width: 705rpx;
		}
		.box-list{
			background: linear-gradient(0deg, #FF9F8C, #FF9F8C);
			padding: 19rpx 19rpx 6rpx 19rpx;
			.box-item{
				background: linear-gradient(0deg, #FED2C0 0%, #FFFFFF 100%);
				height: 155rpx;
				border-radius: 5rpx;
				margin-bottom: 27rpx;
				.box-title{
					font-size: 50rpx;
					color: #F76C5A;
					margin-left: 56rpx;
					width: 116px;
					text-align: left;
				}
				.box-btn{
					background: linear-gradient(90deg, #FB7E67, #F75540);
					border-radius: 20rpx;
					font-size: 19rpx;
					margin-left: 34rpx;
					color: #FFFFFF;
					padding: 6rpx 16rpx;
				}
				.box-item-img{
					width: 78rpx;
					height: 113rpx;
					margin-right: 63rpx;
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
	
</style>
