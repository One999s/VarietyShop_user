<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-24 13:46:41
 * @FilePath: \varietyShop\frontend\users\src\pages\order\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view class="page_order">
		<uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
		backgroundColor="#fff"
        >
		<template #left>
			<view class="po_tabs">
				<view
				v-for="(item,index) in tabsList"
				:key="index"
				:class="{
					'tab_item':true,
					'active':item.value==tabActive
				}"
				@click="()=>handleChangeTab(item)"
				>
					<uni-badge  absolute="rightTop">{{item.label}}</uni-badge>
				</view>
			</view>
		</template>
        </uni-nav-bar>
		
		<view class="po_main">
			<view class="po_card">
				<view class="po_title">
					最近常买 <uni-icons type="right" color="rgba(0,0,0,.4)"/>
				</view>
				<view>
					<scroll-view scroll-x
					class="often_list"
					>
						<view
						v-for="(item,index) in oftenShop"
						:key="index"
						class="often_item"
						>
						<view class="often_item_top">
							<image :src="item.imgSrc" />
							<view class="often_item_buy">买过{{item.buyTime}}次</view>
						</view>
						<view>
							{{item.name}}
						</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<view>
				<view class="po_card po_order_item"
				v-for="(shop,index) in orderList"
				:key="index"
				>
					<view class="po_order_shop">
						<view>
							<image :src="shop.imgSrc"/>
							<text class="shop_name">{{shop.name}}</text>
							<uni-icons type="right" color="rgba(0,0,0,.4)" :size="13"/>
						</view>
						<view class="po_tips">
							已送达
						</view>
					</view>
					<view class="shop_tips">
						<view class="po_type_cc">超出配送范围</view>
						<view class="po_type_yd" v-if="false">接受预定中</view>
					</view>
					<view class="po_goods_box">
						<scroll-view
						v-if="shop.goods.length>1"
						class="po_goods_list"
						scroll-x
						>
							<view
							v-for="(goods,gi) in shop.goods"
							:key="gi"
							class="po_goods_item"
							>
								<image :src="goods.imgSrc" />
							</view>
						</scroll-view>
						<view v-if="shop.goods.length==1"
						class="po_goods_item"
						>
							<image :src="shop.goods[0].imgSrc"/>
							<view>
								{{shop.goods[0].name}}
							</view>
						</view>

						<view class="po_goods_box_right">
							<view>
								￥<text class="po_order_price">10</text>
							</view>
							<view class="po_tips">
								共{{shop.goods.reduce((pre,cur)=>(pre?.nums||pre)+cur.nums,0)}}件
							</view>
						</view>
					</view>
					<view class="shop_footer">
						<button type="default" plain="true" size="mini">评价</button>
						<button type="primary" plain="true" size="mini">再来一单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { ref } from 'vue';
import uniIcons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue';

	export default{
  components: { uniIcons },
		setup(){
			const tabsList = ref([
				{label:"全部",value:""},
				{label:"待付款",value:"wait_pay"},
				{label:"待收货",value:"wait_done"},
				{label:"待评价",value:"wait_comment"},
			])
			const tabActive = ref("");

			const oftenShop = ref([]);//最近常买
			const orderList = ref([]);// 订单列表
			const handleChangeTab = (item)=>{
				tabActive.value = item.value;
			}


			oftenShop.value = Array.from(new Array(10),(v,k)=>({
				imgSrc:"https://img1.baidu.com/it/u=3564880749,765979212&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
				name:"商家"+k,
				buyTime:k+1

			}))
			orderList.value = Array.from(new Array(10),(v,k)=>({
				imgSrc:"https://img1.baidu.com/it/u=3564880749,765979212&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
				name:"商家"+k,
				buyTime:k+1,
				goods: Array.from(new Array(k+1),(v,k)=>({
					imgSrc:"https://img1.baidu.com/it/u=3564880749,765979212&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
					name:"嘎嘎大三大四的阿斯达",
					nums:k+1,
					price:10+k,
				}))

			}))
			return {
				tabsList,
				tabActive,
				oftenShop,
				orderList,
				handleChangeTab,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.po_tabs{
		display: flex;
		align-items: center;
		font-size: 30rpx;
		&>view{
			margin-right: 20rpx;
			position: relative;
			letter-spacing: 2rpx;
			&.active{
				font-weight: bold;
				&::after{
				position: absolute;
				content: "";
				bottom: -3rpx;
				width: 60%;
				left: 20%;
				height: 6rpx;
				background: $theme_color;
			}
			}
		}
	}
	.po_main{
		padding: $space_padding;
		font-size: 26rpx;
	}
	.po_card{
        background: #fff;
        border-radius: 20rpx;
        padding:$space_padding;
        position:relative;
        overflow: hidden;
        box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
		margin: 20rpx 0;

    }
	.po_title{
		font-weight: bold;
		font-size: 30rpx;
	}
	.often_list{
		width: 100%;
		white-space: nowrap;
		
	}
	.often_item{
		width: 150rpx;
		display: inline-flex;
		flex-direction: column;
		&:not(:last-child){margin-right: 20rpx;}

		image{
			width: 100%;
			height: 100%;
			border-radius: 15rpx;
		}
		&>view{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.often_item_top{
			height: 150rpx;

			position: relative;
			.often_item_buy{
				position: absolute;
				bottom: 0;
				left: 0;
				padding: 6rpx;
				background: rgba($color: #000000, $alpha: .7);
				color: #fff;
				border-radius: 6rpx;
				font-size: 24rpx;
			}
		}
	}
	.po_order_shop{
		&,&>view,uni-icons{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		image{width: 60rpx;height: 60rpx;border-radius: 10rpx;}
		.shop_name{font-size: 30rpx;font-weight: bold;margin: 0 10rpx;}

	}
	.po_tips{
		font-size: 24rpx;
		color: rgba($color: #000000, $alpha: .4);
	}
	.po_goods_box{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 0;
	}
	.po_goods_list{
		white-space: nowrap;
		flex:1;
		overflow: hidden;
		margin-right: 20rpx;

		.po_goods_item:last-child{
			image{
				margin-right: 0;
			}
		}
	}
	.po_goods_item{
		display: inline-flex;
		align-items: center;
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
	.po_goods_box_right{
		margin-left: 20rpx;
	}
	.po_order_price{
		font-size: 30rpx;
	}

	.shop_tips{
		margin: 10rpx 0;
		[class^=po_type_]{
			padding:3rpx 6rpx;
			font-size: 24rpx;
			border-radius: 6rpx;
			color: #fff;
			display: inline-flex;
		}
		.po_type_cc{
			background: rgba($color: #000000, $alpha: .5);
		}
		.po_type_yd{
			background: $theme_color2;
		}
	}
	.shop_footer{
		display: flex;
		justify-content: flex-end;
		&>view,&>button{
			margin-left: 15rpx;
			border-radius: 50rpx;
			height: 55rpx;
			display: flex;
			align-items: center;
		}
	}
</style>