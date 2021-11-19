<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">卡券中心</block></cu-custom>
		<view class="f6-line"></view>
		<view class="container">
			<view class="flex-between ac mb30"><view class="fs-32 lh-32 fc-3 fw-b">我的券</view></view>
			<view class="dflex justify-between  align-center coupon-item " v-for="item in voucherList" :key="item.voucherId">
				<view class="dflex align-center">
					<view><image class="voucher-img" src="../../../static/img/icon/voucher.png" mode=""></image></view>
					<view>
						<view class="coupon-name fs-30">回收抵用券</view>
						<view class="fs-24">有效期至{{ item.voucherTime }}</view>
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
			loading: true
		};
	},
	onLoad() {
		this.getVoucherByUser();
	},
	methods: {
		// 获取抵用券
		getVoucherByUser() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			uni.$api.getVoucherByUser().then(res => {
				this.voucherList = res.voucherList;
				this.loading = false;
				uni.hideLoading();
			});
		}
	}
};
</script>

<style lang="scss">
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
