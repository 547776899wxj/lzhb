<template>
	<view>
		<cu-custom bgColor="bg-f6">
			<block slot="backText"></block>
			<block slot="content">盲盒列表</block>
		</cu-custom>
		<view class="container">
			<view>
				<view class="fs-32 lh-32 fc-3 fw-b mb24">即时开箱盲盒</view>
				<view class="recommend-content mb48">
					<view class="recommend-list" v-for="(item,index) in nowGameboxList" @click.stop="toGbDetail(item.goodsId)">
						<image :src="item.goodsImage" mode="widthFix" class="recommend-img"></image>
						<view class="recommend-info">
							<view class="fs-28 lh-28 fc-f wp100 text-hidden recommend-price flex-center mb18">价值：{{item.minPrice}}元-{{item.maxPrice}}元</view>
							<view class="fs-28 lh-28 fc-3 recommend-name mb30">{{item.goodsTitle}}</view>
							<view class="fs-34 lh-34 fc-fb2 fw-b dflex ai-fe"><view class="fs-26 lh-26">￥</view>{{item.goodsPrice}}</view>
						</view>
					</view>
				</view>
				<view class="fs-32 lh-32 fc-3 fw-b mb24">场次盲盒</view>
				<view class="recommend-content">
					<view class="recommend-list" v-for="(item,index) in auctionGameboxList" @click.stop="toGbDetail(item.goodsId)">
						<view class="recommend-icon" :class="item.end?'recommend-end':''">{{item.waitStart?'待开始':item.starting?'进行中':item.end?'已结束':''}}</view>
						<image :src="item.goodsImage" mode="widthFix" class="recommend-img"></image>
						<view class="recommend-info">
							<view class="fs-28 lh-28 fc-f wp100 text-hidden recommend-price flex-center mb18">价值：{{item.minPrice}}元-{{item.maxPrice}}元</view>
							<view class="fs-28 lh-28 fc-3 recommend-name mb30">{{item.goodsTitle}}</view>
							<view class="fs-34 lh-34 fc-fb2 fw-b dflex ai-fe mb20"><view class="fs-26 lh-26">￥</view>{{item.goodsPrice}}</view>
							<view class="fs-24 lh-28 fc-939">时间：{{item.activityBeginTimeHMS}} - {{item.activityEndTimeHMS}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<listempty :list="gameboxList" :loading="gameboxListLoading"></listempty>
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
				gameboxList:[],
				gameboxListLoading:false,
				auctionGameboxList:[],
				nowGameboxList:[],
				searchIpName:"",
				queryObj: {
					goodsIpId: "",
					pageNumber: 0,
					pageSize: 999999,//这个页面不分页
					pageCount: 99
				},
			}
		},
		components: {
			listempty,
			nomore
		},
		onLoad(e) {
			this.queryObj = Object.assign(this.queryObj, e)
			this.refreshPageData();
		},
		onShow() {
			this.refreshPageData();
			uni.$utils.setTabBarOrderNum()
		},
		methods: {
			refreshPageData(){
				this.queryObj.pageNumber = 0
				this.queryObj.pageCount = 99
				this.gameboxList = []
				this.auctionGameboxList = []
				this.nowGameboxList = []
				this.getAllGameboxList()
				
			},
			getAllGameboxList () {
				if (this.gameboxListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.gameboxListLoading = true
				this.queryObj.pageNumber++
				uni.$api.getAppGameboxList(this.queryObj).then(res => {
					var dataList = res.rows || []
					var auctionGameboxList = []
					var nowGameboxList = []
					for(var i in dataList) {
						var item = dataList[i]
						if(item.goodsGameBoxActivityId) {
							
							item.activityBeginTime = item.activityBeginTime&&item.activityBeginTime.replace(/-/g,'/') || ''
							item.activityEndTime = item.activityEndTime&&item.activityEndTime.replace(/-/g,'/') || ''
							item.activityBeginTimeHMS = item.activityBeginTime.substr(11,8) || ''
							item.activityEndTimeHMS = item.activityEndTime.substr(11,8) || ''
							item.waitStart = false
							item.starting = false
							item.end = false
							if (item.activityBeginTime && item.activityEndTime){
								
								var startTime = new Date(item.activityBeginTime).getTime()
								var endTime = new Date(item.activityEndTime).getTime()
								var nowTime = new Date().getTime()
								if (endTime < nowTime){
									item.end = true	
								}
								else if (startTime <= nowTime && nowTime <= endTime){
									item.starting = true
								}
								else if (startTime > nowTime){
									item.waitStart = true
								}
								
							}
							console.log('=====',item.waitStart, item.starting, item.end)
							
							
							auctionGameboxList.push(item)
						} else {
							nowGameboxList.push(item)
						}
					}
					
					this.gameboxList = this.gameboxList.concat(dataList)
					this.auctionGameboxList = this.auctionGameboxList.concat(auctionGameboxList)
					this.nowGameboxList = this.nowGameboxList.concat(nowGameboxList)
					
					this.gameboxListLoading = false
					this.queryObj.pageCount = res.pageCount || 99
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.gameboxListLoading = false
				})
			},
			goToPay (goodsId) {
				uni.navigateTo({
					url: "/pages/blindbox/pay?goodsId="+goodsId
				})
			},
			toGbDetail (goodsId) {
				uni.navigateTo({
					url: "/pages/blindbox/detail?goodsId="+goodsId
				})
			}
		}
	}
</script>

<style>
.container {
	padding: 12rpx 24rpx;
}

.recommend-content {
	display: flex;
	flex-wrap: wrap;
}
.recommend-list {
	width: 340rpx;
	background-color: #fff;
	border-radius: 0 20rpx 20rpx 20rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	margin-right: 12rpx;
	flex-shrink: 0;
	position: relative;
}
.recommend-list:nth-child(2n) {
	margin-right: 0;
}
.recommend-icon {
	position: absolute;
	top: -4rpx;
	left: 0;
	z-index: 4;
	width: 120rpx;
	height: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #FF411C;
	color: #fff;
	border-radius: 0 0 12rpx 0;
	font-weight: bold;
}
.recommend-icon.recommend-end {
	background-color: #f3f3f3;
	color: #333;
}
.recommend-img {
	width: 100%;
}
.recommend-info {
	padding: 18rpx 24rpx;
}
.recommend-price {
	background-color: #FF411C;
	border-radius: 24rpx;
	padding: 4rpx 12rpx;
}
.recommend-name {
     overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
