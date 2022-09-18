<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-14 21:40:31
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-17 18:40:18
 * @FilePath: \varietyShop\frontend\users\src\pages\search\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="page_search">
        <uni-nav-bar id="search_navbar" class="nav_bar_transparent"  :border="false" 
		statusBar
		fixed
		>
				<view class="nav_search">
					<view class="nav_back" @click.stop.prevent="handleBack">
                        <uni-icons type="back" :size="16"/>
                    </view>
                    <uni-easyinput 
                    :placeholder="placeholder"
                    :inputBorder="false"
                    confirmType="search"
                    />
                    <view class="nav_handle" @click="handleSearch">
                        <text>搜索</text>
                    </view>
				</view>
		</uni-nav-bar>
        <view class="search_main"
        :style="{
            'min-height':`calc(100vh - ${navBarHeight}px)`
        }">
            <view>
                <view class="search_title">
                    <text>历史搜索</text>
                    <uni-icons type="trash" :size="16"/>
                </view>
                <view class="search_tag_list">
                    <!-- 历史搜索 -->
                    <view v-for="(tag,ti) in state.history"
                    :key="ti"
                    class="search_tag_item"
                    @click="()=>handleChooseTag(tag)"
                    >{{tag}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getCurrentInstance, nextTick, reactive, ref } from 'vue';

    export default{
        setup(){
            const instance = getCurrentInstance();
            const navBarHeight = ref(0);

            const state = reactive({
                history:["gg","咖啡"].concat(Array.from(new Array(10),(v,k)=>(`咖啡${k}`)))
            })
            const placeholder = ref('美食');

            const handleBack = ()=>{
                uni.navigateBack({
                    delta:1
                });
            }
            const handleSearch = ()=>{
                console.log(placeholder.value)
            }
            const handleChooseTag = (tag)=>{
                console.log(tag)
            }
            const setBarHeight = ()=>{
               nextTick(()=>{
                    let query = uni.createSelectorQuery().in(instance);
                    query
                        .select("#search_navbar")
                        .boundingClientRect((data) => {
                            navBarHeight.value = data.height;
                        })
                        .exec();
               })
            }
            setBarHeight()
            return {
                placeholder,
                navBarHeight,
                state,
                handleBack,
                handleSearch,
                handleChooseTag,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page_search{
        background: $theme_bg;
        font-size: 26rpx;
        .search_title{
            font-size: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &>text{
                color: #000;
                font-weight: bold;
            }
        }
    }
    .nav_back{
        box-sizing: border-box;
        padding: 10rpx;
        padding-right: 0;
    }
    .nav_search{
        background: #fff;
        flex: 1;
        height: 70%;
        display: flex;
        margin: auto;
        align-items: center;
        border-radius: 30rpx;
        input{
            flex:1;
            padding-left: 0 !important;
        }
    }
    .nav_handle{
        padding: 10rpx 20rpx;
        color: #000;
        font-weight: 600;
        position: relative;
        &::after{
            content: " ";
            position:absolute;
            height: 50%;
            width: 1px;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            background: rgba($color: #000000, $alpha: .2);
        }
    }
    .search_main{
        background:#fff;
        border-radius: 30rpx 30rpx 0 0 / 30rpx 30rpx 0 0;
        padding: $space;

    }
    .search_tag_list{
        display: flex;
        flex-wrap: wrap;
        margin: 20rpx 0;
        .search_tag_item{
            background: $theme_bg;
            padding:3rpx 20rpx;
            border-radius: 10rpx;
            margin-bottom: 20rpx;
            &:not(:last-child){margin-right: 10rpx;}
        }

    }
</style>