<template>
	<view class="hp100">
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>{{intervalType==2?'时段专区':'即时专区'}}</text>
			</block>
		</cu-custom>
		<view class="line"></view>
		<view class="container" :style="{height:containerHeight}">
			<view class="content">
				<view class="dflex align-center">
					<view class="title">
						<text class="">{{partitionTitle}}</text>
					</view>
					<view class="top-tip">Magic stone zone</view>
				</view>
				<view class="m20">
					<view class="goods-item dflex" v-for="(item,index) in gameboxList" :key='item.goods.goodsId' @click="gotoBoxDetail(item.goods.goodsId)">
						<image class="goods-img" :src="item.goods.goodsImage" mode=""></image>
						<view class="dflex flex-direction justify-between">
							<view  v-for="(item,index) in item.itemShow" :key='index' >
								<image class="info-img":src="item.goodsImage" mode=""></image>
							</view>
						</view>
						<view class="goods-info">
							<view class="info-title">
								商品分布：
							</view>
							<view class="info-details">
								<view  class="text-overflow" v-for="(item,index) in item.probabilityList" :key="item.probabilityId">
									<text>{{item.probabilityValue}}</text>
								</view>
							</view>
							<view class="openbox-btn" >选择开盒</view>
						</view>
					</view>
					<listempty :list="gameboxList" :loading="listLoading"></listempty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listempty from 'pages/component/listempty.vue';
	export default {
		components:{
			listempty
		},
		data() {
			return {
				offset:0,
				limit:5,
				isReachBottom:true,
				listLoading:true,
				partitionId:0,
				gameboxList:[],
				containerHeight: '100%',
				domainStatic:this.domainStatic,
				partitionTitle:'',
				intervalType:1,
			}
		},
		onLoad(e) {
			console.log(e);
			uni.showShareMenu();
			this.partitionId = e.id;
			this.partitionTitle = e.title;
			this.intervalType = e.intervalType;
			this.containerHeight = `calc(100% - ${this.CustomBar + 8}px)` ;
			this.onFetchData();
		},
		onReachBottom(){
			if(this.isReachBottom){
				this.offset += this.limit;
				this.onFetchData();
			}
		},
		methods: {
			onFetchData() {
				this.listLoading  = true;
				uni.$api.getGoodsGameboxSpecialList({
					offset: this.offset,
					limit: this.limit,
					partitionId: this.partitionId
				}).then(res => {
					let gameboxList = res.goodsList;
					gameboxList.forEach(item =>{
						item.itemShow = item.itemShow.slice(0,2);
					})
					this.gameboxList = this.gameboxList.concat(gameboxList);
					if(gameboxList.length < this.limit){
						this.isReachBottom = false;
					}
					this.listLoading = false;
					
				})
			},
			gotoBoxDetail(id) {
				uni.navigateTo({
					url: '/pages/blindbox/openBox?goodsId=' + id +'&intervalType='+this.intervalType
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.line{
		background: #EEEEEE;
		height: 8px;
	}
	.container{
		background: #FFFFFF;
		.content{
			background-color: #FFE2DC;
			border-top-right-radius: 40rpx;
			padding-bottom: 40rpx;
			min-height: 100%;
			.title{
				font-size: 32rpx;
				position: relative;
				width: 300rpx;
				height: 84rpx;
				line-height: 84rpx;
				// padding: 19rpx 19rpx 30rpx 19rpx;
				background: url(https://boxapp.citytp.com/static/img/images/detail-title.png) no-repeat;
				background-size: 300rpx 84rpx;
				font-weight: 600;
				
			}
			.top-tip{
				color: #E87F6A;
				font-size: 18rpx;
			}
			.goods-item{
				padding: 34rpx 0 26rpx 11rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 20rpx;
				.goods-img{
					width: 206rpx;
					height: 253rpx;
					border-radius: 20rpx;
					margin-right: 14rpx;
				}
				.info-img{
					border-radius: 20rpx;
					width: 120rpx;
					height: 120rpx;
				}
				.goods-info{
					width: 356rpx;
					padding-left: 30rpx;
					font-size: 24rpx;
					.info-title{
						font-size: 28rpx;
						color: #FCAA9A;
						margin-bottom: 20rpx;
						font-weight: bold;
					}
					.info-details{
						height: 132rpx;
						view{
							padding-bottom: 6rpx;
						}
					}
				}
				.openbox-btn {
					width: 250rpx;
					height: 60rpx;
					background-color: #F9D585;
					margin: auto;
					color: #FFFFFF;
					border-radius: 40rpx;
					font-size: 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: bold;
				}
			}
		}
	}
</style>
