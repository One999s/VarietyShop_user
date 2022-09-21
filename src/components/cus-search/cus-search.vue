<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 09:17:12
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-18 17:15:12
 * @FilePath: \varietyShop\frontend\users\src\components\cus-search\cus-search.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view
    :class="{
      cus_search: true,
      fixed: fixed,
    }"
    :style="{
      top: top,
      'padding-left': left,
      'padding-right': `calc(${left} * 1.5)`,
    }"
  >
    <view class="cus_main" @click="()=>handleToSearchPage()">
      <view class="cus_content">
        <uni-icons type="search" color="#000" />
        <view class="cus_search_text">
          <text>美食</text>
        </view>
      </view>
      <view v-if="showRight" class="cus_bt"> 搜索 </view>
    </view>
    <!-- <uni-easyinput :placeholder="placeholder" prefixIcon="search"  trim
        ConfirmType="search"
        >
            <template  #right >
                <button size="mini" v-if="showRight">搜索</button>
            </template>
        </uni-easyinput> -->
  </view>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    bgColor: String,
    showRight: { type: Boolean, default: true },
    fixed: { type: Boolean, default: false },
    top: { type: String || Number, default: "26px" },
    left: { type: String || Number, default: 0 },
  },
  setup(props) {
    const showRight = computed(() => props.showRight);
    const handleToSearchPage = ()=>{
      uni.navigateTo({
         url: `/pages/search/index?`
      });
    }
    return {
      showRight,
      handleToSearchPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.cus_search {
  transition: all 0.2s;
  width: 100%;
  left: 0;
  position: sticky;
  position: -webkit-sticky;
  z-index: 9999;
  font-size: 25rpx;
  .cus_main {
    display: flex;
    border-radius: 50rpx;
    overflow: hidden;
    border: 1px solid $theme_color;
  }
  &.fixed {
    position: fixed;
    top: 0;
  }
  .cus_main > view {
    padding: 8rpx;
  }
  .cus_content {
    flex: 1;
    display: flex;
  }
  .cus_search_text {
    color: rgba($color: #000000, $alpha: 0.7);
  }
  .cus_bt {
    color: #fff;
    padding: 8rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100rpx;
    background: linear-gradient(to right, $theme_color, $theme_color2);
  }
}
</style>
