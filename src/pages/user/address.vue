<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-21 22:07:59
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-21 22:34:38
 * @FilePath: \varietyShop\frontend\users\src\pages\user\address.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="page_address">
        <uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
        title="收获地址"
        backgroundColor="#08A1DB"
        color="#fff"
        >
        </uni-nav-bar>
        <view class="p_a_add">
            <uni-icons type="plusempty" color="#fff"/>
        </view>
        <view class="p_a_main">
            
            <uni-swipe-action class="p_a_list">
                <uni-swipe-action-item
                    :right-options="options"
                    v-for="(item,index) in addressList"
                    :key="index"
                >
                 <view class="p_a_item">
                    <view class="p_a_item_main">
                        <view class="p_a_address">
                            <text v-if="index===0">常用</text>
                            {{item.address}} {{item.detailed}}
                        </view>
                        <view class="p_a_item_u">
                            <view>{{item.name}}</view>
                            <view>{{item.mobile}}</view>
                        </view>
                    </view>
                    <view>
                        <uni-icons type="compose" color="#e6e6e6" size="24"/>
                    </view>
                 </view>
                </uni-swipe-action-item>
            </uni-swipe-action>
        </view>
    </view>
</template>

<script>
import { ref } from 'vue';

    export default{
        setup(){
            const addressList = ref([])
            const options = ref([
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#dd524d'
                    }
                }
            ])
            addressList.value = Array.from(new Array(10),(v,k)=>({
                address:"泉州信息工程学院",
                detailed:"光大银行旁",
                name:"Q"+k,
                mobile:"1333333333"+k,

            }))
            return {
                addressList,
                options,
            }
        }
    }
</script>


<style lang="scss" scoped>
    .p_a_main{
        padding: $space_padding;
        margin-top: 20rpx;
    }
    .p_a_item{
        font-size: 26rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $space_padding;
        border-bottom: 1px solid rgba($color: #000, $alpha: .03);
        .p_a_item_main{
            &>view{
                display: flex;
            }
        }
        .p_a_item_u{
            color: rgba($color: #000000, $alpha: .65);
            &>view:not(:last-child){margin-right: 20rpx;}
        }
    }
    .p_a_address{
        font-weight: bold;
        font-size: 30rpx;
        margin-bottom: 10rpx;
    }
    .p_a_add{
        position: fixed;
        left: 5rpx;
        width:50rpx;
        height: 50rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
		background-image: linear-gradient(to right,$theme_color,$theme_color2);
        
    }
</style>