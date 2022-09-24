<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-22 22:02:36
 * @FilePath: \varietyShop\frontend\users\src\pages\order\detail.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view class="page_od">
		<uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
        color="#fff"
        backgroundColor="#08A1DB"
        >
        </uni-nav-bar>
		<view class="page_od_main">
			<map
				class="od_map"
				:latitude="user.latitude"
				:longitude="user.longitude"
				:markers="covers"
				:enable-overlooking="true"
				:enable-rotate="true"
				:enable-building="true"
				:enable-3D="true"
				:show-compass="true"
				:show-location="true"
			>
			</map>
		</view>
	</view>
</template>

<script>
import { ref } from 'vue';

	export default{
		setup(){
			const user = ref({
				latitude: 24.87389,
      			longitude: 118.67587,
			})
			const covers = ref([
				{
					id: 1,
					latitude: user.value.latitude,
					longitude: user.value.longitude,
					width: 30,
					height: 35,
					anchor:{x:.5,y:-.2},
					iconPath: 'https://img2.baidu.com/it/u=390829681,3002818272&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663952400&t=dea9b7120e8fe9a9f5b3cb68f854fab8',
					// callout: {
					// 	color: '#000', // 文本颜色
					// 	bgColor: colors[item.status], // 背景色
					// 	borderWidth: 1,
					// 	borderColor: '#000',
					// 	display: "ALWAYS", // 'BYCLICK':点击显示; 'ALWAYS':常显
					// 	fontSize: 15,
					// 	textAlign: 'center', // 文本对齐方式。有效值: left, right, center
					// 	padding: 10, // 文本边缘留白
					// 	borderRadius: 5,
					// 	content: item.name,
					// },
				}
			])
			return {
				user,
				covers
			}
		}
	}
</script>

<style lang="scss" scoped>
	.od_map{
		width: 100%;
		height: 50vh;
	}
</style>