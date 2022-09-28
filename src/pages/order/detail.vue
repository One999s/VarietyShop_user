<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-28 19:42:03
 * @FilePath: \varietyShop\frontend\users\src\pages\order\detail.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view
    class="page_od"
    :style="{
      background: touchBoxTop == navBarHeight ? '#08A1DB' : '',
    }"
  >
    <uni-nav-bar
      :border="false"
      statusBar
      fixed
      color="#fff"
      :backgroundColor="touchBoxTop == navBarHeight ? '#08A1DB' : ''"
      :class="{
        nav_bar_transparent: touchBoxTop != navBarHeight,
      }"
      id="od_navBar"
    >
      <template #left>
        <view class="nav_left_box">
          <uni-icons type="back" color="#fff" />
        </view>
      </template>
    </uni-nav-bar>
    <view class="page_od_main">
      <map
        v-if="showMap"
        class="od_map"
        :latitude="user.latitude"
        :longitude="user.longitude"
        :markers="covers"
        :enable-overlooking="true"
        :enable-rotate="true"
        :enable-building="true"
        :enable-3D="true"
        :show-compass="true"
        :show-location="true"
      >
      </map>

      <view
        v-if="touchBoxTop == navBarHeight"
        :class="{
          'order_type_box':true
        }"

        :style="{
          top: `-${titleTop}px`,
          left: `${titleTop > 0 ? titleTop + 6 : 0}%`,
          transform:`translateX(-${titleTop > 0 ? titleTop + 6 : 0}%)`
        }"
      >
        <!-- 订单已送达 -->
        <text>待支付</text>
        <view
        v-if="titleTop!=44"
        :style="{
          'opacity':((44-titleTop) / 44)
        }"
        >
          ，
           <uni-countdown
            :show-day="false"
            :showHour="false"
            :minute="15" :second="0"
            color="#fff"
            splitorColor="#fff"
            />
        </view>
       

      </view>
      <scroll-view
        :scroll-y="touchBoxTop == navBarHeight"
        enable-flex
        class="touch_box"
        @scroll="handleScroll"
        @touchstart="(e) => (showMap ? handleBoxToucStart(e) : {})"
        @touchmove="(e) => (showMap ? handlehBoxTouchMove(e) : {})"
        @touchend="(e) => (showMap ? handleBoxTouchEnd(e) : {})"
        :style="{
          transform: `translateY(${touchBoxTop}px)`,
          height: `calc(100vh - ${navBarHeight}px)`,
          background: touchBoxTop == navBarHeight ? '#08A1DB' : '',
        }"
      >
        <view
          class="order_type_box"
          v-if="touchBoxTop == navBarHeight"
          style="opacity: 0"
          >订单已送达</view
        >
        <view class="touch_box_content">
          <view class="cus_card card_item">
            <view>
              <view>预计送达时间</view>
              <view class="ps_type_box"><text>商家自配</text></view>
            </view>
            <view class="ps_time"> 18:43 </view>
            <view class="order_handle">
              <view>
                <uni-icons type="close" size="24" />
                取消订单
              </view>
              <view>
                <uni-icons type="chatboxes" color="#dd524d" size="24" />
                <text style="color: #dd524d">联系商家</text>
              </view>
            </view>
          </view>

          <view class="cus_card card_item">
            <view>
              <view class="shop_name">
                商店名
                <uni-icons type="right" color="rgba(0,0,0,.3)" />
              </view>
            </view>

            <view
              v-for="(item, index) in new Array(3).fill(1)"
              :key="index"
              class="goods_item"
            >
              <view class="goods_item_l">
                <image
                  :src="'https://img2.baidu.com/it/u=390829681,3002818272&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663952400&t=dea9b7120e8fe9a9f5b3cb68f854fab8'"
                />
                <view>
                  <view>白米饭</view>
                  <view class="od_tips">微辣</view>
                  <view class="od_tips">x{{ index }}</view>
                </view>
              </view>
              <view class="order_price_item">
                <view
                  >实付￥<text class="od_price">{{ index * 2 }}</text></view
                >
                <view class="od_tips">￥{{ index }}</view>
              </view>
            </view>
            <view>
              <view>包装费</view>
              <view class="order_price_item">
                <view>实付￥<text class="od_price">1</text></view>
                <view class="od_tips">￥3</view>
              </view>
            </view>
            <view>
              <view>配送费</view>
              <view class="order_price_item">
                <view>实付￥<text class="od_price">1</text></view>
                <view class="od_tips">￥3</view>
              </view>
            </view>
            <view class="order_sh_box">
              <view>
                <view>收货信息</view>
                <view
                  >阿斯打扫打扫大所大所大所大所多，奥术大师大
                  Q先生（13111111111）</view
                >
              </view>
              <view>
                <view>备注</view>
                <view>依据参量提供餐具</view>
              </view>
              <view>
                <view>订单号码</view>
                <view
                  >123123123123 <uni-icons type="right" color="rgba(0,0,0,.3)"
                /></view>
              </view>
            </view>
          </view>

          <view class="guess_like_box" v-if="guessLikeList.length">
            <view class="line_text"><text>猜你喜欢</text></view>
            <view class="guess_like_list">
              <view v-for="(item, index) in guessLikeList" :key="index"> </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { getCurrentInstance, ref, nextTick } from "vue";
import { useStore } from "../../common/store/global";

export default {
  setup() {
    const instance = getCurrentInstance();
    const { systemInfo } = useStore();
    const user = ref({
      latitude: 24.87389,
      longitude: 118.67587,
    });
    const covers = ref([
      {
        id: 1,
        latitude: user.value.latitude,
        longitude: user.value.longitude,
        width: 30,
        height: 35,
        anchor: { x: 0.5, y: -0.2 },
        iconPath:
          "https://img2.baidu.com/it/u=390829681,3002818272&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663952400&t=dea9b7120e8fe9a9f5b3cb68f854fab8",
        // callout: {
        // 	color: '#000', // 文本颜色
        // 	bgColor: colors[item.status], // 背景色
        // 	borderWidth: 1,
        // 	borderColor: '#000',
        // 	display: "ALWAYS", // 'BYCLICK':点击显示; 'ALWAYS':常显
        // 	fontSize: 15,
        // 	textAlign: 'center', // 文本对齐方式。有效值: left, right, center
        // 	padding: 10, // 文本边缘留白
        // 	borderRadius: 5,
        // 	content: item.name,
        // },
      },
    ]);
    const navBarHeight = systemInfo.statusBarHeight + 44;
    const scrollYTemp = ref(0);
    const touchTempTop = ref(0);
    const titleTop = ref(0);
    const showMap = ref(false);
    const touchBoxDefaultTop = ref(systemInfo.screenHeight * 0.8);
    const touchBoxTop = ref(0);
    const guessLikeList = ref([]); // 猜你喜欢列表

    const handlehBoxTouchMove = (e) => {
      const { pageY } = e.changedTouches[0];
      if (!scrollYTemp.value) {
        scrollYTemp.value = pageY - touchBoxTop.value;
      }

      let scrollY = pageY - scrollYTemp.value;
      console.log(scrollY);

      if (scrollY <= navBarHeight) {
        scrollY = navBarHeight;
      }
      if (scrollY >= touchBoxDefaultTop.value) {
        scrollY = touchBoxDefaultTop.value;
      }
      touchBoxTop.value = scrollY;
    };
    const handleBoxTouchEnd = (e) => {
      scrollYTemp.value = 0;
      let tempTop = touchTempTop.value;

      if (tempTop == navBarHeight) {
        // 从上往下滑
        if (touchBoxTop.value > navBarHeight + 100) {
          touchBoxTop.value = touchBoxDefaultTop.value;
        } else {
          touchBoxTop.value = navBarHeight;
        }
      } else {
        // 从下往上滑
        if (touchBoxTop.value > touchBoxDefaultTop.value - 100) {
          touchBoxTop.value = touchBoxDefaultTop.value;
        } else {
          touchBoxTop.value = navBarHeight;
        }
      }
    };
    const handleBoxToucStart = (e) => {
      touchTempTop.value = touchBoxTop.value;
    };

    touchBoxTop.value = showMap.value ? touchBoxDefaultTop.value : navBarHeight;

    const handleScroll = (e) => {
      titleTop.value =
        (44 / 20) * (e.target.scrollTop >= 20 ? 20 : e.target.scrollTop);
    };

    return {
      user,
      covers,
      touchBoxTop,
      navBarHeight,
      showMap,
      titleTop,
      guessLikeList,
      handlehBoxTouchMove,
      handleBoxTouchEnd,
      handleBoxToucStart,
      handleScroll,
    };
  },
};
</script>

<style lang="scss" scoped>
.page_od {
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
}
.page_od_main {
  flex: 1;
}
.od_map {
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 0;
}
.nav_left_box {
  padding: 10rpx;
  border-radius: 50%;
}
.nav_bar_transparent .nav_left_box {
  background: rgba($color: #000000, $alpha: 0.2);

  &,
  uni-icons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.touch_box {
  width: 100%;
  font-size: 26rpx;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
}
.touch_box_content,
.order_type_box {
  padding: $space_padding;
}
.touch_box_content {
  flex: 1;
  border-radius: 40rpx 40rpx 0 0;
  background: $theme_bg;
  position: relative;
  z-index: 999999;
}
.cus_card {
  background: #fff;
  padding: $space_padding;
}
.card_item {
  margin: 20rpx 0;
  & > view {
    display: flex;
    justify-content: space-between;
  }
}
.ps_type_box {
  border-radius: 5rpx;
  border: 1px solid #e6e6e6;
  padding: 3rpx 6rpx;
}
.ps_time {
  font-size: 38rpx;
  font-weight: bold;
}

.order_handle {
  display: flex;
  align-items: center;
  justify-content: space-around !important;
  position: relative;
  margin-top: 10rpx;
  padding: 6rpx $space_padding;
  width: 100%;
  &::after {
    content: " ";
    position: absolute;
    width: 200%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.1);
    transform: scale(0.5) translateX(-50%);
    left: 0;
    top: 0;
  }
  & > view {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:first-child {
      &::after {
        content: " ";
        position: absolute;
        width: 1px;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.1);
        transform: scale(0.8);
        left: 50%;
      }
    }
  }
}

.goods_item {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
  .goods_item_l {
    display: flex;
  }
  image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }
}
.od_price {
  font-size: 30rpx;
}
.od_tips {
  color: rgba($color: #000000, $alpha: 0.5);
}
.shop_name {
  font-weight: bold;
  font-size: 30rpx;
}
.order_type_box {
  color: #fff;
  
  font-weight: bold;
  position: relative;
  height: 88rpx;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  &,text,.uni-countdown{
    font-size: 40rpx !important;
  }
  &>view{
    display: flex;
    align-items: center;
  }
}
.order_price_item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.order_sh_box {
  display: flex;
  flex-direction: column;
  & > view {
    width: 100%;
    display: flex;
    margin: 10rpx 0;
    justify-content: space-between;
    & > view:last-child {
      flex: 0.6;
      text-align: right;
    }
  }
}

.line_text {
  color: rgba($color: #000000, $alpha: 0.5);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  text {
    margin: 0 20rpx;
  }
  &::after,
  &::before {
    content: "";
    position: relative;
    width: 40%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.5);
    transform: scaleY(0.5);
  }
}
</style>
