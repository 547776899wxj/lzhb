<template>
	<view class="">
		<view  :class="{'show':showPoster,'cu-modal':!isLoding}">
			<view class="share-pop wp100 hp100 flex-center">
				<view class="dflex fdc ac share-pop-box">
					<view class="wp100 dflex pr mb50" >
						<l-painter  :board="base" isRenderImage @success="posterPath = $event" />
					</view> 
					<view class="flex-center" v-show="!isLoding">
						<view class="download-btn l-btn fs-26 lh-26 flex-center mr56" @click="showPoster = false">取消</view>
						<view class="l-btn bg-pp fc-f fs-26 lh-26 flex-center" @click="downloadSuc()">下载图片</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lPainter from '@/uni_modules/lime-painter/components/lime-painter/'
	export default {
		components: {
			lPainter
		},
		data() {
			return {
				showPoster:true,
				base: {
					width: '517rpx',
					height: '880rpx',
					views: []
				},
				shareUrl:'',
				posterPath:'',
				userInfo:{},
				domainStatic:this.domainStatic,
				isLoding:true,
			};
		},
		created() {
			uni.$api.getUserInfo().then(res=>{
				this.userInfo = res.data || {};
			})
			uni.$api.getUserSpreadShareUrl().then(res => {
				this.shareUrl = res.url
			})
		},
		mounted() {
			this.showPoster = false
			this.isLoding = false;
		},
		methods:{
			downloadSuc () {
				var self = this
				uni.saveImageToPhotosAlbum({
					filePath: self.posterPath,
					success(res) {
						self.showPoster = false
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			buildPoster() {
				
				uni.showLoading({
					title:"生成中。。。"
				})
				console.log(this.userInfo);
				var nickName = this.userInfo.userNickName?this.userInfo.userNickName:''
				var mobile = this.userInfo.mobile?this.userInfo.mobile:''
				if (mobile && mobile.length > 7) {
					var reg = /^(\d{3})\d{4}(\d{4})$/;
					mobile = mobile.replace(reg, "$1****$2")
				}
				
				var self = this
				var poster = {
					width: '517rpx',
					height: '880rpx',
					views: [
						{
							type: 'image',
							src: '../../static/img/posterBg.jpg',
							mode: 'scaleToFill',
							css: {
								left: '0rpx',
								top: '0rpx',
								width: '517rpx',
								height: '880rpx'
							}
						},
						{
							type: 'image',
							src:'../../static/img/default-user.png',
							mode: 'scaleToFill',
							css: {
								top:'72rpx',
								left:'145rpx',
								width: '64rpx',
								height: '64rpx',
								radius: '10rpx',
								backgroundColor: '#fff'
							}
						},
						{
							type: 'text',
							text: nickName,
							css: {
								color: '#fff',
								left: '225rpx',
								top: '65rpx',
								fontWeight:'bold',
								fontSize: '28rpx',
								lineHeight: '28rpx'
							}
						},
						{
							type: 'text',
							text: mobile,
							css: {
								color: '#fff',
								left: '225rpx',
								top: '105rpx',
								fontWeight:'bold',
								fontSize: '28rpx',
								lineHeight: '28rpx'
							}
						},
						{
							type: 'text',
							text: '- '+nickName+'邀请您注册盒变空间领取福利 -',
							css: {
								width:'517rpx',
								color: '#fff',
								left:'0rpx',
								top: '266rpx',
								fontSize: '24rpx',
								lineHeight: '24rpx',
								textAlign:'center'
							}
						},
						{
							type: 'image',
							src: '../../static/img/share-code@2x.png',
							mode: 'scaleToFill',
							css: {
								top:'502rpx',
								left:'143rpx',
								width: '235rpx',
								height: '235rpx',
								radius: '10rpx',
								backgroundColor: '#fff'
							}
						},
						{
						    type: 'qrcode',
						    text: self.shareUrl,
						    css: {
						        left: '151rpx',
						        top: '511rpx',
						        width: '218rpx',
						        height: '218rpx'
						    }
						},
						{
							type: 'image',
							src: '../../static/img/logo_55.png',
							mode: 'scaleToFill',
							css: {
								top:'593rpx',
								left:'233rpx',
								width: '55rpx',
								height: '55rpx'
							}
						},
					]
				}
				self.base = poster
				console.log('```````````````````````````````````````````````````');
				console.log(poster);
				setTimeout(function () {
					uni.hideLoading()
					self.showPoster = true
				},1000)
				
			},
		}
	}
</script>

<style lang="scss">
.cu-modal.show{
	display: block;
}
.cu-modal {
	z-index: 10000;
	display: none;
}
.share-pop {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.share-pop-box {
	width: 517rpx;
}


.share-close {
	width: 21rpx;
	height: 21rpx;
	padding: 20rpx;
	box-sizing: content-box;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 5;
}

.share-pop-image {
	width: 100%;
}
.share-info {
	position: absolute;
	top: 72rpx;
	left: 0;
	right: 0;
	text-align: center;
	margin: 0 auto;
}
.share-text {
	/* width: 326rpx; */
	margin: 0 auto;
	font-size: 24rpx;
	font-weight: bold;
	font-style: italic;
	background: linear-gradient(0deg, #FCE5CB 0%, #FFFFFF 99.5849609375%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	position: absolute;
	top: 266rpx;
	left: 0;
	right: 0;
}
.download-btn {
	border: 2rpx solid #f6f6f6;
	color: #f6f6f6;
}
</style>
