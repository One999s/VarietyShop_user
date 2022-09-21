<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-18 17:51:31
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-18 23:03:36
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\goods_detail.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="page_gd">
    <uni-nav-bar
      :border="false"
      statusBar
      fixed
      class="nav_bar_transparent"
      id="goods_nav"
    >
      <template #left>
        <view class="nav_gd">
          <uni-icons type="back" :size="14" color="#fff" @click="handleToBack"/>
        </view>
      </template>
    </uni-nav-bar>
    <view
      class="gd_fixed_top"
      :style="{
        paddingTop: mainTop - 44 + 'px',
        opacity: fixedTopOpacity,
        zIndex: fixedTopOpacity >= 0.7 ? 9999 : 1,
      }"
    >
      <view>
        <uni-icons type="back" :size="24" color="#000" @click="handleToBack"/>
        <view class="nav_box">
          <view
            v-for="(item, index) in navList"
            :key="index"
            :class="{ active: active == item.value }"
            @click.stop.prevent="() => handleChangeNav(item)"
          >
            <view>{{ item.label }}</view>
          </view>
        </view>
        <view></view>
      </view>
      <view class="goods_ic">
        <view>
          <view class="goods_price"
            >￥<text>{{ goodsDetail.price }}</text></view
          >
          <view class="goods_tips">包装费￥{{ goodsDetail.price }}</view>
        </view>
        <view class="goods_car"> +加入购物车 </view>
      </view>
    </view>
    <view class="goods_img"
      ><image :src="goodsDetail.imgSrc" mode="aspectFill"
    /></view>
    <view
      class="goods_main"
      :style="{ marginTop: `calc(50vh - ${mainTop}px)` }"
    >
      <view class="goods_card">
        <view class="goods_name">{{ goodsDetail.name }}</view>
        <view class="goods_tips"
          >月售 <text>{{ goodsDetail.sales_m }}</text></view
        >
        <view class="goods_ic">
          <view>
            <view class="goods_price"
              >￥<text>{{ goodsDetail.price }}</text></view
            >
            <view class="goods_tips">包装费￥{{ goodsDetail.price }}</view>
          </view>
          <view class="goods_car"> +加入购物车 </view>
        </view>
      </view>
      <view class="nav_box">
        <view
          v-for="(item, index) in navList"
          :key="index"
          :class="{ active: active == item.value }"
          @click.stop.prevent="() => handleChangeNav(item)"
        >
          <view>{{ item.label }}</view>
        </view>
      </view>
      <view class="goods_card sp_detail" id="goods_xq">
        <view class="goods_title">商品详情</view>
        <view
          v-for="(item, index) in new Array(4).fill({
            label: '原料',
            value: '鸡腿',
          })"
          :key="index"
        >
          <view class="goods_tips">{{ item.label }}</view>
          <view>{{ item.value }}</view>
        </view>
      </view>

      <view class="goods_card sp_comment" id="goods_pj">
        <view class="goods_title">商品评价</view>
        <comment-shop height=""/>
      </view>

      <view class="goods_card" id="goods_tj">
        <view class="goods_title">更多推荐</view>
        <view class="goods_rc_list">
          <view
            v-for="(item, index) in new Array(11).fill({
              imgSrc: goodsDetail.imgSrc,
              name: '菜品',
              price: 10,
            })"
            :key="index"
            class="gd_rc_item"
          >
            <view><image :src="item.imgSrc" /></view>
            <view class="gd_rc_name">{{ item.name }}</view>
            <view class="gd_rc_footer">
              <view class="goods_price"
                >￥<text>{{ item.price }}</text>
              </view>
              <view class="cim_tool">
                <view class="cim_del" v-if="true">
                  <uni-icons
                    custom-prefix="iconfont"
                    type="del"
                    color="#000"
                  ></uni-icons>
                </view>
                <view class="cim_nums" v-if="true">1</view>
                <view class="cim_add">
                  <uni-icons type="plusempty" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <goods-nav  />

  </view>
</template>

<script>
import { getCurrentInstance, nextTick, ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import { useStore } from "../../common/store/global";

export default {
  onPageScroll() {},
  setup() {
    const instance = getCurrentInstance();
    const { systemInfo } = useStore();
    const goodsDetail = ref({
      imgSrc:
        "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
      name: "赛你妈破壁",
      sales_m: "20",
      price: 55.5,
      price_pack: 1,
    });
    const navBox = ref({});
    const navList = ref([
      { label: "详情", value: "xq" },
      { label: "评价", value: "pj" },
      { label: "推荐", value: "tj" },
    ]);
    const gdFixedBox = ref({});
    const active = ref(navList.value[0].value);
    const fixedTopOpacity = ref(0);
    onPageScroll((e) => {
      let scrollTop = e.scrollTop;
      let xqTop = navBox.value["xq"].top;
      let pjTop = navBox.value["pj"].top;
      let tjTop = navBox.value["tj"].top;
      fixedTopOpacity.value = (scrollTop - xqTop + 60) / 60;
      if(scrollTop>tjTop-gdFixedBox.value.height){
        active.value = "tj"
      }else if(scrollTop>pjTop-gdFixedBox.value.height){
        active.value = "pj"
      }else if(scrollTop>xqTop){
        active.value = "xq"
      }
      
      
    });

    const getNavBox = () => {
      const query = uni.createSelectorQuery().in(instance);
      query
        .select("#goods_xq")
        .boundingClientRect((data) => {
          navBox.value["xq"] = data;
        })
        .select("#goods_pj")
        .boundingClientRect((data) => {
          navBox.value["pj"] = data;
        })
        .select("#goods_tj")
        .boundingClientRect((data) => {
          navBox.value["tj"] = data;
        })
        .select(".gd_fixed_top")
        .boundingClientRect((data) => {
          gdFixedBox.value = data;
        })
        .exec();
    };

    const handleChangeNav = (item) => {
      if (active.value != item.value) {
        active.value = item.value;
        uni.pageScrollTo({
          scrollTop:
            navBox.value[item.value].top - gdFixedBox.value.height - 10,
          duration: 100,
        });
      }
    };

    nextTick(() => {
      getNavBox();
      console.log(navBox.value);
    });
    const handleToBack = ()=>{
        uni.navigateBack({delta:1});
    }
    return {
      goodsDetail,
      mainTop: systemInfo.safeArea.top + 44,
      active,
      navList,
      fixedTopOpacity,
      handleChangeNav,
      handleToBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav_gd {
  width: 50rpx;
  height: 50rpx;
  background: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.page_gd,
.goods_main {
  background: $theme_bg;
}
.goods_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  image {
    width: 100%;
    height: 100%;
  }
}

.goods_main {
  font-size: 26rpx;
  padding: 20rpx;
  padding-bottom: 160rpx;
  .goods_name {
    font-weight: bold;
    font-size: 38rpx;
    font-weight: bold;
  }
}
.goods_tips {
  color: rgba($color: #000000, $alpha: 0.6);
  font-size: 24rpx;
}
.goods_price {
  & > text {
    font-size: 40rpx;
  }
  color: $theme_color_im;
  font-weight: bold;
  margin-right: 10rpx;
}
.goods_card {
  background: #fff;
  border-radius: 10rpx;
  padding: 10rpx 25rpx;
  margin-bottom: 30rpx;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
  & > view {
    margin: 10rpx 0;
  }
}
.goods_ic {
  display: flex;
  justify-content: space-between;
  & > view {
    display: flex;
    align-items: center;
  }
}
.goods_car {
  background: linear-gradient(to right, $theme_color, $theme_color2);
  border-radius: 50rpx;
  padding: 10rpx 20rpx;
  color: #fff;
}
.nav_box {
  display: flex;
  margin: 30rpx 0;
  font-size: 30rpx;
  position: relative;
  z-index: 9;
  & > view {
    margin-right: 80rpx;
    &.active {
      font-weight: bold;
      position: relative;
      &::after {
        content: " ";
        position: absolute;
        bottom: -12rpx;
        left: 15%;
        width: 70%;
        height: 6rpx;
        background: $theme_color;
      }
    }
  }
}
.goods_title {
  font-weight: bold;
  font-size: 32rpx !important;
}
.sp_detail {
  & > view {
    display: flex;
    align-items: center;
  }
  view,
  .goods_tips {
    font-size: 28rpx;
  }
  .goods_tips {
    width: 20%;
  }
}
.goods_rc_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.gd_rc_item {
  width: 48.5%;
  margin: 20rpx 0;
  image {
    width: 100%;
    height: 320rpx;
    border-radius: 10rpx;
  }
  .gd_rc_name {
    font-weight: bold;
    font-size: 30rpx;
  }
  .gd_rc_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.cim_tool {
  display: flex;
  align-items: center;
  & > view {
    padding: 8rpx;
    border-radius: 10rpx;
    padding: 5rpx;
    border-radius: 50%;
    min-width: 40rpx;
    min-height: 40rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cim_add,
  .cim_del {
    font-weight: bold;
  }
  .cim_add {
    background-image: linear-gradient(to right, $theme_color, $theme_color2);
  }
  .cim_del {
    border: 1px solid $theme_color;
  }
}

.gd_fixed_top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  font-size: 26rpx;
  & > view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
  }
}
</style>
