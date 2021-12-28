<template>
	<view>
		<image :src="domainStatic+'/invite/invite-bg2@2x.png'" class="invite-bg" mode="widthFix"></image>
		<view class="container">
			<image :src="domainStatic+'/invite/logo@2x.png'" class="invite-logo"></image>
			<view class="invite-info-box dflex ac fdc mb64">
				<image :src="domainStatic+'/invite/invite-info-bg@2x.png'" class="wp100 hp100 invite-info-bg" mode="widthFix"></image>
				<view class="invite-head">
					<image :src="recUser.userPhoto || domainStatic+'/img/icon/default-user.png'" class="invite-head-img" mode=""></image>
				</view>
				<view class="fs-36 lh-36 fc-3 mb20">邀请您注册领取福利啦！</view>
				<view class="fs-28 lh-28 fc-9 mb40">{{recUser.mobile}}</view>
				<view class="download-btn lh-32 fs-32 flex-center" @click="navTo">如已注册请点此返回首页</view>
			</view>
			<view class="form mb48">
				<image class="form-icon" :src="domainStatic+'/invite/title@2x.png'"></image>
				<view class="form-group">
					<view class="fs-28 lh-28 fc-3 w225">手机号码</view>
					<input placeholder="手机号码"  name="input" placeholder-class="fc-9" v-model="form.mobile">
				</view>
				<view class="form-group">
					<view class="fs-28 lh-28 fc-3 w225">验证码</view>
					<input placeholder="验证码" autocomplete='off' name="input" class="mr24 code-input" placeholder-class="fc-9" v-model="form.code"></input>
					<button class='form-group-btn flex-center' :class="{'form-group-phonebtn':codeTimer}" @click="onSendCode">{{codeBtText}}</button>
					
				</view>
				<view class="form-group mb32">
					<view class="fs-28 lh-28 fc-3 w225">密码</view>
					<input placeholder="密码须为6-16位" autocomplete='off' name="input" type="password" maxlength="16" placeholder-class="fc-9" v-model="form.password"></input>
				</view>
				<view class="wp100 mb16">
					<button class="cu-btn bdr-45 bg-pp fc-f lg wp100" @click="onRegister">提交</button>
				</view>
				<view class="flex-center pt16 pb16">
					<navigator url="/pages/info/servicecenter/servicedetail?helpId=2" class="fs-28 lh-28 fc-d52">无法接收验证码？</navigator>
				</view>
			</view>
			<view class="must-know dflex fdc jc-fs">
				<view class="fs-28 fc-f lh-40 fw-b mb18">活动须知</view>
				<view class="fs-26 lh-36 fc-f mb16 op6">本活动为盒变空间为了回馈用户,注册即可领取优惠券</view>
			<!-- 	<view class="fs-26 lh-36 fc-f mb16 op6">第一步 在此页面注册成功</view>
				<view class="fs-26 lh-36 fc-f mb16 op6">第二步 下载盒变空间APP</view>
				<view class="fs-26 lh-36 fc-f op6">第三步 领取福利</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popDownload:{
					mobile: '',
					show: false
				},
				recUser: '',
				codeTimer:'',
				codeTimeInitSecond: 60,
				codeTimerInterval: '',
				codeBtText: '获取验证码',
				multiArray: [
					[],[],[]
				],
				multiIndex: [0, 0, 0],
				form:{
					
					addressAreaId: '',
					addressAreaString: '请选择',
					addressDesc: '',
					recUserId: '',
					inviteCode: '',
					mobile: '',
					code: '',
					password: '',
					isCheck: false,
					peopleName: '',
					peopleCardNumber: '',
					ocrName:'',
					ocrCardNumber:'',
					peopleCardPicA: '',
					peopleCardPicB: '',
				},
				domainStatic:this.domainStatic
			}
		},
		onLoad(options) {
			console.log(options);
			let recUserId = options.id || '0'
			uni.$api.getDataForRegister({
				userId: recUserId
			}).then(res =>{
				this.recUser = res.data || ''
				this.form.recUserId = recUserId
			})
		},
		methods: {
			navTo(){
				uni.switchTab({
					url:'../index/main'
				})
			},
			onSendCode(){
				let {mobile} = this.form
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				if (this.codeTimer) return
				console.log('in')
				this.codeTimer = 'pre'
				uni.$api.sendRegisterSmsCode({
					mobile: mobile
				}).then(()=>{
					uni.$toast.showSuccess('发送成功')
					this.codeTimerInterval = this.codeTimeInitSecond
					clearInterval(this.codeTimer)
					this.codeTimer = setInterval(()=>{
						if (this.codeTimerInterval == 0){
							clearInterval(this.codeTimer)
							this.codeTimer = ''
							this.codeBtText = '获取验证码'
							return
						}
						this.codeTimerInterval--
						this.codeBtText = this.codeTimerInterval +'s'
						
					},1000)
				}).catch(()=>{
					this.codeTimer = ''
				})
				
			},
			onRegister(){
				let {recUserId,mobile, code, password,isCheck,
				peopleName,peopleCardNumber,ocrName,ocrCardNumber,peopleCardPicA,peopleCardPicB,
				addressAreaId,addressAreaString,addressDesc
				} = this.form
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				if (!code) {
					uni.$toast.showError('请输入验证码'); 
					return;
				}
				if (!password) {
					uni.$toast.showError('请输入密码');
					return;
				}
				uni.$api.h5Register({
					recUserId,mobile,code,password,
					peopleCardPicA: peopleCardPicA,
					peopleCardPicB: peopleCardPicB,
					ocrName: ocrName,
					ocrCardNumber: ocrCardNumber,
					name: peopleName,
					cardNumber: peopleCardNumber,
					addressAreaId,addressAreaString,addressDesc
				}).then(res =>{
					console.log(JSON.stringify(res))
					uni.$auth.loginSuccess(res)
					uni.$toast.showToast("注册成功！");
					uni.navigateTo({
						url: '/pages/login/login'
					});
				})
				
			},
		}
	}
</script>

<style>
page {
	background-color: #fa3936;
}
.container {
	padding: 278rpx 32rpx 130rpx;
	position: relative;
	z-index: 2;
}
.invite-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 0;
}
.invite-logo {
	width: 160rpx;
	height: 160rpx;
	margin: 0 auto 150rpx;
	display: block;
}
.invite-info-box {
	width: 100%;
	height: 310rpx;
	padding-top: 87rpx;
	position: relative;
}
.invite-info-bg {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
.invite-head {
	width: 128rpx;
	height: 128rpx;
	border: 4rpx solid #fff;
	border-radius: 50%;
	background-color: #fff;
	position: absolute;
	left: 0;
	right: 0;
	top: -65rpx;
	margin: 0 auto;
}
.invite-head-img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.download-btn {
	width: 630rpx;
	height: 100rpx;
	color: #D52F2C;
	border: 2rpx solid #d52f2c;
	border-radius: 50rpx;
}
.friend-box {
	width: 100%;
	padding: 32rpx;
	background-color: rgba(255,255,255,0.1);
	margin-top: 532rpx;
	border-radius: 20rpx;
}

.friend-nodata-box {
	margin-top: 532rpx;
	height: 4rpx;
}
.friend-pic {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
.friend-invite-info {
	border-radius: 60rpx;
	height: 60rpx;
	border: 2rpx solid #face78;
}
.fc-fac {
	color: #FACE78;
}
.fc-d52 {
	color: #D52F2C;
}
.form-image-group .form-group {
	height: auto;
}
.form-image-group .form-group image {
	width: 300rpx;
	height: 204rpx;
	margin-bottom: 25rpx;
}
.form {
	width: 100%;
	padding: 80rpx 26rpx 16rpx;
	background-color: #fff;
	border-radius: 20rpx;
	position: relative;
	box-shadow: 0px 13px 46px 0px rgba(182, 0, 5, 0.39);
}
.form-group {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 85rpx;
	border-bottom: 1rpx solid #f6f6f6;
}
.form-group input {
	font-size: 28rpx;
	line-height: 28rpx;
	color: #333;
	flex: 1;
}
.form-group input.code-input {
	width: 160rpx;
}
.pwd-length {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	display: flex;
	align-items: center;
}
.w225 {
	width: 150rpx;
}
.form-group-btn {
	width: 180rpx;
	height: 50rpx;
	border: 1rpx solid #D52F2C;
	border-radius: 25rpx;
	color: #D52F2C;
	font-size: 24rpx;
	line-height: 24rpx;
}
.form-group-phonebtn {
	color: #999999;
	border: 1rpx solid #999999;
}
.mt-12 {
	margin-top: -12px;
}
.mb84 {
	margin-bottom: 84rpx;
}
.cu-dialog {
	background-color: #fff;
}
.cu-form-group {
	background-color: #f6f6f6;
	border-radius: 12rpx;
}
.cu-btn.lg {
	font-size: 28rpx;
	height: 90rpx;
}
.form-icon {
	width: 439rpx;
	height: 60rpx;
	position: absolute;
	left: 0;
	right: 0;
	top: -23rpx;
	margin: 0 auto;
}
.agreement-content {
	max-height: 820rpx;
	background: #FFFFFF;
	opacity: 1;
	border-radius: 12px;
}
.w154 {
	width: 154rpx;
}
.drop-down {
	width: 100%;
	height: 32rpx;
	padding: 0 32rpx 0 0;
	flex: 1;
}
.location-icon {
	width: 40rpx;
	height: 40rpx;
}
.textarea {
	height: auto;
}
.textarea textarea {
	background: #FFFFFF;
	border: 2rpx solid #DDDDE6;
	opacity: 1;
	border-radius: 16rpx;
	padding: 24rpx 32rpx;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #606266;
	width: 100%;
}
.textarea textarea::placeholder {
	color: #c4c4cc;
}


</style>
