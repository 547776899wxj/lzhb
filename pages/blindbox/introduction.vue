<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>玩法介绍</text>
			</block>
		</cu-custom>
		<view>
			<image class="introduce-info-img" v-for="(item,index) in gameIntroductionAdvList" :key='index' :src="item.advUrl" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameIntroductionAdvList:[],
			};
		},
		onLoad() {
			this.getRuleIntroductionInteger();
		},
		methods:{
			getRuleIntroductionInteger(){
				uni.$api.getRuleIntroductionInteger().then(res =>{
					this.gameIntroductionAdvList = res.gameIntroductionAdvList || []
				})
			},
		}
	}
</script>

<style lang="scss">
.introduce-info-img{
	width: 750rpx;
}
</style>
