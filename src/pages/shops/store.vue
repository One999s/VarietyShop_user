<!--
 * @Author:
  components: { uniIcons }, one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-08 17:27:17
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\store.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view
    :class="{
      shops_store: true,
      scrollMain: state.scrollMain,
      hidescroll: state.showCardAll,
    }"
  >
    <uni-nav-bar
      :class="{
        nav_bar_transparent: true,
      }"
      :border="false"
      statusBar
      fixed
      left-icon="back"
    >
      <view class="nav_bar_main">
        <cus-search
          :showRight="false"
          v-if="state.scrollMain"
          placeholder="搜索商品"
        />
        <uni-icons type="search" :size="20" v-if="!state.scrollMain" />
        <uni-icons type="chatbubble" :size="20" />
        <uni-icons :type="state.star ? 'star-filled' : 'star'" :size="20" />
        <uni-icons type="more-filled" :size="20" />
      </view>
    </uni-nav-bar>
    <view class="ss_bg"></view>
    <view class="ss_main">
      <view
        class="shop_info"
        :style="{
          height: state.showCardAll ? '100%' : 'unset',
        }"
        @touchstart="
          ({ changedTouches }) => (state.touchCard = changedTouches[0].pageY)
        "
        @touchmove="cardtouchmove"
      >
        <view class="shop_name">{{ shopDetail.name }}</view>
        <view class="shop_avatar"
          ><image :src="shopDetail.avatar" mode="aspectFill"
        /></view>
        <view
          class="shop_tips"
          :style="{ opacity: state.showCard ? 1 : state.cardOpacity }"
        >
          <view class="ss_score icon_im">
            <uni-icons type="star-filled" :size="14" />
            <text class="ss_score_val">{{ shopDetail.score }}</text>
          </view>
          <view>
            月售<text>{{ shopDetail.sales }}</text>
          </view>
          <view>
            配送约<text>{{ shopDetail.ps_time }} 分钟 </text>
          </view>
        </view>
        <view v-show="state.showCard">
          <view class="shop_notice shop_scard_title">
            <text class="sp_cname">优惠</text>
            <uni-icons
              type="top"
              :size="14"
              @click="state.showCardAll = false"
            />
          </view>
        </view>
        <view class="shop_card">
          <!-- 优惠券 -->
        </view>

        <view v-show="state.showCard" class="ss_card_c">
          <view v-for="(tag, ti) in shopDetail.tags_money" :key="tag + ti + ti">
            <image
              src="/static/icons/manjian.png"
              class="showCard_icon"
              mode="aspectFill"
            />
            <text>满{{ tag }}</text>
          </view>
        </view>

        <view
          class="shop_discounts"
          v-show="!state.showCard"
          :style="{ opacity: state.showCard ? 1 : state.cardOpacity }"
        >
          <!-- 满减区 -->
          <view class="tags_money">
            <view v-for="(tag, ti) in shopDetail.tags_money" :key="tag + ti">
              {{ tag }}
            </view>
          </view>
        </view>
        <view v-show="state.showCard" class="ss_serve">
          <text class="sp_cname">商家服务</text>
          <view>
            <view>
              <uni-icons type="heart" />
              <text>放心吃</text>
            </view>
            <view>
              <uni-icons type="heart" />
              <text>放心吃</text>
            </view>
          </view>
        </view>
        <view
          :class="{
            shop_notice: true,
            shop_card_notice: state.showCard,
          }"
          :style="{ opacity: state.showCard ? 1 : state.cardOpacity }"
        >
          <!-- 公告 -->
          <view :class="{ sp_cname: state.showCard }">公告：</view>
          <text class="sp_notice_val">{{ shopDetail.notice }}</text>
          <uni-icons
            type="bottom"
            :size="14"
            v-show="!state.showCard"
            @click.stop.prevent="state.showCardAll = true"
          />
        </view>
      </view>

      <view
        class="shop_box"
        id="shop_box"
        @touchmove="shoptouchmove"
        @touchend="shoptouchend"
        :style="{
          'margin-top': (state.shopInfoHeight+state.shopInfoh5Height) + 'px',
          transform: `translateY(${
            state.showCardAll ? '100vh' : state.scrollY + 'px'
          })`,
          transition: state.showCardAll ? 'all .5s' : 'none',
        }"
      >
        <uni-segmented-control
          class="ss_segmented"
          :current="category.current"
          :values="category.items"
          style-type="text"
          active-color="#08A1DB"
          @clickItem="onClickItem"
        />
        <view class="shop_main">
          <category-list v-show="category.current === 0" :list="categoryList" />
          <view v-show="category.current === 1"> 评论 </view>
          <view v-show="category.current === 2"> 商家 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { reactive, ref, getCurrentInstance, nextTick, watch } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
export default {
  setup() {
    const instance = getCurrentInstance();

    const state = reactive({
      star: false,
      scrollMain: false,
      showCard: false, // 商家卡片
      showCardAll: false, // 商家卡片
      shop_box: {}, // 元素
      touchCard: null, // 临时参数， 商家信息盒子卡片滑动对比
      scrollY: 0, // 商品分类盒子Y值
      scrollYTEMP: 0, // 临时参数 对比scrollY
      shopInfoHeight: 0, // 商家信息盒子折叠高度
      shopInfoh5Height:0, // h5端加高度
      cardOpacity: 1, // 透明度
    });
    const shopDetail = ref({});
    const category = reactive({
      current: 0,
      items: ["点菜", "评价", "商家"],
    });
    const categoryList = ref([]);

    watch(
      () => state.showCardAll,
      (newValue) => {
        state.showCard = newValue;
      }
    );

    nextTick(() => {
      let query = uni.createSelectorQuery().in(instance);
      query
        .select("#shop_box")
        .boundingClientRect((data) => {
          state.shop_box = data;
        })
        .exec();
    });

    onPageScroll((e) => {
      let { top } = state.shop_box;
      const limen = e.scrollTop;
      // + (44 + 16 + 20); // 44 navbar,  16 公告高度, 20状态栏
      // #ifdef H5
      top += 44;
      // #endif
      console.log(limen, top);
      if (limen > top) {
          
        state.scrollMain = true;
      } else {
        state.scrollMain = false;
      }
    });

    const onClickItem = (e) => {
      if (category.current !== e.currentIndex) {
        category.current = e.currentIndex;
      }
    };

    const getShopDetail = () => {
      shopDetail.value = {
        name: "店铺001",
        avatar:
          "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
        score: 4.5,
        sales: parseInt(Math.random() * 4),
        ps_time: 30,
        ps_price: 20,
        longitude: null,
        latitude: null,
        min_price: 15, //起送费
        distance: 200 + "m",
        tags_eva: ["网红店", "热情掌柜"],
        tags_money: ["30减2", "50减6"],
        tags_other: [],
        notice:
          "嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎嘎嘎公告嘎嘎嘎嘎",
      };
      nextTick(() => {
        let query = uni.createSelectorQuery().in(instance);
        query
          .select(".shop_info")
          .boundingClientRect((data) => {
            console.log(data);
            let height = data.height;
            state.shopInfoHeight = height;
          })
          .exec();
      });
    };
    const getList = () => {
      setTimeout(() => {
        categoryList.value = Array.from(new Array(20), (v, k) => ({
          name: "分类" + k,
          icon: "",
          children: new Array(10).fill({
            name: "分类" + k + "商品",
            imgSrc:
              "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
          }),
        }));
      }, 0);
    };

    const cardtouchmove = (e) => {
      const { pageY } = e.changedTouches[0];
      if (!state.touchCard) {
        state.touchCard = pageY;
      }
      if (state.touchCard && state.touchCard > pageY) {
        setTimeout(() => {
          state.touchCard = null;
          state.showCardAll = false;
        }, 100);
      }
    };

    const shoptouchmove = (e) => {
      const { pageY } = e.changedTouches[0];
      if (!state.scrollYTEMP) {
        state.scrollYTEMP = pageY;
      }
      const scrollY = pageY - state.scrollYTEMP;
      if (scrollY < 0) return;
      state.scrollY = scrollY;
      state.cardOpacity = 1 - scrollY / 55;
      if (scrollY > 60) {
        state.showCard = true;
      } else {
        state.showCard = false;
      }
    };

    const shoptouchend = (e) => {
      const { scrollY } = state;
      state.scrollYTEMP = 0;
      state.scrollY = 0;
      state.cardOpacity = 1;
      if (scrollY > 60) {
        state.showCardAll = true;
      }
    };

    getShopDetail();
    getList();

    return {
      state,
      shopDetail,
      category,
      categoryList,
      onClickItem,
      cardtouchmove,
      shoptouchmove,
      shoptouchend,
    };
  },
};
</script>

<style lang="scss" scoped>
$ssbg_height: 240rpx;
.hidescroll {
  overflow: hidden;
}
.shops_store {
  display: flex;
  flex-direction: column;
}
.nav_bar_main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & view {
    transition: all 0.5s;

    &.cus_search {
      flex: 1;
    }
  }
  & > uni-icons {
    margin: 0 10rpx;
  }
}
.ss_bg {
  width: 100%;
  height: $ssbg_height;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background: url("https://img1.baidu.com/it/u=1007776676,4281609527&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=156")
    no-repeat;
  background-size: cover;
}
.ss_main {
  flex: 1;
  margin-top: (calc($ssbg_height / 10));
  position: relative;
  z-index: 11;
  border-radius: 50rpx 50rpx 0 0/50rpx 50rpx 0 0;
  background: #fff;
}
.shop_box {
  z-index: 99;
  background: #fff;
}
.shop_info {
  position: absolute;
  width: 100%;
  padding: $space;

  view {
    transition: all 0.3s;
  }
  font-size: 24rpx;
  .shop_name {
    font-size: 38rpx;
    font-weight: bold;
  }
  .shop_avatar {
    position: absolute;
    right: $space;
    top: -10rpx;
    image {
      width: 110rpx;
      height: 110rpx;
      border-radius: 20rpx;
      box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
    }
  }
  .shop_tips {
    display: flex;
    align-items: center;
    margin: 10rpx 0 20rpx 0;
    & > view {
      margin-right: 20rpx;
    }
  }
  .shop_discounts {
    display: flex;
  }
  .shop_notice {
    display: flex;
    align-items: center;
    color: rgba($color: #000000, $alpha: 0.6);
    margin: calc($space_padding / 2) 0;
    &:not(.shop_card_notice) text:not(.uni-icons) {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .showCard_icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
  }
  .tags_money {
    width: unset !important;
    display: flex;
    padding: 0 8rpx;
    border-radius: 10rpx;
    border: 1px solid #d75855;
    color: #d75855;
    transform: scale(0.9) translateX(-6%);
    & > view {
      position: relative;
      &:not(:first-child) {
        padding-left: 8rpx;
      }
      &:not(:last-child) {
        padding-right: 8rpx;
        &::after {
          content: " ";
          position: absolute;
          right: -1px;
          width: 1px;
          height: 100%;
          background: #d75855;
          transform: scale(0.6);
        }
      }
    }
  }

  .ss_serve {
    margin: $space_padding 0;
    & > view {
      display: flex;
      align-items: center;
      transform: scale(0.9) translateX(-5%);

      & > view {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
      }
    }
  }
}
.shop_card_notice {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  text:not(.sp_cname) {
    color: #000;
    font-size: 24rpx;
  }
}
.sp_cname {
  color: #000;
  font-size: 30rpx;
  font-weight: bold;
}
.ss_card_c {
  & > view {
    display: flex;
    align-items: center;
  }
  transform: scale(0.9) translateX(-5%);
}

.scrollMain {
  .uni-navbar__header-btns-left {
    display: none !important;
  }

  .ss_segmented {
    position: fixed;
    left: 0;
    // top: calc(44px + 20px); // navtab + onPageScroll里的触发阀值
    width: 100%;
    z-index: 11;
    background: #fff;
  }
  .shop_main {
    padding-top: 36px; // ss_segmented菜单
  }
}
</style>
