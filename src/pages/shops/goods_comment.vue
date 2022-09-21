<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-21 21:27:51
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-21 22:02:42
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\goods_comment.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="page_goods_c">
        <uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
        title="商品评价"
        >
        </uni-nav-bar>
        <view class="nav_box">
            <view v-for="(item,index) in navList"
            :class="{active:item.value==activeNav}"
            :key="index"
            @click="()=>handleChangeActive(item)"
            >
                {{item.label}}{{item.nums}}
            </view>
        </view>
        <view class="pg_c_main">
            <label class="radio" 
            @click="handleRadioChange"
            >
                <radio  
                :checked="valuable" 
                
                color="#08A1DB"
                style="transform:scale(.8)"
                />
                只看有内容的评价
            </label>

            <view class="pg_c_list">
                <view
                v-for="(item,index) in commentList"
                :key="index"
                class="pg_c_item"
                >
                    <image :src="item.avatar"/>
                    <view class="pg_c_item_main">
                        <view>
                            <view>
                                    <view class="pg_c_name">{{item.name}}</view>
                                    <view class="pg_c_tips">{{item.createTime}}</view>
                                </view>
                        </view>
                        <view class="pg_c_content">
                            {{item.content}}
                        </view>
                        <view>
                            <text class="pg_c_tips">TA点赞了该商品</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { ref } from 'vue';

    export default{
        setup(){
            const navList = ref([
                {label:"全部",value:'',nums:9},
                {label:"有图/视频",value:'pv'},
                {label:"最新",value:'new'},
            ])
            const activeNav = ref('');
            const valuable = ref(true);// 只看有内容的评价
            const commentList = ref([])

            const getList = ()=>{
                commentList.value = Array.from(new Array(10),(v,k)=>({
                    avatar:"https://img1.baidu.com/it/u=873106765,2587410047&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663866000&t=43797176bab2a69a9c3dad09d34139fb",
                    name:"Wxasdasd",
                    createTime:"2022.09.19",
                    content:"评论内容"+k
                }))
            }
            const handleChangeActive = (item)=>{
                activeNav.value = item.value;
            }
            const handleRadioChange = e=>{
                valuable.value = !valuable.value
            }
            getList();
            return {
                navList,
                activeNav,
                valuable,
                commentList,
                handleChangeActive,
                handleRadioChange,
            }
        }
    }
</script>

<style lang="scss" scoped>
    $navBoxHeight:100rpx;
    .page_goods_c{
        font-size: 26rpx;
        
    }
    .page_goods_c,.pg_c_main{
        background: $theme_bg;
    }
    .radio{
        margin: 40rpx 0;
    }
    .pg_c_main{
        padding: $space_padding;
        padding-top: calc($navBoxHeight + $space_padding);
    }
    .nav_box{
        height: $navBoxHeight;
        display: flex;
        background: #fff;
        padding: $space_padding;
        position: fixed;
        width: 100%;
        z-index: 9;
        &>view{
            margin-right: 20rpx;
            padding: 15rpx 20rpx;
            background: $theme_bg;
            border-radius: 15rpx;
            &.active{
                background: rgba($color: $theme_color, $alpha: .5);
                color: #fff;
            }
        }
    }

    .pg_c_item{
        display: flex;
        padding: 20rpx;
        background: #fff;
        border-radius: 15rpx;
        margin: 20rpx 0;
        image{
            width:80rpx;height: 80rpx;
            border-radius: 50%;
        }
        .pg_c_item_main{
            padding-left: 20rpx;
        }
        .pg_c_content{
            margin: 15rpx 0;
        }
        .pg_c_name{
            font-weight: bold;
            margin-bottom: 15rpx;
        }
        .pg_c_tips{
            font-size: 22rpx;
            color: rgba($color: #000, $alpha: .5);
        }
    }
</style>