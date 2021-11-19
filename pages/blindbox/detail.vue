<template>
	<view class="goods-detail">
		<view class="cu-bar search">
			<view class="action">
				<image @click="back()" src="/static/img/icon/goods-back@2x.png" mode="" class="m-icon"></image>
			</view>
		</view>
		<view class="pr">
			<swiper @change="swiperChange" class="screen-swiper no-dot" :indicator-dots="true" :circular="true"
				:autoplay="true">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="swiper-number flex-center">{{current}}/{{swiperList.length}}</view>
		</view>
		<view class="price-time flex-between ac" v-if="countDownlist.length == 3">
			<view class="dflex ac mr32">
				<text class="fs-32 fc-f">￥</text>
				<text class="fs-48 fc-f fw-b lh-56">{{goodsDetail.goodsPrice}}</text>
			</view>
			<view class="dflex ac fdc">
				<view class="fs-24 fc-f lh-24 mb8">距离开始还有</view>
				<view class="time-box dflex ac bc-f fc-ff4">
					<view class="time fs-24 fc-f lh-24">{{countDownlist[0]}}</view>:
					<view class="time fs-24 fc-f lh-24">{{countDownlist[1]}}</view>:
					<view class="time fs-24 fc-f lh-24">{{countDownlist[2]}}</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="goods-main">
				<view class="dflex ac mr32 mb16" v-if="countDownlist.length != 3">
					<text class="fs-32 fc-ff4">￥</text>
					<text class="fs-48 fc-ff4 fw-b lh-56">{{goodsDetail.goodsPrice}}</text>
				</view>
				<view class="mb16">
					<view class="goods-label mr16" v-if="goodsDetail.goodsBrandName">{{goodsDetail.goodsBrandName}}
					</view>
					<text class="fs-32 lh-48 fc-303 fw-b">{{goodsDetail.goodsTitle}}</text>
				</view>
				<view class="fs-28 lh-40 fc-606 mb16">{{goodsDetail.goodsSubTitle}}</view>
				<view class="fs-24 lh-34 fc-939 mb16">盲盒编号：{{goodsDetail.goodsBarcode}}</view>
				<view class="fs-24 lh-34 fc-939 mb16" v-show="goodsDetail.goodsGameBoxActivityId">
					限时秒杀：{{goodsDetail.activityBeginTime+"至"+goodsDetail.activityEndTime}}
				</view>
			</view>
			<view class="goods-content">
				<view class="parameter-box">
					<view class="parameter-nav" :class="tab.id == goodsTabCur?'cur':''" v-for="(tab,index) in goodsTab"
						:key="tab.id" @click="goodsTabClick(tab.id)">
						{{tab.name}}
						<view class="cur-icon"></view>
					</view>
				</view>
				<!-- 详情 -->
				<view class="detail-box" id="desc-box" v-if="goodsDetail.goodsDesc">
					<view class="detail-title dflex ac">
						<view class="title-icon"></view>
						<view class="fs-24 lh-34 fc-303 fw-b">商品详情</view>
					</view>
					<!-- <view class="detail-content" v-if="goodsDetail.goodsDescIsDefault == 0">
						<view v-show="goodsDetail.levels && goodsDetail.levels.length > 0">
							<view class="fs-24 lh-34 fc-626 mb16">开出商品等级数量描述</view>
							<view class="table-blindbox">
								<view class="table-list">
									<view class="blindbox-level">级别</view>
									<view class="blindbox-number">数量</view>
									<view class="blindbox-explain">说明</view>
								</view>
								<view class="table-list" v-for="(level,index) in goodsDetail.levels">
									<view class="blindbox-level">{{level.gameBoxLevelName}}</view>
									<view class="blindbox-number">{{level.gameBoxLevelGrandPrizeCount}}</view>
									<view class="blindbox-explain">{{level.gameBoxLevelDesc}}</view>
								</view>
							</view>
						</view>
					</view> -->
					<view class="detail-content" >
						<rich-text :nodes="goodsDetail.goodsDesc"></rich-text>
					</view>
				</view>
				<!-- 商品列表 -->
				<view class="detail-box"  id="goods-item-box" v-if="goodsDetail.showGoodsGameBoxItemGoods">
					<view class="detail-title dflex ac pb0 mb16">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品列表</view>
					</view>
					<view class="goods-list">
						<view class="goods dflex ai-fs" v-for="(goods,index) in goodsDetail.simpleGoods">
							<image :src="goods.goodsImage" class="goods-image"></image>
							<view class="dflex fdc ai-fs">
								<view class="fs-32 lh-48 fc-303 fw-b mb16">{{goods.goodsTitle}}</view>
								<!-- <view class="fs-24 lh-34 fc-939">总数量：{{goods.goodsItemGoodsCount}}</view> -->
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar bg-white border shop">
			<button class="action" open-type="contact" @click.stop="showCustomer()">
				<image class="m-icon" src="../../static/img/icon/kefu.png" ></image>
				联系客服
			</button>
			<view class="action" @click="toHelp()">
				<view class="dflex fdc ac">
					<image src="/static/img/icon/guize.png" mode="" class="m-icon"></image>
					规则说明
				</view>
			</view>
			<view class="btn-group" v-if="!goodsDetail.goodsGameBoxActivityId || (goodsDetail.goodsGameBoxActivityId&&activityStarting)">
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-if="goodsDetail.goodsStatus == 0">商品已下架</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-else-if="goodsDetail.goodsStock <= 0">已售罄</button>
				<button class="cu-btn bg-pp fc-f round" v-else @click="addOrder">立即购买</button>
			</view>
			<view class="btn-group" v-else >
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-if="activityWaitStart">未开始</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-else-if="activityStarting">开始种</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-else-if="activityEnd">已结束</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-else></button>
			</view>
		</view>
		<toptwenty :show="toptwentyAlert" :goodsId="goodsId" @cancel="hideModal"></toptwenty>
		<customer :show="customerAlert" @cancel="hideModal"></customer>
	</view>
</template>

<script>
	import toptwenty from 'pages/component/toptwenty.vue';
	import customer from 'pages/component/customer.vue';

	export default {
		data() {
			return {
				goodsId: "",
				swiperList: [],
				goodsDetail: {},
				dotStyle: false,
				player: {},
				current: 1,
				videoShow: true,
				goodsTabCur: 0,
				toptwentyAlert: false,
				customerAlert: false,
				twentyTimeId: "",
				goodsTab: [],
				countDownlist:[],
				activityWaitStart: false,
				activityStarting: false,
				activityEnd: false,
			}
		},
		components: {
			toptwenty,
			customer
		},
		onLoad(e) {
			this.goodsId = e.goodsId || ''
			this.getGoodsDetail()
		},
		onShow() {
			this.player = uni.createVideoContext('myVideo')
		},
		methods: {
			toHelp() {
				var helpId = 5
				uni.navigateTo({
					url: "/pages/info/servicecenter/servicedetail?helpId=" + helpId
				})
			},
			showCustomer() {
				this.customerAlert = true
			},
			showTwenty() {
				this.toptwentyAlert = true
			},
			hideModal() {
				this.toptwentyAlert = false
				this.customerAlert = false
			},
			goodsTabClick(tabId) {
				this.goodsTabCur = tabId
				for (var i in this.goodsTab) {
					if (this.goodsTab[i].id == tabId) {
						var cssId = this.goodsTab[i].cssId
						uni.createSelectorQuery().select("#" + cssId).boundingClientRect((res) => { //最外层盒子节点
							
							uni.pageScrollTo({
								duration: 200, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
								scrollTop: res.top, //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
							})
						}).exec()
					}
				}

			},
			swiperChange(current, source) {
				var index = current.target.current
				this.current = index + 1
			},
			back() {
				uni.navigateBack()
			},
			getGoodsDetail() {
				var params = {
					goodsId: this.goodsId
				}
				uni.$api.getGoodsDetail(params).then(res => {
					if (res.success) {
						if (res.data.goodsDesc) {
							console.log("desc:", res.data.goodsDesc)
							res.data.goodsDesc = uni.$utils.formatRichTextImage(res.data.goodsDesc)
						}
						this.handlerGoodsData(res.data)
					}
				}).catch(res => {
					uni.$toast.showError(res.message)
				})
			},
			handlerGoodsData(goodsDetail) {
				this.goodsDetail = goodsDetail
				this.handlerSwiper()
				this.handlerGoodsTab()
				if (this.goodsDetail.goodsGameBoxActivityId) {
					this.startTwentyTime()
				}
			},
			startTwentyTime() {
				this.countDownlist = this.getStartList()
				var countDownSecond = this.getEndSecond()
				if (countDownSecond > 0) {
					setTimeout(this.startTwentyTime, 1000)
				} else {
					this.showTwenty()
				}
				this.onUpdateActivityStatus()
			},
			getStartList(){
				const beginTime = new Date(this.goodsDetail.activityBeginTime.replace(/\-/g,'/')).getTime()
				var starthms =  uni.$utils.date.countDown(new Date().getTime(),beginTime)
				return starthms.split(":")
			},
			getEndSecond() {
				var endTime = new Date(this.goodsDetail.activityEndTime.replace(/-/g,'/'))
				var now = new Date()
				let countDownSecond = parseInt((endTime.getTime() - now.getTime()) / 1000)
				// console.log('countDownSecond',countDownSecond)
				return countDownSecond
			},
			onUpdateActivityStatus(){
				
				const preTime = new Date(this.goodsDetail.activityPreviewTime.replace(/\-/g,'/')).getTime()
				const beginTime = new Date(this.goodsDetail.activityBeginTime.replace(/\-/g,'/')).getTime()
				const endTime = new Date(this.goodsDetail.activityEndTime.replace(/\-/g,'/')).getTime()
				var nowTime = new Date().getTime()
				this.activityEnd = endTime <= nowTime?true: false
				this.activityStarting = beginTime <= nowTime && !this.activityEnd?true: false
				this.activityWaitStart = !this.activityStarting && !this.activityEnd?true: false
			},
			//处理轮播图
			handlerSwiper() {
				var goodsDetail = this.goodsDetail
				var swiperList = []
				/* if (goodsDetail.goodsImage) {
					swiperList.push({
						url:goodsDetail.goodsImage,
					})
				} */
				if (goodsDetail.goodsImages && goodsDetail.goodsImages.length > 0) {
					for (var i in goodsDetail.goodsImages) {
						swiperList.push({
							url: goodsDetail.goodsImages[i].goodsImagePath,
						})
					}
				}
				this.swiperList = swiperList
			},
			//处理tab标签
			handlerGoodsTab() {
				var goodsDetail = this.goodsDetail
				var tabs = []
				if (goodsDetail.goodsVideoUrl) {
					tabs.push({
						id: 1,
						name: "商品视频",
						cssId: "video-box"
					})
				}
				if (goodsDetail.goodsAttrList && goodsDetail.goodsAttrList.length > 0) {
					tabs.push({
						id: 2,
						name: "商品参数",
						cssId: "param-box"
					})
				}
				if (goodsDetail.goodsDesc) {
					tabs.push({
						id: 3,
						name: "商品详情",
						cssId: "desc-box"
					})
				}
				if (goodsDetail.showGoodsGameBoxItemGoods) {
					tabs.push({
						id: 4,
						name: "商品列表",
						cssId: "goods-item-box"
					})
				}
				if (tabs.length > 0) {
					this.goodsTabCur = tabs[0].id || ""
					this.goodsTab = tabs || []
				}
			},
			collectGoods() {
				var params = {
					goodsId: this.goodsId
				}
				uni.$api.collectGoods(params).then(res => {
					if (res.success) {
						this.goodsDetail.goodsUserCollection = res.userCollect
					}
				}).catch(res => {
					this.$toast.showError(res.message)
				})
			},
			addOrder() {
				uni.navigateTo({
					url: "/pages/blindbox/index?goodsId=" + this.goodsId
				})
			}
		}
	}
</script>

<style>
	.cu-bar.search {
		position: fixed;
		top: 40rpx;
		width: 100%;
		left: 0;
		z-index: 2;
	}

	swiper {
		height: 750rpx;
	}

	.swiper-number {
		position: absolute;
		bottom: 32rpx;
		right: 32rpx;
		width: 92rpx;
		height: 40rpx;
		font-size: 22rpx;
		line-height: 22rpx;
		color: #fff;
		background: #000000;
		opacity: 0.4;
		border-radius: 40rpx;
	}

	.container {
		padding: 16rpx;
	}

	.goods-main {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 24rpx;
		margin-bottom: 16rpx;
	}

	.goods-label {
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 4rpx 10rpx;
		color: #fff;
		background: #FF411C;
		border-radius: 8rpx;
		display: inline-block;
		vertical-align: top;
		margin-top: 8rpx;
	}

	.parameter-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 88rpx;
	}

	.parameter-nav {
		font-size: 24rpx;
		line-height: 34rpx;
		color: #606266;
		font-weight: bold;
		position: relative;
	}

	.parameter-nav.cur {
		color: #FF411C;
	}

	.cur-icon {
		width: 48rpx;
		height: 4rpx;
		background-color: #FF411C;
		border-radius: 2rpx;
		display: none;
		position: absolute;
		bottom: -4rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.parameter-nav.cur .cur-icon {
		display: block;
	}

	.goods-content {
		border-radius: 20rpx;
		background-color: #fff;
	}

	.detail-main {
		padding: 0 24rpx 24rpx;
	}

	.detail-content {
		padding: 0 24rpx 24rpx;
	}

	.table-blindbox {
		border: 2rpx solid #999;
	}

	.table-list {
		display: flex;
		height: 48rpx;
		line-height: 48rpx;
	}

	.table-list+.table-list {
		border-top: 2rpx solid #999;
	}

	.table-list .blindbox-level {
		width: 160rpx;
		text-align: center;
		border-right: 2rpx solid #999;
	}

	.table-list .blindbox-number {
		width: 160rpx;
		text-align: center;
		border-right: 2rpx solid #999;
	}

	.table-list .blindbox-explain {
		width: calc(100% - 320rpx);
		text-align: center;
	}

	.goods-list {
		padding: 0 24rpx 24rpx;
	}

	.goods {
		padding: 12rpx 0rpx;
	}

	.goods-image {
		width: 120rpx;
		height: 120rpx;
		margin-right: 24rpx;
	}

	.main-parameter {
		border: 2rpx solid #EBEBF5;
		opacity: 1;
		border-radius: 8rpx;
	}

	.parameter-list {
		min-height: 66rpx;
		display: flex;
		align-items: center;
	}

	.parameter-list+.parameter-list {
		border-top: 2rpx solid #EBEBF5;
	}

	.parameter-list view {
		padding-left: 30rpx;
		height: 100%;
		line-height: 66rpx;
		font-size: 24rpx;
		color: #939399;
	}

	.parameter-list view:first-child {
		width: 220rpx;
		border-right: 2rpx solid #EBEBF5;
	}

	.cu-bar.shop {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
		padding: 0 32rpx;
	}

	.cu-bar.shop .action {
		flex-direction: column;
		font-size: 20rpx;
		color: #939399;
	}

	.cu-btn {
		width: 400rpx;
		height: 76rpx;
	}

	.detail-video {
		padding: 20rpx;
	}

	button {
		margin: 0;
	}

	.detail-title {
		padding: 24rpx;
	}

	.title-icon {
		width: 4rpx;
		height: 24rpx;
		background-color: #FF411C;
		margin-right: 24rpx;
	}
	
	.price-time {
		width: 100%;
		background-color: #FF411C;
		height: 100rpx;
		padding: 0 32rpx;
	}
	.time-box {
		padding: 8rpx;
	}
	.time {
		width: 32rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8rpx;
		background-color: #FF411C;
	}
</style>
