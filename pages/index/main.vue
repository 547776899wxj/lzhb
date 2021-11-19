<template>
	<view id="containerId">
		<view class="bg-white dflex ac pl48" :style="style">
			<view class="fs-36 lh-36 fw-b fc-464">首页</view>
		</view>
		<view class="siwper-box mb20" v-if="indexAdvList.length > 0">
			<view class="swiper-bg"></view>
			<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" @change="swiperChange">
				<swiper-item v-for="item in indexAdvList" @click="onIndexAdvFunc(item)">
					<view class="swiper-item">
						<image :src="item.advUrl" class="banner"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper-dot">
				<view :class="swiperKey == index?'active':''" v-for="(item,index) in indexAdvList" :key="index"></view>
			</view>
		</view>
		<view class="content">
			<view class="special-area mb20">
				<view class="special" @click.stop="toBlindboxIndex()">
					<image :src="menu1.advUrl" class="special-bg"></image>
					<view class="dflex fdc ai-fe special-text">
						<image src="../../static/img/icon/now-icon@2x.png" class="area-icon"></image>
						<view class="fs-26 lh-26 fc-464 fw-b">即时专区</view>
					</view>
				</view>
				<view class="special" @click.stop="toTimeBox()">
					<image :src="menu2.advUrl" class="special-bg"></image>
					<view class="dflex fdc ai-fe special-text">
						<image src="../../static/img/icon/time-icon@2x.png" class="area-icon"></image>
						<view class="fs-26 lh-26 fc-464 fw-b">时段专区</view>
					</view>
				</view>
				<view class="new-people" @click.stop="toNewPeople()">
					<image :src="menu3.advUrl" class="special-bg"></image>
					<view class="dflex fdc ai-fe special-text">
						<view class="fs-26 lh-26 fc-464 fw-b">新人须知</view>
					</view>
				</view>
			</view>
			<view class="winner-box mb20" v-if="openList.length > 0">
				<view class="flex-between ac mb24">
					<view class="dflex ac">
						<image src="../../static/img/icon/openbox-icon@2x.png" class="openbox-icon"></image>
						<view class="fs-28 lh-28 fc-464 fw-b">开盒名单</view>
					</view>
					<view class="navi-btn" @click.stop="toNewBox()">查看</view>
				</view>
				<view class="winner-list">
					<swiper  :circular="true" :disable-touch="true" :indicator-dots="false" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
						<swiper-item v-for="newOpenList in showOpenList">
							<view class="swiper-item">
								<view class="winner dflex ac" v-for="openItem in newOpenList">
									<image :src="openItem.goodsImage" class="winner-img"></image>
									<view class="dflex fdc jc-fs winner-info">
										<view class="fs-26 lh-36 fc-464 user-length">恭喜
											{{openItem.userNickName||openItem.mobile}}
										</view>
										<view class="fs-26 lh-36 fc-464 user-length">抽中了{{openItem.goodsTitle}}</view>
									</view>
									<view class="dflex ac" v-if="openItem.goodsItemSaleStatus == 10">
										<image src="../../static/img/icon/default-user.png" class="winner-user mr12"></image>
										<view class="fs-26 lh-26 fc-ff0">回收了{{openItem.goodsItemRecyclePrice}}魔石</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="introduce-box" v-if="prizeAdvList.length > 0">
				<view class="flex-between ac mb24">
					<view class="dflex ac">
						<image src="../../static/img/icon/openbox-icon2@2x.png" class="openbox-icon"></image>
						<view class="fs-28 lh-28 fc-464 fw-b">幸运盒子</view>
					</view>
				</view>
				<image v-for="item in prizeAdvList" :src="item.advUrl" class="introduce" @click="onIndexAdvFunc(item)"></image>
			</view>
		</view>
		<view class="popup fs-32" v-if="isPopupShow">
			<text class="popup-text ">连续签到7天，送魔石抵用券</text>
			<view class="navi-btn" @click="signIn">签到</view>
			<image src="../../static/img/icon/close.png" @click="isPopupShow=false" class="popup-close" mode=""></image>
		</view>
		<uni-sign-in ref="signIn" :signInRes='signInRes' :tips='signInTips'></uni-sign-in>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexAdvList:[],
				prizeAdvList:[],
				openList:[],
				showOpenList: [],
				menu1: {},
				menu2: {},
				menu3: {},
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				banner: [{},{},{}],
				swiperKey: 0,
				isPopupShow:false,
				signInRes: {
					days: [],
					n: 0
				},
				signInTips:'', 
			};
		},
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		onShow() {
			this.onFetchData();
			if(uni.$auth.isLogin()){
				this.getUserSignIn();
			}
		},
		methods:{
			getUserSignIn(){
				// getUserSignIn
				uni.$api.getUserSignIn().then(res =>{
					console.log(res);
					let days = [];
					if(!res.todaySignIn) this.isPopupShow = true;
					this.signInTips = res.voucher;
					for(let i=0;i<res.signIn.signInDays;i++){
						days.push(i);
					}
					this.signInRes = {
						days: days,
						n: res.signIn.signInDays
					}
				})
			},
			signIn(){
				//userSignIn
				uni.$api.userSignIn().then(res =>{
					console.log(res);
					this.signInRes.days.push(this.signInRes.n);
					this.signInRes.n = this.signInRes.n+1;
					this.isPopupShow = false
					this.$refs.signIn.open();
				}).catch(res =>{
					this.isPopupShow = false
				})
			},
			onFetchData(){
				uni.$api.getMhIndexData().then(res =>{
					this.indexAdvList =  res.indexAdvList || []
					this.prizeAdvList =  res.prizeAdvList || []
					this.openList =  res.openList || []
					this.menu1 =  res.menu1 || {}
					this.menu2 =  res.menu2 || {}
					this.menu3 =  res.menu3 || {}
					this.showOpenList = group(this.openList,2)
				})
				function group(array, subGroupLength) {
					let index = 0;
					let newArray = [];
					while (index < array.length) {
						newArray.push(array.slice(index, index += subGroupLength));
					}
					return newArray;
				}
			},
			onIndexAdvFunc(item){
				if (item.advGoodsId){
					uni.navigateTo({
						url: '/pages/blindbox/openBox?goodsId='+item.advGoodsId
					})
				}
			},
			toNewBox() {
				uni.navigateTo({
					url: "/pages/blindbox/newbox"
				})
			},
			toBlindboxIndex() {
				uni.navigateTo({
					url: "/pages/blindbox/index"
				})
			},
			toTimeBox() {
				uni.$toast.alert('敬请期待')
			},
			toNewPeople() {
				uni.navigateTo({
					url: "/pages/info/servicecenter/servicedetail?helpId=4"
				})
			},
			swiperChange(e) {
				this.swiperKey = e.detail.current
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.popup{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		height: 98rpx;
		justify-content: center;
		align-items: center;
		bottom: 10px;
		.popup-text{
			color: #FFFFFF;
		}
		.navi-btn{
			margin-right: 10px;
			margin-left: 30px;
		}
		.popup-close{
			height: 54rpx;
			width: 54rpx;
			position: absolute;
			right: 20rpx;
			top: 0px;
			padding: 5px;
		}
	}
	/* #ifdef H5 */
	.popup{
		bottom: 70px;
	}
	/* #endif */
	.swiper-box {
		position: relative;
	}
	.siwper-box .swiper-bg {
		width: 100%;
		height: 195rpx;
		background-color: #fff;
		position: absolute;
		z-index: 1;
	}
	.siwper-box swiper {
		position: relative;
		z-index: 3;
		width: calc(100% - 40rpx);
		margin: 0 auto;
		border-radius: 10rpx;
		height: 326rpx;
	}
	.siwper-box .swiper-item {
		height: 100%;
	}
	.siwper-box .swiper-item .banner {
		border-radius: 10rpx;
	}
	.siwper-box .swiper-dot {
		height: 6rpx;
		width: calc(100% - 64rpx);
		margin: 8rpx auto 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.siwper-box .swiper-dot > view {
		width: 37rpx;
		height: 6rpx;
		background-color: #46464B;
	}
	.siwper-box .swiper-dot > view.active {
		background-color: #FFB900;
	}
	.content {
		padding: 0 20rpx;
		width: 100%;
	}
	.special-area {
		display: flex;
	}
	.special {
		width: 266rpx;
		height: 184rpx;
		border-radius: 10rpx;
		position: relative;
		background-color: #fff;
		margin-right: 20rpx;
	}
	.special-bg {
		width: 100%;
		height: 100%;
		padding: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
	.special-text {
		position: absolute;
		bottom: 30rpx;
		right: 18rpx;
		z-index: 3;
	}
	.special-text view::after {
		content: "";
		position: absolute;
		bottom: -8rpx;
		right: 0;
		width: 45rpx;
		height: 5rpx;
		background-color: #FFB900;
	}
	.area-icon {
		width: 34rpx;
		height: 34rpx;
		margin-bottom: 10rpx;
	}
	.new-people {
		width: 138rpx;
		height: 184rpx;
		border-radius: 10rpx;
		position: relative;
		background-color: #fff;
	}
	.winner-box {
		padding: 16rpx 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
	}
	.openbox-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 14rpx;
		margin-left: -2rpx;
	}
	.navi-btn {
		width: 107rpx;
		height: 42rpx;
		background-color: #FFB900;
		border-radius: 21rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.winner {
		justify-content: space-around;
	}
	.winner + .winner {
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
	.introduce-box {
		padding: 15rpx 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}
	.introduce {
		width: 100%;
		height: 210rpx;
		display: block;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}
</style>
