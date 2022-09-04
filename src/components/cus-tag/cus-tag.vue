<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-03 15:26:52
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 15:40:50
 * @FilePath: \varietyShop\frontend\users\src\components\cus-tag\cus-tag.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="cus_tag">{{ text }}</view>
</template>

<script>
export default {
  props: {
    text: String,
  },
  setup({ text }) {
    return { text };
  },
};
</script>

<style lang="scss" scoped>
.cus_tag {
  position: absolute;
  left: -2rpx;
  top: 4rpx;
  z-index: 9;
  width: 60rpx;
  background: gold;
  font-size: 12px;
  text-align: center;
  border-radius:0 6rpx 6rpx 0;
  &::after {
    content: " ";
    position: absolute;
    width: 6rpx;
    height: calc(100% + 5rpx);
    background-image: linear-gradient(to bottom,gold 90%, #937f0cc4);
    border-radius: 26rpx 0 0 26rpx;
    top: 0px;
    left: -4rpx;
    z-index: -15;
  }
  
}
</style>
