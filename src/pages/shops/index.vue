<!--
 * @Author: one9s 9665730@qq.com
 * @Date:2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 13:42:53
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view id="shopsIndex">
		<uni-nav-bar class="nav_bar_transparent"  :border="false" 
		statusBar
		fixed
		left-text="外卖"
		/>
		<view class="si_main" :style="{'min-height':navTabHeight}">
			<cus-search />
			<category />
			<shop-list :list="state.shopList"/>
		</view>
	</view>
</template>

<script>
import { reactive, ref } from 'vue'
// import {onPageScroll} from '@dcloudio/uni-app'
	export default{
		onPageScroll(e){
			console.log(e)
		},
		setup(){
			const systemInfo = uni.getSystemInfoSync()
			const navTabHeight = (systemInfo.windowHeight - (systemInfo.statusBarHeight + 44))+'px'
			
			const state = reactive({
				shopList:[]
			})
			const shopList = ref([])
			const getList = ()=>{
				state.shopList = Array.from(new Array(20),(v,k)=>({
					name:'店铺'+k,
					score:4.5,
					sales:parseInt(Math.random()*k),
					ps_time:30+k,
					ps_price:20,
					longitude:null,
					latitude:null,
					min_price:15,//起送费
					distance:200+k+'m',
					tags:[],
					avatar:'https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6',
				}))
			}
			setTimeout(()=>{
				getList()
			},1500)

			return {
				state,
				navTabHeight,
				shopList
			}
		}
	}
</script>

<style lang="scss" scoped>
	#shopsIndex{
		// background-image: linear-gradient($theme_color 5%,$theme_color2 15%,#fff) ;
		background-image:linear-gradient(to bottom,#5d8dfd 2%, #9E50F2 15%, #fff 20%)
	}
	.si_main{
		background: $theme_bg;
		border-radius: $space $space 0 0;
		padding: $space_padding;
	}
</style>