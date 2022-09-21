<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-21 22:07:59
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-21 23:07:03
 * @FilePath: \varietyShop\frontend\users\src\pages\user\address_edit.vue
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
        :title="navTitle"
        backgroundColor="#08A1DB"
        color="#fff"
        >
        </uni-nav-bar>
        <map style="width: 100%; height: 300rpx;"
        :latitude="detail.latitude"
        :longitude="detail.longitude"
        :markers="covers"
        :enable-scroll="false"
        :enable-zoom="false"
        :enable-rotate="false"
        >
		</map>
        <cover-view class="p_a_main">
            <view class="p_a_card">
                adsa
            </view>
        </cover-view>
    </view>
</template>

<script>
import { ref } from 'vue';
import locationFn from '@/common/utils/location.js'
    export default{
        setup(){
            const navTitle = ref("新增收获地址")
            const detail = ref({
                latitude:'',
                longitude:'',
                address:"泉州信息工程学院",
                detailed:"光大银行旁",
                name:"Q",
                mobile:"13333333333",
            })
            const covers = ref([])
            locationFn.getLocation()
            .then(res=>{
                detail.value.latitude = res.latitude;
                detail.value.longitude = res.longitude;
                covers.value = [
                    {
                        id:0,
                        width:35,height:50,
                        latitude: res.latitude,
                        longitude: res.longitude,
                    }
                ]
            })
            return {
                navTitle,
                detail,
                covers
            }
        }
    }
</script>


<style lang="scss" scoped>
    .p_a_main{
        padding: $space_padding;
        transform: translateY(-150%);
        border-radius: 15rpx;
        
    }
    .p_a_card{
        background: #fff;
        border-radius: 15rpx;
        padding: $space_padding;
    }
</style>