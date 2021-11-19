<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">最新中奖名单</block>
		</cu-custom>
		<view class="container" :style="{height:'calc(100vh - ' + CustomBar +'px)'}">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="goods-list" v-for="(item,index) in newOpenBox">
					<image :src="item.goodsImage" class="goods-image" mode=""></image>
					<view class="flex-between fdc wp100 goods-info">
						<view class="">
							<view class="goods-name mb18">{{item.gameBoxName}}</view>
							<view class="dflex ac mb18">
								<image :src="item.userPhoto?item.userPhoto:'/static/img/icon/default-user.png'" class="user-head"></image>
								<view class="ml8 mr8 fs-24 lh-24 fc-626">{{item.userNickName?item.userNickName:item.mobile}}开出</view>
								<view class="fs-28 lh-28 fc-ff4 goods-length">{{item.goodsTitle}}</view>
							</view>
							<view class="fs-28 lh-28 fc-626 dflex ac">回收 <view class="fc-ff4 ml18 mr18">{{item.goodsItemRecyclePrice}}</view> 魔石</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
			<listempty :list="newOpenBox" :loading="newOpenBoxLoading"></listempty>
			<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
			
		</view>
	</view>
</template>

<script>
	
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';
	
	export default {
		data() {
			return {
				newOpenBox:[],
				queryObj: {
					goodsTitle: "",
					goodsCategoryId: "",
					pageNumber: 0,
					pageSize: 100,
					pageCount: 99
				},
				newOpenBoxLoading:false,
				CustomBar: this.CustomBar,
			}
		},
		components: {
			listempty,
			nomore
		},
		onShow() {
			this.refreshList()
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
			}
		},
		methods: {
			refreshList(){
				this.queryObj.pageNumber = 0
				this.queryObj.pageCount = 99
				this.newOpenBox = []
				this.getNewOpenBoxList()
			},
			getNewOpenBoxList () {
				if (this.newOpenBoxLoading || this.queryObj.pageNumber >= this.queryObj.pageCount || this.newOpenBox.length >= 100) {
					return;
				}
				this.newOpenBoxLoading = true
				this.queryObj.pageNumber++
				this.queryObj.nullActivityId = 'null'
				uni.$api.getNewOpenBoxList(this.queryObj).then(res => {
					var dataList = res.rows || []
					this.newOpenBox = this.newOpenBox.concat(dataList)
					this.newOpenBoxLoading = false
					this.queryObj.pageCount = res.pageCount || 99
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.newOpenBoxLoading = false
				})
			},
		}
	}
</script>

<style>
	.container {
		padding: 16rpx 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
	}
	.goods-list {
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.goods-list+.goods-list {
		margin-top: 20rpx;
	}

	.goods-image {
		width: 150rpx;
		height: 150rpx;
		margin-right: 16rpx;
		flex-shrink: 0;
		border-radius: 12rpx;
	}

	.goods-name {
		font-size: 28rpx;
		color: #303133;
		font-weight: bold;
		line-height: 40rpx;
		display: -webkit-box;
		align-items: flex-start;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.user-head {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}
	.goods-length {
		width: 240rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
