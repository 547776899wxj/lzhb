<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>{{ intervalType == 2 ? '时段专区' : '即时专区' }}</text>
			</block>
		</cu-custom>
		<view class="user-info">
			<view class="flex-between ac">
				<view class="dflex ac">
					<image :src="userInfo.userPhoto || domainStatic + '/img/icon/default-user.png'" class="user-head"></image>
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
		<view class="line"></view>
		<view class="container">
			<navigator url="./introduction"><image class="introduce-img" :src="domainStatic + '/img/images/box-banner.png'"></image></navigator>
			<view class="box-list">
				<view class="box-item dflex justify-between align-center" v-for="(item, index) in boxList" :key="index" @click="navTo(item)">
					<view class="box-title">{{ item.partitionTitle }}</view>
					<view class="box-btn">立即进入></view>
					<view class="box-item-left"><image class="box-item-img" :src="item.partitionPictureUrl" mode="heightFix"></image></view>
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
			boxList:[],
			domainStatic:this.domainStatic,
			intervalType:1,
		}
	},
	onShow() {
		this.introduceInfo = uni.$session.getOpenGoodsGameboxInducInfo()
		this.onFetchUserInfo();
	},
	onLoad({intervalType}) {
		this.intervalType = intervalType;
		uni.showShareMenu();
		this.getGoodsPartition();
	},
	methods:{
		getGoodsPartition(){
			uni.showLoading({
				title:'加载中'
			})
			uni.$api.getGoodsPartition({
				offset:0,
				limit:20,
				intervalType:this.intervalType
			}).then(res =>{
				uni.hideLoading();
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

		onChangeIntroducShow(){
			this.introduceInfo = !this.introduceInfo
			uni.$session.setOpenGoodsGameboxInducInfo(this.introduceInfo)
		},
		navTo(item){
			if(this.intervalType == 2){
				let newDate = this.getNewDate();
				let endTime = (new Date(newDate +' ' +item.intervalEndTime)).getTime();
				let startTime = (new Date(newDate +' ' +item.intervalStartTime)).getTime();
				let newDateTime = (new Date()).getTime();
				if(newDateTime > endTime || newDateTime < startTime){
					uni.showToast({
						title: '场次未开放',
						icon:'none'
					});
					return
				}
			}
			uni.navigateTo({
				url: 'detailList?id='+item.partitionId+'&title='+item.partitionTitle+'&intervalType='+this.intervalType,
			});
		},
		getNewDate(){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
			var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
			var dateStr = year + "-" + month + "-" + day;
			return dateStr;
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
page {
	background-color: #ffffff;
}
.line {
	background: #eeeeee;
	height: 8px;
}
.container {
	text-align: center;
	.introduce-img {
		height: 175rpx;
		width: 705rpx;
		position: relative;
		bottom: -3px;
		margin-top: 20rpx;
	}
	.box-list {
		background: linear-gradient(0deg, #ff9f8c, #ff9f8c);
		padding: 19rpx 19rpx 6rpx 19rpx;
		.box-item {
			// background: linear-gradient(0deg, #FED2C0 0%, #FFFFFF 100%);
			background: url(https://boxapp.citytp.com/static/img/bg/box-list-bg.png) no-repeat;
			background-size: 100%;
			height: 155rpx;
			border-radius: 5rpx;
			margin-bottom: 27rpx;
			.box-title {
				font-size: 50rpx;
				color: #f76c5a;
				margin-left: 56rpx;
				width: 150px;
				text-align: left;
			}
			.box-btn {
				background: linear-gradient(90deg, #fb7e67, #f75540);
				border-radius: 20rpx;
				font-size: 19rpx;
				color: #ffffff;
				padding: 6rpx 16rpx;
			}
			.box-item-left {
				width: 180rpx;
				text-align: center;
				margin-right: 8rpx;
				.box-item-img {
					width: 78rpx;
					height: 113rpx;
				}
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
</style>
