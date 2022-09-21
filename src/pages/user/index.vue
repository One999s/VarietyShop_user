<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-21 22:06:31
 * @FilePath: \varietyShop\frontend\users\src\pages\user\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view class="theme_icon user_index ">
		<uni-nav-bar class="nav_bar_transparent" statusBar :border="false" title="我的" color="#fff"/>
		<view class="user_bg">
			<view class="cus_card user_info_box">
				<image class="user_avatar" :src="user.avatar" mode="aspectFit" />
				<view>
					<view class="user_name">{{user.nickname}}</view>
					<view>上次登录时间：{{user.lastLoginTime}}</view>
				</view>
			</view>
		</view>
		<view class="user_main">
			<view class="cus_card ubox_vip" v-if="false">
				<view>
					<image :src="appInfo.icon_vip" class="icon_vip"/>
				</view>
			</view>
			
			<view class="cus_card  ubox_order">
				<view class="flex ubox_top">
					<view>我的订单</view>
					<view>全部订单 <uni-icons type="right" /></view>
				</view>
				<view class="flex">
					<view v-for="(item,index) in toolOrderList" :key="index"
					>
						<image :src="item.icon" mode="aspectFit"/>
						<view>{{item.label}}</view>
					</view>
				</view>
			</view>
			
			<view class="cus_card  ubox_tool">
				<view v-for="(item,index) in toolList" :key="index"
				class="ubox_item"
				>
					<image :src="item.icon" mode="aspectFit"/>
					<view>{{item.label}}</view>
				</view>
			</view>

			

			<view class="cus_card  ubox_cards">
				<view v-for="(item,index) in cardList" :key="index"
				class="ubox_item"
				
				>
					<image :src="item.icon" mode="aspectFit"/>
					<view>{{item.label}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {useStore} from '@/common/store/global'
import { storeToRefs } from 'pinia';

export default{
	setup(){
		const store = useStore()
		const {user,appInfo} = storeToRefs(store);
		
		const toolList = [
			{label:'购物车',icon:'/static/icons/ice.png'},
			{label:'收藏',icon:'/static/icons/ice.png'},
			{label:'足迹',icon:'/static/icons/ice.png'},
			{label:'红包卡券',icon:'/static/icons/ice.png'},
		]
		const toolOrderList = [
			{label:'待付款',icon:'/static/icons/ice.png'},
			{label:'待收货',icon:'/static/icons/ice.png'},
			{label:'待使用',icon:'/static/icons/ice.png'},
			{label:'待评价',icon:'/static/icons/ice.png'},
			{label:'退款',icon:'/static/icons/ice.png'},
		] 
		const cardList = [
			{label:'我的地址',icon:'/static/icons/ice.png'},
			{label:'我的地址',icon:'/static/icons/ice.png'},
			{label:'足迹',icon:'/static/icons/ice.png'},
			{label:'红包卡券',icon:'/static/icons/ice.png'},
		]
		console.log(appInfo)
		return {
			user,
			appInfo,
			toolList,
			cardList,
			toolOrderList
		}
	}
}
</script>

<style lang="scss" scoped>
	$top_height:300rpx;
	.user_index{
		.flex{
			display: flex;
			align-items: center;
			flex-direction: row !important;
			justify-content: space-between !important;
		}
	}
	.user_info_box{
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #fff;
		padding: $space;
	}
	.user_avatar{
		width:100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: $space;
		box-shadow: rgb(0 0 0 / 30%) 0px 0px 3px 1px;
	}
	.user_name{font-size: 38rpx;margin-bottom: .3em;}
	.user_bg{
		width: 100%;
		height: $top_height;
		background-image: linear-gradient(to right,$theme_color,$theme_color2);
		position: absolute;
		top: calc(var(--tab-bar-height) - 1px);
		// #ifdef H5
			top: calc(var(--window-top) - 1px);
		// #endif
		z-index: 1;
		border-radius:  0 0 50% 50% / 0 0 20% 20%;
		padding: $space;

	}
	.user_main{
		position: relative;
		z-index: 9;
		margin-top: calc($top_height / 1.5);
		padding: $space;
		.cus_card{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			font-size: 24rpx;
			margin-bottom: $space;
			image{
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 6rpx;
			}
			&>view{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.ubox_tool,.ubox_vip,.ubox_cards,.ubox_order{
		background: rgba($color: #fff, $alpha: .95);
		padding: $space;
	}
	.ubox_vip{
		color: #fff;
		background-image: linear-gradient(to left,rgba($color:$theme_color,$alpha:.3),rgba($color:$theme_color2,$alpha:.3));
	}
	.icon_vip{width:50rpx;height: 50rpx;}
	.ubox_order{flex-direction: column;}
	.ubox_top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1rpx solid rgba($color: #000, $alpha: .1);
		color: rgba(0,0,0,.5);
		
	}
	.ubox_item{
		width: calc(100% / 4);

	}
</style>