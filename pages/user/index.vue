<template>
	<view>
		<image :src="domainStatic + '/img/bg/user-bg.png'" class="user-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<view class="cu-bar">
			<view class="action pr"></view>
			<view class="action">
				<navigator url="/pages/user/assets/recharge" class="recharge-btn">充值</navigator>
				<navigator url="/pages/user/set"><image :src="domainStatic + '/img/icon/set-icon@2x.png'" mode="" class="m-icon"></image></navigator>
			</view>
		</view>
		<view class="user-info dflex ac  mt-12">
			<image class="user-image" :src="user.userPhoto ? user.userPhoto : domainStatic + '/img/icon/default-user.png'"></image>
			<view class="dflex fdc jc-fs">
				<view class="fs-36 lh-48 fc-f fw-b mb12">
					{{ user.userNickName || user.userId }}
					<!-- 	<template v-if="user.userNickName">
						({{ user.userNickName }})
					</template> -->
				</view>
				<view class="fs-26 lh-32 fc-f op8">{{ phoneNum }} ></view>
			</view>
		</view>
		<view class="container">
			<view class="user-info-list" v-if="scoreMoney.length > 0">
				<view class="user-info-title" @tap="toAssets()">
					<view class="dflex ac">
						<image :src="domainStatic + '/img/icon/user-info-icon4@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-28 lh-28 fc-303">资产</text>
					</view>
					<image :src="domainStatic + '/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toAssets()" v-for="item in scoreMoney">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{ item.money }}</view>
						<view class="fs-26 lh-36 fc-606">{{ item.name }}</view>
					</view>
					<view class="flex-center fdc" @click="signIn()">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{ signInRes.n }}</view>
						<view class="fs-26 lh-36 fc-606">签到</view>
					</view>
					<navigator url="voucher/voucher">
						<view class="flex-center fdc">
							<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{ voucherCount }}</view>
							<view class="fs-26 lh-36 fc-606">抵用券</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="user-info-list">
				<view class="user-info-title" @tap="toExpandPage()">
					<view class="dflex ac">
						<image :src="domainStatic + '/img/icon/user-info-icon1@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-28 lh-28 fc-303">拓客管理</text>
					</view>
					<image :src="domainStatic + '/img/icon/more-icon.png'" mode="widthFix" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc">
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share">
							<image :src="domainStatic + '/img/icon/invite-icon.png'" mode="" class="invite-icon "></image>
							<view class="fs-26 lh-36 fc-f66">我要邀请</view>
						</button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<view @click="shareUser">
							<image :src="domainStatic + '/img/icon/invite-icon.png'" mode="" class="invite-icon"></image>
							<view class="fs-26 lh-36 fc-f66">我要邀请</view>
						</view>
						<!-- #endif -->
					</view>
					<view class="flex-center fdc" @tap="posterTap">
						<image :src="domainStatic + '/img/svg/user-poster.svg'" mode="" class="invite-icon mb8"></image>
						<view class="fs-26 lh-36 fc-f66">邀请海报</view>
					</view>
					<view class="flex-center fdc" @tap="toExpandPage(0)">
						<view class="fs-36 lh-44 fc-303 fw-b mt6 mb16">{{ user.userCount.recUserCount || 0 }}</view>
						<view class="fs-26 lh-36 fc-606">直推会员</view>
					</view>
					<view class="flex-center fdc" @tap="toExpandPage(1)">
						<view class="fs-36 lh-44 fc-303 fw-b mt6 mb16">{{ user.userCount.secondRecUserCount || 0 }}</view>
						<view class="fs-26 lh-36 fc-606">间推会员</view>
					</view>
				</view>
			</view>
			<view class="user-info-list">
				<view class="user-info-title" @tap="toOrder()">
					<view class="dflex ac">
						<image :src="domainStatic + '/img/icon/user-info-icon5@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">我的订单</text>
					</view>
					<image :src="domainStatic + '/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toOrder('?orderStatus=0')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{ welfareOrder.unPay }}</view>
						<view class="fs-24 lh-34 fc-939">待付款</view>
					</view>
					<view class="flex-center fdc" @tap="toOrder('?orderStatus=110')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{ welfareOrder.needTransit }}</view>
						<view class="fs-24 lh-34 fc-939">待发货</view>
					</view>
					<view class="flex-center fdc" @tap="toOrder('?orderStatus=120')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{ welfareOrder.delivering }}</view>
						<view class="fs-24 lh-34 fc-939">待收货</view>
					</view>
					<view class="flex-center fdc" @tap="toOrder('?orderStatus=300')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{ welfareOrder.completed }}</view>
						<view class="fs-24 lh-34 fc-939">已完成</view>
					</view>
				</view>
			</view>

			<view class="user-info-list user-info-data pt24 pb24">
				<navigator url="/pages/user/address">
					<view class="flex-center fdc">
						<image :src="domainStatic + '/img/icon/user-index-icon1@2x.png'" mode="" class="m-icon mb16"></image>
						<view class="fs-24 lh-34 fc-303">收货地址</view>
					</view>
				</navigator>
				<navigator url="/pages/info/servicecenter/servicecenter">
					<view class="flex-center fdc">
						<image :src="domainStatic + '/img/icon/user-index-icon2@2x.png'" mode="" class="m-icon mb16"></image>
						<view class="fs-24 lh-34 fc-303">服务中心</view>
					</view>
				</navigator>
			</view>
			<!-- tabbar 占位 -->
			<uni-sign-in ref="signIn" :signInRes="signInRes" :tips="signInTips"></uni-sign-in>
		</view>
		<generatePoster ref="posterRef"></generatePoster>
	</view>
</template>

<script>
import tabbar from 'pages/component/tabbar.vue';
import generatePoster from 'pages/component/generatePoster';
export default {
	components: {
		generatePoster,
	},
	data() {
		return {
			old: 0,
			onSaleGameBoxCount: 0,
			ckVersion: '',
			user: {
				userSpread: {
					userInviteCode: ''
				},
				userCount: {
					recUserCount: 0,
					secondRecUserCount: 0
				}
			},
			money: [],
			scoreMoney: [],
			score: {},
			exchangeApplyStatistics: {},
			lots: {},
			welfareOrder: {},
			auctionLots: {},
			balanceShare: {},
			balanceShareTitle: '',
			balanceShareShow: 0,
			waitDealBalanceShare: {},
			waitDealBalanceShareTitle: '',
			waitDealBalanceShareShow: 0,
			notReadMsgNum: 0,
			signInRes: {
				days: [],
				n: 0
			},
			signInTips: '',
			todaySignIn: false,
			voucherCount: 0,
			phoneNum: '',
			domainStatic: this.domainStatic,
		};
	},
	onShareAppMessage() {
		var shareUrl = this.user.userShareMpWxUrl;
		var title = this.user.userShareContent;
		var imageUrl = this.user.userShareMpWxImageUrl;
		console.log(shareUrl);
		return {
			title,
			path: `/pages/login/invite?id=${this.user.userId}&mobile=${this.user.mobile}`,
			imageUrl
		};
	},
	onLoad() {
		if (uni.$auth.isLoginAndCheckPeopleStatus()) {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
		}
	},
	mounted: function() {
		uni.$utils.blankScreenWatchAndRelunch(this, '#containerId', '/pages/user/index');
	},
	onShow() {
		this.ckVersion = uni.$session.getIosCkVersion() || '';
		if (uni.$auth.isLoginAndCheckPeopleStatus()) {
			this.getPageData();
			this.getNotReadMsgNum();
			this.getExchangeApplyStatistics();
			this.getUserSignIn();
			this.getVoucherByUser();
			// #ifndef MP-WEIXIN
			setTimeout(() => {
				if (uni.getStorageSync('triggerShareUser')) {
					this.shareUser();
					uni.setStorageSync('triggerShareUser', false);
				}
			}, 500);
			// #endif
		}
		uni.$utils.setTabBarOrderNum();
		uni.$api.getOnSaleGameBoxCount().then(res => {
			this.onSaleGameBoxCount = res.count || 0;
		});
	},
	methods: {
		// 邀请海报
		posterTap() {
			this.$refs.posterRef.buildPoster();
		},
		// 获取抵用券
		getVoucherByUser() {
			uni.$api
				.getVoucherByUser({ voucherState: 2 })
				.then(res => {
					this.voucherCount = res.count;
					uni.hideLoading();
				})
				.catch(res => {
					uni.hideLoading();
				});
		},
		getUserSignIn() {
			// getUserSignIn
			uni.$api.getUserSignIn().then(res => {
				console.log(res);
				let days = [];
				this.todaySignIn = res.todaySignIn;
				this.signInTips = res.voucher;
				for (let i = 0; i < res.signIn.signInDays; i++) {
					days.push(i);
				}
				this.signInRes = {
					days: days,
					n: res.signIn.signInDays
				};
			});
		},
		signIn() {
			if (this.todaySignIn) {
				this.$refs.signIn.open();
				uni.$toast.showToast('已签到');
				return;
			}
			uni.$api
				.userSignIn()
				.then(res => {
					console.log(res);
					this.signInRes.days.push(this.signInRes.n);
					this.signInRes.n = this.signInRes.n + 1;
					this.$refs.signIn.open();
					this.todaySignIn = true;
					if (this.signInRes.n >= 7) {
						this.getVoucherByUser();
					}
				})
				.catch(res => {
					this.$refs.signIn.open();
					uni.$toast.showToast('已签到');
				});
		},
		getExchangeApplyStatistics() {
			uni.$api.getExchangeApplyStatistics().then(res => {
				this.exchangeApplyStatistics = res.data;
			});
		},
		toAssets() {
			uni.navigateTo({
				url: '/pages/user/assets'
			});
		},
		toRecharge() {
			uni.navigateTo({
				url: '/pages/user/assets/recharge'
			});
		},
		toSubstitution() {
			uni.navigateTo({
				url: '/pages/user/substitution/substitution'
			});
		},
		toAuctionGoods(suffix = '') {
			uni.navigateTo({
				url: '/pages/user/auctiongoods' + suffix
			});
		},
		toExpandPage(level) {
			uni.navigateTo({
				url: `/pages/user/expand?level=${level}`
			});
		},
		toOrder(suffix = '') {
			uni.navigateTo({
				url: '/pages/order/order' + suffix
			});
		},
		toPpSubstitution(suffix = '') {
			uni.navigateTo({
				url: '/pages/user/ppsubstitution' + suffix
			});
		},
		getNotReadMsgNum() {
			uni.$api.hasNotReadMsg().then(res => {
				this.notReadMsgNum = res.notReadMsgNum;
			});
		},
		getPageData() {
			uni.$api.getMyIndexData().then(res => {
				if (res.success) {
					var {
						user,
						money,
						scoreMoney,
						score,
						welfareOrder,
						lots,
						auctionLots,
						balanceShare,
						balanceShareTitle = '直推会员合拍账户管理',
						balanceShareShow,
						waitDealBalanceShare,
						waitDealBalanceShareTitle = '合拍账户',
						waitDealBalanceShareShow
					} = res.data;
					this.user = user;
					this.phoneNum = user.mobile.substring(0, 3) + '****' + user.mobile.substring(7);
					this.money = money;
					this.money.map(e => {
						if (Object.prototype.toString.call(e.money) === '[object Number]') {
							e.isMoney = true;
						} else {
							e.isMoney = false;
						}
						return e;
					});
					this.scoreMoney = scoreMoney;
					this.score = score;
					this.lots = lots;
					this.auctionLots = auctionLots;
					this.balanceShare = balanceShare;
					this.balanceShareTitle = balanceShareTitle;
					this.balanceShareShow = balanceShareShow;
					this.welfareOrder = welfareOrder;
					this.waitDealBalanceShare = waitDealBalanceShare;
					this.waitDealBalanceShareTitle = waitDealBalanceShareTitle;
					this.waitDealBalanceShareShow = waitDealBalanceShareShow;
				}
			});
		},
		shareUser() {
			var shareUrl = this.user.userShareUrl;
			var title = this.user.userShareContent;
			var desc = this.user.userShareContentDesc;
			console.log(title);
			this.shareApi(shareUrl, title, desc);
		},
		shareApi(shareUrl, title, desc) {
			var params = {
				provider: 'weixin',
				title: title,
				href: shareUrl,
				summary: desc || '',
				scene: 'WXSceneSession', //场景值 WXSceneSession 聊天界面 WXSenceTimeline 分享到朋友圈 WXSceneFavorite 分享到微信收藏
				imageUrl: this.domainStatic + '/logo.png',
				success(res) {
					console.log('分享成功:' + JSON.stringify(res));
				},
				fail(res) {
					console.log('分享失败:' + JSON.stringify(res));
				}
			};
			uni.share(params);
		},
		toBlindBox() {
			uni.navigateTo({
				url: '/pages/user/blindbox'
			});
		}
	}
};
</script>

<style scoped>
	/* #ifdef MP-WEIXIN */
	.cu-bar {
		box-shadow: none;
		top: 130rpx;
		bottom: auto;
	}
	.user-info{
		padding-top: 70rpx !important;
		height: 230rpx;
	}
	/* #endif */

.fc-f66 {
	color: #f6632d;
}
.new-message {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #ff411c;
	position: absolute;
	right: 0;
	top: 4rpx;
}

.user-index-bg {
	position: absolute;
	z-index: 0;
	width: 100%;
	top: -130rpx;
	left: 0;
}

.user-info {
	padding: 12rpx 36rpx 24rpx;
	position: relative;
	z-index: 1;
}

.user-image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border: 4rpx solid rgba(255, 255, 255, 0.5);
	margin-right: 24rpx;
}

.recharge-btn {
	width: 124rpx;
	height: 48rpx;
	line-height: 48rpx;
	border-radius: 24rpx;
	border: 2rpx solid #fff;
	margin-right: 30rpx;
	color: #fff;
	text-align: center;
}

.container {
	padding: 0 20rpx 32rpx;
}

.user-info-list {
	width: 100%;
	padding: 0 32rpx;
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	position: relative;
	z-index: 1;
}

.user-info-list.banner {
	background-color: unset;
	padding: 0;
}

.user-info-list + .user-info-list {
	margin-top: 20rpx;
}

.user-invite {
	width: 100%;
	height: 120rpx;
	padding: 0 44rpx;
	background: url(https://boxapp.citytp.com/static/img/bg/user-invite-bg@2x.png) no-repeat;
	background-size: 100% 100%;
}

.invite-icon {
	width: 88rpx;
	height: 58rpx;
}

.invite-btn {
	width: 160rpx;
	height: 64rpx;
	border-radius: 60rpx;
	background: linear-gradient(118deg, #efbd79 0%, #f9d29c 100%);
}

.user-info-title {
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2rpx solid #ededf0;
}

.user-info-data {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 22rpx 0 24rpx;
}

.op8 {
	opacity: 0.8;
}

.all {
	width: 186rpx;
	position: relative;
}

.assets-type {
	width: 100%;
	display: flex;
	justify-content: space-around;
}
.assets-type > view:first-child {
	width: 186rpx;
	position: relative;
}
.assets-type > .type-list:first-child::before {
	content: '';
	width: 2rpx;
	height: 64rpx;
	position: absolute;
	top: 8rpx;
	bottom: 8rpx;
	right: -1rpx;
	background-color: #fff;
	opacity: 0.3;
}
.more-substitution {
	position: relative;
}
.more-substitution image {
	position: absolute;
	right: -28rpx;
	width: 32rpx;
	height: 32rpx;
}
</style>
