<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-06 21:37:34
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-11 22:05:10
 * @FilePath: \varietyShop\frontend\users\src\components\category-list\category-item.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="theme_icon cate_item_box">
        <view class="cate_item_img">
            <image :src="item.imgSrc" mode="aspectFill"/>
        </view>
        <view class="cate_item_main">
            <view class="cim_name">{{item.name}}</view>
            <view class="cate_item_tags">
                <view
                    v-for="(item,index) in ['1人份','原味','米']"
                    :key="index"
                    class="cim_tag"
                    >
                    {{item}}
                </view>
                <text>水饺*5 + 水饺*5 + 水饺*5</text>
            </view>
            <view class="cim_sales">月售 <text>28</text></view>
            <view class="cim_footer">
                <view class="cim_price_box">
                    <text>￥</text>
                    <text class="cim_price">17</text>
                    <text class="cim_price_start">起</text>
                </view>
                <view>
                    <view class="cim_tool">
                        <view class="cim_del" v-if="false">—</view>
                        <view class="cim_nums" v-if="false">1</view>
                        <view class="cim_add">
                            <uni-icons type="plusempty" />
                        </view>
                    </view>
                    <!-- <uni-badge :text="8" absolute="rightTop"  size="small">
                        <view class="cim_choose">选规格</view>
                    </uni-badge> -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import uniIcons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
    export default {
  components: { uniIcons },
        props:{
            item:{type:Object,default:()=>({})}
        },
        setup(props){
            const {item} = props;
            return {
                item
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cim_name{
        font-weight: bold;
    }
    .cate_item_box{
        margin: 30rpx 15rpx;
        margin-left: 0;
        display: flex;
        .cate_item_img{
            width:160rpx;height: 160rpx;
            // background: #fcfcfcd4;
            background: red;
            border-radius: 10rpx;
            overflow: hidden;
            image{width:100%;height: 100%;}
        }
        .cate_item_main{
            padding-left: 10rpx;
            flex: 1;
            transform: translateY(-0.25em);
        }
        .cate_item_tags{
            display: flex;
            flex-wrap: wrap;
            font-size: 22rpx;
            margin: 6rpx 0;
            .cim_tag{
                background: #F8F8F8;
                margin-right: 10rpx;
                padding:3rpx 6rpx;
                border-radius: 6rpx;
            }
            text{
                margin: 6rpx 0;
            }
        }
        .cim_sales{
            font-size: 20rpx;
            color: rgba($color: #000000, $alpha: .7);
        }
        .cim_footer{
            margin-top: 10rpx;
            font-size: 22rpx;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .cim_price_box{
            color: #dd524d;
            font-weight: 600;
            .cim_price{
                font-size: 28rpx;
            }
            .cim_price_start{
                color: rgba($color: #000000, $alpha: .6);
                font-weight: 500;
            }
        }
        .cim_choose{
		    background-image:linear-gradient(to right,$theme_color, $theme_color2);
            padding: 4rpx 8rpx;
            border-radius: 12rpx;
            color: rgba(0,0,0,.8);
        }
        .cim_tool{
            display: flex;
            align-items: center;
            &>view{
                padding: 8rpx;
                border-radius: 10rpx;
                padding: 5rpx;
                border-radius: 50%;
                min-width: 40rpx;
                min-height: 40rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cim_add,.cim_del{font-weight: bold;}
            .cim_add{
		        background-image:linear-gradient(to right,$theme_color, $theme_color2);
            }
            .cim_del{
                border: 1px solid $theme_color;
            }
        }
    }
</style>