<!--
 * @Author: one9s 9665730@qq.com
 * @Date:2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-13 12:57:20
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view id="shopsIndex">
		<uni-nav-bar class=""  :border="false" 
		statusBar
		fixed
		:backgroundColor="navBgColor"
		>
			<template #left>
				<view class="nav_address">
					<text :style="`color:${navColor}`">泉州</text>
					<uni-icons type="bottom" :size="14" :color="navColor"/>
				</view>
			</template>
		</uni-nav-bar>
		<view class="si_main" :style="{'min-height':navTabHeight}">
			<cus-search />
			<category />
			<shop-list :list="state.shopList"/>
			<uni-load-more :status="status"></uni-load-more>

		</view>
	</view>
</template>

<script>
import { reactive, ref } from 'vue'
import {onPageScroll} from '@dcloudio/uni-app'
	export default{
		setup(){
			const systemInfo = uni.getSystemInfoSync()
			const navTabHeight = (systemInfo.windowHeight - (systemInfo.statusBarHeight + 44))+'px'
			
			const state = reactive({
				shopList:[]
			})
			const shopList = ref([])
            const status = ref("loading")
			const navColor = ref(`rgba(255,255,255,1)`)
			const navBgColor = ref(`rgba(255,255,255,0)`)
			
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
					tags_eva:["网红店","热情掌柜"],
					tags_money:["30减2","50减6"],
					tags_other:[],
					avatar:'https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6',

				}))
			}

			onPageScroll(e=>{
				if(e.scrollTop>60) return;
				let num = Number(e.scrollTop/44).toFixed(2)
				navBgColor.value = `rgba(255,255,255,${Number(e.scrollTop/44).toFixed(2)})`
				navColor.value = num>0.5?`rgba(0,0,0,${num})`:`rgba(255,255,255,${1-num})`

			})


			setTimeout(()=>{
				getList()
			},1500)

			return {
				state,
				navTabHeight,
				shopList,
				status,
				navColor,
				navBgColor,
			}
		}
	}
</script>

<style lang="scss" scoped>
	#shopsIndex{
		// background-image: linear-gradient($theme_color 5%,$theme_color2 15%,#fff) ;
		background-image:linear-gradient(to bottom,$theme_color 2%, $theme_color2 15%, #fff 20%)
	}
	.si_main{
		background: $theme_bg;
		border-radius: $space $space 0 0;
		padding: $space_padding;
	}
	.nav_address{
		display: flex;
		align-items: center;
		&>text{margin-right: 10rpx;}
	}
</style>