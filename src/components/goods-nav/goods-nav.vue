<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-11 11:49:58
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-11 17:36:25
 * @FilePath: \varietyShop\frontend\users\src\components\goods-nav\goods-nav.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="goods_nav">
        <view class="gn_tools">
            <view
            class="gn_detail"
            >
                <view class="cart_iconbox">
                    <uni-badge size="small" :text="!cartList.length?0:6" absolute="rightTop" type="primary"
                    :offset="[15,40]"
                    :is-dot="!cartList.length"
                    :inverted="!cartList.length"
                    >
                        <image 
                        :class="{nosatisfy:!cartList.length}"
                        src="/static/images/goods_nav.png" mode="widthFix"/>
                    </uni-badge>
                </view>
                <view :class="{
                    'gn_detail_text':true,
                    'gn_detail_text_nonums':!cartList.length
                }">
                    <view v-if="cartList.length">
                        <view class="gn_price">￥<text>31</text></view>
                        <view class="gn_original_price">￥<text>32</text></view>
                    </view>
                    <view v-else>
                        <view class="gn_price">￥<text>0</text></view>
                    </view>
                    <view>
                        <view>预估另需配送费</view>
                        <view>￥<text>0</text></view>
                    </view>
                </view>
            </view>
            <view :class="{
                gn_right:true,
                gn_submit:satisfy
            }">
                <view >
                    <text v-if="satisfy">去结算</text>
                    <text v-else>
                        差￥10起送
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        props:{
            startprice:String||Number,
            cartList:{type:Array,default:()=>([])}
        },
        setup(props){
            const {startprice,cartList} = props;
            const satisfy = false;
            return {
                cartList,
                startprice,
                satisfy
            }
        }
    }
</script>

<style lang="scss" scoped>
    $gn_padding:20rpx;
    $gn_card:120rpx;
    $gn_padding_td:30rpx;
    .goods_nav{
        // position: sticky;
        // position: -webkit-sticky;
        position: fixed;
        z-index:999;
        width: 100%;
        left: 0;
        bottom: 0;
        padding: $gn_padding $gn_padding_td;
        background: #fff;
    }
    .cart_iconbox{
        position: absolute;
                bottom: $gn_padding;
                left:$gn_padding_td ;
    }
    .gn_tools{
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 40rpx;
        overflow: hidden;
        font-size: 24rpx;
        background: rgb(34, 34, 34);
        .gn_detail,.gn_submit{height: 100%;}
        .gn_detail{
            flex:1;
            color: #fff;
            padding: 10rpx;
            padding-left: $gn_card;
            
            image{
                width: $gn_card;
                height: $gn_card;
                &.nosatisfy{
                    filter: grayscale(1); // 未满足起送条件 图片灰度
                }
            }
            .gn_detail_text{
                font-size: 20rpx;
                height: 100%;
                &.gn_detail_text_nonums{
                    display: flex;
                    align-items: center;
                    .gn_price{
                        padding-right: 10rpx;
                        margin-right: 10rpx;
                        position: relative;
                        &::after{
                            content: " ";
                            position:absolute;
                            right:0;
                            width: 1px;
                            background:rgba($color: #fff, $alpha: .5);
                            height: 60%;
                            transform: translateY(40%);
                        }
                    }
                }
                .gn_price{
                    font-size: 30rpx;
                }
                &>view{
                    display: flex;
                    align-items: center;
                }
            }
        }
        .gn_right{
            padding: 0 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,.8);
            &.gn_submit{
                color: #000;
                font-size: 30rpx;
                background-image:linear-gradient(to right,$theme_color, $theme_color2);
            }
        }
    }
    .gn_original_price{
        font-size: 22rpx;
        color: rgba(255,255,255,.8);
        text-decoration: line-through;
    }
</style>