<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-18 16:47:03
 * @FilePath: \varietyShop\frontend\users\src\pages\shoppingCar\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="page_scar">
    <uni-nav-bar
      class=""
      :left-text="manage ? '取消' : '管理'"
      :title="manage ? '管理购物车' : '购物车'"
      statusBar
      :border="false"
      fixed
      @clickLeft="handleNavLeft"
      backgroundColor="rgb(249, 247, 247)"
    >
    </uni-nav-bar>

    <view class="spcar_main">
      <view
        v-for="(shop, si) in shopCarList"
        :key="si"
        class="sc_item"
      >
        <view class="sc_shop"
		
		>
          <view class="sc_shead">
            <view class="sc_sname">
              <checkbox
                :value="'parent-' + shop.name"
                :checked="
                  (manage ? manageSelect : selectObj)[shop.name]?.length == shop.carList.length
                "
                @click.stop.prevent="(e) => handleCheckShop(shop, (manage ? manageSelect : selectObj)[shop.name]?.length == shop.carList.length)"
              />
              <text>{{ shop.name }}</text>
              <uni-icons type="right" size="14" color="rgba(0,0,0,.4)" />
            </view>
            <view class="sc_tips">
              <text>月售 100 30 分钟</text>
              <uni-icons
                v-if="!manage"
                type="trash"
                size="12"
                color="rgba(0,0,0,.4)"
                @click="() => handleDelShop(shop)"
              />
            </view>
          </view>
          <view>
            <view class="sc_shop_tips">进店发现更多优惠</view>
          </view>
        </view>
		<checkbox-group
        @change="(e) => handleSelect(e, shop)"
		
		>
		<uni-swipe-action>
          <uni-swipe-action-item
            v-for="(item, index) in shop.carList"
            :key="index"
            :right-options="manage ? [] : swipeActionOptions"
            @click="() => handleDelGoods(shop, item)"
          >
            <view class="sc_goods_item">
              <view>
                <checkbox
                  :value="item.name"
                  :checked="
                    (manage ? manageSelect : selectObj)[shop.name]?.includes(
                      item.name
                    )
                  "
                />
                <view class="sc_goods_info">
                  <image :src="item.imgSrc" mode="" />
                  <view class="sc_goods_text">
                    <view>{{ item.name }}</view>
                    <view v-if="item.spec" class="sc_tips">
                      {{ item.spec.join(" / ") }}
                    </view>
                    <view>￥{{ item.price }}</view>
                  </view>
                </view>
              </view>
              <view class="sc_goods_handle">
                <view :class="{
					'sc_goods_tool':true,
					'disable':manage
				}">
                  <view
                    class="sc_g_t_del"
                    @click="
                      () => (manage ? {} : handleChangeNums('del', shop, item))
                    "
                    >-</view
                  >
                  <view class="sc_g_t_nums">{{ item.nums }}</view>
                  <view
                    class="sc_g_t_add"
                    @click="
                      () => (manage ? {} : handleChangeNums('add', shop, item))
                    "
                    >+</view
                  >
                </view>
              </view>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
		</checkbox-group>
        
        <view
          class="sc_footer"
          v-if="
            !manage &&
            selectObj[shop.name]?.filter((fitem) => !/^parent-/g.test(fitem))
              ?.length
          "
        >
          <view>
            <view>包装费</view>
            <view>￥1</view>
          </view>
          <view>
            <view>包装费</view>
            <view>￥1</view>
          </view>
          <view class="sc_footer_handle">
            <view class="sc_footer_show">
              <view>
                <view>已优惠<text class="sc_im_price">￥4</text></view>
                <view>合计<text class="sc_im_price">￥30</text></view>
              </view>
              <view class="sc_tips">另需配送费￥0</view>
            </view>
            <view class="submit hasSelect" @click="() => handleSubmit(shop)">
              去结算
            </view>
          </view>
          <view
            class="sc_submit_tips"
            v-if="false"
            @click="() => handleToShop(shop)"
          >
            还差
            <text class="sc_im_price">6元</text>
            起送，
            <text class="sc_im_price">去凑单 ></text>
          </view>
        </view>
      </view>
    </view>
    <view class="spcar_footer">
      <checkbox-group
        class=""
        @change="(e) => handleSelect(e, { name: 'all' })"
      >
        <checkbox value="all" 
		:checked="allChecked"
		/>全选
      </checkbox-group>
      <view>
        <view class="sc_order_count" v-if="!manage">
          <view>
            <view class="sc_tips">已选 5 件</view>
            <view>合计：<view class="sc_im_price count_price">￥0</view></view>
          </view>
          <view class="sc_im_price" v-if="false">共减 ￥5.5</view>
        </view>
        <view
          :class="{
            submit: true,
            hasSelect: !!Object.values((manage ? manageSelect : selectObj)).filter((item) => item.length)
              .length,
			delete:manage
          }"
          @click="
            () =>
              !!Object.values((manage ? manageSelect : selectObj)).filter((item) => item.length).length
                ? handleSubmit()
                : {}
          "
          >{{ manage ? "删除" : "一键结算" }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { computed, ref } from "vue";

export default {
  setup() {
    const shopCarList = ref([]);
    const selectObj = ref({});
    const manageSelect = ref({});
    const manage = ref(false);
    const swipeActionOptions = ref([
      {
        text: "删除",
        style: {
          backgroundColor: "#dd524d",
        },
      },
    ]);
	const allChecked = computed(()=>{
		let obj = Object.assign({},(manage.value?manageSelect:selectObj).value);
		delete obj.all;
		let allLen = shopCarList.value.reduce((pre,cur)=>pre+cur?.carList?.length,0);
		let nowLen = Object.values(obj).reduce((pre,cur)=>pre+cur?.length,0);
		return allLen===nowLen
	})
    const getList = () => {
      shopCarList.value = Array.from(new Array(4), (v, k) => ({
        name: "店铺" + k,
        id: k,
        carList: Array.from(new Array(k + 1), (v, h) => ({
          name: "生椰拿铁" + h,
          spec:
            h % 2 == 0
              ? [
                  // 规格
                  "半糖",
                  "少冰",
                ]
              : [],
          imgSrc:
            "http://t13.baidu.com/it/u=1899822932,1883061762&fm=224&app=112&f=JPEG?w=500&h=500",
          price: 10 + h,
          nums: h + 1,
        })),
      }));
    };

    const handleChangeNums = (type, shop, item) => {
      if (type == "del" && item.nums == 1) {
        uni.showModal({
          content: "确定删除该商品？",
          success: (res) => {
            if (res.confirm) {
              console.log("用户点击确定");
              item.nums = 0;
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        return;
      }
      uni.showLoading({
        icon: "loading",
      });
      setTimeout(() => {
        type == "add" && (item.nums += 1);
        type == "del" && (item.nums -= 1);
        uni.hideLoading();
      }, 1000);
    };

    const handleSelect = (e, item) => {
      let values = e.detail.value;
      if (item.name === "all") {
        if (values[0]) {
          shopCarList.value.map((mitem) => {
            (manage.value ? manageSelect : selectObj).value[mitem.name] =
              mitem.carList.map((item) => item.name);
          });
        } else {
          (manage.value ? manageSelect : selectObj).value = {};
        }
      } else {
		(manage.value ? manageSelect : selectObj).value[item.name] = values.filter((fitem) => fitem)
      }
    };
    const handleCheckShop = (item,checked) => {
      if (!checked) {
        (manage.value ? manageSelect : selectObj).value[item.name] =
          shopCarList.value
            .find((fitem) => fitem.name == item.name)
            ?.carList?.map((item) => item.name);
      } else {
        (manage.value ? manageSelect : selectObj).value[item.name] = [];
      }
    };

    const handleSubmit = (shop) => {
      //   console.log(shop, selectObj.value);
      if (manage.value) {
        console.log("删除");
		console.log(manageSelect.value);
      } else {
        console.log("提交订单");
      }
    };
    const handleToShop = (shop) => {};
    const handleDelGoods = (shop, goods) => {
      console.log("del", shop, goods);
    };
    const handleDelShop = (shop) => {
      uni.showModal({
        content: "确定清空店铺内所有商品？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
      console.log(shop);
    };
    const handleNavLeft = () => {
      manage.value = !manage.value;
      manageSelect.value = {};
    };
    getList();
    return {
      shopCarList,
      selectObj,
      manage,
      manageSelect,
      swipeActionOptions,
	  allChecked,
      handleChangeNums,
      handleSelect,
      handleCheckShop,
      handleSubmit,
      handleToShop,
      handleDelGoods,
      handleDelShop,
      handleNavLeft,
    };
  },
};
</script>

<style lang="scss" scoped>
$spcar_footerHeight: 100rpx;
.page_scar,.spcar_main  {
  background: $theme_bg;
  font-size: 24rpx;
}
.spcar_main {
  padding: 20rpx;
  padding-bottom: $spcar_footerHeight;
}
.submit {
  background: rgba($color: #000000, $alpha: 0.4);
  display: flex;
  padding: 15rpx;
  border-radius: 30rpx;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-left: 20rpx;
  &.hasSelect {
    background: linear-gradient(to right, $theme_color, $theme_color2);
	&.delete{
	background: $theme_color_im !important;
  }
}
 
}
.spcar_footer {
  width: 100%;
  height: $spcar_footerHeight;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20rpx 20rpx 0 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  & > view {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .submit {
    width: 160rpx;
  }
}

.sc_item {
  background: #fff;
  padding: 20rpx;
  margin: 15rpx 0;
  border-radius: 20rpx;
  .sc_shead {
    display: flex;
    justify-content: space-between;
    .sc_sname {
      font-size: 28rpx;
      font-weight: bold;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      & > text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .sc_shop_tips {
    padding-left: 10%;
    color: rgba(0, 0, 0, 0.2);
  }
}
.sc_tips {
  color: rgba(0, 0, 0, 0.4);
  & > text {
    margin: 0 30rpx;
  }
}
.sc_goods_item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 30rpx 0;
  image {
    width: 90rpx;
    height: 90rpx;
    border-radius: 10rpx;
    margin-right: 15rpx;
  }
  & > view {
    display: flex;
    align-items: center;
  }
  .sc_goods_info {
    display: flex;
  }
  .sc_goods_text {
    font-size: 26rpx;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .sc_tips {
      font-weight: 500;
      font-size: 24rpx;
    }
  }
}

.sc_goods_tool {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  background: rgb(249, 247, 247);
  border-radius: 10rpx;
  & > view {
    padding: 8rpx;
    border-radius: 10rpx;
    padding: 5rpx;
    border-radius: 50%;
    min-width: 50rpx;
    min-height: 40rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sc_g_t_del,
  .sc_g_t_add {
    color: rgba(0, 0, 0, 0.4);
  }
  &.disable{
    color: rgba(0, 0, 0, 0.4);
  }
}

.sc_footer {
  & > view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10rpx 0;
  }
  .sc_footer_handle {
    justify-content: flex-end;
  }
  .sc_footer_show {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & > view {
      display: flex;
      align-items: center;
      margin: 0 10rpx;
    }
  }
  .submit {
    width: 140rpx;
    margin-left: 20rpx;
  }
  .sc_im_price {
    margin: 0 10rpx;
  }
}
.sc_im_price {
  color: $theme_color_im;
}
.sc_submit_tips {
  justify-content: center !important;
  background: #fffcd7;
  padding: 10rpx;
  border-radius: 10rpx;
  .sc_im_price {
    margin: 0 10rpx;
  }
}

.sc_order_count {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & > view {
    display: flex;
    & > view {
      display: flex;
      margin-left: 10rpx;
      align-items: center;
    }
  }
}
.count_price {
  font-size: 28rpx;
}
</style>
