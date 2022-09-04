<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 15:59:19
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 15:28:51
 * @FilePath: \varietyShop\frontend\users\src\components\shop-list\shop-list.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="shop_list_wrapper">
        <uni-list :border="false">
            <uni-list-item 
                :border="false"
                v-for="(item,index) in list"
                :key="index"
            >
            <template v-slot:body>
                <view class="sl_item">
                    <view class="sl_item_left">
                        <uni-badge :inverted="index==0"  :text="index" absolute="rightTop" size="small" >
                            <image :src="item.avatar" mode="aspectFill"/>
                        </uni-badge>
                        <cus-tag text="新店"/>
                    </view>
                    <view class="sl_item_right">
                        <view class="sl_item_name">{{item.name}}</view>
                        <view class="space_between">
                            <view class="flex">
                                <view class="sl_item_score">
                                    <text class="sl_item_score_val">{{item.score}}</text>
                                    <text>分</text>
                                </view>
                                <view>
                                    月售<text>{{item.sales}}</text>
                                </view>
                            </view>
                            <view class="flex_right">
                                <view>{{item.ps_time}}分钟</view>
                                <view class="sl_item_distance">{{item.distance}}</view>
                            </view>
                        </view>
                        <view>
                            <view class="sl_item_mp">起送￥{{item.min_price}}</view>
                            <view>配送￥{{item.ps_price}}</view>
                        </view>
                        <view class="tags_eva">
                            <view v-for="(tag,ti) in item.tags_eva" :key="tag+ti">
                                {{tag}}
                            </view>
                        </view>
                        <view class="tags_money">
                            <view v-for="(tag,ti) in item.tags_money" :key="tag+ti">
                                {{tag}}
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            </uni-list-item>
        </uni-list>

    </view>
</template>

<script>
import { computed, ref, watch } from 'vue';
import CusTag from '../cus-tag/cus-tag.vue';
    export default {
        props:{
                list:{
                type:Array,default:()=>([])
            }
        },
        setup(props){
            const list = computed(()=>props.list)
            return {
                list,
            }
        }
    }
</script>


<style lang="scss" scoped>
    .shop_list_wrapper{
        .uni-list{
            background-color: transparent !important;
        }
    }
    .sl_item{
        width: 100%;
        display: flex;
        font-size: 24rpx;
        color: rgba(0,0,0,.6);
    }
    .sl_item_left{
        width:180rpx;
        margin-right: $space_padding;
        position: relative;
        image{
            width: 100%;
            height: 160rpx;
            border-radius: $space_padding;
        }
        
    }
    .sl_item_left,.sl_item_right{
        display: flex;
        align-items: flex-start;
    }
    .sl_item_right{
        transform: translateY(-.25em);
        flex:1;
        min-height: 100%;
        flex-direction: column;
        &>view,.flex,.flex_right{
            width: 100%;
            display: flex;
        }
        .flex_right{
            justify-content: flex-end;
        }
        .space_between{
            justify-content: space-between;
        }
    }
    .sl_item_name{
        color: #000;
        font-weight: bold;
        font-size: 30rpx;
    }
    .sl_item_score{
        color: $theme_color_im;
        margin-right: $space_padding;
    }
    .sl_item_score_val{font-weight: bold;font-size: 26rpx;}
    .sl_item_distance{margin-left: calc($space_padding / 2);}
    .sl_item_mp{margin-right: calc($space_padding / 1.2);}
    .tags_eva{
        &>view{
            margin-right: calc($space_padding / 1.2);
            background-color: #fff0dd;
            color: #E38352;
            padding:3rpx 8rpx;
            border-radius: 10rpx;
            &:last-child{margin-right: 0;}}
            transform: scale(.9) translateX(-6%);
    }
    .tags_money{
        width: unset !important;
        padding:0 8rpx;
        border-radius: 10rpx;
        border: 1px solid #D75855;
        color: #D75855;
        transform: scale(.9) translateX(-6%);
        &>view{
            position: relative;
            &:not(:first-child){
                padding-left:8rpx;
            }
            &:not(:last-child){
                padding-right:8rpx;
                &::after {
                    content: " ";
                    position:absolute;
                    right: -1px;
                    width: 1px;
                    height: 100%;
                    background:#D75855;
                    transform: scale(.6);
                }
            }
        }
    }
    
    .tags_eva,.tags_money{
        margin-top: calc($space_padding / 5);
    }
</style>