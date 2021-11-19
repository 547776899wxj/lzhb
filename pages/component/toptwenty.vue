<template>
	<view>
		<view class="cu-modal bottom-modal address-modal" :class="alert?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">top20榜</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm">
					<scroll-view scroll-y="true" class="hp100" v-if="newOpenBox.length>0&&!newOpenBoxLoading">
						<view class="goods-list" v-for="(item,index) in newOpenBox">
							<image :src="item.goodsImage" class="goods-image" mode=""></image>
							<view class="flex-between fdc wp100 goods-info">
								<view class="">
									<view class="goods-name mb18">{{item.gameBoxName}}</view>
									<view class="dflex ac mb18">
										<image :src="item.userPhoto?item.userPhoto:'/static/img/icon/default-user.png'" class="user-head"></image>
										<view class="ml8 mr8 fs-24 lh-24 fc-626">{{item.userNickName?item.userNickName:item.mobile}}开出</view>
										<view class="fs-28 lh-28 fc-ff4">{{item.goodsTitle}}</view>
									</view>
									<view class="fs-28 lh-28 fc-626 dflex ac">价值 <view class="fc-ff4 ml18 mr18">{{item.goodsItemOriginalPrice}}</view> 元</view>
								</view>
							</view>
						</view>
					</scroll-view>
					
					<listempty :list="newOpenBox" :loading="newOpenBoxLoading" v-else></listempty>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import listempty from 'pages/component/listempty.vue';
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			goodsId:""
		},
		data() {
			return {
				alert:false,
				newOpenBoxLoading:false,
				newOpenBox:[]
			}
		},
		components: {
			listempty
		},
		watch:{
			show (value) {
				this.alert = value
				if (value) {
					this.getTopTwenty()
				}
			},
		},
		methods: {
			hideModal () {
				this.alert = false
				this.$emit('cancel')
			},
			getTopTwenty () {
				var goodsId = this.goodsId
				var pageSize = 20;
				var data = {
					pageSize:pageSize,
					goodsId:goodsId
				}
				if (this.newOpenBoxLoading) return
				this.newOpenBoxLoading = true
				uni.$api.getNewOpenBoxList(data).then(res => {
					this.newOpenBoxLoading = false
					this.newOpenBox = res.rows || []
				}).catch(()=>{
					this.newOpenBoxLoading = false
				})
			}
		}
	}
</script>

<style scoped>
	.cu-modal.bottom-modal.address-modal .cu-dialog {
		border-radius: 40rpx 40rpx 0 0;
		max-height: 1000rpx;
		min-height: 400rpx;
	}

	.cu-modal.bottom-modal.address-modal .cu-dialog .padding-sm {
		max-height: 900rpx;
	}

	.address-modal .cu-dialog .padding-sm scroll-view {
		max-height: 880rpx;
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
</style>
