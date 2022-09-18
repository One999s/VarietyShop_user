<!--
 * @Author: one9s 9665730@qq.com
 * @Date:2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-17 18:49:39
 * @FilePath: \varietyShop\frontend\users\src\pages\shops\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view id="shopsIndex">
    <uni-nav-bar
      id="shop_navbar"
      class=""
      :border="false"
      statusBar
      fixed
      :backgroundColor="navBgColor"
    >
      <template #left>
        <view class="nav_address">
          <text :style="`color:${navColor}`">泉州</text>
          <uni-icons type="bottom" :size="14" :color="navColor" />
        </view>
      </template>
    </uni-nav-bar>
    <view
      class="si_main"
      :style="{ 'min-height': `calc(100vh - ${navBarHeight + safeAreaTop}px)` }"
    >
      <cus-search
        :left="searchLeft"
        :showRight="showRight"
        :top="safeAreaTop + 6 + 'px'"
      />
      <category />
      <view
        :class="{
			'shop_nav':true
		}"
        id="shop_nav"
	
        :style="{
          top: (navBarHeight > 20 ? navBarHeight : 44) + safeAreaTop + 'px',
        }"
      >
        <!-- 商店导航 -->
        <shop-classify @classify="handleClassify" :classifyStyle="classifyStyle"
        :top="(navBarHeight > 20 ? navBarHeight : 44) + safeAreaTop + 'px'"
        />

      </view>
      <shop-list id="shoplist" :list="state.shopList" />
      <uni-load-more :status="status"></uni-load-more>
    </view>
  </view>
</template>

<script>
import { getCurrentInstance, reactive, ref, nextTick } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import { useStore } from "../../common/store/global";
export default {
  setup() {
    const instance = getCurrentInstance();
    const classifyTop = ref(0);
    const { systemInfo } = useStore();
    const safeAreaTop = systemInfo.safeArea.top;
    const navBarHeight = systemInfo.statusBarHeight;
    const state = reactive({
      shopList: [],
    });
    const shopList = ref([]);
    const status = ref("loading");
    const navColor = ref(`rgba(255,255,255,1)`);
    const navBgColor = ref(`rgba(255,255,255,0)`);
    const searchLeft = ref(null);
    const showRight = ref(true);
	const classifyStyle = ref(false);
    const getList = () => {
      state.shopList = Array.from(new Array(20), (v, k) => ({
        name: "店铺" + k,
        score: 4.5,
        sales: parseInt(Math.random() * k),
        ps_time: 30 + k,
        ps_price: 20,
        longitude: null,
        latitude: null,
        min_price: 15, //起送费
        distance: 200 + k + "m",
        tags_eva: ["网红店", "热情掌柜"],
        tags_money: ["30减2", "50减6"],
        tags_other: [],
        avatar:
          "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
      }));
    };

    onPageScroll((e) => {
      searchLeft.value = `calc(${
        (120 / 60) * (e.scrollTop > 60 ? 60 : e.scrollTop)
      }rpx)`;
      showRight.value = !(e.scrollTop > 30);
	  classifyStyle.value = e.scrollTop>(classifyTop.value - 100);


      if (e.scrollTop > 60) return;
      let num = Number(e.scrollTop / 44).toFixed(2);
      navBgColor.value = `rgba(255,255,255,${Number(e.scrollTop / 44).toFixed(
        2
      )})`;
      navColor.value =
        num > 0.5 ? `rgba(0,0,0,${num})` : `rgba(255,255,255,${1 - num})`;
    });

    const handleClassify = (item) => {
      console.log(item);
      uni.pageScrollTo({
        scrollTop: classifyTop.value - 100,
      });
	  if(item==='menu') return;
	  
    };

    const setBarHeight = () => {
      nextTick(() => {
        let query = uni.createSelectorQuery().in(instance);
        query
          .select("#shoplist")
          .boundingClientRect((data) => {
            classifyTop.value = data.top;
          })
          .exec();
      });
    };
    setBarHeight();

    setTimeout(() => {
      getList();
    }, 1500);

    return {
      state,
      safeAreaTop,
      navBarHeight,
	  classifyStyle,
      shopList,
      status,
      navColor,
      navBgColor,
      searchLeft,
      showRight,
      handleClassify,
    };
  },
};
</script>

<style lang="scss" scoped>
#shopsIndex {
  // background-image: linear-gradient($theme_color 5%,$theme_color2 15%,#fff) ;
  background-image: linear-gradient(
    to bottom,
    $theme_color 2%,
    $theme_color2 15%,
    #fff 20%
  );
}
.si_main {
  background: $theme_bg;
  border-radius: $space $space 0 0;
  padding: $space_padding;
}
.nav_address {
  width: 100rpx;
  overflow: hidden;
  display: flex;
  align-items: center;
  & > text {
    margin-right: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
}
.shop_nav {
  position: sticky;
  position: -webkit-sticky;
  z-index: 999;
  
}
</style>
