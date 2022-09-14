<template>
    <view class="shop_info">
        <view class="si_main">
            <view class="si_name" style="margin:0">{{detail.name}}</view>
            <view class="si_area_phone">
                <view class="si_address">
                    <uni-icons type="location" :size="18"/>
                    <text>
                        {{detail.address}}
                    </text>
                </view>
                <view class="theme_icon si_phone">
                    <uni-icons type="phone" :size="28"/>
                </view>
            </view>
            <scroll-view scroll-x class="si_picture_list">
                <view v-for="(picture,pi) in detail.pictureList"
                    :key="pi"
                    class="si_picture"
                    >
                    <image :src="picture" mode="aspectFill"/>
                </view>
            </scroll-view>
            <!-- <view>
                <view class="si_name">食品安全</view>
                <view>

                </view>
            </view> -->
            <view class="si_shop_info">
                <view class="si_name">商家信息</view>
                <view>
                    商品品类：<text>{{detail.categoryName}}</text>
                </view>
                <view>
                    营业时间：<text>{{detail.doBusiness.week}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { ref } from 'vue';

    export default {
        setup(){
            const detail = ref({
                name:"店铺0001",
                address:"福建省泉州市搭嘎gas大时代奥术大师大阿萨啊阿斯达阿萨请问去",
                phone:"13000000000",
                pictureList:new Array(12).fill(
                    "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
                ),
                categoryName:"汉堡薯条",
                doBusiness:{
                    startTime:"09:00",
                    endTime:"21:05",
                    week:"周一至周日"
                },
                services:[{label:"到店自取"}]
            })


            return {
                detail
            }
        }
    }
</script>


<style lang="scss" scoped>
    .si_main{
        background: #fff;
        padding: $space;
        view:not(:last-child){
            margin-bottom: 20rpx;
        }
    }
    .si_name{
        font-weight: bold;
        font-size: 26rpx;
    }
    .si_area_phone{
        display: flex;
        justify-content: space-between;
        &>view{
            display: flex;
            align-items: center;
        }
    }
    .si_address{
        color: rgba($color: #000000, $alpha: .6);
        font-size: 24rpx;
        padding:15rpx 20rpx 15rpx 0;

    }
    .si_phone{
        align-items: flex-start;
    }
    .si_picture_list{
        white-space: nowrap;
        margin-bottom: $space;
        .si_picture{
            display: inline-block;
            width: 120rpx;
            height: 120rpx;
            border-radius: 15rpx;
            overflow: hidden;
            margin-bottom: 0 !important;
            &:not(:last-child){
                margin-right: 15rpx;
            }
            image{width: 100%;height: 100%;}
        }
    }
    .si_shop_info{
        &>view:not(.si_name){
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: rgba($color: #000000, $alpha: .6);
        }
    }
</style>