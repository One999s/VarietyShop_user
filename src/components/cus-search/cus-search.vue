<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 09:17:12
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-06 14:15:04
 * @FilePath: \varietyShop\frontend\users\src\components\cus-search\cus-search.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template >
    <view class="cus_search">
        <uni-easyinput :placeholder="placeholder" prefixIcon="search"  trim
        ConfirmType="search"
        >
            <template  #right >
                <button size="mini" v-if="showRight">搜索</button>
            </template>
        </uni-easyinput>
    </view>
</template>

<script>


    export default{
        props:{
            placeholder:String,
            bgColor:String,
            showRight:{type:Boolean,default:true},
        },
        setup(props){
            const {placeholder="请输入",showRight} = props;
            console.log(showRight)
            return {
                placeholder,
                showRight
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cus_search{
        transition: all .5s;
    }
</style>