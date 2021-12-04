<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">卡券中心</block></cu-custom>
		<view class="dflex ac cabinet-nav">
			<view class="order-nav" v-for="(tab,index) in segmentedItems" :key="tab.value" :class="segmentedCurrent == tab.value?'cur':''" @click.stop="tabClick(tab.value)">
				{{tab.name}}
				<view class="cur-icon"></view>
			</view>
		</view>
		<view class="container">
			<!-- <view class="flex-between ac mb30"><view class="fs-32 lh-32 fc-3 fw-b">我的券</view></view> -->
			<view class="dflex justify-between  align-center coupon-item " v-for="item in voucherList" :key="item.voucherId" :class="{opt7:segmentedCurrent==1}">
				<view class="dflex align-center">
					<view><image class="voucher-img" src="../../../static/img/icon/voucher.png" mode=""></image></view>
					<view>
						<view class="coupon-name fs-30">回收抵用券</view>
						<view class="fs-24">有效期至{{ item.voucherExpireTime }}</view>
					</view>
				</view>
				<view class="dflex align-center">
					<view class="fc-red ">
						<view class="fs-50 text-center">{{ item.voucherValue }}</view>
						<view class="fs-24">最高抵用{{ item.voucherValue }}魔石</view>
					</view>
				</view>
			</view>
			<listempty :list="voucherList" :loading="loading"></listempty>
		</view>
	</view>
</template>

<script>
import listempty from 'pages/component/listempty.vue';
export default {
	components: {
		listempty
	},
	data() {
		return {
			voucherList: [],
			loading: true,
			segmentedItems:[
				{value:2,name:'未使用'},
				{value:1,name:'已使用'},
			],
			segmentedCurrent: 2,
		};
	},
	onLoad() {
		this.getVoucherByUser();
	},
	methods: {
		tabClick(value){
			this.segmentedCurrent = value;
			this.getVoucherByUser();
		},
		// 获取抵用券
		getVoucherByUser() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			uni.$api.getVoucherByUser({voucherState:this.segmentedCurrent }).then(res => {
				this.voucherList = res.voucherList;
				this.loading = false;
				uni.hideLoading();
			});
		}
	}
};
</script>

<style lang="scss">
.opt7{
	opacity: 0.7;
}
.cur-icon {
	display: none;
	width: 94rpx;
	height: 4rpx;
	background-color: #FFB900;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.order-nav.cur .cur-icon {
	display: block;
}
.cabinet-nav {
	height: 98rpx;
	background-color: #fff;
	padding: 0 40rpx;
}
.order-nav {
	font-size: 28rpx;
	line-height: 40rpx;
	color: #B4B4B4;
	padding: 12rpx 20rpx;
	position: relative;
}
.order-nav.cur {
	color: #46464B;
	font-weight: bold;
}
.order-nav .cu-tag.badge{
	top: 0;
}
.f6-line {
	width: 100%;
	height: 20rpx;
	background-color: #f6f6f6;
}
.container {
	padding: 32rpx 30rpx;
}

.coupon-item {
	padding: 36rpx 30rpx;
	background-color: #ffffff;
	border-radius: 28rpx;
	margin-bottom: 20rpx;
	.voucher-img {
		height: 80rpx;
		width: 80rpx;
		margin-right: 20rpx;
	}
	.coupon-name {
		font-weight: bold;
		padding-bottom: 16rpx;
	}
}
</style>
