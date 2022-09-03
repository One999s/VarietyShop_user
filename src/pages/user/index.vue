<template>
	<view>
		<uni-nav-bar class="nav_bar_transparent" :title="store.user.nickName||'我的'" statusBar :border="false"></uni-nav-bar>
		用户中心
	</view>
</template>

<script>
import {useStore} from '@/common/store/global'
export default{
	setup(){
		const store = useStore()
		
		var a = {}
		return {
			store
		}
	}
}
</script>

<style>
</style>