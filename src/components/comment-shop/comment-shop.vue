<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-11 19:45:35
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-12 18:15:51
 * @FilePath: \varietyShop\frontend\users\src\components\comment-shop\comment-shop.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="comment_shop">
    
    <scroll-view class="cs_list" scroll-y
    scroll-with-animation
    @scroll="handleCommentScroll"
    :style="`height:${height}`"
    >
    <view class="cs_top">
        <view class="cs_score_box">
            <view class="sc_score_s">
                <view class="cs_score">4.5</view>
                <view class="cs_s_item">
                <view class="cs_s_label">商家评分</view>
                <uni-rate
                    :readonly="true"
                    :value="4.5"
                    activeColor="#dd524d"
                    :size="20"
                />
                </view>

                <view class="cs_s_item cs_s_item_kw">
                <view class="cs_s_label">口味</view>
                <view>4.8</view>
                </view>
                <view class="cs_s_item cs_s_item_bz">
                <view class="cs_s_label">包装</view>
                <view>4.7</view>
                </view>
            </view>
            <view class="cs_s_item">
                <view class="cs_s_label">配送满意度</view>
                <view>100%</view>
            </view>
        </view>
        <!-- 标签分类 -->
        <!-- <view></view> -->
    </view>
        <uni-list>
            <view v-for="(item,index) in commentList" :key="index"
        class="cs_item"
        >
                <view class="cs_item_uinfo">
                    <view class="cs_item_avatar"><image :src="item.avatar" mode="scaleToFill"/></view>
                    <view>
                        <view>
                            <view class="cs_item_name">{{item.nickname}}</view>
                        </view>
                        <view class="">2022.09.11</view>
                    </view>
                </view>
                <view>
                    <uni-rate
                        :readonly="true"
                        :value="item.rate"
                        activeColor="#dd524d"
                        :size="12"
                    />
                    <text class="cs_item_rate_text">一般</text>
                </view>
                <view>
                    {{item.content}}
                </view>
                <view
                class="comment_imgs">
                    <view v-for="(picture,pi) in item.pictureList"
                        :key="pi"
                        class="cs_img"
                        >
                        <image :src="picture" mode="scaleToFill"/>
                    </view>
                </view>
        </view>
        </uni-list>
    </scroll-view>
  </view>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props:{
        height:{type:String,default:'100vh'}
    },
    setup(props,{emit}){
        const commentList = ref([])
        const height = computed(()=>props.height)
        commentList.value = Array.from(new Array(100),(e,k)=>({
            avatar:"https://tenfei04.cfp.cn/creative/vcg/nowater800/new/VCG41N1359302793.jpg?x-oss-process=image/format,webp",
            nickname:"张"+k,
            rate:k%5,
            content:"好",
            pictureList:Array.from(new Array(2),(v,k)=>(k%2?"https://img1.baidu.com/it/u=3720572290,2769763744&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663088400&t=2aae9c5c17448e5ebb6112112e0fd2f8":"https://tenfei04.cfp.cn/creative/vcg/nowater800/new/VCG41N1359302793.jpg?x-oss-process=image/format,webp"))
            
        }))

        const handleCommentScroll = (e)=>{
            emit("scroll", e.detail.scrollTop);
        }
        return {
            commentList,
            height,
            handleCommentScroll
        }
    }
};
</script>

<style lang="scss" scoped>
.comment_shop {
}
.cs_top{
    padding: $space;
    background: #fff;
    border-radius: 30rpx;
    width: 100%;
    margin-bottom: $space;
}
.cs_score_box {
  display: flex;
  justify-content: space-between;
}
.sc_score_s {
  display: flex;
  align-items: flex-end;
  position: relative;
  &::after {
      content: " ";
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      background: rgba($color: #000, $alpha: 0.1);
      height: 60%;
      transform: translateY(40%);
    }
  .cs_score {
    font-size: 50rpx;
    color: #dd524d;
    margin-right: 15rpx;
  }
}
.cs_s_item {
  color: #000;
  font-weight: bold;
  .cs_s_label {
    font-weight: 400;
    font-size: 24rpx;
    color: rgba($color: #000000, $alpha: 0.6);
  }
  &.cs_s_item_kw,
  &.cs_s_item_bz {
    margin: 0 30rpx;
  }
}
.cs_list{
    padding-top: 0;
    padding: $space;
    border-radius: 30rpx;
    box-sizing: border-box;
}
.cs_item{
    font-size: 24rpx;
    color: rgba($color: #000000, $alpha: .6);
    background: #fff;
    border-bottom: 1px solid #f8f8f8;
    padding: $space;
    &>view{
        display: flex;
        align-items: center;
    }
    .cs_item_uinfo{
        margin-bottom: 15rpx;
    }
    .cs_item_name{
        color: #000;
        font-weight: bold;
        font-size: 28rpx;
    }
    .cs_item_avatar{
        width: 60rpx;
        height: 60rpx;
        margin-right: 15rpx;
        background: red;
        border-radius: 50%;
        overflow: hidden;
        image{width:100%;height: 100%; }
    }
}
.comment_imgs{
    display: flex;
    flex-wrap: wrap;
    .cs_img{
        width:calc((100vw - 120rpx) / 3);
        height:calc((100vw - 120rpx) / 3);
        padding: 15rpx;
        image{width: 100%;height: 100%;}
    }
    
}
.cs_item_rate_text{
    color: rgba($color: #000000, $alpha: 0.6);
    margin-left: 15rpx;
}
</style>
