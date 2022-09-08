<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-05 17:47:08
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-08 17:35:43
 * @FilePath: \varietyShop\frontend\users\src\components\category-list\category-list.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="category_list">
    <scroll-view scroll-y scroll-with-animation class="cate_menu"
    :scroll-into-view="'cate_menu' + (cate_menu_index>3?cate_menu_index-3:0)"
    >
      <view
        v-for="(item, index) in categoryList"
        :key="index"
        :class="{
          cate_menu_item: true,
          active: active == index,
        }"
        :id="'cate_menu'+index"
        @click="() => handleClickCate(item, index)"
      >
        {{ item[label] }}
      </view>
    </scroll-view>

    <scroll-view
      scroll-y
      scroll-with-animation
      @scroll="handleCateScroll"
      class="cate_list"
      :scroll-into-view="'cate_item' + cate_item_index"
    >
      <view
        class="cate_item"
        v-for="(item, index) in categoryList"
        @click="() => handleClickCate(item, index)"
        :key="index"
        :id="'cate_item' + index"
      >
        <view class="cate_sticky_label">{{ item[label] }}</view>
        <view v-for="(citem, cindex) in item[source]" :key="cindex"
        class="cate_item_box_wrap"
        >
          <component-item :item="citem" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { computed, ref, watch, getCurrentInstance, nextTick } from "vue";
import componentItem from "./category-item.vue";

export default {
  components: { componentItem },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    label: { type: String, default: "name" },
    source: { type: String, default: "children" },
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const categoryList = ref([]);
    const categoryTopList = ref([]);
    const active = ref(0);
    const cate_item_index = ref(0);
    const cate_menu_index = ref(0);
    watch(
      ()=>props.list,
      (newValue) => {
        categoryList.value = newValue;
        nextTick(()=>{
          let query = uni.createSelectorQuery().in(instance);
          query
            .selectAll(".cate_item")
            .boundingClientRect((data) => {
              categoryTopList.value = data
              console.log(data)
            })
            .exec();
        })
      }
    );
    /**
     * @description: 左侧菜单点击，跳转右侧商品位置
     * @param {*} item
     * @param {*} index
     * @return {*}
     */
    const handleClickCate = (item, index) => {
      emit("clickCate", item);
      active.value = index;
      cate_item_index.value = index;
    };

    /**
     * @description: 右侧菜单滚动，关联左侧菜单
     * @param {*} e
     * @return {*}
     */
    const handleCateScroll = (e) => {
      let scrollTop = e.detail.scrollTop + categoryTopList.value[0].top + 21 + 15;// 21为吸附标题的高度，15为商品盒子的底部margin，为了精确两个吸附标题重叠
      let item = categoryTopList.value.findLast(item=>scrollTop>=item.top);
      console.log(e.detail.scrollTop)
      if(item){
        let index = item.id.replace(/\D/g,"");// 去除id换成纯数字
        if(index){
          active.value = Number(index);
          cate_menu_index.value = Number(index);
        }
      }
    };
    return {
      categoryList,
      active,
      cate_item_index,
      cate_menu_index,
      handleClickCate,
      handleCateScroll,
    };
  },
};
</script>

<style lang="scss" scoped>
.category_list {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  z-index: 999;

}
.cate_list,
.cate_menu {
  height: calc(100vh - 100px);
}
.cate_menu {
  width: 20%;
  .cate_menu_item {
    background: #f9f7f7d4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 10rpx;
    &.active {
      background: #fff;
    }
  }
  &.active {
    background: #fff;
  }
}
.cate_list {
  flex: 1;
  overflow: hidden;
  padding-left: 20rpx;
  .cate_item {
    width: 100%;
    position: relative;
    .cate_sticky_label {
      width: 100%;
      background: #fff;
      z-index: 30;
      position: sticky;
      position: -webkit-sticky;
      top: 0;
    }
  }
}
</style>
