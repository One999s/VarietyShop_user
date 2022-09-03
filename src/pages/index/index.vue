<template>
	<view class="page_index" >
		<uni-nav-bar class="nav_bar_transparent" title="首页" statusBar :border="false"></uni-nav-bar>

		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<div>
			<button @click="handleGo">go</button>
		</div>
	</view>
</template>

<script >
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log(this)
		},
		methods: {
			handleGo(){
				uni.navigateTo({url:"/pages/goods/detail",query:{name:1}})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
