<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 14:11:08
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-02 15:56:33
 * @FilePath: \varietyShop\frontend\users\src\components\category\category.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <swiper
    class="category_list"
    :display-multiple-items="5"
    >
        <swiper-item v-for="(item,index) in category" :key="index"
        class="cl_item"
        >
            <view v-for="(citem,cindex) in item" :key="cindex">
                <image :src="citem.icon" mode="aspectFit"
                />
                <view>{{citem.label}}</view>
            </view>
        </swiper-item>
    </swiper>
</template>

<script>
    import { useStore } from '../../common/store/global';
    import {storeToRefs} from 'pinia'
    export default{
        setup(){
            const store = useStore();
            const {category} = storeToRefs(store);
            return {
                category
            }
        }
    }
</script>

<style lang="scss" scoped>
    .category_list{
        height: 360rpx;
        padding: $space_padding 0;
        font-size: 28rpx;
    }
    .cl_item{
        &>view{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: calc(100% / 3);
            padding: 10rpx 0;
        }
    }
</style>